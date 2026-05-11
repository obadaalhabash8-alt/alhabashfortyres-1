'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="ar" dir="rtl">
      <body className="bg-brand-dark min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-6xl font-black text-brand-orange mb-4">!</p>
          <h1 className="text-2xl font-black text-white font-cairo mb-3">
            حدث خطأ غير متوقع
          </h1>
          <p className="text-brand-secondary font-cairo text-sm mb-8">
            Something went wrong. Please try again.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={reset}
              className="px-5 py-2.5 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold rounded-xl font-cairo text-sm transition-colors"
            >
              حاول مجدداً / Try again
            </button>
            <Link
              href="/"
              className="px-5 py-2.5 border border-brand-border text-brand-secondary hover:border-brand-orange hover:text-brand-orange rounded-xl font-cairo text-sm transition-all"
            >
              الرئيسية / Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
