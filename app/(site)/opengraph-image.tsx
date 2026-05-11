import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'شركة الحبش للإطارات | Al-Habash Tyres — Since 1967'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: '#0F0F0F',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Orange accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: '#F97316',
          }}
        />

        {/* Brand name Arabic */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: '#F97316',
            letterSpacing: '-2px',
            lineHeight: 1,
          }}
        >
          شركة الحبش للإطارات
        </div>

        {/* Brand name English */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: '#FAFAF9',
            marginTop: 16,
            letterSpacing: '-1px',
          }}
        >
          Al-Habash Tyres
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            color: '#9CA3AF',
            marginTop: 20,
            letterSpacing: '0.5px',
          }}
        >
          Since 1967 · 3 Branches · Riyadh & Damascus
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: '#D4AF37',
          }}
        />
      </div>
    ),
    size
  )
}
