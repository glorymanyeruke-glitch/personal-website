import { useForm } from '@tanstack/react-form'
import { Link } from '@tanstack/react-router'
import { useEffect, useRef, useState, type SubmitEvent } from 'react'
import { Button } from '~/components/ui/button'
import { ContentText } from '~/components/ui/content-text'
import { CopyButton } from '~/components/ui/copy-button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
  Textarea,
} from '~/components/ui/field'
import { contact, contactSection } from '~/content/site'
import { sendContact } from './contact.functions'
import { contactFieldIds } from './ids'
import { formSchema, type ContactResult, type FormValues } from './schema'
import { TurnstileWidget } from './turnstile-widget'

const { form: copy, errors, success } = contactSection

const radioClass = 'flex min-h-11 cursor-pointer items-center gap-2.5'
const radioInputClass = 'size-5 shrink-0 accent-gilt-light'
const FALLBACK_EMAIL_ID = 'contact-fallback-email'

const defaultValues: FormValues = {
  name: '',
  email: '',
  phone: '',
  preferredContact: 'email',
  sessionType: 'not-sure',
  message: '',
  consent: false,
}

type Failure = {
  code: 'VALIDATION' | 'VERIFICATION_FAILED' | 'SEND_FAILED'
  message: string
  requestId?: string
}

/** The error text for a field, once the visitor has left it or tried to send. */
function messageOf(errors: unknown[]): string | undefined {
  const first = errors[0]
  return typeof first === 'object' && first !== null && 'message' in first
    ? String(first.message)
    : undefined
}

/**
 * Contact form (§7). Validation runs in the browser with the same Zod schema the server
 * uses; the server function re-checks everything. Messages are never stored.
 */
export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const honeypot = useRef<HTMLInputElement>(null)
  const shownAt = useRef(0)
  const successHeading = useRef<HTMLHeadingElement>(null)

  const [attempted, setAttempted] = useState(false)
  const [token, setToken] = useState('')
  const [resetKey, setResetKey] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [failure, setFailure] = useState<Failure | undefined>()
  const [sent, setSent] = useState(false)

  const siteKey = (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined) ?? ''

  const form = useForm({
    defaultValues,
    validators: { onChange: formSchema, onSubmit: formSchema },
    onSubmitInvalid: () => {
      // Wait for the error state to render, then move focus to the first invalid field.
      requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      })
    },
    onSubmit: async ({ value }) => {
      if (!token) {
        setFailure({ code: 'VERIFICATION_FAILED', message: errors.spamCheckPending })
        return
      }
      setSubmitting(true)
      setFailure(undefined)
      let result: ContactResult
      try {
        result = await sendContact({
          data: {
            ...value,
            company: honeypot.current?.value ?? '',
            fillMs: Math.round(performance.now() - shownAt.current),
            turnstileToken: token,
          },
        })
      } catch {
        // Network down or the function crashed before it could answer.
        result = { ok: false, code: 'SEND_FAILED', message: errors.SEND_FAILED, requestId: '' }
      }
      setSubmitting(false)
      if (result.ok) {
        setSent(true)
        return
      }
      setFailure({
        code: result.code,
        message: result.message,
        requestId: result.requestId || undefined,
      })
      // A Turnstile token works once; get a new one for the next attempt.
      setToken('')
      setResetKey((n) => n + 1)
    },
  })

  useEffect(() => {
    shownAt.current = performance.now()
  }, [])

  useEffect(() => {
    if (sent) successHeading.current?.focus()
  }, [sent])

  function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setAttempted(true)
    void form.handleSubmit()
  }

  if (sent) {
    return (
      <div role="status">
        <h3
          ref={successHeading}
          tabIndex={-1}
          className="mb-3 font-display text-xl font-medium text-paper outline-none"
        >
          {success.heading}
        </h3>
        <p className="text-muted-on-dark">
          {success.replyBefore} <ContentText value={success.replyTime} onDark />
          {success.replyAfter}
        </p>
      </div>
    )
  }

  const showFallback = failure !== undefined && failure.code !== 'VALIDATION'

  return (
    <form ref={formRef} method="post" noValidate onSubmit={onSubmit}>
      <div className="grid gap-x-5 sm:grid-cols-2">
        <form.Field name="name">
          {(field) => {
            const error =
              field.state.meta.isTouched || attempted
                ? messageOf(field.state.meta.errors)
                : undefined
            return (
              <Field name="name" invalid={error !== undefined}>
                <FieldLabel>{copy.name.label}</FieldLabel>
                <Input
                  id={contactFieldIds.name}
                  autoComplete="name"
                  maxLength={80}
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value)
                  }}
                  onBlur={field.handleBlur}
                />
                {error ? <FieldError>{error}</FieldError> : null}
              </Field>
            )
          }}
        </form.Field>
        <form.Field name="email">
          {(field) => {
            const error =
              field.state.meta.isTouched || attempted
                ? messageOf(field.state.meta.errors)
                : undefined
            return (
              <Field name="email" invalid={error !== undefined}>
                <FieldLabel>{copy.email.label}</FieldLabel>
                <Input
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value)
                  }}
                  onBlur={field.handleBlur}
                />
                {error ? <FieldError>{error}</FieldError> : null}
              </Field>
            )
          }}
        </form.Field>
      </div>

      <form.Subscribe selector={(s) => s.values.preferredContact}>
        {(preferred) => (
          <form.Field name="phone">
            {(field) => {
              const error =
                field.state.meta.isTouched || attempted
                  ? messageOf(field.state.meta.errors)
                  : undefined
              return (
                <Field name="phone" invalid={error !== undefined}>
                  <FieldLabel optional={preferred === 'phone' ? undefined : copy.phone.optional}>
                    {copy.phone.label}
                  </FieldLabel>
                  <Input
                    type="tel"
                    autoComplete="tel"
                    maxLength={20}
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value)
                    }}
                    onBlur={field.handleBlur}
                  />
                  {error ? <FieldError>{error}</FieldError> : null}
                </Field>
              )
            }}
          </form.Field>
        )}
      </form.Subscribe>

      <form.Field name="preferredContact">
        {(field) => (
          <fieldset className="mb-[1.375rem] min-w-0">
            <legend className="mb-1.5 text-ui font-medium text-paper">
              {copy.preferredContact.legend}
            </legend>
            <div className="flex flex-wrap gap-x-6">
              {copy.preferredContact.options.map((o) => (
                <label key={o.value} className={radioClass}>
                  <input
                    type="radio"
                    name="preferredContact"
                    value={o.value}
                    checked={field.state.value === o.value}
                    onChange={() => {
                      field.handleChange(o.value)
                    }}
                    className={radioInputClass}
                  />
                  {o.label}
                </label>
              ))}
            </div>
          </fieldset>
        )}
      </form.Field>

      <form.Field name="sessionType">
        {(field) => (
          <fieldset className="mb-[1.375rem] min-w-0">
            <legend className="mb-1.5 text-ui font-medium text-paper">
              {copy.sessionType.legend}
            </legend>
            <div className="flex flex-wrap gap-x-6">
              {copy.sessionType.options.map((o) => (
                <label key={o.value} className={radioClass}>
                  <input
                    type="radio"
                    name="sessionType"
                    value={o.value}
                    checked={field.state.value === o.value}
                    onChange={() => {
                      field.handleChange(o.value)
                    }}
                    className={radioInputClass}
                  />
                  {o.label}
                </label>
              ))}
            </div>
          </fieldset>
        )}
      </form.Field>

      <form.Field name="message">
        {(field) => {
          const error =
            field.state.meta.isTouched || attempted ? messageOf(field.state.meta.errors) : undefined
          return (
            <Field name="message" invalid={error !== undefined}>
              <FieldLabel>{copy.message.label}</FieldLabel>
              <Textarea
                maxLength={copy.message.maxLength}
                value={field.state.value}
                onChange={(e) => {
                  field.handleChange(e.target.value)
                }}
                onBlur={field.handleBlur}
              />
              <FieldDescription>{copy.message.helper}</FieldDescription>
              <p className="mt-1 text-sm text-muted-on-dark tabular-nums">
                {field.state.value.length} / {copy.message.maxLength} {copy.characters}
              </p>
              {error ? <FieldError>{error}</FieldError> : null}
            </Field>
          )
        }}
      </form.Field>

      <form.Field name="consent">
        {(field) => {
          const error =
            field.state.meta.isTouched || attempted ? messageOf(field.state.meta.errors) : undefined
          return (
            <div className="mb-[1.375rem]">
              <label className="flex cursor-pointer items-start gap-2.5 pt-2.5">
                <input
                  type="checkbox"
                  name="consent"
                  checked={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.checked)
                  }}
                  onBlur={field.handleBlur}
                  aria-invalid={error !== undefined}
                  aria-describedby={error ? 'contact-consent-error' : undefined}
                  className="mt-0.5 size-5 shrink-0 accent-gilt-light"
                />
                <span>
                  {copy.consent.before}{' '}
                  <Link to="/privacy" className="text-gilt-light">
                    {copy.consent.link}
                  </Link>
                  {copy.consent.after}
                </span>
              </label>
              {error ? (
                <p id="contact-consent-error" className="mt-1.5 text-sm text-error-on-dark">
                  {error}
                </p>
              ) : null}
            </div>
          )
        }}
      </form.Field>

      {/* Honeypot: invisible and unreachable for people; bots tend to fill it (§7.2). */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <TurnstileWidget
        siteKey={siteKey}
        onToken={setToken}
        resetKey={resetKey}
        label={copy.spamCheckLabel}
      />

      <div aria-live="polite">
        {failure ? (
          <div className="mb-5 rounded-input border border-error-on-dark px-4 py-3.5 text-ui text-paper">
            <p className="text-error-on-dark">{failure.message}</p>
            {failure.requestId ? (
              <p className="mt-1 text-sm text-muted-on-dark">
                {errors.reference} {failure.requestId}
              </p>
            ) : null}
            {showFallback ? (
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-3">
                <span className="text-muted-on-dark">{errors.fallbackLead}</span>
                <span id={FALLBACK_EMAIL_ID} className="break-all text-paper select-all">
                  {contact.email}
                </span>
                <CopyButton
                  targetId={FALLBACK_EMAIL_ID}
                  text={contact.email}
                  labels={{
                    copy: contactSection.email.copy,
                    copied: contactSection.email.copied,
                    announceCopied: contactSection.email.announceCopied,
                    announceSelected: contactSection.email.announceSelected,
                  }}
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <Button type="submit" variant="onDark" className="min-w-52" disabled={submitting}>
        {submitting ? copy.submitting : copy.submit}
      </Button>
    </form>
  )
}
