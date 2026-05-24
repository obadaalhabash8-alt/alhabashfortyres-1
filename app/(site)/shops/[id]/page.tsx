import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getShopById, shops } from '@/lib/shops'
import ShopDetailClient from './ShopDetailClient'

interface PageProps {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return shops.map((shop) => ({ id: String(shop.id) }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const shopId = parseInt(id, 10)
  const shop = getShopById(shopId)
  if (!shop) return {}

  return {
    title: `${shop.name.ar} | ${shop.name.en} — شركة الحبش للإطارات`,
    description: shop.description.ar,
    openGraph: {
      title: `${shop.name.ar} | ${shop.name.en}`,
      description: shop.description.ar,
      images: [{ url: shop.coverImage, width: 1200, height: 630, alt: shop.name.ar }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${shop.name.ar} | ${shop.name.en}`,
      description: shop.description.ar,
      images: [shop.coverImage],
    },
  }
}

export default async function ShopDetailPage({ params }: PageProps) {
  const { id } = await params
  const shopId = parseInt(id, 10)
  if (isNaN(shopId) || !getShopById(shopId)) notFound()

  return <ShopDetailClient shopId={shopId} />
}
