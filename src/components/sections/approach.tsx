import { approach } from '~/content/site'
import { Section } from './section'

/** Gloria's description of her practice, then three principles as prose columns — no
 * numbers, no cards (§2, §3.4). */
export function Approach() {
  return (
    <Section id={approach.id} heading={approach.heading}>
      <div className="mb-12 max-w-prose">
        {approach.intro.map((p) => (
          <p key={p} className="mb-[1.1em] last:mb-0">
            {p}
          </p>
        ))}
      </div>
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
