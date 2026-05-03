import Link from 'next/link'

export default function Page() {
  return (
    <div className="pt-[88px] min-h-screen bg-white">
      <div className="bg-cream border-b border-lux-border py-14">
        <div className="container-lux">
          <div className="flex items-center gap-2 mb-4 text-[11px] tracking-[0.25em] uppercase text-lux-gray">
            <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-gold">Retours & échanges</span>
          </div>
          <h1 className="font-serif font-normal text-4xl text-lux-dark">Retours & échanges</h1>
          <div className="gold-divider mt-4" />
          <p className="text-lux-gray text-sm mt-3">Retour gratuit sous 30 jours — remboursement garanti</p>
        </div>
      </div>
      <div className="container-lux py-16 max-w-3xl">
        
        <div className="mb-10 pb-10 border-b border-lux-border last:border-0">
          <h2 className="font-serif text-xl text-lux-dark mb-4">Politique de retour</h2>
          <p className="text-lux-gray text-sm leading-[1.9]">Vous disposez de 30 jours à compter de la réception pour retourner un produit. Le produit doit être dans son état d'origine, non utilisé et dans son emballage d'origine.</p>
        </div>
        
        <div className="mb-10 pb-10 border-b border-lux-border last:border-0">
          <h2 className="font-serif text-xl text-lux-dark mb-4">Comment effectuer un retour ?</h2>
          <p className="text-lux-gray text-sm leading-[1.9]">Contactez notre service client via WhatsApp au +212 770 469 416 en indiquant votre numéro de commande et la raison du retour. Notre équipe vous guidera pour la procédure de retour.</p>
        </div>
        
        <div className="mb-10 pb-10 border-b border-lux-border last:border-0">
          <h2 className="font-serif text-xl text-lux-dark mb-4">Remboursement</h2>
          <p className="text-lux-gray text-sm leading-[1.9]">Une fois le retour validé et le produit reçu, le remboursement est effectué dans un délai de 3 à 5 jours ouvrables. Le remboursement se fait par virement ou cash selon votre préférence.</p>
        </div>
        
        <div className="mb-10 pb-10 border-b border-lux-border last:border-0">
          <h2 className="font-serif text-xl text-lux-dark mb-4">Échange</h2>
          <p className="text-lux-gray text-sm leading-[1.9]">Si vous souhaitez échanger votre produit contre un autre article, contactez-nous. Nous traiterons votre échange en priorité sous 48h.</p>
        </div>
        
        <div className="mb-10 pb-10 border-b border-lux-border last:border-0">
          <h2 className="font-serif text-xl text-lux-dark mb-4">Produits non retournables</h2>
          <p className="text-lux-gray text-sm leading-[1.9]">Les produits personnalisés, les articles d'hygiène ouverts et les produits endommagés par le client ne peuvent pas être retournés.</p>
        </div>
        <div className="mt-10 p-6 bg-cream border border-lux-border text-center">
          <p className="text-lux-gray text-sm mb-3">Besoin d'initier un retour ?</p>
          <a href="https://wa.me/212770469416" target="_blank" className="btn-primary inline-flex"><span>Nous contacter sur WhatsApp</span></a>
        </div>
      </div>
    </div>
  )
}