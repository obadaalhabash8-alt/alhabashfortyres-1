import type { MetadataRoute } from 'next'
import { shops } from '@/lib/shops'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://alhabashtyres.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const shopRoutes = shops.map((shop) => ({
    url: `${BASE_URL}/shops/${shop.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/rate`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    ...shopRoutes,
  ]
}
