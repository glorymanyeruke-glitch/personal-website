/**
 * Scrolls to an in-page section and moves keyboard focus there, so screen-reader and
 * keyboard users land where sighted users see the page land. Scroll smoothness comes
 * from CSS `scroll-behavior`, which is only set when reduced motion is not requested.
 */
export function scrollToSection(id: string, focusTarget?: HTMLElement | null): void {
  const section = document.getElementById(id)
  if (!section) return
  section.scrollIntoView({ block: 'start' })

  const target = focusTarget ?? section.querySelector<HTMLElement>('h2, h1')
  if (target) {
    if (!target.hasAttribute('tabindex') && !target.matches('input, textarea, button, a[href]')) {
      target.setAttribute('tabindex', '-1')
    }
    target.focus({ preventScroll: true })
  }
  history.replaceState(null, '', `#${id}`)
}
