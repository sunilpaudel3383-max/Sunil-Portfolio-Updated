import { navLinks, profile } from '../data'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-white/10 px-6 py-10 md:px-12 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">{profile.name}</span>
        <div className="flex flex-wrap justify-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-600 dark:text-gray-400 transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
        <span className="text-sm text-slate-500 dark:text-gray-500">
          © {new Date().getFullYear()} {profile.name}
        </span>
      </div>
    </footer>

  )
}
