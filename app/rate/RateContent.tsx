'use client'

import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import RatingForm from '@/components/RatingForm'

interface Props {
  shopId: number | null
}

export default function RateContent({ shopId }: Props) {
  const { t, lang, isRTL } = useLanguage()

  return (
    <div className={`min-h-screen bg-brand-cream ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Page header */}
      <div className="bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-28 h-28 rounded-full border-4 border-brand-orange"
              style={{ right: `${i * 22}%`, top: '-30%' }}
            />
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-orange" />

        <div className="relative max-w-xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <div className="text-5xl mb-4">⭐</div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-cairo mb-3">
            {t.rate.title}
          </h1>
          <p className="text-gray-400 font-cairo text-lg">{t.rate.subtitle}</p>
        </div>
      </div>

      {/* Form card */}
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10">
          <RatingForm shopId={shopId} />
        </div>

        {/* QR hint */}
        {!shopId && (
          <div className="mt-8 bg-brand-orange/5 border border-brand-orange/20 rounded-2xl p-5 text-center">
            <p className="text-sm text-gray-600 font-cairo mb-3">
              {lang === 'ar'
                ? 'يمكنك أيضاً مسح رمز QR الخاص بالفرع لتقييم مباشر'
                : 'You can also scan the branch QR code for a direct rating'}
            </p>
            <Link
              href="/shops"
              className="text-brand-orange font-semibold font-cairo text-sm hover:underline"
            >
              {t.shops_section.view_all} →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
