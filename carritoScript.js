// carritoScript.js
import { supabase } from "./src/config/supabase.js";
import { CartRepository } from "./src/repositories/CartRepository.js";

const cartRepo = new CartRepository();
const userId = localStorage.getItem("usuarioId");

const fmt = (n) =>
  "$" +
  n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
async function cargarCarrito() {
  const container = document.getElementById("cart-items");

  if (!userId) {
    container.innerHTML =
      '<div style="padding:48px; text-align:center; font-style:italic; color:var(--ink-muted);">Debes iniciar sesión para ver tu carrito.</div>';
    return;
  }

  try {
    const items = await cartRepo.getCart(userId);

    if (items.length === 0) {
      container.innerHTML =
        '<div style="padding:48px; text-align:center; font-style:italic; color:var(--ink-muted);">🛒 Tu carrito está vacío</div>';
      actualizarTotales(0, 0);
      return;
    }

    let totalGeneral = 0;
    container.innerHTML = "";

    items.forEach((item) => {
      const p = item.product;
      if (!p) return;

      const subtotal = p.price * item.quantity;
      totalGeneral += subtotal;

      const row = document.createElement("div");
      row.className = "cart-item-row";
      row.style.display = "grid";
      row.style.gridTemplateColumns = "70px 1fr 130px 110px 40px";
      row.style.gap = "12px";
      row.style.padding = "12px 16px";
      row.style.alignItems = "center";
      row.style.borderBottom = "1px solid var(--paper-deep)";
      row.dataset.id = item.cartItemId;

      row.innerHTML = `
                <div class="item-img-box" style="width:60px; height:60px; overflow:hidden; border-radius:4px;">
                    <img src="${p.image_url || "https://via.placeholder.com/60"}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover;">
                </div>
                <div class="item-info">
                    <div class="item-title" style="font-family:'Playfair Display', serif; font-weight:700; color:var(--ink);">${p.name}</div>
                    <div class="item-meta" style="font-size:10px; text-transform:uppercase; color:var(--ink-muted); letter-spacing:1px;">${p.category}</div>
                </div>
                <div class="item-qty-controls" style="display:flex; align-items:center; gap:8px;">
                    <button class="qty-btn" style="background:var(--paper-deep); border:none; width:24px; height:24px; cursor:pointer;" onclick="updateQty('${item.cartItemId}', ${item.quantity - 1})">-</button>
                    <span id="qty-val-${item.cartItemId}" style="width:20px; text-align:center;">${item.quantity}</span>
                    <button class="qty-btn" style="background:var(--paper-deep); border:none; width:24px; height:24px; cursor:pointer;" onclick="updateQty('${item.cartItemId}', ${item.quantity + 1})">+</button>
                </div>
                <div class="item-price-box">
                    <div class="item-subtotal" style="font-weight:600; color:var(--ink);">${fmt(subtotal)}</div>
                    <div class="item-unit-price" style="font-size:10px; color:var(--ink-muted);">(${fmt(p.price)} c/u)</div>
                </div>
                <button class="item-remove" style="background:none; border:none; color:var(--ink-muted); cursor:pointer; font-size:16px;" onclick="eliminarItem('${item.cartItemId}')">✕</button>
            `;
      container.appendChild(row);
    });

    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    actualizarTotales(totalGeneral, totalQuantity);
  } catch (error) {
    console.error("Error cargando el carrito:", error);
    container.innerHTML =
      '<div style="padding:48px; text-align:center; font-style:italic; color:red;">Error al conectar con la base de datos.</div>';
  }
}

function actualizarTotales(total, count) {
    const itemCountEl = document.getElementById('item-count');
    const subtotalEl = document.getElementById('resumen-subtotal');
    const totalEl = document.getElementById('resumen-total');
    if (itemCountEl) itemCountEl.textContent = count;
    if (subtotalEl) subtotalEl.textContent = fmt(total);
    if (totalEl) totalEl.textContent = fmt(total);
}

// Funciones globales (window. porque es un módulo)
window.updateQty = async (itemId, newQty) => {
    let finalQty = parseInt(newQty);
    if (finalQty > 6) {
        alert("La cantidad máxima por compra es de 6 unidades.");
        finalQty = 6;

        const qtyInput = document.getElementById('qty-val-' + itemId);
        if (qtyInput) qtyInput.textContent = 6;

    }
    if (isNaN(finalQty) || finalQty < 1) return;
    try {
        const { error } = await supabase.from('cart_items').update({ quantity: finalQty }).eq('id', itemId);
        if (error) throw error;
        cargarCarrito();
    } catch (e) { 
        console.error("Error al actualizar cantidad:", e); 
        mostrarToast("Error al actualizar");
    }
};

window.eliminarItem = async (itemId) => {
  if (!confirm("¿Eliminar este artículo del carrito?")) return;
  try {
    await cartRepo.removeItem(itemId);
    mostrarToast("Artículo eliminado");
    cargarCarrito();
  } catch (e) {
    console.error("Error al eliminar item:", e);
    mostrarToast("Error al eliminar");
  }
};

window.vaciarCarrito = async () => {
  if (!confirm("¿Seguro que quieres vaciar todo el carrito?")) return;
  try {
    await cartRepo.clearCart(userId);
    mostrarToast("Carrito vaciado");
    cargarCarrito();
  } catch (e) {
    console.error("Error al vaciar carrito:", e);
    mostrarToast("Error al vaciar");
  }
};

function mostrarToast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2800);
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  cargarCarrito();

  // Configurar botones fijos
  const vaciarBtn = document.getElementById("vaciar-carrito-btn");
  if (vaciarBtn) {
    vaciarBtn.addEventListener("click", window.vaciarCarrito);
  }

  const checkoutBtn = document.getElementById("go-checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      window.location.href = "checkout.html";
    });
  }
});
