'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/hooks/useLanguage'
import ShopCard from '@/components/ShopCard'
import { shops, timelineEvents } from '@/lib/shops'

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  return (
    <div className="text-right">
      <HeroSection />
      <StorySection />
      <TimelineSection />
      <BranchesSection />
    </div>
  )
}

/* ─── Hero ──────────────────────────────────────────────────────────── */
function HeroSection() {
  const { t, lang } = useLanguage()
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-badge', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.2 })
      gsap.fromTo('.hero-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.4 })
      gsap.fromTo('.hero-tagline', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.65 })
      gsap.fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.85 })
      gsap.fromTo('.hero-stats > *', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out', delay: 1.0 })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    // -mt-16 sm:-mt-20 pulls the hero up behind the navbar so the photo fills edge-to-edge
    <section ref={containerRef} className="relative -mt-16 sm:-mt-20 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-[#0F0F0F]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* Orange bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-brand-orange/60" />

      {/* Content — pt accounts for navbar height */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center pt-24 sm:pt-28">
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2.5 border border-brand-orange/30 bg-brand-orange/10 text-brand-orange px-5 py-2 rounded-full text-xs font-cairo font-semibold uppercase tracking-widest mb-10 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
          {lang === 'ar' ? 'منذ ١٩٦٧' : 'Est. 1967'} — {lang === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia'}
        </div>

        {/* Heading — always white on photo */}
        <h1 className="hero-title text-5xl sm:text-7xl lg:text-8xl font-black text-white font-cairo leading-none tracking-tight mb-6 text-shadow">
          {lang === 'ar' ? (
            <>
              <span className="block">الحبش</span>
              <span className="block text-brand-orange">للإطارات</span>
            </>
          ) : (
            <>
              <span className="block">Al-Habash</span>
              <span className="block text-brand-orange">Tyres</span>
            </>
          )}
        </h1>

        {/* Tagline */}
        <p className="hero-tagline text-white/80 text-lg sm:text-xl font-cairo font-light max-w-xl mx-auto mb-12 leading-relaxed">
          {t.hero.tagline}
        </p>

        {/* CTA */}
        <div className="hero-cta">
          <Link
            href="/shops"
            className="inline-flex items-center gap-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-10 py-4 rounded-xl text-base font-cairo transition-all duration-300 hover:shadow-xl hover:shadow-brand-orange/25 hover:-translate-y-0.5"
          >
            {t.hero.cta_shops}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* Stats */}
        <div className="hero-stats mt-20 grid grid-cols-3 gap-px max-w-md mx-auto border border-white/10 rounded-2xl overflow-hidden bg-white/10">
          {[
            { value: lang === 'ar' ? '+٥٥' : '55+', label: lang === 'ar' ? 'سنة خبرة' : 'Years' },
            { value: '3', label: lang === 'ar' ? 'فروع' : 'Branches' },
            { value: lang === 'ar' ? '+١٠ آلاف' : '10K+', label: lang === 'ar' ? 'عميل' : 'Customers' },
          ].map((stat) => (
            <div key={stat.label} className="bg-black/30 backdrop-blur-sm px-4 py-5 text-center">
              <p className="text-brand-orange text-2xl sm:text-3xl font-black font-cairo">{stat.value}</p>
              <p className="text-white/60 text-xs font-cairo mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-orange animate-[scrollArrow_1.4s_ease-in-out_infinite]">
          <polyline points="6 9 12 15 18 9" />
        </svg>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-orange/50 animate-[scrollArrow_1.4s_ease-in-out_0.2s_infinite]">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  )
}

/* ─── Story ──────────────────────────────────────────────────────────── */
function StorySection() {
  const { t, lang } = useLanguage()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.story-text',
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, ease: 'power2.out',
          scrollTrigger: { trigger: '.story-text', start: 'top 88%', end: 'top 30%', scrub: 0.8 },
        }
      )
      gsap.fromTo(
        '.story-images',
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, ease: 'power2.out',
          scrollTrigger: { trigger: '.story-images', start: 'top 88%', end: 'top 30%', scrub: 0.8 },
        }
      )
      const values = gsap.utils.toArray<HTMLElement>('.story-value')
      values.forEach((v) => {
        gsap.fromTo(
          v,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, ease: 'power2.out',
            scrollTrigger: { trigger: v, start: 'top 88%', end: 'top 50%', scrub: 0.8 },
          }
        )
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const values = [
    { label: lang === 'ar' ? 'الجودة أولاً' : 'Quality First' },
    { label: lang === 'ar' ? 'نبني الثقة' : 'Building Trust' },
    { label: lang === 'ar' ? 'خدمة سريعة' : 'Fast Service' },
    { label: lang === 'ar' ? 'فنيون محترفون' : 'Pro Technicians' },
  ]

  return (
    <section id="story" ref={ref} className="py-24 sm:py-32 bg-brand-dark">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <div className="story-text">
            <span className="text-brand-orange text-xs font-bold uppercase tracking-widest font-cairo">
              {lang === 'ar' ? 'قصتنا' : 'Our Story'}
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-brand-white mt-3 mb-5 font-cairo leading-tight">
              {t.story.title}
            </h2>
            <p className="text-brand-gold text-base font-semibold mb-5 font-cairo">
              {t.story.subtitle}
            </p>
            <p className="text-brand-muted leading-relaxed font-cairo text-base sm:text-lg">
              {t.story.body}
            </p>

            <div className="story-values grid grid-cols-2 gap-3 mt-10">
              {values.map((v) => (
                <div
                  key={v.label}
                  className="story-value flex items-center gap-3 bg-brand-surface border border-brand-border rounded-xl p-3.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0" />
                  <span className="text-sm font-semibold text-brand-secondary font-cairo">{v.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="story-images relative">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative h-52 sm:h-72 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=600&q=80"
                  alt="Shop interior"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="relative h-52 sm:h-72 rounded-2xl overflow-hidden mt-8">
                <Image
                  src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80"
                  alt="Tyre service"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-brand-orange text-white px-6 py-3 rounded-xl shadow-xl shadow-brand-orange/20 font-cairo font-bold text-sm whitespace-nowrap">
              {lang === 'ar' ? 'منذ ١٩٦٧ · أكثر من ٥٥ عاماً' : 'Since 1967 · 55+ Years'}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Timeline ───────────────────────────────────────────────────────── */
function TimelineSection() {
  const { t, lang, isRTL } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!cardsRef.current) return

      const cards = gsap.utils.toArray<HTMLElement>(cardsRef.current.children)

      cards.forEach((card) => {
        // Each card fades/slides in and out based on its scroll position — scrub makes it bidirectional
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',   // card enters: start of reveal
              end: 'top 30%',     // card fully revealed
              scrub: 0.8,         // smooth, tied to scroll direction (up AND down)
            },
          }
        )
      })

      // Animate the title in once
      gsap.fromTo(
        '.timeline-heading',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.timeline-heading', start: 'top 85%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="journey" ref={sectionRef} className="py-24 sm:py-32 bg-brand-dark">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="timeline-heading text-center mb-16">
          <span className="text-brand-orange text-xs font-bold uppercase tracking-widest font-cairo">
            {lang === 'ar' ? 'تاريخنا' : 'History'}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-brand-white mt-3 font-cairo">
            {t.timeline.title}
          </h2>
        </div>

        <div className="relative">
          {/* Center line */}
          <div className={`absolute top-0 bottom-0 w-px bg-brand-border ${isRTL ? 'right-4 sm:right-1/2' : 'left-4 sm:left-1/2'}`} />

          {/* Cards container — children are animated individually via cardsRef */}
          <div ref={cardsRef} className="space-y-10">
            {timelineEvents.map((event, i) => (
              <div
                key={event.year}
                className={`relative flex items-start gap-6 sm:gap-0 ${
                  i % 2 === 0
                    ? isRTL ? 'sm:flex-row-reverse' : 'sm:flex-row'
                    : isRTL ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div
                  className={`absolute w-3 h-3 rounded-full bg-brand-orange border-2 border-brand-dark z-10 top-4 ${
                    isRTL ? 'right-2.5 sm:right-[calc(50%-6px)]' : 'left-2.5 sm:left-[calc(50%-6px)]'
                  }`}
                />

                {/* Card */}
                <div
                  className={`w-full sm:w-[calc(50%-2rem)] ${
                    isRTL ? 'pr-10 sm:pr-0 sm:pl-10' : 'pl-10 sm:pl-0 sm:pr-10'
                  } ${
                    i % 2 === 0
                      ? isRTL ? 'sm:pl-10' : 'sm:pr-10'
                      : isRTL ? 'sm:mr-auto sm:pl-0 sm:pr-10' : 'sm:ml-auto sm:pr-0 sm:pl-10'
                  }`}
                >
                  <div className="bg-brand-surface border border-brand-border rounded-2xl p-5 hover:border-brand-orange/30 transition-colors">
                    <span className="text-brand-orange font-black text-2xl font-cairo">{event.year}</span>
                    <h3 className="text-brand-white font-bold text-base font-cairo mt-1">
                      {event.title[lang]}
                    </h3>
                    <p className="text-brand-muted text-sm font-cairo mt-2 leading-relaxed">
                      {event.description[lang]}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block w-[calc(50%-2rem)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Branches ───────────────────────────────────────────────────────── */
function BranchesSection() {
  const { t, lang } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.branches-heading',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.branches-heading', start: 'top 85%' },
        }
      )

      if (!cardsRef.current) return
      const cards = gsap.utils.toArray<HTMLElement>(cardsRef.current.children)
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 88%', end: 'top 30%', scrub: 0.8 },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="branches" ref={sectionRef} className="py-24 sm:py-32 bg-brand-darker">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="branches-heading text-center mb-16">
          <span className="text-brand-orange text-xs font-bold uppercase tracking-widest font-cairo">
            {lang === 'ar' ? 'فروعنا' : 'Our Branches'}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-brand-white mt-3 font-cairo">
            {t.shops_section.title}
          </h2>
          <p className="text-brand-secondary mt-4 font-cairo text-base max-w-lg mx-auto">
            {lang === 'ar'
              ? 'اختر أقرب فرع إليك واكتشف خدماتنا الشاملة'
              : 'Choose the branch nearest to you and discover our full range of services'}
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {shops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      </div>
    </section>
  )
}
