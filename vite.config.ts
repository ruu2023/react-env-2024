/// <reference types="vitest"/>
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

import { defineConfig as defineVitestConfig } from 'vitest/config'

export default defineVitestConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./vitest-setup.ts"]
  }
})