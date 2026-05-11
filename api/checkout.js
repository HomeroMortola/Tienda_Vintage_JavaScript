import { MercadoPagoConfig, Preference } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { items, userId } = req.body;

  // Keys seguras — solo existen en el servidor
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
  const mpClient = new MercadoPagoConfig({ 
    accessToken: process.env.MP_ACCESS_TOKEN 
  });

  try {
    // Validar stock
    const productsIds = items.map(i => i.id);
    const { data: dbProducts, error } = await supabase
      .from('products')
      .select('id, name, price, stock')
      .in('id', productsIds);

    if (error) throw new Error('Error consultando inventario');

    const dbMap = dbProducts.reduce((acc, p) => { acc[p.id] = p; return acc; }, {});
    let total = 0;
    const mpItems = items.map(item => {
      const p = dbMap[item.id];
      if (!p) throw new Error(`Producto no encontrado: ${item.id}`);
      if (p.stock < (item.quantity || 1)) throw new Error(`Sin stock: ${p.name}`);
      total += p.price * (item.quantity || 1);
      return { id: p.id, title: p.name, unit_price: p.price, quantity: item.quantity || 1, currency_id: 'ARS' };
    });

    // Crear orden
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({ total_price: total, status: 'pending', client_id: userId, items })
      .select('id').single();

    if (orderError) throw new Error(`Error creando orden: ${orderError.message}`);

    // Crear preferencia MP
    const baseUrl = process.env.APP_URL;
    const preference = new Preference(mpClient);
    const result = await preference.create({
      body: {
        items: mpItems,
        back_urls: {
          success: `${baseUrl}/public/success.html`,
          failure: `${baseUrl}/public/failure.html`,
          pending: `${baseUrl}/public/failure.html`
        },
        auto_return: 'approved',
        notification_url: `${baseUrl}/api/webhooks/mercadopago`,
        external_reference: order.id.toString(),
      }
    });

    res.status(200).json({ preferenceId: result.id, initPoint: result.init_point, orderId: order.id });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}