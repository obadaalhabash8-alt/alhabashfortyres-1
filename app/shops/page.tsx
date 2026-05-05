'use client'

import { useLanguage } from '@/hooks/useLanguage'
import ShopCard from '@/components/ShopCard'
import { shops } from '@/lib/shops'

export default function ShopsPage() {
  const { t, lang, isRTL } = useLanguage()

  return (
    <div className={`min-h-screen ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Page header */}
      <div className="bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-40 h-40 rounded-full border-4 border-brand-orange"
              style={{ left: `${i * 18}%`, top: '-20%', transform: 'rotate(20deg)' }}
            />
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-orange" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <span className="text-brand-orange text-sm font-bold uppercase tracking-widest font-cairo">
            {t.shops_section.subtitle}
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mt-2 font-cairo">
            {t.shops_section.title}
          </h1>
          <p className="text-gray-400 mt-3 font-cairo text-lg max-w-xl">
            {lang === 'ar'
              ? 'اختر أقرب فرع إليك واكتشف خدماتنا الشاملة'
              : 'Choose the branch nearest to you and discover our comprehensive services'}
          </p>
        </div>
      </div>

      {/* Shops grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {shops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>

        {/* Info callout */}
        <div className="mt-12 bg-brand-orange/5 border border-brand-orange/20 rounded-2xl p-6 sm:p-8 text-center">
          <p className="text-2xl mb-3">📍</p>
          <h3 className="font-bold text-brand-dark font-cairo text-xl mb-2">
            {lang === 'ar' ? 'هل تحتاج إلى المساعدة في اختيار الفرع؟' : 'Need help choosing a branch?'}
          </h3>
          <p className="text-gray-500 font-cairo">
            {lang === 'ar'
              ? 'جميع فروعنا تقدم نفس معايير الجودة والخدمة. اختر الأقرب إليك!'
              : 'All our branches deliver the same quality standards. Just pick the closest one!'}
          </p>
        </div>
      </div>
    </div>
  )
}
