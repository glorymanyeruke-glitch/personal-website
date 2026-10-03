/**
 * Scrolls to an in-page section and moves keyboard focus there, so screen-reader and
 * keyboard users land where sighted users see the page land. Scroll smoothness comes
 * from CSS `scroll-behavior`, which is only set when reduced motion is not requested.
 */
export function scrollToSection(id: string, focusTarget?: HTMLElement | null): void {
  const section = document.getElementById(id)
  if (!section) return
  section.scrollIntoView({ block: 'start' })
  ;(focusTarget ?? sectionFocusTarget(id))?.focus({ preventScroll: true })
  history.replaceState(null, '', `#${id}`)
}

/** The element that should receive focus for a section: its heading, made focusable. */
export function sectionFocusTarget(id: string): HTMLElement | null {
  const heading = document.getElementById(id)?.querySelector<HTMLElement>('h2, h1') ?? null
  if (heading && !heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1')
  return heading
}
