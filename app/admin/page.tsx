'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { shops } from '@/lib/shops'

interface ShopStats { shop_id: number; count: number; avg: number }

export default function AdminDashboard() {
  const [stats, setStats] = useState<ShopStats[]>([])

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then((d) => setStats(d.stats ?? []))
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Top bar */}
      <header className="border-b border-white/8 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-orange" />
            <span className="font-black text-sm font-cairo">
              <span className="text-brand-orange">Al-Habash</span>
              <span className="text-zinc-400"> Admin</span>
            </span>
          </div>
          <LogoutButton />
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white font-cairo mb-1">Shops</h1>
          <p className="text-zinc-500 text-sm">Select a shop to manage reviews or gallery photos.</p>
        </div>

        <div className="grid gap-4">
          {shops.map((shop) => (
            <ShopCard
              key={shop.id}
              shop={shop}
              stats={stats.find((s) => s.shop_id === shop.id) ?? null}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ShopCard({ shop, stats }: { shop: typeof shops[0]; stats: ShopStats | null }) {
  const router = useRouter()

  return (
    <div className="bg-[#111] border border-white/8 rounded-2xl overflow-hidden">
      {/* Cover image */}
      <div className="h-28 overflow-hidden relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={shop.coverImage}
          alt={shop.name.en}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/40 to-transparent" />
      </div>

      {/* Shop header */}
      <div className="px-6 py-5 border-b border-white/8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-bold text-white font-cairo text-base">{shop.name.en}</h2>
            <p className="text-zinc-500 text-sm font-cairo mt-0.5">{shop.address.en}, {shop.city.en}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {stats ? (
              <>
                <div className="flex items-center gap-1.5 bg-brand-orange/8 border border-brand-orange/15 px-2.5 py-1 rounded-lg">
                  <svg width="11" height="11" viewBox="0 0 20 20" fill="#f97316">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs font-bold text-brand-orange font-cairo">{stats.avg}</span>
                </div>
                <div className="bg-white/5 border border-white/8 px-2.5 py-1 rounded-lg">
                  <span className="text-xs text-zinc-400 font-cairo">{stats.count} reviews</span>
                </div>
              </>
            ) : (
              <div className="h-6 w-28 rounded-lg bg-white/5 animate-pulse" />
            )}
            <span className="text-xs bg-brand-orange/10 text-brand-orange border border-brand-orange/20 px-2.5 py-1 rounded-lg font-cairo">
              Shop {shop.id}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 divide-x divide-white/8">
        <button
          onClick={() => router.push(`/admin/shops/${shop.id}?tab=reviews`)}
          className="flex flex-col items-start gap-1.5 px-6 py-5 hover:bg-white/4 transition-colors group text-left"
        >
          <div className="flex items-center gap-2 text-zinc-400 group-hover:text-white transition-colors">
            <ReviewsIcon />
            <span className="text-sm font-bold font-cairo">Reviews</span>
          </div>
          <p className="text-zinc-600 text-xs font-cairo">Delete inappropriate reviews</p>
        </button>

        <button
          onClick={() => router.push(`/admin/shops/${shop.id}?tab=gallery`)}
          className="flex flex-col items-start gap-1.5 px-6 py-5 hover:bg-white/4 transition-colors group text-left"
        >
          <div className="flex items-center gap-2 text-zinc-400 group-hover:text-white transition-colors">
            <GalleryIcon />
            <span className="text-sm font-bold font-cairo">Gallery</span>
          </div>
          <p className="text-zinc-600 text-xs font-cairo">Add or remove shop photos</p>
        </button>
      </div>
    </div>
  )
}

function LogoutButton() {
  const router = useRouter()

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <button
      onClick={logout}
      className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors font-cairo flex items-center gap-1.5"
    >
      <LogoutIcon />
      Sign out
    </button>
  )
}

function ReviewsIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function GalleryIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}
