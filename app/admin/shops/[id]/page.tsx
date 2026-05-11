'use client'

import { use, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { getShopById, shops } from '@/lib/shops'
import type { Rating } from '@/types'

interface Props { params: Promise<{ id: string }> }
type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest'
interface GalleryImage { name: string; url: string }

export default function ShopAdminPage({ params }: Props) {
  const { id } = use(params)
  const shopId = parseInt(id, 10)
  const shop = getShopById(shopId)
  const router = useRouter()
  const searchParams = useSearchParams()
  const [tab, setTab] = useState<'reviews' | 'gallery'>(
    (searchParams.get('tab') as 'reviews' | 'gallery') ?? 'reviews'
  )

  if (!shop) { router.push('/admin'); return null }

  function switchTab(t: 'reviews' | 'gallery') {
    setTab(t)
    router.replace(`/admin/shops/${shopId}?tab=${t}`, { scroll: false })
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b border-white/8 bg-[#0d0d0d]/95 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center gap-4">
          {/* Back */}
          <Link href="/admin" className="text-zinc-600 hover:text-white transition-colors flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
          </Link>

          {/* Brand */}
          <span className="font-black text-xs font-cairo flex-shrink-0 hidden sm:block">
            <span className="text-brand-orange">Al-Habash</span>
            <span className="text-zinc-600"> Admin</span>
          </span>

          <span className="text-zinc-700 hidden sm:block">/</span>

          {/* Shop switcher */}
          <select
            value={shopId}
            onChange={(e) => router.push(`/admin/shops/${e.target.value}?tab=${tab}`)}
            className="bg-transparent text-white text-sm font-bold font-cairo focus:outline-none cursor-pointer flex-1 min-w-0 truncate"
          >
            {shops.map((s) => (
              <option key={s.id} value={s.id} className="bg-[#111]">{s.name.en}</option>
            ))}
          </select>

          {/* Tabs */}
          <div className="flex items-center gap-1 ml-auto flex-shrink-0">
            {(['reviews', 'gallery'] as const).map((t) => (
              <button
                key={t}
                onClick={() => switchTab(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-cairo transition-all capitalize ${
                  tab === t
                    ? 'bg-brand-orange/15 text-brand-orange'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Logout */}
          <LogoutButton />
        </div>
      </header>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {tab === 'reviews' ? (
          <ReviewsTab shopId={shopId} />
        ) : (
          <GalleryTab shopId={shopId} />
        )}
      </div>
    </div>
  )
}

/* ─── Reviews Tab ─────────────────────────────────────────────────────── */

function ReviewsTab({ shopId }: { shopId: number }) {
  const [ratings, setRatings] = useState<Rating[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<SortOption>('newest')
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const PAGE_SIZE = 15
  const totalPages = Math.ceil(total / PAGE_SIZE)

  async function fetchRatings(p: number, s: SortOption) {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/ratings?shop_id=${shopId}&page=${p}&sort=${s}`)
      const data = await res.json()
      setRatings(data.ratings ?? [])
      setTotal(data.total ?? 0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchRatings(page, sort) }, [shopId, page, sort])

  async function deleteRating(id: string) {
    setDeletingId(id)
    await fetch('/api/admin/ratings', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    await fetchRatings(page, sort)
    setDeletingId(null)
  }

  function handleSort(s: SortOption) {
    setSort(s)
    setPage(1)
  }

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-lg font-black text-white font-cairo">Reviews</h2>
          <p className="text-zinc-500 text-sm mt-0.5">{loading ? '—' : `${total} total`}</p>
        </div>
        <select
          value={sort}
          onChange={(e) => handleSort(e.target.value as SortOption)}
          className="bg-[#111] border border-white/8 text-white text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-brand-orange/30 font-cairo cursor-pointer"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="highest">Highest rated</option>
          <option value="lowest">Lowest rated</option>
        </select>
      </div>

      {loading ? (
        <ReviewsSkeleton />
      ) : ratings.length === 0 ? (
        <EmptyState icon="💬" message="No reviews yet." />
      ) : (
        <>
          <div className="space-y-2">
            {ratings.map((r) => (
              <ReviewRow key={r.id} rating={r} deletingId={deletingId} onDelete={deleteRating} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl border border-white/8 text-zinc-400 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-cairo"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                Previous
              </button>
              <span className="text-zinc-600 text-sm font-cairo tabular-nums">
                {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl border border-white/8 text-zinc-400 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-cairo"
              >
                Next
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function ReviewRow({ rating, deletingId, onDelete }: {
  rating: Rating
  deletingId: string | null
  onDelete: (id: string) => void
}) {
  const isDeleting = deletingId === rating.id

  return (
    <div className={`group bg-[#111] border border-white/8 rounded-xl px-5 py-4 flex items-start gap-4 transition-colors ${isDeleting ? 'opacity-50' : 'hover:border-white/12'}`}>
      {/* Stars + meta */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2.5 mb-1 flex-wrap">
          <span className="font-bold text-white text-sm font-cairo">{rating.name}</span>
          <Stars rating={rating.rating} />
          <span className="text-zinc-600 text-xs font-cairo">
            {new Date(rating.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
        {rating.comment && (
          <p className="text-zinc-400 text-sm font-cairo leading-relaxed">{rating.comment}</p>
        )}
      </div>

      {/* Delete */}
      <button
        onClick={() => onDelete(rating.id)}
        disabled={isDeleting}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100 p-2 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-400/8 transition-all disabled:pointer-events-none"
        title="Delete review"
      >
        {isDeleting
          ? <span className="w-4 h-4 block rounded-full border-2 border-zinc-600 border-t-transparent animate-spin" />
          : <TrashIcon />}
      </button>
    </div>
  )
}

/* ─── Gallery Tab ─────────────────────────────────────────────────────── */

function GalleryTab({ shopId }: { shopId: number }) {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingName, setDeletingName] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function fetchImages() {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/gallery?shop_id=${shopId}`)
      const data = await res.json()
      setImages(data.images ?? [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchImages() }, [shopId])

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setSelectedFile(file)
    setPreview(URL.createObjectURL(file))
  }

  function cancelUpload() {
    setSelectedFile(null)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  async function uploadPhoto() {
    if (!selectedFile) return
    setUploading(true)
    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('shop_id', String(shopId))
    const res = await fetch('/api/admin/gallery', { method: 'POST', body: formData })
    setUploading(false)
    if (res.ok) { cancelUpload(); fetchImages() }
  }

  async function deleteImage(name: string) {
    setDeletingName(name)
    await fetch('/api/admin/gallery', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shop_id: String(shopId), name }),
    })
    setDeletingName(null)
    fetchImages()
  }

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-black text-white font-cairo">Gallery</h2>
          <p className="text-zinc-500 text-sm mt-0.5">{loading ? '—' : `${images.length} photo${images.length !== 1 ? 's' : ''}`}</p>
        </div>
        {!preview && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold rounded-xl text-sm font-cairo transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Add photo
          </button>
        )}
      </div>

      {/* Upload preview */}
      {preview && (
        <div className="mb-6 bg-[#111] border border-white/8 rounded-2xl p-5">
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-cairo mb-4">Preview</p>
          <div className="flex gap-5 items-start flex-wrap">
            <div className="w-40 h-28 rounded-xl overflow-hidden bg-[#1a1a1a] flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="preview" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-zinc-300 font-cairo truncate mb-1">{selectedFile?.name}</p>
              <p className="text-xs text-zinc-600 font-cairo mb-5">
                {selectedFile ? (selectedFile.size / 1024 / 1024).toFixed(2) + ' MB' : ''}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={uploadPhoto}
                  disabled={uploading}
                  className="flex items-center gap-2 px-4 py-2 bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-50 text-white font-bold rounded-xl text-sm font-cairo transition-colors"
                >
                  {uploading && <span className="w-3 h-3 rounded-full border-2 border-white/40 border-t-white animate-spin" />}
                  {uploading ? 'Uploading…' : 'Upload'}
                </button>
                <button
                  onClick={cancelUpload}
                  disabled={uploading}
                  className="px-4 py-2 border border-white/8 text-zinc-400 hover:text-white font-bold rounded-xl text-sm font-cairo transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <GallerySkeleton />
      ) : images.length === 0 && !preview ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-white/10 hover:border-brand-orange/30 rounded-2xl py-16 text-center cursor-pointer transition-colors group"
        >
          <div className="w-12 h-12 rounded-2xl bg-brand-orange/8 border border-brand-orange/15 flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-orange/15 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          </div>
          <p className="text-zinc-400 text-sm font-cairo">Click to add the first photo</p>
          <p className="text-zinc-700 text-xs font-cairo mt-1">JPG, PNG, WEBP</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((img) => (
            <div key={img.name} className="relative group aspect-square rounded-xl overflow-hidden bg-[#111] border border-white/8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt="" className="w-full h-full object-cover" />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-all flex items-center justify-center">
                <button
                  onClick={() => deleteImage(img.name)}
                  disabled={deletingName === img.name}
                  className="scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all p-2.5 bg-red-500 hover:bg-red-600 rounded-xl text-white shadow-lg"
                  title="Delete photo"
                >
                  {deletingName === img.name
                    ? <span className="w-4 h-4 block rounded-full border-2 border-white/50 border-t-white animate-spin" />
                    : <TrashIcon />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
    </div>
  )
}

/* ─── Shared components ───────────────────────────────────────────────── */

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 20 20" fill={i < rating ? '#f97316' : '#27272a'}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  )
}

function ReviewsSkeleton() {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="bg-[#111] border border-white/8 rounded-xl px-5 py-4 h-16" />
      ))}
    </div>
  )
}

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 animate-pulse">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="aspect-square rounded-xl bg-[#111] border border-white/8" />
      ))}
    </div>
  )
}

function EmptyState({ icon, message }: { icon: string; message: string }) {
  return (
    <div className="py-16 text-center">
      <p className="text-3xl mb-3">{icon}</p>
      <p className="text-zinc-600 font-cairo text-sm">{message}</p>
    </div>
  )
}

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
    </svg>
  )
}

function LogoutButton() {
  const router = useRouter()
  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }
  return (
    <button onClick={logout} className="text-zinc-600 hover:text-zinc-400 transition-colors flex-shrink-0" title="Sign out">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    </button>
  )
}
