import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseServer'

const PAGE_SIZE = 15

function verifyAdmin(req: NextRequest) {
  return req.cookies.get('admin_token')?.value === process.env.ADMIN_TOKEN
}

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const shopId = parseInt(searchParams.get('shop_id') ?? '', 10)
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
  const sort = searchParams.get('sort') ?? 'newest'
  const ratingFilter = searchParams.get('rating')

  const exportAll = searchParams.get('all') === 'true'

  if (isNaN(shopId)) return NextResponse.json({ error: 'invalid shop_id' }, { status: 400 })

  const admin = getSupabaseAdmin()
  let query = admin
    .from('ratings')
    .select('id, shop_id, name, rating, comment, created_at', { count: 'exact' })
    .eq('shop_id', shopId)

  if (ratingFilter) query = query.eq('rating', parseInt(ratingFilter, 10))
  if (!exportAll) query = query.range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)

  if (sort === 'oldest') query = query.order('created_at', { ascending: true })
  else if (sort === 'highest') query = query.order('rating', { ascending: false })
  else if (sort === 'lowest') query = query.order('rating', { ascending: true })
  else query = query.order('created_at', { ascending: false })

  const { data, error, count } = await query
  if (error) return NextResponse.json({ error: 'DB error' }, { status: 500 })

  const total = count ?? 0
  return NextResponse.json({ ratings: data ?? [], total, hasMore: page * PAGE_SIZE < total, page })
}

export async function DELETE(req: NextRequest) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  const { error } = await getSupabaseAdmin().from('ratings').delete().eq('id', id)
  if (error) return NextResponse.json({ error: 'DB error' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
