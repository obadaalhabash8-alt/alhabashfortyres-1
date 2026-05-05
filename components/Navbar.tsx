'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/hooks/useLanguage'

export default function Navbar() {
  const { t, lang, toggleLanguage } = useLanguage()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/shops', label: t.nav.shops },
  ]

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 border-b ${
      scrolled 
        ? 'bg-brand-dark/95 backdrop-blur-md border-brand-border shadow-lg shadow-black/20' 
        : 'bg-brand-dark border-transparent'
    }`}>
      {/* Premium top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent opacity-50" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">

          {/* Nav Links (Leading side in RTL) */}
          <div className="flex-1 flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold font-cairo transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-brand-orange bg-brand-orange/5'
                      : 'text-brand-secondary hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Logo (Center/Balanced) */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-brand-orange flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-brand-orange/30 group-hover:-rotate-12 flex-shrink-0">
              <TyreIcon />
            </div>
            <div className="hidden sm:block text-center">
              <p className="text-white font-black text-base leading-none font-cairo tracking-tight">
                {lang === 'ar' ? 'الحبش للإطارات' : 'Al-Habash Tyres'}
              </p>
              <p className="text-brand-orange text-[10px] font-bold font-cairo mt-1 tracking-widest uppercase">
                {lang === 'ar' ? 'منذ ١٩٦٧' : 'Est. 1967'}
              </p>
            </div>
          </Link>

          {/* Actions (Trailing side in RTL) */}
          <div className="flex-1 flex items-center justify-end gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-brand-border bg-brand-surface text-brand-secondary hover:text-white hover:border-brand-orange/40 transition-all text-xs font-bold font-cairo"
              aria-label="Toggle language"
            >
              <GlobeIcon />
              <span className="min-w-[45px] text-center">{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-brand-surface border border-brand-border text-brand-secondary hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>


        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-64 opacity-100 py-4 border-t border-brand-border' : 'max-h-0 opacity-0'
        }`}>
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-5 py-4 text-sm font-bold rounded-xl font-cairo transition-all ${
                  isActive(link.href)
                    ? 'text-brand-orange bg-brand-orange/8'
                    : 'text-brand-secondary hover:text-white hover:bg-white/5'
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

function TyreIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2.5" />
      <line x1="12" y1="2" x2="12" y2="7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12" y1="17" x2="12" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="2" y1="12" x2="7" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="17" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

