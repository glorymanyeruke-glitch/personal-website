// @ts-check
import js from '@eslint/js'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

const viteEnvRule = {
  selector:
    "MemberExpression[object.type='MemberExpression'][object.property.name='env'][object.object.type='MetaProperty'][property.name=/^VITE_/][property.name!='VITE_TURNSTILE_SITE_KEY']",
  message: 'Only VITE_TURNSTILE_SITE_KEY may be exposed to the browser (reference.md §8.1).',
}

const noHardcodedCopy = [
  {
    selector: 'JSXText[value=/[A-Za-z]/]',
    message: 'Put copy in src/content/site.ts and read it from there.',
  },
  {
    selector:
      'JSXAttribute[name.name=/^(alt|aria-label|title|placeholder)$/] > Literal[value=/[A-Za-z]/]',
    message: 'Put copy in src/content/site.ts and read it from there.',
  },
]

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      '.output/**',
      '.netlify/**',
      '.tanstack/**',
      'coverage/**',
      'docs/**',
      '.agents/**',
      '.claude/**',
      'src/routeTree.gen.ts',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
  },
  reactHooks.configs.flat['recommended-latest'],
  jsxA11y.flatConfigs.recommended,

  // ── Project rules (reference.md §6, §8.1, §11) ──
  {
    rules: {
      // Logging goes through src/lib/log.server.ts only (metadata, never PII).
      'no-console': 'error',
      // Secrets are read only in *.server.ts files (overridden below).
      'no-restricted-properties': [
        'error',
        {
          object: 'process',
          property: 'env',
          message: 'Read env only in *.server.ts via src/lib/env.server.ts (reference.md §8.1).',
        },
      ],
      // Vite inlines every VITE_* value into the browser bundle. Only the Turnstile
      // site key is allowed to be public.
      'no-restricted-syntax': ['error', viteEnvRule],
    },
  },
  // All copy lives in src/content/site.ts (reference.md §6, task 2.1).
  {
    files: ['src/components/**/*.tsx', 'src/routes/**/*.tsx', 'src/features/**/*.tsx'],
    rules: { 'no-restricted-syntax': ['error', viteEnvRule, ...noHardcodedCopy] },
  },
  {
    files: ['**/*.server.ts'],
    rules: { 'no-restricted-properties': 'off' },
  },
  {
    files: ['src/lib/log.server.ts'],
    rules: { 'no-console': 'off' },
  },
  {
    files: ['**/*.js', '**/*.mjs', 'scripts/**'],
    extends: [tseslint.configs.disableTypeChecked],
    // Node globals declared inline instead of adding the `globals` package.
    languageOptions: { globals: { URL: 'readonly', console: 'readonly', process: 'readonly' } },
    rules: { 'no-console': 'off', 'no-restricted-properties': 'off' },
  },
)
