// public/CheckoutClient.js
import { CartRepository } from '../src/repositories/CartRepository.js';


document.addEventListener('DOMContentLoaded', async () => {
    const checkoutForm = document.getElementById('checkout-form');
    const payButton = document.getElementById('pay-button');
    const toast = document.getElementById('toast');
    const errorMsg = document.getElementById('login-error');
    const counterElement = document.getElementById('item-count');

    const cartRepo = new CartRepository();
    const userId = localStorage.getItem('usuarioId');

    // 1. Cargar contador de items y resumen
    if (userId && counterElement) {
        try {
            const items = await cartRepo.getCart(userId);
            const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
            counterElement.innerText = totalQuantity;
            
            // Opcional: Renderizar resumen en el div cart-summary
            const summaryDiv = document.getElementById('cart-summary');
            if (summaryDiv && items.length > 0) {
                summaryDiv.innerHTML = items.map(item => `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px;">
                        <span>${item.product.name} x ${item.quantity}</span>
                        <span>$${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('') + `
                    <div style="border-top: 1px solid var(--ink-muted); margin-top: 8px; padding-top: 8px; font-weight: bold; display: flex; justify-content: space-between;">
                        <span>Total</span>
                        <span>$${items.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2)}</span>
                    </div>
                `;
            }
        } catch (error) {
            console.error("No se pudo cargar el carrito:", error);
        }
    }

    // 2. Manejar el envío del formulario
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            errorMsg.style.display = 'none';
            payButton.disabled = true;
            payButton.innerText = 'Procesando pago...';

            try {
                if (!userId) {
                    throw new Error('Debes iniciar sesión para realizar la compra.');
                }

                // Recuperar carrito REAL desde la base de datos
                const items = await cartRepo.getCart(userId);
                
                if (items.length === 0) {
                    throw new Error('El carrito está vacío. Agrega productos antes de pagar.');
                }

                // Formatear items para el backend (id y cantidad)
                const itemsForBackend = items.map(item => ({
                    id: item.product.id,
                    quantity: item.quantity
                }));

                // Datos del comprador
                const buyerData = {
                    name: document.getElementById('name-input').value,
                    surname: document.getElementById('lastname-input').value,
                    email: document.getElementById('email-input').value,
                    address: document.getElementById('address-input').value,
                    city: document.getElementById('city-input').value
                };

                const response = await fetch('/api/checkout', {  // 👈 Ruta relativa, funciona local y en Ngrok automáticamente
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        userId: userId,
        items: itemsForBackend,
        buyer: buyerData
    })
});


                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Error al generar la orden de pago');
                }

                // Redirección a Mercado Pago
                if (data.initPoint) {
                    toast.style.display = 'block';
                    toast.innerText = 'Redirigiendo a Mercado Pago...';

                    
                    setTimeout(() => {
                        window.location.href = data.initPoint;
                    }, 1000);
                } else {
                    throw new Error('No se recibió el punto de inicio de pago.');
                }

            } catch (error) {
                console.error('Error en el checkout:', error);
                errorMsg.innerText = error.message;
                errorMsg.style.display = 'block';
                payButton.disabled = false;
                payButton.innerText = 'Pagar con Mercado Pago';
            }
        });
    }
});
