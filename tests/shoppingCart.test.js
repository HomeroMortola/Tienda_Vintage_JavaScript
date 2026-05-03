import { describe, it, expect, beforeEach } from 'vitest';
import { ShoppingCart } from '../src/models/ShoppingCart.js';

describe('ShoppingCart', () => {

    let cart;
    let product1;
    let product2;

    beforeEach(() => {
        cart = new ShoppingCart();
        product1 = { id: 1, productName: 'Bandana clásica', price: 1500 };
        product2 = { id: 2, productName: 'Anteojos vintage', price: 3200 };
    });

    // carrito vacio

    it('inicia con total en cero', () => {
        expect(cart.total_price).toBe(0);
    });

    it('inicia sin productos', () => {
        expect(cart.products.length).toBe(0);
    });

    //agaregar productos 

    it('agrega un producto correctamente', () => {
        cart.addProduct(product1);
        expect(cart.products.length).toBe(1);
        expect(cart.products[0]).toBe(product1);
    });

    it('agrega el id del producto a products_id', () => {
        cart.addProduct(product1);
        expect(cart.products_id).toContain(1);
    });

    it('calcula el total al agregar un producto', () => {
        cart.addProduct(product1);
        expect(cart.total_price).toBe(1500);
    });

    it('calcula el total al agregar varios productos', () => {
        cart.addProduct(product1);
        cart.addProduct(product2);
        expect(cart.total_price).toBe(4700);
    });

    // eliminar productos 

    it('elimina un producto correctamente', () => {
        cart.addProduct(product1);
        cart.addProduct(product2);
        cart.removeProduct(1);
        expect(cart.products.length).toBe(1);
        expect(cart.products[0]).toBe(product2);
    });

    it('elimina el id de products_id al remover un producto', () => {
        cart.addProduct(product1);
        cart.removeProduct(1);
        expect(cart.products_id).not.toContain(1);
    });

    it('recalcula el total al eliminar un producto', () => {
        cart.addProduct(product1);
        cart.addProduct(product2);
        cart.removeProduct(1);
        expect(cart.total_price).toBe(3200);
    });

    it('el total vuelve a cero al eliminar todos los productos', () => {
        cart.addProduct(product1);
        cart.removeProduct(1);
        expect(cart.total_price).toBe(0);
    });

    // ID inexistente 

    it('no modifica el carrito al eliminar un id inexistente', () => {
        cart.addProduct(product1);
        cart.removeProduct(999);
        expect(cart.products.length).toBe(1);
        expect(cart.total_price).toBe(1500);
    });

});