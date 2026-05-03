"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Ajouté au panier",
      description: `${product.name} a été ajouté avec succès.`,
    });
  };

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary mb-4 flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={500}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Button
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-background hover:bg-primary hover:text-primary-foreground text-foreground rounded-full w-12 h-12 p-0 shadow-lg border-none"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          {product.category}
        </p>
        <h3 className="text-sm font-medium tracking-tight group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm font-semibold tracking-tighter">
          {product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
        </p>
      </div>
    </Link>
  );
}