import { z } from 'zod'

/**
 * Server-only environment (reference.md §8.1). Never import from client code —
 * TanStack Start's import protection fails the build if a client module does.
 *
 * Parsed lazily on first use, not at import time, so building and prerendering
 * pages never needs secrets. Only the contact server function calls this.
 */
const serverEnvSchema = z.object({
  RESEND_API_KEY: z.string().startsWith('re_', 'must be a Resend API key (starts with "re_")'),
  CONTACT_TO_EMAIL: z.email(),
  // Must be an address on the Resend-verified domain.
  CONTACT_FROM_EMAIL: z.email(),
  TURNSTILE_SECRET_KEY: z.string().min(1),
  UPSTASH_REDIS_REST_URL: z.url({ protocol: /^https$/ }),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  // Salts the IP hash used as the rate-limit key; long enough to resist brute force.
  RATE_LIMIT_SALT: z.string().min(32, 'must be at least 32 characters'),
})

export type ServerEnv = z.infer<typeof serverEnvSchema>

export type EnvResult = { ok: true; env: ServerEnv } | { ok: false; problems: string[] }

/** Pure parse — reports variable names and reasons only, never values. */
export function parseServerEnv(source: Record<string, string | undefined>): EnvResult {
  const result = serverEnvSchema.safeParse(source)
  if (result.success) return { ok: true, env: result.data }

  const problems = result.error.issues.map((issue) => {
    const name = issue.path.join('.')
    return source[name] === undefined || source[name] === ''
      ? `${name} is missing`
      : `${name} is invalid: ${issue.message}`
  })
  return { ok: false, problems }
}

export class ServerEnvError extends Error {
  constructor(readonly problems: string[]) {
    super(
      `Server environment is not configured:\n  - ${problems.join('\n  - ')}\n` +
        'Set these in .env (local) or Netlify → Site configuration → Environment variables. See .env.example.',
    )
    this.name = 'ServerEnvError'
  }
}

let cached: ServerEnv | undefined

/** Validated env for server code. Throws ServerEnvError with a clear, value-free message. */
export function getServerEnv(): ServerEnv {
  if (cached) return cached
  const result = parseServerEnv(process.env)
  if (!result.ok) throw new ServerEnvError(result.problems)
  cached = result.env
  return cached
}
