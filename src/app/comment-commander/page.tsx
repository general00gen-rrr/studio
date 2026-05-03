import Link from 'next/link'

export default function Page() {
  return (
    <div className="pt-[88px] min-h-screen bg-white">
      <div className="bg-cream border-b border-lux-border py-14">
        <div className="container-lux">
          <div className="flex items-center gap-2 mb-4 text-[11px] tracking-[0.25em] uppercase text-lux-gray">
            <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-gold">Comment commander</span>
          </div>
          <h1 className="font-serif font-normal text-4xl text-lux-dark">Comment commander</h1>
          <div className="gold-divider mt-4" />
          <p className="text-lux-gray text-sm mt-3">Passez votre commande en quelques étapes simples</p>
        </div>
      </div>
      <div className="container-lux py-16 max-w-3xl">
        
        <div className="mb-10 pb-10 border-b border-lux-border last:border-0">
          <h2 className="font-serif text-xl text-lux-dark mb-4">1. Choisissez vos produits</h2>
          <p className="text-lux-gray text-sm leading-[1.9]">Parcourez notre catalogue et ajoutez les produits souhaités à votre panier en cliquant sur "Ajouter au panier".</p>
        </div>
        
        <div className="mb-10 pb-10 border-b border-lux-border last:border-0">
          <h2 className="font-serif text-xl text-lux-dark mb-4">2. Validez votre panier</h2>
          <p className="text-lux-gray text-sm leading-[1.9]">Accédez à votre panier via l'icône en haut à droite. Vérifiez vos articles, les quantités et le montant total.</p>
        </div>
        
        <div className="mb-10 pb-10 border-b border-lux-border last:border-0">
          <h2 className="font-serif text-xl text-lux-dark mb-4">3. Remplissez vos informations</h2>
          <p className="text-lux-gray text-sm leading-[1.9]">Saisissez votre nom complet, numéro de téléphone et adresse de livraison complète (ville, quartier, rue).</p>
        </div>
        
        <div className="mb-10 pb-10 border-b border-lux-border last:border-0">
          <h2 className="font-serif text-xl text-lux-dark mb-4">4. Confirmez la commande</h2>
          <p className="text-lux-gray text-sm leading-[1.9]">Cliquez sur "Commander maintenant". Vous recevrez une confirmation par SMS ou WhatsApp sous 24h.</p>
        </div>
        
        <div className="mb-10 pb-10 border-b border-lux-border last:border-0">
          <h2 className="font-serif text-xl text-lux-dark mb-4">5. Réception & paiement</h2>
          <p className="text-lux-gray text-sm leading-[1.9]">Vous payez uniquement à la réception de votre colis. Aucun paiement en ligne requis.</p>
        </div>
        <div className="mt-10 p-6 bg-cream border border-lux-border text-center">
          <p className="text-lux-gray text-sm mb-3">Une question sur votre commande ?</p>
          <a href="https://wa.me/212770469416" target="_blank" className="btn-primary inline-flex"><span>Contactez-nous sur WhatsApp</span></a>
        </div>
      </div>
    </div>
  )
}