export default function ShopLoading() {
  return (
    <div className="min-h-screen bg-brand-dark animate-pulse">

      {/* Hero skeleton */}
      <div className="relative h-72 sm:h-96 bg-brand-darker" />

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-14">
            {/* Description */}
            <div className="space-y-3">
              <div className="h-4 bg-brand-surface rounded-lg w-full" />
              <div className="h-4 bg-brand-surface rounded-lg w-5/6" />
              <div className="h-4 bg-brand-surface rounded-lg w-4/6" />
            </div>

            {/* Services */}
            <div className="space-y-4">
              <div className="h-7 bg-brand-surface rounded-lg w-40" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-10 bg-brand-surface rounded-xl" />
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div className="space-y-4">
              <div className="h-7 bg-brand-surface rounded-lg w-32" />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-40 bg-brand-surface rounded-xl" />
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-4">
              <div className="h-7 bg-brand-surface rounded-lg w-36" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-24 bg-brand-surface rounded-2xl" />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 space-y-4">
              <div className="h-6 bg-brand-surface-2 rounded-lg w-28" />
              <div className="h-4 bg-brand-surface-2 rounded w-full" />
              <div className="h-12 bg-brand-surface-2 rounded-xl" />
              <div className="h-12 bg-brand-surface-2 rounded-xl" />
              <div className="h-4 bg-brand-surface-2 rounded w-3/4" />
            </div>
            <div className="h-52 bg-brand-surface rounded-2xl" />
          </div>

        </div>
      </div>
    </div>
  )
}
