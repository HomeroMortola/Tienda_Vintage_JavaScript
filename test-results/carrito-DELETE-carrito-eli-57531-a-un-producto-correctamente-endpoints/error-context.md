# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: carrito.spec.js >> DELETE /carrito/eliminar/:id >> elimina un producto correctamente
- Location: tests-e2e\carrito.spec.js:86:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const USER_ID = 'test-user-123';
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
  16  |         const response = await request.get(`/carrito?userId=${USER_ID}`);
  17  |         expect(response.status()).toBe(200);
  18  |     });
  19  | 
  20  |     test('devuelve las propiedades esperadas', async ({ request }) => {
  21  |         const response = await request.get(`/carrito?userId=${USER_ID}`);
  22  |         const body = await response.json();
  23  | 
  24  |         expect(body).toHaveProperty('products');
  25  |         expect(body).toHaveProperty('total');
  26  |         expect(body).toHaveProperty('itemCount');
  27  |     });
  28  | 
  29  |     test('falla si no se envia userId', async ({ request }) => {
  30  |         const response = await request.get('/carrito');
  31  |         expect(response.status()).toBe(400);
  32  |         const body = await response.json();
  33  |         expect(body).toHaveProperty('error');
  34  |     });
  35  | 
  36  | });
  37  | 
  38  | test.describe('POST /carrito/agregar', () => {
  39  | 
  40  |     test('agrega un producto correctamente', async ({ request }) => {
  41  |         const response = await request.post('/carrito/agregar', {
  42  |             data: {
  43  |                 userId: USER_ID,
  44  |                 product: productoMock,
  45  |                 productId: productoMock.id
  46  |             }
  47  |         });
  48  | 
  49  |         expect(response.status()).toBe(200);
  50  | 
  51  |         const body = await response.json();
  52  | 
  53  |         expect(body.success).toBe(true);
  54  |         expect(body.cart.items).toBeGreaterThan(0);
  55  |         expect(body.cart.total).toBeGreaterThan(0);
  56  |     });
  57  | 
  58  |     test('falla si falta userId', async ({ request }) => {
  59  |         const response = await request.post('/carrito/agregar', {
  60  |             data: {
  61  |                 product: productoMock,
  62  |                 productId: productoMock.id
  63  |             }
  64  |         });
  65  |         expect(response.status()).toBe(400);
  66  |         const body = await response.json();
  67  |         expect(body).toHaveProperty('error');
  68  |     });
  69  | 
  70  |     test('falla si falta el producto', async ({ request }) => {
  71  |         const response = await request.post('/carrito/agregar', {
  72  |             data: {
  73  |                 userId: USER_ID,
  74  |                 productId: productoMock.id
  75  |             }
  76  |         });
  77  |         expect(response.status()).toBe(400);
  78  |         const body = await response.json();
  79  |         expect(body).toHaveProperty('error');
  80  |     });
  81  | 
  82  | });
  83  | 
  84  | test.describe('DELETE /carrito/eliminar/:id', () => {
  85  | 
  86  |     test('elimina un producto correctamente', async ({ request }) => {
  87  | 
  88  |         await request.post('/carrito/agregar', {
  89  |             data: {
  90  |                 userId: USER_ID,
  91  |                 product: productoMock,
  92  |                 productId: productoMock.id
  93  |             }
  94  |         });
  95  | 
  96  |         const response = await request.delete(`/carrito/eliminar/${productoMock.id}`, {
  97  |             data: { userId: USER_ID }
  98  |         });
  99  | 
> 100 |         expect(response.status()).toBe(200);
      |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  101 | 
  102 |         const body = await response.json();
  103 | 
  104 |         expect(body.success).toBe(true);
  105 |     });
  106 | 
  107 | 
  108 |     test('falla si falta sessionId', async ({ request }) => {
  109 |         const response = await request.delete(`/carrito/eliminar/${productoMock.id}`, {
  110 |             data: {}
  111 |         });
  112 |         expect(response.status()).toBe(400);
  113 |         const body = await response.json();
  114 |         expect(body).toHaveProperty('error');
  115 |     });
  116 | 
  117 |     test('falla si el id no existe en el carrito', async ({ request }) => {
  118 | 
  119 |         const response = await request.delete('/carrito/eliminar/999', {
  120 |             data: { userId: USER_ID }
  121 |         });
  122 | 
  123 |         // Tu controller actualmente responde 200 aunque el producto no exista
  124 |         expect(response.status()).toBe(200);
  125 | 
  126 |         const body = await response.json();
  127 |         expect(body.success).toBe(true);
  128 |     });
  129 | 
  130 | });
```