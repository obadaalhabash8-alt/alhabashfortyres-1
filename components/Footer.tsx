'use client'

import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import { shops } from '@/lib/shops'

export default function Footer() {
  const { t, lang, isRTL } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-darker text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ${
            isRTL ? 'text-right' : 'text-left'
          }`}
        >
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                  <line x1="12" y1="2" x2="12" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="12" y1="16" x2="12" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="2" y1="12" x2="8" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="16" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold font-cairo">
                  {lang === 'ar' ? 'الحبش للإطارات' : 'Al-Habash Tyres'}
                </p>
                <p className="text-brand-orange text-xs">
                  {lang === 'ar' ? 'منذ ١٩٦٧' : 'Since 1967'}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed font-cairo">{t.footer.tagline}</p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4 font-cairo">{t.footer.links_title}</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: t.nav.home },
                { href: '/shops', label: t.nav.shops },
                { href: '/rate', label: t.nav.rate },
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
            <h3 className="text-white font-semibold mb-4 font-cairo">{t.common.shops}</h3>
            <ul className="space-y-2">
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
          <div>
            <h3 className="text-white font-semibold mb-4 font-cairo">{t.footer.contact_title}</h3>
            <ul className="space-y-2">
              {shops.map((shop) => (
                <li key={shop.id} className="text-sm font-cairo">
                  <span className="text-gray-500 block text-xs">
                    {shop.name[lang]}
                  </span>
                  <a
                    href={`tel:${shop.phone}`}
                    className="hover:text-brand-orange transition-colors"
                    dir="ltr"
                  >
                    {shop.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-cairo">
          <span>
            © {year} {t.footer.company}. {t.footer.rights}.
          </span>
          <span className="text-brand-orange/60">
            {lang === 'ar' ? 'صُنع بـ ❤ في المملكة العربية السعودية' : 'Made with ❤ in Saudi Arabia'}
          </span>
        </div>
      </div>
    </footer>
  )
}
