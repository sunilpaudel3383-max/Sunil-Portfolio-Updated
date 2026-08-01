import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Reveal from './Reveal'
import { leadership } from '../data'

export default function Leadership() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })
  // The connecting line grows from top to bottom as you scroll through.
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="leadership" className="px-6 py-24 md:px-12 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-sky-600 dark:text-gray-400">
            Leadership & Activities
          </p>
          <h2
            className="mb-16 max-w-2xl text-3xl font-normal text-slate-900 dark:text-white md:text-4xl lg:text-5xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            Roles That Connect People And Ideas.
          </h2>
        </Reveal>

        <div ref={containerRef} className="relative">
          {/* Track + animated progress line */}
          <div className="absolute left-[11px] top-0 h-full w-px -translate-x-1/2 bg-slate-300 dark:bg-white/10 md:left-1/2" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[11px] top-0 h-full w-px -translate-x-1/2 origin-top bg-gradient-to-b from-sky-600 to-sky-400 dark:from-white dark:to-white/40 md:left-1/2"
          />

          <div className="space-y-10 md:space-y-2">
            {leadership.map((item, i) => {
              const isRight = i % 2 === 1
              return (
                <div
                  key={`${item.org}-${item.role}`}
                  className="relative md:grid md:grid-cols-2 md:items-center md:gap-12"
                >
                  {/* Node dot */}
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.4, ease: 'backOut' }}
                    className="absolute left-[11px] top-6 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-sky-600 dark:border-white bg-slate-50 dark:bg-black md:left-1/2 md:top-1/2 md:-translate-y-1/2"
                  />

                  {/* Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isRight ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className={`ml-10 md:ml-0 ${
                      isRight
                        ? 'md:col-start-2 md:pl-8'
                        : 'md:col-start-1 md:row-start-1 md:pr-8 md:text-right'
                    }`}
                  >
                    <div className="liquid-glass rounded-2xl border border-slate-300/70 dark:border-white/20 p-5 md:p-6">
                      <div
                        className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 ${
                          isRight ? '' : 'md:justify-end'
                        }`}
                      >
                        <span className="text-base font-medium text-slate-900 dark:text-white md:text-lg">{item.role}</span>
                        <span className="text-xs text-slate-500 dark:text-gray-500">{item.period}</span>
                      </div>
                      <div className="mt-0.5 text-sm text-slate-600 dark:text-gray-400">{item.org}</div>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-gray-400">
                        {item.detail}
                      </p>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
