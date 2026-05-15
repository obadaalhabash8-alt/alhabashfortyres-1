import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const PAGE_SIZE = 5
const VALID_SHOP_IDS = new Set([1, 2, 3])

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const shopIdParam = searchParams.get('shop_id')
  const pageParam = searchParams.get('page') ?? '1'

  if (!shopIdParam) {
    return NextResponse.json({ error: 'shop_id query param is required' }, { status: 400 })
  }

  const shopId = parseInt(shopIdParam, 10)
  if (isNaN(shopId) || !VALID_SHOP_IDS.has(shopId)) {
    return NextResponse.json({ error: 'Invalid shop_id' }, { status: 400 })
  }

  const page = Math.max(1, parseInt(pageParam, 10) || 1)
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  const { data, error, count } = await supabase
    .from('ratings')
    .select('id, shop_id, name, rating, comment, created_at', { count: 'exact' })
    .eq('shop_id', shopId)
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    console.error('Ratings fetch error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  const total = count ?? 0

  return NextResponse.json(
    { ratings: data ?? [], total, hasMore: to < total - 1, page },
    { headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=120' } }
  )
}
