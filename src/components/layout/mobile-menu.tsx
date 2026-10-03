import { Drawer } from '@base-ui/react/drawer'
import { useRef, useState, type MouseEvent } from 'react'
import { nav, ui } from '~/content/site'
import { scrollToSection, sectionFocusTarget } from '~/lib/scroll-to-section'
import { buttonVariants } from '../ui/button'
import { CloseIcon, MenuIcon } from '../ui/icons'

/**
 * Bottom sheet menu under 1024px (§3.4, §4.2 item 5) — Base UI Drawer: focus trap,
 * Escape/backdrop dismiss, swipe down to dismiss, focus restored to the trigger.
 * Choosing a link closes the sheet, hands its section heading to Base UI as the
 * `finalFocus` target (instead of the Menu button), then scrolls once the scroll lock is
 * released. Enter/exit motion arrives in Phase 4.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const pendingSection = useRef<string | null>(null)
  const returnFocusTo = useRef<HTMLElement | null>(null)

  function goTo(event: MouseEvent<HTMLAnchorElement>, href: string) {
    // On another page (e.g. /privacy) let the link load the home page normally.
    if (window.location.pathname !== '/') return
    event.preventDefault()
    const id = href.replace('#', '')
    pendingSection.current = id
    returnFocusTo.current = sectionFocusTarget(id)
    setOpen(false)
  }

  return (
    <Drawer.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (isOpen) returnFocusTo.current = null
        setOpen(isOpen)
      }}
      onOpenChangeComplete={(isOpen) => {
        // Runs after the sheet is gone and scroll lock is released.
        if (!isOpen && pendingSection.current) {
          scrollToSection(pendingSection.current, returnFocusTo.current)
          pendingSection.current = null
        }
      }}
    >
      {/* Below 375px the label is visually hidden (still the accessible name) so the
          name in the header fits on one line; the button stays a 44px target. */}
      <Drawer.Trigger className="inline-flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border border-rule bg-transparent py-0 font-sans text-ui font-medium text-ink min-[375px]:pr-3.5 min-[375px]:pl-3 lg:hidden [&_svg]:size-[18px]">
        <MenuIcon />
        <span className="max-[374px]:sr-only">{ui.menu.open}</span>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Backdrop className="fixed inset-0 z-50 bg-ink/40" />
        <Drawer.Viewport className="fixed inset-0 z-50 flex items-end">
          <Drawer.Popup
            finalFocus={() => returnFocusTo.current ?? true}
            className="max-h-[85dvh] w-full [transform:translateY(var(--drawer-swipe-movement-y))] overflow-y-auto overscroll-contain border-t border-rule bg-paper px-5 pt-3 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] text-ink outline-none"
          >
            <Drawer.Content>
              <div className="flex min-h-13 items-center justify-between">
                <Drawer.Title className="text-ui font-medium text-muted">
                  {ui.menu.title}
                </Drawer.Title>
                <Drawer.Close
                  aria-label={ui.menu.close}
                  className="grid size-11 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-ink [&_svg]:size-[22px]"
                >
                  <CloseIcon />
                </Drawer.Close>
              </div>
              <nav aria-label={ui.mainNavLabel}>
                <ul className="mt-1 mb-6 divide-y divide-rule">
                  {nav.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={`/${link.href}`}
                        onClick={(e) => {
                          goTo(e, link.href)
                        }}
                        className="flex min-h-14 items-center font-display text-xl leading-none text-ink no-underline"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <a
                href={`/${nav.cta.href}`}
                onClick={(e) => {
                  goTo(e, nav.cta.href)
                }}
                className={buttonVariants({ className: 'w-full' })}
              >
                {nav.cta.label}
              </a>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
