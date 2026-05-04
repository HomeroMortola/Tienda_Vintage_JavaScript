import { ShoppingCart } from "../models/ShoppingCart.js";

const carts = new Map();

export function getOrCreateCart(sessionId) {
    if (!carts.has(sessionId)) {
        carts.set(sessionId, new ShoppingCart());
    }
    return carts.get(sessionId);
}

export function clearCartSession(sessionId) {
    carts.delete(sessionId);
}
