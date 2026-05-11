'use client'

import { useRouter } from 'next/navigation'
import { shops } from '@/lib/shops'

export default function AdminDashboard() {
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
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ShopCard({ shop }: { shop: typeof shops[0] }) {
  const router = useRouter()

  return (
    <div className="bg-[#111] border border-white/8 rounded-2xl overflow-hidden">
      {/* Shop header */}
      <div className="px-6 py-5 border-b border-white/8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-bold text-white font-cairo text-base">{shop.name.en}</h2>
            <p className="text-zinc-500 text-sm font-cairo mt-0.5">{shop.address.en}, {shop.city.en}</p>
          </div>
          <span className="text-xs bg-brand-orange/10 text-brand-orange border border-brand-orange/20 px-2.5 py-1 rounded-lg font-cairo flex-shrink-0">
            Shop {shop.id}
          </span>
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
