import { describe, expect, it } from 'vitest'
import { parseServerEnv } from '../env.server'

const valid = {
  RESEND_API_KEY: 're_test_123',
  CONTACT_TO_EMAIL: 'inbox@example.com',
  CONTACT_FROM_EMAIL: 'hello@example.com',
  TURNSTILE_SECRET_KEY: '1x0000000000000000000000000000000AA',
}

describe('parseServerEnv', () => {
  it('accepts a complete env', () => {
    expect(parseServerEnv(valid).ok).toBe(true)
  })

  it('names every missing variable', () => {
    const result = parseServerEnv({})
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.problems).toHaveLength(Object.keys(valid).length)
    expect(result.problems).toContain('RESEND_API_KEY is missing')
    expect(result.problems).toContain('CONTACT_TO_EMAIL is missing')
  })

  it('treats empty strings as missing', () => {
    const result = parseServerEnv({ ...valid, TURNSTILE_SECRET_KEY: '' })
    expect(result).toEqual({ ok: false, problems: ['TURNSTILE_SECRET_KEY is missing'] })
  })

  it('reports invalid values without echoing them', () => {
    const secretLooking = 'sk_live_should_not_appear'
    const result = parseServerEnv({
      ...valid,
      RESEND_API_KEY: secretLooking,
      CONTACT_TO_EMAIL: 'not-an-email',
    })
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.problems.join(' ')).not.toContain(secretLooking)
    expect(result.problems.some((p) => p.startsWith('RESEND_API_KEY is invalid'))).toBe(true)
    expect(result.problems.some((p) => p.startsWith('CONTACT_TO_EMAIL is invalid'))).toBe(true)
  })
})
