import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  plugins: [vue(),cssInjectedByJsPlugin()],
  build:{
    outDir: path.join(__dirname, 'lib'),
    lib:{
      entry: path.resolve(__dirname, 'src/lib/index.js'),
      name: 'vue-drag-table',
      fileName: 'vue-drag-table',
    },
    rollupOptions:{
      external:['vue'],
      output: {
        manualChunks: undefined,
        globals: {
          vue: 'Vue',
        },
      },
    }
  }
})
