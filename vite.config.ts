import netlify from '@netlify/vite-plugin-tanstack-start'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  server: { port: 3000 },
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({
      // Every page is static HTML at build time (reference.md §6). The contact
      // server function is the only code that runs on request.
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
      },
    }),
    // Builds the Netlify output (static files + one function for server functions).
    netlify(),
    // React's plugin must come after Start's.
    viteReact(),
  ],
})
