import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  server: {port: 8000},
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src")
    }
  }
})
