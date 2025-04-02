import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  build: {
    manifest: true,
  },
  base: '/opm/',
  plugins: [react()],
})
