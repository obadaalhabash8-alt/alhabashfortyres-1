'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import { shops } from '@/lib/shops'

export default function Footer() {
  const { t, lang, isRTL } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#111111] border-t border-white/10 text-zinc-400">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-10 sm:py-16">
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 ${isRTL ? 'text-right' : 'text-left'}`}>

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="https://i.ibb.co/n81DPvRB/image.png"
                alt="Al-Habash Tyres Logo"
                width={36}
                height={36}
                className="w-9 h-9 object-cover rounded-full flex-shrink-0"
              />
              <div>
                <p className="font-bold font-cairo text-sm">
                  {lang === 'ar' ? (
                    <><span className="text-brand-orange">شركة الحبش</span><span className="text-gray-400"> للإطارات</span></>
                  ) : (
                    <><span className="text-brand-orange">Al-Habash</span><span className="text-gray-400"> Tyres Company</span></>
                  )}
                </p>
                <p className="text-brand-orange text-[11px] font-cairo">
                  {lang === 'ar' ? 'منذ ١٩٦٧' : 'Est. 1967'}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed font-cairo text-zinc-500">{t.footer.tagline}</p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-zinc-100 font-semibold mb-3 sm:mb-5 font-cairo text-xs sm:text-sm uppercase tracking-widest">{t.footer.links_title}</h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { href: '/', label: t.nav.home },
                { href: '/#branches', label: t.nav.shops },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-brand-orange transition-colors font-cairo"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h3 className="text-zinc-100 font-semibold mb-3 sm:mb-5 font-cairo text-xs sm:text-sm uppercase tracking-widest">{t.common.shops}</h3>
            <ul className="space-y-2 sm:space-y-3">
              {shops.map((shop) => (
                <li key={shop.id}>
                  <Link
                    href={`/shops/${shop.id}`}
                    className="text-sm text-zinc-400 hover:text-brand-orange transition-colors font-cairo"
                  >
                    {shop.name[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-zinc-100 font-semibold mb-3 sm:mb-5 font-cairo text-xs sm:text-sm uppercase tracking-widest">{t.footer.contact_title}</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4">
              {shops.map((shop) => (
                <li key={shop.id} className="font-cairo">
                  <span className="text-zinc-500 block text-xs mb-0.5">{shop.name[lang]}</span>
                  <a
                    href={`tel:${shop.phone}`}
                    className="text-sm text-zinc-400 hover:text-brand-orange transition-colors"
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
        <div className="mt-8 sm:mt-12 pt-5 sm:pt-6 border-t border-white/10 flex flex-col items-center gap-3 text-xs font-cairo text-zinc-500">
          <a
            href="https://www.instagram.com/alhabashfortyres?igsh=MTNoZWtqeDgwNjJ2dw=="
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-zinc-400 hover:text-brand-orange transition-colors"
            aria-label="Instagram"
          >
            <InstagramIcon />
            <span className="font-cairo">@alhabashfortyres</span>
          </a>
          <span>
            {lang === 'ar'
              ? `© ${year} شركة الحبش للإطارات. جميع الحقوق محفوظة.`
              : `© ${year} Al-Habash Tyres Company. All rights reserved.`}
          </span>
        </div>
      </div>
    </footer>
  )
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  )
}

