import { ph, type Copy } from './placeholder'

/**
 * ALL site copy and contact details (reference.md §6). Components read from here and
 * never hardcode text. Source: Gloria's legacy page, tightened per §3.6 — nothing added.
 */

const whatsappNumber = '905338580094'
const whatsappPrefill = 'Hello Dr. Manyeruke, I’d like to ask about psychotherapy sessions.'

export const person = {
  name: 'Dr. Gloria Manyeruke',
  firstName: 'Gloria',
  role: 'Psychotherapist',
  practice: 'Golden Chimera Counselling Centre',
  /** From the logo. Rendered one line per entry. */
  tagline: ['In flow,', 'flourish,', 'becoming more.'],
  /** §14.1 — decides the nav wordmark and <title>. Defaulting to her name until answered. */
  brandDecision: ph(
    'brand-name',
    'Is the site primarily “Dr. Gloria Manyeruke” or “Golden Chimera Counselling Centre”?',
  ),
} as const

export const contact = {
  whatsapp: {
    display: '+90 533 858 0094',
    // No personal data in the URL — only a fixed, polite opener (§7.1).
    href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappPrefill)}`,
    plainHref: `https://wa.me/${whatsappNumber}`,
  },
  email: 'drgloriapsy@gmail.com',
} as const

export const seo = {
  title: 'Dr. Gloria Manyeruke — Psychotherapist',
  description:
    'Dr. Gloria Manyeruke offers integrative, evidence-informed and culturally responsive psychotherapy, face to face and online.',
} as const

export const ui = {
  skipLink: 'Skip to content',
  homeLabel: 'Dr. Gloria Manyeruke, home',
  mainNavLabel: 'Main',
  menu: { open: 'Menu', close: 'Close menu', title: 'Menu' },
  placeholderPrefix: 'PLACEHOLDER',
} as const

export const nav = {
  links: [
    { label: 'About', href: '#about' },
    { label: 'Approach', href: '#approach' },
    { label: 'Questions', href: '#questions' },
  ],
  cta: { label: 'Contact', href: '#contact' },
} as const

export const hero = {
  intro:
    'I offer integrative, evidence-informed psychotherapy with a culturally responsive approach, face to face and online.',
  whatsappCta: 'Message on WhatsApp',
  formCta: 'Send a message',
  portraitAlt: 'Dr. Gloria Manyeruke, smiling, wearing a dark blazer over a striped shirt',
} as const

export const about = {
  id: 'about',
  heading: 'About me',
  paragraphs: [
    'I have worked in counselling since 2017, beginning at the Near East Counselling Centre. Since 2020, I have provided psychotherapy to clients face to face and online.',
    'My approach is integrative. I work mainly with Cognitive Behavioral Therapy and Positive Transcultural Psychotherapy, and draw on other evidence-based interventions according to what each person needs.',
    'I have worked with people from African, European and Middle Eastern cultural backgrounds, and I see cultural understanding as an important part of effective therapy.',
  ],
  quote: {
    text: '“Every person brings a unique story, context and set of strengths into therapy.”',
    attribution: 'Dr. Gloria Manyeruke', // confirmed as Gloria's own words (2026-10-03)
  },
} as const

export const approach = {
  id: 'approach',
  heading: 'How I work',
  lede: 'Structured psychological methods, with attention to the whole person and their cultural context.',
  // Principles, not steps — deliberately unnumbered (§2).
  principles: [
    {
      title: 'Integrative',
      body: 'Different therapeutic perspectives and interventions can be combined to respond to each person’s needs and goals.',
    },
    {
      title: 'Evidence-informed',
      body: 'I value approaches supported by research, and keep developing my knowledge through professional education and specialist training.',
    },
    {
      title: 'Culturally responsive',
      body: 'Culture, identity, relationships and life context matter. I aim to offer a space that is respectful, collaborative and culturally aware.',
    },
  ],
} as const

export const helpWith = {
  id: 'help',
  heading: 'What I can help with',
  items: [
    'Anxiety and worry',
    'Low mood and depression',
    'Trauma and PTSD',
    'Bipolar disorder',
    'Schizophrenia',
    'Borderline personality disorder',
    'Relationships and life transitions',
  ],
  note: 'You don’t need a diagnosis to start. I also work with people who are struggling with relationships, life circumstances, emotional wellbeing or personal concerns.',
} as const

interface ExperienceEntry {
  when: Copy
  whenNote?: Copy
  title: string
  body?: string
  bodyNote?: Copy
}

// Typed list (not `as const`) so optional fields stay optional for the component.
const experienceEntries: ExperienceEntry[] = [
  // Education supplied 2026-10-04. Ordered by start year.
  {
    when: '2010–2013',
    title: 'BSc (Hons) in Psychology',
    body: 'University of Zimbabwe',
  },
  {
    when: '2014–2016',
    title: 'MSc General Psychology',
    body: 'Near East University',
  },
  {
    when: '2016–2020',
    title: 'PhD Psychological Counselling and Guidance',
    body: 'Near East University',
  },
  {
    when: 'Since 2017',
    title: 'Counselling practice',
    body: 'Professional counselling work, beginning at the Near East Counselling Centre.',
  },
  {
    when: 'Since 2020',
    title: 'Psychotherapy, face to face and online',
    body: 'Providing psychotherapy to clients in person and through online sessions.',
  },
  {
    // Supplied 2026-10-04 ("Assist. Prof. 2023 (Near East University)"). No description given.
    when: 'Since 2023',
    title: 'Assistant Professor, Near East University',
  },
  {
    when: 'Professional development',
    title: 'Specialist training',
    // Beck candidacy confirmed current (2026-10-04).
    body: 'CBT for depression, anxiety, multiple traumas and personality disorders; basic training in Positive Transcultural Psychotherapy. Candidate Beck Certified Clinician.',
  },
]

export const experience = {
  id: 'experience',
  heading: 'Education and experience',
  entries: experienceEntries,
} as const

export const research = {
  id: 'research',
  heading: 'Research interests',
  entries: [
    {
      title: 'Migration psychology',
      body: 'Adaptation, identity, belonging and wellbeing during migration and cultural transition.',
    },
    {
      title: 'Positive psychology and wellbeing',
      body: 'Strengths, resilience and the factors that support psychological wellbeing.',
    },
    {
      title: 'Developmental psychology',
      body: 'How experiences across the lifespan shape wellbeing and adaptation.',
    },
  ],
} as const

export const faq = {
  id: 'questions',
  heading: 'Questions you might have',
  // Answers are Gloria's own words (supplied 2026-10-04), lightly tidied: spelling,
  // one missing word, a semicolon before “however”, en dashes in ranges. Nothing added.
  items: [
    {
      question: 'What happens in the first session?',
      answer:
        'The first session is mainly about getting to know you, your situation and your concerns. This includes the history of the problem and relevant family history. We also set goals that help us to measure progress. We want to identify what strengths and resources help you to function now and then we begin to strategize how to meet our goals.',
    },
    {
      question: 'Is what I say confidential?',
      answer:
        'Everything that we talk about is held in confidence. It cannot be shared with anyone without your permission.',
    },
    {
      question: 'Do you offer sessions online or in person?',
      answer: 'Sessions can be held in person or online.',
    },
    {
      question: 'How many sessions will I need?',
      answer:
        'We aim to complete treatment in 10–12 sessions; however, this may differ from person to person.',
    },
    {
      // Fees aren't answered yet, so the question asks only what the answer covers.
      question: 'How long are sessions?',
      answer: 'Sessions are typically between 45–60 minutes.',
    },
  ] satisfies { question: string; answer: Copy }[],
} as const

export const contactSection = {
  id: 'contact',
  formId: 'contact-form',
  heading: 'Getting in touch',
  intro:
    'If you’re considering therapy and would like to ask about working together, you’re welcome to get in touch. A short message is enough.',
  whatsapp: { label: 'Usually the quickest way', cta: 'Message on WhatsApp' },
  email: {
    label: 'Prefer your own inbox?',
    copy: 'Copy',
    copied: 'Copied',
    announceCopied: 'Email address copied.',
    announceSelected: 'Email address selected. Copy it with your device’s copy command.',
  },
  emergency: {
    lead: 'In an emergency,',
    body: 'please don’t wait for a reply: contact your local emergency services.',
    numbers: ph(
      'emergency-numbers',
      'Emergency numbers appropriate for her clients’ regions (§14.6).',
    ),
  },
  formNote:
    'This form is not monitored for emergencies. If you or someone else is in immediate danger, contact your local emergency services.',
  form: {
    name: { label: 'Name' },
    email: { label: 'Email' },
    phone: { label: 'Phone', optional: '(optional)' },
    preferredContact: {
      legend: 'How should Gloria reply?',
      options: [
        { value: 'email', label: 'Email' },
        { value: 'whatsapp', label: 'WhatsApp' },
        { value: 'phone', label: 'Phone call' },
      ],
    },
    sessionType: {
      legend: 'Type of session',
      options: [
        { value: 'online', label: 'Online' },
        { value: 'in-person', label: 'In person' },
        { value: 'not-sure', label: 'Not sure yet' },
      ],
    },
    message: {
      label: 'Message',
      helper:
        'A short note is enough. Please don’t include detailed health information here — we can talk about that privately.',
      maxLength: 1000,
    },
    consent: {
      before: 'I agree to my details being used to reply to this enquiry, as described in the',
      link: 'privacy notice',
      after: '.',
    },
    submit: 'Send message',
    turnstilePending: 'Spam check loads here',
  },
  success: {
    heading: 'Thank you, your message has been sent.',
    replyBefore: 'Gloria usually replies within',
    replyTime: ph('reply-time', 'Typical reply time for enquiries (§14.7).'),
    replyAfter: '. If it’s easier, you can also message her on WhatsApp.',
    cta: 'Message on WhatsApp',
  },
} as const

export const footer = {
  logoAlt: 'Golden Chimera Counselling Centre. In flow, flourish, becoming more.',
  copyright: `© ${String(new Date().getFullYear())} Golden Chimera Counselling Centre · Dr. Gloria Manyeruke, Psychotherapist`,
  privacy: { label: 'Privacy notice', href: '/privacy' },
} as const

export const notFound = {
  title: 'Page not found',
  heading: 'This page doesn’t exist',
  body: 'The link may be old, or the address may have a typo.',
  home: 'Go to the home page',
} as const

export const privacy = {
  title: 'Privacy notice',
  heading: 'Privacy notice',
  draft: ph(
    'privacy-notice',
    'Privacy notice content and retention policy from Gloria (§8.3, §14.8). Do not write legal text.',
  ),
} as const
