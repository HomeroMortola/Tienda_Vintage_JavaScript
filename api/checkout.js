// api/checkout.js
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { supabase } from '../../config/supabase.js'; // Importamos el cliente de Supabase para consultar los productos y crear la orden

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY); // Usamos el Service Role Key para saltar RLS y validar stock/precios sin importar el usuario

export default async function handler(req, res) {

  if(req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { items, userId } = req.body; // Enviamos el carrito y el ID del usuario desde el frontend al crear la preferencia a la API de supabase
 
  try {
    //1. Obtener los IDs para consultar a Supabase de una sola vez
    const productsIds = items.map(item => item.id);

    //2. Consultar precios y stock reales en Supabase usando el Service Role Key (salta RLS)
    const { data: dbProducts, error } = await supabase
      .from('products')
      .select('id, name, price, stock')
      .in('id', productsIds);
      
      if (error || !dbProducts) throw new Error('Error al consultar productos en Supabase');

    //3. Validar que los productos existan, tengan stock y precios válidos
    let serverSideTotal = 0;
    const validatedItemsForMP = [];

    for (const Item of Items){
      const dbProduct = dbProducts.find(p => p.id === Items.id);
      
      //A. Valido si el producto existe
      if (!dbProduct) {
        return res.status(400).json({ error: `Producto con ID ${Item.id} no encontrado` });
      }

      //B. Valido si el producto tiene el stock suficiente para la cantidad solicitada
      if (dbProduct.stock < Item.quantity) {
        return res.status(400).json({ error: `Producto ${dbProduct.id} tiene stock insuficiente` });
      }

      //C. Valido si el precio del producto es mayor a 0
      if (dbProduct.price <= 0) {
        return res.status(400).json({ error: `Producto ${dbProduct.id} tiene un precio inválido` });
      }

      //Calculamos el totoal con el precio de la base de datos (Ignoramos lo que el front nos manda para evitar manipulaciones)
      serverSideTotal += dbProduct.price * Item.quantity;

      //Si todo es correcto, lo agrego a la lista de items validados para MercadoPago
      validatedItemsForMP.push({
        id: dbProduct.id,
        title: dbProduct.name,
        unit_price: dbProduct.price, // Precio real desde la base de datos
        quantity: Item.quantity,
        currency_id: 'ARS' // Moneda Local
      });
    }

    //4. Persistencia de los datos: Validamos que el total calculado sea el mismo que nosotros calculamos
    const {data: order, error: orderError} = await supabase
      .from('orders')
      .insert({
        total: serverSideTotal,
        status: 'pending',
        user_id: userId,
        items: Items
    })
    .select()
    .single();

    if( orderError ||!order) throw new Error('Error al crear la orden ${orderError.message}');

    //5. Crear la preferencia de pago en MercadoPago con los datos validados
    req.headers.host = 'tienda-vintage-java-script.vercel.app';

    const preference = new Preference(client);
    const result = await preference.create({
    body: {
      items: validatedItemsForMP, //Usamos los datos de productos validados y enriquecidos desde la base de datos
      back_urls: {
        success: '{APP_URL}/success',
        failure: '{APP_URL}/failure',
      },
      notification_url: '{APP_URL}/api/webhooks/mercadopago',
      external_reference: order.id, // Para vincular el pago al usuario en tu DB
    }
  });

  // Enviamos el ID de la preferencia al frontend para redirigir al usuario a MercadoPago
  res.status(200).json({ preferenceid: result.id, orderId: order.id });

  } catch (error) {
    console.error('Error en checkout:', error);
    res.status(500).json({ error: error.message });
  }
}