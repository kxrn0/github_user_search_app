import { fileURLToPath, URL } from "node:url";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const PWAConfig = {
  base: "/github_user_search_app/",
  includedAssets: ["**/*"],
  workbox: { globPatterns: ["**/*"] },
  manifest: {
    name: "Github user search app",
    short_name: "GUSA",
    description: "Search for basic public info on a github user.",
    theme_color: "#8293e0ff",
    background_color: "#a7cdffff",
    icons: [
      {
        src: "pwa-64x64.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  },
};

// https://vite.dev/config/
export default defineConfig({
  base: "/github_user_search_app/",
  plugins: [vue(), VitePWA(PWAConfig)],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
