import { contactSection } from '~/content/site'
import { lazy, Suspense } from 'react'

// The form pulls in TanStack Form and the Turnstile loader, so it ships as its own chunk (§9 JS budget).
const ContactForm = lazy(() =>
  import('~/features/contact/contact-form').then((m) => ({ default: m.ContactForm })),
)

/**
 * The one full-bleed colour band (§3.3). The form is the only channel shown: the email
 * address + Copy block and the emergency block were removed (client decision 2026-10-12).
 */
export function Contact() {
  const s = contactSection
  return (
    <section
      id={s.id}
      aria-labelledby={`${s.id}-heading`}
      className="on-dark bg-myrtle py-16 text-paper lg:py-24"
    >
      <div className="mx-auto grid max-w-content gap-14 px-5 md:px-8 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-5">
          <h2
            id={`${s.id}-heading`}
            className="mb-7 font-display text-2xl font-medium text-paper lg:text-3xl"
          >
            {s.heading}
          </h2>
          <p className="-mt-2 mb-8 max-w-[30rem] text-muted-on-dark">{s.intro}</p>
        </div>

        <div id={s.formId} className="lg:col-span-6 lg:col-start-7">
          <p className="mb-7 rounded-input border border-paper/24 px-4 py-3.5 text-ui text-muted-on-dark">
            {s.formNote}
          </p>
          <Suspense fallback={<div className="min-h-[40rem]" />}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
