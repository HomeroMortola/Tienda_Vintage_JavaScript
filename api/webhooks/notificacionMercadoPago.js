// api/webhooks/notificacionMercadoPago.js
import { createClient } from '@supabase/supabase-js';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { ENV } from '../../env.js';

// Configuración de clientes usando ENV
const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_KEY);
const mpClient = new MercadoPagoConfig({ accessToken: ENV.MP_ACCESS_TOKEN });

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).send('Method Not Allowed');

  const { query, body } = request;

  // Mercado Pago envía el ID en el query string o body dependiendo del tipo
  const topic = query.topic || body.type;
  const id = query.id || (body.data && body.data.id);

  console.log('Notificación Mercado Pago recibida:', { topic, id });

  if (topic === 'payment' && id) {
    try {
      // 1. Verificar el pago con Mercado Pago SDK
      const payment = new Payment(mpClient);
      const paymentData = await payment.get({ id });

      // 2. Extraer información relevante
      const orderId = paymentData.external_reference; 
      const status = paymentData.status;

      console.log(`Pago verificado para Orden ${orderId}: ${status}`);

      // 3. Actualizar Supabase
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: status,
          updated_at: new Date().toISOString(),
          payment_details: paymentData
        })
        .eq('id', orderId);

      if (error) throw error;

      return response.status(200).send('OK');
    } catch (err) {
      console.error('Error procesando notificación:', err);
      return response.status(500).json({ error: err.message });
    }
  }

  response.status(200).send('Event received');
}
