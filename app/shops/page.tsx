'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/hooks/useLanguage'
import ShopCard from '@/components/ShopCard'
import { shops } from '@/lib/shops'

gsap.registerPlugin(ScrollTrigger)

export default function ShopsPage() {
  const { t, lang, isRTL } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.shops-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 }
      )
      gsap.fromTo(
        '.shop-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.shops-list', start: 'top 80%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className={`min-h-screen bg-brand-dark ${isRTL ? 'text-right' : 'text-left'}`}>

      {/* Page header */}
      <div className="relative bg-brand-darker overflow-hidden pt-24 pb-16 sm:pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand-orange/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-brand-border" />
        </div>

        <div className="shops-header relative max-w-6xl mx-auto px-6 sm:px-8">
          <span className="text-brand-orange text-xs font-bold uppercase tracking-widest font-cairo">
            {t.shops_section.subtitle}
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white mt-3 font-cairo leading-tight">
            {t.shops_section.title}
          </h1>
          <p className="text-brand-secondary mt-4 font-cairo text-base max-w-lg">
            {lang === 'ar'
              ? 'اختر أقرب فرع إليك واكتشف خدماتنا الشاملة'
              : 'Choose the branch nearest to you and discover our full range of services'}
          </p>
        </div>
      </div>

      {/* Shops grid */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 sm:py-20">
        <div className="shops-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {shops.map((shop) => (
            <div key={shop.id} className="shop-item">
              <ShopCard shop={shop} />
            </div>
          ))}
        </div>

        {/* Info strip */}
        <div className="mt-16 border border-brand-border rounded-2xl p-8 text-center">
          <p className="text-brand-orange text-xs font-bold uppercase tracking-widest font-cairo mb-3">
            {lang === 'ar' ? 'جميع الفروع' : 'All Branches'}
          </p>
          <h3 className="font-bold text-white font-cairo text-xl mb-3">
            {lang === 'ar' ? 'نفس معايير الجودة في كل فرع' : 'The same quality standards across every branch'}
          </h3>
          <p className="text-brand-muted font-cairo text-sm">
            {lang === 'ar'
              ? 'سواء اخترت الفرع الرئيسي أو أي فرع آخر، ستجد نفس الاحترافية والجودة'
              : 'Whether you visit our main branch or any other, you will find the same professionalism and quality'}
          </p>
        </div>
      </div>
    </div>
  )
}
