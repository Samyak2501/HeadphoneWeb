import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Triggering fresh GitHub Actions deployment
export default defineConfig({
  plugins: [react()],
  base: '/HeadphoneWeb/',
})
