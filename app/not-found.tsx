'use client'

import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'

export default function NotFound() {
  const { lang } = useLanguage()

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-brand-orange text-7xl font-black font-cairo mb-4">404</p>
        <h1 className="text-2xl font-bold text-brand-white font-cairo mb-3">
          {lang === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </h1>
        <p className="text-brand-muted font-cairo text-sm mb-8 max-w-xs mx-auto">
          {lang === 'ar'
            ? 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.'
            : "The page you're looking for doesn't exist or has been moved."}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-6 py-3 rounded-xl font-cairo text-sm transition-colors"
        >
          {lang === 'ar' ? '← العودة للرئيسية' : '← Back to Home'}
        </Link>
      </div>
    </div>
  )
}
