import { Accordion } from '@base-ui/react/accordion'
import { faq } from '~/content/site'
import { ContentText } from '../ui/content-text'
import { Section } from './section'

/**
 * Base UI Accordion (§5): one panel open at a time; closed answers stay findable with
 * the browser's find-in-page (`hiddenUntilFound`). Height/opacity motion: Phase 4.
 */
export function Faq() {
  return (
    <Section id={faq.id} heading={faq.heading}>
      <Accordion.Root hiddenUntilFound className="max-w-3xl border-t border-rule">
        {faq.items.map((item) => (
          <Accordion.Item key={item.question} className="border-b border-rule">
            <Accordion.Header className="m-0">
              <Accordion.Trigger className="group flex min-h-16 w-full cursor-pointer items-center justify-between gap-4 bg-transparent py-3 text-left font-display text-lg font-medium text-ink">
                {item.question}
                {/* Plus that becomes a minus; a state swap, not an animation. */}
                <span aria-hidden="true" className="relative size-3.5 shrink-0">
                  <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-bronze" />
                  <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-bronze group-data-panel-open:hidden" />
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel className="max-w-prose pb-5">
              <p>
                <ContentText value={item.answer} />
              </p>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Section>
  )
}
