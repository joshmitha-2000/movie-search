import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'  // This resolves the @ alias to the src folder
    },
  },
});
