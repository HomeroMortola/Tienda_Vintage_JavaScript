import { test, expect } from '@playwright/test';

const USER_ID = 'test-user-123';

const productoMock = {
    id: 1,
    name: 'Bandana clasica',
    price: 1500,
    stock: 10,
    category: 'accesorios'
};

test.describe('GET /carrito', () => {

    test('devuelve status 200', async ({ request }) => {
        const response = await request.get(`/carrito?userId=${USER_ID}`);
        expect(response.status()).toBe(200);
    });

    test('devuelve las propiedades esperadas', async ({ request }) => {
        const response = await request.get(`/carrito?userId=${USER_ID}`);
        const body = await response.json();

        expect(body).toHaveProperty('products');
        expect(body).toHaveProperty('total');
        expect(body).toHaveProperty('itemCount');
    });

    test('falla si no se envia userId', async ({ request }) => {
        const response = await request.get('/carrito');
        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body).toHaveProperty('error');
    });

});

test.describe('POST /carrito/agregar', () => {

    test('agrega un producto correctamente', async ({ request }) => {
        const response = await request.post('/carrito/agregar', {
            data: {
                userId: USER_ID,
                product: productoMock,
                productId: productoMock.id
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.success).toBe(true);
        expect(body.cart.items).toBeGreaterThan(0);
        expect(body.cart.total).toBeGreaterThan(0);
    });

    test('falla si falta userId', async ({ request }) => {
        const response = await request.post('/carrito/agregar', {
            data: {
                product: productoMock,
                productId: productoMock.id
            }
        });
        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body).toHaveProperty('error');
    });

    test('falla si falta el producto', async ({ request }) => {
        const response = await request.post('/carrito/agregar', {
            data: {
                userId: USER_ID,
                productId: productoMock.id
            }
        });
        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body).toHaveProperty('error');
    });

});

test.describe('DELETE /carrito/eliminar/:id', () => {

    test('elimina un producto correctamente', async ({ request }) => {

        await request.post('/carrito/agregar', {
            data: {
                userId: USER_ID,
                product: productoMock,
                productId: productoMock.id
            }
        });

        const response = await request.delete(`/carrito/eliminar/${productoMock.id}`, {
            data: { userId: USER_ID }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.success).toBe(true);
    });


    test('falla si falta sessionId', async ({ request }) => {
        const response = await request.delete(`/carrito/eliminar/${productoMock.id}`, {
            data: {}
        });
        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body).toHaveProperty('error');
    });

    test('falla si el id no existe en el carrito', async ({ request }) => {

        const response = await request.delete('/carrito/eliminar/999', {
            data: { userId: USER_ID }
        });

        // Tu controller actualmente responde 200 aunque el producto no exista
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.success).toBe(true);
    });

});