// public/checkoutClient.js

document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkout-form');
    const payButton = document.getElementById('pay-button');
    const toast = document.getElementById('toast');
    const errorMsg = document.getElementById('login-error');

    // 1. Interceptamos el envío del formulario
    checkoutForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que la página se recargue

        // Ocultamos mensajes de error previos y cambiamos el estado del botón
        errorMsg.style.display = 'none';
        payButton.disabled = true;
        payButton.innerText = 'Procesando pago...';

        try {
            // 2. Recuperamos el carrito (Asumiendo que lo guardas en localStorage)
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            
            if (cartItems.length === 0) {
                throw new Error('El carrito está vacío. Agrega productos antes de pagar.');
            }

            // 3. Recopilamos los datos del comprador
            const buyerData = {
                name: document.getElementById('name-input').value,
                surname: document.getElementById('lastname-input').value,
                email: document.getElementById('email-input').value,
                // Puedes agregar más campos según lo que necesite tu backend
            };

            // 4. Hacemos la petición POST a nuestra propia API en Vercel
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: cartItems,
                    buyer: buyerData
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al generar la orden de pago');
            }

            // 5. ¡LA REDIRECCIÓN MÁGICA!
            // data.initPoint es la URL oficial que nos devolvió Mercado Pago desde el backend
            toast.style.display = 'block';
            toast.innerText = 'Redirigiendo a Mercado Pago...';
            
            // Redirigimos al usuario a la URL de pago de producción (o sandboxInitPoint para pruebas)
            window.location.href = data.initPoint; 

        } catch (error) {
            console.error('Error en el checkout:', error);
            errorMsg.innerText = error.message;
            errorMsg.style.display = 'block';
            
            // Restauramos el botón si algo falla
            payButton.disabled = false;
            payButton.innerText = 'Pagar con Mercado Pago';
        }
    });
});