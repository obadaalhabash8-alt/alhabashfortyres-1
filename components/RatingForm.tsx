'use client'

import { useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import StarRating from '@/components/StarRating'
import { shops } from '@/lib/shops'

interface Props {
  shopId: number | null
  onSuccess?: () => void
}

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function RatingForm({ shopId, onSuccess }: Props) {
  const { t, lang, isRTL } = useLanguage()
  const shop = shopId ? shops.find((s) => s.id === shopId) : null

  const [name, setName] = useState('')
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')
  const [fieldError, setFieldError] = useState('')

  if (!shop) {
    return (
      <div className="py-8 text-center">
        <p className="text-brand-muted font-cairo text-sm">{t.rate.shop_not_found}</p>
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
      onSuccess?.()
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
      <div className={`py-8 text-center animate-fade-in ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="w-12 h-12 rounded-full bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center mx-auto mb-5">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-brand-orange">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white font-cairo mb-2">{t.rate.success_title}</h3>
        <p className="text-brand-secondary font-cairo text-sm mb-6 max-w-xs mx-auto">{t.rate.success_message}</p>
        <button
          onClick={reset}
          className="px-6 py-2.5 border border-brand-border text-brand-secondary hover:border-brand-orange hover:text-brand-orange rounded-xl font-cairo font-semibold text-sm transition-all"
        >
          {t.rate.rate_another}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 ${isRTL ? 'text-right' : 'text-left'}`} noValidate>

      {/* Name */}
      <div>
        <label htmlFor="rating-name" className="block text-xs text-brand-muted font-cairo mb-2 uppercase tracking-widest">
          {t.rate.name_label} <span className="text-brand-orange">*</span>
        </label>
        <input
          id="rating-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.rate.name_placeholder}
          className={`w-full px-4 py-3 bg-brand-surface-2 border border-brand-border rounded-xl focus:border-brand-orange focus:outline-none transition-colors font-cairo text-white placeholder-brand-muted/50 text-sm ${isRTL ? 'text-right' : 'text-left'}`}
          dir={isRTL ? 'rtl' : 'ltr'}
          disabled={formState === 'submitting'}
        />
      </div>

      {/* Stars */}
      <div>
        <label className="block text-xs text-brand-muted font-cairo mb-3 uppercase tracking-widest">
          {t.rate.rating_label} <span className="text-brand-orange">*</span>
        </label>
        <div className={isRTL ? 'flex justify-end' : 'flex justify-start'}>
          <StarRating value={rating} onChange={setRating} interactive size="lg" />
        </div>
        {rating > 0 && (
          <p className="text-xs text-brand-muted font-cairo mt-2">{ratingLabel(rating, lang)}</p>
        )}
      </div>

      {/* Comment */}
      <div>
        <label htmlFor="rating-comment" className="block text-xs text-brand-muted font-cairo mb-2 uppercase tracking-widest">
          {t.rate.comment_label}
        </label>
        <textarea
          id="rating-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t.rate.comment_placeholder}
          rows={3}
          className={`w-full px-4 py-3 bg-brand-surface-2 border border-brand-border rounded-xl focus:border-brand-orange focus:outline-none transition-colors font-cairo text-white placeholder-brand-muted/50 text-sm resize-none ${isRTL ? 'text-right' : 'text-left'}`}
          dir={isRTL ? 'rtl' : 'ltr'}
          disabled={formState === 'submitting'}
        />
      </div>

      {/* Error */}
      {(fieldError || formState === 'error') && (
        <div className="bg-red-500/8 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm font-cairo">
          {fieldError || t.rate.error_message}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={formState === 'submitting'}
        className="w-full bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-200 font-cairo text-sm hover:shadow-lg hover:shadow-brand-orange/20"
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
    5: { ar: 'ممتاز', en: 'Excellent' },
  }
  return labels[rating]?.[lang] ?? ''
}
