import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play, Maximize2, X, Award } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import ProtectedImage from './ProtectedImage'
import { certificatesData, Certificate } from '../data'

export default function Certifications() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [selectedImage, setSelectedImage] = useState<Certificate | null>(null)

  const items = certificatesData

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      nextSlide()
    }, 4000)
    return () => clearInterval(timer)
  }, [isPlaying, currentIndex])

  return (
    <Section
      id="certifications"
      label="Certifications"
      title="Professional Certificates & Credentials."
    >
      <Reveal>
        <div className="liquid-glass relative overflow-hidden rounded-2xl border border-slate-300/80 p-5 shadow-lg dark:border-white/15 md:p-6">
          {/* Top Control Bar */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-4 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                <Award size={18} />
              </span>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                  Certificate Gallery
                </span>
                <span className="ml-2 text-xs font-mono text-slate-400 dark:text-gray-500">
                  {currentIndex + 1} / {items.length} Total
                </span>
              </div>
            </div>

            {/* Animation Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                title={isPlaying ? 'Pause auto-slide' : 'Play auto-slide'}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300/80 bg-slate-100/80 text-slate-700 transition-colors hover:bg-slate-200 dark:border-white/15 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <button
                onClick={prevSlide}
                title="Previous certificate"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300/80 bg-slate-100/80 text-slate-700 transition-colors hover:bg-slate-200 dark:border-white/15 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextSlide}
                title="Next certificate"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300/80 bg-slate-100/80 text-slate-700 transition-colors hover:bg-slate-200 dark:border-white/15 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Compact Main Display Frame */}
          <div className="grid gap-6 md:grid-cols-12 md:items-center">
            {/* Photo Container */}
            <div className="relative overflow-hidden rounded-xl border border-slate-300/80 bg-slate-100 dark:border-white/15 dark:bg-slate-900 md:col-span-7 lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={items[currentIndex].id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="group relative aspect-[16/10] w-full overflow-hidden"
                >
                  <ProtectedImage
                    src={items[currentIndex].image}
                    alt={items[currentIndex].title}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <button
                    onClick={() => setSelectedImage(items[currentIndex])}
                    className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-opacity opacity-90 hover:bg-slate-900"
                  >
                    <Maximize2 size={13} /> View Full
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Caption Text Below / Beside Photo */}
            <div className="flex flex-col justify-center md:col-span-5 lg:col-span-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={items[currentIndex].id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-sky-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-sky-600 dark:text-sky-400">
                      {items[currentIndex].date}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-gray-400">
                      {items[currentIndex].issuer}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white md:text-xl">
                    {items[currentIndex].title}
                  </h3>

                  <p className="text-xs leading-relaxed text-slate-600 dark:text-gray-300 md:text-sm">
                    {items[currentIndex].caption}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Dots Indicator Navigation */}
          <div className="mt-5 flex items-center justify-center gap-1.5 border-t border-slate-200/80 pt-4 dark:border-white/10">
            {items.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'w-6 bg-sky-500 dark:bg-sky-400'
                    : 'w-2 bg-slate-300 hover:bg-slate-400 dark:bg-white/20 dark:hover:bg-white/40'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </Reveal>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl bg-slate-950 p-2 text-white shadow-2xl"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute right-4 top-4 z-20 rounded-full bg-slate-900/80 p-2 text-white backdrop-blur-md hover:bg-slate-800"
              >
                <X size={20} />
              </button>
              <ProtectedImage
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-[75vh] w-full rounded-xl object-contain"
              />
              <div className="p-4 text-center">
                <h4 className="text-base font-semibold">{selectedImage.title}</h4>
                <p className="mt-1 text-xs text-gray-300">{selectedImage.caption}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Section>
  )
}
