import { approach } from '~/content/site'
import { Section } from './section'

/** Three principles as prose columns — no numbers, no cards (§2, §3.4). */
export function Approach() {
  return (
    <Section id={approach.id} heading={approach.heading} lede={approach.lede}>
      <div className="grid gap-8 md:grid-cols-3 md:gap-10">
        {approach.principles.map((p) => (
          <div key={p.title}>
            <h3 className="mb-2 font-display text-lg font-medium text-bronze">{p.title}</h3>
            <p>{p.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
