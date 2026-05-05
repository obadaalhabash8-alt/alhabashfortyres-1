'use client'

import { useState } from 'react'

interface Props {
  value: number
  onChange?: (rating: number) => void
  interactive?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = { sm: 18, md: 26, lg: 36 }

export default function StarRating({ value, onChange, interactive = false, size = 'md' }: Props) {
  const [hovered, setHovered] = useState(0)
  const px = sizeMap[size]
  const display = interactive ? (hovered || value) : value

  return (
    <div className="flex items-center gap-1" role={interactive ? 'radiogroup' : undefined} aria-label="Star rating">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= display
        const isPartial = !filled && star - 1 < display && display < star

        return (
          <button
            key={star}
            type={interactive ? 'button' : undefined}
            disabled={!interactive}
            onClick={() => interactive && onChange?.(star)}
            onMouseEnter={() => interactive && setHovered(star)}
            onMouseLeave={() => interactive && setHovered(0)}
            className={interactive ? 'cursor-pointer transition-transform hover:scale-110 focus:outline-none' : 'cursor-default'}
            aria-label={`${star} star${star !== 1 ? 's' : ''}`}
          >
            <StarIcon
              size={px}
              filled={filled}
              partial={isPartial}
              partialPercent={isPartial ? (display - Math.floor(display)) * 100 : 0}
            />
          </button>
        )
      })}
    </div>
  )
}

function StarIcon({
  size,
  filled,
  partial,
  partialPercent,
}: {
  size: number
  filled: boolean
  partial: boolean
  partialPercent: number
}) {
  const id = `partial-${Math.random().toString(36).slice(2, 7)}`
  const colorOrange = '#F97316'
  const colorMuted = '#27272A'

  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      {partial && (
        <defs>
          <linearGradient id={id}>
            <stop offset={`${partialPercent}%`} stopColor={colorOrange} />
            <stop offset={`${partialPercent}%`} stopColor={colorMuted} />
          </linearGradient>
        </defs>
      )}
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={filled ? colorOrange : partial ? `url(#${id})` : colorMuted}
        stroke={filled || partial ? colorOrange : colorMuted}
        strokeWidth="0.5"
      />
    </svg>
  )
}

// Display-only component for average ratings
export function AverageStars({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <StarRating value={rating} size="sm" />
      <span className="text-white font-bold text-sm">{rating.toFixed(1)}</span>
      <span className="text-brand-secondary text-xs">({count})</span>
    </div>
  )
}
