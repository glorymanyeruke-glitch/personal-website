import netlify from '@netlify/vite-plugin-tanstack-start'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { existsSync } from 'node:fs'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'

// Local secrets for server code (process.env) come from .env, loaded with Node's built-in
// loader. Netlify's dev env emulation is off (below), so nothing is pulled from a Netlify
// account. In production, Netlify injects env vars into the function directly.
if (existsSync('.env')) process.loadEnvFile('.env')

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
    // Dev emulation is limited to what production uses: functions, headers, redirects and
    // static files. Everything else is off. Edge functions and the database crashed
    // `pnpm dev` (Deno/embedded DB). Env vars, AI Gateway and geolocation call the Netlify
    // API as whatever account the local CLI is linked to — which must never leak another
    // site's env vars into this project.
    netlify({
      dev: {
        edgeFunctions: { enabled: false },
        database: { enabled: false },
        environmentVariables: { enabled: false },
        aiGateway: { enabled: false },
        geolocation: { enabled: false },
        blobs: { enabled: false },
        images: { enabled: false },
      },
    }),
    // React's plugin must come after Start's.
    viteReact(),
  ],
})
