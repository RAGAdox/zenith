import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      allowedHosts: [
        env.VITE_ALLOWED_HOST || "sunny-lionfish-honestly.ngrok-free.app",
      ],
      port: parseInt(env.VITE_PORT || "3000", 10),
    },
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
    plugins: [
      svgr({
        include: "app/**/*.svg",
        svgrOptions: {
          exportType: "default",
          memo: true,
        },
      }),
      reactRouter(),
      tsconfigPaths(),
      VitePWA({
        registerType: "autoUpdate",
        strategies: "injectManifest",
        injectRegister: "auto",
        srcDir: "app",
        filename: "sw.js",
        injectManifest: {
          swSrc: "app/sw.js",
          swDest: "build/client/sw.js",
          globPatterns: ["**/*.{js,css,html,png,jpg,jpeg,svg,webp,ico,json}"],
        },
        devOptions: {
          enabled: true,
          type: "module",
        },
        manifest: {
          name: "RAGAdox",
          short_name: "RAGAdox",
          description: "RAGAdox Personal Portfolio",
          theme_color: "#000000",
          background_color: "#ffffff",
          display: "standalone",
          start_url: "/?utm_source=homescreen",
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
          share_target: {
            action: "/share-target",
            method: "GET",
            enctype: "application/x-www-form-urlencoded",
            params: {
              text: "spotify_url",
            },
          },
        },
      }),
    ],
  };
});
