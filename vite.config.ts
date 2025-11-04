/// <reference types="node" />
import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import fs from "fs";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    vue(),

    {
      name: "copy-package-json",
      closeBundle() {
        const src = path.resolve(__dirname, "package.json");
        const dest = path.resolve(__dirname, "dist", "package.json");
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest);
        }
      },
    },
  ],

  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "CoreLib",
      fileName: (format) => `core-lib.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
