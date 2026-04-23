// api/checkout.js
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

export default async function handler(req, res) {
  const { items, userId } = req.body;

  // 1. Validar stock en Supabase aquí...

  const preference = new Preference(client);
  
  const result = await preference.create({
    body: {
      items: items.map(item => ({
        title: item.name,
        unit_price: Number(item.price),
        quantity: Number(item.quantity),
        currency_id: 'ARS' // O tu moneda local
      })),
      back_urls: {
        success: 'https://tu-tienda.vercel.app/success',
        failure: 'https://tu-tienda.vercel.app/failure',
      },
      notification_url: 'https://tu-tienda.vercel.app/api/webhooks/mercadopago', // ¡Vital!
      external_reference: userId, // Para vincular el pago al usuario en tu DB
    }
  });

  res.status(200).json({ id: result.id });
}