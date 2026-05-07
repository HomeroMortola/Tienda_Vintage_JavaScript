import { executePurchase } from "../services/checkoutService.js";

/** Checkout con cuerpo extendido (email, token Mercado Pago, etc.). Misma tubería Command que POST /carrito/comprar */
export const processCheckout = async (req, res) => {
    try {
        const { sessionId } = req.body;
        if (!sessionId) {
            return res.status(400).json({ error: "Falta sessionId" });
        }

        const result = await executePurchase(sessionId, req.body);

        if (!result.success) {
            return res.status(400).json({ error: result.error ?? "No se pudo completar la compra" });
        }

        res.status(200).json({
            message: "Orden completada con éxito",
            order: result.order,
        });
    } catch (error) {
        console.error("processCheckout:", error);
        res.status(500).json({ error: "Error al procesar el checkout" });
    }
};
