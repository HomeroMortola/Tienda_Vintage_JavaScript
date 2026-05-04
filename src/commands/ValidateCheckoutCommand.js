import { PaymentCommand } from "./PaymentCommand.js";
import { getOrCreateCart } from "../services/cartStore.js";

/**
 * Carga el carrito en el contexto y valida que haya ítems y total coherente.
 */
export class ValidateCheckoutCommand extends PaymentCommand {
    /** @param {Record<string, unknown>} ctx */
    constructor(ctx) {
        super();
        this.ctx = ctx;
    }

    async execute() {
        const cart = getOrCreateCart(this.ctx.sessionId);
        if (!cart.products.length) {
            throw new Error("El carrito está vacío");
        }
        cart.calculate_final_price(cart.products);
        this.ctx.cart = cart;
        this.ctx.total = cart.total_price;
        this.ctx.lineItems = cart.products.map((p) => ({ ...p }));
    }
}
