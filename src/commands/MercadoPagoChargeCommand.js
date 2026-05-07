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
        super();
        this.paymentData = paymentData;
        this.ctx = ctx;
        this.paymentId = null;
    }

    async execute() {
        const client = getMercadoPagoClient();
        if (!client) {
            throw new Error("Mercado Pago no está configurado (MP_ACCESS_TOKEN)");
        }

        const paymentApi = new Payment(client);
        const response = await paymentApi.create({
            body: {
                transaction_amount: this.paymentData.amount,
                token: this.paymentData.token,
                description: this.paymentData.description ?? "Compra tienda",
                installments: this.paymentData.installments ?? 1,
                payment_method_id: this.paymentData.paymentMethodId ?? "visa",
                payer: {
                    email: this.paymentData.email,
                },
            },
        });

        if (response.status === "rejected") {
            throw new Error(`Pago rechazado: ${response.status_detail ?? response.status}`);
        }

        this.paymentId = response.id;
        if (this.ctx) {
            this.ctx.paymentId = this.paymentId;
            this.ctx.paymentProvider = "mercadopago";
        }
    }

    async undo() {
        if (!this.paymentId) return;
        const client = getMercadoPagoClient();
        if (!client) {
            console.error("Rollback MP: no hay cliente configurado para reembolsar", this.paymentId);
            return;
        }
        try {
            const refundApi = new Refund(client);
            await refundApi.create({ payment_id: this.paymentId });
        } catch (error) {
            console.error(`Rollback MP: fallo al reembolsar pago ${this.paymentId}`, error);
        }
    }
}
