'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ConfirmationContent() {
  const params = useSearchParams()
  const name = params.get('name') || 'cher client'
  const orderId = 'LX' + Math.random().toString(36).substr(2,8).toUpperCase()

  return (
    <div className="pt-[88px] min-h-screen flex items-center justify-center bg-cream">
      <div className="max-w-lg w-full mx-auto text-center px-6 py-16">
        {/* Success icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
          </svg>
        </div>

        <p className="section-label text-green-600">Commande confirmée</p>
        <h1 className="font-serif text-4xl font-light mt-2 mb-2">Merci, {name} !</h1>
        <div className="gold-divider mx-auto mb-5" />

        <div className="bg-white border border-lux-border p-6 mb-6 text-left">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs tracking-widest uppercase text-lux-gray">N° de commande</span>
            <span className="font-mono font-bold text-gold">#{orderId}</span>
          </div>
          <div className="space-y-3 text-sm">
            {[
              ['📞', 'Confirmation', 'Vous recevrez un appel de confirmation sous 24h'],
              ['🚚', 'Livraison', 'Votre colis sera livré dans 24 à 48h ouvrables'],
              ['💵', 'Paiement', 'Payez en espèces à la réception de votre commande'],
              ['📦', 'Suivi', 'Un SMS avec votre numéro de suivi sera envoyé'],
            ].map(([icon, title, desc]) => (
              <div key={title as string} className="flex items-start gap-3">
                <span className="text-xl">{icon}</span>
                <div>
                  <p className="font-medium">{title}</p>
                  <p className="text-lux-gray text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-gold"><span>Retour à l'accueil</span></Link>
          <Link href="/products" className="btn-outline"><span>Continuer mes achats</span></Link>
        </div>

        <p className="text-lux-gray text-xs mt-8">
          Une question? Appelez-nous au <a href="tel:+212600000000" className="text-gold hover:underline">+212 6 00 00 00 00</a>
        </p>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return <Suspense fallback={null}><ConfirmationContent /></Suspense>
}
