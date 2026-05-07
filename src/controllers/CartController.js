// src/controllers/CartController.js

import { ShoppingCart } from "../models/ShoppingCart.js";
import { APP_URL } from "../../api/appURL.js";
import { executePurcharse } from "../../api/checkout.js";

const carts = new Map();

const getOrCreateCart = (sessionId) => {
    if (!carts.has(sessionId)) {
        carts.set(sessionId, new ShoppingCart());
    }
    return carts.get(sessionId);
};



export const addToCart = (req, res) => {
    try {
        const { sessionId, product, productId } = req.body;

        if (!sessionId || !product || productId === undefined) {
            return res.status(400).json({ error: "Faltan datos (sessionId, product, productId)" });
        }

        const cart = getOrCreateCart(sessionId);
        cart.addProduct(product, productId);
        cart.calculate_final_price(cart.products);

        res.json({
            success: true,
            message: "Producto agregado al carrito",
            cart: {
                items: cart.products.length,
                total: cart.total_price,
            },
        });
    } catch (error) {
        console.error("Error al agregar producto:", error);
        res.status(500).json({ error: "Error al agregar producto" });
    }
};

export const getCart = (req, res) => {
    try {
        const { sessionId } = req.query;

        if (!sessionId) {
            return res.status(400).json({ error: "Falta sessionId" });
        }

        const cart = getOrCreateCart(sessionId);

        res.json({
            products: cart.products,
            total: cart.total_price,
            itemCount: cart.products.length,
        });
    } catch (error) {
        console.error("Error al obtener carrito:", error);
        res.status(500).json({ error: "Error al obtener carrito" });
    }
};

export const removeFromCart = (req, res) => {
    try {
        const { sessionId } = req.body;
        const { id } = req.params;
        const productId = parseInt(id, 10);

        if (!sessionId || Number.isNaN(productId)) {
            return res.status(400).json({ error: "Datos inválidos" });
        }

        const cart = getOrCreateCart(sessionId);
        cart.removeProduct(productId);
        cart.calculate_final_price(cart.products);

        res.json({
            success: true,
            message: "Producto eliminado del carrito",
            cart: {
                items: cart.products.length,
                total: cart.total_price,
            },
        });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ error: "Error al eliminar producto" });
    }
};

export const checkout = async (req, res) => {
    try {
        const { sessionId } = req.body;

        if (!sessionId) {
            return res.status(400).json({ error: "Falta sessionId" });
        }

        const result = await executePurchase(sessionId, req.body);

        if (!result.success) {
            return res.status(400).json({ error: result.error ?? "No se pudo completar la compra" });
        }

        res.json({
            success: true,
            message: "¡Compra realizada exitosamente!",
            order: result.order,
        });
    } catch (error) {
        console.error("Error en checkout:", error);
        res.status(500).json({ error: "Error al procesar compra" });
    }
};
