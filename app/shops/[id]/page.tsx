'use client'

import { use, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useLanguage } from '@/hooks/useLanguage'
import Gallery from '@/components/Gallery'
import StarRating, { AverageStars } from '@/components/StarRating'
import { getShopById } from '@/lib/shops'
import type { Rating } from '@/types'

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

  const [ratings, setRatings] = useState<Rating[]>([])
  const [avgRating, setAvgRating] = useState(0)
  const [loadingRatings, setLoadingRatings] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [ratingsRes, avgRes] = await Promise.all([
          fetch(`/api/ratings?shop_id=${shopId}`),
          fetch(`/api/average-rating?shop_id=${shopId}`),
        ])
        const ratingsData = await ratingsRes.json()
        const avgData = await avgRes.json()
        setRatings(ratingsData.ratings ?? [])
        setAvgRating(avgData.average ?? 0)
      } catch {
        // ratings remain empty on error
      } finally {
        setLoadingRatings(false)
      }
    }
    fetchData()
  }, [shopId])

  return (
    <div className={`min-h-screen ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Hero image */}
      <div className="relative h-64 sm:h-80 lg:h-96 bg-brand-dark overflow-hidden">
        <Image
          src={shop.coverImage}
          alt={shop.name[lang]}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-orange" />

        {/* Back button */}
        <Link
          href="/shops"
          className={`absolute top-6 ${isRTL ? 'right-4 sm:right-8' : 'left-4 sm:left-8'} flex items-center gap-2 bg-black/50 text-white px-4 py-2 rounded-xl backdrop-blur-sm hover:bg-black/70 transition-colors font-cairo text-sm`}
        >
          <BackArrow isRTL={isRTL} />
          {t.common.back}
        </Link>

        {/* Title overlay */}
        <div className={`absolute bottom-6 ${isRTL ? 'right-4 sm:right-8' : 'left-4 sm:left-8'}`}>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-cairo text-shadow">
            {shop.name[lang]}
          </h1>
          <p className="text-brand-gold font-cairo text-sm mt-1">{shop.tagline[lang]}</p>
        </div>

        {/* Founded badge */}
        {shop.founded && (
          <div className={`absolute top-6 ${isRTL ? 'left-4 sm:left-8' : 'right-4 sm:right-8'} bg-brand-orange text-white text-sm font-bold px-3 py-1.5 rounded-full font-cairo`}>
            {t.common.since} {shop.founded}
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-14">
        {/* Overview grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Description + services */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <p className="text-gray-600 font-cairo leading-relaxed text-base sm:text-lg">
                {shop.description[lang]}
              </p>
            </section>

            {/* Services */}
            <section>
              <SectionTitle>{t.shop.services_title}</SectionTitle>

              {/* Shared services */}
              <div className="mb-6">
                <h3 className="text-brand-dark font-semibold font-cairo mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-orange inline-block" />
                  {t.shop.shared_services}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {shop.sharedServices.map((s, i) => (
                    <ServiceBadge key={i} label={s[lang]} icon="🔧" />
                  ))}
                </div>
              </div>

              {/* Unique services */}
              <div>
                <h3 className="text-brand-dark font-semibold font-cairo mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-gold inline-block" />
                  {t.shop.unique_services}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {shop.uniqueServices.map((s, i) => (
                    <ServiceBadge key={i} label={s[lang]} icon="⭐" accent />
                  ))}
                </div>
              </div>
            </section>

            {/* Gallery */}
            <section>
              <SectionTitle>{t.shop.gallery_title}</SectionTitle>
              <Gallery images={shop.images} altPrefix={shop.name[lang]} />
            </section>

            {/* Ratings list */}
            <section>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <SectionTitle>{t.shop.ratings_title}</SectionTitle>
                  {!loadingRatings && ratings.length > 0 && (
                    <AverageStars rating={avgRating} count={ratings.length} />
                  )}
                </div>
                <Link
                  href={`/rate?shop=${shopId}`}
                  className="flex-shrink-0 bg-brand-orange hover:bg-brand-orange-dark text-white px-5 py-2.5 rounded-xl font-cairo font-semibold text-sm transition-colors"
                >
                  {t.shop.rate_this_shop}
                </Link>
              </div>

              {loadingRatings ? (
                <LoadingSpinner />
              ) : ratings.length === 0 ? (
                <EmptyRatings message={t.shop.no_ratings} shopId={shopId} t={t} />
              ) : (
                <div className="space-y-4">
                  {ratings.map((r) => (
                    <RatingCard key={r.id} rating={r} isRTL={isRTL} />
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Sidebar: contact + map */}
          <div className="space-y-6">
            {/* Contact card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-20">
              <SectionTitle>{t.shop.contact_title}</SectionTitle>

              {/* Working hours */}
              <div className="mb-5">
                <p className="text-xs text-gray-400 font-cairo mb-1">{t.shop.working_hours}</p>
                <p className="text-sm text-brand-dark font-cairo font-medium">{shop.workingHours[lang]}</p>
              </div>

              {/* Call button */}
              <a
                href={`tel:${shop.phone}`}
                className="flex items-center justify-center gap-2 w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-bold py-3.5 px-4 rounded-xl transition-colors font-cairo mb-3"
              >
                <PhoneIcon />
                {t.shop.call_now}
              </a>

              {/* WhatsApp */}
              {shop.whatsapp && (
                <a
                  href={`https://wa.me/${shop.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 px-4 rounded-xl transition-colors font-cairo mb-4"
                >
                  <WhatsAppIcon />
                  {t.shop.whatsapp}
                </a>
              )}

              {/* Address */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 font-cairo mb-1">{lang === 'ar' ? 'العنوان' : 'Address'}</p>
                <p className="text-sm text-brand-dark font-cairo">{shop.address[lang]}</p>
                <p className="text-sm text-gray-500 font-cairo">{shop.city[lang]}</p>
              </div>

              {/* Phone (display) */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-400 font-cairo mb-1">{lang === 'ar' ? 'الهاتف' : 'Phone'}</p>
                <p className="text-sm text-brand-dark font-cairo font-medium" dir="ltr">{shop.phone}</p>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="relative w-full h-52">
                <iframe
                  src={shop.mapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
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
                  className="flex items-center justify-center gap-2 w-full border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white font-semibold py-2.5 px-4 rounded-xl transition-colors font-cairo text-sm"
                >
                  <MapPinIcon />
                  {t.shop.open_maps}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Sub-components ─────────────────────────────────────────────────── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl sm:text-2xl font-black text-brand-dark font-cairo mb-4 flex items-center gap-2">
      <span className="w-1 h-6 rounded-full bg-brand-orange inline-block" />
      {children}
    </h2>
  )
}

function ServiceBadge({ label, icon, accent = false }: { label: string; icon: string; accent?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-cairo ${
        accent
          ? 'bg-brand-gold/10 text-brand-dark border border-brand-gold/30'
          : 'bg-brand-cream text-brand-dark border border-gray-200'
      }`}
    >
      <span className="text-base">{icon}</span>
      {label}
    </div>
  )
}

function RatingCard({ rating, isRTL }: { rating: Rating; isRTL: boolean }) {
  return (
    <div className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className="flex items-start justify-between gap-4 mb-2">
        <div>
          <p className="font-bold text-brand-dark font-cairo">{rating.name}</p>
          <StarRating value={rating.rating} size="sm" />
        </div>
        <p className="text-xs text-gray-400 font-cairo flex-shrink-0">
          {new Date(rating.created_at).toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' })}
        </p>
      </div>
      {rating.comment && (
        <p className="text-gray-600 text-sm font-cairo leading-relaxed mt-2">{rating.comment}</p>
      )}
    </div>
  )
}

function EmptyRatings({ message, shopId, t }: { message: string; shopId: number; t: any }) {
  return (
    <div className="text-center py-10 bg-white rounded-2xl border border-gray-100">
      <p className="text-4xl mb-3">⭐</p>
      <p className="text-gray-500 font-cairo mb-4">{message}</p>
      <Link
        href={`/rate?shop=${shopId}`}
        className="inline-flex items-center gap-2 bg-brand-orange text-white px-6 py-2.5 rounded-xl font-cairo font-semibold text-sm hover:bg-brand-orange-dark transition-colors"
      >
        {t.shop.rate_this_shop}
      </Link>
    </div>
  )
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center py-10">
      <div className="w-8 h-8 rounded-full border-4 border-brand-orange border-t-transparent animate-spin" />
    </div>
  )
}

function BackArrow({ isRTL }: { isRTL: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={isRTL ? '' : 'rotate-180'}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.62 4.89 2 2 0 0 1 3.59 2.7h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l.89-.89a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.63 17.5z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
