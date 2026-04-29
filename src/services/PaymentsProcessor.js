// ==========================================
// 1. Interfaz Base (Clase Abstracta en JS)
// ==========================================
class PaymentCommand {
  async execute() {
    throw new Error('El método execute() debe ser implementado');
  }
  async undo() {
    throw new Error('El método undo() debe ser implementado');
  }
}

// ==========================================
// 2. Receivers (Los servicios reales)
// ==========================================
// Simulamos la pasarela de pagos (ej. MercadoPago, Stripe) y la Base de Datos (Supabase)
const PaymentGateway = {
  charge: async (amount, token) => {
    console.log(`💳 Cobrando $${amount}...`);
    // throw new Error("Fallo simulado en la pasarela"); // Descomentar para probar el error
    return { transactionId: 'txn_12345' };
  },
  refund: async (transactionId) => {
    console.log(`🔄 Reembolsando transacción ${transactionId}...`);
  }
};

const DatabaseService = {
  createOrder: async (orderData) => {
    console.log('📦 Guardando orden en la base de datos...');
    // Simulamos un error en la BD para ver cómo actúa el rollback
    throw new Error('Error de conexión con la base de datos'); 
  },
  deleteOrder: async (orderId) => {
    console.log(`🗑️ Eliminando orden ${orderId} por fallo posterior...`);
  }
};

// ==========================================
// 3. Comandos Concretos
// ==========================================
class ChargeCardCommand extends PaymentCommand {
  constructor(amount, token) {
    super();
    this.amount = amount;
    this.token = token;
    this.transactionId = null;
  }

  async execute() {
    const response = await PaymentGateway.charge(this.amount, this.token);
    this.transactionId = response.transactionId;
  }

  async undo() {
    if (this.transactionId) {
      await PaymentGateway.refund(this.transactionId);
    }
  }
}

class SaveOrderCommand extends PaymentCommand {
  constructor(orderData) {
    super();
    this.orderData = orderData;
    this.orderId = null;
  }

  async execute() {
    const response = await DatabaseService.createOrder(this.orderData);
    this.orderId = response.id;
  }

  async undo() {
    if (this.orderId) {
      await DatabaseService.deleteOrder(this.orderId);
    }
  }
}

// ==========================================
// 4. Invoker (El Orquestador)
// ==========================================
class PaymentProcessor {
  constructor() {
    this.commands = [];
    this.executedHistory = [];
  }

  addCommand(command) {
    this.commands.push(command);
  }

  async process() {
    try {
      for (const command of this.commands) {
        await command.execute();
        this.executedHistory.push(command); // Guardamos el historial si tiene éxito
      }
      console.log('✅ Flujo de pago completado con éxito.');
      return { success: true };
      
    } catch (error) {
      console.error(`❌ Error detectado: ${error.message}. Iniciando Rollback...`);
      
      // Si algo falla, recorremos el historial hacia atrás ejecutando los undo()
      const reversedHistory = [...this.executedHistory].reverse();
      for (const command of reversedHistory) {
        try {
          await command.undo();
        } catch (undoError) {
          // Seguridad: Si el undo falla, debes registrarlo críticamente (logs, alertas)
          console.error('🚨 ALARMA CRÍTICA: Fallo durante el rollback', undoError);
        }
      }
      
      return { success: false, error: error.message };
    }
  }
}

// ==========================================
// 5. Ejecución del Flujo (Uso en tu Controlador de Express)
// ==========================================
const runPaymentFlow = async () => {
  const processor = new PaymentProcessor();
  
  // Instanciamos los comandos
  const chargeCmd = new ChargeCardCommand(1500, 'tok_visa_123');
  const saveCmd = new SaveOrderCommand({ userId: 1, items: ['Zapatillas'] });

  // Encolamos los comandos en el orden deseado
  processor.addCommand(chargeCmd);
  processor.addCommand(saveCmd);

  // Ejecutamos
  await processor.process();
};

runPaymentFlow();