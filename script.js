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

// Variable para guardar los productos y no saturar el servidor
let allProducts = [];

async function fetchInventory() {
    const grid = document.querySelector('.grid-product');
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    try {
        const response = await fetch('http://localhost:3000/productos');
        if (!response.ok) throw new Error("Error en el servidor");
        
        allProducts = await response.json();

        let toRender = [];

        if (currentPage === "vinilos.html") {
            toRender = allProducts.filter(p => p.category === "Vinyls");
        } 
        else if (currentPage === "bandanna.html") {
            toRender = allProducts.filter(p => p.category === "Bandana");
        } 
        else if (currentPage === "anteojos.html") {
            toRender = allProducts.filter(p => p.category === "Glasses");
        } 
        else {
            toRender = allProducts;
        }

        render(toRender);

    } catch (error) {
        console.error("Error cargando productos:", error);
        if(grid) grid.innerHTML = "<p>Error al conectar con la tienda.</p>";
    }
}

function render(list) {
    const grid = document.querySelector('.grid-product');
    if (!grid) return; // Seguridad por si el div no existe en algún HTML

    grid.innerHTML = "";

    if (list.length === 0) {
        grid.innerHTML = "<p class='sec-sub'>No hay artículos en esta sección todavía.</p>";
        return;
    }

    list.forEach(p => {
        // Usamos encodeURI por si la URL de la imagen tiene espacios
        const safeUrl = p.image_url ? encodeURI(p.image_url) : 'https://via.placeholder.com/300';
        
        grid.innerHTML += `
            <div class="prod-card">
                <div class="prod-img-container">
                    <img src="${safeUrl}" alt="${p.name}" class="prod-img">
                </div>
                <div class="prod-info">
                    <h3 class="prod-name">${p.name}</h3>
                    <div class="prod-price">$${p.price}</div>
                    <p class="prod-desc">${p.description || "Vintage piece."}</p>
                    <button class="buy-btn" onclick="comprar('${p.name}')">ADQUIRIR</button>
                </div>
            </div>
        `;
    });
}

function comprar(nombre) {
    alert(`Añadiste ${nombre} al carrito.`);
}

// Arranca cuando carga el DOM
document.addEventListener('DOMContentLoaded', fetchInventory);

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
        mostrarNotificacion(" Error al agregar producto", true);
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


