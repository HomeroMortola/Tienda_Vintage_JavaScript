import { PaymentCommand } from "./PaymentCommand.js";
import { supabase } from "../config/supabase.js";

/**
 * Persiste la orden en Supabase. Undo elimina la fila si falló un paso posterior.
 */
export class SaveOrderCommand extends PaymentCommand {
    constructor(ctx) {
        super();
        this.ctx = ctx;
        /** @type {number|string|null} */
        this.insertedOrderId = null;
    }

    async execute() {
        const items = this.ctx.lineItems ?? this.ctx.cart?.products ?? [];
        const payload = {
            total: this.ctx.total,
            status: "approved",
            items,
        };

        const { data, error } = await supabase
            .from("orders")
            .insert(payload)
            .select("id")
            .single();

        if (error) {
            console.error("SaveOrderCommand:", error.message);
            throw new Error(`No se pudo registrar la orden: ${error.message}`);
        }

        this.insertedOrderId = data.id;
        this.ctx.orderId = data.id;
    }

    async undo() {
        if (this.insertedOrderId == null) return;
        const { error } = await supabase.from("orders").delete().eq("id", this.insertedOrderId);
        if (error) {
            console.error("SaveOrderCommand undo:", error.message);
        }
    }
}