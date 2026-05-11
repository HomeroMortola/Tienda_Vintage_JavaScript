# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: frontend.spec.js >> Checkout >> redirige a Mercado Pago al finalizar la compra
- Location: tests-e2e\frontend.spec.js:276:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.buy-btn').first()
    - locator resolved to <button class="buy-btn">VER DETALLE</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div id="product-modal" class="product-modal-overlay open">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div id="product-modal" class="product-modal-overlay open">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    47 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div id="product-modal" class="product-modal-overlay open">…</div> intercepts pointer events
     - retrying click action
       - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e4]: ✦ Tienda de artículos vintage ✦
      - generic [ref=e5]: Retro Vibes Co.
      - generic [ref=e6]: Vinilos · Bandanas · Anteojos · Remeras · Est. 1974
    - navigation "Navegación principal" [ref=e8]:
      - generic [ref=e9]:
        - link "Catalogo" [ref=e10]:
          - /url: index.html
        - link "Vinilos" [ref=e11]:
          - /url: vinilos.html
        - link "Bandanas" [ref=e12]:
          - /url: bandanna.html
        - link "Anteojos" [ref=e13]:
          - /url: anteojos.html
        - link "Carrito" [ref=e14]:
          - /url: carrito.html
      - link "Registro/Login" [ref=e15] [cursor=pointer]:
        - /url: login.html
        - img [ref=e16]
    - main [ref=e19]:
      - heading "Nuestros Productos" [level=1] [ref=e20]
      - generic [ref=e21]:
        - generic [ref=e22]:
          - img "La ultima noche magica" [ref=e24]
          - generic [ref=e25]:
            - heading "La ultima noche magica" [level=3] [ref=e26]
            - generic [ref=e27]: $40000
            - paragraph [ref=e28]: Vintage piece.
            - button "VER DETALLE" [active] [ref=e29] [cursor=pointer]
        - generic [ref=e30]:
          - img "Vinilo Fito Paez" [ref=e32]
          - generic [ref=e33]:
            - heading "Vinilo Fito Paez" [level=3] [ref=e34]
            - generic [ref=e35]: $39600
            - paragraph [ref=e36]: Vintage piece.
            - button "VER DETALLE" [ref=e37] [cursor=pointer]
        - generic [ref=e38]:
          - img "Vinilo Man´s Best Friends" [ref=e40]
          - generic [ref=e41]:
            - heading "Vinilo Man´s Best Friends" [level=3] [ref=e42]
            - generic [ref=e43]: $40000
            - paragraph [ref=e44]: Vintage piece.
            - button "VER DETALLE" [ref=e45] [cursor=pointer]
        - generic [ref=e46]:
          - img "No Es Solo Rock And Roll - Intoxicados" [ref=e48]
          - generic [ref=e49]:
            - heading "No Es Solo Rock And Roll - Intoxicados" [level=3] [ref=e50]
            - generic [ref=e51]: $35000
            - paragraph [ref=e52]: Vintage piece.
            - button "VER DETALLE" [ref=e53] [cursor=pointer]
        - generic [ref=e54]:
          - img "Bandana bohemio" [ref=e56]
          - generic [ref=e57]:
            - heading "Bandana bohemio" [level=3] [ref=e58]
            - generic [ref=e59]: $20000
            - paragraph [ref=e60]: Vintage piece.
            - button "VER DETALLE" [ref=e61] [cursor=pointer]
        - generic [ref=e62]:
          - img "Anteojos de sol RetroRed" [ref=e64]
          - generic [ref=e65]:
            - heading "Anteojos de sol RetroRed" [level=3] [ref=e66]
            - generic [ref=e67]: $16800
            - paragraph [ref=e68]: Vintage piece.
            - button "VER DETALLE" [ref=e69] [cursor=pointer]
        - generic [ref=e70]:
          - img "Anteojos Red" [ref=e72]
          - generic [ref=e73]:
            - heading "Anteojos Red" [level=3] [ref=e74]
            - generic [ref=e75]: $10000
            - paragraph [ref=e76]: Vintage piece.
            - button "VER DETALLE" [ref=e77] [cursor=pointer]
        - generic [ref=e78]:
          - img "Anteojos White Woman" [ref=e80]
          - generic [ref=e81]:
            - heading "Anteojos White Woman" [level=3] [ref=e82]
            - generic [ref=e83]: $23999
            - paragraph [ref=e84]: Vintage piece.
            - button "VER DETALLE" [ref=e85] [cursor=pointer]
        - generic [ref=e86]:
          - img "anteojos de sol ovalados" [ref=e88]
          - generic [ref=e89]:
            - heading "anteojos de sol ovalados" [level=3] [ref=e90]
            - generic [ref=e91]: $13000
            - paragraph [ref=e92]: Vintage piece.
            - button "VER DETALLE" [ref=e93] [cursor=pointer]
        - generic [ref=e94]:
          - img "The dark side of the moon" [ref=e96]
          - generic [ref=e97]:
            - heading "The dark side of the moon" [level=3] [ref=e98]
            - generic [ref=e99]: $24999.99
            - paragraph [ref=e100]: Vintage piece.
            - button "VER DETALLE" [ref=e101] [cursor=pointer]
        - generic [ref=e102]:
          - img "Change-Justin Bieber" [ref=e104]
          - generic [ref=e105]:
            - heading "Change-Justin Bieber" [level=3] [ref=e106]
            - generic [ref=e107]: $43600
            - paragraph [ref=e108]: Vintage piece.
            - button "VER DETALLE" [ref=e109] [cursor=pointer]
        - generic [ref=e110]:
          - img "Debi Tirar Mas Fotos" [ref=e112]
          - generic [ref=e113]:
            - heading "Debi Tirar Mas Fotos" [level=3] [ref=e114]
            - generic [ref=e115]: $39999.99
            - paragraph [ref=e116]: Vintage piece.
            - button "VER DETALLE" [ref=e117] [cursor=pointer]
        - generic [ref=e118]:
          - img "Hola Mundo-Tan Bionica" [ref=e120]
          - generic [ref=e121]:
            - heading "Hola Mundo-Tan Bionica" [level=3] [ref=e122]
            - generic [ref=e123]: $53084
            - paragraph [ref=e124]: Vintage piece.
            - button "VER DETALLE" [ref=e125] [cursor=pointer]
        - generic [ref=e126]:
          - img "Guns ans Roses Vinyl" [ref=e128]
          - generic [ref=e129]:
            - heading "Guns ans Roses Vinyl" [level=3] [ref=e130]
            - generic [ref=e131]: $46560
            - paragraph [ref=e132]: Vintage piece.
            - button "VER DETALLE" [ref=e133] [cursor=pointer]
        - generic [ref=e134]:
          - img "Bohemian Rapsody Vinyl" [ref=e136]
          - generic [ref=e137]:
            - heading "Bohemian Rapsody Vinyl" [level=3] [ref=e138]
            - generic [ref=e139]: $1
            - paragraph [ref=e140]: Vintage piece.
            - button "VER DETALLE" [ref=e141] [cursor=pointer]
        - generic [ref=e142]:
          - img "Bandana Bad Girl" [ref=e144]
          - generic [ref=e145]:
            - heading "Bandana Bad Girl" [level=3] [ref=e146]
            - generic [ref=e147]: $1
            - paragraph [ref=e148]: Vintage piece.
            - button "VER DETALLE" [ref=e149] [cursor=pointer]
        - generic [ref=e150]:
          - img "Anteojos de sol RetroBlue" [ref=e152]
          - generic [ref=e153]:
            - heading "Anteojos de sol RetroBlue" [level=3] [ref=e154]
            - generic [ref=e155]: $1
            - paragraph [ref=e156]: Vintage piece.
            - button "VER DETALLE" [ref=e157] [cursor=pointer]
        - generic [ref=e158]:
          - img "Bandana Elegant" [ref=e160]
          - generic [ref=e161]:
            - heading "Bandana Elegant" [level=3] [ref=e162]
            - generic [ref=e163]: $14500
            - paragraph [ref=e164]: Vintage piece.
            - button "VER DETALLE" [ref=e165] [cursor=pointer]
        - generic [ref=e166]:
          - img "Bandana Brown" [ref=e168]
          - generic [ref=e169]:
            - heading "Bandana Brown" [level=3] [ref=e170]
            - generic [ref=e171]: $15500
            - paragraph [ref=e172]: Vintage piece.
            - button "VER DETALLE" [ref=e173] [cursor=pointer]
        - generic [ref=e174]:
          - img "Bandana Animal" [ref=e176]
          - generic [ref=e177]:
            - heading "Bandana Animal" [level=3] [ref=e178]
            - generic [ref=e179]: $25846
            - paragraph [ref=e180]: Vintage piece.
            - button "VER DETALLE" [ref=e181] [cursor=pointer]
    - contentinfo [ref=e182]:
      - generic [ref=e183]:
        - text: © 1974 Retro Vibes Co. ·
        - link "Admin" [ref=e184] [cursor=pointer]:
          - /url: admin.html
  - generic [ref=e186]:
    - button "✕" [ref=e187] [cursor=pointer]
    - img "La ultima noche magica" [ref=e188]
    - generic [ref=e189]:
      - heading "La ultima noche magica" [level=2] [ref=e190]
      - generic [ref=e191]: $40000
      - paragraph [ref=e192]: Carga desde panel admin
      - generic [ref=e193]:
        - generic [ref=e194]:
          - generic [ref=e195]: year
          - generic [ref=e196]: "2024"
        - generic [ref=e197]:
          - generic [ref=e198]: genre
          - generic [ref=e199]: Rock
        - generic [ref=e200]:
          - generic [ref=e201]: artist
          - generic [ref=e202]: Tan Bionica
        - generic [ref=e203]:
          - generic [ref=e204]: album
          - generic [ref=e205]: La ultima noche magica
      - heading "Cantidad a comprar" [level=3] [ref=e206]
      - spinbutton [ref=e207]: "1"
      - button "COMPRA" [ref=e208] [cursor=pointer]
```

# Test source

```ts
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
  257 |     test('el formulario no se envía si faltan campos', async ({ page }) => {
  258 | 
  259 |     await page.goto('/checkout.html');
  260 | 
  261 |     // Click sin completar
  262 |     await page.click('#pay-button');
  263 | 
  264 |     // Seguimos en checkout
  265 |     await expect(page).toHaveURL(/checkout/);
  266 | 
  267 |     // El input sigue inválido
  268 |     await expect(
  269 |         page.locator('#name-input')
  270 |     ).toHaveAttribute('required', '');
  271 | 
  272 |     await page.screenshot({path: 'screenshots/20-validacion-checkout.png'});
  273 | 
  274 | });
  275 | 
  276 |     test('redirige a Mercado Pago al finalizar la compra', async ({ page }) => {
  277 | 
  278 |     // HOME
  279 |     await page.goto('/index.html');
  280 | 
  281 |     // Esperar productos
  282 |     await page.waitForSelector('.prod-card');
  283 | 
  284 |     // Abrir modal
  285 |     await page.locator('.buy-btn').first().click();
  286 | 
  287 |     // Esperar modal
  288 |     await page.waitForSelector('.product-modal-overlay.open');
  289 | 
  290 |     // Agregar carrito
> 291 |     await page.locator('.buy-btn').first().click();
      |                                            ^ Error: locator.click: Test timeout of 30000ms exceeded.
  292 | 
  293 |     // Ir carrito
  294 |     await page.goto('/carrito.html');
  295 | 
  296 |     // Ir checkout
  297 |     await page.goto('/checkout.html');
  298 | 
  299 |     // Completar formulario
  300 |     await page.fill('#name-input', 'Victoria');
  301 |     await page.fill('#lastname-input', 'Bladilo');
  302 |     await page.fill('#email-input', 'victoria@test.com');
  303 |     await page.fill('#address-input', 'San Martin 123');
  304 |     await page.fill('#city-input', 'Corrientes');
  305 | 
  306 |     // Pagar
  307 |     await page.click('#pay-button');
  308 | 
  309 |     // Esperar cambio URL
  310 |     await expect.poll(
  311 |         async () => page.url(),
  312 |         { timeout: 30000 }
  313 |     ).toContain('mercadopago');
  314 | 
  315 | });
  316 | });
```