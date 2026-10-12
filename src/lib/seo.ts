import { person, seo } from '~/content/site'
import { SITE_URL } from '~/content/site-url'

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === '/' ? '/' : path}`
}

interface PageSeo {
  title: string
  description: string
  /** Route path, e.g. `/privacy`. */
  path: string
}

/** Title, description, canonical, Open Graph and Twitter tags for one indexable page. */
export function pageHead({ title, description, path }: PageSeo) {
  const url = absoluteUrl(path)
  const image = absoluteUrl(seo.ogImage.path)
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: seo.siteName },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: String(seo.ogImage.width) },
      { property: 'og:image:height', content: String(seo.ogImage.height) },
      { property: 'og:image:alt', content: seo.ogImage.alt },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: seo.ogImage.alt },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}

/**
 * Person + ProfessionalService (§9). Only facts already on the page; no address, phone or
 * registration number until Gloria supplies them. `sameAs` appears only once profiles exist.
 */
export function homeJsonLd() {
  const personId = `${SITE_URL}/#person`
  const sameAs = [...seo.profiles]
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: person.name,
        honorificPrefix: 'Dr.',
        jobTitle: person.role,
        url: absoluteUrl('/'),
        image: absoluteUrl(seo.ogImage.path),
        ...(sameAs.length > 0 && { sameAs }),
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#practice`,
        name: person.practice,
        url: absoluteUrl('/'),
        logo: absoluteUrl('/icon-512.png'),
        image: absoluteUrl(seo.ogImage.path),
        description: seo.description,
        founder: { '@id': personId },
        employee: { '@id': personId },
        ...(sameAs.length > 0 && { sameAs }),
      },
    ],
  }
}

/** `<` escaped so the JSON can never close its own <script> element. */
export function jsonLdScript(data: object) {
  return {
    type: 'application/ld+json',
    children: JSON.stringify(data).replace(/</g, '\\u003c'),
  }
}
