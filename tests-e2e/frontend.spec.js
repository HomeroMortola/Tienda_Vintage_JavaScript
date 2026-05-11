import { test, expect } from '@playwright/test';

test.describe('Página principal — catálogo', () => {

    test('la página carga correctamente', async ({ page }) => {
        await page.goto('/index.html');
        await page.waitForSelector('.prod-card', { timeout: 15000 });
        // Esperar carga completa de recursos
        await page.waitForLoadState('networkidle');

        // Espera extra por imágenes
        await page.waitForTimeout(3000);
        await expect(page).toHaveTitle('Retro Vibes Co. - Tienda Vintage');
        await page.screenshot({ path: 'screenshots/01-pagina-principal.png',fullPage: true });
    });

    test('el grid de productos se llena con productos', async ({ page }) => {
        await page.goto('/index.html');
        await page.waitForSelector('.prod-card');
        const productos = await page.locator('.prod-card').count();
        expect(productos).toBeGreaterThan(0);
        await page.screenshot({ path: 'screenshots/02-productos-cargados.png' });
    });

    test('cada producto muestra nombre y precio', async ({ page }) => {
        await page.goto('/index.html');
        await page.waitForSelector('.prod-card');
        const primerProducto = page.locator('.prod-card').first();
        await expect(primerProducto.locator('.prod-name')).toBeVisible();
        await expect(primerProducto.locator('.prod-price')).toBeVisible();
        await page.screenshot({ path: 'screenshots/03-detalle-producto.png' });
    });

    test('el botón VER DETALLE existe en cada producto', async ({ page }) => {
        await page.goto('/index.html');
        await page.waitForSelector('.prod-card');
        await page.waitForLoadState('networkidle');

        // Espera extra por imágenes
        await page.waitForTimeout(3000);
        const primerBoton = page.locator('.buy-btn').first();
        await expect(primerBoton).toBeVisible();
        await expect(primerBoton).toHaveText('VER DETALLE');
        await page.screenshot({ path: 'screenshots/04-boton-ver-detalle.png', fullPage: true });
    });

});

test.describe('Modal de producto', () => {

    test('el modal se abre al hacer clic en VER DETALLE', async ({ page }) => {
        await page.goto('/index.html');
        await page.waitForSelector('.prod-card');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);
        await page.locator('.buy-btn').first().click();
        await expect(page.locator('.product-modal-overlay')).toBeVisible();
        await page.screenshot({ path: 'screenshots/05-modal-abierto.png' });
    });

    test('el modal muestra nombre y precio del producto', async ({ page }) => {
        await page.goto('/index.html');
        await page.waitForSelector('.prod-card');
        await page.locator('.buy-btn').first().click();
        await expect(page.locator('.modal-name')).toBeVisible();
        await expect(page.locator('.modal-price')).toBeVisible();
        await page.screenshot({ path: 'screenshots/06-modal-detalle.png' });
    });

    test('el modal tiene input de cantidad', async ({ page }) => {
        await page.goto('/index.html');
        await page.waitForSelector('.prod-card');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);
        await page.locator('.buy-btn').first().click();
        await expect(page.locator('#quantity')).toBeVisible();
        await page.screenshot({ path: 'screenshots/07-modal-cantidad.png' });
    });

    test('la cantidad maxima es 6', async ({ page }) => {
        await page.goto('/index.html');
        await page.waitForSelector('.prod-card');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);
        await page.locator('.buy-btn').first().click();
        const input = page.locator('#quantity');
        await input.fill('10');
        await input.dispatchEvent('change');
        await expect(input).toHaveValue('6');
        await page.screenshot({ path: 'screenshots/08-cantidad-maxima.png' });
    });

    test('la cantidad minima es 1', async ({ page }) => {
        await page.goto('/index.html');
        await page.waitForSelector('.prod-card');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);
        await page.locator('.buy-btn').first().click();
        const input = page.locator('#quantity');
        await input.fill('0');
        await input.dispatchEvent('change');
        await expect(input).toHaveValue('1');
        await page.screenshot({ path: 'screenshots/09-cantidad-minima.png' });
    });

    test('el modal se cierra al hacer clic en X', async ({ page }) => {
        await page.goto('/index.html');
        await page.waitForSelector('.prod-card');
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);
        await page.locator('.buy-btn').first().click();
        await page.locator('#modal-close').click();
        await expect(page.locator('.product-modal-overlay')).not.toHaveClass(/open/);
        await page.screenshot({ path: 'screenshots/10-modal-cerrado.png' });
    });

});

test.describe('Navegación', () => {

    test('el link de Vinilos navega correctamente', async ({ page }) => {
         // Logs del navegador
        page.on('console', msg =>
            console.log('BROWSER:', msg.text())
        );
        // Todas las respuestas HTTP
        page.on('response', response => {
            console.log(
                'RESPONSE:',
                response.status(),
                response.url()
            );
        });
        // Requests que fallan
        page.on('requestfailed', request => {
            console.log(
                'FAILED:',
                request.url()
            );
        });
        await page.goto('/index.html');
        await page.click('a[href="vinilos.html"]');
        await expect(page).toHaveURL(/vinilos/);
        await page.waitForSelector('.prod-card', { timeout: 15000 });
        // Esperar carga completa de recursos
        await page.waitForLoadState('networkidle');

        // Espera extra por imágenes
        await page.waitForTimeout(3000);
        await page.screenshot({ path: 'screenshots/11-pagina-vinilos.png', fullPage: true });
    });

    test('el link de Bandanas navega correctamente', async ({ page }) => {
        // Logs del navegador
        page.on('console', msg =>
            console.log('BROWSER:', msg.text())
        );
        // Todas las respuestas HTTP
        page.on('response', response => {
            console.log(
                'RESPONSE:',
                response.status(),
                response.url()
            );
        });
        // Requests que fallan
        page.on('requestfailed', request => {
            console.log(
                'FAILED:',
                request.url()
            );
        });
        await page.goto('/index.html');
        await page.click('a[href="bandanna.html"]');
        await expect(page).toHaveURL(/bandanna/);
        await page.waitForSelector('.prod-card', { timeout: 15000 });
        // Esperar carga completa de recursos
        await page.waitForLoadState('networkidle');

        // Espera extra por imágenes
        await page.waitForTimeout(3000);
        await page.screenshot({ path: 'screenshots/12-pagina-bandanas.png', fullPage: true });
    });

    test('el link de Anteojos navega correctamente', async ({ page }) => {
        // Logs del navegador
        page.on('console', msg =>
            console.log('BROWSER:', msg.text())
        );
        // Todas las respuestas HTTP
        page.on('response', response => {
            console.log(
                'RESPONSE:',
                response.status(),
                response.url()
            );
        });
        // Requests que fallan
        page.on('requestfailed', request => {
            console.log(
                'FAILED:',
                request.url()
            );
        });
        await page.goto('/index.html');
        await page.click('a[href="anteojos.html"]');
        await expect(page).toHaveURL(/anteojos/);
        await page.waitForSelector('.prod-card', { timeout: 15000 });
        // Esperar carga completa de recursos
        await page.waitForLoadState('networkidle');

        // Espera extra por imágenes
        await page.waitForTimeout(3000);
        await page.screenshot({ path: 'screenshots/13-pagina-anteojos.png', fullPage: true });
    });

});

test.describe('Checkout', () => {

    test('la página de checkout carga correctamente', async ({ page }) => {
        await page.goto('/checkout.html');
        await expect(page.locator('#checkout-form')).toBeVisible();
        await page.screenshot({ path: 'screenshots/14-checkout.png' });
    });

    test('el formulario tiene todos los campos requeridos', async ({ page }) => {
        await page.goto('/checkout.html');
        await expect(page.locator('#name-input')).toBeVisible();
        await expect(page.locator('#lastname-input')).toBeVisible();
        await expect(page.locator('#email-input')).toBeVisible();
        await expect(page.locator('#address-input')).toBeVisible();
        await expect(page.locator('#city-input')).toBeVisible();
        await page.screenshot({ path: 'screenshots/15-formulario-checkout.png' });
    });
    
    test('el botón de pago con Mercado Pago existe', async ({ page }) => {
        await page.goto('/checkout.html');
        await expect(page.locator('#pay-button')).toBeVisible();
        await expect(page.locator('#pay-button')).toHaveText('Pagar con Mercado Pago');
        await page.screenshot({ path: 'screenshots/16-boton-mercadopago.png' });
    });

    test('el usuario puede completar el checkout', async ({ page }) => {

    await page.goto('/checkout.html');

    await page.fill('#name-input', 'Victoria');
    await page.fill('#lastname-input', 'Bladilo');
    await page.fill('#email-input', 'victoria@test.com');
    await page.fill('#address-input', 'San Martín 123');
    await page.fill('#city-input', 'Corrientes');

    await page.screenshot({ path: 'screenshots/17-checkout-completo.png' });
    });

    test('el formulario no se envía si faltan campos', async ({ page }) => {

    await page.goto('/checkout.html');

    // Click sin completar
    await page.click('#pay-button');

    // Seguimos en checkout
    await expect(page).toHaveURL(/checkout/);

    // El input sigue inválido
    await expect(
        page.locator('#name-input')
    ).toHaveAttribute('required', '');

    await page.screenshot({path: 'screenshots/20-validacion-checkout.png'});

});

    test('redirige a Mercado Pago al finalizar la compra', async ({ page }) => {

    // HOME
    await page.goto('/index.html');

    // Esperar productos
    await page.waitForSelector('.prod-card');

    // Abrir modal
    await page.locator('.buy-btn').first().click();

    // Esperar modal
    await page.waitForSelector('.product-modal-overlay.open');

    // Agregar carrito
    await page.locator('.buy-btn').first().click();

    // Ir carrito
    await page.goto('/carrito.html');

    // Ir checkout
    await page.goto('/checkout.html');

    // Completar formulario
    await page.fill('#name-input', 'Victoria');
    await page.fill('#lastname-input', 'Bladilo');
    await page.fill('#email-input', 'victoria@test.com');
    await page.fill('#address-input', 'San Martin 123');
    await page.fill('#city-input', 'Corrientes');

    // Pagar
    await page.click('#pay-button');

    // Esperar cambio URL
    await expect.poll(
        async () => page.url(),
        { timeout: 30000 }
    ).toContain('mercadopago');

});
});