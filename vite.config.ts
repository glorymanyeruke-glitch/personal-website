import netlify from '@netlify/vite-plugin-tanstack-start'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  server: { port: 3000 },
  resolve: { tsconfigPaths: true },
  plugins: [
    // Responsive AVIF/WebP/JPEG at build time (§5, §9).
    imagetools(),
    tailwindcss(),
    tanstackStart({
      // Every page is static HTML at build time (reference.md §6). The contact
      // server function is the only code that runs on request.
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
        // "/#about" etc. are the same document as "/".
        filter: ({ path }) => !path.includes('#'),
      },
      // Static 404 page so unknown URLs needn't be rendered on request (Phase 0, gap 2).
      pages: [{ path: '/404', prerender: { enabled: true, outputPath: '/404.html' } }],
    }),
    // Builds the Netlify output (static files + one function for server functions).
    netlify(),
    // React's plugin must come after Start's.
    viteReact(),
  ],
})
