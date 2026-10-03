import { research } from '~/content/site'
import { Section } from './section'

export function Research() {
  return (
    <Section id={research.id} heading={research.heading}>
      <dl className="grid gap-7 md:grid-cols-3 md:gap-10">
        {research.entries.map((entry) => (
          <div key={entry.title}>
            <dt className="mb-1.5 font-display text-lg font-medium text-bronze">{entry.title}</dt>
            <dd>{entry.body}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
