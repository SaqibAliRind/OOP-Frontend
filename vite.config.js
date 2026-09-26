import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(dirname, './src'),
            '@/components': path.resolve(dirname, './src/components'),
            '@/hooks': path.resolve(dirname, './src/hooks'),
            '@/utils': path.resolve(dirname, './src/utils'),
            '@/types': path.resolve(dirname, './src/types'),
            '@/services': path.resolve(dirname, './src/services'),
            '@/store': path.resolve(dirname, './src/store'),
            '@/styles': path.resolve(dirname, './src/styles'),
            '@/three': path.resolve(dirname, './src/three'),
            '@/data': path.resolve(dirname, './src/data'),
            '@/layouts': path.resolve(dirname, './src/layouts'),
            '@/pages': path.resolve(dirname, './src/pages'),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        if (id.includes('three') || id.includes('@react-three')) {
                            return 'vendor-three';
                        }
                        if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                            return 'vendor-react';
                        }
                        if (id.includes('framer-motion')) {
                            return 'vendor-animation';
                        }
                        if (id.includes('lucide-react') || id.includes('clsx') || id.includes('tailwind-merge')) {
                            return 'vendor-ui';
                        }
                        return 'vendor';
                    }
                },
            },
        },
    },
});
