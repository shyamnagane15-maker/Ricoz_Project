import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // added
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], // tailwindcss() added
})