nofitificacion_url = "https://zjxhoedilvqnfxbonyjh.supabase.co/rest/v1/webhooks?select=*"

export default async function handler(request, response) {
  if (request.method === 'POST') {
    const { body } = request;

    // Aquí puedes procesar la notificación de MercadoPago
    console.log('Notificación recibida:', body);

    // Por ejemplo, podrías actualizar el estado del pedido en tu base de datos
    // o enviar un correo electrónico al cliente.

    response.status(200).json({ message: 'Notificación procesada' });
  } else {
    response.status(405).json({ message: 'Método no permitido' });
  }
}