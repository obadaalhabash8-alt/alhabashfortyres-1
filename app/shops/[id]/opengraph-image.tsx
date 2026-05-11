import { ImageResponse } from 'next/og'
import { getShopById } from '@/lib/shops'

export const runtime = 'edge'
export const alt = 'Al-Habash Tyres'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OG({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const shop = getShopById(parseInt(id, 10))

  const nameAr = shop?.name.ar ?? 'شركة الحبش للإطارات'
  const nameEn = shop?.name.en ?? 'Al-Habash Tyres'
  const tagline = shop?.tagline.en ?? 'Quality you can trust since 1967'
  const city = shop?.city.en ?? 'Saudi Arabia'

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
        {/* Top orange bar */}
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

        {/* Parent brand */}
        <div
          style={{
            fontSize: 20,
            color: '#F97316',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          Al-Habash Tyres
        </div>

        {/* Shop name Arabic */}
        <div
          style={{
            fontSize: 60,
            fontWeight: 900,
            color: '#FAFAF9',
            letterSpacing: '-1px',
            lineHeight: 1.1,
            textAlign: 'center',
          }}
        >
          {nameAr}
        </div>

        {/* Shop name English */}
        <div
          style={{
            fontSize: 30,
            fontWeight: 600,
            color: '#9CA3AF',
            marginTop: 12,
          }}
        >
          {nameEn}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 20,
            color: '#D4AF37',
            marginTop: 20,
            textAlign: 'center',
            maxWidth: 700,
          }}
        >
          {tagline}
        </div>

        {/* City badge */}
        <div
          style={{
            marginTop: 32,
            padding: '8px 20px',
            border: '1px solid #F97316',
            borderRadius: 999,
            fontSize: 16,
            color: '#F97316',
          }}
        >
          {city}
        </div>

        {/* Bottom accent */}
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
