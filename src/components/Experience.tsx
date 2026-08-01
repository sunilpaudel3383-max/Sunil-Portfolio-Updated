import { Briefcase } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import { experience } from '../data'

export default function Experience() {
  return (
    <Section id="experience" label="Experience" title="Where I've Applied My Craft.">
      <div className="space-y-5">
        {experience.map((job, i) => (
          <Reveal key={job.org} delay={i * 100}>
            <div className="liquid-glass rounded-2xl border border-slate-300/70 dark:border-white/20 p-6 md:p-8">
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-4">
                  <span className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-slate-200/60 dark:bg-white/5">
                    <Briefcase size={18} className="text-slate-700 dark:text-white/70" />
                  </span>
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white md:text-xl">{job.role}</h3>
                    <p className="text-sm text-slate-600 dark:text-gray-400">{job.org}</p>
                  </div>
                </div>
                <span className="text-sm text-slate-500 dark:text-gray-500 md:pl-4 md:text-right">
                  {job.period}
                </span>
              </div>
              <ul className="mt-5 grid gap-2 md:grid-cols-2 md:pl-14">
                {job.points.map((p) => (
                  <li key={p} className="flex gap-2 text-sm text-slate-700 dark:text-gray-300">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-slate-400 dark:bg-white/50" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

        ))}
      </div>
    </Section>
  )
}
