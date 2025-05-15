import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
console.log('✔ Config do Vitest carregada!');

export default defineConfig({
  plugins: [tsconfigPaths()],
})