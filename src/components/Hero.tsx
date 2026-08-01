import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import AnimatedHeading from './AnimatedHeading'
import FadeIn from './FadeIn'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Parallax: video drifts and scales, content lifts and fades as you scroll.
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  return (
    <section
      ref={ref}
      id="top"
      className="relative h-screen w-full overflow-hidden text-white"
    >
      {/* Background video — raw, no overlay */}
      <motion.div
        style={{ y: videoY, scale: videoScale }}
        className="absolute inset-0 h-full w-full"
      >
        <video
          className="hero-zoom h-full w-full object-cover"
          style={{ animation: 'slow-zoom 20s ease-in-out infinite alternate' }}
          src={VIDEO_URL}
          autoPlay
          loop
          muted
          playsInline
        />
      </motion.div>

      {/* Hero content pinned to bottom */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full flex-col px-6 md:px-12 lg:px-16"
      >
        <div className="flex flex-1 flex-col justify-end pb-14 lg:pb-20">
          <div className="lg:grid lg:grid-cols-2 lg:items-end">
            {/* Left column */}
            <div>
              <FadeIn delay={100} duration={800}>
                <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gray-200 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  REGISTERED CIVIL ENGINEER • KATHMANDU, NEPAL
                </span>
              </FadeIn>

              <AnimatedHeading
                text={'Building Stronger Structures\nThrough Engineering & Research.'}
                className="mb-4 text-4xl font-normal md:text-5xl lg:text-6xl xl:text-7xl"
                style={{ letterSpacing: '-0.04em' }}
              />

              <FadeIn delay={800} duration={1000}>
                <p className="mb-5 max-w-xl text-base text-gray-300 md:text-lg">
                  Civil Engineer passionate about structural systems, bridge engineering, resilient infrastructure, and applied research that creates practical solutions for tomorrow's challenges.
                </p>
              </FadeIn>

              <FadeIn delay={1200} duration={1000}>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#contact"
                    className="rounded-lg bg-white px-8 py-3 font-medium text-black transition-colors hover:bg-gray-100"
                  >
                    Work with me
                  </a>
                  <a
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault()
                      const aboutSection = document.getElementById('about')
                      if (aboutSection) {
                        aboutSection.scrollIntoView({ behavior: 'smooth' })
                      } else {
                        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
                      }
                    }}
                    className="liquid-glass rounded-lg border border-white/20 px-8 py-3 font-medium text-white transition-colors hover:bg-white hover:text-black"
                  >
                    Explore portfolio
                  </a>
                </div>
              </FadeIn>
            </div>

            {/* Right column */}
            <div className="mt-8 flex items-end justify-start lg:mt-0 lg:justify-end">
              <FadeIn delay={1400} duration={1000}>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="liquid-glass rounded-xl border border-white/20 px-6 py-3"
                >
                  <span className="text-lg font-light md:text-xl lg:text-2xl">
                    Research. Engineering. Innovation.
                  </span>
                </motion.div>
              </FadeIn>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: hintOpacity }}
        className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2"
      >
        <ChevronDown className="animate-bounce text-white/70" size={24} />
      </motion.div>
    </section>
  )
}
