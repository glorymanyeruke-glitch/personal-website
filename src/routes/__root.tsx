import type { ReactNode } from 'react'
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import interLatin from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url'
import newsreaderItalicLatin from '@fontsource-variable/newsreader/files/newsreader-latin-opsz-italic.woff2?url'
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
      { title: 'Dr. Gloria Manyeruke — Psychotherapist' },
    ],
    links: [...fontPreloads, { rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
