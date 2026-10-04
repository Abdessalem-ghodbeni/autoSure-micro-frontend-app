import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const authUrl = env.AUTH_REMOTE_URL ?? "http://localhost:5171/remoteEntry.js";

  return {
    plugins: [
      react(),
      federation({
        name: "shell",
        dts: false,
        remotes: {
          auth: { type: "module", name: "auth", entry: authUrl },
        },
        shared: {
          react: { singleton: true },
          "react-dom": { singleton: true },
          "@autosure/shared": { singleton: true },
          "@autosure/ui": { singleton: true },
        },
      }),
    ],
    server: { port: 5170, strictPort: true },
    build: { target: "esnext" },
  };
});
