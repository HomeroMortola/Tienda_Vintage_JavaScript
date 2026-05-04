import { PaymentCommand } from "./PaymentCommand.js";

/**
 * Cobro simulado cuando no hay token de Mercado Pago (desarrollo / demo).
 */
export class MockPaymentCommand extends PaymentCommand {
    constructor(ctx) {
        super();
        this.ctx = ctx;
    }

    async execute() {
        this.ctx.paymentProvider = "mock";
        this.ctx.paymentId = null;
    }
}
