import { useState } from 'react'
import { Wrench, Users, Languages, Sparkles } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import Marquee from './Marquee'
import SkillDetailModal from './SkillDetailModal'
import { skills, technicalSkillDetails, TechnicalSkillDetail } from '../data'

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
  const [selectedSkill, setSelectedSkill] = useState<TechnicalSkillDetail | null>(null)

  const handleSkillClick = (skillName: string) => {
    if (technicalSkillDetails[skillName]) {
      setSelectedSkill(technicalSkillDetails[skillName])
    }
  }

  const renderMarqueeItem = (item: string) => {
    const isTechnical = Boolean(technicalSkillDetails[item])

    if (isTechnical) {
      return (
        <button
          onClick={() => handleSkillClick(item)}
          className="liquid-glass group inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-sky-500/40 bg-sky-500/10 text-sky-950 dark:border-sky-400/30 dark:bg-sky-950/30 dark:text-sky-200 px-5 py-2.5 text-sm transition-all duration-200 hover:scale-105 hover:border-sky-500 dark:hover:border-sky-400 cursor-pointer"
        >
          <span>{item}</span>
          <Sparkles size={13} className="text-sky-500 dark:text-sky-400 fill-sky-400/20 opacity-80 group-hover:opacity-100 transition-opacity" />
        </button>
      )
    }

    return (
      <span className="liquid-glass inline-block whitespace-nowrap rounded-full border border-slate-300/70 bg-white/70 text-slate-800 dark:border-white/15 dark:bg-black/40 dark:text-gray-200 px-5 py-2.5 text-sm">
        {item}
      </span>
    )
  }

  const TechIcon = icons.Technical
  const InterpersonalIcon = icons.Interpersonal
  const LanguagesIcon = icons.Languages

  return (
    <Section id="skills" label="Skills" title="Tools, Strengths & Languages.">
      <div className="space-y-5">
        {/* Row 1: Technical Skills (Full Width Row) */}
        <Reveal delay={0}>
          <div className="liquid-glass rounded-2xl border border-slate-300/70 dark:border-white/20 p-6 md:p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-400">
                  <TechIcon size={20} />
                </span>
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">Technical Skills</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Engineering software & analytical frameworks</p>
                </div>
              </div>
              <span className="text-xs font-medium text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 px-3 py-1 rounded-full border border-sky-200 dark:border-sky-800/50 flex items-center gap-1.5">
                <Sparkles size={12} className="fill-sky-400/30" />
                Click skill for expertise gauge
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {skills.Technical.map((skill) => {
                const isTechnical = Boolean(technicalSkillDetails[skill])

                if (isTechnical) {
                  return (
                    <button
                      key={skill}
                      onClick={() => handleSkillClick(skill)}
                      className="group inline-flex items-center gap-2 rounded-xl border border-sky-400/40 bg-sky-50/70 text-sky-950 dark:border-sky-400/30 dark:bg-sky-950/40 dark:text-sky-200 px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 hover:border-sky-500 hover:bg-sky-100 dark:hover:bg-sky-900/50 active:scale-95 cursor-pointer shadow-sm"
                    >
                      <span>{skill}</span>
                      <Sparkles size={13} className="text-sky-500 dark:text-sky-400 fill-sky-400/30 opacity-70 group-hover:opacity-100" />
                    </button>
                  )
                }

                return (
                  <span
                    key={skill}
                    className="rounded-xl border border-slate-300/80 bg-slate-100/80 text-slate-800 dark:border-white/15 dark:bg-white/5 dark:text-gray-200 px-4 py-2 text-sm font-medium"
                  >
                    {skill}
                  </span>
                )
              })}
            </div>
          </div>
        </Reveal>

        {/* Row 2: Interpersonal & Languages (Two Columns) */}
        <div className="grid gap-5 md:grid-cols-2">
          {/* Interpersonal Skills */}
          <Reveal delay={150}>
            <div className="liquid-glass h-full rounded-2xl border border-slate-300/70 dark:border-white/20 p-6 md:p-8">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-200/60 dark:bg-white/5">
                  <InterpersonalIcon size={18} className="text-slate-700 dark:text-white/70" />
                </span>
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">Interpersonal</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Leadership & collaborative traits</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.Interpersonal.map((skill) => (
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

          {/* Languages */}
          <Reveal delay={250}>
            <div className="liquid-glass h-full rounded-2xl border border-slate-300/70 dark:border-white/20 p-6 md:p-8">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-200/60 dark:bg-white/5">
                  <LanguagesIcon size={18} className="text-slate-700 dark:text-white/70" />
                </span>
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">Languages</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Communication capabilities</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.Languages.map((skill) => (
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
        </div>
      </div>

      {/* Moving marquee rows */}
      <div className="mt-12 space-y-4">
        <Marquee items={rowA} duration={38} renderItem={renderMarqueeItem} />
        <Marquee items={rowB} duration={46} reverse renderItem={renderMarqueeItem} />
      </div>

      {/* Skill Detail Pop-out Modal */}
      <SkillDetailModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
    </Section>
  )
}

