import { describe, expect, it } from 'vitest'
import { parseServerEnv } from '../env.server'

const valid = {
  RESEND_API_KEY: 're_test_123',
  CONTACT_TO_EMAIL: 'inbox@example.com',
  CONTACT_FROM_EMAIL: 'hello@example.com',
  TURNSTILE_SECRET_KEY: '1x0000000000000000000000000000000AA',
  UPSTASH_REDIS_REST_URL: 'https://example.upstash.io',
  UPSTASH_REDIS_REST_TOKEN: 'token',
  RATE_LIMIT_SALT: 'a'.repeat(32),
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
    expect(result.problems).toContain('RATE_LIMIT_SALT is missing')
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
      UPSTASH_REDIS_REST_URL: 'http://insecure.example',
    })
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.problems.join(' ')).not.toContain(secretLooking)
    expect(result.problems.some((p) => p.startsWith('RESEND_API_KEY is invalid'))).toBe(true)
    expect(result.problems.some((p) => p.startsWith('UPSTASH_REDIS_REST_URL is invalid'))).toBe(
      true,
    )
  })

  it('rejects a short rate-limit salt', () => {
    const result = parseServerEnv({ ...valid, RATE_LIMIT_SALT: 'short' })
    expect(result.ok).toBe(false)
  })
})
