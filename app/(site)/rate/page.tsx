import { Suspense } from 'react'
import RateContent from './RateContent'

// In Next.js 15, searchParams is a Promise
export default async function RatePage({
  searchParams,
}: {
  searchParams: Promise<{ shop?: string }>
}) {
  const params = await searchParams
  const shopId = params.shop ? parseInt(params.shop, 10) : null
  const validShopId = shopId && !isNaN(shopId) ? shopId : null

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-4 border-brand-orange border-t-transparent animate-spin" />
        </div>
      }
    >
      <RateContent shopId={validShopId} />
    </Suspense>
  )
}
