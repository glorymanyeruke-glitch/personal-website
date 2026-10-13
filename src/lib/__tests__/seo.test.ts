import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { seo } from '~/content/site'
import { SITE_URL, siteUrlIsPlaceholder } from '~/content/site-url'
import { absoluteUrl, homeJsonLd, jsonLdScript, pageHead } from '../seo'

describe('pageHead', () => {
  const head = pageHead({ title: 'T', description: 'D', path: '/privacy' })
  const meta = (key: string) =>
    head.meta.find((m) => ('property' in m ? m.property : 'name' in m ? m.name : '') === key)

  it('sets an absolute canonical and og:url', () => {
    expect(head.links[0]?.href).toBe(`${SITE_URL}/privacy`)
    expect(meta('og:url')).toMatchObject({ content: `${SITE_URL}/privacy` })
  })

  it('uses an absolute 1200×630 image with alt text', () => {
    expect(meta('og:image')).toMatchObject({ content: `${SITE_URL}/og.jpg` })
    expect(meta('og:image:width')).toMatchObject({ content: '1200' })
    expect(meta('og:image:height')).toMatchObject({ content: '630' })
    expect(meta('twitter:image:alt')).toBeDefined()
  })

  it('keeps the home canonical with a trailing slash', () => {
    expect(absoluteUrl('/')).toBe(`${SITE_URL}/`)
  })
})

describe('homeJsonLd', () => {
  const graph = homeJsonLd()['@graph']

  it('describes a Person and a ProfessionalService that reference each other', () => {
    expect(graph.map((n) => n['@type'])).toEqual(['Person', 'ProfessionalService'])
    expect(graph[1]).toMatchObject({ founder: { '@id': graph[0]?.['@id'] } })
  })

  it('lists the confirmed profiles as sameAs', () => {
    expect(graph.every((n) => n.sameAs?.length === seo.profiles.length)).toBe(true)
  })

  it('escapes < so the data cannot close its script tag', () => {
    expect(jsonLdScript({ x: '</script>' }).children).not.toContain('<')
  })
})

describe('SITE_URL', () => {
  it('has no trailing slash', () => {
    expect(SITE_URL.endsWith('/')).toBe(false)
  })

  it('is listed in LAUNCH_BLOCKERS.md while it is a placeholder', () => {
    const blockers = readFileSync(new URL('../../../LAUNCH_BLOCKERS.md', import.meta.url), 'utf8')
    if (siteUrlIsPlaceholder) expect(blockers).toContain('`site-url`')
  })
})
