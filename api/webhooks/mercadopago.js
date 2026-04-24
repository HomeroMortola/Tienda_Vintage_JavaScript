import { createClient } from '@supabase/supabase-js';
import { MercadoPagoConfig, Payment } from 'mercadopago';

// Configuración de clientes
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const mpClient = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { query } = req;

  // Mercado Pago envía el ID en el query string o body dependiendo del tipo
  const topic = query.topic || req.body.type;
  const id = query.id || (req.body.data && req.body.data.id);

  if (topic === 'payment' && id) {
    try {
      // 1. Verificar el pago con Mercado Pago SDK
      const payment = new Payment(mpClient);
      const paymentData = await payment.get({ id });

      // 2. Extraer información relevante
      const orderId = paymentData.external_reference; // El ID que enviaste al crear la preferencia
      const status = paymentData.status; // 'approved', 'rejected', etc.

      // 3. Actualizar Supabase usando el Service Role (salta RLS)
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: status,
          updated_at: new Date().toISOString(),
          payment_details: paymentData // Opcional: guardar el JSON completo
        })
        .eq('id', orderId);

      if (error) throw error;

      return res.status(200).send('OK');
    } catch (err) {
      console.error('Error procesando webhook:', err);
      return res.status(500).json({ error: err.message });
    }
  }

  // Retornar 200 siempre para que MP no reintente infinitamente si no es un topic de interés
  res.status(200).send('Event received');
}