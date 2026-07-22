import type { Metadata } from 'next'
import { Tajawal, Cairo } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LuxeEffects from '@/components/LuxeEffects'
import PageTransition from '@/components/PageTransition'
import WhatsAppButton from '@/components/WhatsAppButton'

const tajawal = Tajawal({
  subsets: ['arabic'],
  variable: '--font-tajawal',
  weight: ['300', '400', '500', '700', '800'],
})

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
  weight: ['400', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'أكوا كلين — أنظمة تصفية وتقنية المياه بالمغرب | AquaClean',
  description: 'أكوا كلين - نظافة، جودة، وثقة. أحدث أنظمة تصفية المياه، معالجة بالاسموز العكسي. توصيل مجاني لكل مدن المغرب والدفع عند الاستلام.',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${cairo.variable}`}>
      <body className="bg-white text-slate-900 font-sans antialiased">
        <LuxeEffects />
        <Navbar />
        <main>
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
