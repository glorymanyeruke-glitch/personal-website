import { Link } from '@tanstack/react-router'
import { nav, person, ui } from '~/content/site'
import { ButtonLink } from '../ui/button'
import { LogoBadge } from './logo-badge'
import { MobileMenu } from './mobile-menu'

/** Sticky 64px header (§3.4). Nav hrefs are "/#section" so they also work from /privacy. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 bg-paper">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-5 md:px-8">
        <Link
          to="/"
          hash="top"
          className="flex min-h-11 items-center gap-3 text-ink no-underline"
          aria-label={ui.homeLabel}
        >
          <LogoBadge />
          <span className="font-display text-base leading-none font-medium min-[400px]:text-lg">
            {person.name}
          </span>
        </Link>

        <nav aria-label={ui.mainNavLabel} className="hidden items-center gap-8 text-ui lg:flex">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={`/${link.href}`}
              className="text-ink no-underline hover:text-bronze"
            >
              {link.label}
            </a>
          ))}
          <ButtonLink href={`/${nav.cta.href}`} size="sm">
            {nav.cta.label}
          </ButtonLink>
        </nav>

        <MobileMenu />
      </div>
    </header>
  )
}
