import { PaymentCommand } from "./PaymentCommand.js";
import { clearCartSession } from "../controllers/CartController.js";


export class ClearCartCommand extends PaymentCommand {
    constructor(ctx) {
        super();
        this.ctx = ctx;
    }

    async execute() {
        clearCartSession(this.ctx.userId);
    }
}
