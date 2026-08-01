import { useState, ChangeEvent } from 'react'
import {
  GraduationCap,
  Users,
  Upload,
  FileText,
  X,
  Maximize2,
  Image as ImageIcon,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Section from './Section'
import Reveal from './Reveal'
import ProtectedImage from './ProtectedImage'
import { trainingsAndWorkshops } from '../data'

type UploadedFilesState = Record<string, { name: string; url?: string }>

export default function Trainings() {
  const [files, setFiles] = useState<UploadedFilesState>({})
  const [selectedCert, setSelectedCert] = useState<{ url: string; title: string } | null>(null)

  const handleFileChange = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile)
      setFiles((prev) => ({
        ...prev,
        [id]: { name: selectedFile.name, url: fileUrl },
      }))
    }
  }

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  return (
    <Section
      id="trainings"
      label="Trainings & Workshops"
      title="Capacity Building & Knowledge Sharing."
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        {/* Column 01: Attended */}
        <div className="space-y-6">
          <Reveal>
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                  <GraduationCap size={18} />
                </span>
                <h3 className="text-xl font-medium tracking-tight text-slate-900 dark:text-white">
                  Attended
                </h3>
              </div>
              <span className="rounded-full bg-slate-100 dark:bg-white/5 px-3 py-1 text-xs text-slate-600 dark:text-gray-400 border border-slate-200 dark:border-white/10">
                {trainingsAndWorkshops.attended.length} Records
              </span>
            </div>
          </Reveal>

          <div className="space-y-4">
            {trainingsAndWorkshops.attended.map((item, i) => {
              const uploaded = files[item.id]
              const certUrl = uploaded?.url || item.certificate
              const certName = uploaded?.name || item.certificateName || 'Certificate'

              return (
                <Reveal key={item.id} delay={i * 80}>
                  <div className="liquid-glass group relative rounded-2xl border border-slate-200/80 dark:border-white/15 p-5 md:p-6 transition-all hover:border-slate-300 dark:hover:border-white/35">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-base font-medium leading-snug text-slate-900 dark:text-white md:text-lg">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-sm text-slate-600 dark:text-gray-400">{item.org}</p>
                        {item.support && (
                          <p className="mt-0.5 text-xs text-slate-500 dark:text-gray-500">
                            {item.support}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Certificate Action / Preview Area (Only if certificate is present/enabled) */}
                    {(item.certificate || uploaded) && (
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 dark:border-white/10 pt-3">
                        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-gray-300">
                          <FileText size={14} className="text-sky-500 dark:text-sky-400" />
                          Certificate
                        </span>

                        <div className="flex items-center gap-2">
                          {certUrl ? (
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setSelectedCert({ url: certUrl, title: item.title })}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-sky-500/20 bg-sky-500/10 px-3 py-1.5 text-xs font-medium text-sky-700 dark:text-sky-300 transition-colors hover:bg-sky-500/20"
                                title="Inspect Certificate"
                              >
                                <ImageIcon size={13} />
                                <span className="max-w-[130px] truncate sm:max-w-[180px]">
                                  {certName}
                                </span>
                                <Maximize2 size={12} className="ml-0.5" />
                              </button>

                              <label className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-300/80 dark:border-white/20 bg-slate-100/80 dark:bg-white/5 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-gray-300 transition-colors hover:bg-slate-200 dark:hover:bg-white/10" title="Replace certificate image">
                                <Upload size={12} />
                                <input
                                  type="file"
                                  accept=".pdf,.jpg,.jpeg,.png,.webp"
                                  className="hidden"
                                  onChange={(e) => handleFileChange(item.id, e)}
                                />
                              </label>

                              {uploaded && (
                                <button
                                  type="button"
                                  onClick={() => removeFile(item.id)}
                                  className="rounded-lg p-1.5 text-slate-400 dark:text-gray-400 hover:bg-red-500/20 hover:text-red-500 transition-colors"
                                  title="Remove uploaded file"
                                >
                                  <X size={14} />
                                </button>
                              )}
                            </div>
                          ) : (
                            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-300/80 dark:border-white/20 bg-slate-100/80 dark:bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-gray-300 transition-colors hover:border-slate-400 dark:hover:border-white/40 hover:bg-slate-200 dark:hover:bg-white/10 dark:hover:text-white">
                              <Upload size={13} />
                              Upload Certificate
                              <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png,.webp"
                                className="hidden"
                                onChange={(e) => handleFileChange(item.id, e)}
                              />
                            </label>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>

        {/* Column 02: Conducted */}
        <div className="space-y-6">
          <Reveal delay={100}>
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                  <Users size={18} />
                </span>
                <h3 className="text-xl font-medium tracking-tight text-slate-900 dark:text-white">
                  Conducted
                </h3>
              </div>
              <span className="rounded-full bg-slate-100 dark:bg-white/5 px-3 py-1 text-xs text-slate-600 dark:text-gray-400 border border-slate-200 dark:border-white/10">
                {trainingsAndWorkshops.conducted.length} Sessions
              </span>
            </div>
          </Reveal>

          <div className="space-y-4">
            {trainingsAndWorkshops.conducted.map((item, i) => (
              <Reveal key={item.id} delay={i * 80 + 100}>
                <div className="liquid-glass group relative rounded-2xl border border-slate-200/80 dark:border-white/15 p-5 md:p-6 transition-all hover:border-slate-300 dark:hover:border-white/35">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-base font-medium leading-snug text-slate-900 dark:text-white md:text-lg">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-sm text-slate-600 dark:text-gray-400">{item.org}</p>
                      {item.note && (
                        <p className="mt-1.5 text-xs text-slate-500 dark:text-gray-400 italic">
                          {item.note}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center border-t border-slate-200/80 dark:border-white/10 pt-3">
                    <span className="inline-flex items-center rounded-full bg-sky-500/10 border border-sky-500/20 px-3 py-1 text-xs font-medium text-sky-700 dark:text-sky-300">
                      Role: {item.role}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 max-h-[92vh] max-w-4xl overflow-hidden rounded-2xl bg-slate-950 p-4 text-white shadow-2xl border border-white/20"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/15 mb-3">
                <h4 className="text-sm font-medium text-gray-200 pr-8">{selectedCert.title}</h4>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="rounded-full bg-white/10 p-1.5 text-white hover:bg-white/20 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="flex items-center justify-center max-h-[75vh] overflow-auto">
                <ProtectedImage
                  src={selectedCert.url}
                  alt={selectedCert.title}
                  className="max-h-[72vh] w-auto max-w-full rounded-xl object-contain shadow-md"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Section>
  )
}
