import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { federation } from "@module-federation/vite";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: { isCustomElement: (tag) => tag.startsWith("as-") },
      },
    }),
    federation({
      name: "auth",
      dts: false,
      filename: "remoteEntry.js",
      exposes: {
        "./mount": "./src/mount.js",
      },
      shared: {
        vue: { singleton: true },
        "@autosure/shared": { singleton: true },
        "@autosure/ui": { singleton: true },
      },
    }),
  ],
  server: {
    port: 5171,
    strictPort: true,
    origin: "http://localhost:5171",
    cors: true,
  },
  preview: { port: 5171, strictPort: true, cors: true },
  build: { target: "esnext" },
});
