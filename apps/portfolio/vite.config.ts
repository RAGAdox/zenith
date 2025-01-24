import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "script",
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg}"], // Include index.html in precaching
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkFirst",
            options: {
              cacheName: "html-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
        ],
      },
      devOptions: { enabled: true },
      manifest: {
        name: "RAGAdox",
        short_name: "RAGAdox",
        description: "RAGAdox Personal Portfolio",
        theme_color: "#000000",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        id: "com.ragadox",
        handle_links: "preferred",
        categories: ["personal", "portfolio", "resume", "cv"],
        icons: [
          {
            src: "/assets/apple-touch-icon-precomposed-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/assets/apple-touch-icon-precomposed-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/assets/screenshot-desktop.png",
            platform: "web",
            sizes: "2560x1664",
            form_factor: "wide",
            label: "Home Page",
          },
          {
            src: "/assets/screenshot-mobile.png",
            platform: "web",
            sizes: "750x1334",
            form_factor: "narrow",
            label: "Home Page",
          },
        ],
      },
    }),
  ],
});
