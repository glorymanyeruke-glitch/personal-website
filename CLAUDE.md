Read reference.md before any task; it is the spec and wins over defaults, except where CLAUDE.md or its §16 decision log says otherwise.
docs/legacy-index.html is content reference only — never edit or port its styling.
Secrets: only VITE_TURNSTILE_SITE_KEY may use the VITE_ prefix; read secrets only in *.server.ts.
Animations: use Emil Kowalski's skills; only animate what reference.md §4.2 lists.
Package manager: pnpm. Don't add dependencies without asking.
Testing: this site is small. Do NOT write tests, add test tooling (MSW, coverage targets) or build test-first. reference.md §10.1 and the testing steps in §13/§15 are superseded; verify with `pnpm typecheck`, `pnpm lint`, a production build and manual checks. Leave existing tests alone and don't extend them.
Scope: keep it simple. No overkill, no speculative abstractions. Upstash rate limiting is dropped (Turnstile + honeypot + min fill time are enough).
Deployment: the user deploys by hand from the Netlify dashboard. There is no netlify.toml; don't recreate it or run deploy commands. Headers go in public/_headers.
Architecture: plain static website, no backend. The only server code is the single contact serverless function that emails Gloria via Resend; don't add APIs, databases or other server code.
