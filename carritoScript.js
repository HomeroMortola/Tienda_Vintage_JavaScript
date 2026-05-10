import { CartRepository } from './src/repositories/CartRepository.js';

  const cartRepo = new CartRepository();
  const userId = localStorage.getItem('usuarioId');

  // Formateador de moneda (respetando tu estilo)
  const fmt = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  async function cargarCarrito() {
    const container = document.getElementById('cart-items');
    
    if (!userId) {
      container.innerHTML = '<div class="empty-msg">Debes iniciar sesión para ver tu carrito.</div>';
      return;
    }

    try {
      const items = await cartRepo.getCart(userId);
      
      if (items.length === 0) {
        container.innerHTML = '<div class="empty-msg">🛒 Tu carrito está vacío</div>';
        actualizarTotales(0);
        return;
      }

      let totalGeneral = 0;
      container.innerHTML = ''; // Limpiar placeholders

      items.forEach(item => {
        const p = item.product;
        const subtotal = p.price * item.quantity;
        totalGeneral += subtotal;

        // Creamos la fila respetando EXACTAMENTE tus clases de CSS
        const row = document.createElement('div');
        row.className = 'cart-item-row';
        row.dataset.id = item.cartItemId;

        row.innerHTML = `
          <div class="item-img-box">
            <img src="${p.image_url}" alt="${p.name}">
          </div>
          <div class="item-info">
            <div class="item-title">${p.name}</div>
            <div class="item-meta">${p.category}</div>
          </div>
          <div class="item-qty-controls">
            <button class="qty-btn" onclick="updateQty('${item.cartItemId}', ${item.quantity - 1})">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" onclick="updateQty('${item.cartItemId}', ${item.quantity + 1})">+</button>
          </div>
          <div class="item-price-box">
            <div class="item-price">${fmt(p.price)}</div>
            <div class="item-subtotal">${fmt(subtotal)}</div>
          </div>
          <button class="item-remove" onclick="eliminarItem('${item.cartItemId}')">✕</button>
        `;
        container.appendChild(row);
      });

      actualizarTotales(totalGeneral);

    } catch (error) {
      console.error("Error cargando el carrito:", error);
      container.innerHTML = '<div class="empty-msg">Error al conectar con la tienda.</div>';
    }
  }

  // Funciones globales para los botones (window. porque es un módulo)
  window.updateQty = async (itemId, newQty) => {
    if (newQty < 1) return;
    try {
      // Aquí podrías usar un método updateQuantity en tu repo, 
      // por ahora usamos la lógica de refrescar tras el cambio
      await supabase.from('cart_items').update({ quantity: newQty }).eq('id', itemId);
      cargarCarrito();
    } catch (e) { console.error(e); }
  };

  window.eliminarItem = async (itemId) => {
    if (!confirm("¿Eliminar este artículo?")) return;
    try {
      await cartRepo.removeItem(itemId);
      cargarCarrito();
    } catch (e) { console.error(e); }
  };

  window.vaciarCarrito = async () => {
    if (!confirm("¿Vaciar todo el carrito?")) return;
    try {
      await cartRepo.clearCart(userId);
      cargarCarrito();
    } catch (e) { console.error(e); }
  };

  function actualizarTotales(total) {
    const count = document.querySelectorAll('.cart-item-row').length;
    document.getElementById('item-count').textContent = count;
    document.getElementById('resumen-subtotal').textContent = fmt(total);
    document.getElementById('resumen-total').textContent = fmt(total);
  }

  // Carga inicial
  document.addEventListener('DOMContentLoaded', cargarCarrito);