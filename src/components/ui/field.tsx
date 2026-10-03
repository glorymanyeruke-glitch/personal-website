import { Field as BaseField } from '@base-ui/react/field'
import { clsx } from 'clsx'
import type { ComponentProps, ReactNode } from 'react'

/**
 * Form field parts, styled for the myrtle contact band (the only place forms appear).
 * Base UI wires label ↔ control ↔ description/error ids and aria-invalid; TanStack Form
 * drives validity from outside via `invalid` (Phase 3). Labels are always visible —
 * no placeholder-as-label (§9).
 */
export function Field({ className, ...props }: ComponentProps<typeof BaseField.Root>) {
  return <BaseField.Root className={clsx('mb-[1.375rem]', className)} {...props} />
}

export function FieldLabel({ children, optional }: { children: ReactNode; optional?: string }) {
  return (
    <BaseField.Label className="mb-1.5 block text-ui font-medium text-paper">
      {children}
      {optional ? <span className="font-normal text-muted-on-dark"> {optional}</span> : null}
    </BaseField.Label>
  )
}

export function FieldDescription({
  className,
  ...props
}: ComponentProps<typeof BaseField.Description>) {
  return (
    <BaseField.Description
      className={clsx('mt-1.5 text-sm text-muted-on-dark', className)}
      {...props}
    />
  )
}

/** Error text is prefixed with an icon-free "Error:" word so it's never colour-only (§9). */
export function FieldError({ children }: { children: ReactNode }) {
  return (
    <BaseField.Error match className="mt-1.5 flex gap-1.5 text-sm text-error-on-dark">
      {children}
    </BaseField.Error>
  )
}

const controlClass =
  'block w-full rounded-input border border-paper bg-paper px-3.5 py-3 font-sans text-body text-ink data-invalid:border-error-on-dark data-invalid:shadow-[0_0_0_1px_var(--color-error-on-dark)]'

export function Input({ className, ...props }: ComponentProps<typeof BaseField.Control>) {
  return <BaseField.Control className={clsx(controlClass, 'min-h-12', className)} {...props} />
}

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return (
    <BaseField.Control
      render={
        <textarea className={clsx(controlClass, 'min-h-36 resize-y', className)} {...props} />
      }
    />
  )
}
