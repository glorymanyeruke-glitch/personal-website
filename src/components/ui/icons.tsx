import { Check, Copy, Menu, X, type LucideProps } from 'lucide-react'
import { siWhatsapp } from 'simple-icons'

/**
 * Icons are decorative: every one sits next to a visible text label, so they're
 * hidden from assistive tech. No emoji anywhere (§2).
 */
const lucideDefaults = { 'aria-hidden': true, strokeWidth: 1.75, focusable: false } as const

export const CopyIcon = (p: LucideProps) => <Copy {...lucideDefaults} {...p} />
export const CheckIcon = (p: LucideProps) => <Check {...lucideDefaults} {...p} />
export const MenuIcon = (p: LucideProps) => <Menu {...lucideDefaults} {...p} />
export const CloseIcon = (p: LucideProps) => <X {...lucideDefaults} {...p} />

/** WhatsApp mark from simple-icons (the only brand icon on the site). */
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={siWhatsapp.path} />
    </svg>
  )
}
