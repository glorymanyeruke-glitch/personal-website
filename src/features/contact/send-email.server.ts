import { Resend } from 'resend'
import type { ContactInput } from './schema'

/** Header-bound values must never carry line breaks (header injection). */
export function stripLineBreaks(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim()
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

const replyLabel = { email: 'Email', phone: 'Phone call' } as const
const sessionLabel = {
  online: 'Online',
  'in-person': 'In person',
  'not-sure': 'Not sure yet',
} as const

/** Plain text + HTML bodies. Every visitor-supplied value is escaped in the HTML. */
export function buildEmail(input: ContactInput) {
  const rows: [string, string][] = [
    ['Name', input.name],
    ['Email', input.email],
    ['Phone', input.phone || '—'],
    ['Reply by', replyLabel[input.preferredContact]],
    ['Session', sessionLabel[input.sessionType]],
  ]
  const text = [...rows.map(([k, v]) => `${k}: ${v}`), '', input.message].join('\n')
  const html = [
    '<table cellpadding="4">',
    ...rows.map(([k, v]) => `<tr><th align="left">${k}</th><td>${escapeHtml(v)}</td></tr>`),
    '</table>',
    `<p style="white-space:pre-wrap">${escapeHtml(input.message)}</p>`,
  ].join('\n')
  return { subject: `Website enquiry from ${stripLineBreaks(input.name)}`, text, html }
}

export interface SendConfig {
  apiKey: string
  from: string
  to: string
}

export type SendResult = { ok: true } | { ok: false; status?: number }

const TIMEOUT_MS = 10_000

async function attempt(
  resend: Resend,
  config: SendConfig,
  input: ContactInput,
  idempotencyKey: string,
): Promise<{ ok: true } | { ok: false; status?: number; retry: boolean }> {
  const { subject, text, html } = buildEmail(input)
  try {
    const { error } = await Promise.race([
      resend.emails.send(
        {
          from: config.from,
          to: config.to,
          replyTo: stripLineBreaks(input.email),
          subject,
          text,
          html,
        },
        { idempotencyKey },
      ),
      new Promise<never>((_, reject) =>
        setTimeout(() => {
          reject(new Error('timeout'))
        }, TIMEOUT_MS),
      ),
    ])
    if (!error) return { ok: true }
    const status =
      'statusCode' in error && typeof error.statusCode === 'number' ? error.statusCode : undefined
    return { ok: false, status, retry: status === undefined || status >= 500 }
  } catch {
    return { ok: false, retry: true }
  }
}

/** Sends via Resend; one retry on a 5xx or network failure. The idempotency key stops a retry double-sending. */
export async function sendEnquiry(
  config: SendConfig,
  input: ContactInput,
  requestId: string,
): Promise<SendResult> {
  const resend = new Resend(config.apiKey)
  let result = await attempt(resend, config, input, requestId)
  if (!result.ok && result.retry) result = await attempt(resend, config, input, requestId)
  return result.ok ? { ok: true } : { ok: false, status: result.status }
}
