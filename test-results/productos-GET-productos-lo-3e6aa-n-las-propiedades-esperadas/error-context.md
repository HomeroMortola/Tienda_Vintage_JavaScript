# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: productos.spec.js >> GET /productos >> los productos tienen las propiedades esperadas
- Location: tests-e2e\productos.spec.js:16:5

# Error details

```
Error: expect(received).toHaveProperty(path)

Matcher error: received value must not be null nor undefined

Received has value: undefined
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('GET /productos', () => {
  4  | 
  5  |     test('devuelve status 200', async ({ request }) => {
  6  |         const response = await request.get('/productos');
  7  |         expect(response.status()).toBe(200);
  8  |     });
  9  | 
  10 |     test('devuelve un array de productos', async ({ request }) => {
  11 |         const response = await request.get('/productos');
  12 |         const body = await response.json();
  13 |         expect(Array.isArray(body)).toBe(true);
  14 |     });
  15 | 
  16 |     test('los productos tienen las propiedades esperadas', async ({ request }) => {
  17 |         const response = await request.get('/productos');
  18 |         const body = await response.json();
  19 |         const primer_producto = body[0];
  20 | 
> 21 |         expect(primer_producto).toHaveProperty('name');
     |                                 ^ Error: expect(received).toHaveProperty(path)
  22 |         expect(primer_producto).toHaveProperty('price');
  23 |         expect(primer_producto).toHaveProperty('stock');
  24 |         expect(primer_producto).toHaveProperty('category');
  25 |         expect(primer_producto).toHaveProperty('image_url');
  26 |     });
  27 | 
  28 |     test('todos los productos tienen precio mayor a cero', async ({ request }) => {
  29 |         const response = await request.get('/productos');
  30 |         const body = await response.json();
  31 |         body.forEach(producto => {
  32 |             expect(producto.price).toBeGreaterThan(0);
  33 |         });
  34 |     });
  35 | 
  36 |     test('todos los productos tienen stock no negativo', async ({ request }) => {
  37 |         const response = await request.get('/productos');
  38 |         const body = await response.json();
  39 |         body.forEach(producto => {
  40 |             expect(producto.stock).toBeGreaterThanOrEqual(0);
  41 |         });
  42 |     });
  43 | 
  44 | });
```