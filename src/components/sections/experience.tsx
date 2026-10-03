import { experience } from '~/content/site'
import { ContentText } from '../ui/content-text'
import { Section } from './section'

/** A real sequence, so a timeline is justified here (§3.4). */
export function Experience() {
  return (
    <Section id={experience.id} heading={experience.heading}>
      <ol className="relative max-w-[44rem] pl-7 before:absolute before:top-2.5 before:bottom-2.5 before:left-[3px] before:w-px before:bg-rule">
        {experience.entries.map((entry) => (
          <li
            key={entry.title}
            className="relative pb-9 before:absolute before:top-[0.6rem] before:-left-7 before:size-[7px] before:rounded-full before:bg-gilt last:pb-0"
          >
            <p className="mb-1 text-ui text-muted tabular-nums">
              <ContentText value={entry.when} />
              {entry.whenNote ? (
                <>
                  {' '}
                  <ContentText value={entry.whenNote} />
                </>
              ) : null}
            </p>
            <h3 className="mb-2 font-display text-lg font-medium text-bronze">{entry.title}</h3>
            <p>
              {entry.body}
              {entry.bodyNote ? (
                <>
                  {' '}
                  <ContentText value={entry.bodyNote} />
                </>
              ) : null}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
