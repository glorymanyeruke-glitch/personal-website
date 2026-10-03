import type { SubmitEvent } from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '~/components/ui/button'
import { Field, FieldDescription, FieldLabel, Input, Textarea } from '~/components/ui/field'
import { contactSection } from '~/content/site'

const { form } = contactSection

/** Shared ids: the hero's "Send a message" focuses the first field. */
export const contactFieldIds = { name: 'contact-name' } as const

const radioClass = 'flex min-h-11 cursor-pointer items-center gap-2.5'
const radioInputClass = 'size-5 shrink-0 accent-gilt-light'

/**
 * Contact form — STATIC LAYOUT (Phase 2). Validation, Turnstile, submission and the
 * success/error states arrive in Phase 3 (tests first). Submission is blocked until then;
 * method="post" means even a pre-hydration submit never puts the message in a URL.
 */
export function ContactForm() {
  function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <form method="post" noValidate onSubmit={onSubmit}>
      <div className="grid gap-x-5 sm:grid-cols-2">
        <Field name="name">
          <FieldLabel>{form.name.label}</FieldLabel>
          <Input id={contactFieldIds.name} autoComplete="name" maxLength={80} />
        </Field>
        <Field name="email">
          <FieldLabel>{form.email.label}</FieldLabel>
          <Input type="email" autoComplete="email" maxLength={254} />
        </Field>
      </div>

      <Field name="phone">
        <FieldLabel optional={form.phone.optional}>{form.phone.label}</FieldLabel>
        <Input type="tel" autoComplete="tel" maxLength={20} />
      </Field>

      <fieldset className="mb-[1.375rem] min-w-0">
        <legend className="mb-1.5 text-ui font-medium text-paper">
          {form.preferredContact.legend}
        </legend>
        <div className="flex flex-wrap gap-x-6">
          {form.preferredContact.options.map((o) => (
            <label key={o.value} className={radioClass}>
              <input
                type="radio"
                name="preferredContact"
                value={o.value}
                defaultChecked={o.value === 'email'}
                className={radioInputClass}
              />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mb-[1.375rem] min-w-0">
        <legend className="mb-1.5 text-ui font-medium text-paper">{form.sessionType.legend}</legend>
        <div className="flex flex-wrap gap-x-6">
          {form.sessionType.options.map((o) => (
            <label key={o.value} className={radioClass}>
              <input
                type="radio"
                name="sessionType"
                value={o.value}
                defaultChecked={o.value === 'not-sure'}
                className={radioInputClass}
              />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>

      <Field name="message">
        <FieldLabel>{form.message.label}</FieldLabel>
        <Textarea maxLength={form.message.maxLength} />
        <FieldDescription>{form.message.helper}</FieldDescription>
      </Field>

      <div className="mb-[1.375rem]">
        <label className="flex cursor-pointer items-start gap-2.5 pt-2.5">
          <input
            type="checkbox"
            name="consent"
            className="mt-0.5 size-5 shrink-0 accent-gilt-light"
          />
          <span>
            {form.consent.before}{' '}
            <Link to="/privacy" className="text-gilt-light">
              {form.consent.link}
            </Link>
            {form.consent.after}
          </span>
        </label>
      </div>

      {/* Turnstile widget mounts here in Phase 3. */}
      <div className="mt-2 mb-6 grid h-[65px] w-[300px] max-w-full place-items-center rounded-[4px] border border-dashed border-paper/40 font-mono text-sm text-muted-on-dark">
        {form.turnstilePending}
      </div>

      <Button type="submit" variant="onDark" className="min-w-52">
        {form.submit}
      </Button>
    </form>
  )
}
