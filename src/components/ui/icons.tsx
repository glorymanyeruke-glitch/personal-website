import { Check, Copy, Menu, X, type LucideProps } from 'lucide-react'

/**
 * Icons are decorative: every one sits next to a visible text label, so they're
 * hidden from assistive tech. No emoji anywhere (§2).
 */
const lucideDefaults = { 'aria-hidden': true, strokeWidth: 1.75, focusable: false } as const

export const CopyIcon = (p: LucideProps) => <Copy {...lucideDefaults} {...p} />
export const CheckIcon = (p: LucideProps) => <Check {...lucideDefaults} {...p} />
export const MenuIcon = (p: LucideProps) => <Menu {...lucideDefaults} {...p} />
export const CloseIcon = (p: LucideProps) => <X {...lucideDefaults} {...p} />
