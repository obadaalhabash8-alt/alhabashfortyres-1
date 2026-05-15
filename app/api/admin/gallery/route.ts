import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseServer'

const BUCKET = 'shop-gallery'

function verifyAdmin(req: NextRequest) {
  return req.cookies.get('admin_token')?.value === process.env.ADMIN_TOKEN
}

function publicUrl(supabaseUrl: string, shopId: string, name: string) {
  return `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${shopId}/${name}`
}

export async function GET(req: NextRequest) {
  const shopId = req.nextUrl.searchParams.get('shop_id')
  if (!shopId) return NextResponse.json({ error: 'shop_id required' }, { status: 400 })

  const admin = getSupabaseAdmin()
  const { data, error } = await admin.storage.from(BUCKET).list(shopId, {
    sortBy: { column: 'created_at', order: 'asc' },
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const images = (data ?? [])
    .filter((f) => f.name !== '.emptyFolderPlaceholder')
    .map((f) => ({ name: f.name, url: publicUrl(supabaseUrl, shopId, f.name) }))

  return NextResponse.json(
    { images },
    { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } }
  )
}

export async function POST(req: NextRequest) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const shopId = formData.get('shop_id') as string | null

  if (!file || !shopId) return NextResponse.json({ error: 'file and shop_id required' }, { status: 400 })

  const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
  const MAX_BYTES = 5 * 1024 * 1024 // 5 MB

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: 'Only JPEG, PNG, WebP, and GIF images are allowed' }, { status: 400 })
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File size must not exceed 5 MB' }, { status: 400 })
  }

  const extMap: Record<string, string> = {
    'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif',
  }
  const ext = extMap[file.type] ?? 'jpg'
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())

  const admin = getSupabaseAdmin()

  // Ensure bucket exists (no-op if already exists)
  await admin.storage.createBucket(BUCKET, { public: true }).catch(() => {})

  const { error } = await admin.storage.from(BUCKET).upload(`${shopId}/${filename}`, buffer, {
    contentType: file.type || 'image/jpeg',
    upsert: false,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const url = publicUrl(process.env.NEXT_PUBLIC_SUPABASE_URL!, shopId, filename)
  return NextResponse.json({ ok: true, url, name: filename })
}

export async function DELETE(req: NextRequest) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { shop_id, name } = await req.json()
  if (!shop_id || !name) return NextResponse.json({ error: 'shop_id and name required' }, { status: 400 })

  const { error } = await getSupabaseAdmin().storage.from(BUCKET).remove([`${shop_id}/${name}`])
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
