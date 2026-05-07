import { MercadoPagoConfig, Payment, Refund } from "mercadopago";
import { PaymentCommand } from "./PaymentCommand.js";


function getMercadoPagoClient() {
    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) return null;
    return new MercadoPagoConfig({
        accessToken,
        options: { timeout: 5000 },
    });
}


export class MercadoPagoChargeCommand extends PaymentCommand {
    /**
     * @param {{ amount: number, token: string, email: string, description?: string, installments?: number, paymentMethodId?: string }} paymentData
     * @param {Record<string, unknown>} [ctx] - Contexto compartido; se asigna paymentId al cobrar.
     */
    constructor(paymentData, ctx = null) {

        this.paymentData = paymentData;
        this.ctx = ctx;
        this.paymentId = null;
    }

    async execute() {
        const client = getMercadoPagoClient();
        if (!client) throw new Error("MercadoPago no configurado");

        try {
            const payment = new Payment(client);
            const response = await payment.create({
                transaction_amount: this.paymentData.amount,
                token: this.paymentData.token,
                description: this.paymentData.description || "Compra en Tienda Vintage",
                installments: this.paymentData.installments || 1,
                payment_method_id: this.paymentData.paymentMethodId || "card",
                payer: {
                    email: this.paymentData.email,
                },
            });

            if (response.status === "approved") {
                this.paymentId = response.id;
                if (this.ctx) this.ctx.paymentId = this.paymentId; // Guardamos el ID para posibles reembolsos
            } else {
                throw new Error(`Pago rechazado: ${response.status_detail}`);
            }
        } catch (error) {
            console.error("Error al procesar el pago con MercadoPago:", error);
            throw new Error("Error al procesar el pago. Intente nuevamente.");
        }
    }

    async refund() {
        if (!this.paymentId) {
            throw new Error("No se puede reembolsar: ID de pago no disponible");
        }

        const client = getMercadoPagoClient();
        if (!client) throw new Error("MercadoPago no configurado");   

        try {
            const refund = new Refund(client);
            const response = await refund.create(this.paymentId, {
                reason: "requested_by_customer",
            });
            
            if (response.status === "approved") {
                console.log(`Reembolso aprobado para pago ID ${this.paymentId}`);
            } else {
                throw new Error(`Reembolso rechazado: ${response.status_detail}`);
            }
        } catch (error) {
            console.error("Error al procesar el reembolso con MercadoPago:", error);
            throw new Error("Error al procesar el reembolso. Intente nuevamente.");
        }
    }
}