import { NextRequest, NextResponse } from 'next/server'
import QRCode from 'qrcode'
import { getShopById } from '@/lib/shops'

export async function GET(req: NextRequest) {
  const shopId = parseInt(req.nextUrl.searchParams.get('shop_id') ?? '0', 10)
  if (!getShopById(shopId)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const host = req.headers.get('host') ?? 'localhost:3000'
  const proto = host.startsWith('localhost') || host.startsWith('127.') ? 'http' : 'https'
  const url = `${proto}://${host}/shops/${shopId}#rate-form`

  const svg = await QRCode.toString(url, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 2,
    color: { dark: '#000000', light: '#FFFFFF' },
  } as Parameters<typeof QRCode.toString>[1])

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-cache',
    },
  })
}
