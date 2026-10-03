import { clsx } from 'clsx'
import type { ReactNode } from 'react'

/**
 * Quiet section shell: rhythm comes from spacing and a gilt hairline, not alternating
 * backgrounds (§3.3). Headings stand alone — no eyebrow labels (§2).
 */
export function Section({
  id,
  heading,
  lede,
  children,
  className,
}: {
  id: string
  heading: string
  lede?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={clsx('border-t border-rule py-16 lg:py-24', className)}
    >
      <div className="mx-auto max-w-content px-5 md:px-8">
        <h2
          id={`${id}-heading`}
          className="mb-7 font-display text-2xl font-medium text-bronze lg:text-3xl"
        >
          {heading}
        </h2>
        {lede ? <p className="-mt-3 mb-10 max-w-prose text-muted">{lede}</p> : null}
        {children}
      </div>
    </section>
  )
}
