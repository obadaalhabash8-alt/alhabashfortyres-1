'use client'

import Link from 'next/link'

export default function ShopError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 className="text-xl font-black text-brand-white font-cairo mb-3">
          حدث خطأ ما | Something went wrong
        </h2>
        <p className="text-brand-muted font-cairo text-sm mb-8">
          {error.message || 'تعذّر تحميل هذه الصفحة. | This page could not be loaded.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold rounded-xl font-cairo text-sm transition-colors"
          >
            حاول مجدداً | Try Again
          </button>
          <Link
            href="/#branches"
            className="px-6 py-3 border border-brand-border text-brand-secondary hover:border-brand-orange hover:text-brand-orange font-semibold rounded-xl font-cairo text-sm transition-all"
          >
            العودة للفروع | Back to Branches
          </Link>
        </div>
      </div>
    </div>
  )
}
