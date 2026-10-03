import interLatin from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url'
import newsreaderItalicLatin from '@fontsource-variable/newsreader/files/newsreader-latin-opsz-italic.woff2?url'
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { SiteFooter } from '~/components/layout/site-footer'
import { SiteHeader } from '~/components/layout/site-header'
import { seo, ui } from '~/content/site'
import appCss from '~/styles/app.css?url'

// Preload only the two files used above the fold (§3.2): the hero tagline (Newsreader
// italic) and body text (Inter). Same URLs as the CSS references, so no double download.
const fontPreloads = [newsreaderItalicLatin, interLatin].map((href) => ({
  rel: 'preload',
  href,
  as: 'font',
  type: 'font/woff2',
  crossOrigin: 'anonymous' as const,
}))

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: seo.title },
      { name: 'description', content: seo.description },
      { name: 'theme-color', content: '#FAF6EC' },
    ],
    links: [
      ...fontPreloads,
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
      { rel: 'icon', href: '/favicon-32.png', type: 'image/png' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      {/* Own stacking context: no z-index inside the page can rise above portaled overlays (the menu sheet). */}
      <div className="isolate">
        <SiteHeader />
        <Outlet />
        <SiteFooter />
      </div>
    </RootDocument>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body id="top">
        <a
          href="#main"
          className="fixed top-2 left-2 z-50 -translate-y-24 rounded-full bg-ink px-4 py-3 text-ui text-paper focus:translate-y-0"
        >
          {ui.skipLink}
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
