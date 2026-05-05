'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import StarRating from '@/components/StarRating'
import { shops } from '@/lib/shops'

interface Props {
  shopId: number | null
}

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function RatingForm({ shopId }: Props) {
  const { t, lang, isRTL } = useLanguage()
  const shop = shopId ? shops.find((s) => s.id === shopId) : null

  const [name, setName] = useState('')
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')
  const [fieldError, setFieldError] = useState('')

  if (!shop) {
    return (
      <div className={`text-center py-16 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-brand-dark font-cairo mb-2">
          {t.rate.shop_not_found}
        </h2>
        <p className="text-gray-500 font-cairo mb-6">
          {lang === 'ar'
            ? 'يرجى استخدام رابط QR الصحيح أو تصفح فروعنا'
            : 'Please use the correct QR link or browse our branches'}
        </p>
        <Link
          href="/shops"
          className="inline-flex items-center gap-2 bg-brand-orange text-white px-6 py-3 rounded-xl font-cairo font-semibold hover:bg-brand-orange-dark transition-colors"
        >
          {t.shops_section.view_all}
        </Link>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFieldError('')

    if (!name.trim()) {
      setFieldError(lang === 'ar' ? 'الاسم مطلوب' : 'Name is required')
      return
    }
    if (rating === 0) {
      setFieldError(t.rate.select_rating)
      return
    }

    setFormState('submitting')

    try {
      const res = await fetch('/api/rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shop_id: shopId, name: name.trim(), rating, comment: comment.trim() }),
      })

      if (!res.ok) throw new Error('Server error')
      setFormState('success')
    } catch {
      setFormState('error')
    }
  }

  function reset() {
    setName('')
    setRating(0)
    setComment('')
    setFieldError('')
    setFormState('idle')
  }

  if (formState === 'success') {
    return (
      <div className={`text-center py-12 animate-fade-in ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-brand-dark font-cairo mb-3">
          {t.rate.success_title}
        </h2>
        <p className="text-gray-600 font-cairo text-lg mb-8 max-w-md mx-auto">
          {t.rate.success_message}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 border-2 border-brand-orange text-brand-orange rounded-xl font-cairo font-semibold hover:bg-brand-orange hover:text-white transition-colors"
          >
            {t.rate.rate_another}
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-brand-dark text-white rounded-xl font-cairo font-semibold hover:bg-brand-gray transition-colors"
          >
            {t.nav.home}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`} noValidate>
      {/* Shop info */}
      <div className="bg-brand-cream rounded-xl p-4 border border-brand-cream-dark">
        <p className="text-xs text-gray-500 font-cairo mb-1">{t.rate.shop_label}</p>
        <p className="text-brand-dark font-bold font-cairo text-lg">{shop.name[lang]}</p>
        <p className="text-gray-500 text-sm font-cairo">{shop.address[lang]}</p>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-brand-dark mb-1.5 font-cairo">
          {t.rate.name_label} <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.rate.name_placeholder}
          className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-orange focus:outline-none transition-colors font-cairo text-brand-dark placeholder-gray-400 bg-white ${
            isRTL ? 'text-right' : 'text-left'
          }`}
          dir={isRTL ? 'rtl' : 'ltr'}
          disabled={formState === 'submitting'}
        />
      </div>

      {/* Star rating */}
      <div>
        <label className="block text-sm font-semibold text-brand-dark mb-3 font-cairo">
          {t.rate.rating_label} <span className="text-red-500">*</span>
        </label>
        <div className={isRTL ? 'flex justify-end' : 'flex justify-start'}>
          <StarRating value={rating} onChange={setRating} interactive size="lg" />
        </div>
        {rating > 0 && (
          <p className="text-sm text-gray-500 font-cairo mt-2">{ratingLabel(rating, lang)}</p>
        )}
      </div>

      {/* Comment */}
      <div>
        <label htmlFor="comment" className="block text-sm font-semibold text-brand-dark mb-1.5 font-cairo">
          {t.rate.comment_label}
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t.rate.comment_placeholder}
          rows={4}
          className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-orange focus:outline-none transition-colors font-cairo text-brand-dark placeholder-gray-400 bg-white resize-none ${
            isRTL ? 'text-right' : 'text-left'
          }`}
          dir={isRTL ? 'rtl' : 'ltr'}
          disabled={formState === 'submitting'}
        />
      </div>

      {/* Error messages */}
      {(fieldError || formState === 'error') && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm font-cairo">
          {fieldError || t.rate.error_message}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={formState === 'submitting'}
        className="w-full bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-colors font-cairo text-lg shadow-md hover:shadow-brand-orange/30 shadow-brand-orange/20"
      >
        {formState === 'submitting' ? t.rate.submitting : t.rate.submit}
      </button>
    </form>
  )
}

function ratingLabel(rating: number, lang: 'ar' | 'en'): string {
  const labels: Record<number, { ar: string; en: string }> = {
    1: { ar: 'سيء جداً', en: 'Very Poor' },
    2: { ar: 'سيء', en: 'Poor' },
    3: { ar: 'مقبول', en: 'Average' },
    4: { ar: 'جيد', en: 'Good' },
    5: { ar: 'ممتاز!', en: 'Excellent!' },
  }
  return labels[rating]?.[lang] ?? ''
}
