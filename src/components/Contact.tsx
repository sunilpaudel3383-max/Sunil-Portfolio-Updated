import { useState, FormEvent } from 'react'
import { Send, CheckCircle, ArrowUpRight, Linkedin, Facebook, Phone, MapPin } from 'lucide-react'
import Reveal from './Reveal'
import { profile } from '../data'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setIsSubmitting(true)

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Inquiry from ${formData.name}`,
          _template: 'table',
        }),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        // Fallback to mailto if direct send is blocked
        const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`)
        const body = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )
        window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
        setSubmitted(true)
      }
    } catch {
      // Fallback to mailto on network error
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`)
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="px-6 py-20 md:px-12 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Container Box styled to mirror the sleek screenshot design */}
        <div className="liquid-glass overflow-hidden rounded-3xl border border-slate-300/80 bg-slate-900 text-white dark:border-white/15 dark:bg-[#0c1017] shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12">
            
            {/* Left Column - Contact Information */}
            <div className="p-8 md:p-12 lg:p-14 md:col-span-7 flex flex-col justify-between space-y-10 border-b border-slate-800 md:border-b-0 md:border-r md:border-slate-800/80">
              <Reveal>
                <div className="space-y-6">
                  {/* Status indicator pill */}
                  <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3.5 py-1 text-xs font-medium tracking-wide text-sky-600 dark:text-sky-400 border border-sky-500/20">
                    <span className="h-2 w-2 rounded-full bg-sky-500 dark:bg-sky-400 animate-pulse" />
                    Open to new opportunities
                  </div>

                  {/* Main Display Headline */}
                  <h2
                    className="text-3xl font-normal tracking-tight text-slate-900 dark:text-white md:text-4xl lg:text-5xl leading-tight"
                    style={{ letterSpacing: '-0.03em' }}
                  >
                    Let's build <span className="text-sky-600 dark:text-sky-400 font-medium">something</span> structural & lasting.
                  </h2>

                  {/* Subtitle */}
                  <p className="text-slate-600 dark:text-gray-300 text-base md:text-lg leading-relaxed max-w-lg">
                    Tell me about your project, structural engineering inquiry, or research collaboration. I read every message myself and reply promptly.
                  </p>
                </div>
              </Reveal>

              {/* Contact Details List */}
              <div className="space-y-6 divide-y divide-slate-200 dark:divide-slate-800/80 pt-4">
                <Reveal delay={100}>
                  <div className="pt-5 first:pt-0">
                    <span className="text-xs font-medium uppercase tracking-[0.15em] text-sky-600 dark:text-sky-400 block mb-1">
                      EMAIL
                    </span>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-base sm:text-lg font-medium text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors inline-flex items-center gap-2"
                    >
                      {profile.email}
                      <ArrowUpRight size={16} className="text-slate-400 dark:text-slate-500" />
                    </a>
                  </div>
                </Reveal>

                <Reveal delay={150}>
                  <div className="pt-5">
                    <span className="text-xs font-medium uppercase tracking-[0.15em] text-sky-600 dark:text-sky-400 block mb-1">
                      PHONE / DIRECT CALL
                    </span>
                    <a
                      href={`tel:${profile.phone.replace(/\s/g, '')}`}
                      className="text-base sm:text-lg font-medium text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors inline-flex items-center gap-2"
                    >
                      {profile.phone}
                      <Phone size={15} className="text-slate-400 dark:text-slate-500" />
                    </a>
                  </div>
                </Reveal>

                <Reveal delay={200}>
                  <div className="pt-5">
                    <span className="text-xs font-medium uppercase tracking-[0.15em] text-sky-600 dark:text-sky-400 block mb-2">
                      ELSEWHERE
                    </span>
                    <div className="flex flex-wrap items-center gap-4 text-base font-medium">
                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors inline-flex items-center gap-1.5"
                      >
                        <Linkedin size={16} className="text-sky-600 dark:text-sky-400" />
                        LinkedIn
                      </a>
                      <span className="text-slate-400 dark:text-slate-700">•</span>
                      <a
                        href={profile.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors inline-flex items-center gap-1.5"
                      >
                        <Facebook size={16} className="text-sky-600 dark:text-sky-400" />
                        Facebook
                      </a>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Location Tagline */}
              <Reveal delay={250}>
                <p className="text-xs font-medium text-slate-500 dark:text-gray-400 pt-2 flex items-center gap-2">
                  <MapPin size={14} className="text-sky-600 dark:text-sky-400" />
                  Based in Kathmandu — working with clients & engineering teams everywhere
                </p>
              </Reveal>
            </div>

            {/* Right Column - Direct Query Form */}
            <div className="p-8 md:p-12 lg:p-14 md:col-span-5 flex flex-col justify-between bg-slate-100/50 dark:bg-slate-950/50">
              <Reveal delay={100}>
                <div className="space-y-6">
                  <h3 className="text-xl font-medium text-slate-900 dark:text-white tracking-tight">
                    Or, write it here
                  </h3>

                  {submitted ? (
                    <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-emerald-800 dark:text-emerald-300 space-y-3">
                      <div className="flex items-center gap-2 font-medium text-emerald-600 dark:text-emerald-400 text-base">
                        <CheckCircle size={20} />
                        Message Sent Successfully!
                      </div>
                      <p className="text-xs text-emerald-700 dark:text-emerald-200/80 leading-relaxed">
                        Thank you, <strong>{formData.name}</strong>! Your message has been sent directly to <strong>{profile.email}</strong>. Sunil will get back to you soon.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false)
                          setFormData({ name: '', email: '', message: '' })
                        }}
                        className="text-xs font-medium text-emerald-600 dark:text-emerald-400 underline underline-offset-4 hover:text-emerald-700 dark:hover:text-emerald-300 pt-2 block cursor-pointer"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name Field */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500 dark:text-gray-400 block">
                          NAME
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your full name"
                          className="w-full bg-transparent border-b border-slate-300 dark:border-slate-700 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-sky-500 dark:focus:border-sky-400 focus:outline-none transition-colors font-medium"
                        />
                      </div>

                      {/* Email Field */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500 dark:text-gray-400 block">
                          EMAIL
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@example.com"
                          className="w-full bg-transparent border-b border-slate-300 dark:border-slate-700 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-sky-500 dark:focus:border-sky-400 focus:outline-none transition-colors font-medium"
                        />
                      </div>

                      {/* Message Field */}
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500 dark:text-gray-400 block">
                          MESSAGE
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Describe your project, query, or invitation..."
                          className="w-full bg-transparent border-b border-slate-300 dark:border-slate-700 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-sky-500 dark:focus:border-sky-400 focus:outline-none transition-colors resize-none font-medium"
                        />
                      </div>

                      {/* Submit Pill Button */}
                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-900 text-white dark:bg-white/10 dark:text-white px-7 py-3 text-xs font-medium tracking-wider uppercase hover:bg-sky-600 dark:hover:bg-sky-500 hover:border-sky-600 dark:hover:border-sky-500 transition-all duration-300 disabled:opacity-50 cursor-pointer group shadow-sm"
                        >
                          {isSubmitting ? 'SENDING MESSAGE...' : 'SEND MESSAGE'}
                          <Send size={12} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
