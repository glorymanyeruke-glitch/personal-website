# reference.md — Dr. Gloria Manyeruke / Golden Chimera Counselling Centre

> Single source of truth for building the site. If something here conflicts with a habit or a default, this file wins. If something is missing, **ask — do not invent**.

---

## 0. How to use this file

| Section | What it governs |
| --- | --- |
| 1. Project brief | What we're building and for whom |
| 2. Content source | What the legacy `index.html` is (and isn't) |
| 3. Design system | Colour, type, layout, anti-slop rules |
| 4. Motion system | Every animation, with values — governed by Emil Kowalski's skills |
| 5. Tech stack | Exact libraries and why |
| 6. Architecture | Folder structure, routes, separation of concerns |
| 7. Contact feature | Form + one server function (Zod, Turnstile, Resend) |
| 8. Security & privacy | Headers, secrets, data handling for a therapy practice |
| 9. Performance, SEO, a11y | Budgets and requirements |
| 10. Testing | Vitest for contact logic + manual QA checklist |
| 11. Observability | Logging and monitoring |
| 12. Deployment & DNS | Netlify hosting, Cloudflare DNS checklist |
| 13. Phased task breakdown | Ordered tasks with acceptance criteria |
| 14. Open questions | Things only Gloria can answer |
| 15. Definition of done | Final gate |

---

## 1. Project brief

- **Client:** Dr. Gloria Manyeruke, PhD — psychotherapist. Practice brand: **Golden Chimera Counselling Centre**. Tagline (from the logo): *"In flow, flourish, becoming more."*
- **Audience:** Adults considering therapy — often anxious, hesitant, reading on a phone, possibly late at night. Also referrers and peers checking credentials. Clients come from African, European and Middle Eastern backgrounds.
- **Primary job of the site:** Help a hesitant person feel safe enough to **make first contact** (WhatsApp, email, or the contact form).
- **Secondary job:** Establish credibility (PhD, CBT training, Beck candidacy, experience since 2017).
- **Tone:** Calm, warm, plain-spoken, professional. Never salesy. No hype words ("transform your life", "unlock", "journey" overuse).
- **Non-goals:** No blog, no booking engine, no payments, no CMS, no client portal (v1).

---

## 2. Content source — the legacy `index.html`

The provided `index.html` is a **content and structure reference only**. Do **not** port its styling.

**Keep:** All factual copy — bio, years, training, research interests, contact details (WhatsApp `+90 533 858 0094`, email `drgloriapsy@gmail.com`). The old `mailto:` links are replaced by the contact form plus a visible email address with a Copy button (§7.1).

**Discard (these are the exact patterns that make it read as AI-generated):**

| Legacy pattern | Why it goes | Replacement |
| --- | --- | --- |
| Cream bg + Playfair Display + terracotta accent | The single most common AI-generated palette | Palette derived from her actual logo (§3.1) |
| Uppercase tracked eyebrow above every heading | Template chrome | Headings stand alone; one quiet label only where it adds information |
| `01 / 02 / 03` on the approach cards | Numbering implies sequence; these three are principles, not steps | Prose columns, no numbers |
| Three identical rounded cards with the same shadow | "SaaS card kit" | Typographic layout, rules, whitespace |
| Emoji in buttons (💬 ✉) | Unprofessional on a clinical site | Proper SVG icons (WhatsApp mark from `simple-icons`, mail from `lucide-react`) |
| "Space to heal. Room to grow." | Generic; could be any therapist | Her own tagline as the hero line (§3.4) |
| Logo `src="golden-chimera-logo.png"` (file is `logo.jpeg`) | Broken reference; full logo has tiny text unreadable at 42px | Cropped emblem mark for nav/favicon, full lockup only in footer/contact |

---

## 3. Design system

### 3.1 Colour — derived from the logo (gold, bronze, ivory, botanical)

Contrast ratios verified against `--paper`.

| Token | Hex | Role | Contrast on paper |
| --- | --- | --- | --- |
| `--paper` | `#FAF6EC` | Page background (logo's ivory) | — |
| `--ink` | `#2A231B` | Body text (warm umber, not tinted #111) | 14.4 : 1 |
| `--muted` | `#6B6152` | Secondary text | 5.6 : 1 |
| `--bronze` | `#7A4A12` | Headings, links, primary button fill (logo's "Counselling Centre" bronze) | 6.9 : 1 |
| `--gilt` | `#B8862B` | **Decorative only**: hairlines, the arc, focus ring, small marks. Never body text. | 3.0 : 1 (large/graphic only) |
| `--myrtle` | `#2F4236` | One deep counterweight band (contact section) | ivory on it: 10 : 1 |
| `--gilt-light` | `#E2B865` | Accent text on myrtle only; focus ring on myrtle | 5.8 : 1 on myrtle |
| `--muted-on-dark` | `#D9D2C0` | Secondary text on myrtle | 7.1 : 1 on myrtle |
| `--error` | `#8E2A1C` | Error text on paper | 7.8 : 1 |
| `--error-on-dark` | `#F4B4A2` | Error text on myrtle | 6.1 : 1 on myrtle |
| `--bronze-deep` | `#5F3A0E` | Primary button hover only | — |

Focus ring: `--bronze` on paper, `--gilt-light` on myrtle (`--gilt` is only 3.001 : 1, no margin). Input borders use `--muted`.

Rules:
- Gold is jewellery, not paint. If more than ~5% of a viewport is gold, remove some.
- **No gradients** as decoration. No terracotta. No drop shadows on cards. One soft shadow allowed: the portrait.
- Dark mode: **not in v1** (the brand is ivory/gold; a half-done dark mode is worse than none). Revisit if Gloria asks.

### 3.2 Typography

| Role | Family | Notes |
| --- | --- | --- |
| Display / headings | **Newsreader** (variable, `opsz` axis, true italic) | Italic echoes the logo's tagline. Use optical size 72 for display, 16–24 for small heads. |
| Body / UI | **Inter** (variable, `opsz` axis) | Chosen by the client (2026-10-03). Highly legible on small screens. |

- **Self-host via Fontsource** (`@fontsource-variable/newsreader`, `@fontsource-variable/inter`). Do not use the Google Fonts CDN (performance + EU GDPR rulings on IP leakage to Google).
- Preload only the two files used above the fold (Newsreader italic for the hero tagline, Inter roman). `font-display: swap`. Use `size-adjust` fallback metrics (via `fontaine` or manual) to prevent CLS.
- Type scale (1.25 ratio, rem): 0.8 / 1 / 1.25 / 1.563 / 1.953 / 2.441 / 3.052 / 3.815 (display uses `clamp()` between 2.441 and 3.815).
- Body: 1.0625rem (17px), line-height 1.65. Measure **≤ 68ch**.
- Sentence case everywhere. **No all-caps labels.** No single-word colour/italic accents inside headlines.
- Numerals: `font-variant-numeric: oldstyle-nums` in Newsreader text (Inter has no oldstyle figures), `lining-nums tabular-nums` in the phone number.

### 3.3 Layout

- Max content width 72rem; prose column 40rem. 12-column grid on ≥1024px, 4-column on mobile.
- **Left-aligned** throughout. Only exception: the footer lockup.
- Section rhythm is set by spacing and thin `--gilt` hairlines (1px, 30% opacity), not by alternating background colours. Exactly **one** full-bleed colour band: the myrtle contact section.
- Radii: portrait 4px (crisp, editorial — not a pillowy 32px). Buttons fully rounded (pill). Inputs 6px. Nothing else rounded.

### 3.4 Page structure (single page + `/privacy` + 404)

```
┌───────────────────────────────────────────────┐
│ [emblem] Dr. Gloria Manyeruke  About Approach Questions [Contact] │  sticky, 64px
├───────────────────────────────────────────────┤
│ HERO                                          │
│  In flow,                    ┌──────────┐     │
│  flourish,                   │ portrait │ ◜ gilt arc
│  becoming more.              │          │     │
│                              └──────────┘     │
│  h1: Dr. Gloria Manyeruke / Psychotherapist   │
│  1–2 sentence intro                           │
│  [Message on WhatsApp]  [Send a message]      │
├───────────────────────────────────────────────┤
│ ABOUT — bio prose (left) + pull quote (right)  │
├───────────────────────────────────────────────┤
│ HOW I WORK — 3 principles as prose columns     │
│ (Integrative / Evidence-informed / Culturally │
│  responsive) — NO numbers, NO cards            │
├───────────────────────────────────────────────┤
│ WHAT I CAN HELP WITH — plain-language list    │
├───────────────────────────────────────────────┤
│ EDUCATION & EXPERIENCE — vertical timeline     │
│ (this IS a sequence → timeline is justified)  │
├───────────────────────────────────────────────┤
│ RESEARCH INTERESTS — compact, 3 short entries  │
├───────────────────────────────────────────────┤
│ QUESTIONS — accordion FAQ (content from §14)   │
├───────────────────────────────────────────────┤
│ CONTACT (myrtle band)                          │
│  Left: WhatsApp, email + Copy, crisis note     │
│  Right: contact form                           │
├───────────────────────────────────────────────┤
│ FOOTER — full logo lockup, © , Privacy         │
└───────────────────────────────────────────────┘
```

Mobile: hero stacks portrait **below** the headline (headline is the LCP-adjacent message; portrait follows). Nav collapses to a menu button opening a bottom sheet.

### 3.5 The one memorable thing

Spend boldness in exactly one place: **the hero**. The tagline set large in Newsreader, with a thin gilt arc (the circle from her logo) drawing itself around the portrait on first load. Everything below the hero is quiet and disciplined.

### 3.6 Copy rules

- Write from the client's side: "Message on WhatsApp", not "Connect". Button labels describe exactly what happens.
- Keep Gloria's own sentences where possible; tighten, never embellish. **Never invent credentials, statistics, testimonials, client counts or outcomes.** (Testimonials are also discouraged by most psychotherapy ethics codes.)
- Diagnoses list → plain language ("Anxiety and worry", "Low mood and depression", "Trauma and PTSD", "Bipolar disorder", "Schizophrenia", "Borderline personality disorder", "Relationships and life transitions").
- Error messages: say what happened and how to fix it. Never apologise, never vague.

---

## 4. Motion system

**Governing source:** Emil Kowalski's skills (`npx skills add emilkowalski/skill`). Every animation must pass the `animate` skill's build sequence and the `review-animations` skill's ten standards. When this table and the skill disagree on a value, **the skill wins**; update this table.

### 4.1 Tokens (Tailwind v4 `@theme`)

```css
@theme {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);       /* entering/exiting */
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);   /* on-screen movement */
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);    /* sheets */
  --duration-press: 160ms;
  --duration-small: 200ms;
  --duration-sheet: 320ms;
  --duration-swap: 240ms;   /* form → success */
  --duration-hero: 700ms;   /* hero lines, portrait */
  --duration-arc: 1200ms;   /* gilt arc */
}
```

Never introduce a second curve set. Never use `ease-in` on UI. Never `transition: all`. Never `scale(0)`.

### 4.2 Animation inventory (exhaustive — anything not listed does not animate)

| # | Where | Purpose | Frequency | Tool | Spec |
| --- | --- | --- | --- | --- | --- |
| 1 | Hero headline, 3 lines | Explanation / first impression (delight budget) | Once per visit | **CSS animation** (runs during hydration, off main thread) | Each line: `opacity 0→1`, `translateY(8px)→0`, `filter blur(4px)→0`, 700ms `--ease-out`, stagger 80ms |
| 2 | Gilt arc around portrait | Brand moment | Once per visit | CSS `stroke-dashoffset` on inline SVG | 1200ms `--ease-in-out`, starts 200ms after line 1 |
| 3 | Portrait | Preventing jarring pop-in | Once | CSS | `clip-path: inset(8% 8% 8% 8%) → inset(0)` only (no opacity), 700ms `--ease-out`, started on image `load`; skipped if already cached |
| 4 | Buttons / links that act | Feedback | Tens/visit | CSS transition | `:active { transform: scale(0.97) }`, `--duration-press` `--ease-out`. Hover colour change only, `ease`, gated to hover-capable pointers (Tailwind v4 `hover:` already gates this — do not override) |
| 5 | Mobile menu sheet | Spatial consistency | Occasional | Base UI **Drawer** (swipe to dismiss) + CSS transitions | Enter `translateY(100%)→0` `--duration-sheet` `--ease-drawer`; exit the same edge; backdrop opacity 200ms |
| 6 | FAQ accordion | State indication | Occasional | Base UI Accordion | Height + opacity, 200ms `--ease-out` (height tolerated for accordions only) |
| 7 | Contact submit button | State indication | Rare | CSS transitions (stacked labels) | Label crossfade idle → "Sending…" → "Sent": opacity + `blur(2px)`, 160ms; fixed `min-width`, no width animation |
| 8 | Form → success panel | Preventing jarring change | Rare | CSS transitions (grid stack) | Form exits `opacity→0, scale(0.98)`, panel enters `scale(0.98)→1, opacity`, 240ms `--ease-out` |
| 9 | Nav border on scroll | State indication | Once per scroll | CSS + IntersectionObserver sentinel | Hairline opacity 0→1 when scrolled > 8px, 200ms `--ease-out` |
| 10 | Email Copy button | Feedback | Rare | CSS transition | Label crossfade "Copy" → "Copied" (opacity + `blur(2px)`), 160ms `--ease-out`; reverts after 2s |
| 11 | "Send a message" → form | Spatial consistency | Occasional | CSS `scroll-behavior` | Smooth scroll only under `no-preference`, then focus first field with `preventScroll` |

Hero items 1–3 play on the first full document load only, not on client-side navigation back to `/`.

**Explicitly NOT animated:** section fade-up-on-scroll (generic AI tell), card hovers, cursor followers, parallax, marquee, number counters, nav link hovers beyond colour, keyboard focus movement, anchor jumps for reduced-motion users.

### 4.3 Motion library rules

> **Superseded 2026-10-03:** `motion` is not used. Kept for reference if Motion is reintroduced.

- Use the `motion` package, import from `motion/react`. Wrap the app in `<LazyMotion features={domAnimation} strict>` and use `m.*` components to keep the bundle small.
- In Motion, animate with the full `transform` string, not `x`/`y`/`scale` shorthands (per skill).
- Only items 7–8 use Motion. Everything else (including item 10) is CSS. Cheapest tool that works.

### 4.4 Reduced motion (ships with each animation, not after)

```css
@media (prefers-reduced-motion: reduce) {
  /* keep opacity, drop movement and blur */
}
```
`scroll-behavior: smooth` only inside `@media (prefers-reduced-motion: no-preference)`.

---

## 5. Tech stack

Verify current versions with `npm view <pkg> version` at setup and **pin exact versions** in `package.json`. Package manager: **pnpm** (commit `pnpm-lock.yaml`; set `packageManager` in `package.json`).

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | **TanStack Start** (`@tanstack/react-start`) + TanStack Router | File routes, prerendered pages for speed/SEO, and **one server function** for the contact form |
| Language | TypeScript 6.0.x (`typescript-eslint` doesn't support 7 yet), `strict: true`, `noUncheckedIndexedAccess: true` | |
| Build | Vite | Comes with Start |
| Styling | **Tailwind CSS v4** via `@tailwindcss/vite`, CSS-first `@theme` | Tokens in §3–4 live in `src/styles/app.css` |
| Class utilities | `clsx` (ad hoc), `cva` (Button variants only) | Per `pick-ui-library` |
| UI primitives | **Base UI** (`@base-ui/react`, renamed from `@base-ui-components/react`) — Drawer (mobile menu), Accordion (FAQ) | Accessible focus/dismiss handling; never hand-roll |
| Animation | CSS only (`motion` dropped 2026-10-03: items 7–8 are CSS transitions; saves ~20 KB) | |
| Validation | **Zod** | One schema shared by the form and the server function |
| Form state | **TanStack Form** | Field-level validation with the Zod schema |
| Email delivery | **Resend** (`resend` SDK) — called **only** from the server function | |
| Spam | **Cloudflare Turnstile** (works on any host) + honeypot + minimum fill time | |
| Rate limiting | **Upstash Redis** + `@upstash/ratelimit` (free tier) | Hosting is Netlify, so no platform-native limiter |
| Icons | `lucide-react`, `simple-icons` (WhatsApp mark only) | |
| Fonts | Fontsource variable packages | §3.2 |
| Images | `vite-imagetools` → AVIF + WebP, responsive `srcset` | |
| Tests | **Vitest** + MSW (contact logic only) | §10. No Playwright — manual QA covers the UI |
| Lint/format | ESLint 9 (jsx-a11y doesn't support 10) (typescript-eslint, jsx-a11y), Prettier + `prettier-plugin-tailwindcss` | |
| Hosting | **Netlify** (official TanStack Start partner, free tier allows commercial use) | §12 |
| DNS | Cloudflare (domain stays there; DNS only, no proxy) | §12 |

Deliberately **not** used: databases, Playwright, Sentry, pino, analytics cookies. Add only if a real need appears.

---

## 6. Architecture

```
.
├── reference.md                 ← this file
├── LAUNCH_BLOCKERS.md           ← unfilled placeholders (§14)
├── .env.example                 ← names only, no values
├── netlify.toml                 ← build command, publish dir, headers (§8)
├── src/
│   ├── routes/
│   │   ├── __root.tsx           ← <html lang="en">, head defaults, fonts, skip link
│   │   ├── index.tsx            ← composes sections only; no logic
│   │   ├── privacy.tsx          ← privacy notice (content from Gloria)
│   │   └── $.tsx                ← 404
│   ├── components/
│   │   ├── ui/                  ← Button (cva), Input, Textarea, Field, CopyButton, Icon — presentational
│   │   ├── layout/              ← SiteHeader, MobileMenu, SiteFooter
│   │   └── sections/            ← Hero, About, Approach, HelpWith, Experience, Research, Faq, Contact
│   ├── features/contact/
│   │   ├── schema.ts            ← Zod schema (shared client/server) — no secrets, safe for browser
│   │   ├── contact.server.ts    ← createServerFn handler (server only)
│   │   ├── send-email.server.ts ← Resend call + email template (plain text + escaped HTML)
│   │   ├── spam.server.ts       ← Turnstile verify, honeypot, timing, Upstash rate limit
│   │   ├── ContactForm.tsx      ← TanStack Form UI + Turnstile widget
│   │   └── __tests__/
│   ├── content/
│   │   └── site.ts              ← ALL copy + contact details as typed constants (one place to edit)
│   ├── lib/
│   │   ├── env.server.ts        ← Zod-validated server env; throws a clear error if anything is missing
│   │   ├── log.server.ts        ← tiny structured JSON logger (console) — metadata only, never PII
│   │   └── seo.ts               ← meta/OG/JSON-LD helpers
│   ├── assets/                  ← portrait source, emblem SVG, logo lockup
│   └── styles/app.css           ← Tailwind import, @theme tokens, base layer
└── public/                      ← favicon set, og.jpg, robots.txt
```

Separation rules:
- `components/sections/*` read from `content/site.ts`; they never hardcode copy.
- **Secrets are only read in `*.server.ts` files**, and only through `env.server.ts` (`process.env`, never `import.meta.env`). Client code must never import a `*.server.ts` file.
- `ui/` components have no business logic and no data fetching.
- Pages are **prerendered** at build time; the contact server function is the only code that runs on request.

---

## 7. Contact feature — full spec

### 7.1 Channels (in priority order on the page)

1. **WhatsApp** — `https://wa.me/905338580094?text=<urlencoded prefill>` with prefill "Hello Dr. Manyeruke, I'd like to ask about psychotherapy sessions." (no personal data in the URL).
2. **Contact form** — replaces the old `mailto:` link, which fails silently for people who use webmail without a mail app configured. The hero's second button is "Send a message" and scrolls to the form (moving focus to the first field).
3. **Email address shown as text** with a **Copy** button (for people who prefer their own inbox). No `mailto:` link. The button label changes to "Copied" for 2s, announced via a polite live region. Uses `navigator.clipboard.writeText`; if unavailable, select the text so the user can copy manually.

### 7.2 Form fields

| Field | Type | Validation | Notes |
| --- | --- | --- | --- |
| `name` | text | 1–80 chars, trimmed | `autocomplete="name"` |
| `email` | email | valid email, ≤ 254 | `autocomplete="email"`, required |
| `phone` | tel | optional, ≤ 20, digits/spaces/`+()-` only | `autocomplete="tel"` |
| `preferredContact` | radio | `email` \| `whatsapp` \| `phone` | default `email`; if `whatsapp`/`phone`, phone becomes required |
| `sessionType` | radio | `online` \| `in-person` \| `not-sure` | |
| `message` | textarea | 10–1000 chars | Helper text: "A short note is enough. Please don't include detailed health information here — we can talk about that privately." Live character count. |
| `consent` | checkbox | must be true | "I agree to my details being used to reply to this enquiry, as described in the [privacy notice]." |
| `company` | hidden honeypot | must be empty | Visually hidden, `tabindex=-1`, `autocomplete="off"`, `aria-hidden` |
| `startedAt` | hidden | server treats < 3s elapsed as a bot | |
| `turnstileToken` | widget | verified server-side | Site key from `VITE_TURNSTILE_SITE_KEY` (the only public env var) |

Persistent note above the form (not dismissible): *"This form is not monitored for emergencies. If you or someone else is in immediate danger, contact your local emergency services."* (Local numbers: see §14.)

### 7.3 Server function flow

```
browser submit
  → client-side Zod validation (instant field errors)
  → createServerFn({ method: 'POST' }).inputValidator(contactSchema)   ← runs as a Netlify Function
      1. honeypot filled OR elapsed < 3s  → return { ok: true } silently (don't tip off bots)
      2. rate limit: Upstash sliding window, 5 requests / hour per SHA-256(IP + RATE_LIMIT_SALT)
         IP from Netlify's `x-nf-client-connection-ip` header.
         Upstash unreachable → allow the request and log `contact.ratelimit_unavailable`
         (fail open: Turnstile still protects; never block a real client because Redis is down)
      3. verify Turnstile token: POST to https://challenges.cloudflare.com/turnstile/v0/siteverify
         with TURNSTILE_SECRET_KEY (+ remoteip). Fail or timeout (5s) → error result
      4. build email: plain text + HTML, every user value HTML-escaped;
         Reply-To = validated sender email; strip CR/LF from every header-bound value
      5. send via Resend with a 10s timeout, 1 retry on 5xx/network error
      6. log metadata only (requestId, outcome, latencyMs) — NEVER name/email/phone/message
      7. return discriminated union: { ok: true } | { ok: false, code, message, requestId }
```

Error codes: `VALIDATION`, `RATE_LIMITED`, `VERIFICATION_FAILED`, `SEND_FAILED`. Messages shown to the user say what happened and what to do (e.g. "Your message couldn't be sent. Please try again, or message Gloria on WhatsApp.").

- Messages are **not stored** anywhere. The email in Gloria's inbox is the record.
- Optional (ask Gloria): auto-acknowledgement email to the sender. Default **off** (avoids sending therapy-related email to an address that may be shared).

### 7.4 UX states

`idle → validating → submitting → success | error`. Errors appear inline under fields (`aria-describedby`, `aria-invalid`); focus moves to the first invalid field. Server errors render in a polite live region above the button with a recovery action ("Try again" or "Message on WhatsApp instead"). The submit button is disabled while submitting (prevents double sends). Success replaces the form with: "Thank you, your message has been sent. Gloria usually replies within [PLACEHOLDER: reply time]." plus the WhatsApp link. Turnstile resets after any failed attempt.

---

## 8. Security & privacy

This is a mental-health practice. Treat every enquiry as sensitive.

### 8.1 Secrets — the rules

| Variable | Where it's read | Public? |
| --- | --- | --- |
| `VITE_TURNSTILE_SITE_KEY` | browser (Turnstile widget) | **Yes — designed to be public** |
| `TURNSTILE_SECRET_KEY` | `spam.server.ts` | No |
| `RESEND_API_KEY` | `send-email.server.ts` | No |
| `CONTACT_TO_EMAIL` | `send-email.server.ts` | No |
| `CONTACT_FROM_EMAIL` | `send-email.server.ts` (must be on her verified domain) | No |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | `spam.server.ts` | No |
| `RATE_LIMIT_SALT` | `spam.server.ts` | No |

- **Only** `VITE_TURNSTILE_SITE_KEY` may carry the `VITE_` prefix. Vite inlines every `VITE_*` value into the browser bundle.
- Secrets are read with `process.env` inside `*.server.ts` only, validated by Zod in `env.server.ts`.
- Local development: `.env` (gitignored). Production: Netlify dashboard → Environment variables, marked as **secret**, scoped to Functions. `.env.example` lists names only.
- **Post-deploy leak check:** on the live site, search DevTools → Sources for `re_` (Resend key prefix) and the Upstash token prefix; submit the form and confirm the Network tab only shows the request to your own server function. Any hit = launch blocker.

### 8.2 Headers (in `netlify.toml` `[[headers]]` for `/*`)

- `Content-Security-Policy`: `default-src 'self'`; `script-src 'self' https://challenges.cloudflare.com`; `frame-src https://challenges.cloudflare.com`; `connect-src 'self'`; `img-src 'self' data:`; `style-src 'self' 'unsafe-inline'` (only if Tailwind/Motion inline styles require it — try without first); `font-src 'self'`; `frame-ancestors 'none'`; `base-uri 'self'`; `form-action 'self'`.
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- Immutable caching for hashed assets (`/assets/*`: `Cache-Control: public, max-age=31536000, immutable`).

### 8.3 Data handling

- Zod on both sides; length caps everywhere; HTML-escape before templating; strip CR/LF from header values.
- No analytics cookies. If analytics are wanted later, use a cookieless tool (Plausible or Netlify Analytics) so no consent banner is needed.
- IPs are hashed with a salt for rate limiting and expire with the rate-limit window; never logged raw.
- **Data law:** clients may be covered by GDPR (EU) and KVKK (Turkey). The privacy notice must state: who the controller is, what's collected, purpose (reply only), processors (Netlify, Resend, Cloudflare Turnstile, Upstash), retention, rights, contact. **Content from Gloria — do not write legal text; draft a placeholder clearly marked DRAFT.**
- `pnpm audit` before each release; Dependabot or Renovate weekly.

---

## 9. Performance, SEO, accessibility

**Budgets (checked manually in Chrome DevTools Lighthouse, mobile preset):** LCP < 2.0s, CLS < 0.05, INP < 200ms, total JS < 120 KB gzip on the home route, Performance ≥ 95, Accessibility = 100, SEO = 100, Best Practices = 100.

- Portrait: AVIF/WebP, `srcset` 480/768/1080/1440, explicit `width`/`height`, `fetchpriority="high"` on mobile LCP candidate, `object-position` tuned to her face.
- Prerender all pages at build time; hashed static assets immutable-cached (§8.2). Load the Turnstile script only when the contact section nears the viewport, so it doesn't hurt LCP.
- **SEO:** route `head()` for title/description/canonical; Open Graph + Twitter card with a designed `og.jpg` (1200×630, emblem + name); JSON-LD (`Person` + `ProfessionalService`, with `sameAs` only for profiles Gloria confirms); `sitemap.xml`, `robots.txt`; `lang="en"`.
- **Accessibility (WCAG 2.2 AA):** skip link; one `h1`; landmark elements; visible focus (2px `--gilt` outline + 2px offset); hit targets ≥ 44px; form labels always visible (no placeholder-as-label); error text not colour-only; menu sheet traps focus and restores it; tested with keyboard only and VoiceOver/TalkBack.
- **Responsive:** test at 360, 390, 768, 1024, 1280, 1536. No horizontal scroll at 320.

---

## 10. Testing

Scope is deliberately small: automated tests only where there is real logic (the contact flow). Everything visual is checked by hand.

### 10.1 Automated (Vitest + MSW)

| Layer | Must cover |
| --- | --- |
| Unit — `schema.ts` | Valid input; each invalid branch; boundary lengths (0, 1, max, max+1); unicode names (e.g. "Nkéchi", "Gözde"); phone required when contact method is WhatsApp/phone; CR/LF and `<script>` strings |
| Unit — escaping/template | Every user value is escaped in HTML; header values have CR/LF stripped |
| Unit — spam | Honeypot filled → silent success; < 3s → silent success; rate-limit exceeded → `RATE_LIMITED`; Upstash error → request allowed |
| Integration — handler (MSW mocks Resend, Turnstile, Upstash) | Success path; Turnstile rejects; Turnstile timeout; Resend 5xx then success on retry; Resend timeout → `SEND_FAILED`; assert captured logs contain **no** name/email/phone/message |

Target: 90% line coverage on `features/contact/**`. Run with `pnpm test`.

### 10.2 Manual QA checklist (before every release)

- [ ] Lighthouse (Chrome DevTools, mobile preset) meets §9 budgets on `/` and `/privacy`.
- [ ] axe DevTools extension: zero issues on `/`, `/privacy`, 404, and the form showing errors.
- [ ] Keyboard only: skip link, nav, mobile menu (focus trapped and restored), FAQ, every form field, copy button, submit.
- [ ] Screen reader pass: VoiceOver (iPhone) and TalkBack (Android) on the form — labels, errors, success message announced.
- [ ] Real devices: an iPhone (Safari) and a mid-range Android (Chrome). Widths 320, 360, 390, 768, 1024, 1280, 1536 in DevTools.
- [ ] Reduced motion on (OS setting): hero appears without movement or blur; no smooth scrolling.
- [ ] Form: real submission arrives in Gloria's inbox with correct Reply-To; WhatsApp link opens with the prefill; copy button works on iOS Safari.
- [ ] Secret leak check from §8.1.

---

## 11. Observability (kept lightweight)

- `log.server.ts` writes one JSON line per event to `console` (visible in Netlify → Functions → Logs). Fields: `event`, `requestId`, `outcome`, `latencyMs`, `code`. **Never** any form field values.
- Events: `contact.sent`, `contact.rejected` (reason code), `contact.send_failed` (Resend status), `contact.rate_limited`, `contact.ratelimit_unavailable`.
- `requestId` is returned in error results so a failed submission reported by a visitor can be matched to a log line.
- Delivery problems: check the Resend dashboard (bounces, failures). Turn on Resend's email notifications for failures to **your** address.
- Uptime: a free monitor (e.g. UptimeRobot) on `/`, alerting you, not Gloria.

---

## 12. Deployment & DNS

### 12.1 Hosting — Netlify

- Use TanStack Start's Netlify deployment setup (follow the current TanStack Start "Hosting → Netlify" docs; verify the plugin/adapter name at setup time). Pages prerendered; the contact server function deploys as a Netlify Function automatically.
- `netlify.toml`: build command `pnpm build`, Node version pinned (24 LTS), headers from §8.2.
- Environments: deploy previews per branch/PR; production on `main`. Secrets set per environment in the Netlify dashboard. Deploy previews use Turnstile's **test keys** and Resend sending to **your** address, never Gloria's.
- Why not Vercel: its free Hobby plan is for non-commercial use, and this is a business site. (Confirm current terms if reconsidering.)

### 12.2 DNS on Cloudflare — launch checklist

The domain stays on Cloudflare. Cloudflare acts only as DNS here.

- [ ] Add the custom domain in Netlify first; it shows the exact records to create.
- [ ] Apex: Netlify's recommended record (A record to Netlify's load balancer IP, or CNAME flattening to the site's `*.netlify.app`). `www`: CNAME → `<site>.netlify.app`.
- [ ] **Proxy OFF (grey cloud) on both website records.** Orange-cloud proxying stacks two CDNs and can block Netlify's SSL certificate (redirect loops, certificate errors).
- [ ] Netlify issues the Let's Encrypt certificate; enable "Force HTTPS".
- [ ] Choose one canonical host (apex or `www`) and redirect the other in Netlify.
- [ ] Resend: add her domain in Resend, then create the SPF (TXT), DKIM (CNAMEs) and return-path records it shows. **DKIM CNAMEs must be grey cloud.**
- [ ] Add DMARC: `_dmarc` TXT `v=DMARC1; p=none; rua=mailto:<your-address>` to start; move to `p=quarantine` after a few clean weeks.
- [ ] Resend shows the domain as verified before the form goes live.
- [ ] Turnstile: add the production domain (and the `*.netlify.app` preview domain if using real keys there) to the Turnstile widget's allowed hostnames.

### 12.3 CI (GitHub Actions, optional but recommended)

`pnpm install --frozen-lockfile` → `pnpm typecheck` → `pnpm lint` → `pnpm test` → `pnpm build`. Netlify deploys on push; CI just blocks merging broken code.

---

## 13. Phased task breakdown

Each task ends with a check. Do not start a phase until the previous one passes. Stop for human review at every ⛔.

### Phase 0 — Plan (no code)
- 0.1 Read this file and the legacy `index.html`. List any contradictions or gaps.
- 0.2 Confirm current versions of every package in §5 (`npm view`), and the current TanStack Start → Netlify deployment method. Report anything deprecated or renamed.
- 0.3 Produce a short design plan restating §3 tokens and an ASCII wireframe for mobile and desktop hero. Self-review against the anti-slop table in §2; state anything changed and why.
- 0.4 Run Emil's `find-animation-opportunities` mentally against §3.4 and confirm or challenge §4.2.
- ⛔ **Wait for approval.**

### Phase 1 — Scaffold
- 1.1 Create TanStack Start app with pnpm, TypeScript strict. ✅ `pnpm dev` serves.
- 1.2 Tailwind v4 via Vite plugin; `app.css` with all tokens from §3.1, §3.2, §4.1. ✅ Token swatch renders.
- 1.3 Fontsource fonts, preload, fallback metrics. ✅ No layout shift on font swap.
- 1.4 ESLint, Prettier, Vitest; `typecheck`, `lint`, `test` scripts. ✅ All pass on the empty app.
- 1.5 `env.server.ts`, `log.server.ts`, `.env.example`. ✅ Server function fails with a clear message if env is missing.
- 1.6 Netlify site connected to the repo; `netlify.toml`; first deploy preview live. ✅ Preview URL loads.
- 1.7 Install Emil Kowalski's skills (`npx skills add emilkowalski/skill`). ✅ Skills present in the agent's skills directory.

### Phase 2 — Static content & layout (no animation yet)
- 2.1 `content/site.ts` with all copy from the legacy file, rewritten per §3.6. ✅ No copy hardcoded in components.
- 2.2 `ui/` primitives: Button (cva: primary, secondary, on-dark), Field, Input, Textarea, CopyButton, Icon.
- 2.3 SiteHeader + MobileMenu (Base UI Dialog), SiteFooter.
- 2.4 Sections in order: Hero, About, Approach, HelpWith, Experience, Research, Faq (Base UI Accordion), Contact (static layout: WhatsApp, email + copy, form fields without submission).
- 2.5 Emblem crop of logo for nav/favicon (SVG preferred; if raster, transparent PNG at 2×/3×). Favicon set + `og.jpg`.
- 2.6 Portrait pipeline with placeholder until the real image is dropped in `src/assets/portrait.jpg`.
- ✅ Manual QA items for layout, keyboard and axe (§10.2) pass on the deploy preview.
- ⛔ **Screenshot review (390px and 1280px).**

### Phase 3 — Contact feature (tests first)
- 3.1 Zod schema + unit tests.
- 3.2 Email template + escaping + tests; `send-email.server.ts` with timeout and retry.
- 3.3 Upstash database created; `spam.server.ts` (honeypot, timing, rate limit, Turnstile verify) + tests.
- 3.4 Server function wiring all of the above + MSW integration tests, including the no-PII log assertion.
- 3.5 ContactForm with TanStack Form, Turnstile widget, all UX states from §7.4 (motion deferred to Phase 4).
- 3.6 On a deploy preview with test keys: submit end-to-end, trigger each error path, confirm logs.
- ✅ `pnpm test` green; coverage target met; §8.1 leak check passes on the preview.

### Phase 4 — Motion
- 4.1 Implement §4.2 items one at a time using the `animate` skill.
- 4.2 Run `review-animations` on the diff. Fix every finding until the verdict is **Approve**.
- 4.3 Verify reduced-motion behaviour manually (OS setting on).
- 4.4 Check animations in slow motion (DevTools Animations panel at 10%) and on a real mid-range Android phone.
- ⛔ **Screen recording review.**

### Phase 5 — Hardening & launch
- 5.1 Headers + CSP in `netlify.toml`; verify with securityheaders.com and Mozilla Observatory (target A+). Confirm Turnstile still loads under the CSP.
- 5.2 SEO: meta, JSON-LD (validate with Google's Rich Results Test), sitemap, robots.
- 5.3 `/privacy` with Gloria's content; 404 page.
- 5.4 Resend domain verified; production secrets in Netlify; uptime monitor.
- 5.5 DNS checklist §12.2 completed; production deploy.
- 5.6 Full §10.2 manual QA on production, including a real form submission to Gloria's inbox.
- 5.7 Final pass against §15.

---

## 14. Open questions for Gloria (do NOT invent answers — use clearly marked placeholders)

1. Is the site primarily **"Dr. Gloria Manyeruke"** or **"Golden Chimera Counselling Centre"**? (Affects nav wordmark and `<title>`.)
2. In-person location (city/address) or online only? Which online platform?
3. Session length, fees, and whether a free initial call is offered.
4. Languages she works in. Should there be a Turkish version later?
5. Professional registration/licensing body and number to display.
6. Emergency numbers appropriate for her clients' regions.
7. Typical reply time for enquiries.
8. Privacy notice content and record-retention policy.
9. Domain name (on Cloudflare). Sender address on that domain (e.g. `hello@<domain>`), and which inbox receives form messages (`drgloriapsy@gmail.com`?).
10. High-resolution portrait (≥ 1600px on the long edge) and, ideally, a vector version of the logo emblem.
11. FAQ answers: What happens in the first session? Is it confidential (and its limits)? Online vs in person? How many sessions?
12. Auto-acknowledgement email to enquirers: yes or no?
13. Who owns the Netlify, Resend, Upstash and Cloudflare accounts long-term (you or Gloria)? Ideally Gloria owns them and you're added as a collaborator.

---

## 15. Definition of done

- [ ] Every item in §13 checked off.
- [ ] No pattern from the §2 discard table is present.
- [ ] Every animation is listed in §4.2 and the `review-animations` verdict is Approve.
- [ ] Lighthouse budgets met on mobile; axe zero issues; keyboard-only and screen-reader passes done (§10.2).
- [ ] `pnpm test` green with coverage target met.
- [ ] Contact form tested in production with a real email to Gloria; spam protections and rate limit confirmed.
- [ ] Secret leak check (§8.1) passes on production; headers grade A+.
- [ ] DNS checklist (§12.2) complete: website records grey-cloud, HTTPS forced, Resend domain verified, DMARC in place.
- [ ] All §14 placeholders either filled by Gloria or listed in `LAUNCH_BLOCKERS.md`.

---

## 16. Decision log

| Date | Decision |
| --- | --- |
| 2026-10-03 | Phase 0 approved in full: Base UI renamed package; TypeScript 6.0.3 and ESLint 9.39.5 pins; Node 24; `motion` dropped (CSS for items 7–8); Base UI Drawer for the mobile menu; h1 = her name, tagline is a display `<p>`; hero-only tagline size `clamp(2.441rem, 5.5vw, 4.768rem)`; arc centred on the portrait (not her head), open at lower-left; focus ring per context; new colour/duration tokens; nav = About · Approach · Questions + Contact; JS budget counts initial JS, contact form lazy-loaded; install `find-animation-opportunities`. |
| 2026-10-03 | Body/UI font is **Inter** (client request), replacing Hanken Grotesk. Newsreader stays for display and headings. |
| 2026-10-03 | Visual prototype: `docs/prototype/index.html` (throwaway; uses Google Fonts for convenience only). |
| 2026-10-03 | **Open, not yet decided:** clip the hero portrait to a circle that sits inside the gilt arc, instead of the 4px-radius 4:5 rectangle. Feasible with `clip-path: circle()` (works with the item 3 reveal: `circle(44%) → circle(50%)`). Trade-offs to settle before building: it overrides §3.3 ("portrait 4px, nothing else rounded"); a round headshot inside a gold ring is closer to a template avatar and the halo reading we avoided; the arc becomes a concentric ring with an even gap. Prototype both at the Phase 2 screenshot review. |
