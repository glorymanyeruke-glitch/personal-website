# Launch blockers

Everything here must be supplied by Gloria (or decided by you) before launch. Nothing on
this list may be filled in with invented content — reference.md §1, §3.6, §14.

Placeholders in `src/content/site.ts` render visibly as `[PLACEHOLDER: …]`. A test
(`src/content/__tests__/placeholders.test.ts`) fails if a placeholder key is missing below.

## Content placeholders (keys from `src/content/site.ts`)

| Key | What's needed | Spec |
| --- | --- | --- |
| `brand-name` | Is the site primarily "Dr. Gloria Manyeruke" or "Golden Chimera Counselling Centre"? Sets the nav wordmark and page title. | §14.1 |
| `education-years` | Years and institutions for her psychology degrees and PhD. | Phase 0 |
| `training-years` | Years of her specialist CBT and Positive Psychotherapy training. | Phase 0 |
| `beck-status` | Is "Candidate Beck Certified Clinician" still current? | Phase 0 |
| `faq-first-session` | FAQ answer: what happens in the first session. | §14.11 |
| `faq-confidentiality` | FAQ answer: confidentiality and its limits. | §14.11 |
| `faq-location` | FAQ answer: in-person location (city/address) and online platform. | §14.2, §14.11 |
| `faq-session-count` | FAQ answer: typical number of sessions. | §14.11 |
| `faq-fees` | Session length, fees, and whether a free initial call is offered. | §14.3 |
| `emergency-numbers` | Emergency numbers appropriate for her clients' regions. | §14.6 |
| `reply-time` | Typical reply time for enquiries (shown after a form submission). | §14.7 |
| `privacy-notice` | Privacy notice content and record-retention policy. Legal text from Gloria only. | §8.3, §14.8 |

## Assets

- **Professional portrait**, ≥ 1600px on the long edge (§14.10). The current file is a 900×1600 phone selfie; after the 4:5 crop it's 900×1125, so the largest responsive size is 900px wide.
- **Vector (or transparent PNG) logo emblem** (§14.10). The current logo is a JPEG with an off-white background, so the nav emblem, favicon and footer lockup are raster crops shown with `mix-blend-mode: multiply`.

## Decisions and accounts

- Languages she works in; Turkish version later? (§14.4)
- Professional registration/licensing body and number to display (§14.5)
- Domain name, sender address on that domain, and which inbox receives form messages (§14.9)
- Auto-acknowledgement email to enquirers: yes or no (§14.12, default no)
- Long-term owner of the Netlify, Resend, Upstash and Cloudflare accounts (§14.13)
- If the FAQ answers aren't ready at launch, hide the FAQ section rather than ship placeholders.
