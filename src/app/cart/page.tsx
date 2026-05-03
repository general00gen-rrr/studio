"use client"

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-32 text-center space-y-8">
        <h1 className="text-3xl font-bold uppercase tracking-tighter">Votre panier est vide</h1>
        <p className="text-muted-foreground font-light max-w-md mx-auto">
          Il semble que vous n'ayez pas encore ajouté d'articles. Découvrez notre collection pour trouver l'essentiel.
        </p>
        <Link href="/products">
          <Button className="bg-foreground text-background hover:bg-primary hover:text-primary-foreground h-14 px-10 rounded-none text-xs font-bold uppercase tracking-widest">
            Continuer vos achats
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold uppercase tracking-tighter mb-12">Votre Panier</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8">
          {items.map((item) => (
            <div key={item.id} className="flex gap-6 pb-8 border-b border-border group">
              <div className="relative w-24 h-32 md:w-32 md:h-40 bg-secondary flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-grow flex flex-col justify-between py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium tracking-tight mb-1">{item.name}</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Ref: #EP-{item.id.padStart(4, '0')}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex justify-between items-end mt-4">
                  <div className="flex items-center border border-border">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-3 py-1 hover:bg-secondary transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-4 py-1 text-xs font-medium w-10 text-center border-x border-border">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-3 py-1 hover:bg-secondary transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="font-semibold tracking-tighter">
                    {(item.price * item.quantity).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-secondary/50 p-8 space-y-6">
            <h2 className="text-lg font-bold uppercase tracking-widest">Récapitulatif</h2>
            <div className="space-y-4 text-sm font-light">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sous-total</span>
                <span>{total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Livraison</span>
                <span className="text-primary font-medium">Offerte</span>
              </div>
              <div className="pt-4 border-t border-border flex justify-between font-bold text-lg tracking-tighter">
                <span>Total</span>
                <span>{total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
              </div>
            </div>
            <Link href="/checkout" className="block w-full">
              <Button className="w-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground h-14 rounded-none text-xs font-bold uppercase tracking-widest group">
                Passer la commande <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="text-[10px] text-muted-foreground text-center uppercase tracking-[0.2em]">
              Paiement à la livraison uniquement
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}