/**
 * Structured logger (reference.md §11): one JSON line per event to stdout, visible in
 * Netlify → Functions → Logs.
 *
 * The field set is closed on purpose. There is no way to pass arbitrary data, so form
 * values (name, email, phone, message) can't end up in logs by accident.
 */
export type LogEvent =
  | 'contact.sent'
  | 'contact.rejected'
  | 'contact.send_failed'
  | 'contact.rate_limited'
  | 'contact.ratelimit_unavailable'
  | 'contact.env_invalid'

export interface LogFields {
  requestId: string
  outcome?: 'ok' | 'error'
  latencyMs?: number
  /** Machine-readable reason, e.g. VALIDATION, VERIFICATION_FAILED. */
  code?: string
  /** Upstream HTTP status (Resend, Turnstile), never a response body. */
  status?: number
}

type Level = 'info' | 'warn' | 'error'

const levelFor: Record<LogEvent, Level> = {
  'contact.sent': 'info',
  'contact.rejected': 'info',
  'contact.rate_limited': 'warn',
  'contact.ratelimit_unavailable': 'warn',
  'contact.send_failed': 'error',
  'contact.env_invalid': 'error',
}

export function log(event: LogEvent, fields: LogFields): void {
  const level = levelFor[event]
  const line = JSON.stringify({ ts: new Date().toISOString(), level, event, ...fields })
  if (level === 'error') console.error(line)
  else if (level === 'warn') console.warn(line)
  else console.log(line)
}
