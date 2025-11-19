import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // Оптимизация размера бандла и критического пути
        cssCodeSplit: true, // Разделение CSS для уменьшения размера
        rollupOptions: {
          output: {
            // Разделение vendor кода для лучшего кэширования
            manualChunks: {
              'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            },
          },
        },
        // Минификация с terser для selective console removal
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_debugger: true,
            // Удаляем только debug console методы
            // Сохраняем console.error и console.warn для production debugging
            pure_funcs: ['console.log', 'console.debug', 'console.info'],
          },
        },
      },
    };
});
