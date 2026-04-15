import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    // Dine ekstra Vite-innstillinger her
    // eksempel:
    server: {
      port: 5173,
    },
    // eller
    define: {
      __MY_VAR__: JSON.stringify("verdi"),
    },
  },
});