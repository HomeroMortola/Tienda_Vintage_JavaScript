import { test, expect } from '@playwright/test';

const productoValido = {
    name: 'Bandana clasica',
    price: 1500,
    stock: 10,
    image_url: 'https://imagen.com/bandana.jpg',
    description: 'Bandana vintage',
    category: 'accesorios'
};

test.describe('POST /createproduct — validaciones', () => {

    test('falla si falta el nombre', async ({ request }) => {
        const { name, ...sinNombre } = productoValido;
        const response = await request.post('/createproduct', {
            data: sinNombre
        });
        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.error).toBe('el nombre es obligatorio');
    });

    test('falla si el nombre esta vacio', async ({ request }) => {
        const response = await request.post('/createproduct', {
            data: { ...productoValido, name: '' }
        });
        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.error).toBe('el nombre es obligatorio');
    });

    test('falla si falta el precio', async ({ request }) => {
        const { price, ...sinPrecio } = productoValido;
        const response = await request.post('/createproduct', {
            data: sinPrecio
        });
        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.error).toBe('el precio debe ser un numero mayor a cero');
    });

    test('falla si el precio es cero', async ({ request }) => {
        const response = await request.post('/createproduct', {
            data: { ...productoValido, price: 0 }
        });
        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.error).toBe('el precio debe ser un numero mayor a cero');
    });

    test('falla si el precio es negativo', async ({ request }) => {
        const response = await request.post('/createproduct', {
            data: { ...productoValido, price: -100 }
        });
        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.error).toBe('el precio debe ser un numero mayor a cero');
    });

    test('falla si el stock es negativo', async ({ request }) => {
        const response = await request.post('/createproduct', {
            data: { ...productoValido, stock: -1 }
        });
        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.error).toBe('el stock no puede ser negativo');
    });

    test('falla si falta la imagen', async ({ request }) => {
        const { image_url, ...sinImagen } = productoValido;
        const response = await request.post('/createproduct', {
            data: sinImagen
        });
        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.error).toBe('la imagen es obligatoria');
    });

    test('falla si falta la descripcion', async ({ request }) => {
        const { description, ...sinDescripcion } = productoValido;
        const response = await request.post('/createproduct', {
            data: sinDescripcion
        });
        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.error).toBe('la descripcion es obligatoria');
    });

    test('falla si falta la categoria', async ({ request }) => {
        const { category, ...sinCategoria } = productoValido;
        const response = await request.post('/createproduct', {
            data: sinCategoria
        });
        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.error).toBe('la categoria es obligatoria');
    });

});