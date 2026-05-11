'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/hooks/useLanguage'
import { useTheme } from '@/components/ThemeProvider'

export default function Navbar() {
  const { t, lang, toggleLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('/')

  useEffect(() => {
    const sectionIds = ['story', 'journey', 'branches']

    const update = () => {
      if (window.location.pathname !== '/') return
      let found = '/'
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) {
          found = `/#${id}`
        }
      }
      setActiveSection(found)
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/#story', label: t.nav.story },
    { href: '/#journey', label: t.nav.journey },
    { href: '/#branches', label: t.nav.shops },
  ]

  const isActive = (href: string) => {
    if (pathname !== '/') return !href.includes('#') && pathname.startsWith(href)
    return activeSection === href
  }

  return (
    <nav className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 border-b bg-brand-dark/95 backdrop-blur-md border-brand-border ${
      scrolled ? 'shadow-lg shadow-black/20' : 'sm:bg-brand-dark sm:border-transparent sm:shadow-none'
    }`}>
      {/* Premium top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent opacity-50" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Desktop & Mobile row */}
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <Image
              src="https://i.ibb.co/n81DPvRB/image.png"
              alt="Al-Habash Tyres Logo"
              width={40}
              height={40}
              className="w-9 h-9 sm:w-10 sm:h-10 object-cover rounded-full flex-shrink-0"
              priority
            />
            <div className="text-right leading-none">
              <p className="text-brand-white font-black text-sm sm:text-base leading-none font-cairo tracking-tight whitespace-nowrap">
                {lang === 'ar' ? 'شركة الحبش للإطارات' : 'Al-Habash Tyres Co.'}
              </p>
              <p className="text-brand-orange text-[9px] sm:text-[10px] font-bold font-cairo mt-0.5 tracking-widest uppercase">
                {lang === 'ar' ? 'منذ ١٩٦٧' : 'Est. 1967'}
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 lg:px-4 py-2 rounded-xl text-sm font-bold font-cairo transition-all duration-200 whitespace-nowrap ${
                  isActive(link.href)
                    ? 'text-brand-orange bg-brand-orange/5'
                    : 'text-brand-secondary hover:text-brand-white hover:bg-brand-surface'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg border border-brand-border bg-brand-surface text-brand-secondary hover:text-brand-white hover:border-brand-orange/40 transition-all text-[11px] font-bold font-cairo"
              aria-label="Toggle language"
            >
              <GlobeIcon />
              <span>{lang === 'ar' ? 'EN' : 'AR'}</span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl border border-brand-border bg-brand-surface text-brand-secondary hover:text-brand-white hover:border-brand-orange/40 transition-all flex-shrink-0"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-brand-surface border border-brand-border text-brand-secondary hover:text-brand-white transition-colors flex-shrink-0"
              aria-label="Toggle menu"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-96 opacity-100 pb-4 border-t border-brand-border' : 'max-h-0 opacity-0'
        }`}>
          <div className="space-y-1 pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center px-4 py-3.5 text-sm font-bold rounded-xl font-cairo transition-all ${
                  isActive(link.href)
                    ? 'text-brand-orange bg-brand-orange/8'
                    : 'text-brand-secondary hover:text-brand-white hover:bg-brand-surface'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}


function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}
