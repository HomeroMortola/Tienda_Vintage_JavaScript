# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: carrito.spec.js >> DELETE /carrito/eliminar/:id >> elimina un producto correctamente
- Location: tests-e2e\carrito.spec.js:82:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 400
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const SESSION_ID = 'test-session-123';
  4   | 
  5   | const productoMock = {
  6   |     id: 1,
  7   |     name: 'Bandana clasica',
  8   |     price: 1500,
  9   |     stock: 10,
  10  |     category: 'accesorios'
  11  | };
  12  | 
  13  | test.describe('GET /carrito', () => {
  14  | 
  15  |     test('devuelve status 200', async ({ request }) => {
  16  |         const response = await request.get(`/carrito?sessionId=${SESSION_ID}`);
  17  |         expect(response.status()).toBe(200);
  18  |     });
  19  | 
  20  |     test('devuelve las propiedades esperadas', async ({ request }) => {
  21  |         const response = await request.get(`/carrito?sessionId=${SESSION_ID}`);
  22  |         const body = await response.json();
  23  |         expect(body).toHaveProperty('products');
  24  |         expect(body).toHaveProperty('total');
  25  |         expect(body).toHaveProperty('itemCount');
  26  |     });
  27  | 
  28  |     test('falla si no se envia sessionId', async ({ request }) => {
  29  |         const response = await request.get('/carrito');
  30  |         expect(response.status()).toBe(400);
  31  |         const body = await response.json();
  32  |         expect(body).toHaveProperty('error');
  33  |     });
  34  | 
  35  | });
  36  | 
  37  | test.describe('POST /carrito/agregar', () => {
  38  | 
  39  |     test('agrega un producto correctamente', async ({ request }) => {
  40  |         const response = await request.post('/carrito/agregar', {
  41  |             data: {
  42  |                 sessionId: SESSION_ID,
  43  |                 product: productoMock,
  44  |                 productId: productoMock.id
  45  |             }
  46  |         });
  47  |         expect(response.status()).toBe(200);
  48  |         const body = await response.json();
  49  |         expect(body.success).toBe(true);
  50  |         expect(body.cart.items).toBeGreaterThan(0);
  51  |         expect(body.cart.total).toBeGreaterThan(0);
  52  |     });
  53  | 
  54  |     test('falla si falta sessionId', async ({ request }) => {
  55  |         const response = await request.post('/carrito/agregar', {
  56  |             data: {
  57  |                 product: productoMock,
  58  |                 productId: productoMock.id
  59  |             }
  60  |         });
  61  |         expect(response.status()).toBe(400);
  62  |         const body = await response.json();
  63  |         expect(body).toHaveProperty('error');
  64  |     });
  65  | 
  66  |     test('falla si falta el producto', async ({ request }) => {
  67  |         const response = await request.post('/carrito/agregar', {
  68  |             data: {
  69  |                 sessionId: SESSION_ID,
  70  |                 productId: productoMock.id
  71  |             }
  72  |         });
  73  |         expect(response.status()).toBe(400);
  74  |         const body = await response.json();
  75  |         expect(body).toHaveProperty('error');
  76  |     });
  77  | 
  78  | });
  79  | 
  80  | test.describe('DELETE /carrito/eliminar/:id', () => {
  81  | 
  82  |     test('elimina un producto correctamente', async ({ request }) => {
  83  |         await request.post('/carrito/agregar', {
  84  |             data: {
  85  |                 sessionId: SESSION_ID,
  86  |                 product: productoMock,
  87  |                 productId: productoMock.id
  88  |             }
  89  |         });
  90  | 
  91  |         const response = await request.delete(`/carrito/eliminar/${productoMock.id}`, {
  92  |             data: { sessionId: SESSION_ID }
  93  |         });
  94  | 
> 95  |         expect(response.status()).toBe(200);
      |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  96  |         const body = await response.json();
  97  |         expect(body.success).toBe(true);
  98  |     });
  99  | 
  100 |     test('falla si falta sessionId', async ({ request }) => {
  101 |         const response = await request.delete(`/carrito/eliminar/${productoMock.id}`, {
  102 |             data: {}
  103 |         });
  104 |         expect(response.status()).toBe(400);
  105 |         const body = await response.json();
  106 |         expect(body).toHaveProperty('error');
  107 |     });
  108 | 
  109 |     test('falla si el id no existe en el carrito', async ({ request }) => {
  110 |         const response = await request.delete('/carrito/eliminar/999', {
  111 |             data: { sessionId: SESSION_ID }
  112 |         });
  113 |         expect(response.status()).toBe(500);
  114 |     });
  115 | 
  116 | });
```