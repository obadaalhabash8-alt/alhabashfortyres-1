'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import ShopCard from '@/components/ShopCard'
import { shops, timelineEvents } from '@/lib/shops'

export default function HomePage() {
  const { t, lang, isRTL } = useLanguage()

  return (
    <div className={isRTL ? 'text-right' : 'text-left'}>
      <HeroSection />
      <StorySection />
      <TimelineSection />
      <ShopsSection />
      <CTABanner />
    </div>
  )
}

/* ─── Hero ──────────────────────────────────────────────────────────── */
function HeroSection() {
  const { t, lang, isRTL } = useLanguage()

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-hero-pattern" />
        {/* Orange gradient accent at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-orange" />
      </div>

      {/* Decorative tire track lines */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute h-full w-px bg-white"
            style={{ left: `${(i + 1) * 12.5}%` }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Since badge */}
        <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange-light px-4 py-2 rounded-full text-sm font-cairo mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
          {t.hero.since} {t.hero.year}
        </div>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4 font-cairo leading-tight text-shadow">
          {lang === 'ar' ? 'الحبش للإطارات' : 'Al-Habash Tyres'}
        </h1>

        {/* Tagline */}
        <p className="text-brand-gold text-xl sm:text-2xl font-semibold mb-4 font-cairo">
          {t.hero.tagline}
        </p>

        {/* Description */}
        <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 font-cairo leading-relaxed">
          {t.hero.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shops"
            className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-8 py-4 rounded-2xl text-lg font-cairo transition-all hover:shadow-lg hover:shadow-brand-orange/30 hover:-translate-y-0.5"
          >
            {t.hero.cta_shops}
          </Link>
          <Link
            href="/rate"
            className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-2xl text-lg font-cairo transition-all backdrop-blur-sm"
          >
            {t.hero.cta_rate}
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {[
            { value: lang === 'ar' ? '+٥٥' : '55+', label: lang === 'ar' ? 'سنة خبرة' : 'Years' },
            { value: '3', label: lang === 'ar' ? 'فروع' : 'Branches' },
            { value: lang === 'ar' ? '+١٠٠٠٠' : '10K+', label: lang === 'ar' ? 'عميل راضٍ' : 'Happy Customers' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <p className="text-brand-orange text-2xl sm:text-3xl font-black font-cairo">{stat.value}</p>
              <p className="text-gray-400 text-xs sm:text-sm font-cairo">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" opacity="0.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  )
}

/* ─── Story ──────────────────────────────────────────────────────────── */
function StorySection() {
  const { t, lang, isRTL } = useLanguage()

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${isRTL ? '' : ''}`}>
          {/* Text */}
          <div className="animate-slide-up">
            <span className="text-brand-orange text-sm font-bold uppercase tracking-widest font-cairo">
              {lang === 'ar' ? 'قصتنا' : 'Our Story'}
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-brand-dark mt-2 mb-6 font-cairo leading-tight">
              {t.story.title}
            </h2>
            <p className="text-lg text-brand-gold font-semibold mb-4 font-cairo">
              {t.story.subtitle}
            </p>
            <p className="text-gray-600 leading-relaxed font-cairo text-base sm:text-lg">
              {t.story.body}
            </p>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: '🏆', label: lang === 'ar' ? 'الجودة أولاً' : 'Quality First' },
                { icon: '🤝', label: lang === 'ar' ? 'نبني الثقة' : 'Building Trust' },
                { icon: '⚡', label: lang === 'ar' ? 'خدمة سريعة' : 'Fast Service' },
                { icon: '🔧', label: lang === 'ar' ? 'فنيون محترفون' : 'Pro Technicians' },
              ].map((v) => (
                <div key={v.label} className="flex items-center gap-3 bg-brand-cream rounded-xl p-3">
                  <span className="text-2xl">{v.icon}</span>
                  <span className="text-sm font-semibold text-brand-dark font-cairo">{v.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=600&q=80"
                  alt="Shop interior"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden mt-6">
                <Image
                  src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80"
                  alt="Tyre service"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-brand-orange text-white px-6 py-3 rounded-2xl shadow-xl font-cairo font-bold text-center whitespace-nowrap">
              {lang === 'ar' ? 'منذ ١٩٦٧' : 'Since 1967'} · {lang === 'ar' ? '٥٥+ عاماً' : '55+ Years'}
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

  return (
    <section className="py-20 sm:py-28 bg-brand-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="text-brand-orange text-sm font-bold uppercase tracking-widest font-cairo">
            {lang === 'ar' ? 'تاريخنا' : 'History'}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-brand-dark mt-2 font-cairo">
            {t.timeline.title}
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className={`absolute top-0 bottom-0 w-0.5 bg-brand-gold/40 ${isRTL ? 'right-4 sm:right-1/2' : 'left-4 sm:left-1/2'}`} />

          <div className="space-y-8">
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
                  className={`absolute w-4 h-4 rounded-full bg-brand-orange border-4 border-brand-cream z-10 top-3 ${
                    isRTL ? 'right-2.5 sm:right-[calc(50%-8px)]' : 'left-2.5 sm:left-[calc(50%-8px)]'
                  }`}
                />

                {/* Card */}
                <div
                  className={`w-full sm:w-[calc(50%-2rem)] ${
                    isRTL ? 'pr-10 sm:pr-0 sm:pl-8' : 'pl-10 sm:pl-0 sm:pr-8'
                  } ${
                    i % 2 === 0
                      ? isRTL ? 'sm:pl-8' : 'sm:pr-8'
                      : isRTL ? 'sm:mr-auto sm:pl-0 sm:pr-8' : 'sm:ml-auto sm:pr-0 sm:pl-8'
                  }`}
                >
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <span className="text-brand-orange font-black text-2xl font-cairo">{event.year}</span>
                    <h3 className="text-brand-dark font-bold text-lg font-cairo mt-1">
                      {event.title[lang]}
                    </h3>
                    <p className="text-gray-500 text-sm font-cairo mt-2 leading-relaxed">
                      {event.description[lang]}
                    </p>
                  </div>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden sm:block w-[calc(50%-2rem)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Shops preview ──────────────────────────────────────────────────── */
function ShopsSection() {
  const { t, isRTL } = useLanguage()

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div>
            <span className="text-brand-orange text-sm font-bold uppercase tracking-widest font-cairo">
              {t.shops_section.subtitle}
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-brand-dark mt-1 font-cairo">
              {t.shops_section.title}
            </h2>
          </div>
          <Link
            href="/shops"
            className="flex-shrink-0 text-brand-orange border-2 border-brand-orange hover:bg-brand-orange hover:text-white font-semibold px-6 py-2.5 rounded-xl transition-colors font-cairo text-sm"
          >
            {t.shops_section.view_all}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CTA Banner ─────────────────────────────────────────────────────── */
function CTABanner() {
  const { t, lang, isRTL } = useLanguage()

  return (
    <section className="py-16 sm:py-20 bg-brand-dark relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 rounded-full border-4 border-white"
            style={{
              left: `${(i % 5) * 22}%`,
              top: `${Math.floor(i / 5) * 35}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-orange" />

      <div className={`relative max-w-3xl mx-auto px-4 sm:px-6 text-center ${isRTL ? 'text-right sm:text-center' : 'text-left sm:text-center'}`}>
        <h2 className="text-3xl sm:text-4xl font-black text-white font-cairo mb-4">
          {lang === 'ar' ? 'زرنا اليوم — خدمتك أولويتنا' : 'Visit Us Today — Your Service Is Our Priority'}
        </h2>
        <p className="text-gray-400 font-cairo mb-8 text-lg">
          {lang === 'ar'
            ? 'ثلاثة فروع، خبرة أكثر من ٥٥ عاماً، وفريق متخصص في خدمتكم'
            : 'Three branches, over 55 years of experience, and a specialized team at your service'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/rate"
            className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-8 py-4 rounded-2xl font-cairo transition-all hover:shadow-lg hover:shadow-brand-orange/30"
          >
            {t.hero.cta_rate}
          </Link>
          <Link
            href="/shops"
            className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-2xl font-cairo transition-colors"
          >
            {t.hero.cta_shops}
          </Link>
        </div>
      </div>
    </section>
  )
}
