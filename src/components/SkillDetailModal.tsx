import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Sparkles } from 'lucide-react'
import { TechnicalSkillDetail } from '../data'

interface SkillDetailModalProps {
  skill: TechnicalSkillDetail | null
  onClose: () => void
}

export default function SkillDetailModal({ skill, onClose }: SkillDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (skill) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [skill, onClose])

  if (!skill) return null

  // Gauge Circle calculation
  const radius = 48
  const strokeWidth = 10
  const circumference = 2 * Math.PI * radius
  const percent = Math.min(Math.max(skill.score / skill.maxScore, 0), 1)
  const strokeDashoffset = circumference - percent * circumference

  // Calculate star rating out of 5
  const starRating = Math.round((skill.score / skill.maxScore) * 5)

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay with blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Card - Rich dark theme background with vibrant blue/cyan glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
          className="relative z-10 w-full max-w-sm sm:max-w-md overflow-hidden rounded-3xl border border-sky-500/30 bg-gradient-to-b from-slate-900 via-[#0b1322] to-[#070d18] p-7 md:p-8 text-white shadow-[0_0_50px_-12px_rgba(56,189,248,0.25)]"
          onContextMenu={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          {/* Top subtle ambient blue background glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:bg-sky-500/20 hover:text-sky-400 transition-all"
          >
            <X size={16} />
          </button>

          {/* Header Row */}
          <div className="flex items-start justify-between pr-8">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold tracking-tight text-white">{skill.name}</h3>
                <Sparkles size={18} className="text-sky-400 fill-sky-400/30" />
              </div>
              <p className="mt-1 text-sm font-medium text-sky-200/80">{skill.category}</p>
            </div>
            <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-xs font-semibold text-sky-300 shadow-sm">
              {skill.level}
            </span>
          </div>

          {/* Center Circular Expertise Gauge */}
          <div className="my-7 flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">
              <svg width="140" height="140" className="rotate-[-90deg]">
                {/* Background Ring Track */}
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  stroke="#1e293b"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                {/* Active Cyan Arc */}
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  stroke="#38bdf8"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              </svg>

              {/* Inner Text Rating */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-white">
                  {skill.score}/{skill.maxScore}
                </span>
                <span className="text-[10px] font-bold tracking-widest text-sky-400 uppercase mt-0.5">
                  EXPERTISE
                </span>
              </div>
            </div>

            {/* Glowing Blue Stars Row */}
            <div className="mt-4 flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={
                    star <= starRating
                      ? 'fill-sky-400 text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]'
                      : 'text-slate-700'
                  }
                />
              ))}
            </div>
          </div>

          {/* Bottom Description */}
          <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
            <p className="text-sm leading-relaxed text-slate-300 font-normal">
              {skill.description}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
