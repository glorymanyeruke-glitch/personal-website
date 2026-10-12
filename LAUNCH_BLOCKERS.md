# Launch blockers

Everything here must be supplied by Gloria (or decided by you) before launch. Nothing on
this list may be filled in with invented content — reference.md §1, §3.6, §14.

Placeholders in `src/content/site.ts` render visibly as `[PLACEHOLDER: …]`. A test
(`src/content/__tests__/placeholders.test.ts`) fails if a placeholder key is missing below.

## Content placeholders (keys from `src/content/site.ts`)

| Key | What's needed | Spec |
| --- | --- | --- |
| `brand-name` | Is the site primarily "Dr. Gloria Manyeruke" or "Golden Chimera Counselling Centre"? Sets the nav wordmark and page title. | §14.1 |
| `reply-time` | Typical reply time for enquiries (shown after a form submission). | §14.7 |
| `privacy-notice` | Privacy notice content and record-retention policy. Legal text from Gloria only. | §8.3, §14.8 |

## Assets

- **Professional portrait**, ≥ 1600px on the long edge (§14.10). The current file is a 900×1600 phone selfie; after the 4:5 crop it's 900×1125, so the largest responsive size is 900px wide.
- **Vector (or transparent PNG) logo emblem** (§14.10). The current logo is a JPEG with an off-white background, so the nav emblem, favicon and footer lockup are raster crops shown with `mix-blend-mode: multiply`.

## Still open (not shown on the page)

- In-person location (city/address) and which online platform she uses (§14.2). The FAQ says only "in person or online".
- Fees, and whether a free initial call is offered (§14.3). The FAQ covers session length only.
- **Confidentiality wording — please check with Gloria.** Her answer says nothing is shared without permission. Most professional codes (and many jurisdictions) require therapists to state the *limits* of confidentiality up front — e.g. a serious risk of harm to the client or others, safeguarding of children, or a court order. If those limits apply to her, the answer should say so. Her wording is used as given until she decides.

## Decisions and accounts

- Languages she works in; Turkish version later? (§14.4)
- Professional registration/licensing body and number to display (§14.5)
- Domain name, sender address on that domain, and which inbox receives form messages (§14.9)
- Auto-acknowledgement email to enquirers: yes or no (§14.12, default no)
- Long-term owner of the Netlify, Resend and Cloudflare accounts (§14.13)

## SEO (set in code)

- `site-url` — the production domain, in `src/content/site-url.ts` (`SITE_URL`). Until it's set, canonical, Open Graph, JSON-LD, `sitemap.xml` and `robots.txt` all point at `https://example.invalid`. Set the canonical host (apex or `www`) to match the Netlify redirect (§12.2).
- `profile-links` — LinkedIn / professional-register URLs Gloria confirms, for `seo.profiles` in `src/content/site.ts` (JSON-LD `sameAs`). Leave empty rather than guess.
- Registration/licence number and in-person address are not in the structured data; add them once supplied (§14.2, §14.5).
