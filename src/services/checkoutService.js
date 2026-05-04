import { PaymentProcessor } from "./PaymentProcessor.js";
import { ValidateCheckoutCommand } from "../commands/ValidateCheckoutCommand.js";
import { MercadoPagoChargeCommand } from "../commands/MercadoPagoChargeCommand.js";
import { MockPaymentCommand } from "../commands/MockPaymentCommand.js";
import { SaveOrderCommand } from "../commands/SaveOrderCommand.js";
import { ClearCartCommand } from "../commands/ClearCartCommand.js";

/**
 * Construye el cobro: Mercado Pago si hay credencial y token de tarjeta; si no, mock.
 * El monto siempre sale del carrito en servidor (`ctx.total`), no del body.
 */
function buildChargeCommand(ctx, body) {
    const accessToken = process.env.MP_ACCESS_TOKEN;
    const cardToken = body.token ?? body.paymentToken;
    const email = body.email ?? ctx.email;
    const paymentMethodId = body.paymentMethodId ?? "visa";

    if (accessToken && cardToken && email) {
        return new MercadoPagoChargeCommand(
            {
                amount: ctx.total,
                token: cardToken,
                email,
                description: "Compra Retro Vibes",
                paymentMethodId,
                installments: body.installments ?? 1,
            },
            ctx
        );
    }
    return new MockPaymentCommand(ctx);
}

/**
 * Orquesta el flujo de compra con el patrón Command.
 * @param {string} sessionId
 * @param {Record<string, unknown>} body - Body HTTP (email, token opcional, etc.)
 */
export async function executePurchase(sessionId, body = {}) {
    const ctx = {
        sessionId,
        email: typeof body.email === "string" ? body.email : undefined,
        body,
    };

    const processor = new PaymentProcessor();
    processor.addCommand(new ValidateCheckoutCommand(ctx));
    processor.addCommand(buildChargeCommand(ctx, body));
    processor.addCommand(new SaveOrderCommand(ctx));
    processor.addCommand(new ClearCartCommand(ctx));

    const result = await processor.process();
    if (!result.success) {
        return { success: false, error: result.error };
    }

    return {
        success: true,
        order: {
            orderId: ctx.orderId,
            total: ctx.total,
            products: ctx.lineItems,
            date: new Date().toISOString(),
            paymentProvider:
                ctx.paymentProvider ?? (ctx.paymentId != null ? "mercadopago" : "mock"),
        },
    };
}

