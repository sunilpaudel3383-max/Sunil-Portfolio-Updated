import { useEffect, useState } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { navLinks, profile } from '../data'
import { useTheme } from '../ThemeContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-6 transition-all md:px-12 lg:px-16 ${
        scrolled ? 'pt-3' : 'pt-6'
      }`}
    >
      <nav className="liquid-glass mx-auto flex max-w-7xl items-center justify-between rounded-xl px-4 py-2">
        <a href="#top" className="text-xl font-semibold tracking-tight transition-colors">
         ✦ {profile.name}
        </a>

        <div className="hidden items-center gap-6 lg:gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm transition-colors hover:text-sky-500 dark:hover:text-gray-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300/60 bg-gray-100/80 text-gray-800 transition-all hover:bg-gray-200 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun size={18} className="text-amber-400 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon size={18} className="text-slate-800 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          <a
            href="#contact"
            className="hidden rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-gray-100 md:inline-block"
          >
            Get in Touch
          </a>

          <button
            className="p-1 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="liquid-glass mx-auto mt-2 flex max-w-7xl flex-col rounded-xl px-4 py-3 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm transition-colors hover:text-sky-500 dark:text-gray-200 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-lg bg-slate-900 px-6 py-2 text-center text-sm font-medium text-white dark:bg-white dark:text-black"
          >
            Get in Touch
          </a>
        </div>
      )}
    </header>
  )
}

