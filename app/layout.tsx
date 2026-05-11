import type { Metadata } from 'next'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'شركة الحبش للإطارات | Al-Habash Tyres Company — Since 1967',
  description:
    'شركة الحبش للإطارات — خمسة عقود من الخبرة والثقة في خدمات الإطارات وصيانة السيارات. ثلاثة فروع في خدمتكم. Al-Habash Tyres Company — Five decades of expertise and trust.',
  keywords: 'إطارات, تغيير زيت, ضبط زوايا, الرياض, tyres, tires, Riyadh, Saudi Arabia',
  openGraph: {
    title: 'الحبش للإطارات | Al-Habash Tyres',
    description: 'خمسة عقود من الثقة والجودة — Five decades of trust and quality',
    type: 'website',
    images: [{ url: '/hero.jpg', width: 1200, height: 630, alt: 'Al-Habash Tyres' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/hero.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme')||'dark';if(t==='dark')document.documentElement.classList.add('dark')})()`,
          }}
        />
      </head>
      <body className="bg-brand-dark min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
