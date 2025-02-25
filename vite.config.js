import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enable global test APIs
    environment: 'jsdom', // Use jsdom for testing
    setupFiles: './src/setupTests.js', // Setup file for global configurations
  },
});
