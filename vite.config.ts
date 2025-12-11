import fs from 'fs';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    vue(),

    {
      name: 'copy-package-json',
      closeBundle() {
        const src = path.resolve(__dirname, 'package.json');
        const dest = path.resolve(__dirname, 'dist', 'package.json');
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest);
        }
      },
    },
  ],

  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'CoreLib',
      fileName: (format) => `core-lib.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
