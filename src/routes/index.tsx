import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

// Composes sections only; no logic (reference.md §6). Sections arrive in task 2.4.
function Home() {
  return <main id="main" />
}
