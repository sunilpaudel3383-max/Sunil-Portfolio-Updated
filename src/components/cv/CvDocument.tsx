import { Fragment, type ReactNode } from 'react'
import { Github, Globe, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import {
  contactHref,
  type ContactType,
  type CvData,
  type EntryItem,
} from '../../cv/types'

const contactIcons: Record<ContactType, typeof Mail> = {
  linkedin: Linkedin,
  email: Mail,
  phone: Phone,
  location: MapPin,
  website: Globe,
  github: Github,
}

const filled = (value: string) => value.trim().length > 0

/** An entry is worth printing if it has a title, a meta line or any bullet. */
const entryHasContent = (entry: EntryItem) =>
  filled(entry.title) || filled(entry.meta) || entry.bullets.some(filled)

interface SectionProps {
  title: string
  children: ReactNode
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="cv-section">
      <h2 className="cv-section-title">{title}</h2>
      <hr className="cv-rule" />
      {children}
    </section>
  )
}

function Entries({ items }: { items: EntryItem[] }) {
  return (
    <>
      {items.filter(entryHasContent).map((entry) => {
        const bullets = entry.bullets.filter(filled)
        return (
          <div key={entry.id} className="cv-entry">
            {(filled(entry.title) || filled(entry.meta)) && (
              <div className="cv-entry-head">
                <span className="cv-entry-title">{entry.title}</span>
                {filled(entry.meta) && <span className="cv-entry-meta">{entry.meta}</span>}
              </div>
            )}
            {bullets.length > 0 && (
              <ul className={`cv-bullets${entry.twoColumns ? ' two-col' : ''}`}>
                {bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
    </>
  )
}

interface CvDocumentProps {
  data: CvData
  /** Draw dashed page-break guides. Only used in the on-screen preview. */
  showPageGuides?: boolean
}

/**
 * Renders the CV itself. Kept free of any editing UI so the exact same markup
 * can be used for the live preview and for the printed sheet.
 */
export default function CvDocument({ data, showPageGuides = false }: CvDocumentProps) {
  const contacts = data.contacts.filter((c) => filled(c.text))
  const education = data.education.filter(
    (e) => filled(e.period) || filled(e.degree) || filled(e.institution),
  )
  const experience = data.experience.filter(entryHasContent)
  const projects = data.projects.filter(entryHasContent)
  const nonAcademic = data.nonAcademic.filter(entryHasContent)
  const publications = data.publications.filter((p) => filled(p.title) || filled(p.detail))
  const technical = data.skillsTechnical.filter(filled)
  const interpersonal = data.skillsInterpersonal.filter(filled)
  const languages = data.languages.filter(filled)
  const references = data.references.filter((r) => filled(r.name) || filled(r.detail))
  const hasSkills = technical.length > 0 || interpersonal.length > 0 || languages.length > 0

  return (
    <div className="cv-doc">
      <div className={`cv-paper${showPageGuides ? ' cv-pages' : ''}`}>
        <h1 className="cv-name">{data.name || 'Your Name'}</h1>

        {contacts.length > 0 && (
          <div className="cv-contact">
            {contacts.map((item, i) => {
              const Icon = contactIcons[item.type]
              const href = contactHref(item)
              const body = (
                <>
                  <Icon strokeWidth={2} />
                  <span>{item.text}</span>
                </>
              )
              return (
                <Fragment key={item.id}>
                  {i > 0 && <span className="cv-contact-sep">|</span>}
                  {href ? (
                    <a className="cv-contact-item" href={href}>
                      {body}
                    </a>
                  ) : (
                    <span className="cv-contact-item">{body}</span>
                  )}
                </Fragment>
              )
            })}
          </div>
        )}

        {filled(data.summary) && (
          <Section title={data.labels.summary}>
            <p className="cv-summary">{data.summary}</p>
          </Section>
        )}

        {education.length > 0 && (
          <Section title={data.labels.education}>
            {education.map((item) => (
              <div key={item.id} className="cv-edu-row">
                <span className="cv-edu-period">{item.period}</span>
                <span>
                  {item.degree}
                  {filled(item.degree) && filled(item.institution) && ` ${item.joiner.trim()} `}
                  <span className="cv-edu-inst">{item.institution}</span>
                  {filled(item.detail) && (
                    <>
                      <br />({item.detail})
                    </>
                  )}
                </span>
              </div>
            ))}
          </Section>
        )}

        {experience.length > 0 && (
          <Section title={data.labels.experience}>
            <Entries items={experience} />
          </Section>
        )}

        {projects.length > 0 && (
          <Section title={data.labels.projects}>
            <Entries items={projects} />
          </Section>
        )}

        {nonAcademic.length > 0 && (
          <Section title={data.labels.nonAcademic}>
            <Entries items={nonAcademic} />
          </Section>
        )}

        {publications.length > 0 && (
          <Section title={data.labels.publications}>
            <ol className="cv-pubs">
              {publications.map((item) => (
                <li key={item.id}>
                  <span className="cv-pub-title">{item.title}</span>
                  {filled(item.title) && filled(item.detail) && ' '}
                  {item.detail}
                </li>
              ))}
            </ol>
          </Section>
        )}

        {hasSkills && (
          <section className="cv-section">
            <div className="cv-skills-head">
              <h2 className="cv-section-title">{data.labels.skills}</h2>
              {languages.length > 0 && (
                <h2 className="cv-section-title">{data.labels.languages}</h2>
              )}
            </div>
            <div className="cv-skills-body">
              <div>
                {technical.length > 0 && (
                  <>
                    <p className="cv-skills-sub">Technical</p>
                    <ul className="cv-skill-list">
                      {technical.map((skill, i) => (
                        <li key={i}>{skill}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              <div>
                {interpersonal.length > 0 && (
                  <>
                    <p className="cv-skills-sub">Interpersonal</p>
                    <ul className="cv-skill-list">
                      {interpersonal.map((skill, i) => (
                        <li key={i}>{skill}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              <ul className="cv-skill-list">
                {languages.map((language, i) => (
                  <li key={i}>{language}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {references.length > 0 && (
          <Section title={data.labels.references}>
            {references.map((item) => (
              <p key={item.id} className="cv-ref">
                <span className="cv-ref-name">{item.name}</span>
                {filled(item.name) && filled(item.detail) && ', '}
                {item.detail}
              </p>
            ))}
          </Section>
        )}
      </div>
    </div>
  )
}
