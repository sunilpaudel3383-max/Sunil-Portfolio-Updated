import { ExternalLink } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import ProtectedImage from './ProtectedImage'
import { publications } from '../data'

export default function Research() {
  return (
    <Section
      id="research"
      label="Research & Publications"
      title="Published Research And Manuals."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {publications.map((pub, i) => (
          <Reveal key={pub.title} delay={i * 120}>
            <article className="liquid-glass group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-300/70 dark:border-white/20">
              {/* Image placeholder */}
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-black">
                <ProtectedImage
                  src={pub.image}
                  alt={pub.title}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs text-slate-800 backdrop-blur-sm dark:border-white/20 dark:bg-black/60 dark:text-gray-200">
                  {pub.type}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-sm font-medium leading-snug text-slate-900 dark:text-white md:text-base">
                  {pub.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-gray-400">
                  {pub.venue} · {pub.year}
                </p>
                {pub.href && (
                  <a
                    href={pub.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm text-sky-600 hover:text-sky-800 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    View publication <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </article>
          </Reveal>

        ))}
      </div>
    </Section>
  )
}
