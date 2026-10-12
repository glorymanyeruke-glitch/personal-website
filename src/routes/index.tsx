import { createFileRoute } from '@tanstack/react-router'
import { About } from '~/components/sections/about'
import { Approach } from '~/components/sections/approach'
import { Contact } from '~/components/sections/contact'
import { Experience } from '~/components/sections/experience'
import { Faq } from '~/components/sections/faq'
import { HelpWith } from '~/components/sections/help-with'
import { Hero, heroPortrait, heroPortraitSizes } from '~/components/sections/hero'
import { Research } from '~/components/sections/research'
import { seo } from '~/content/site'
import { homeJsonLd, jsonLdScript, pageHead } from '~/lib/seo'

export const Route = createFileRoute('/')({
  head: () => {
    const page = pageHead({ title: seo.title, description: seo.description, path: '/' })
    return {
      meta: page.meta,
      scripts: [jsonLdScript(homeJsonLd())],
      links: [
        ...page.links,
        // Desktop only: there the portrait is above the fold. On mobile it sits below the
        // headline, so it isn't preloaded at high priority (§9, Phase 0 gap 5).
        {
          rel: 'preload',
          as: 'image',
          type: 'image/avif',
          imageSrcSet: heroPortrait.sources.avif,
          imageSizes: heroPortraitSizes,
          media: '(min-width: 1024px)',
          fetchPriority: 'high',
        },
      ],
    }
  },
  component: Home,
})

// Composes sections only; no logic (reference.md §6).
function Home() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Approach />
      <HelpWith />
      <Experience />
      <Research />
      <Faq />
      <Contact />
    </main>
  )
}
