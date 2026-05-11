import { test, expect } from '@playwright/test';

test.describe('Página principal — catálogo', () => {

    test('la página carga correctamente', async ({ page }) => {
        await page.goto('/index.html');
        await expect(page).toHaveTitle('Retro Vibes Co.');
        await page.screenshot({ path: 'screenshots/01-pagina-principal.png' });
    });

    test('el grid de productos se llena con productos', async ({ page }) => {
        await page.goto('/index.html');
        await page.waitForSelector('.prod-card', { timeout: 15000 });
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
        const primerBoton = page.locator('.buy-btn').first();
        await expect(primerBoton).toBeVisible();
        await expect(primerBoton).toHaveText('VER DETALLE');
        await page.screenshot({ path: 'screenshots/04-boton-ver-detalle.png' });
    });

});

test.describe('Modal de producto', () => {

    test('el modal se abre al hacer clic en VER DETALLE', async ({ page }) => {
        await page.goto('/index.html');
        await page.waitForSelector('.prod-card');
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
        await page.locator('.buy-btn').first().click();
        await expect(page.locator('#quantity')).toBeVisible();
        await page.screenshot({ path: 'screenshots/07-modal-cantidad.png' });
    });

    test('la cantidad maxima es 6', async ({ page }) => {
        await page.goto('/index.html');
        await page.waitForSelector('.prod-card');
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
        await page.locator('.buy-btn').first().click();
        await page.locator('#modal-close').click();
        await expect(page.locator('.product-modal-overlay')).not.toHaveClass(/open/);
        await page.screenshot({ path: 'screenshots/10-modal-cerrado.png' });
    });

});

test.describe('Navegación', () => {

    test('el link de Vinilos navega correctamente', async ({ page }) => {
        await page.goto('/index.html');
        await page.click('a[href="vinilos.html"]');
        await expect(page).toHaveURL(/vinilos/);
        await page.screenshot({ path: 'screenshots/11-pagina-vinilos.png' });
    });

    test('el link de Bandanas navega correctamente', async ({ page }) => {
        await page.goto('/index.html');
        await page.click('a[href="bandanna.html"]');
        await expect(page).toHaveURL(/bandanna/);
        await page.screenshot({ path: 'screenshots/12-pagina-bandanas.png' });
    });

    test('el link de Anteojos navega correctamente', async ({ page }) => {
        await page.goto('/index.html');
        await page.click('a[href="anteojos.html"]');
        await expect(page).toHaveURL(/anteojos/);
        await page.screenshot({ path: 'screenshots/13-pagina-anteojos.png' });
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

});