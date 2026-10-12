// Plain module with no imports: scripts/generate-seo-files.mjs loads it directly in Node.
// Canonical host, no trailing slash. Placeholder until the domain is chosen (LAUNCH_BLOCKERS.md, `site-url`).
export const SITE_URL = 'https://example.invalid'

export const siteUrlIsPlaceholder = SITE_URL.endsWith('.invalid')

/** Indexable pages, in sitemap order. `/404` is deliberately absent. */
export const sitemapPaths = ['/', '/privacy'] as const
