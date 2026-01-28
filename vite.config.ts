import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        // O compilador do React vai aqui
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    // O Tailwind v4 deve ficar aqui, no nível principal dos plugins do Vite
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});