"use client"

import { useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, Truck } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
  const [isOrdered, setIsOrdered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      toast({
        variant: "destructive",
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires.",
      });
      return;
    }
    
    // Simulate order processing
    setIsOrdered(true);
    clearCart();
    toast({
      title: "Commande confirmée",
      description: "Votre commande a été reçue avec succès.",
    });
  };

  if (isOrdered) {
    return (
      <div className="container mx-auto px-6 py-32 text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 text-primary mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-bold uppercase tracking-tighter">Merci pour votre confiance</h1>
        <p className="text-muted-foreground font-light max-w-md mx-auto">
          Votre commande a été enregistrée. Notre équipe vous contactera sous peu pour confirmer la livraison. 
          Le paiement s'effectuera en espèces à la réception.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
          <Link href="/">
            <Button variant="outline" className="h-12 px-8 rounded-none text-xs font-bold uppercase tracking-widest">
              Retour à l'accueil
            </Button>
          </Link>
          <Link href="/products">
            <Button className="bg-foreground text-background h-12 px-8 rounded-none text-xs font-bold uppercase tracking-widest">
              Continuer mes achats
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-32 text-center">
        <h1 className="text-2xl font-bold uppercase tracking-widest mb-4">Panier Vide</h1>
        <Link href="/products">
          <Button variant="link" className="uppercase text-xs font-bold tracking-widest">Retourner en boutique</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold uppercase tracking-tighter mb-12">Finaliser la commande</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground pb-2 border-b">Informations de livraison</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold">Nom complet *</Label>
                <Input 
                  required
                  placeholder="Jean Dupont" 
                  className="rounded-none h-12 border-border focus:border-foreground"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold">Téléphone *</Label>
                <Input 
                  required
                  type="tel" 
                  placeholder="+33 6 12 34 56 78" 
                  className="rounded-none h-12 border-border focus:border-foreground"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-widest font-bold">Adresse email</Label>
              <Input 
                type="email" 
                placeholder="jean.dupont@email.com" 
                className="rounded-none h-12 border-border focus:border-foreground"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-widest font-bold">Adresse exacte *</Label>
              <Textarea 
                required
                placeholder="N° de rue, nom de rue..." 
                className="rounded-none min-h-[100px] border-border focus:border-foreground"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold">Ville</Label>
                <Input 
                  placeholder="Paris" 
                  className="rounded-none h-12 border-border focus:border-foreground"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest font-bold">Code Postal</Label>
                <Input 
                  placeholder="75001" 
                  className="rounded-none h-12 border-border focus:border-foreground"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="p-6 border-l-4 border-primary bg-primary/5 space-y-4">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-primary" />
              <h3 className="font-bold uppercase tracking-widest text-xs">Paiement à la livraison</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Vous paierez le montant total de <strong>{total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</strong> directement au livreur lors de la remise de votre colis. 
              Veuillez préparer l'appoint si possible.
            </p>
          </div>

          <Button type="submit" className="w-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground h-14 rounded-none text-xs font-bold uppercase tracking-widest">
            Confirmer ma commande
          </Button>
        </form>

        <div className="space-y-8">
          <div className="bg-secondary/30 p-8 space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground pb-2 border-b">Résumé de commande</h2>
            <div className="space-y-6 max-h-[400px] overflow-auto pr-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-16 bg-secondary flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-tighter">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground">Quantité: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-xs font-bold">{(item.price * item.quantity).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
                </div>
              ))}
            </div>
            <div className="pt-6 border-t border-border flex justify-between items-end">
              <span className="text-xs font-bold uppercase tracking-widest">Total à payer</span>
              <span className="text-2xl font-bold tracking-tighter">{total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
            </div>
          </div>
          
          <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] leading-loose text-center">
            * Livraison garantie en 48-72h <br />
            * Retour possible sous 14 jours <br />
            * Service client disponible 24/7
          </div>
        </div>
      </div>
    </div>
  );
}