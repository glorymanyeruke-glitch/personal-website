import { about } from '~/content/site'
import { ContentText } from '../ui/content-text'

export function About() {
  return (
    <section
      id={about.id}
      aria-labelledby={`${about.id}-heading`}
      className="border-t border-rule py-16 lg:py-24"
    >
      <div className="mx-auto grid max-w-content gap-10 px-5 md:px-8 lg:grid-cols-12 lg:gap-x-6">
        <div className="max-w-prose lg:col-span-7">
          <h2
            id={`${about.id}-heading`}
            className="mb-7 font-display text-2xl font-medium text-bronze lg:text-3xl"
          >
            {about.heading}
          </h2>
          {about.paragraphs.map((p) => (
            <p key={p} className="mb-[1.1em]">
              {p}
            </p>
          ))}
        </div>
        <figure className="self-start border-l border-gilt pl-5 lg:col-span-4 lg:col-start-9 lg:mt-1.5">
          <blockquote>
            <p className="mb-3 font-display text-xl leading-[1.35] text-ink italic">
              {about.quote.text}
            </p>
          </blockquote>
          <figcaption className="text-ui text-muted">
            {about.quote.attribution} <ContentText value={about.quote.status} />
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
