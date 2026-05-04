
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
    }
});