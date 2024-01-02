import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:9001",
        changeOrigin: true,
        rewrite: (path: string) => {
          console.log(path.replace(/^\/api/, ""), "thelog");
          return path.replace(/^\/api/, "")
        },
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "util": fileURLToPath(new URL("./src/util", import.meta.url)),
      "com": fileURLToPath(new URL("./src/components", import.meta.url))
    }
  }
})
