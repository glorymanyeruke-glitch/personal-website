import { createFileRoute } from '@tanstack/react-router'
import { ContentText } from '~/components/ui/content-text'
import { privacy, seo } from '~/content/site'
import { pageHead } from '~/lib/seo'

// Privacy notice (§8.3). Content comes from Gloria only — never written by us (Phase 5.3).
export const Route = createFileRoute('/privacy')({
  head: () =>
    pageHead({
      title: `${privacy.title} — ${seo.title}`,
      description: seo.privacyDescription,
      path: '/privacy',
    }),
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <main id="main" className="mx-auto max-w-content px-5 py-16 md:px-8 lg:py-24">
      <h1 className="mb-8 font-display text-3xl font-medium text-bronze lg:text-4xl">
        {privacy.heading}
      </h1>
      <p className="max-w-prose">
        <ContentText value={privacy.draft} />
      </p>
    </main>
  )
}
