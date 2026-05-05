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
    .select('rating')
    .eq('shop_id', shopId)

  if (error) {
    console.error('Average rating error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  if (!data || data.length === 0) {
    return NextResponse.json({ average: 0, count: 0 })
  }

  const total = data.reduce((sum, row) => sum + row.rating, 0)
  const average = total / data.length

  return NextResponse.json({
    average: Math.round(average * 10) / 10, // round to 1 decimal
    count: data.length,
  })
}
