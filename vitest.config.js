import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8', // o 'istanbul'
      reporter: ['text', 'json', 'html'], // Genera informes en consola y HTML
    },
  },
})