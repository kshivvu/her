// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Check if we are building for GitHub Pages
const isGitHubPages = process.env.NODE_ENV === 'production'

// Replace 'your-repo-name' with your actual GitHub repo name
const base = isGitHubPages ? '/her/' : '/'

export default defineConfig({
  plugins: [react()],
  base,
})
