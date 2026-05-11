// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // ודאי שייבאת את path

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // כאן אנחנו מגדירים ל-Vite ש-@ מייצג את תיקיית src
      "@": path.resolve(__dirname, "./src"),
    },
  },
})