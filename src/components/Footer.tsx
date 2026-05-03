import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-20 py-20">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-xl font-bold tracking-tighter uppercase mb-6">Épure</h3>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
            L'excellence du minimalisme pour votre quotidien. Une sélection soignée de produits d'exception.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Boutique</h4>
          <ul className="space-y-4 text-sm text-muted-foreground uppercase tracking-wider">
            <li><Link href="/products" className="hover:text-foreground transition-colors">Tous les produits</Link></li>
            <li><Link href="/products?category=nouveautes" className="hover:text-foreground transition-colors">Nouveautés</Link></li>
            <li><Link href="/products?category=promotions" className="hover:text-foreground transition-colors">Promotions</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Support</h4>
          <ul className="space-y-4 text-sm text-muted-foreground uppercase tracking-wider">
            <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
            <li><Link href="/shipping" className="hover:text-foreground transition-colors">Livraison</Link></li>
            <li><Link href="/returns" className="hover:text-foreground transition-colors">Retours</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Contact</h4>
          <ul className="space-y-4 text-sm text-muted-foreground uppercase tracking-wider">
            <li><Link href="mailto:contact@epure.com" className="hover:text-foreground transition-colors">contact@epure.com</Link></li>
            <li><Link href="tel:+33123456789" className="hover:text-foreground transition-colors">+33 1 23 45 67 89</Link></li>
            <li className="text-xs pt-4 opacity-50">Paris, France</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground uppercase tracking-widest">
          © {new Date().getFullYear()} Épure Boutique. Tous droits réservés.
        </p>
        <div className="flex gap-6 text-xs text-muted-foreground uppercase tracking-widest">
          <Link href="/privacy" className="hover:text-foreground transition-colors">Confidentialité</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">CGV</Link>
        </div>
      </div>
    </footer>
  );
}