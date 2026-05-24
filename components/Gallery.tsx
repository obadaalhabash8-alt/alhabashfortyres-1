'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import 'yet-another-react-lightbox/styles.css'
import { useLanguage } from '@/hooks/useLanguage'

const Lightbox = dynamic(() => import('yet-another-react-lightbox'), { ssr: false })

interface Props {
  images: string[]
  altPrefix?: string
}

export default function Gallery({ images, altPrefix = 'Shop image' }: Props) {
  const { t } = useLanguage()
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1)

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), [])

  if (!images.length) return null

  return (
    <>
      {/* Thumbnail grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => openLightbox(i)}
            className="relative aspect-square rounded-xl overflow-hidden bg-brand-surface-2 group focus:outline-none focus:ring-2 focus:ring-brand-orange"
            aria-label={`${altPrefix} ${i + 1}`}
          >
            <Image
              src={src}
              alt={`${altPrefix} ${i + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <ZoomIcon className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8" />
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={images.map((src) => ({ src }))}
        on={{ view: ({ index }) => setLightboxIndex(index) }}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
        }}
        carousel={{ finite: false }}
        animation={{ swipe: 300 }}
      />
    </>
  )
}

function ZoomIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  )
}
