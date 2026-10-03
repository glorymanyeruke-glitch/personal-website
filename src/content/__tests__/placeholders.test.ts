import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { isPlaceholder, type Placeholder } from '../placeholder'
import * as site from '../site'

function collect(value: unknown, found: Placeholder[] = []): Placeholder[] {
  if (isPlaceholder(value)) found.push(value)
  else if (Array.isArray(value)) value.forEach((v) => collect(v, found))
  else if (typeof value === 'object' && value !== null)
    Object.values(value).forEach((v) => collect(v, found))
  return found
}

describe('content placeholders', () => {
  const blockers = readFileSync(new URL('../../../LAUNCH_BLOCKERS.md', import.meta.url), 'utf8')
  const placeholders = collect(site)

  it('finds the placeholders in site.ts', () => {
    expect(placeholders.length).toBeGreaterThan(0)
  })

  it.each(placeholders.map((p) => [p.key]))('lists %s in LAUNCH_BLOCKERS.md', (key) => {
    expect(blockers).toContain(`\`${key}\``)
  })
})
