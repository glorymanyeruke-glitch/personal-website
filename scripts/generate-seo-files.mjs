// Writes public/robots.txt and public/sitemap.xml from src/content/site-url.ts (run by `prebuild`).
// The output is gitignored: the domain lives in exactly one place.
import { mkdirSync, writeFileSync } from 'node:fs'
import { SITE_URL, siteUrlIsPlaceholder, sitemapPaths } from '../src/content/site-url.ts'

const publicDir = new URL('../public/', import.meta.url)
mkdirSync(publicDir, { recursive: true })

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapPaths.map((p) => `  <url><loc>${SITE_URL}${p === '/' ? '/' : p}</loc></url>`).join('\n')}
</urlset>
`

writeFileSync(new URL('robots.txt', publicDir), robots)
writeFileSync(new URL('sitemap.xml', publicDir), sitemap)

if (siteUrlIsPlaceholder) {
  console.warn(
    `\n⚠ SITE_URL is still the placeholder (${SITE_URL}). Canonical, Open Graph, sitemap and robots.txt URLs are wrong until src/content/site-url.ts is set.\n`,
  )
}
