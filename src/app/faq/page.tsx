import Link from 'next/link'

export default function Page() {
  return (
    <div className="pt-[88px] min-h-screen bg-white">
      <div className="bg-cream border-b border-lux-border py-14">
        <div className="container-lux">
          <div className="flex items-center gap-2 mb-4 text-[11px] tracking-[0.25em] uppercase text-lux-gray">
            <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-gold">FAQ</span>
          </div>
          <h1 className="font-serif font-normal text-4xl text-lux-dark">FAQ</h1>
          <div className="gold-divider mt-4" />
          <p className="text-lux-gray text-sm mt-3">Retrouvez les réponses à vos questions fréquentes</p>
        </div>
      </div>
      <div className="container-lux py-16 max-w-3xl">
        
        <div className="mb-8 pb-8 border-b border-lux-border last:border-0">
          <h3 className="font-medium text-lux-dark text-sm tracking-wide mb-3 flex items-start gap-3">
            <span className="text-gold font-serif text-lg leading-none">Q.</span>Comment passer une commande ?
          </h3>
          <p className="text-lux-gray text-sm leading-[1.9] pl-6">Ajoutez les produits à votre panier, remplissez vos informations de livraison et confirmez. Vous recevrez une confirmation sous 24h.</p>
        </div>
        <div className="mb-8 pb-8 border-b border-lux-border last:border-0">
          <h3 className="font-medium text-lux-dark text-sm tracking-wide mb-3 flex items-start gap-3">
            <span className="text-gold font-serif text-lg leading-none">Q.</span>Quel est le délai de livraison ?
          </h3>
          <p className="text-lux-gray text-sm leading-[1.9] pl-6">Entre 24 et 48h ouvrables selon votre ville. Les grandes villes sont livrées généralement le lendemain.</p>
        </div>
        <div className="mb-8 pb-8 border-b border-lux-border last:border-0">
          <h3 className="font-medium text-lux-dark text-sm tracking-wide mb-3 flex items-start gap-3">
            <span className="text-gold font-serif text-lg leading-none">Q.</span>Puis-je modifier ou annuler ma commande ?
          </h3>
          <p className="text-lux-gray text-sm leading-[1.9] pl-6">Oui, contactez-nous rapidement via WhatsApp. Tant que la commande n'est pas expédiée, nous pouvons la modifier ou l'annuler.</p>
        </div>
        <div className="mb-8 pb-8 border-b border-lux-border last:border-0">
          <h3 className="font-medium text-lux-dark text-sm tracking-wide mb-3 flex items-start gap-3">
            <span className="text-gold font-serif text-lg leading-none">Q.</span>Que faire si le produit reçu est défectueux ?
          </h3>
          <p className="text-lux-gray text-sm leading-[1.9] pl-6">Refusez la livraison ou contactez-nous dans les 48h avec des photos. Nous vous enverrons un remplacement sans frais.</p>
        </div>
        <div className="mb-8 pb-8 border-b border-lux-border last:border-0">
          <h3 className="font-medium text-lux-dark text-sm tracking-wide mb-3 flex items-start gap-3">
            <span className="text-gold font-serif text-lg leading-none">Q.</span>La livraison est-elle vraiment gratuite ?
          </h3>
          <p className="text-lux-gray text-sm leading-[1.9] pl-6">Oui, la livraison est offerte pour toute commande dès 500 DH partout au Maroc.</p>
        </div>
        <div className="mb-8 pb-8 border-b border-lux-border last:border-0">
          <h3 className="font-medium text-lux-dark text-sm tracking-wide mb-3 flex items-start gap-3">
            <span className="text-gold font-serif text-lg leading-none">Q.</span>Comment suivre ma commande ?
          </h3>
          <p className="text-lux-gray text-sm leading-[1.9] pl-6">Vous recevrez un SMS de suivi après expédition. Vous pouvez aussi nous contacter sur WhatsApp avec votre numéro de commande.</p>
        </div>
        <div className="mb-8 pb-8 border-b border-lux-border last:border-0">
          <h3 className="font-medium text-lux-dark text-sm tracking-wide mb-3 flex items-start gap-3">
            <span className="text-gold font-serif text-lg leading-none">Q.</span>Puis-je retourner un produit ?
          </h3>
          <p className="text-lux-gray text-sm leading-[1.9] pl-6">Oui, sous 30 jours si le produit est non utilisé et dans son emballage d'origine. Le remboursement est garanti.</p>
        </div>
        <div className="mb-8 pb-8 border-b border-lux-border last:border-0">
          <h3 className="font-medium text-lux-dark text-sm tracking-wide mb-3 flex items-start gap-3">
            <span className="text-gold font-serif text-lg leading-none">Q.</span>Quels sont vos horaires de service client ?
          </h3>
          <p className="text-lux-gray text-sm leading-[1.9] pl-6">Notre équipe est disponible du Lundi au Samedi de 9h à 18h via WhatsApp et email.</p>
        </div>
      </div>
    </div>
  )
}