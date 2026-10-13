// Plain module with no imports: scripts/generate-seo-files.mjs loads it directly in Node.
// Canonical host, no trailing slash. Apex domain; redirect www to it in Netlify (reference.md §12.2).
export const SITE_URL = 'https://goldenchimeracounselling.com'

export const siteUrlIsPlaceholder = SITE_URL.endsWith('.invalid')

/** Indexable pages, in sitemap order. `/404` is deliberately absent. */
export const sitemapPaths = ['/', '/privacy/'] as const
