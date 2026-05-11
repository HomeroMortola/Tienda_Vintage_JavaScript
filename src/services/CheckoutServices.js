import { MercadoPagoConfig, Preference } from 'mercadopago';
import { supabase } from '../config/supabase.js';
import { ENV } from '../../env.js';

// 1. Inicialización de Mercado Pago
const mpClient = new MercadoPagoConfig({ 
  accessToken: ENV.MP_ACCESS_TOKEN 
});

/**
 * Orquesta el flujo de compra: validación de stock, creación de orden y preferencia en MP.
 * @param {Array} items - Carrito de compras desde el frontend
 * @param {string} userId - ID del usuario comprador
 * @returns {Object} - Datos de la preferencia de MP y el ID de la orden
 */
export const executePurchase = async (items, userId) => {
  if (!items || items.length === 0) {
    throw new Error('El carrito no puede estar vacío');
  }

  // 2. Extracción de IDs y consulta a la base de datos
  const productsIds = items.map(item => item.id);
  
  const { data: dbProducts, error: dbError } = await supabase
    .from('products')
    .select('id, name, price, stock')
    .in('id', productsIds);

  if (dbError || !dbProducts) {
    throw new Error('Error de conexión al consultar el inventario');
  }

  // 3. Validación de stock y preparación de items para MP
  const dbProductsMap = dbProducts.reduce((acc, prod) => {
    acc[prod.id] = prod;
    return acc;
  }, {});

  let serverSideTotal = 0;
  const validatedItemsForMP = items.map(item => {
    const dbProduct = dbProductsMap[item.id];
    if (!dbProduct) throw new Error(`Producto no encontrado (ID: ${item.id})`);
    if (dbProduct.stock < (item.quantity || 1)) throw new Error(`Sin stock suficiente para: ${dbProduct.name}`);
    
    serverSideTotal += dbProduct.price * (item.quantity || 1);

    return {
      id: dbProduct.id,
      title: dbProduct.name,
      unit_price: dbProduct.price,
      quantity: item.quantity || 1,
      currency_id: 'ARS'
    };
  });

  // 4. Persistencia: Creación de orden en estado "pending"
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      total_price: serverSideTotal,
      status: 'pending', // Nota: el esquema dice double precision, pero un string es más lógico.
      client_id: userId,
      items: items
    })
    .select('id')
    .single();

  if (orderError || !order) {
    throw new Error(`Error crítico al registrar la orden: ${orderError?.message}`);
  }

  // 5. Creación de preferencia en Mercado Pago
  const baseUrl = ENV.APP_URL;
  const preference = new Preference(mpClient);
  const result = await preference.create({
    body: {
      items: validatedItemsForMP,
      back_urls: {
        success: `${baseUrl}/success`,
        failure: `${baseUrl}/failure`,
        pending: `${baseUrl}/pending`
      },
      auto_return: 'approved',
      notification_url: `${baseUrl}/api/webhooks/mercadopago`,
      external_reference: order.id.toString(),
    }
  });

  return {
    preferenceId: result.id,
    initPoint: result.init_point,
    orderId: order.id
  };
};