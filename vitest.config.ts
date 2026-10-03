import { defineConfig } from 'vitest/config'

// Separate from vite.config.ts so tests don't boot the Start/Netlify plugins.
// Scope: contact logic only (reference.md §10.1).
export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    passWithNoTests: true,
    coverage: {
      provider: 'v8',
      include: ['src/features/contact/**/*.ts'],
      exclude: ['**/__tests__/**', '**/*.test.ts'],
      thresholds: { lines: 90 },
    },
  },
})
