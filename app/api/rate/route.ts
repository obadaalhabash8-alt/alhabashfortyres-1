import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseServer'

// In-memory rate limit: 5 submissions per IP per shop per hour.
// Resets on server restart/cold-start; adequate for a small business site.
// Upgrade to Upstash Redis for persistent limits across serverless instances.
const rateLimitStore = new Map<string, { count: number; windowStart: number }>()
const RATE_MAX = 5
const RATE_WINDOW_MS = 60 * 60 * 1000 // 1 hour

function isRateLimited(ip: string, shopId: number): boolean {
  const key = `${ip}:${shopId}`
  const now = Date.now()
  const entry = rateLimitStore.get(key)
  if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
    rateLimitStore.set(key, { count: 1, windowStart: now })
    return false
  }
  if (entry.count >= RATE_MAX) return true
  entry.count++
  return false
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { shop_id, name, rating, comment } = body

    // Validate required fields
    if (!shop_id || !name?.trim() || !rating) {
      return NextResponse.json(
        { error: 'shop_id, name, and rating are required' },
        { status: 400 }
      )
    }

    // Validate rating range
    const ratingNum = Number(rating)
    if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json(
        { error: 'rating must be an integer between 1 and 5' },
        { status: 400 }
      )
    }

    // Validate shop_id range
    const shopIdNum = Number(shop_id)
    if (![1, 2, 3].includes(shopIdNum)) {
      return NextResponse.json({ error: 'Invalid shop_id' }, { status: 400 })
    }

    // Rate limit — generous window so multiple customers at the same location can all review
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown'
    if (isRateLimited(ip, shopIdNum)) {
      return NextResponse.json(
        { error: 'Too many submissions from this location. Please try again later.' },
        { status: 429 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('ratings')
      .insert({
        shop_id: shopIdNum,
        name: name.trim().slice(0, 100),
        rating: ratingNum,
        comment: (comment ?? '').trim().slice(0, 1000),
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (err) {
    console.error('Rate API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
