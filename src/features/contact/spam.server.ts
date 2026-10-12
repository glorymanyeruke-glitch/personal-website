import { getRequestHeader } from '@tanstack/react-start/server'
import type { ContactInput } from './schema'

const MIN_FILL_MS = 3000
const TURNSTILE_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

/** True for submissions that look automated. The caller answers "ok" so bots learn nothing. */
export function looksLikeBot(input: Pick<ContactInput, 'company' | 'fillMs'>): boolean {
  return input.company !== '' || input.fillMs < MIN_FILL_MS
}

/** Visitor IP as seen by Netlify; only passed on to Turnstile, never logged or stored. */
export function clientIp(): string | undefined {
  return getRequestHeader('x-nf-client-connection-ip')
}

export type VerifyResult = { ok: true } | { ok: false; status?: number }

/** Cloudflare Turnstile siteverify, 5s timeout (§7.3 step 3). Any failure counts as a failed check. */
export async function verifyTurnstile(
  token: string,
  secret: string,
  remoteIp: string | undefined,
): Promise<VerifyResult> {
  const body = new URLSearchParams({ secret, response: token })
  if (remoteIp) body.set('remoteip', remoteIp)
  try {
    const response = await fetch(TURNSTILE_URL, {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(5000),
    })
    if (!response.ok) return { ok: false, status: response.status }
    const result = (await response.json()) as { success?: boolean }
    return result.success === true ? { ok: true } : { ok: false }
  } catch {
    return { ok: false }
  }
}
