/**
 * Invoker: ejecuta la cadena de comandos y aplica undo en orden inverso si falla un paso.
 */
export class PaymentProcessor {
    constructor() {
        this.commands = [];
        this.executedHistory = [];
    }

    addCommand(command) {
        this.commands.push(command);
    }

    /**
     * @returns {Promise<{ success: boolean, error?: string }>}
     */
    async process() {
        this.executedHistory = [];
        try {
            for (const command of this.commands) {
                await command.execute();
                this.executedHistory.push(command);
            }
            return { success: true };
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.error(`Checkout: error en pipeline — ${message}. Revirtiendo...`);

            const reversed = [...this.executedHistory].reverse();
            for (const command of reversed) {
                try {
                    await command.undo();
                } catch (undoError) {
                    console.error("Checkout: fallo durante rollback", undoError);
                }
            }

            return { success: false, error: message };
        }
    }
}
