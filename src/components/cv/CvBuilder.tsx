import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  ArrowLeft,
  Download,
  Eye,
  FileText,
  Info,
  Pencil,
  RotateCcw,
  Sparkles,
  X,
} from 'lucide-react'
import CvDocument from './CvDocument'
import {
  Accordion,
  AddButton,
  Field,
  ItemCard,
  StringList,
  TextAreaField,
  moveItem,
} from './FormControls'
import { sampleCv } from '../../cv/sample'
import {
  emptyContact,
  emptyCv,
  emptyEducation,
  emptyEntry,
  emptyPublication,
  emptyReference,
  type ContactType,
  type CvData,
  type EntryItem,
} from '../../cv/types'

const STORAGE_KEY = 'sp-cv-builder-v1'

/** A4 dimensions in CSS pixels at 96dpi, and the printable height per page. */
const A4_WIDTH_PX = (210 / 25.4) * 96
const PAGE_CONTENT_PX = (269 / 25.4) * 96
const PAPER_PADDING_PX = (28 / 25.4) * 96

const contactTypes: { value: ContactType; label: string }[] = [
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'location', label: 'Location' },
  { value: 'website', label: 'Website' },
  { value: 'github', label: 'GitHub' },
]

function loadSaved(): CvData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    // Merge over a blank CV so data saved by an older version stays usable.
    return { ...emptyCv(), ...(JSON.parse(raw) as CvData) }
  } catch {
    return null
  }
}

export default function CvBuilder() {
  const [data, setData] = useState<CvData>(() => loadSaved() ?? emptyCv())
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit')
  const [showTips, setShowTips] = useState(true)
  const [scale, setScale] = useState(1)
  const [paperHeight, setPaperHeight] = useState(1123)

  const frameRef = useRef<HTMLDivElement>(null)
  const paperRef = useRef<HTMLDivElement>(null)

  // Persist to the visitor's own browser only — nothing is sent anywhere.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      /* storage full or blocked — the builder still works for this session */
    }
  }, [data])

  // Name the print job so a saved PDF defaults to a sensible filename.
  useEffect(() => {
    const previous = document.title
    document.title = data.name.trim() ? `${data.name.trim()} - CV` : 'CV'
    return () => {
      document.title = previous
    }
  }, [data.name])

  // Scale the preview down to whatever width the column has available. A width of
  // zero means the column is hidden (mobile "Edit" tab), so the last good scale is
  // kept rather than collapsing the sheet to nothing.
  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    const measure = () => {
      const width = el.clientWidth
      if (width > 0) setScale(Math.min(1, width / A4_WIDTH_PX))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [mobileTab])

  useEffect(() => {
    const el = paperRef.current
    if (!el) return
    const measure = () => setPaperHeight(el.offsetHeight)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const pageCount = useMemo(
    () => Math.max(1, Math.ceil((paperHeight - PAPER_PADDING_PX) / PAGE_CONTENT_PX)),
    [paperHeight],
  )

  const update = <K extends keyof CvData>(key: K, value: CvData[K]) =>
    setData((prev) => ({ ...prev, [key]: value }))

  const handleReset = () => {
    if (window.confirm('Clear everything and start from a blank CV?')) {
      setData(emptyCv())
    }
  }

  const handleSample = () => {
    if (window.confirm("Replace the form with Sunil's CV as an example?")) {
      setData(sampleCv())
    }
  }

  /** Shared editor for Work Experience, Projects and Non-Academic Experience. */
  const entrySection = (
    key: 'experience' | 'projects' | 'nonAcademic',
    metaLabel: string,
    metaPlaceholder: string,
    titlePlaceholder: string,
    addLabel: string,
  ) => {
    const items = data[key]
    const setItems = (next: EntryItem[]) => update(key, next)

    return (
      <>
        {items.map((item, index) => (
          <ItemCard
            key={item.id}
            index={index}
            total={items.length}
            onMove={(from, to) => setItems(moveItem(items, from, to))}
            onRemove={() => setItems(items.filter((_, i) => i !== index))}
          >
            <Field
              label="Title"
              value={item.title}
              placeholder={titlePlaceholder}
              onChange={(value) =>
                setItems(items.map((it, i) => (i === index ? { ...it, title: value } : it)))
              }
            />
            <Field
              label={metaLabel}
              value={item.meta}
              placeholder={metaPlaceholder}
              onChange={(value) =>
                setItems(items.map((it, i) => (i === index ? { ...it, meta: value } : it)))
              }
            />
            <StringList
              label="Bullet points"
              items={item.bullets}
              multiline
              placeholder="Describe what you did…"
              addLabel="Add bullet"
              onChange={(bullets) =>
                setItems(items.map((it, i) => (i === index ? { ...it, bullets } : it)))
              }
            />
            <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={item.twoColumns}
                onChange={(e) =>
                  setItems(
                    items.map((it, i) =>
                      i === index ? { ...it, twoColumns: e.target.checked } : it,
                    ),
                  )
                }
                className="h-4 w-4 rounded border-slate-300 accent-sky-500"
              />
              Show these bullets in two columns (best for short lines)
            </label>
          </ItemCard>
        ))}
        <AddButton onClick={() => setItems([...items, emptyEntry()])} label={addLabel} />
      </>
    )
  }

  const preview = (
    <div className="lg:sticky lg:top-24">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-sky-600 dark:text-sky-400">
          <FileText size={14} />
          Live preview
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          A4 · {pageCount} page{pageCount > 1 ? 's' : ''}
        </span>
      </div>

      <div
        ref={frameRef}
        className="overflow-hidden rounded-xl bg-slate-200/60 p-2 dark:bg-black/40 lg:max-h-[calc(100vh-11rem)] lg:overflow-y-auto"
      >
        <div
          className="mx-auto shadow-xl"
          style={{ width: A4_WIDTH_PX * scale, height: paperHeight * scale }}
        >
          <div
            ref={paperRef}
            style={{
              width: A4_WIDTH_PX,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          >
            <CvDocument data={data} showPageGuides />
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-[11px] text-slate-400">
        Dashed lines show where each printed page ends.
      </p>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 pt-24 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 pb-20 md:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-8">
          <a
            href="#top"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
          >
            <ArrowLeft size={15} />
            Back to portfolio
          </a>
          <h1
            className="text-3xl font-normal text-slate-900 dark:text-white md:text-4xl lg:text-5xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            Create your CV
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
            Fill in your details and download a PDF built on the same template I use. Everything
            stays in your browser — nothing is uploaded or saved anywhere.
          </p>
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-gray-100"
          >
            <Download size={16} />
            Download PDF
          </button>
          <button
            type="button"
            onClick={handleSample}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-sky-500 hover:text-sky-600 dark:border-white/15 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:text-sky-400"
          >
            <Sparkles size={16} />
            Load example
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-rose-400 hover:text-rose-600 dark:border-white/15 dark:text-slate-200"
          >
            <RotateCcw size={16} />
            Start blank
          </button>
        </div>

        {showTips && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-sky-500/25 bg-sky-500/5 p-4 text-sm text-slate-700 dark:text-slate-200">
            <Info size={18} className="mt-0.5 flex-shrink-0 text-sky-500" />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-slate-900 dark:text-white">
                When the print dialog opens
              </p>
              <ul className="mt-1.5 space-y-1 text-[13px] text-slate-600 dark:text-slate-300">
                <li>
                  • Set <strong>Destination</strong> to <strong>Save as PDF</strong>
                </li>
                <li>
                  • Keep <strong>Margins</strong> on <strong>Default</strong> and scale at 100%
                </li>
                <li>
                  • Turn <strong>Headers and footers</strong> off so no URL or date is added
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => setShowTips(false)}
              aria-label="Dismiss tips"
              className="flex-shrink-0 rounded p-1 text-slate-400 transition-colors hover:bg-slate-200/60 hover:text-slate-600 dark:hover:bg-white/10"
            >
              <X size={15} />
            </button>
          </div>
        )}

        {/* Mobile tab switch */}
        <div className="mb-4 flex gap-2 lg:hidden">
          {(['edit', 'preview'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setMobileTab(tab)}
              className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                mobileTab === tab
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-black'
                  : 'border border-slate-300 text-slate-600 dark:border-white/15 dark:text-slate-300'
              }`}
            >
              {tab === 'edit' ? <Pencil size={15} /> : <Eye size={15} />}
              {tab === 'edit' ? 'Edit' : 'Preview'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* ---------------- Form ---------------- */}
          <div className={`space-y-3 ${mobileTab === 'edit' ? '' : 'hidden lg:block'}`}>
            <Accordion title="Header & contact" defaultOpen>
              <Field
                label="Full name"
                value={data.name}
                placeholder="Your Name"
                onChange={(value) => update('name', value)}
              />
              <div className="space-y-3">
                <span className="block text-xs font-medium text-slate-600 dark:text-slate-300">
                  Contact line
                </span>
                {data.contacts.map((contact, index) => (
                  <ItemCard
                    key={contact.id}
                    index={index}
                    total={data.contacts.length}
                    onMove={(from, to) => update('contacts', moveItem(data.contacts, from, to))}
                    onRemove={() =>
                      update(
                        'contacts',
                        data.contacts.filter((_, i) => i !== index),
                      )
                    }
                  >
                    <label className="block">
                      <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
                        Type
                      </span>
                      <select
                        value={contact.type}
                        onChange={(e) =>
                          update(
                            'contacts',
                            data.contacts.map((c, i) =>
                              i === index ? { ...c, type: e.target.value as ContactType } : c,
                            ),
                          )
                        }
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 dark:border-white/15 dark:bg-white/5 dark:text-white"
                      >
                        {contactTypes.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <Field
                      label="Text shown"
                      value={contact.text}
                      placeholder="you@example.com"
                      onChange={(value) =>
                        update(
                          'contacts',
                          data.contacts.map((c, i) => (i === index ? { ...c, text: value } : c)),
                        )
                      }
                    />
                    <Field
                      label="Link (optional)"
                      value={contact.url}
                      placeholder="https://…"
                      hint="Email and phone links are created automatically."
                      onChange={(value) =>
                        update(
                          'contacts',
                          data.contacts.map((c, i) => (i === index ? { ...c, url: value } : c)),
                        )
                      }
                    />
                  </ItemCard>
                ))}
                <AddButton
                  onClick={() => update('contacts', [...data.contacts, emptyContact()])}
                  label="Add contact item"
                />
              </div>
            </Accordion>

            <Accordion title="Summary" defaultOpen>
              <Field
                label="Section heading"
                value={data.labels.summary}
                onChange={(value) => update('labels', { ...data.labels, summary: value })}
              />
              <TextAreaField
                label="Summary"
                rows={6}
                value={data.summary}
                placeholder="A short paragraph about who you are and what you do…"
                onChange={(value) => update('summary', value)}
              />
            </Accordion>

            <Accordion title="Education" count={data.education.length}>
              <Field
                label="Section heading"
                value={data.labels.education}
                onChange={(value) => update('labels', { ...data.labels, education: value })}
              />
              {data.education.map((item, index) => (
                <ItemCard
                  key={item.id}
                  index={index}
                  total={data.education.length}
                  onMove={(from, to) => update('education', moveItem(data.education, from, to))}
                  onRemove={() =>
                    update(
                      'education',
                      data.education.filter((_, i) => i !== index),
                    )
                  }
                >
                  <Field
                    label="Years"
                    value={item.period}
                    placeholder="2020 - 2024"
                    onChange={(value) =>
                      update(
                        'education',
                        data.education.map((e, i) => (i === index ? { ...e, period: value } : e)),
                      )
                    }
                  />
                  <Field
                    label="Degree / qualification"
                    value={item.degree}
                    placeholder="Bachelor's in Civil Engineering"
                    onChange={(value) =>
                      update(
                        'education',
                        data.education.map((e, i) => (i === index ? { ...e, degree: value } : e)),
                      )
                    }
                  />
                  <Field
                    label="Joining word"
                    value={item.joiner}
                    placeholder="at"
                    hint='Sits between the degree and the school — usually "at" or "from".'
                    onChange={(value) =>
                      update(
                        'education',
                        data.education.map((e, i) => (i === index ? { ...e, joiner: value } : e)),
                      )
                    }
                  />
                  <Field
                    label="Institution"
                    value={item.institution}
                    placeholder="Institute of Engineering, Thapathali Campus"
                    onChange={(value) =>
                      update(
                        'education',
                        data.education.map((e, i) =>
                          i === index ? { ...e, institution: value } : e,
                        ),
                      )
                    }
                  />
                  <Field
                    label="Grade / result"
                    value={item.detail}
                    placeholder="75.89%"
                    onChange={(value) =>
                      update(
                        'education',
                        data.education.map((e, i) => (i === index ? { ...e, detail: value } : e)),
                      )
                    }
                  />
                </ItemCard>
              ))}
              <AddButton
                onClick={() => update('education', [...data.education, emptyEducation()])}
                label="Add education"
              />
            </Accordion>

            <Accordion title="Work experience" count={data.experience.length}>
              <Field
                label="Section heading"
                value={data.labels.experience}
                onChange={(value) => update('labels', { ...data.labels, experience: value })}
              />
              {entrySection(
                'experience',
                'Right-hand text',
                'May 2025 – July 2025',
                'Company Name - Your Role',
                'Add experience',
              )}
            </Accordion>

            <Accordion title="Projects" count={data.projects.length}>
              <Field
                label="Section heading"
                value={data.labels.projects}
                onChange={(value) => update('labels', { ...data.labels, projects: value })}
              />
              {entrySection(
                'projects',
                'Right-hand text',
                'Final Year Project',
                'Project title',
                'Add project',
              )}
            </Accordion>

            <Accordion title="Non-academic experience" count={data.nonAcademic.length}>
              <Field
                label="Section heading"
                value={data.labels.nonAcademic}
                onChange={(value) => update('labels', { ...data.labels, nonAcademic: value })}
              />
              {entrySection(
                'nonAcademic',
                'Right-hand text',
                '2024–2025',
                'Organisation – Your Role',
                'Add activity',
              )}
            </Accordion>

            <Accordion title="Research & publications" count={data.publications.length}>
              <Field
                label="Section heading"
                value={data.labels.publications}
                onChange={(value) => update('labels', { ...data.labels, publications: value })}
              />
              {data.publications.map((item, index) => (
                <ItemCard
                  key={item.id}
                  index={index}
                  total={data.publications.length}
                  onMove={(from, to) =>
                    update('publications', moveItem(data.publications, from, to))
                  }
                  onRemove={() =>
                    update(
                      'publications',
                      data.publications.filter((_, i) => i !== index),
                    )
                  }
                >
                  <TextAreaField
                    label="Title (shown in italics)"
                    rows={3}
                    value={item.title}
                    placeholder="Title of the paper or book"
                    onChange={(value) =>
                      update(
                        'publications',
                        data.publications.map((p, i) =>
                          i === index ? { ...p, title: value } : p,
                        ),
                      )
                    }
                  />
                  <TextAreaField
                    label="Journal / publisher / status"
                    rows={2}
                    value={item.detail}
                    placeholder="Journal name, volume, DOI or 'Under Review'"
                    onChange={(value) =>
                      update(
                        'publications',
                        data.publications.map((p, i) =>
                          i === index ? { ...p, detail: value } : p,
                        ),
                      )
                    }
                  />
                </ItemCard>
              ))}
              <AddButton
                onClick={() => update('publications', [...data.publications, emptyPublication()])}
                label="Add publication"
              />
            </Accordion>

            <Accordion title="Skills & languages">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field
                  label="Skills heading"
                  value={data.labels.skills}
                  onChange={(value) => update('labels', { ...data.labels, skills: value })}
                />
                <Field
                  label="Languages heading"
                  value={data.labels.languages}
                  onChange={(value) => update('labels', { ...data.labels, languages: value })}
                />
              </div>
              <StringList
                label="Technical skills"
                items={data.skillsTechnical}
                placeholder="AutoCAD"
                addLabel="Add technical skill"
                onChange={(items) => update('skillsTechnical', items)}
              />
              <StringList
                label="Interpersonal skills"
                items={data.skillsInterpersonal}
                placeholder="Teamwork"
                addLabel="Add interpersonal skill"
                onChange={(items) => update('skillsInterpersonal', items)}
              />
              <StringList
                label="Languages"
                items={data.languages}
                placeholder="English - Fluent"
                addLabel="Add language"
                onChange={(items) => update('languages', items)}
              />
            </Accordion>

            <Accordion title="References" count={data.references.length}>
              <Field
                label="Section heading"
                value={data.labels.references}
                onChange={(value) => update('labels', { ...data.labels, references: value })}
              />
              {data.references.map((item, index) => (
                <ItemCard
                  key={item.id}
                  index={index}
                  total={data.references.length}
                  onMove={(from, to) => update('references', moveItem(data.references, from, to))}
                  onRemove={() =>
                    update(
                      'references',
                      data.references.filter((_, i) => i !== index),
                    )
                  }
                >
                  <Field
                    label="Name (shown in bold)"
                    value={item.name}
                    placeholder="Dr. Jane Doe"
                    onChange={(value) =>
                      update(
                        'references',
                        data.references.map((r, i) => (i === index ? { ...r, name: value } : r)),
                      )
                    }
                  />
                  <TextAreaField
                    label="Position and contact"
                    rows={3}
                    value={item.detail}
                    placeholder="Assistant Professor, University, Email: …, Phone: …"
                    onChange={(value) =>
                      update(
                        'references',
                        data.references.map((r, i) => (i === index ? { ...r, detail: value } : r)),
                      )
                    }
                  />
                </ItemCard>
              ))}
              <AddButton
                onClick={() => update('references', [...data.references, emptyReference()])}
                label="Add reference"
              />
            </Accordion>
          </div>

          {/* ---------------- Preview ---------------- */}
          <div className={mobileTab === 'preview' ? '' : 'hidden lg:block'}>{preview}</div>
        </div>
      </div>

      {/*
        A second copy of the document lives at the end of <body>, outside the
        scaled preview. Printing hides the app and shows only this copy, so the
        sheet is never affected by the preview's CSS transform.
      */}
      {createPortal(
        <div className="cv-print-portal">
          <CvDocument data={data} />
        </div>,
        document.body,
      )}
    </div>
  )
}
