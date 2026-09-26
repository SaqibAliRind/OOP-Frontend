import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@/components': path.resolve(import.meta.dirname, './src/components'),
      '@/hooks': path.resolve(import.meta.dirname, './src/hooks'),
      '@/utils': path.resolve(import.meta.dirname, './src/utils'),
      '@/types': path.resolve(import.meta.dirname, './src/types'),
      '@/services': path.resolve(import.meta.dirname, './src/services'),
      '@/store': path.resolve(import.meta.dirname, './src/store'),
      '@/styles': path.resolve(import.meta.dirname, './src/styles'),
      '@/three': path.resolve(import.meta.dirname, './src/three'),
      '@/data': path.resolve(import.meta.dirname, './src/data'),
      '@/layouts': path.resolve(import.meta.dirname, './src/layouts'),
      '@/pages': path.resolve(import.meta.dirname, './src/pages'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist'],
    restoreMocks: true,
  },
});
