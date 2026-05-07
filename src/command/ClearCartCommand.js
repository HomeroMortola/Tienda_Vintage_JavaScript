import { PaymentCommand } from "./PaymentCommand.js";
import { clearCartSession } from "../services/cartStore.js";

/**
 * Último paso: vacía el carrito en memoria. Sin undo (la orden ya quedó persistida).
 */
export class ClearCartCommand extends PaymentCommand {
    constructor(ctx) {
        super();
        this.ctx = ctx;
    }

    async execute() {
        clearCartSession(this.ctx.sessionId);
    }
}