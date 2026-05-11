//src/controllers/CheckoutController.js

import { executePurchase } from "../services/CheckoutServices.js";

/** Checkout con cuerpo extendido (email, token Mercado Pago, etc.). Mismo Command que POST /carrito/comprar */
export const processCheckout = async (request, response) => {
    try {
        const { userId, items } = request.body;
        if (!userId) {
            return response.status(400).json({ error: "Falta userId" });
        }

        const result = await executePurchase(items, userId);

        if (!result.preferenceId) {
            return response.status(400).json({ error: "No se pudo generar la preferencia de pago" });
        }

        response.status(200).json({
            message: "Orden iniciada con éxito",
            preferenceId: result.preferenceId,
            initPoint: result.initPoint,
            orderId: result.orderId,
        });
   } catch (error) {
    console.error("processCheckout:", error);
    // Cambia el mensaje genérico por el error real para debuguear
    response.status(500).json({ 
        error: "Error interno del servidor", 
        detalles: error.message,
        stack: error.stock 
        });
   }
}