import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  base: '/text-to-speech/',
  plugins: [react()],
  resolve: {
    alias: {
      src: fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
