import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ImageIcon,
} from 'lucide-react'
import Reveal from './Reveal'
import ProtectedImage from './ProtectedImage'
import { projects, ProjectItem, ProjectImage } from '../data'

function ProjectCardGallery({ images }: { images: ProjectImage[] }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [lightboxImg, setLightboxImg] = useState<ProjectImage | null>(null)

  // Auto-advance slideshow if there are multiple images and user is not hovering
  useEffect(() => {
    if (images.length <= 1 || isHovered) return
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [images.length, isHovered])

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIdx((prev) => (prev + 1) % images.length)
  }

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length)
  }

  const currentImage = images[currentIdx] || images[0]

  return (
    <>
      <div
        className="group/gallery relative flex h-[360px] min-h-[320px] w-full items-center justify-center overflow-hidden bg-slate-950 md:h-[480px] md:min-h-[440px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated Image Container with Blurred Ambient Background & Uncropped Foreground */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage.url}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="absolute inset-0 flex h-full w-full items-center justify-center"
          >
            {/* Soft Ambient Blurred Background Fill */}
            <ProtectedImage
              src={currentImage.url}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-30 blur-2xl scale-125 pointer-events-none"
            />

            {/* Subtle Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

            {/* 100% Fully Visible Uncropped Image */}
            <ProtectedImage
              src={currentImage.url}
              alt={currentImage.alt}
              className="relative z-0 h-full w-full object-contain p-4 pb-16 md:p-6 md:pb-20 drop-shadow-2xl"
            />
          </motion.div>
        </AnimatePresence>

        {/* Top Badges: Image Counter & Expand Button */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
          {images.length > 1 ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-mono font-medium text-white backdrop-blur-md">
              <ImageIcon size={13} /> {currentIdx + 1} / {images.length}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-mono font-medium text-white backdrop-blur-md">
              <ImageIcon size={13} /> Verified Asset
            </span>
          )}

          <button
            onClick={() => setLightboxImg(currentImage)}
            className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md transition-all hover:bg-black/90 hover:scale-105"
            title="Inspect high-res image"
          >
            <Maximize2 size={12} /> Expand
          </button>
        </div>

        {/* Left / Right Arrow Navigation Buttons (when >1 image) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImg}
              aria-label="Previous photo"
              className="absolute left-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-all opacity-80 hover:opacity-100 hover:bg-black/80 hover:scale-110 md:opacity-0 md:group-hover/gallery:opacity-100"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={nextImg}
              aria-label="Next photo"
              className="absolute right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition-all opacity-80 hover:opacity-100 hover:bg-black/80 hover:scale-110 md:opacity-0 md:group-hover/gallery:opacity-100"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Bottom Caption Bar */}
        <div className="absolute bottom-3 left-3 right-3 z-10 text-left">
          <div className="inline-flex max-w-full flex-col gap-2 rounded-xl border border-white/15 bg-slate-950/80 p-3 shadow-lg backdrop-blur-md md:px-4 md:py-2.5">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentImage.caption}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="text-xs font-medium text-gray-200 md:text-sm"
              >
                {currentImage.caption}
              </motion.p>
            </AnimatePresence>

            {/* Pagination Dot Strip */}
            {images.length > 1 && (
              <div className="flex items-center gap-1.5">
                {images.map((img, idx) => (
                  <button
                    key={img.url}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentIdx(idx)
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentIdx
                        ? 'w-6 bg-sky-400'
                        : 'w-1.5 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Go to photo ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImg(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 max-h-[92vh] max-w-5xl overflow-hidden rounded-2xl bg-slate-950 p-3 text-white shadow-2xl border border-white/20"
            >
              <button
                onClick={() => setLightboxImg(null)}
                className="absolute right-4 top-4 z-20 rounded-full bg-black/70 p-2 text-white backdrop-blur-md hover:bg-black/90"
              >
                <X size={20} />
              </button>
              <ProtectedImage
                src={lightboxImg.url}
                alt={lightboxImg.alt}
                className="max-h-[78vh] w-full rounded-xl object-contain"
              />
              <div className="p-4 text-center">
                <p className="text-sm font-medium text-gray-200">{lightboxImg.caption}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

function ProjectCard({
  project,
  index,
  total,
}: {
  project: ProjectItem
  index: number
  total: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // As a pinned card gets covered by the next, it recedes slightly.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.35])
  const isLast = index === total - 1

  return (
    <div
      ref={ref}
      className="sticky"
      style={{ top: `calc(6rem + ${index * 2.5}rem)` }}
    >
      <motion.div
        style={isLast ? undefined : { scale, opacity }}
        className="overflow-hidden rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-xl dark:border-white/15 dark:bg-[#0b0b0c] dark:text-white dark:shadow-2xl dark:shadow-black/50"
      >
        <div className="grid md:grid-cols-2">
          {/* Text Content */}
          <div className="flex flex-col justify-between p-8 md:p-10 lg:p-12">
            <div>
              <div className="mb-6 flex items-center justify-between">
                <span className="text-5xl font-light text-slate-300 dark:text-white/15 md:text-6xl">
                  0{index + 1}
                </span>
                <span className="rounded-full border border-slate-300 dark:border-white/15 px-3 py-1 text-xs uppercase tracking-[0.15em] text-slate-600 dark:text-gray-400">
                  {project.tag}
                </span>
              </div>
              <h3
                className="mb-5 text-2xl font-medium text-slate-900 dark:text-white md:text-3xl lg:text-4xl"
                style={{ letterSpacing: '-0.02em' }}
              >
                {project.title}
              </h3>
              <ul className="space-y-3">
                {project.points.map((pt) => (
                  <li
                    key={pt}
                    className="flex gap-3 text-sm text-slate-700 dark:text-gray-300 md:text-base"
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400 dark:bg-white/50" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 inline-flex items-center gap-2 text-sm text-slate-500 dark:text-gray-400">
              <ArrowUpRight size={16} /> Civil / Structural
            </div>
          </div>

          {/* Animated Image Gallery */}
          <ProjectCardGallery images={project.images} />
        </div>
      </motion.div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-24 md:px-12 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-sky-600 dark:text-gray-400">
            Projects
          </p>
          <h2
            className="mb-4 max-w-2xl text-3xl font-normal text-slate-900 dark:text-white md:text-4xl lg:text-5xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            Selected Engineering Work.
          </h2>
          <p className="mb-16 max-w-xl text-base text-slate-600 dark:text-gray-400">
            Scroll to explore — each project stacks over the last.
          </p>
        </Reveal>

        {/* Stacking cards */}
        <div className="space-y-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              total={projects.length}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
