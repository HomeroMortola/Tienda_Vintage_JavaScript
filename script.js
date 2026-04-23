async function fetchInventory() {
    const grid = document.querySelector('.grid-product');
    try {
        // Pedimos los datos directamente a tu servidor
        const response = await fetch('http://localhost:3000/productos');
        
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
            const imageurl = p.image_url ? p.image_url : 'https://via.placeholder.com/300x200?text=Sin+Imagen';

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
                        <button class="buy-btn" onclick="comprar('${p.name}')">comprar</button>
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

// Ejecutar cuando la página esté lista
document.addEventListener('DOMContentLoaded', fetchInventory);