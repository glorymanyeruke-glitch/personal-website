import { helpWith } from '~/content/site'
import { Section } from './section'

export function HelpWith() {
  return (
    <Section id={helpWith.id} heading={helpWith.heading}>
      <ul className="grid max-w-[52rem] border-t border-rule md:grid-cols-2 md:gap-x-10 md:border-t-0">
        {helpWith.items.map((item, i) => (
          <li
            key={item}
            className={
              i < 2 ? 'border-b border-rule py-3.5 md:border-t' : 'border-b border-rule py-3.5'
            }
          >
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-7 max-w-prose text-muted">{helpWith.note}</p>
    </Section>
  )
}
