import Link from 'next/link'

export default function Page() {
  return (
    <div className="pt-[88px] min-h-screen bg-white">
      <div className="bg-cream border-b border-lux-border py-14">
        <div className="container-lux">
          <div className="flex items-center gap-2 mb-4 text-[11px] tracking-[0.25em] uppercase text-lux-gray">
            <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-gold">Paiement à la livraison</span>
          </div>
          <h1 className="font-serif font-normal text-4xl text-lux-dark">Paiement à la livraison</h1>
          <div className="gold-divider mt-4" />
          <p className="text-lux-gray text-sm mt-3">Payez uniquement à la réception de votre commande</p>
        </div>
      </div>
      <div className="container-lux py-16 max-w-3xl">
        
        <div className="mb-10 pb-10 border-b border-lux-border last:border-0">
          <h2 className="font-serif text-xl text-lux-dark mb-4">Comment ça fonctionne ?</h2>
          <p className="text-lux-gray text-sm leading-[1.9]">Chez LUXÉ, vous ne payez qu'au moment où le livreur vous remet votre colis. Aucune information bancaire n'est requise. Aucun risque.</p>
        </div>
        
        <div className="mb-10 pb-10 border-b border-lux-border last:border-0">
          <h2 className="font-serif text-xl text-lux-dark mb-4">Modes de paiement acceptés</h2>
          <p className="text-lux-gray text-sm leading-[1.9]">Nous acceptons le paiement en espèces (cash) à la livraison. Préparez le montant exact indiqué sur votre confirmation de commande.</p>
        </div>
        
        <div className="mb-10 pb-10 border-b border-lux-border last:border-0">
          <h2 className="font-serif text-xl text-lux-dark mb-4">Sécurité et confiance</h2>
          <p className="text-lux-gray text-sm leading-[1.9]">Le paiement à la livraison vous garantit de voir et vérifier votre produit avant de payer. Si le colis est endommagé ou ne correspond pas à votre commande, vous pouvez refuser la livraison.</p>
        </div>
        
        <div className="mb-10 pb-10 border-b border-lux-border last:border-0">
          <h2 className="font-serif text-xl text-lux-dark mb-4">Facturation</h2>
          <p className="text-lux-gray text-sm leading-[1.9]">Un reçu vous sera remis par le livreur au moment du paiement. Conservez-le pour tout éventuel retour ou échange.</p>
        </div>
        <div className="mt-10 p-6 bg-gold/5 border border-gold/30 rounded-none">
          <p className="text-center text-gold font-serif text-lg mb-2">100% Sécurisé</p>
          <p className="text-center text-lux-gray text-sm">Vous ne payez qu'après réception et vérification de votre commande.</p>
        </div>
      </div>
    </div>
  )
}