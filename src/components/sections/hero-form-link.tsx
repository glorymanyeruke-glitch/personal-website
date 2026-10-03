import type { MouseEvent } from 'react'
import { contactSection, hero } from '~/content/site'
import { scrollToSection } from '~/lib/scroll-to-section'
import { contactFieldIds } from '~/features/contact/contact-form'
import { ButtonLink } from '../ui/button'

/** "Send a message": scrolls to the form and focuses its first field (§7.1). */
export function HeroFormLink() {
  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    scrollToSection(contactSection.formId, document.getElementById(contactFieldIds.name))
  }
  return (
    <ButtonLink href={`#${contactSection.formId}`} variant="secondary" onClick={onClick}>
      {hero.formCta}
    </ButtonLink>
  )
}
