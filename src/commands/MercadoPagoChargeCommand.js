// src/commands/MercadoPagoChargeCommand.js
import { MercadoPagoConfig, Payment, Refund } from 'mercadopago';
import { PaymentCommand } from './PaymentCommand.js'; // Tu clase base

// Inicializamos el cliente con tu Token de Producción o Prueba
const client = new MercadoPagoConfig({ 
    accessToken: process.env.MP_ACCESS_TOKEN, 
    options: { timeout: 5000, idempotencyKey: 'abc-123' } 
});

export class MercadoPagoChargeCommand extends PaymentCommand {
    constructor(paymentData) {
        super();
        // paymentData trae el token generado en el frontend, el monto, email, etc.
        this.paymentData = paymentData; 
        this.paymentId = null; // Guardamos el ID real de MP para poder hacer rollback
    }

    async execute() {
        console.log('💳 Contactando a la API de Mercado Pago...');
        
        try {
            const paymentApi = new Payment(client);
            const response = await paymentApi.create({ 
                body: {
                    transaction_amount: this.paymentData.amount,
                    token: this.paymentData.token,
                    description: this.paymentData.description,
                    installments: this.paymentData.installments || 1,
                    payment_method_id: this.paymentData.paymentMethodId,
                    payer: {
                        email: this.paymentData.email
                    }
                }
            });

            // MP no siempre lanza error si la tarjeta no tiene fondos, a veces devuelve 'rejected'
            if (response.status === 'rejected') {
                throw new Error(`Pago rechazado: ${response.status_detail}`);
            }

            // Si es 'approved' o 'in_process', guardamos el ID
            this.paymentId = response.id;
            console.log(`✅ Pago aprobado por MP. ID de transacción: ${this.paymentId}`);
            
            // Retornamos los datos por si el Orquestador los necesita
            return response;

        } catch (error) {
            console.error('❌ Error en la pasarela de Mercado Pago:', error.message);
            throw new Error('No se pudo procesar el pago con la tarjeta proporcionada.');
        }
    }

    // EL SUPERPODER DEL PATRÓN COMMAND: El Rollback Automático
    async undo() {
        if (!this.paymentId) return; // Si no hay ID, no se cobró nada, no hay qué devolver.

        console.log(`🔄 Iniciando reembolso del pago ${this.paymentId} en Mercado Pago...`);
        
        try {
            const refundApi = new Refund(client);
            await refundApi.create({
                payment_id: this.paymentId
            });
            console.log('✅ Reembolso procesado correctamente.');
        } catch (error) {
            // Este es un caso crítico: Se le cobró al cliente, falló la Base de Datos, 
            // y AHORA falla la devolución del dinero. 
            console.error(`🚨 ALARMA CRÍTICA: Fallo al reembolsar el pago ${this.paymentId}. Requiere acción manual.`, error);
            // Aquí idealmente enviarías un mensaje automático a un canal de Slack/Discord o un email al administrador.
        }
    }
}