// Writes dist/client/_headers (Netlify reads it from the publish dir) after `vite build`.
// Pages are prerendered but carry inline hydration scripts, so script-src lists their
// SHA-256 hashes instead of allowing 'unsafe-inline'. Hashes are recomputed every build.
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const outDir = new URL('../dist/client/', import.meta.url).pathname

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return entry.name === 'assets' ? [] : htmlFiles(path)
    return entry.name.endsWith('.html') ? [path] : []
  })
}

const hashes = new Set()
for (const file of htmlFiles(outDir)) {
  for (const [, attrs, body] of readFileSync(file, 'utf8').matchAll(
    /<script([^>]*)>([\s\S]*?)<\/script>/g,
  )) {
    // External scripts are covered by 'self'; JSON-LD is data and never executes.
    if (/\ssrc=/.test(attrs) || /ld\+json/.test(attrs) || body.trim() === '') continue
    hashes.add(`'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`)
  }
}

const turnstile = 'https://challenges.cloudflare.com'
const csp = [
  "default-src 'self'",
  `script-src 'self' ${turnstile} ${[...hashes].sort().join(' ')}`,
  `frame-src ${turnstile}`,
  `connect-src 'self' ${turnstile}`,
  "img-src 'self' data:",
  "style-src 'self'",
  // Base UI's closed FAQ panels render style="--var: …" attributes in the HTML.
  "style-src-attr 'unsafe-inline'",
  "font-src 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

const headers = `/*
  Content-Security-Policy: ${csp}
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

# Hashed build assets never change, so cache them forever.
/assets/*
  Cache-Control: public, max-age=31536000, immutable
`

writeFileSync(join(outDir, '_headers'), headers)
console.log(`_headers written (${String(hashes.size)} inline script hashes)`)
