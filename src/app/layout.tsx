import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LuxeEffects from '@/components/LuxeEffects'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400','500','600','700'],
  style: ['normal','italic'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300','400','500','600'],
})

export const metadata: Metadata = {
  title: 'LUXÉ — Boutique Premium',
  description: 'Sélection premium de produits pour votre quotidien. Livraison au Maroc, paiement à la livraison.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <LuxeEffects />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
