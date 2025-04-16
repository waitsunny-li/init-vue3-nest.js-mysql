import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import createVitePlugins from "./vite/plugins";

// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_ENV } = env;
  console.log("环境变量===========>", env);
  return {
    base: VITE_APP_ENV === "production" ? "/" : "/",
    plugins: createVitePlugins(env, command === "build"),
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: 5173,
      open: true,
      proxy: {
        "/api": {
          target: "http://localhost:9000",
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/styles/mixin.scss" as *;
          `,
        },
      },
    },
  };
});
