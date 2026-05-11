// api/checkout.js
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configuración de clientes usando process.env para seguridad
const mpClient = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    try {
        const { items, buyer, userId, orderId } = req.body;

        const host = req.headers['x-forwarded-host'] || req.headers.host;
        const protocol = req.headers['x-forwarded-proto'] || 'http';
        const dynamicBaseUrl = `${protocol}://${host}`;
        
        const baseUrl = (process.env.APP_URL && !process.env.APP_URL.includes('localhost')) 
            ? process.env.APP_URL 
            : dynamicBaseUrl;

        console.log('Usando Base URL para Webhooks:', baseUrl);

        const preference = new Preference(mpClient);
        
        const result = await preference.create({
            body: {
                items: items.map(item => ({
                    id: item.id,
                    title: item.name || 'Producto Retro Vibes', 
                    quantity: parseInt(item.quantity) || 1,
                    unit_price: parseFloat(item.price) || 1000 
                })),
                payer: {
                    name: buyer.name,
                    surname: buyer.surname,
                    email: buyer.email
                },
                back_urls: {
                    success: `${baseUrl}/success`,
                    failure: `${baseUrl}/failure`,
                    pending: `${baseUrl}/pending`
                },
                auto_return: 'approved',
                notification_url: `${baseUrl}/api/webhooks/mercadopago`,
                external_reference: orderId || `order-${Date.now()}`
            }
        });

        // Devolvemos el link de sandbox para pruebas
        res.status(200).json({ 
            initPoint: result.sandbox_init_point,
            preferenceId: result.id 
        }); 

    } catch (error) {
        console.error("Error creando checkout:", error);
        res.status(500).json({ error: "Error al crear la orden de pago", message: error.message });
    }
}