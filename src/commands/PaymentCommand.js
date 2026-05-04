/**
 * Comando base del patrón Command para el flujo de compra.
 * Las subclases implementan `execute`; solo los pasos compensables implementan `undo`.
 */
export class PaymentCommand {
    async execute() {
        throw new Error("execute() debe ser implementado");
    }

    async undo() {}
}
