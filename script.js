// Generar ID de sesión única para el usuario
const getSessionId = () => {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
};

const SESSION_ID = getSessionId();
const API_URL = 'http://localhost:3000';

async function fetchInventory() {
    const grid = document.getElementById('prod-grid');
    try {
        const response = await fetch(`${API_URL}/productos`);
        
        if (!response.ok) throw new Error("No se pudo conectar con el servidor");

        const productos = await response.json();
        
        // Limpiamos el contenedor antes de renderizar
        grid.innerHTML = "";
        
        if (productos.length === 0) {
            grid.innerHTML = "<p class='sec-sub'>No hay productos disponibles por ahora.</p>";
            return;
        }
        // Renderizamos usando directamente los datos de la base de datos
        productos.forEach(p => {
            const imageurl = p.imageurl ? p.imageurl : 'https://via.placeholder.com/300x200?text=Sin+Imagen';

            grid.innerHTML += `
                <div class="prod-card">
                    <div class="prod-img-container">
                        <img src="${imageurl}" alt="${p.name}" class="prod-img">
                    </div>
                    <div class="prod-info">
                        <div class="prod-cat">Colección Especial</div>
                        <h3 class="prod-name">${p.name}</h3>
                        <div class="prod-price">$${p.price}</div>
                        <p class="prod-desc">${p.description || "Pieza única de colección."}</p>
                        <button class="buy-btn" onclick="agregarAlCarrito({id: ${p.id}, nombre: '${p.name}', precio: ${p.price}, descripcion: '${p.description || ''}'}, ${p.id})">
                            Adquirir
                        </button>
                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.error("Error al cargar productos:", error);
        grid.innerHTML = "<p class='sec-sub'>Error al conectar con la tienda. Revisá si 'node app.js' está corriendo.</p>";
    }
}

function comprar(nombre) {
    alert(`Has seleccionado: ${nombre}. ¡Próximamente podrás finalizar tu compra!`);
}

// Toggle del panel del carrito
function toggleCart() {
    const cartPanel = document.getElementById('cart-panel');
    if (cartPanel) {
        cartPanel.classList.toggle('open');
    }
}

// Mostrar notificación
function mostrarNotificacion(mensaje, esError = false) {
    const notification = document.createElement('div');
    notification.className = `notification ${esError ? 'error' : 'success'}`;
    notification.textContent = mensaje;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

async function getCartFromServer() {
    try {
        const response = await fetch(`${API_URL}/carrito?sessionId=${SESSION_ID}`);
        if (!response.ok) throw new Error("Error al obtener carrito");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return { products: [], total: 0, itemCount: 0 };
    }
}

// Agregar producto al carrito
async function agregarAlCarrito(producto, id) {
    try {
        const response = await fetch(`${API_URL}/carrito/agregar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sessionId: SESSION_ID,
                product: producto,
                productId: id
            })
        });
        
        if (!response.ok) throw new Error("Error al agregar producto");
        
        const data = await response.json();
        mostrarNotificacion(`✓ ${producto.nombre} agregado al carrito`);
        actualizarCarrito();
        
    } catch (error) {
        console.error("Error:", error);
        mostrarNotificacion("❌ Error al agregar producto", true);
    }
}

// Eliminar producto del carrito
async function eliminarDelCarrito(id) {
    try {
        const response = await fetch(`${API_URL}/carrito/eliminar/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId: SESSION_ID })
        });
        
        if (!response.ok) throw new Error("Error al eliminar producto");
        
        mostrarNotificacion(" Producto eliminado del carrito");
        actualizarCarrito();
        
    } catch (error) {
        console.error("Error:", error);
        mostrarNotificacion(" Error al eliminar producto", true);
    }
}

// Finalizar compra
async function finalizarCompra() {
    try {
        const response = await fetch(`${API_URL}/carrito/comprar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId: SESSION_ID })
        });
        
        if (!response.ok) throw new Error("Error en la compra");
        
        const data = await response.json();
        mostrarNotificacion(" ¡Compra realizada exitosamente!");
        
        // Limpiar carrito en UI
        setTimeout(() => {
            actualizarCarrito();
        }, 500);
        
    } catch (error) {
        console.error("Error:", error);
        mostrarNotificacion(" Error al procesar la compra", true);
    }
}

// Actualizar carrito en la UI
async function actualizarCarrito() {
    const cart = await getCartFromServer();
    const cartIcon = document.querySelector('.cart-icon');
    const cartPanel = document.getElementById('cart-panel');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Actualizar badge de cantidad
    if (cartIcon) {
        cartIcon.textContent = cart.itemCount;
    }

    // Renderizar items del carrito
    if (cartItems && cart.products.length > 0) {
        cartItems.innerHTML = cart.products.map((product, index) => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${product.nombre || product.productName}</h4>
                    <p class="cart-item-price">$${product.precio || product.price}</p>
                </div>
                <button class="remove-btn" onclick="eliminarDelCarrito(${product.id})">✕</button>
            </div>
        `).join('');
    } else if (cartItems) {
        cartItems.innerHTML = '<p class="empty-cart">El carrito está vacío</p>';
    }

    // Actualizar total
    if (cartTotal) {
        cartTotal.textContent = `$${cart.total.toFixed(2)}`;
    }
}

// Ejecutar cuando la página esté lista
document.addEventListener('DOMContentLoaded', () => {
    fetchInventory();
    actualizarCarrito();
});