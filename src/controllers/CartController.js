import { ShoppingCart } from "../models/ShoppingCart.js";
import { APP_URL } from "../../api/appURL.js";
import { executePurchase } from "../services/CheckoutServices.js";

const carts = new Map();

const getOrCreateCart = (userId) => {
    if (!carts.has(userId)) {
        carts.set(userId, new ShoppingCart());
    }
    return carts.get(userId);
};

export const addToCart = (request, response) => {
    try {
        const { userId, product, productId } = request.body;

        if (!userId || !product || productId === undefined) {
            return response.status(400).json({ error: "Faltan datos (userId, product, productId)" });
        }

        const cart = getOrCreateCart(userId);
        cart.addProduct(product, productId);
        cart.calculate_final_price(cart.products);

        response.json({
            success: true,
            message: "Producto agregado al carrito",
            cart: {
                items: cart.products.length,
                total: cart.total_price,
               },
            });
    } catch (error) {
        console.error("Error al agregar producto:", error);
        response.status(500).json({ error: "Error al agregar producto" });
    }
};

export const getCart = (request, response) => {
    try {
        const { userId } = request.query;

        if (!userId) {
            return response.status(400).json({ error: "Falta userId" });
        }

        const cart = getOrCreateCart(userId);

        response.json({
            products: cart.products,
            total: cart.total_price,
            itemCount: cart.products.length,
        });
    } catch (error) {
        console.error("Error al obtener carrito:", error);
        response.status(500).json({ error: "Error al obtener carrito" });
    }
};

export const removeFromCart = (request, response) => {
    try {
        const { userId } = request.body;
        const { id } = request.params;
        const productId = parseInt(id, 10);

        if (!userId || Number.isNaN(productId)) {
            return response.status(400).json({ error: "Datos inválidos" });
        }

        const cart = getOrCreateCart(userId);
        cart.removeProduct(productId);
        cart.calculate_final_price(cart.products);

        response.json({
            success: true,
            message: "Producto eliminado del carrito",
            cart: {
                items: cart.products.length,
                total: cart.total_price,
            },
        });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        response.status(500).json({ error: "Error al eliminar producto" });
    }
};

export const clearCartSession = (userId) => {
    carts.delete(userId);
};

