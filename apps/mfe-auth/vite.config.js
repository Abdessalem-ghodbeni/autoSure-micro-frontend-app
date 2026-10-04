import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("as-"),
        },
      },
    }),
    cssInjectedByJsPlugin(),
  ],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    lib: {
      entry: "src/main.js",
      formats: ["es"],
      fileName: () => "mfe-auth.js",
    },
    emptyOutDir: false,
  },
  preview: {
    port: 5171,
    strictPort: true,
    cors: true,
  },
});
