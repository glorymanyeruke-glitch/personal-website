import { cva, type VariantProps } from 'class-variance-authority'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

/**
 * Pill buttons (§3.3). Labels describe exactly what happens (§3.6).
 * Hover colour uses Tailwind's `hover:`, which v4 already gates to hover-capable
 * pointers. Press feedback and colour transitions are added in Phase 4 (§4.2 item 4).
 */
export const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border font-sans font-medium leading-none no-underline disabled:cursor-progress [&_svg]:size-[18px] [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'border-transparent bg-bronze text-paper hover:bg-bronze-deep',
        secondary: 'border-bronze bg-transparent text-bronze hover:bg-bronze/7',
        onDark: 'border-transparent bg-paper text-myrtle hover:bg-[#fff]',
        outlineDark: 'border-paper/55 bg-transparent text-paper hover:border-paper',
      },
      size: {
        md: 'min-h-12 px-[1.375rem] text-base',
        sm: 'min-h-11 px-4 text-ui', // 44px: still meets the target-size minimum (§9)
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

type Variants = VariantProps<typeof buttonVariants>

export function Button({
  variant,
  size,
  className,
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & Variants) {
  return <button type={type} className={buttonVariants({ variant, size, className })} {...props} />
}

export function ButtonLink({
  variant,
  size,
  className,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & Variants & { href: string }) {
  return (
    <a className={buttonVariants({ variant, size, className })} {...props}>
      {children}
    </a>
  )
}
