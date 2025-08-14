import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';
import path from 'path';
import type { MinifyOptions } from 'terser';

// https://vite.dev/config/
export default defineConfig({
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            } as MinifyOptions,
        },
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('react')) return 'react-vendor';
                        if (id.includes('@tanstack/react-query')) return 'react-query';
                        if (id.includes('axios')) return 'axios';
                        if (id.includes('clsx')) return 'clsx';
                        return 'vendor';
                    }
                },
            },
        },
    },
    optimizeDeps: {
        include: ['react', 'react-dom', '@tanstack/react-query', 'axios'],
    },
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@app': path.resolve(__dirname, './src/app'),
            '@features': path.resolve(__dirname, './src/features'),
            '@shared': path.resolve(__dirname, './src/shared'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                @use "@shared/lib/styles/functions" as *;
                @use "@shared/lib/styles/vars" as *;
                `,
            },
        },
    },
});
