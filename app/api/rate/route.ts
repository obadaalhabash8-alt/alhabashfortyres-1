import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseServer'

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
