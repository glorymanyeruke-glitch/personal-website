import { contactSection } from '~/content/site'
import { ServerEnvError, getServerEnv } from '~/lib/env.server'
import { log } from '~/lib/log.server'
import { contactSchema, type ContactErrorCode, type ContactResult } from './schema'
import { sendEnquiry } from './send-email.server'
import { clientIp, looksLikeBot, verifyTurnstile } from './spam.server'

function fail(code: ContactErrorCode, requestId: string, detail?: string): ContactResult {
  return { ok: false, code, message: contactSection.errors[code], requestId, detail }
}

/**
 * The contact flow (§7.3), minus rate limiting (dropped 2026-10-12). Logs metadata only;
 * the visitor's name, email, phone and message never reach a log line.
 */
export async function handleContact(raw: unknown): Promise<ContactResult> {
  const requestId = crypto.randomUUID()
  const started = Date.now()
  const done = (outcome: 'ok' | 'error') => ({
    requestId,
    outcome,
    latencyMs: Date.now() - started,
  })

  const parsed = contactSchema.safeParse(raw)
  if (!parsed.success) {
    log('contact.rejected', { ...done('error'), code: 'VALIDATION' })
    return fail('VALIDATION', requestId)
  }
  const input = parsed.data

  // Bots get a fake success so they don't learn what tripped them.
  if (looksLikeBot(input)) {
    log('contact.rejected', { ...done('ok'), code: 'SPAM_SILENT' })
    return { ok: true }
  }

  let env
  try {
    env = getServerEnv()
  } catch (error) {
    if (!(error instanceof ServerEnvError)) throw error
    // Problems name variables and reasons only, never values.
    const detail = `env: ${error.problems.join(', ')}`
    log('contact.env_invalid', { ...done('error'), code: 'ENV_INVALID', detail })
    return fail('SEND_FAILED', requestId, detail)
  }

  const verified = await verifyTurnstile(input.turnstileToken, env.TURNSTILE_SECRET_KEY, clientIp())
  if (!verified.ok) {
    log('contact.rejected', {
      ...done('error'),
      code: 'VERIFICATION_FAILED',
      status: verified.status,
    })
    return fail('VERIFICATION_FAILED', requestId)
  }

  const sent = await sendEnquiry(
    { apiKey: env.RESEND_API_KEY, from: env.CONTACT_FROM_EMAIL, to: env.CONTACT_TO_EMAIL },
    input,
    requestId,
  )
  if (!sent.ok) {
    const detail = `${sent.reason}${sent.status ? ` ${String(sent.status)}` : ''}`
    log('contact.send_failed', {
      ...done('error'),
      code: 'SEND_FAILED',
      status: sent.status,
      detail,
    })
    return fail('SEND_FAILED', requestId, detail)
  }

  log('contact.sent', done('ok'))
  return { ok: true }
}
