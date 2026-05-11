
/*import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:3001',
  },
});*/

import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests-e2e',
    timeout: 30000,
    use: {
        baseURL: 'http://localhost:3000',
    },
    webServer: {
        command: 'node app.js',
        port: 3000,
        reuseExistingServer: true,
    },
    projects: [
        {
            name: 'endpoints',
            testMatch: ['**/productos.spec.js', '**/carrito.spec.js', '**/createProduct.spec.js'],
            use: {
                baseURL: 'http://localhost:3000',
            }
        },
        {
            name: 'frontend',
            testMatch: '**/frontend.spec.js',
            use: {
                baseURL: 'https://tienda-vintage-java-script.vercel.app',
            }
        }
    ]
});
