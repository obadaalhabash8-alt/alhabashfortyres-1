import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseServer'

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

  const admin = getSupabaseAdmin()

  // Fast path: single DB aggregate via RPC (run supabase/get_shop_average_rating.sql once to enable)
  const { data: rpcData, error: rpcError } = await admin
    .rpc('get_shop_average_rating', { p_shop_id: shopId })
    .single()

  if (!rpcError && rpcData) {
    const row = rpcData as { average: unknown; count: unknown }
    return NextResponse.json({
      average: Number(row.average) ?? 0,
      count: Number(row.count) ?? 0,
    })
  }

  // Fallback: JS-side aggregation (works before the SQL function is deployed)
  const { data, error } = await admin
    .from('ratings')
    .select('rating')
    .eq('shop_id', shopId)
    .limit(10000)

  if (error) {
    console.error('Average rating error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  if (!data || data.length === 0) {
    return NextResponse.json({ average: 0, count: 0 })
  }

  const total = data.reduce((sum, row) => sum + row.rating, 0)
  return NextResponse.json({
    average: Math.round((total / data.length) * 10) / 10,
    count: data.length,
  })
}
