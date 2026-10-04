import { contact, contactSection } from '~/content/site'
import { ContactForm } from '~/features/contact/contact-form'
import { ContentText } from '../ui/content-text'
import { CopyButton } from '../ui/copy-button'

const EMAIL_ID = 'contact-email-address'

/**
 * The one full-bleed colour band (§3.3). Channels (§7.1): the form, and the email address
 * with Copy (no mailto: — it fails silently for webmail users).
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

          <div className="border-y border-paper/16">
            <div className="py-5">
              <p className="mb-2 text-ui text-muted-on-dark">{s.email.label}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                <span id={EMAIL_ID} className="break-all text-paper select-all">
                  {contact.email}
                </span>
                <CopyButton
                  targetId={EMAIL_ID}
                  text={contact.email}
                  labels={{
                    copy: s.email.copy,
                    copied: s.email.copied,
                    announceCopied: s.email.announceCopied,
                    announceSelected: s.email.announceSelected,
                  }}
                />
              </div>
            </div>
          </div>

          <p className="mt-8 max-w-[30rem] border-l border-gilt-light pl-4 text-ui text-muted-on-dark">
            <strong className="font-medium text-paper">{s.emergency.lead}</strong>{' '}
            {s.emergency.body} <ContentText value={s.emergency.numbers} onDark />
          </p>
        </div>

        <div id={s.formId} className="lg:col-span-6 lg:col-start-7">
          <p className="mb-7 rounded-input border border-paper/24 px-4 py-3.5 text-ui text-muted-on-dark">
            {s.formNote}
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
