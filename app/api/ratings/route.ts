import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const shopIdParam = searchParams.get('shop_id')

  if (!shopIdParam) {
    return NextResponse.json({ error: 'shop_id query param is required' }, { status: 400 })
  }

  const shopId = parseInt(shopIdParam, 10)
  if (isNaN(shopId)) {
    return NextResponse.json({ error: 'shop_id must be a number' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('ratings')
    .select('id, shop_id, name, rating, comment, created_at')
    .eq('shop_id', shopId)
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) {
    console.error('Ratings fetch error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  return NextResponse.json({ ratings: data ?? [] })
}
