'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import type { Shop } from '@/types'

interface Props {
  shop: Shop
  avgRating?: number
  ratingCount?: number
}

export default function ShopCard({ shop, avgRating, ratingCount }: Props) {
  const { t, lang, isRTL } = useLanguage()

  return (
    <div className="group bg-brand-surface border border-brand-border rounded-2xl overflow-hidden card-hover">
      {/* Cover image */}
      <div className="relative h-52 sm:h-56 overflow-hidden bg-brand-darker">
        <Image
          src={shop.coverImage}
          alt={shop.name[lang]}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-card-gradient" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Founded badge */}
        {shop.founded && (
          <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} bg-brand-orange text-white text-[11px] font-bold px-2.5 py-1 rounded-lg font-cairo tracking-wide`}>
            {t.common.since} {shop.founded}
          </div>
        )}

        {/* Rating badge */}
        {avgRating !== undefined && avgRating > 0 && (
          <div className={`absolute bottom-3 ${isRTL ? 'left-3' : 'right-3'} bg-black/70 backdrop-blur-sm text-white text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 border border-white/10`}>
            <StarIcon />
            <span className="font-bold">{avgRating.toFixed(1)}</span>
            {ratingCount !== undefined && (
              <span className="text-brand-secondary">({ratingCount})</span>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`p-5 ${isRTL ? 'text-right' : 'text-left'}`}>
        <h3 className="text-brand-white font-bold text-lg mb-1.5 font-cairo leading-snug">
          {shop.name[lang]}
        </h3>
        <p className="text-brand-secondary text-sm mb-2 font-cairo flex items-center gap-1.5">
          <LocationIcon />
          {shop.address[lang]}, {shop.city[lang]}
        </p>
        <p className="text-brand-muted text-sm leading-relaxed font-cairo line-clamp-2 mb-5">
          {shop.description[lang]}
        </p>

        {/* Services preview */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {shop.sharedServices.slice(0, 3).map((s, i) => (
            <span
              key={i}
              className="bg-brand-surface-2 text-brand-secondary text-xs px-2.5 py-1 rounded-lg font-cairo border border-brand-border"
            >
              {s[lang]}
            </span>
          ))}
          {shop.sharedServices.length > 3 && (
            <span className="bg-brand-orange/10 text-brand-orange text-xs px-2.5 py-1 rounded-lg font-cairo border border-brand-orange/20">
              +{shop.sharedServices.length - 3}
            </span>
          )}
        </div>

        <Link
          href={`/shops/${shop.id}`}
          className="w-full flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 font-cairo text-sm hover:shadow-lg hover:shadow-brand-orange/20"
        >
          {t.shops_section.view_details}
          <ArrowIcon isRTL={isRTL} />
        </Link>
      </div>
    </div>
  )
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" className="text-brand-orange">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 text-brand-orange">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function ArrowIcon({ isRTL }: { isRTL: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      className={isRTL ? 'rotate-180' : ''}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}
