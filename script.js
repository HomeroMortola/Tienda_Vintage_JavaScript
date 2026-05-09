const categoryMap = {
    "vinilos.html": "Vinyls", 
    "bandanna.html": "Bandanna",
    "anteojos.html": "Glasses",
    "T_Shirts.html": "T_Shirts",
};

import { ProductRepository } from '../src/repositories/ProductRepository.js';
import { CartRepository } from '../src/repositories/CartRepository.js';
const cartRepo = new CartRepository();

const API_URL = 'http://localhost:3000';

async function apiFetch(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, options);
    if (!response.ok) throw new Error(`Error en ${path}`);
    return response.json();
}

function jsonBody(method, data) {
    return {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
}

// Variable para guardar los productos y no saturar el servidor
let allProducts = [];
const repo = new ProductRepository();

async function fetchInventory() {
    
    try {
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        const targetCategory = categoryMap[currentPage];
        

       let products;

        if(targetCategory) {
            products = await repo.getProductsByCategory(targetCategory);
        }
        else {
            products = await repo.getProducts();
        }

        render(products);

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
        const card = document.createElement('div');
        card.className = 'prod-card';

        const image_url = p.image_url ? p.image_url : 'https://via.placeholder.com/300';

        card.innerHTML = `
            <div class="prod-img-container">
                <img src="${image_url}" alt="${p.name}" class="prod-img">
            </div>
            <div class="prod-info">
                <h3 class="prod-name">${p.name}</h3>
                <div class="prod-price">$${p.price}</div>
                <p class="prod-desc">${p.description || "Vintage piece."}</p>
                <button class="buy-btn">VER DETALLE</button>
            </div>
        `;

        card.querySelector('.buy-btn').addEventListener('click', () => mostrarDetalle(p));
        grid.appendChild(card);
    });
}

async function mostrarDetalle(p) {
    const image_url = p.image_url || 'https://via.placeholder.com/300';

    const meta = p.metadata || {};
    const metaHtml = Object.entries(meta)
        .filter(([, v]) => v !== null && v !== undefined && v !== '')
        .map(([k, v]) => `
            <div class="modal-meta-row">
                <span class="modal-meta-key">${k}</span>
                <span class="modal-meta-val">${v}</span>
            </div>
        `).join('');

    let modal = document.getElementById('product-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'product-modal';
        modal.className = 'product-modal-overlay';
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) cerrarModal();
        });
    }

    modal.innerHTML = `
        <div class="product-modal-box">
            <button class="modal-close-btn" id="modal-close">✕</button>
            <img src="${image_url}" alt="${p.name}" class="modal-img">
            <div class="modal-body">
                <h2 class="modal-name">${p.name}</h2>
                <div class="modal-price">$${p.price}</div>
                ${p.description ? `<p class="modal-desc">${p.description}</p>` : ''}
                ${metaHtml ? `<div class="modal-meta">${metaHtml}</div>` : ''}
                <h3 id="quantyPurchase">Cantidad a comparar</h3>
                <input type="number" id="quantity" name="quantity" min="1" value="1">
                <button class="buy-btn modal-buy-btn">COMPRA</button>
            </div>
        </div>
    `;
    const btnAdd = modal.querySelector('#btn-add-to-cart');
    btnAdd.addEventListener('click', async () => {
        const userId = localStorage.getItem('usuarioId');
        
        if (!userId) {
            alert("Debes iniciar sesión o registrarte para agregar productos al carrito.");
            window.location.href = 'register.html';
            return;
        }

        const quantityInput = document.getElementById('quantity');
        const quantity = parseInt(quantityInput.value, 10);

        try {
            btnAdd.disabled = true;
            btnAdd.textContent = "Agregando...";

            // Llamamos al repositorio (asegúrate de que 'cartRepo' esté instanciado al inicio del script.js)
            await cartRepo.addToCart(userId, p.id, quantity);

            alert(`¡${p.name} agregado con éxito!`);
            cerrarModal();
        } catch (error) {
            console.error("Error al agregar al carrito:", error);
            alert("No se pudo agregar el producto. Intentá de nuevo.");
        } finally {
            btnAdd.disabled = false;
            btnAdd.textContent = "COMPRA";
        }
    });

    modal.querySelector('#quantity').addEventListener('change', validationQuantity);
    modal.querySelector('#modal-close').addEventListener('click', cerrarModal);
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function validationQuantity() {
    const quantityInput = document.getElementById('quantity');
    const value = parseInt(quantityInput.value, 10);

      if (value > 6) {
        alert("La cantidad máxima por compra es de 6 unidades.");
        quantityInput.value = 6; // Lo bajamos al máximo permitido
        return false;
    } else if (value < 1 ) {
        alert("Por favor, ingresa una cantidad válida (mínimo 1).");
        quantityInput.value = 1;
        return false;
    }
    
    return true;
}

function cerrarModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// Arranca cuando carga el DOM
document.addEventListener('DOMContentLoaded', fetchInventory);
/*
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
        return await apiFetch(`/carrito?sessionId=${SESSION_ID}`);
    } catch (error) {
        console.error("Error:", error);
        return { products: [], total: 0, itemCount: 0 };
    }
}

// Agregar producto al carrito
async function agregarAlCarrito(producto, id) {
    try {
        await apiFetch('/carrito/agregar', jsonBody('POST', {
            sessionId: SESSION_ID,
            product: producto,
            productId: id
        }));
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
        await apiFetch(`/carrito/eliminar/${id}`, jsonBody('DELETE', { sessionId: SESSION_ID }));
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
        await apiFetch('/carrito/comprar', jsonBody('POST', { sessionId: SESSION_ID }));
        mostrarNotificacion(" ¡Compra realizada exitosamente!");
        setTimeout(() => actualizarCarrito(), 500);
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
}*/


