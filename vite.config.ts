import path from "path";
import tailwindcss from "@tailwindcss/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/meliomed/",
  plugins: [react(), tailwindcss(), basicSsl()],
  server: {
    https: {},
    proxy: {
      "/api": {
        target: "https://office.melio.med",
        changeOrigin: true,
        secure: true,
        headers: {
          origin: "https://app.melio.med",
          referer: "https://app.melio.med/",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
