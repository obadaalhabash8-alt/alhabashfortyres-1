'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import type { Shop } from '@/types'

interface Props {
  isOpen: boolean
  onClose: () => void
  shop: Shop
  waNumber: string
}

export default function WhatsAppModal({ isOpen, onClose, shop, waNumber }: Props) {
  const { lang, isRTL } = useLanguage()
  const [name, setName] = useState('')
  const [carType, setCarType] = useState('')
  const [service, setService] = useState('')
  const [message, setMessage] = useState('')

  // Reset form whenever modal closes
  useEffect(() => {
    if (!isOpen) {
      setName('')
      setCarType('')
      setService('')
      setMessage('')
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  const allServices = [...shop.sharedServices, ...shop.uniqueServices]

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parts =
      lang === 'ar'
        ? [
          'مرحباً! ',
          '',
          `الاسم: ${name}`,
          `نوع السيارة: ${carType}`,
          `الخدمة المطلوبة: ${service}`,
          ...(message.trim() ? ['', message.trim()] : []),
        ]
        : [
          'Hello! ',
          '',
          `Name: ${name}`,
          `Car Type: ${carType}`,
          `Required Service: ${service}`,
          ...(message.trim() ? ['', message.trim()] : []),
        ]

    const cleanNumber = waNumber.replace(/[^0-9]/g, '')
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(parts.join('\n'))}`
    window.open(waUrl, '_blank', 'noopener,noreferrer')
    onClose()
  }

  const inputClass =
    'w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-2.5 text-brand-white font-cairo text-sm placeholder-brand-muted focus:outline-none focus:border-[#25d366] transition-colors'
  const labelClass =
    'block text-xs font-semibold text-brand-muted font-cairo mb-1.5 uppercase tracking-wider'

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div
        className={`relative z-10 w-full sm:max-w-md bg-brand-darker border border-brand-border rounded-t-2xl sm:rounded-2xl p-6 sm:p-8 ${isRTL ? 'text-right' : 'text-left'
          }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-10 h-10 rounded-full bg-[#25d366]/10 border border-[#25d366]/20 flex items-center justify-center flex-shrink-0">
              <WAIcon className="text-[#25d366]" size={20} />
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h2 className="font-bold text-brand-white font-cairo text-base leading-none">
                {lang === 'ar' ? 'أرسل رسالة واتساب' : 'Send WhatsApp Message'}
              </h2>
              <p className="text-xs text-brand-muted font-cairo mt-1">{shop.name[lang]}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-brand-muted hover:text-brand-white transition-colors flex-shrink-0"
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className={labelClass}>
              {lang === 'ar' ? 'الاسم' : 'Name'} *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={lang === 'ar' ? 'أدخل اسمك' : 'Enter your name'}
              className={inputClass}
            />
          </div>

          {/* Car type */}
          <div>
            <label className={labelClass}>
              {lang === 'ar' ? 'نوع السيارة' : 'Car Type'} *
            </label>
            <input
              type="text"
              required
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
              placeholder={lang === 'ar' ? 'مثال: تويوتا كامري 2022' : 'e.g. Toyota Camry 2022'}
              className={inputClass}
            />
          </div>

          {/* Service */}
          <div>
            <label className={labelClass}>
              {lang === 'ar' ? 'الخدمة المطلوبة' : 'Required Service'} *
            </label>
            <select
              required
              value={service}
              onChange={(e) => setService(e.target.value)}
              className={inputClass}
            >
              <option value="">{lang === 'ar' ? 'اختر الخدمة' : 'Select a service'}</option>
              {allServices.map((s, i) => (
                <option key={i} value={s[lang]}>
                  {s[lang]}
                </option>
              ))}
            </select>
          </div>

          {/* Free-text message */}
          <div>
            <label className={labelClass}>
              {lang === 'ar' ? 'رسالتك' : 'Your Message'}
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={lang === 'ar' ? 'أي تفاصيل إضافية...' : 'Any additional details...'}
              className={`${inputClass} resize-none`}
            />
          </div>

          <p className="text-xs text-brand-muted font-cairo">
            {lang === 'ar'
              ? '* سيتم فتح تطبيق واتساب مع رسالتك جاهزة للإرسال'
              : '* WhatsApp will open with your message ready to send'}
          </p>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#1ebe5d] text-white font-bold py-3.5 px-4 rounded-xl transition-colors font-cairo text-sm"
          >
            <WAIcon className="text-white" size={18} />
            {lang === 'ar' ? 'فتح واتساب' : 'Open WhatsApp'}
          </button>
        </form>
      </div>
    </div>
  )
}

function WAIcon({ className, size }: { className?: string; size?: number }) {
  return (
    <svg
      width={size ?? 18}
      height={size ?? 18}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}
