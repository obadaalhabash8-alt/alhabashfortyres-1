import type { Metadata } from 'next'
import './globals.css'
import LanguageProvider from '@/components/LanguageProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'الحبش للإطارات | Al-Habash Tyres — Since 1967',
  description:
    'الحبش للإطارات — خمسة عقود من الخبرة والثقة في خدمات الإطارات وصيانة السيارات. ثلاثة فروع في خدمتكم. Al-Habash Tyres — Five decades of expertise and trust.',
  keywords: 'إطارات, تغيير زيت, ضبط زوايا, الرياض, tyres, tires, Riyadh, Saudi Arabia',
  openGraph: {
    title: 'الحبش للإطارات | Al-Habash Tyres',
    description: 'خمسة عقود من الثقة والجودة — Five decades of trust and quality',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // lang & dir are set dynamically by LanguageProvider on the client
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-brand-cream min-h-screen flex flex-col">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
