import { resolve } from "path";

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

import { buildTargets } from "./buildTarget";
import makeManifest from "./utils/plugins/make-manifest";

const root = resolve(__dirname, "src");
const pagesDir = resolve(root, "pages");
const assetsDir = resolve(root, "assets");
const outDir = resolve(
  __dirname,
  process.env.BUILD_TARGET === buildTargets.firefox
    ? "dist/firefox"
    : "dist/chromium"
);
const publicDir = resolve(__dirname, "public");

export default defineConfig({
  build: {
    outDir,
    rollupOptions: {
      input: {
        history: resolve(pagesDir, "history", "index.html"),
      },
      output: {
        entryFileNames: (chunk) => `src/pages/${chunk.name}/index.js`,
      },
    },
    sourcemap: process.env.__DEV__ === "true",
  },
  plugins: [react(), makeManifest()],
  publicDir,
  resolve: {
    alias: {
      "@/assets": assetsDir,
      "@/pages": pagesDir,
      "@/src": root,
    },
  },
});
