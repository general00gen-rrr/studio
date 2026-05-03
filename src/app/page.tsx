import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const featuredProducts = [
    { id: '1', name: 'Montre Signature Or', price: 450, category: 'Accessoires', image: PlaceHolderImages.find(img => img.id === 'watch-gold')?.imageUrl || '' },
    { id: '2', name: 'Lampe Épure Blanche', price: 189, category: 'Maison', image: PlaceHolderImages.find(img => img.id === 'lamp-modern')?.imageUrl || '' },
    { id: '3', name: 'Chaise Nordic Minimal', price: 299, category: 'Maison', image: PlaceHolderImages.find(img => img.id === 'chair-white')?.imageUrl || '' },
    { id: '4', name: 'Casque Studio Pro', price: 320, category: 'Tech', image: PlaceHolderImages.find(img => img.id === 'tech-headphones')?.imageUrl || '' },
  ];

  return (
    <div className="space-y-32 pb-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={PlaceHolderImages.find(img => img.id === 'hero-bg')?.imageUrl || ''}
            alt="Hero background"
            fill
            className="object-cover brightness-95"
            priority
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-foreground/70">
              Collection Été 2024
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none uppercase">
              L'Art de <br /> l'Essentiel
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-lg font-light leading-relaxed">
              Découvrez une sélection méticuleuse de produits conçus pour sublimer votre quotidien avec simplicité et élégance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/products">
                <Button size="lg" className="bg-foreground text-background hover:bg-primary hover:text-primary-foreground px-10 h-14 rounded-none text-xs font-bold uppercase tracking-widest">
                  Découvrir la Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold uppercase tracking-tighter">Collections Phares</h2>
            <p className="text-muted-foreground font-light">Le meilleur du design contemporain.</p>
          </div>
          <Link href="/products" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">
            Voir tout <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Banner Section */}
      <section className="bg-foreground text-background py-32 overflow-hidden relative">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none">
              Épure Boutique : <br /> Le luxe discret
            </h2>
            <p className="text-muted-foreground text-lg font-light max-w-md">
              Nous croyons que la qualité surpasse la quantité. Chaque pièce de notre catalogue est choisie pour son design intemporel et sa fonctionnalité parfaite.
            </p>
            <Link href="/about">
              <Button variant="outline" className="border-background text-background hover:bg-background hover:text-foreground h-12 rounded-none px-8 text-xs font-bold uppercase tracking-widest">
                Notre Philosophie
              </Button>
            </Link>
          </div>
          <div className="relative aspect-square md:aspect-[4/3] bg-secondary/10 flex items-center justify-center">
            <Image
              src={PlaceHolderImages.find(img => img.id === 'perfume-bottle')?.imageUrl || ''}
              alt="Banner image"
              fill
              className="object-cover opacity-80"
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-6 text-center py-20">
        <div className="max-w-xl mx-auto space-y-8">
          <h2 className="text-2xl font-bold uppercase tracking-widest">Restez Inspiré</h2>
          <p className="text-muted-foreground font-light leading-relaxed">
            Inscrivez-vous à notre newsletter pour recevoir nos dernières nouveautés et inspirations design directement dans votre boîte mail.
          </p>
          <form className="flex flex-col sm:flex-row gap-0 border border-foreground/20">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-grow bg-transparent px-6 py-4 outline-none text-sm"
            />
            <Button className="bg-foreground text-background hover:bg-primary hover:text-primary-foreground rounded-none h-auto px-8 py-4 text-[10px] font-bold uppercase tracking-widest">
              S'inscrire
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}