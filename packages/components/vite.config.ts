import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";

import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    dts({
      insertTypesEntry: true, // Ensures type entry is added
      outDir: "dist", // Output directory for type definitions
    }),
  ],

  build: {
    lib: {
      entry: "src/index.ts",
      name: "components",
      fileName: "index",
    },
    rollupOptions: {
      // Ensure external dependencies are not bundled into your library
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
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
