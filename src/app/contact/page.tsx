import Link from 'next/link'

export default function Page() {
  return (
    <div className="pt-[88px] min-h-screen bg-white">
      <div className="bg-cream border-b border-lux-border py-14">
        <div className="container-lux">
          <div className="flex items-center gap-2 mb-4 text-[11px] tracking-[0.25em] uppercase text-lux-gray">
            <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-gold">Nous contacter</span>
          </div>
          <h1 className="font-serif font-normal text-4xl text-lux-dark">Nous contacter</h1>
          <div className="gold-divider mt-4" />
          <p className="text-lux-gray text-sm mt-3">Notre équipe est à votre disposition</p>
        </div>
      </div>
      <div className="container-lux py-16 max-w-3xl">
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          
          <div className="p-8 bg-cream border border-lux-border text-center">
            <div className="text-3xl mb-4">💬</div>
            <h3 className="font-serif text-lux-dark text-lg mb-1">WhatsApp</h3>
            <p className="text-gold font-medium text-sm mb-1">+212 770 469 416</p>
            <p className="text-lux-gray text-xs mb-6">Réponse rapide — Lun–Sam 9h–18h</p>
            <a href="https://wa.me/212770469416" target="_blank" className="btn-primary inline-flex"><span>Écrire sur WhatsApp</span></a>
          </div>
          <div className="p-8 bg-cream border border-lux-border text-center">
            <div className="text-3xl mb-4">📧</div>
            <h3 className="font-serif text-lux-dark text-lg mb-1">Email</h3>
            <p className="text-gold font-medium text-sm mb-1">contact@luxe-boutique.ma</p>
            <p className="text-lux-gray text-xs mb-6">Réponse sous 24h ouvrables</p>
            <a href="mailto:contact@luxe-boutique.ma" target="_blank" className="btn-primary inline-flex"><span>Envoyer un email</span></a>
          </div>
        </div>
        
        <div className="mb-10 pb-10 border-b border-lux-border last:border-0">
          <h2 className="font-serif text-xl text-lux-dark mb-4">Horaires</h2>
          <p className="text-lux-gray text-sm leading-[1.9]">Notre service client est disponible du Lundi au Samedi de 9h à 18h. Le Dimanche et les jours fériés, nous répondons aux messages dès le lendemain matin.</p>
        </div>
        
        <div className="mb-10 pb-10 border-b border-lux-border last:border-0">
          <h2 className="font-serif text-xl text-lux-dark mb-4">Localisation</h2>
          <p className="text-lux-gray text-sm leading-[1.9]">LUXÉ Boutique opère depuis le Maroc et livre dans tout le pays. Notre entrepôt est basé à Casablanca. Pour toute demande professionnelle ou partenariat, écrivez-nous par email.</p>
        </div>
      </div>
    </div>
  )
}