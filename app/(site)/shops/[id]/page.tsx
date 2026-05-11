'use client'

import { use, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/hooks/useLanguage'
import Gallery from '@/components/Gallery'
import StarRating, { AverageStars } from '@/components/StarRating'
import RatingForm from '@/components/RatingForm'
import { getShopById } from '@/lib/shops'
import WhatsAppModal from '@/components/WhatsAppModal'
import type { Rating } from '@/types'

gsap.registerPlugin(ScrollTrigger)

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ShopDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const shopId = parseInt(id, 10)
  const shop = getShopById(shopId)

  if (!shop || isNaN(shopId)) notFound()

  return <ShopDetailContent shopId={shopId} />
}

function ShopDetailContent({ shopId }: { shopId: number }) {
  const { t, lang, isRTL } = useLanguage()
  const shop = getShopById(shopId)!
  const pageRef = useRef<HTMLDivElement>(null)

  const [ratings, setRatings] = useState<Rating[]>([])
  const [ratingTotal, setRatingTotal] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [loadingRatings, setLoadingRatings] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [avgRating, setAvgRating] = useState(0)
  const [whatsappOpen, setWhatsappOpen] = useState(false)
  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [loadingGallery, setLoadingGallery] = useState(true)

  useEffect(() => {
    fetch(`/api/admin/gallery?shop_id=${shopId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.images?.length) setGalleryImages(d.images.map((i: { url: string }) => i.url))
      })
      .catch(() => {})
      .finally(() => setLoadingGallery(false))
  }, [shopId])

  useEffect(() => {
    async function fetchInitial() {
      try {
        const [ratingsRes, avgRes] = await Promise.all([
          fetch(`/api/ratings?shop_id=${shopId}&page=1`),
          fetch(`/api/average-rating?shop_id=${shopId}`),
        ])
        const ratingsData = await ratingsRes.json()
        const avgData = await avgRes.json()
        setRatings(ratingsData.ratings ?? [])
        setRatingTotal(ratingsData.total ?? 0)
        setHasMore(ratingsData.hasMore ?? false)
        setCurrentPage(1)
        setAvgRating(avgData.average ?? 0)
      } catch {
        // ratings remain empty on error
      } finally {
        setLoadingRatings(false)
      }
    }
    fetchInitial()
  }, [shopId])

  async function loadMore() {
    setLoadingMore(true)
    try {
      const res = await fetch(`/api/ratings?shop_id=${shopId}&page=${currentPage + 1}`)
      const data = await res.json()
      setRatings((prev) => [...prev, ...(data.ratings ?? [])])
      setHasMore(data.hasMore ?? false)
      setCurrentPage((p) => p + 1)
    } catch {
      // silently ignore load-more errors
    } finally {
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.detail-section',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.detail-main', start: 'top 85%' },
        }
      )
      gsap.fromTo(
        '.service-badge',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: '.services-grid', start: 'top 85%' },
        }
      )
    }, pageRef)
    return () => ctx.revert()
  }, [])

  function onRatingSubmitted() {
    // Reset to page 1 so the new review appears at the top
    Promise.all([
      fetch(`/api/ratings?shop_id=${shopId}&page=1`).then((r) => r.json()),
      fetch(`/api/average-rating?shop_id=${shopId}`).then((r) => r.json()),
    ]).then(([ratingsData, avgData]) => {
      setRatings(ratingsData.ratings ?? [])
      setRatingTotal(ratingsData.total ?? 0)
      setHasMore(ratingsData.hasMore ?? false)
      setCurrentPage(1)
      setAvgRating(avgData.average ?? 0)
    }).catch(() => {})
  }

  return (
    <div ref={pageRef} className={`min-h-screen bg-brand-dark ${isRTL ? 'text-right' : 'text-left'}`}>

      {/* Hero */}
      <div className="relative h-72 sm:h-96 bg-brand-darker overflow-hidden">
        <Image
          src={shop.coverImage}
          alt={shop.name[lang]}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-brand-dark" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />



        {/* Founded badge */}
        {shop.founded && (
          <div className={`absolute top-20 sm:top-6 ${isRTL ? 'left-4 sm:left-8' : 'right-4 sm:right-8'} bg-brand-orange text-white text-xs font-bold px-3 py-1.5 rounded-lg font-cairo`}>
            {t.common.since} {shop.founded}
          </div>
        )}

        {/* Title */}
        <div className={`absolute bottom-8 ${isRTL ? 'right-4 sm:right-8' : 'left-4 sm:left-8'}`}>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-cairo text-shadow leading-tight">
            {shop.name[lang]}
          </h1>
          <p className="text-brand-gold font-cairo text-sm mt-1.5">{shop.tagline[lang]}</p>
        </div>
      </div>

      {/* Body */}
      <div className="detail-main max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-14">

            {/* Description */}
            <section className="detail-section">
              <p className="text-brand-secondary font-cairo leading-relaxed text-base sm:text-lg">
                {shop.description[lang]}
              </p>
            </section>

            {/* Services */}
            <section className="detail-section">
              <SectionTitle>{t.shop.services_title}</SectionTitle>

              <div className="mb-8">
                <h3 className="text-brand-muted font-semibold font-cairo mb-4 text-sm uppercase tracking-widest flex items-center gap-2">
                  <span className="w-3 h-px bg-brand-orange inline-block" />
                  {t.shop.shared_services}
                </h3>
                <div className="services-grid grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {shop.sharedServices.map((s, i) => (
                    <ServiceBadge key={i} label={s[lang]} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-brand-muted font-semibold font-cairo mb-4 text-sm uppercase tracking-widest flex items-center gap-2">
                  <span className="w-3 h-px bg-brand-gold inline-block" />
                  {t.shop.unique_services}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {shop.uniqueServices.map((s, i) => (
                    <ServiceBadge key={i} label={s[lang]} accent />
                  ))}
                </div>
              </div>
            </section>

            {/* Gallery */}
            <section className="detail-section">
              <SectionTitle>{t.shop.gallery_title}</SectionTitle>
              {loadingGallery ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="aspect-square rounded-xl bg-brand-surface-2 animate-pulse" />
                  ))}
                </div>
              ) : (
                <Gallery images={galleryImages} altPrefix={shop.name[lang]} />
              )}
            </section>

            {/* Reviews */}
            <section className="detail-section">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <SectionTitle>{t.shop.ratings_title}</SectionTitle>
                  {!loadingRatings && ratingTotal > 0 && (
                    <AverageStars rating={avgRating} count={ratingTotal} />
                  )}
                </div>
                {!loadingRatings && ratingTotal > 0 && (
                  <span className="text-xs text-brand-muted font-cairo flex-shrink-0">
                    {lang === 'ar'
                      ? `عرض ${ratings.length} من ${ratingTotal} تقييم`
                      : `Showing ${ratings.length} of ${ratingTotal} reviews`}
                  </span>
                )}
              </div>

              {loadingRatings ? (
                <LoadingSpinner />
              ) : ratings.length === 0 ? (
                <EmptyRatings />
              ) : (
                <>
                  <div className="space-y-4">
                    {ratings.map((r) => (
                      <RatingCard key={r.id} rating={r} isRTL={isRTL} />
                    ))}
                  </div>

                  {hasMore && (
                    <div className="mt-6 text-center">
                      <button
                        onClick={loadMore}
                        disabled={loadingMore}
                        className="px-6 py-2.5 border border-brand-border text-brand-secondary hover:border-brand-orange hover:text-brand-orange rounded-xl font-cairo font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                      >
                        {loadingMore ? (
                          <>
                            <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                            {lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}
                          </>
                        ) : (
                          lang === 'ar' ? 'عرض المزيد من التقييمات' : 'Load more reviews'
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>

            {/* Inline rating form */}
            <section id="rate-form" className="detail-section">
              <SectionTitle>{t.shop.rate_this_shop}</SectionTitle>
              <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8">
                <RatingForm shopId={shopId} onSuccess={onRatingSubmitted} />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
              <SectionTitle>{t.shop.contact_title}</SectionTitle>

              {/* Hours */}
              <div className="mb-6">
                <p className="text-xs text-brand-muted font-cairo mb-1 uppercase tracking-widest">{t.shop.working_hours}</p>
                <p className="text-sm text-brand-white font-cairo font-medium">{shop.workingHours[lang]}</p>
              </div>

              {/* Call */}
              <a
                href={`tel:${shop.phone}`}
                className="flex items-center justify-center gap-2 w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-3.5 px-4 rounded-xl transition-colors font-cairo mb-3 text-sm"
              >
                <PhoneIcon />
                {t.shop.call_now}
              </a>

              {/* WhatsApp — opens inquiry modal */}
              {shop.whatsapp && (
                <button
                  onClick={() => setWhatsappOpen(true)}
                  className="flex items-center justify-center gap-2 w-full bg-[#25d366] hover:bg-[#1ebe5d] text-white font-bold py-3.5 px-4 rounded-xl transition-colors font-cairo mb-5 text-sm"
                >
                  <WhatsAppIcon />
                  {t.shop.whatsapp}
                </button>
              )}

              {/* Address */}
              <div className="pt-5 border-t border-brand-border">
                <p className="text-xs text-brand-muted font-cairo mb-1 uppercase tracking-widest">{lang === 'ar' ? 'العنوان' : 'Address'}</p>
                <p className="text-sm text-brand-secondary font-cairo">{shop.address[lang]}</p>
                <p className="text-sm text-brand-muted font-cairo">{shop.city[lang]}</p>
              </div>

              {/* Phone */}
              <div className="mt-4 pt-4 border-t border-brand-border">
                <p className="text-xs text-brand-muted font-cairo mb-1 uppercase tracking-widest">{lang === 'ar' ? 'الهاتف' : 'Phone'}</p>
                <p className="text-sm text-brand-secondary font-cairo font-medium" dir="ltr">{shop.phone}</p>
              </div>
            </div>

            {/* Map */}
            <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden">
              <div className="relative w-full h-52">
                <iframe
                  src={shop.mapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(20%) contrast(1.1)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map — ${shop.name[lang]}`}
                  className="w-full h-full"
                />
              </div>
              <div className="p-4">
                <a
                  href={shop.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full border border-brand-border text-brand-secondary hover:border-brand-orange hover:text-brand-orange font-semibold py-2.5 px-4 rounded-xl transition-all font-cairo text-sm"
                >
                  <MapPinIcon />
                  {t.shop.open_maps}
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
      <WhatsAppModal
        isOpen={whatsappOpen}
        onClose={() => setWhatsappOpen(false)}
        shop={shop}
      />
    </div>
  )
}

/* ─── Sub-components ─────────────────────────────────────────────────── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl sm:text-2xl font-black text-brand-white font-cairo mb-5 flex items-center gap-3">
      <span className="w-1 h-5 rounded-full bg-brand-orange inline-block flex-shrink-0" />
      {children}
    </h2>
  )
}

function ServiceBadge({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <div
      className={`service-badge flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-cairo ${accent
          ? 'bg-brand-gold/8 text-brand-secondary border border-brand-gold/20'
          : 'bg-brand-surface-2 text-brand-secondary border border-brand-border'
        }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${accent ? 'bg-brand-gold' : 'bg-brand-orange'}`} />
      {label}
    </div>
  )
}

function RatingCard({ rating, isRTL }: { rating: Rating; isRTL: boolean }) {
  return (
    <div className={`bg-brand-surface border border-brand-border rounded-2xl p-5 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className="flex items-start justify-between gap-4 mb-2">
        <div>
          <p className="font-bold text-brand-white font-cairo text-sm">{rating.name}</p>
          <StarRating value={rating.rating} size="sm" />
        </div>
        <p className="text-xs text-brand-muted font-cairo flex-shrink-0">
          {new Date(rating.created_at).toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' })}
        </p>
      </div>
      {rating.comment && (
        <p className="text-brand-secondary text-sm font-cairo leading-relaxed mt-2">{rating.comment}</p>
      )}
    </div>
  )
}

function EmptyRatings() {
  const { t } = useLanguage()
  return (
    <div className="py-10 text-center bg-brand-surface border border-brand-border rounded-2xl">
      <div className="w-10 h-10 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center mx-auto mb-4">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-orange">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </div>
      <p className="text-brand-muted font-cairo text-sm">{t.shop.no_ratings}</p>
    </div>
  )
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center py-10">
      <div className="w-7 h-7 rounded-full border-2 border-brand-orange border-t-transparent animate-spin" />
    </div>
  )
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.62 4.89 2 2 0 0 1 3.59 2.7h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l.89-.89a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.63 17.5z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
