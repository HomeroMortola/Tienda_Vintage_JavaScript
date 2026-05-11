import { ShoppingCart } from './ShoppingCart.js';

export class ShoppingCartBuilder {
    constructor() {
        this.reset();
    }

    reset() {
        this.cart = {
            userId: null,
            items: [],
            createdDate: Date.now()
        };
        return this;
    }

    /**
     * @param {string} userId
     */
    setUserId(userId) {
        if (!userId) {
            throw new Error("El ID de usuario es obligatorio para el carrito");
        }
        this.userId = userId;
        return this;
    }

    /**
     * @param {Array} items - Array de objetos { product, quantity }
     */
    setItems(items) {
        if (!Array.isArray(items)) {
            throw new Error("Los items deben ser un arreglo");
        }
        this.items = items;
        return this;
    }

    /**
     * @param {Object} product
     * @param {number} quantity
     */
    addItem(product, quantity = 1) {
        if (!product || !product.id) {
            throw new Error("Producto inválido");
        }
        this.items.push({ product, quantity });
        return this;
    }

    /**
     * @param {number} timestamp
     */
    setCreatedDate(timestamp) {
        this.createdDate = timestamp;
        return this;
    }

    build() {
        const result = new ShoppingCart(this.userId, this.items);
        this.reset();
        return result;
    }
}