import Link from 'next/link'

export default function Page() {
  return (
    <div className="pt-[88px] min-h-screen bg-white">
      <div className="bg-cream border-b border-lux-border py-14">
        <div className="container-lux">
          <div className="flex items-center gap-2 mb-4 text-[11px] tracking-[0.25em] uppercase text-lux-gray">
            <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-gold">Livraison & délais</span>
          </div>
          <h1 className="font-serif font-normal text-4xl text-lux-dark">Livraison & délais</h1>
          <div className="gold-divider mt-4" />
          <p className="text-lux-gray text-sm mt-3">Livraison rapide partout au Maroc</p>
        </div>
      </div>
      <div className="container-lux py-16 max-w-3xl">
        
        <div className="mb-10 pb-10 border-b border-lux-border last:border-0">
          <h2 className="font-serif text-xl text-lux-dark mb-4">Délais de livraison</h2>
          <p className="text-lux-gray text-sm leading-[1.9]">Vos commandes sont livrées en 24 à 48h ouvrables partout au Maroc. Les grandes villes (Casablanca, Rabat, Marrakech, Fès, Tanger) bénéficient généralement d'une livraison le lendemain.</p>
        </div>
        
        <div className="mb-10 pb-10 border-b border-lux-border last:border-0">
          <h2 className="font-serif text-xl text-lux-dark mb-4">Livraison gratuite</h2>
          <p className="text-lux-gray text-sm leading-[1.9]">La livraison est offerte pour toute commande à partir de 500 DH. En dessous de ce montant, des frais de livraison peuvent s'appliquer selon votre région.</p>
        </div>
        
        <div className="mb-10 pb-10 border-b border-lux-border last:border-0">
          <h2 className="font-serif text-xl text-lux-dark mb-4">Suivi de commande</h2>
          <p className="text-lux-gray text-sm leading-[1.9]">Une fois votre commande expédiée, vous recevrez un SMS avec les informations de suivi. Vous pouvez également nous contacter sur WhatsApp pour connaître le statut de votre livraison.</p>
        </div>
        
        <div className="mb-10 pb-10 border-b border-lux-border last:border-0">
          <h2 className="font-serif text-xl text-lux-dark mb-4">Zones de livraison</h2>
          <p className="text-lux-gray text-sm leading-[1.9]">Nous livrons dans toutes les villes du Maroc : Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir, Meknès, Oujda, Kenitra, Tétouan et bien d'autres.</p>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-10">
          <div className="text-center p-5 bg-cream border border-lux-border"><p className="text-2xl mb-2">🚚</p><p className="text-xs font-medium text-lux-dark tracking-wide">24–48h</p><p className="text-xs text-lux-gray mt-1">Délai standard</p></div><div className="text-center p-5 bg-cream border border-lux-border"><p className="text-2xl mb-2">📦</p><p className="text-xs font-medium text-lux-dark tracking-wide">Suivi SMS</p><p className="text-xs text-lux-gray mt-1">En temps réel</p></div><div className="text-center p-5 bg-cream border border-lux-border"><p className="text-2xl mb-2">🎁</p><p className="text-xs font-medium text-lux-dark tracking-wide">Emballage</p><p className="text-xs text-lux-gray mt-1">Soigné et sécurisé</p></div>
        </div>
      </div>
    </div>
  )
}