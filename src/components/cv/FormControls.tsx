import { useState, type ReactNode } from 'react'
import { ChevronDown, GripVertical, Plus, Trash2 } from 'lucide-react'

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500'

interface FieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  hint?: string
}

export function Field({ label, value, onChange, placeholder, hint }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
        {label}
      </span>
      <input
        type="text"
        className={inputClass}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <span className="mt-1 block text-[11px] text-slate-400">{hint}</span>}
    </label>
  )
}

interface TextAreaFieldProps extends FieldProps {
  rows?: number
}

export function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  hint,
  rows = 4,
}: TextAreaFieldProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
        {label}
      </span>
      <textarea
        className={`${inputClass} resize-y leading-relaxed`}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <span className="mt-1 block text-[11px] text-slate-400">{hint}</span>}
    </label>
  )
}

interface AccordionProps {
  title: string
  subtitle?: string
  count?: number
  defaultOpen?: boolean
  children: ReactNode
}

export function Accordion({
  title,
  subtitle,
  count,
  defaultOpen = false,
  children,
}: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-white/5"
      >
        <span className="min-w-0">
          <span className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white">
            {title}
            {typeof count === 'number' && count > 0 && (
              <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[11px] font-medium text-sky-600 dark:text-sky-400">
                {count}
              </span>
            )}
          </span>
          {subtitle && (
            <span className="mt-0.5 block truncate text-xs text-slate-500 dark:text-slate-400">
              {subtitle}
            </span>
          )}
        </span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="space-y-4 border-t border-slate-200 px-4 py-4 dark:border-white/10">{children}</div>}
    </div>
  )
}

interface ItemCardProps {
  index: number
  total: number
  onMove: (from: number, to: number) => void
  onRemove: () => void
  children: ReactNode
}

/** A single repeatable entry with reorder and delete controls. */
export function ItemCard({ index, total, onMove, onRemove, children }: ItemCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-3 dark:border-white/10 dark:bg-white/[0.02]">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
          <GripVertical size={14} />
          Entry {index + 1}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onMove(index, index - 1)}
            disabled={index === 0}
            aria-label="Move up"
            className="rounded px-1.5 py-1 text-xs text-slate-500 transition-colors hover:bg-slate-200 disabled:opacity-30 dark:hover:bg-white/10"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={() => onMove(index, index + 1)}
            disabled={index === total - 1}
            aria-label="Move down"
            className="rounded px-1.5 py-1 text-xs text-slate-500 transition-colors hover:bg-slate-200 disabled:opacity-30 dark:hover:bg-white/10"
          >
            ↓
          </button>
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove entry"
            className="rounded px-1.5 py-1 text-rose-500 transition-colors hover:bg-rose-500/10"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

interface AddButtonProps {
  onClick: () => void
  label: string
}

export function AddButton({ onClick, label }: AddButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:border-sky-500 hover:text-sky-600 dark:border-white/15 dark:text-slate-300 dark:hover:border-sky-400 dark:hover:text-sky-400"
    >
      <Plus size={14} />
      {label}
    </button>
  )
}

interface StringListProps {
  label: string
  items: string[]
  onChange: (items: string[]) => void
  placeholder?: string
  addLabel: string
  multiline?: boolean
}

/** Editor for a simple list of strings (bullets, skills, languages). */
export function StringList({
  label,
  items,
  onChange,
  placeholder,
  addLabel,
  multiline = false,
}: StringListProps) {
  const update = (index: number, value: string) =>
    onChange(items.map((item, i) => (i === index ? value : item)))

  const remove = (index: number) => {
    const next = items.filter((_, i) => i !== index)
    onChange(next.length > 0 ? next : [''])
  }

  return (
    <div>
      <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
        {label}
      </span>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            {multiline ? (
              <textarea
                className={`${inputClass} resize-y leading-relaxed`}
                rows={2}
                value={item}
                placeholder={placeholder}
                onChange={(e) => update(i, e.target.value)}
              />
            ) : (
              <input
                type="text"
                className={inputClass}
                value={item}
                placeholder={placeholder}
                onChange={(e) => update(i, e.target.value)}
              />
            )}
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label="Remove"
              className="mt-1.5 flex-shrink-0 rounded p-1 text-slate-400 transition-colors hover:bg-rose-500/10 hover:text-rose-500"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-2">
        <AddButton onClick={() => onChange([...items, ''])} label={addLabel} />
      </div>
    </div>
  )
}

/** Move an item within a list, returning a new array. */
export function moveItem<T>(items: T[], from: number, to: number): T[] {
  if (to < 0 || to >= items.length) return items
  const next = [...items]
  const [moved] = next.splice(from, 1)
  next.splice(to, 0, moved)
  return next
}
