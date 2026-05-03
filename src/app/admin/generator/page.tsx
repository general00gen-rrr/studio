"use client"

import { useState } from 'react';
import { adminGenerateProductDescriptions, AdminGenerateProductDescriptionsInput } from '@/ai/flows/admin-generate-product-descriptions-flow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Sparkles, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminGeneratorPage() {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState('');
  const { toast } = useToast();
  
  const [input, setInput] = useState<AdminGenerateProductDescriptionsInput>({
    productName: '',
    productCategory: 'Électronique',
    keyFeatures: [''],
    targetAudience: 'amateurs de design',
    existingDescription: '',
  });

  const handleAddFeature = () => {
    setInput({ ...input, keyFeatures: [...input.keyFeatures, ''] });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...input.keyFeatures];
    newFeatures[index] = value;
    setInput({ ...input, keyFeatures: newFeatures });
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.productName) {
      toast({ variant: "destructive", title: "Erreur", description: "Veuillez entrer le nom du produit." });
      return;
    }
    
    setLoading(true);
    try {
      const { generatedDescription } = await adminGenerateProductDescriptions(input);
      setResult(generatedDescription);
    } catch (error) {
      toast({ variant: "destructive", title: "Erreur", description: "Impossible de générer la description." });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copié !", description: "La description a été copiée dans le presse-papier." });
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <header className="mb-12 space-y-2">
        <h1 className="text-3xl font-bold uppercase tracking-tighter">Générateur de Descriptions IA</h1>
        <p className="text-muted-foreground font-light">Outil exclusif pour optimiser le SEO de votre catalogue Épure Boutique.</p>
      </header>

      <div className="grid grid-cols-1 gap-12">
        <Card className="rounded-none border-border">
          <CardHeader>
            <CardTitle className="text-lg uppercase tracking-widest font-bold">Détails du produit</CardTitle>
            <CardDescription>Remplissez les informations clés pour une génération optimale.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest">Nom du produit</Label>
                  <Input 
                    placeholder="ex: Lampe Arp" 
                    className="rounded-none" 
                    value={input.productName}
                    onChange={(e) => setInput({...input, productName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest">Catégorie</Label>
                  <Input 
                    placeholder="ex: Maison" 
                    className="rounded-none" 
                    value={input.productCategory}
                    onChange={(e) => setInput({...input, productCategory: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-[10px] font-bold uppercase tracking-widest">Points clés (un par ligne)</Label>
                {input.keyFeatures.map((feature, idx) => (
                  <Input 
                    key={idx}
                    placeholder={`Caractéristique ${idx + 1}`} 
                    className="rounded-none" 
                    value={feature}
                    onChange={(e) => handleFeatureChange(idx, e.target.value)}
                  />
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddFeature}
                  className="rounded-none text-[10px] font-bold uppercase tracking-widest"
                >
                  Ajouter un point
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest">Cible (Optionnel)</Label>
                <Input 
                  placeholder="ex: jeunes professionnels" 
                  className="rounded-none" 
                  value={input.targetAudience}
                  onChange={(e) => setInput({...input, targetAudience: e.target.value})}
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-12 text-xs font-bold uppercase tracking-widest"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                Générer la description SEO
              </Button>
            </form>
          </CardContent>
        </Card>

        {result && (
          <Card className="rounded-none border-primary animate-in fade-in slide-in-from-top-4 duration-500">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg uppercase tracking-widest font-bold">Résultat Généré</CardTitle>
                <CardDescription>Description optimisée pour Épure Boutique.</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={handleCopy}>
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/50 p-6 font-light leading-relaxed text-sm whitespace-pre-wrap">
                {result}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}