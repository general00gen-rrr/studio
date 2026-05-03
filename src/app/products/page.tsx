"use client"

import { useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const ALL_PRODUCTS = [
  { id: '1', name: 'Montre Signature Or', price: 450, category: 'Accessoires', image: PlaceHolderImages.find(img => img.id === 'watch-gold')?.imageUrl || '' },
  { id: '2', name: 'Lampe Épure Blanche', price: 189, category: 'Maison', image: PlaceHolderImages.find(img => img.id === 'lamp-modern')?.imageUrl || '' },
  { id: '3', name: 'Chaise Nordic Minimal', price: 299, category: 'Maison', image: PlaceHolderImages.find(img => img.id === 'chair-white')?.imageUrl || '' },
  { id: '4', name: 'Casque Studio Pro', price: 320, category: 'Tech', image: PlaceHolderImages.find(img => img.id === 'tech-headphones')?.imageUrl || '' },
  { id: '5', name: 'Parfum Essence N°5', price: 145, category: 'Beauté', image: PlaceHolderImages.find(img => img.id === 'perfume-bottle')?.imageUrl || '' },
  { id: '6', name: 'Vase Céramique Brute', price: 75, category: 'Maison', image: 'https://picsum.photos/seed/vase1/800/800' },
  { id: '7', name: 'Table Basse Marbre', price: 890, category: 'Maison', image: 'https://picsum.photos/seed/table1/800/800' },
  { id: '8', name: 'Enceinte Minimal Air', price: 540, category: 'Tech', image: 'https://picsum.photos/seed/speaker1/800/800' },
];

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');

  const categories = ['Tous', 'Maison', 'Tech', 'Accessoires', 'Beauté'];

  const filteredProducts = ALL_PRODUCTS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'Tous' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-6 py-12 space-y-12">
      <header className="space-y-8">
        <h1 className="text-4xl font-bold uppercase tracking-tighter">Catalogue</h1>
        
        <div className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 border transition-all ${
                  activeCategory === cat 
                  ? 'bg-foreground text-background border-foreground' 
                  : 'bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-none border-border focus:border-foreground"
            />
          </div>
        </div>
      </header>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 space-y-4">
          <p className="text-muted-foreground italic font-light">Aucun produit ne correspond à votre recherche.</p>
          <button onClick={() => {setSearch(''); setActiveCategory('Tous');}} className="text-xs font-bold underline uppercase tracking-widest">
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
}