# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: frontend.spec.js >> Checkout >> muestra error si faltan campos
- Location: tests-e2e\frontend.spec.js:257:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('#login-error')
Expected: visible
Received: hidden
Timeout:  5000ms

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('#login-error')
    9 × locator resolved to <div role="alert" id="login-error" class="error-msg">↵                            Por favor, revise lo…</div>
      - unexpected value "hidden"

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - generic [ref=e4]: ✦ Panel de Pagos ✦
    - heading "Retro Vibes Co." [level=1] [ref=e5]
  - main [ref=e7]:
    - heading "Checkout" [level=1] [ref=e9]
    - main [ref=e11]:
      - generic [ref=e12]:
        - navigation "Navegación de retorno" [ref=e13]:
          - link "← Volver al catálogo" [ref=e14]:
            - /url: index.html
          - generic [ref=e15]: Revisa tu pedido antes continuar con el pago
          - paragraph [ref=e16]:
            - strong [ref=e17]: Completa tus datos para finalizar tu compra
        - generic [ref=e19]:
          - generic [ref=e20]:
            - generic [ref=e21]: Nombre
            - textbox "Nombre" [active] [ref=e22]:
              - /placeholder: Ej. Juan
          - generic [ref=e23]:
            - generic [ref=e24]: Apellido
            - textbox "Apellido" [ref=e25]:
              - /placeholder: Ej. Pérez
          - generic [ref=e26]:
            - generic [ref=e27]: Correo Electrónico
            - textbox "Correo Electrónico" [ref=e28]:
              - /placeholder: juan@ejemplo.com
          - generic [ref=e29]:
            - generic [ref=e30]: Dirección de Envío
            - textbox "Dirección de Envío" [ref=e31]:
              - /placeholder: Calle Falsa 123
          - generic [ref=e32]:
            - generic [ref=e33]: Ciudad
            - textbox "Ciudad" [ref=e34]:
              - /placeholder: Buenos Aires
          - generic [ref=e35]:
            - generic [ref=e36]: Método de Pago
            - button "Pagar con Mercado Pago" [ref=e38] [cursor=pointer]
        - link "← Volver al carrito" [ref=e40] [cursor=pointer]:
          - /url: carrito.html
    - generic [ref=e42]:
      - text: © 1974 Retro Vibes Co. ·
      - link "Admin" [ref=e43] [cursor=pointer]:
        - /url: admin.html
```

# Test source

```ts
  165 |         });
  166 |         // Requests que fallan
  167 |         page.on('requestfailed', request => {
  168 |             console.log(
  169 |                 'FAILED:',
  170 |                 request.url()
  171 |             );
  172 |         });
  173 |         await page.goto('/index.html');
  174 |         await page.click('a[href="bandanna.html"]');
  175 |         await expect(page).toHaveURL(/bandanna/);
  176 |         await page.waitForSelector('.prod-card', { timeout: 15000 });
  177 |         // Esperar carga completa de recursos
  178 |         await page.waitForLoadState('networkidle');
  179 | 
  180 |         // Espera extra por imágenes
  181 |         await page.waitForTimeout(3000);
  182 |         await page.screenshot({ path: 'screenshots/12-pagina-bandanas.png', fullPage: true });
  183 |     });
  184 | 
  185 |     test('el link de Anteojos navega correctamente', async ({ page }) => {
  186 |         // Logs del navegador
  187 |         page.on('console', msg =>
  188 |             console.log('BROWSER:', msg.text())
  189 |         );
  190 |         // Todas las respuestas HTTP
  191 |         page.on('response', response => {
  192 |             console.log(
  193 |                 'RESPONSE:',
  194 |                 response.status(),
  195 |                 response.url()
  196 |             );
  197 |         });
  198 |         // Requests que fallan
  199 |         page.on('requestfailed', request => {
  200 |             console.log(
  201 |                 'FAILED:',
  202 |                 request.url()
  203 |             );
  204 |         });
  205 |         await page.goto('/index.html');
  206 |         await page.click('a[href="anteojos.html"]');
  207 |         await expect(page).toHaveURL(/anteojos/);
  208 |         await page.waitForSelector('.prod-card', { timeout: 15000 });
  209 |         // Esperar carga completa de recursos
  210 |         await page.waitForLoadState('networkidle');
  211 | 
  212 |         // Espera extra por imágenes
  213 |         await page.waitForTimeout(3000);
  214 |         await page.screenshot({ path: 'screenshots/13-pagina-anteojos.png', fullPage: true });
  215 |     });
  216 | 
  217 | });
  218 | 
  219 | test.describe('Checkout', () => {
  220 | 
  221 |     test('la página de checkout carga correctamente', async ({ page }) => {
  222 |         await page.goto('/checkout.html');
  223 |         await expect(page.locator('#checkout-form')).toBeVisible();
  224 |         await page.screenshot({ path: 'screenshots/14-checkout.png' });
  225 |     });
  226 | 
  227 |     test('el formulario tiene todos los campos requeridos', async ({ page }) => {
  228 |         await page.goto('/checkout.html');
  229 |         await expect(page.locator('#name-input')).toBeVisible();
  230 |         await expect(page.locator('#lastname-input')).toBeVisible();
  231 |         await expect(page.locator('#email-input')).toBeVisible();
  232 |         await expect(page.locator('#address-input')).toBeVisible();
  233 |         await expect(page.locator('#city-input')).toBeVisible();
  234 |         await page.screenshot({ path: 'screenshots/15-formulario-checkout.png' });
  235 |     });
  236 |     
  237 |     test('el botón de pago con Mercado Pago existe', async ({ page }) => {
  238 |         await page.goto('/checkout.html');
  239 |         await expect(page.locator('#pay-button')).toBeVisible();
  240 |         await expect(page.locator('#pay-button')).toHaveText('Pagar con Mercado Pago');
  241 |         await page.screenshot({ path: 'screenshots/16-boton-mercadopago.png' });
  242 |     });
  243 | 
  244 |     test('el usuario puede completar el checkout', async ({ page }) => {
  245 | 
  246 |     await page.goto('/checkout.html');
  247 | 
  248 |     await page.fill('#name-input', 'Victoria');
  249 |     await page.fill('#lastname-input', 'Bladilo');
  250 |     await page.fill('#email-input', 'victoria@test.com');
  251 |     await page.fill('#address-input', 'San Martín 123');
  252 |     await page.fill('#city-input', 'Corrientes');
  253 | 
  254 |     await page.screenshot({ path: 'screenshots/17-checkout-completo.png' });
  255 |     });
  256 | 
  257 |     test('muestra error si faltan campos', async ({ page }) => {
  258 | 
  259 |     await page.goto('/checkout.html');
  260 | 
  261 |     await page.click('#pay-button');
  262 | 
  263 |     await expect(
  264 |         page.locator('#login-error')
> 265 |     ).toBeVisible();
      |       ^ Error: expect(locator).toBeVisible() failed
  266 | 
  267 |     await page.screenshot({path: 'screenshots/20-error-checkout.png'});
  268 |     });
  269 | 
  270 |     test('redirige a Mercado Pago al finalizar la compra', async ({ page }) => {
  271 | 
  272 |     await page.goto('/checkout.html');
  273 | 
  274 |     // Completar formulario
  275 |     await page.fill('#name-input', 'Victoria');
  276 |     await page.fill('#lastname-input', 'Bladilo');
  277 |     await page.fill('#email-input', 'victoria@test.com');
  278 |     await page.fill('#address-input', 'San Martin 123');
  279 |     await page.fill('#city-input', 'Corrientes');
  280 | 
  281 |     // Click pagar
  282 |     await page.click('#pay-button');
  283 | 
  284 |     // Esperar navegación
  285 |     await page.waitForURL(/mercadopago/, {
  286 |         timeout: 30000
  287 |     });
  288 | 
  289 |     // Screenshot
  290 |     await page.screenshot({
  291 |         path: 'screenshots/21-mercadopago.png',
  292 |         fullPage: true
  293 |     });
  294 | 
  295 | });
  296 | });
```