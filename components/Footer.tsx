'use client'

import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import { shops } from '@/lib/shops'

export default function Footer() {
  const { t, lang, isRTL } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-dark border-t border-brand-border text-brand-secondary">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-10 sm:py-16">
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 ${isRTL ? 'text-right' : 'text-left'}`}>

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-brand-orange flex items-center justify-center flex-shrink-0">
                <TyreIcon />
              </div>
              <div>
                <p className="text-white font-bold font-cairo text-sm">
                  {lang === 'ar' ? 'الحبش للإطارات' : 'Al-Habash Tyres'}
                </p>
                <p className="text-brand-orange text-[11px] font-cairo">
                  {lang === 'ar' ? 'منذ ١٩٦٧' : 'Est. 1967'}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed font-cairo text-brand-muted">{t.footer.tagline}</p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-5 font-cairo text-xs sm:text-sm uppercase tracking-widest">{t.footer.links_title}</h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { href: '/', label: t.nav.home },
                { href: '/#branches', label: t.nav.shops },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-brand-orange transition-colors font-cairo"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-5 font-cairo text-xs sm:text-sm uppercase tracking-widest">{t.common.shops}</h3>
            <ul className="space-y-2 sm:space-y-3">
              {shops.map((shop) => (
                <li key={shop.id}>
                  <Link
                    href={`/shops/${shop.id}`}
                    className="text-sm hover:text-brand-orange transition-colors font-cairo"
                  >
                    {shop.name[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-white font-semibold mb-3 sm:mb-5 font-cairo text-xs sm:text-sm uppercase tracking-widest">{t.footer.contact_title}</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4">
              {shops.map((shop) => (
                <li key={shop.id} className="font-cairo">
                  <span className="text-brand-muted block text-xs mb-0.5">{shop.name[lang]}</span>
                  <a
                    href={`tel:${shop.phone}`}
                    className="text-sm hover:text-brand-orange transition-colors"
                    dir="ltr"
                  >
                    {shop.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 sm:mt-12 pt-5 sm:pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-cairo">
          <span>
            {lang === 'ar'
              ? `© ${year} الحبش للإطارات. جميع الحقوق محفوظة.`
              : `© ${year} Al-Habash Tyres. All rights reserved.`}
          </span>
        </div>
      </div>
    </footer>
  )
}

function TyreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <line x1="12" y1="2" x2="12" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="16" x2="12" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="2" y1="12" x2="8" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
