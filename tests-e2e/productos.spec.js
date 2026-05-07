import { test, expect } from '@playwright/test';

test.describe('GET /productos', () => {

    test('devuelve status 200', async ({ request }) => {
        const response = await request.get('/productos');
        expect(response.status()).toBe(200);
    });

    test('devuelve un array de productos', async ({ request }) => {
        const response = await request.get('/productos');
        const body = await response.json();
        expect(Array.isArray(body)).toBe(true);
    });

    test('los productos tienen las propiedades esperadas', async ({ request }) => {
        const response = await request.get('/productos');
        const body = await response.json();
        const primer_producto = body[0];

        expect(primer_producto).toHaveProperty('name');
        expect(primer_producto).toHaveProperty('price');
        expect(primer_producto).toHaveProperty('stock');
        expect(primer_producto).toHaveProperty('category');
        expect(primer_producto).toHaveProperty('image_url');
    });

    test('todos los productos tienen precio mayor a cero', async ({ request }) => {
        const response = await request.get('/productos');
        const body = await response.json();
        body.forEach(producto => {
            expect(producto.price).toBeGreaterThan(0);
        });
    });

    test('todos los productos tienen stock no negativo', async ({ request }) => {
        const response = await request.get('/productos');
        const body = await response.json();
        body.forEach(producto => {
            expect(producto.stock).toBeGreaterThanOrEqual(0);
        });
    });

});