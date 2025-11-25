import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Final-project/', // make sure it matches your repo name in Github
  build: {
    outDir: 'docs',  // build output folder
    emptyOutDir: true // clean folder before build
  }
})