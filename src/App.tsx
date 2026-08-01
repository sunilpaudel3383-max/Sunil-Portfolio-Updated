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

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-black dark:text-white">
        <Navbar />
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
      </div>
    </ThemeProvider>
  )
}

