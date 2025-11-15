/// <reference types="vitest"/>
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

import { defineConfig as defineVitestConfig } from 'vitest/config';

export default defineVitestConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./vitest-setup.ts'],
  },
});
