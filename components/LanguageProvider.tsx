'use client'

import React, { createContext, useState, useEffect, useCallback } from 'react'
import type { Language } from '@/types'
import ar from '@/locales/ar'
import en from '@/locales/en'
import type { Translations } from '@/locales/ar'

interface LanguageContextValue {
  lang: Language
  t: Translations
  toggleLanguage: () => void
  isRTL: boolean
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('ar')

  useEffect(() => {
    // Layout is always RTL — only the language attribute changes for accessibility
    document.documentElement.dir = 'rtl'
    document.documentElement.lang = lang
    localStorage.setItem('lang', lang)
  }, [lang])

  const toggleLanguage = useCallback(() => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'))
  }, [])

  const t = lang === 'ar' ? ar : en

  return (
    // isRTL is always true — direction never flips
    <LanguageContext.Provider value={{ lang, t, toggleLanguage, isRTL: true }}>
      {children}
    </LanguageContext.Provider>
  )
}
