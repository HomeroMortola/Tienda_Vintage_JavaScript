// api/checkout.js
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { supabase } from '../src/config/supabase.js';

// Configuración de clientes usando process.env para seguridad
const mpClient = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    try {
        const { items, buyer, userId, orderId } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: "El carrito está vacío" });
        }

        // Obtener los IDs de los productos para consultar sus precios reales
        const productIds = items.map(item => item.id);
        const { data: dbProducts, error: dbError } = await supabase
            .from('products')
            .select('id, name, price')
            .in('id', productIds);

        if (dbError || !dbProducts) {
            throw new Error("Error al consultar precios en la base de datos");
        }

        // Crear un mapa para búsqueda rápida
        const productsMap = dbProducts.reduce((acc, p) => {
            acc[p.id] = p;
            return acc;
        }, {});

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
                items: items.map(item => {
                    const dbProduct = productsMap[item.id];
                    if (!dbProduct) {
                        throw new Error(`Producto con ID ${item.id} no encontrado`);
                    }
                    return {
                        id: item.id,
                        title: dbProduct.name, 
                        quantity: parseInt(item.quantity) || 1,
                        unit_price: parseFloat(dbProduct.price)
                    };
                }),
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

        // Devolvemos init_point (MP decidirá si es sandbox o real según el token)
        res.status(200).json({ 
            initPoint: result.init_point,
            preferenceId: result.id 
        }); 

    } catch (error) {
        console.error("Error creando checkout:", error);
        res.status(500).json({ error: "Error al crear la orden de pago", message: error.message });
    }
}
}


