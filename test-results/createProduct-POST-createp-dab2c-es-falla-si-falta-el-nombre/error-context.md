# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: createProduct.spec.js >> POST /createproduct — validaciones >> falla si falta el nombre
- Location: tests-e2e\createProduct.spec.js:14:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 400
Received: 404
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const productoValido = {
  4   |     name: 'Bandana clasica',
  5   |     price: 1500,
  6   |     stock: 10,
  7   |     image_url: 'https://imagen.com/bandana.jpg',
  8   |     description: 'Bandana vintage',
  9   |     category: 'accesorios'
  10  | };
  11  | 
  12  | test.describe('POST /createproduct — validaciones', () => {
  13  | 
  14  |     test('falla si falta el nombre', async ({ request }) => {
  15  |         const { name, ...sinNombre } = productoValido;
  16  |         const response = await request.post('/createproduct', {
  17  |             data: sinNombre
  18  |         });
> 19  |         expect(response.status()).toBe(400);
      |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  20  |         const body = await response.json();
  21  |         expect(body.error).toBe('el nombre es obligatorio');
  22  |     });
  23  | 
  24  |     test('falla si el nombre esta vacio', async ({ request }) => {
  25  |         const response = await request.post('/createproduct', {
  26  |             data: { ...productoValido, name: '' }
  27  |         });
  28  |         expect(response.status()).toBe(400);
  29  |         const body = await response.json();
  30  |         expect(body.error).toBe('el nombre es obligatorio');
  31  |     });
  32  | 
  33  |     test('falla si falta el precio', async ({ request }) => {
  34  |         const { price, ...sinPrecio } = productoValido;
  35  |         const response = await request.post('/createproduct', {
  36  |             data: sinPrecio
  37  |         });
  38  |         expect(response.status()).toBe(400);
  39  |         const body = await response.json();
  40  |         expect(body.error).toBe('el precio debe ser un numero mayor a cero');
  41  |     });
  42  | 
  43  |     test('falla si el precio es cero', async ({ request }) => {
  44  |         const response = await request.post('/createproduct', {
  45  |             data: { ...productoValido, price: 0 }
  46  |         });
  47  |         expect(response.status()).toBe(400);
  48  |         const body = await response.json();
  49  |         expect(body.error).toBe('el precio debe ser un numero mayor a cero');
  50  |     });
  51  | 
  52  |     test('falla si el precio es negativo', async ({ request }) => {
  53  |         const response = await request.post('/createproduct', {
  54  |             data: { ...productoValido, price: -100 }
  55  |         });
  56  |         expect(response.status()).toBe(400);
  57  |         const body = await response.json();
  58  |         expect(body.error).toBe('el precio debe ser un numero mayor a cero');
  59  |     });
  60  | 
  61  |     test('falla si el stock es negativo', async ({ request }) => {
  62  |         const response = await request.post('/createproduct', {
  63  |             data: { ...productoValido, stock: -1 }
  64  |         });
  65  |         expect(response.status()).toBe(400);
  66  |         const body = await response.json();
  67  |         expect(body.error).toBe('el stock no puede ser negativo');
  68  |     });
  69  | 
  70  |     test('falla si falta la imagen', async ({ request }) => {
  71  |         const { image_url, ...sinImagen } = productoValido;
  72  |         const response = await request.post('/createproduct', {
  73  |             data: sinImagen
  74  |         });
  75  |         expect(response.status()).toBe(400);
  76  |         const body = await response.json();
  77  |         expect(body.error).toBe('la imagen es obligatoria');
  78  |     });
  79  | 
  80  |     test('falla si falta la descripcion', async ({ request }) => {
  81  |         const { description, ...sinDescripcion } = productoValido;
  82  |         const response = await request.post('/createproduct', {
  83  |             data: sinDescripcion
  84  |         });
  85  |         expect(response.status()).toBe(400);
  86  |         const body = await response.json();
  87  |         expect(body.error).toBe('la descripcion es obligatoria');
  88  |     });
  89  | 
  90  |     test('falla si falta la categoria', async ({ request }) => {
  91  |         const { category, ...sinCategoria } = productoValido;
  92  |         const response = await request.post('/createproduct', {
  93  |             data: sinCategoria
  94  |         });
  95  |         expect(response.status()).toBe(400);
  96  |         const body = await response.json();
  97  |         expect(body.error).toBe('la categoria es obligatoria');
  98  |     });
  99  | 
  100 | });
```