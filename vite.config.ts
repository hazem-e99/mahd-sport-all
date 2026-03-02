import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tsconfigPaths(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@admin": path.resolve(__dirname, "src/admin"),
        "@portal": path.resolve(__dirname, "src/portal"),
        "@shared": path.resolve(__dirname, "src/shared"),
        // Portal-specific aliases (prefixed to avoid conflicts)
        "@portal-components": path.resolve(__dirname, "src/portal/components"),
        "@portal-icons": path.resolve(__dirname, "src/portal/icons"),
        "@portal-context": path.resolve(__dirname, "src/portal/context"),
        "@portal-data": path.resolve(__dirname, "src/portal/data"),
        "@portal-types": path.resolve(__dirname, "src/portal/types"),
        "@portal-utils": path.resolve(__dirname, "src/portal/utils"),
        "@portal-hooks": path.resolve(__dirname, "src/portal/hooks"),
        "@portal-styles": path.resolve(__dirname, "src/portal/styles"),
      },
    },
    server: {
      port: 3000,
    },
    envDir: "./",
    envPrefix: "VITE_",
    define: {
      ...Object.keys(env).reduce((prev: Record<string, string>, key) => {
        if (key.startsWith("VITE_")) {
          prev[`import.meta.env.${key}`] = JSON.stringify(env[key]);
        }
        return prev;
      }, {}),
    },
  };
});
