import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { notFound as notFoundCopy, seo } from '~/content/site'

// Catch-all 404 (§6). Unknown URLs throw notFound(), so the server answers HTTP 404 and
// search engines don't index them. `/404` itself renders normally only so the build can
// prerender a static 404.html (the prerenderer rejects non-200 responses).
export const Route = createFileRoute('/$')({
  loader: ({ params }) => {
    // TanStack Router's documented pattern: notFound() is a typed object, not an Error.
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    if (params._splat !== '404') throw notFound()
  },
  head: () => ({
    meta: [
      { title: `${notFoundCopy.title} — ${seo.title}` },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: NotFoundPage,
  notFoundComponent: NotFoundPage,
})

function NotFoundPage() {
  return (
    <main id="main" className="mx-auto max-w-content px-5 py-16 md:px-8 lg:py-24">
      <h1 className="mb-4 font-display text-3xl font-medium text-bronze lg:text-4xl">
        {notFoundCopy.heading}
      </h1>
      <p className="mb-8 max-w-prose">{notFoundCopy.body}</p>
      <Link to="/" className="text-bronze">
        {notFoundCopy.home}
      </Link>
    </main>
  )
}
