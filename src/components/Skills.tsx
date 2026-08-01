import { Wrench, Users, Languages } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import Marquee from './Marquee'
import { skills } from '../data'

const icons = {
  Technical: Wrench,
  Interpersonal: Users,
  Languages: Languages,
} as const

// Flattened lists for the two moving rows.
const allSkills = [...skills.Technical, ...skills.Interpersonal, ...skills.Languages]
const rowA = allSkills.filter((_, i) => i % 2 === 0)
const rowB = allSkills.filter((_, i) => i % 2 === 1)

export default function Skills() {
  return (
    <Section id="skills" label="Skills" title="Tools, Strengths & Languages.">
      <div className="grid gap-5 md:grid-cols-3">
        {(Object.keys(skills) as (keyof typeof skills)[]).map((group, i) => {
          const Icon = icons[group]
          return (
            <Reveal key={group} delay={i * 100}>
              <div className="liquid-glass h-full rounded-2xl border border-slate-300/70 dark:border-white/20 p-6 md:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-200/60 dark:bg-white/5">
                    <Icon size={18} className="text-slate-700 dark:text-white/70" />
                  </span>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">{group}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills[group].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-slate-300/80 bg-slate-100/80 text-slate-800 dark:border-white/15 dark:bg-white/5 dark:text-gray-200 px-3 py-1.5 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          )

        })}
      </div>

      {/* Moving marquee rows */}
      <div className="mt-12 space-y-4">
        <Marquee items={rowA} duration={38} />
        <Marquee items={rowB} duration={46} reverse />
      </div>
    </Section>
  )
}
