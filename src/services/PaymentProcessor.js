export class PaymentProcessor {
    constructor() {
        this.commands = [];
    }

    /**
     * Agrega un comando a la cola de ejecución.
     * @param {import('../commands/PaymentCommand.js').PaymentCommand} command
     */
    addCommand(command) {
        this.commands.push(command);
    }

    /**
     * Ejecuta secuencialmente todos los comandos. Si uno falla, intenta deshacer los anteriores.
     * @returns {Promise<{success: boolean, error?: string}>}
     */
    async process() {
        const executedCommands = [];
        try {
            for (const command of this.commands) {
                await command.execute();
                executedCommands.push(command);
            }
            return { success: true };
        } catch (error) {
            console.error("PaymentProcessor Error - Iniciando Rollback:", error);
            // Rollback en orden inverso (del último ejecutado exitosamente hacia atrás)
            for (let i = executedCommands.length - 1; i >= 0; i--) {
                try {
                    await executedCommands[i].undo();
                } catch (undoError) {
                    console.error("Error durante el rollback del comando:", undoError);
                }
            }
            return { success: false, error: error.message };
        }
    }
}
