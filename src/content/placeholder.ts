/**
 * Content only Gloria can supply. Rendered visibly as `[PLACEHOLDER: …]` so it can't
 * ship unnoticed, and every key must be listed in LAUNCH_BLOCKERS.md (checked by test).
 * Never replace a placeholder with invented facts (reference.md §1, §3.6).
 */
export interface Placeholder {
  readonly kind: 'placeholder'
  readonly key: string
  readonly note: string
}

export type Copy = string | Placeholder

export function ph(key: string, note: string): Placeholder {
  return { kind: 'placeholder', key, note }
}

export function isPlaceholder(value: unknown): value is Placeholder {
  return (
    typeof value === 'object' && value !== null && 'kind' in value && value.kind === 'placeholder'
  )
}
