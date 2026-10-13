import { z } from 'zod'

/**
 * One schema for the browser and the server function (reference.md §7.2). No secrets here.
 * Error strings say what's wrong and how to fix it (§3.6).
 */
export const preferredContactValues = ['email', 'phone'] as const
export const sessionTypeValues = ['online', 'in-person', 'not-sure'] as const

export const messageLimits = { min: 10, max: 1000 } as const

const formFields = z.object({
  name: z.string().trim().min(1, 'Enter your name.').max(80, 'Use 80 characters or fewer.'),
  email: z
    .string()
    .trim()
    .max(254, 'Use 254 characters or fewer.')
    .pipe(z.email('Enter an email address like name@example.com.')),
  phone: z
    .string()
    .trim()
    .max(20, 'Use 20 characters or fewer.')
    .regex(/^[0-9 +()-]*$/, 'Use only digits, spaces and + ( ) -.'),
  preferredContact: z.enum(preferredContactValues),
  sessionType: z.enum(sessionTypeValues),
  message: z
    .string()
    .trim()
    .min(messageLimits.min, `Write at least ${String(messageLimits.min)} characters.`)
    .max(messageLimits.max, `Use ${String(messageLimits.max)} characters or fewer.`),
  consent: z.literal(true, 'Tick the box to agree before sending.'),
})

type PhoneRule = { preferredContact: string; phone: string }

/** A phone number is required only if Gloria is asked to reply by phone. */
function requirePhoneWhenPreferred(value: PhoneRule, ctx: z.RefinementCtx) {
  if (value.preferredContact === 'phone' && value.phone === '') {
    ctx.addIssue({
      code: 'custom',
      path: ['phone'],
      message: 'Enter a phone number, or choose email for the reply.',
    })
  }
}

/** What the visitor fills in. */
export const formSchema = formFields.superRefine(requirePhoneWhenPreferred)

/** What crosses the wire: the form plus the anti-spam fields the visitor doesn't touch. */
export const contactSchema = formFields
  .extend({
    /** Honeypot: real visitors never see it, so it must be empty. */
    company: z.string().max(200),
    /** Milliseconds between the form appearing and submit, measured in the browser. */
    fillMs: z.number().int().min(0).max(86_400_000),
    turnstileToken: z.string().min(1).max(4096),
  })
  .superRefine(requirePhoneWhenPreferred)

/** Form state: `consent` is a plain boolean until it's ticked (the schema requires `true`). */
export type FormValues = Omit<z.input<typeof formSchema>, 'consent'> & { consent: boolean }
export type ContactInput = z.infer<typeof contactSchema>

export type ContactErrorCode = 'VALIDATION' | 'VERIFICATION_FAILED' | 'SEND_FAILED'

export type ContactResult =
  | { ok: true }
  | {
      ok: false
      code: ContactErrorCode
      message: string
      requestId: string
      /** Short technical label shown next to the reference, e.g. `invalid_api_key 401`. No user data. */
      detail?: string
    }
