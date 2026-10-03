import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

// TEMPORARY (Phase 1.2 acceptance): token swatch. Replaced by the real page in Phase 2.
const colours = [
  ['paper', 'bg-paper'],
  ['ink', 'bg-ink'],
  ['muted', 'bg-muted'],
  ['bronze', 'bg-bronze'],
  ['bronze-deep', 'bg-bronze-deep'],
  ['gilt', 'bg-gilt'],
  ['myrtle', 'bg-myrtle'],
  ['gilt-light', 'bg-gilt-light'],
  ['muted-on-dark', 'bg-muted-on-dark'],
  ['error', 'bg-error'],
  ['error-on-dark', 'bg-error-on-dark'],
  ['rule', 'bg-rule'],
] as const

const sizes = [
  'text-sm',
  'text-ui',
  'text-base',
  'text-body',
  'text-lg',
  'text-xl',
  'text-2xl',
  'text-3xl',
  'text-4xl',
  'text-5xl',
] as const

function Home() {
  return (
    <main className="mx-auto max-w-content px-5 py-16">
      <h1 className="mb-8 font-display text-3xl text-bronze">Token swatch</h1>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {colours.map(([name, cls]) => (
          <li key={name}>
            <div className={`h-16 border border-rule ${cls}`} />
            <p className="mt-1 text-ui text-muted">{name}</p>
          </li>
        ))}
      </ul>
      <div className="mt-12 space-y-2">
        {sizes.map((s) => (
          <p key={s} className={`font-display ${s}`}>
            {s} — In flow, flourish, becoming more.
          </p>
        ))}
      </div>
    </main>
  )
}
