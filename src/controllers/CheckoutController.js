import { MercadoPagoChargeCommand } from '../commands/MercadoPagoChargeCommand.js';
import { SaveOrderCommand } from '../commands/SaveOrderCommand.js';
import { PaymentProcessor } from '../services/PaymentProcessor.js'; // El orquestador que hicimos antes

export const processCheckout = async (req, res) => {
    // 1. Recibimos los datos del frontend (TypeScript)
    const { token, amount, email, items } = req.body;

    // 2. Instanciamos el Orquestador
    const processor = new PaymentProcessor();

    // 3. Preparamos los comandos con los datos reales
    const chargeCmd = new MercadoPagoChargeCommand({
        token,
        amount,
        email,
        description: 'Compra en Tienda Online',
        paymentMethodId: 'visa' // Esto idealmente también viene del frontend
    });

    const saveOrderCmd = new SaveOrderCommand({
        email,
        items,
        total: amount
    });

    // 4. Encolamos y ejecutamos
    processor.addCommand(chargeCmd);
    processor.addCommand(saveOrderCmd);

    const result = await processor.process();

    // 5. Respondemos al Frontend
    if (result.success) {
        res.status(200).json({ message: 'Orden completada con éxito' });
    } else {
        res.status(400).json({ error: result.error });
    }
};