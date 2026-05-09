
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';
import { ENV } from '../../env.js';

const supabaseUrl = process.env.SUPABASE_URL || ENV.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY || ENV.SUPABASE_KEY;

if (!supabaseUrl || !supabaseUrl.startsWith('https')) {
  throw new Error("ERROR: SUPABASE_URL no definida o inválida.");
}


// 1. Inicialización global de clientes (Reutilización de conexiones)
const mpClient = new MercadoPagoConfig({ 
  accessToken: ENV.MP_ACCESS_TOKEN || 'TU_ACCESS_TOKEN_POR_DEFECTO' 
})

const supabase = createClient(
  ENV.SUPABASE_URL,
  ENV.SUPABASE_KEY
);

/**
 * Orquesta el flujo de compra: validación de stock, creación de orden y preferencia en MP.
 * @param {Array} items - Carrito de compras desde el frontend
 * @param {string} userId - ID del usuario comprador
 * @returns {Object} - Datos de la preferencia de MP y el ID de la orden
 */

//Patrón Factory Exportado para el checkout
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

  // 3. Patrón Hash Map para validación O(1) de alto rendimiento
  const dbProductsMap = dbProducts.reduce((acc, prod) => {
    acc[prod.id] = prod;
    return acc;
  }, {});

  let serverSideTotal = 0;
  const validatedItemsForMP = [];

  // 4. Validación estricta (Zero Trust: No confiamos en los precios del cliente)
  for (const item of items) {
    const dbProduct = dbProductsMap[item.id];
    
    if (!dbProduct) throw new Error(`Producto no encontrado (ID: ${item.id})`);
    if (dbProduct.stock < item.quantity) throw new Error(`Sin stock suficiente para: ${dbProduct.name}`);
    if (dbProduct.price <= 0) throw new Error(`Precio inválido detectado en: ${dbProduct.name}`);

    serverSideTotal += dbProduct.price * item.quantity;

    validatedItemsForMP.push({
      id: dbProduct.id,
      title: dbProduct.name,
      unit_price: dbProduct.price,
      quantity: item.quantity,
      currency_id: 'ARS'
    });
  }

  // 5. Persistencia: Creación de orden en estado "pending"
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      total: serverSideTotal,
      status: 'pending',
      user_id: userId,
      items: items // Se guarda el JSON original del carrito para historial
    })
    .select('id')
    .single();

  if (orderError || !order) {
    throw new Error(`Error crítico al registrar la orden: ${orderError?.message}`);
  }

  // 6. Configuración dinámica de URLs para Mercado Pago
  // Usamos process.env.APP_URL como dictó la auditoría (Ej: https://tu-sitio.vercel.app o el túnel de Ngrok)
  const baseUrl = ENV.APP_URL || 'http://localhost:3000';
  
  const preference = new Preference(mpClient);
  const result = await preference.create({
    body: {
      items: validatedItemsForMP,
      back_urls: {
        success: `${baseUrl}/success`,
        failure: `${baseUrl}/failure`,
        pending: `${baseUrl}/pending` // Agregado para flujos de pago en efectivo
      },
      auto_return: 'approved',
      notification_url: `${baseUrl}/api/webhooks/mercadopago`,
      external_reference: order.id.toString(),
    }
  });

  // 7. Retorno del Data Transfer Object (DTO)
  return {
    preferenceId: result.id,
    initPoint: result.init_point,                 // URL para redirección a Producción
    sandboxInitPoint: result.sandbox_init_point, // UR para redirección a PruebasL
    orderId: order.id
  };
};