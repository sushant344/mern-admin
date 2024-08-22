import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory for build
    sourcemap: true, // Useful for debugging in production
  },
  server: {
    port: 5173, // Development server port
    proxy: {
    '/api': {
      target: 'http://localhost:8000', // Replace with your backend server URL
      changeOrigin: true,
      secure: false,
    },
  },
  },
  resolve: {
    alias: {
      '@': '/src', // Aliases for paths, optional
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.VITE_APP_API_URI), // Define environment variables
  },
  base: '/', // Base URL for your app; adjust if deploying to a subdirectory

});
