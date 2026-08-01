import { type ReactNode } from 'react'
import Reveal from './Reveal'

interface SectionProps {
  id: string
  label: string
  title: string
  children: ReactNode
  className?: string
}

export default function Section({ id, label, title, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`px-6 py-24 md:px-12 lg:px-16 lg:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-sky-600 dark:text-gray-400">
            {label}
          </p>
          <h2
            className="mb-12 max-w-2xl text-3xl font-normal text-slate-900 dark:text-white md:text-4xl lg:text-5xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            {title}
          </h2>

        </Reveal>
        {children}
      </div>
    </section>
  )
}
