/**
 * Data model for the "Create CV" builder.
 *
 * The shape mirrors the sections of the LaTeX CV template this site is based on:
 * header + contact line, Summary, Education, Work Experience, Projects,
 * Non-Academic Experience, Research and Publications, Skills / Languages and References.
 */

export const uid = () => Math.random().toString(36).slice(2, 9)

export type ContactType =
  | 'linkedin'
  | 'email'
  | 'phone'
  | 'location'
  | 'website'
  | 'github'

export interface ContactItem {
  id: string
  type: ContactType
  /** Visible text, e.g. "sunil.paudel3383@gmail.com" or "Sunil Paudel". */
  text: string
  /** Optional explicit link. Email/phone links are derived automatically when blank. */
  url: string
}

export interface EducationItem {
  id: string
  /** Left-hand date column, e.g. "2020 - 2024". */
  period: string
  /** Regular-weight lead-in, e.g. "Bachelor's in Civil Engineering". */
  degree: string
  /** Word joining degree and institution, e.g. "at" / "from". */
  joiner: string
  /** Rendered bold, e.g. "Institute of Engineering, Thapathali Campus". */
  institution: string
  /** Parenthesised second line, e.g. "75.89%". */
  detail: string
}

/**
 * Shared shape for Work Experience, Projects and Non-Academic Experience.
 * `title` sits bold on the left, `meta` is right-aligned on the same line
 * (a date range in most entries, an organisation in others).
 */
export interface EntryItem {
  id: string
  title: string
  meta: string
  bullets: string[]
  /** Render bullets in two columns, as the Impulse Consultants entry does. */
  twoColumns: boolean
}

export interface PublicationItem {
  id: string
  /** Rendered italic. */
  title: string
  /** Rendered upright after the title: journal, publisher, status, DOI. */
  detail: string
}

export interface ReferenceItem {
  id: string
  /** Rendered bold. */
  name: string
  detail: string
}

export interface SectionLabels {
  summary: string
  education: string
  experience: string
  projects: string
  nonAcademic: string
  publications: string
  skills: string
  languages: string
  references: string
}

export interface CvData {
  name: string
  contacts: ContactItem[]
  summary: string
  education: EducationItem[]
  experience: EntryItem[]
  projects: EntryItem[]
  nonAcademic: EntryItem[]
  publications: PublicationItem[]
  skillsTechnical: string[]
  skillsInterpersonal: string[]
  languages: string[]
  references: ReferenceItem[]
  labels: SectionLabels
}

export const defaultLabels: SectionLabels = {
  summary: 'Summary',
  education: 'Education',
  experience: 'Work Experience',
  projects: 'Projects',
  nonAcademic: 'Non-Academic Experience',
  publications: 'Research and Publications',
  skills: 'Skills',
  languages: 'Languages',
  references: 'References',
}

export const emptyEducation = (): EducationItem => ({
  id: uid(),
  period: '',
  degree: '',
  joiner: 'at',
  institution: '',
  detail: '',
})

export const emptyEntry = (): EntryItem => ({
  id: uid(),
  title: '',
  meta: '',
  bullets: [''],
  twoColumns: false,
})

export const emptyPublication = (): PublicationItem => ({
  id: uid(),
  title: '',
  detail: '',
})

export const emptyReference = (): ReferenceItem => ({
  id: uid(),
  name: '',
  detail: '',
})

export const emptyContact = (): ContactItem => ({
  id: uid(),
  type: 'email',
  text: '',
  url: '',
})

/** A blank CV with just enough scaffolding that the preview is not empty. */
export const emptyCv = (): CvData => ({
  name: '',
  contacts: [
    { id: uid(), type: 'linkedin', text: '', url: '' },
    { id: uid(), type: 'email', text: '', url: '' },
    { id: uid(), type: 'phone', text: '', url: '' },
    { id: uid(), type: 'location', text: '', url: '' },
  ],
  summary: '',
  education: [emptyEducation()],
  experience: [emptyEntry()],
  projects: [],
  nonAcademic: [],
  publications: [],
  skillsTechnical: [''],
  skillsInterpersonal: [''],
  languages: [''],
  references: [],
  labels: { ...defaultLabels },
})

/**
 * Resolve the href for a contact entry. Email and phone get mailto:/tel:
 * automatically so visitors only have to type the value once.
 */
export function contactHref(item: ContactItem): string | undefined {
  const url = item.url.trim()
  if (url) return url
  const text = item.text.trim()
  if (!text) return undefined
  if (item.type === 'email') return `mailto:${text}`
  if (item.type === 'phone') return `tel:${text.replace(/[^\d+]/g, '')}`
  return undefined
}
