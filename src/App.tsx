import { useEffect, useState } from 'react'
import { ThemeProvider } from './ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Trainings from './components/Trainings'
import Skills from './components/Skills'
import Research from './components/Research'
import Leadership from './components/Leadership'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProtectionGuard from './components/ProtectionGuard'
import CvBuilder from './components/cv/CvBuilder'
import { CV_ROUTE } from './cv/route'

const isCvRoute = () => window.location.hash.startsWith(CV_ROUTE)

export default function App() {
  const [onCvRoute, setOnCvRoute] = useState(isCvRoute)

  useEffect(() => {
    const onHashChange = () => setOnCvRoute(isCvRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    // The builder is a separate view, so entering it should start at the top.
    if (onCvRoute) {
      window.scrollTo(0, 0)
      return
    }
    // Leaving the builder via a nav link: the target section only exists after
    // this render, so the browser's own jump would have found nothing.
    const id = window.location.hash.slice(1)
    if (!id) return
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    })
    return () => cancelAnimationFrame(frame)
  }, [onCvRoute])

  return (
    <ThemeProvider>
      {/*
        The content guard blocks right-click and Ctrl+S, which would get in the
        way of filling in the CV form, so it only runs on the portfolio itself.
      */}
      {!onCvRoute && <ProtectionGuard />}
      <div className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-black dark:text-white">
        <Navbar />
        {onCvRoute ? (
          <CvBuilder />
        ) : (
          <>
            <Hero />
            <main>
              <About />
              <Experience />
              <Projects />
              <Trainings />
              <Skills />
              <Research />
              <Leadership />
              <Certifications />
              <Contact />
            </main>
            <Footer />
          </>
        )}
      </div>
    </ThemeProvider>
  )
}
