import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseServer'

function verifyAdmin(req: NextRequest) {
  return req.cookies.get('admin_token')?.value === process.env.ADMIN_TOKEN
}

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const admin = getSupabaseAdmin()
  const { data, error } = await admin.from('ratings').select('shop_id, rating')

  if (error) return NextResponse.json({ error: 'DB error' }, { status: 500 })

  const map: Record<number, { count: number; sum: number }> = {}
  for (const row of data ?? []) {
    if (!map[row.shop_id]) map[row.shop_id] = { count: 0, sum: 0 }
    map[row.shop_id].count++
    map[row.shop_id].sum += row.rating
  }

  const stats = Object.entries(map).map(([shop_id, { count, sum }]) => ({
    shop_id: parseInt(shop_id),
    count,
    avg: Math.round((sum / count) * 10) / 10,
  }))

  return NextResponse.json({ stats })
}
