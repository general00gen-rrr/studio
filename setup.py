#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
LUXÉ BOUTIQUE — Setup Script
Exécuter: python3 setup.py
"""
import os, subprocess, sys

def w(path, content):
    d = os.path.dirname(path)
    if d: os.makedirs(d, exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'  ✅ {path}')

print('\n🛍️  LUXÉ BOUTIQUE — Installation...\n')

# ─── DEPENDENCIES ───────────────────────────────────────────────────────────
print('📦 Installation des dépendances...')
r = subprocess.run(['npm','install','framer-motion','zustand'], capture_output=True, text=True)
if r.returncode != 0:
    print(f'Erreur npm: {r.stderr[:300]}')
    sys.exit(1)
print('✅ framer-motion + zustand installés!\n')

print('📝 Création des fichiers...\n')

# ─── TAILWIND CONFIG ─────────────────────────────────────────────────────────
w('tailwind.config.ts', """import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gold: { DEFAULT: '#C8A96E', light: '#D9BF8A', dark: '#A88A4E' },
        cream: '#F9F7F4',
        'lux-dark': '#1A1A1A',
        'lux-gray': '#6B6B6B',
        'lux-border': '#E8E4DF',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeUp: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        scaleIn: { from: { opacity: '0', transform: 'scale(0.96)' }, to: { opacity: '1', transform: 'scale(1)' } },
        slideRight: { from: { transform: 'translateX(-100%)' }, to: { transform: 'translateX(0)' } },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'slide-right': 'slideRight 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}
export default config
""")

# ─── NEXT CONFIG ─────────────────────────────────────────────────────────────
w('next.config.ts', """import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
}
export default nextConfig
""")

# ─── GLOBALS CSS ─────────────────────────────────────────────────────────────
w('src/app/globals.css', """@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');

:root {
  --gold: #C8A96E;
  --gold-light: #D9BF8A;
  --gold-dark: #A88A4E;
  --cream: #F9F7F4;
  --dark: #1A1A1A;
  --gray: #6B6B6B;
  --border: #E8E4DF;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { font-family: 'Inter', sans-serif; background: #fff; color: var(--dark); -webkit-font-smoothing: antialiased; }

.font-serif { font-family: 'Playfair Display', serif; }

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #f1f1f1; }
::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

/* Gold Button */
.btn-gold {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--dark); color: #fff;
  padding: 14px 32px; font-size: 13px; letter-spacing: 0.15em;
  text-transform: uppercase; font-weight: 500;
  transition: all 0.3s ease; position: relative; overflow: hidden;
}
.btn-gold::after {
  content: ''; position: absolute; inset: 0;
  background: var(--gold); transform: translateX(-101%);
  transition: transform 0.3s ease;
}
.btn-gold:hover::after { transform: translateX(0); }
.btn-gold span { position: relative; z-index: 1; }

/* Gold Outline Button */
.btn-outline {
  display: inline-flex; align-items: center; gap: 8px;
  border: 1px solid var(--dark); color: var(--dark);
  padding: 12px 28px; font-size: 13px; letter-spacing: 0.12em;
  text-transform: uppercase; font-weight: 500;
  transition: all 0.3s ease;
}
.btn-outline:hover { background: var(--dark); color: #fff; }

/* Container */
.container-lux { max-width: 1320px; margin: 0 auto; padding: 0 24px; }

/* Section titles */
.section-label { font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); font-weight: 500; margin-bottom: 12px; }
.section-title { font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 48px); font-weight: 400; color: var(--dark); line-height: 1.2; }

/* Gold divider */
.gold-divider { width: 48px; height: 2px; background: var(--gold); margin: 16px 0; }

/* Hover scale image */
.img-hover-zoom { overflow: hidden; }
.img-hover-zoom img { transition: transform 0.6s ease; }
.img-hover-zoom:hover img { transform: scale(1.06); }

/* Input styles */
.input-lux {
  width: 100%; border: 1px solid var(--border); padding: 14px 16px;
  font-size: 14px; font-family: 'Inter', sans-serif; background: #fff;
  outline: none; transition: border-color 0.2s;
}
.input-lux:focus { border-color: var(--gold); }

/* Animation delays */
.delay-100 { animation-delay: 0.1s; opacity: 0; }
.delay-200 { animation-delay: 0.2s; opacity: 0; }
.delay-300 { animation-delay: 0.3s; opacity: 0; }
.delay-400 { animation-delay: 0.4s; opacity: 0; }
.delay-500 { animation-delay: 0.5s; opacity: 0; }
""")

# ─── LAYOUT ──────────────────────────────────────────────────────────────────
w('src/app/layout.tsx', """import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400','500','600','700'],
  style: ['normal','italic'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300','400','500','600'],
})

export const metadata: Metadata = {
  title: 'LUXÉ — Boutique Premium',
  description: 'Sélection premium de produits pour votre quotidien. Livraison au Maroc, paiement à la livraison.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
""")

# ─── PRODUCTS DATA ────────────────────────────────────────────────────────────
w('src/lib/products.ts', """export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  category: string
  description: string
  details: string
  image: string
  badge?: 'nouveau' | 'promo' | 'bestseller'
  rating: number
  reviews: number
  stock: number
  features: string[]
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
  count: number
}

export const categories: Category[] = [
  { id: 'maison', name: 'Maison', description: 'Décorez avec élégance', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', count: 6 },
  { id: 'mode', name: 'Mode', description: 'Exprimez votre style', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', count: 5 },
  { id: 'beaute', name: 'Beauté', description: 'Révélez votre beauté', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80', count: 3 },
  { id: 'tech', name: 'Tech', description: 'Innovation au quotidien', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80', count: 3 },
  { id: 'cuisine', name: 'Cuisine', description: 'Art culinaire premium', image: 'https://images.unsplash.com/photo-1556910103-1c02745adc4b?w=600&q=80', count: 3 },
  { id: 'sport', name: 'Sport', description: 'Performance & style', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80', count: 2 },
]

export const products: Product[] = [
  {
    id: '1', name: 'Lampe Arc Dorée', price: 890, category: 'maison',
    description: 'Lampe sur pied en métal doré, design contemporain',
    details: 'Cette élégante lampe arc en métal doré apporte une lumière douce et une touche de sophistication. Son abat-jour en lin crème crée une ambiance chaleureuse et raffinée.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    badge: 'nouveau', rating: 4.8, reviews: 24, stock: 15,
    features: ['Hauteur 180cm', 'Ampoule E27 incluse', 'Câble tissu', 'Interrupteur au pied'],
  },
  {
    id: '2', name: 'Miroir Ovale Arche', price: 1200, category: 'maison',
    description: 'Miroir mural arche, cadre doré mat 60x120cm',
    details: 'Ce miroir ovale en forme d\'arche avec son cadre doré mat agrandit visuellement l\'espace et apporte une touche luxueuse. Fixation murale incluse.',
    image: 'https://images.unsplash.com/photo-1576020799627-aeac74d58064?w=600&q=80',
    rating: 4.9, reviews: 31, stock: 8,
    features: ['60 x 120 cm', 'Cadre métal doré', 'Miroir anti-déformation', 'Fixation incluse'],
  },
  {
    id: '3', name: 'Bougie Oud & Rose', price: 280, category: 'maison',
    description: 'Bougie artisanale cire soja, 60h de brûlage',
    details: 'Bougie artisanale en cire de soja 100% naturelle. Son mélange d\'oud oriental et de rose marocaine crée une atmosphère envoûtante. Contenant en verre recyclé.',
    image: 'https://images.unsplash.com/photo-1602607165068-3afc1b67e521?w=600&q=80',
    badge: 'bestseller', rating: 4.7, reviews: 89, stock: 45,
    features: ['Cire de soja naturelle', '60h de brûlage', 'Parfum Oud & Rose', 'Pot verre recyclé'],
  },
  {
    id: '4', name: 'Vase Marbre Blanc', price: 450, category: 'maison',
    description: 'Vase sculpture en marbre naturel veiné',
    details: 'Vase sculptural en marbre blanc veiné. Chaque pièce est unique grâce aux nuances naturelles du marbre. Idéal pour fleurs fraîches ou comme objet déco.',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&q=80',
    rating: 4.6, reviews: 18, stock: 12,
    features: ['Marbre naturel', 'H. 25cm / D. 12cm', 'Pièce unique', 'Fond anti-rayures'],
  },
  {
    id: '5', name: 'Coussin Velours Camel', price: 180, category: 'maison',
    description: 'Coussin décoratif velours premium 50×50cm',
    details: 'Coussin en velours camel haute qualité. Garnissage en duvet synthétique ultra-doux, fermeture invisible par zip. Déhoussable et lavable.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    rating: 4.5, reviews: 42, stock: 30,
    features: ['50 x 50 cm', 'Velours 100% polyester', 'Garnissage duvet synt.', 'Lavable 30°'],
  },
  {
    id: '6', name: 'Plateau Laiton Ciselé', price: 320, category: 'maison',
    description: 'Plateau décoratif en laiton, motifs arabesques',
    details: 'Plateau artisanal en laiton doré avec motifs arabesques ciselés à la main par des artisans marocains. Parfait pour servir le thé ou comme pièce décorative.',
    image: 'https://images.unsplash.com/photo-1617104551722-3b2d51366400?w=600&q=80',
    badge: 'nouveau', rating: 4.8, reviews: 27, stock: 20,
    features: ['Diam. 40cm', 'Laiton massif', 'Ciselage main', 'Artisanat marocain'],
  },
  {
    id: '7', name: 'Blazer Structuré Ivoire', price: 1100, category: 'mode',
    description: 'Blazer ajusté crêpe de laine, coupe française',
    details: 'Blazer ivoire à la coupe française impeccable, taillé dans un crêpe de laine premium. Silhouette structurée et finitions soignées pour toutes les occasions.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
    badge: 'nouveau', rating: 4.8, reviews: 15, stock: 10,
    features: ['Crêpe de laine 70%', 'Doublure soie', 'Boutonnage doré', 'Tailles XS-XL'],
  },
  {
    id: '8', name: 'Sac Cuir Camel', price: 1800, category: 'mode',
    description: 'Sac à main cuir véritable, fermoir doré',
    details: 'Sac artisanal en cuir pleine fleur camel. Structure souple, finitions en métal doré, poche zippée intérieure. Élégance intemporelle pour chaque tenue.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    badge: 'bestseller', rating: 4.9, reviews: 47, stock: 6,
    features: ['Cuir pleine fleur', 'Fermoir doré', 'Doublure suède', 'Bandoulière amovible'],
  },
  {
    id: '9', name: 'Montre Classic Or', price: 2500, category: 'mode',
    description: 'Montre élégante acier doré, cadran blanc nacre',
    details: 'Montre classique à mouvement suisse. Boîtier acier doré, cadran blanc nacré, bracelet cuir chocolat. Étanche 3ATM. Livrée avec boîte cadeau.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
    rating: 4.8, reviews: 33, stock: 9,
    features: ['Mouvement suisse', 'Verre saphir', 'Étanche 3ATM', 'Boîte cadeau incluse'],
  },
  {
    id: '10', name: 'Sneakers Blanc Cuir', price: 890, category: 'mode',
    description: 'Baskets cuir blanc premium, semelle plateforme',
    details: 'Sneakers en cuir blanc véritable avec semelle plateforme légèrement surélevée. Confort exceptionnel, style minimaliste et intemporel.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    rating: 4.7, reviews: 56, stock: 20,
    features: ['Cuir véritable', 'Semelle +3cm', 'Pointures 36-45', 'Sac à chaussures inclus'],
  },
  {
    id: '11', name: 'Robe Lin Naturel', price: 680, category: 'mode',
    description: 'Robe mi-longue lin 100% naturel, coupe fluide',
    details: 'Robe en lin naturel 100% biologique, coupe droite légèrement évasée. Confort absolu pour toutes les saisons. Disponible en ivoire et sable.',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80',
    rating: 4.6, reviews: 28, stock: 18,
    features: ['Lin 100% bio', 'Mi-longue', 'Coupe fluide', '2 coloris'],
  },
  {
    id: '12', name: 'Parfum Oud Intense', price: 650, category: 'beaute',
    description: 'Eau de parfum 100ml, oud, ambre & rose',
    details: 'Fragrance orientale envoûtante. Tête: bergamote & safran. Cœur: rose marocaine & oud. Fond: ambre & musc blanc. Sillage intense, 12h+.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80',
    badge: 'bestseller', rating: 4.9, reviews: 102, stock: 25,
    features: ['100ml EDP', 'Vaporisateur', 'Notes orientales', 'Coffret luxe'],
  },
  {
    id: '13', name: 'Sérum Vitamine C Gold', price: 380, category: 'beaute',
    description: 'Sérum illuminateur vit.C & particules d\'or 24K',
    details: 'Sérum anti-âge luxueux combinant vitamine C stabilisée et micro-particules d\'or 24K. Illumine, rafferme et unifie le teint. Résultats visibles en 14 jours.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    badge: 'nouveau', rating: 4.7, reviews: 64, stock: 35,
    features: ['30ml', 'Vitamine C 15%', 'Or 24K', 'Sans paraben'],
  },
  {
    id: '14', name: 'Set Soin Argan Bio', price: 920, category: 'beaute',
    description: 'Coffret 5 soins huile d\'argan pure du Maroc',
    details: 'Coffret premium 5 produits à l\'huile d\'argan bio certifiée du Maroc: huile visage, crème jour, crème nuit, sérum et masque hebdomadaire.',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80',
    rating: 4.8, reviews: 37, stock: 12,
    features: ['5 produits', 'Argan bio certifié', 'Made in Morocco', 'Coffret cadeau'],
  },
  {
    id: '15', name: 'Casque Audio Premium', price: 1200, category: 'tech',
    description: 'Casque sans fil ANC, 30h d\'autonomie',
    details: 'Casque haute-fidélité avec réduction de bruit active hybride. Drivers 40mm, son Hi-Res. 30h d\'autonomie, charge rapide 15min = 3h. Coussinets mémoire de forme.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    rating: 4.8, reviews: 78, stock: 14,
    features: ['ANC hybride', '30h autonomie', 'Hi-Res Audio', 'Bluetooth 5.2'],
  },
  {
    id: '16', name: 'Montre Connectée Sport', price: 1800, category: 'tech',
    description: 'Smartwatch GPS, suivi santé avancé, AMOLED',
    details: 'Montre connectée avec écran AMOLED 1.4". GPS intégré, FC, SpO2, sommeil, stress. 50+ modes sport. Étanche 5ATM. Autonomie 14 jours.',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80',
    badge: 'nouveau', rating: 4.7, reviews: 45, stock: 11,
    features: ['AMOLED 1.4"', 'GPS intégré', 'Étanche 5ATM', '14 jours autonomie'],
  },
  {
    id: '17', name: 'Enceinte Portable Luxe', price: 650, category: 'tech',
    description: 'Enceinte Bluetooth 360°, finition aluminium',
    details: 'Enceinte portable en aluminium brossé premium. Son omnidirectionnel 360°, basses profondes. Étanche IPX7, 20h d\'autonomie, charge USB-C.',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80',
    rating: 4.6, reviews: 52, stock: 20,
    features: ['Aluminium brossé', 'IPX7', '20h autonomie', 'Son 360°'],
  },
  {
    id: '18', name: 'Robot Pâtissier Pro', price: 2800, category: 'cuisine',
    description: 'Robot 6.5L, 1200W, 10 vitesses + minuteur',
    details: 'Robot pâtissier professionnel 1200W, bol 6.5L inox. 10 vitesses + turbo. Livré avec fouet ballon, crochet pétrisseur et feuille. Tête basculante.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745adc4b?w=600&q=80',
    rating: 4.8, reviews: 29, stock: 7,
    features: ['1200W', 'Bol 6.5L inox', '10 vitesses', '3 accessoires inclus'],
  },
  {
    id: '19', name: 'Set Couteaux Japonais', price: 780, category: 'cuisine',
    description: '5 couteaux acier Damas 67 couches + bloc',
    details: 'Set de 5 couteaux en acier Damas japonais 67 couches (chef, à pain, désosseur, santoku, économe). Manches pakkawood ergonomiques. Bloc bois inclus.',
    image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600&q=80',
    badge: 'bestseller', rating: 4.9, reviews: 41, stock: 15,
    features: ['Acier Damas 67C', 'Dureté 62 HRC', 'Manche pakkawood', 'Bloc bois inclus'],
  },
  {
    id: '20', name: 'Service Thé Marocain', price: 450, category: 'cuisine',
    description: 'Service 8 pièces métal argenté ciselé main',
    details: 'Service à thé marocain artisanal en métal argenté ciselé à la main par des artisans de Fès. Inclut: 1 théière, 6 verres, 1 plateau. Coffret cadeau.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
    rating: 4.7, reviews: 36, stock: 22,
    features: ['8 pièces', 'Ciselé main', 'Artisanat de Fès', 'Coffret cadeau'],
  },
  {
    id: '21', name: 'Tapis de Yoga Premium', price: 480, category: 'sport',
    description: 'Tapis yoga TPE 6mm, antidérapant, 183×61cm',
    details: 'Tapis de yoga professionnel en TPE écologique, épaisseur 6mm. Surface antidérapante bilatérale, alignement imprimé. Léger 1.2kg, sangle incluse.',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80',
    rating: 4.7, reviews: 33, stock: 25,
    features: ['TPE écologique', '183 × 61 cm', '6mm épaisseur', 'Sangle incluse'],
  },
  {
    id: '22', name: 'Bouteille Inox Luxe', price: 250, category: 'sport',
    description: 'Gourde isotherme 750ml, acier inox, 24h froid',
    details: 'Bouteille isotherme en acier inoxydable 18/8 alimentaire. Double paroi sous vide: 24h froid / 12h chaud. Finition matte premium, sans BPA.',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80',
    rating: 4.6, reviews: 58, stock: 40,
    features: ['750ml', 'Inox 18/8', '24h froid / 12h chaud', 'Sans BPA'],
  },
]

export const getFeatured = () => products.slice(0, 8)
export const getNew = () => products.filter(p => p.badge === 'nouveau')
export const getBest = () => products.filter(p => p.badge === 'bestseller')
export const getByCat = (cat: string) => products.filter(p => p.category === cat)
export const getById = (id: string) => products.find(p => p.id === id)
export const formatPrice = (p: number) => `${p.toLocaleString('fr-MA')} DH`
""")

# ─── CART STORE ───────────────────────────────────────────────────────────────
w('src/lib/cartStore.ts', """import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  toggleCart: () => void
  total: () => number
  count: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => set((s) => {
        const ex = s.items.find(i => i.id === item.id)
        if (ex) return { items: s.items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) }
        return { items: [...s.items, { ...item, quantity: 1 }] }
      }),
      removeItem: (id) => set((s) => ({ items: s.items.filter(i => i.id !== id) })),
      updateQty: (id, qty) => set((s) => ({
        items: qty <= 0 ? s.items.filter(i => i.id !== id) : s.items.map(i => i.id === id ? { ...i, quantity: qty } : i)
      })),
      clearCart: () => set({ items: [] }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'luxe-cart' }
  )
)
""")

# ─── NAVBAR ───────────────────────────────────────────────────────────────────
w('src/components/Navbar.tsx', """'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/cartStore'
import { useRouter } from 'next/navigation'

const links = [
  { href: '/products', label: 'Tous les produits' },
  { href: '/products?cat=maison', label: 'Maison' },
  { href: '/products?cat=mode', label: 'Mode' },
  { href: '/products?cat=beaute', label: 'Beauté' },
  { href: '/products?cat=tech', label: 'Tech' },
]

export default function Navbar() {
  const { count, items, removeItem, total, isOpen, toggleCart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-sm' : 'bg-white/95 backdrop-blur-sm'}`}>
        {/* Top bar */}
        <div className="bg-lux-dark text-white text-center py-2 text-xs tracking-widest uppercase">
          🚚 Livraison gratuite au Maroc dès 500 DH — Paiement à la livraison
        </div>
        {/* Main nav */}
        <nav className="container-lux flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl font-semibold tracking-widest text-lux-dark">
            LUXÉ
          </Link>
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="text-xs tracking-widest uppercase text-lux-gray hover:text-gold transition-colors font-medium">
                {l.label}
              </Link>
            ))}
          </div>
          {/* Actions */}
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/products')} className="text-lux-gray hover:text-gold transition-colors hidden md:block">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </button>
            <button onClick={toggleCart} className="relative text-lux-gray hover:text-gold transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              {count() > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                  {count()}
                </span>
              )}
            </button>
            <button className="md:hidden text-lux-gray" onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16"/>}
              </svg>
            </button>
          </div>
        </nav>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-lux-border animate-fade-in">
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block px-6 py-4 text-xs tracking-widest uppercase text-lux-gray hover:text-gold border-b border-lux-border">
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[100]" onClick={toggleCart}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        </div>
      )}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-lux-border">
          <h2 className="font-serif text-xl">Panier <span className="text-lux-gray text-sm font-sans">({count()} articles)</span></h2>
          <button onClick={toggleCart} className="text-lux-gray hover:text-gold transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🛍️</div>
              <p className="text-lux-gray font-serif text-lg">Votre panier est vide</p>
              <p className="text-lux-gray text-sm mt-2">Découvrez nos produits premium</p>
              <button onClick={toggleCart} className="btn-gold mt-6"><span>Explorer</span></button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 p-4 bg-cream rounded">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-gold font-medium text-sm mt-1">{item.price.toLocaleString('fr-MA')} DH</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => removeItem(item.id)} className="text-xs text-lux-gray hover:text-red-500 transition-colors">Supprimer</button>
                      <span className="text-lux-border">|</span>
                      <span className="text-xs text-lux-gray">Qté: {item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {items.length > 0 && (
          <div className="p-6 border-t border-lux-border">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total</span>
              <span className="font-serif text-xl font-semibold">{total().toLocaleString('fr-MA')} DH</span>
            </div>
            <p className="text-xs text-green-600 mb-4 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              Paiement à la livraison disponible
            </p>
            <Link href="/checkout" onClick={toggleCart} className="btn-gold w-full text-center justify-center"><span>Commander maintenant</span></Link>
          </div>
        )}
      </div>
    </>
  )
}
""")

# ─── FOOTER ───────────────────────────────────────────────────────────────────
w('src/components/Footer.tsx', """import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-lux-dark text-white">
      {/* Main footer */}
      <div className="container-lux py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="col-span-1">
          <span className="font-serif text-2xl tracking-widest">LUXÉ</span>
          <div className="gold-divider mt-4 mb-4" />
          <p className="text-white/60 text-sm leading-relaxed">
            Sélection premium de produits pour votre quotidien. Livraison dans tout le Maroc.
          </p>
          <div className="flex gap-4 mt-6">
            {['instagram','facebook','pinterest'].map(s => (
              <a key={s} href="#" className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/60 hover:border-gold hover:text-gold transition-colors text-xs uppercase">{s[0]}</a>
            ))}
          </div>
        </div>
        {/* Boutique */}
        <div>
          <h4 className="text-xs tracking-widest uppercase text-gold mb-6">Boutique</h4>
          <ul className="space-y-3">
            {[['Tous les produits','/products'],['Nouveautés','/products?badge=nouveau'],['Best-sellers','/products?badge=bestseller'],['Maison','/products?cat=maison'],['Mode','/products?cat=mode'],['Beauté','/products?cat=beaute']].map(([label,href]) => (
              <li key={href}><Link href={href} className="text-white/60 text-sm hover:text-gold transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
        {/* Service */}
        <div>
          <h4 className="text-xs tracking-widest uppercase text-gold mb-6">Service Client</h4>
          <ul className="space-y-3">
            {['Comment commander','Livraison & délais','Paiement à la livraison','Retours & échanges','FAQ','Nous contacter'].map(item => (
              <li key={item}><a href="#" className="text-white/60 text-sm hover:text-gold transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>
        {/* Contact */}
        <div>
          <h4 className="text-xs tracking-widest uppercase text-gold mb-6">Contact</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li className="flex items-start gap-3">
              <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              +212 6 00 00 00 00
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              contact@luxe-boutique.ma
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Lun–Sam: 9h–18h
            </li>
          </ul>
          <div className="mt-6 p-4 border border-white/10 bg-white/5">
            <p className="text-xs text-white/60 mb-1">🇲🇦 Livraison dans tout le Maroc</p>
            <p className="text-xs text-gold font-medium">Paiement à la livraison</p>
          </div>
        </div>
      </div>
      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="container-lux py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">© 2024 LUXÉ Boutique. Tous droits réservés.</p>
          <div className="flex gap-6">
            {['Confidentialité','CGV','Mentions légales'].map(item => (
              <a key={item} href="#" className="text-white/40 text-xs hover:text-white/70 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
""")

# ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
w('src/components/ProductCard.tsx', """'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product, formatPrice } from '@/lib/products'
import { useCart } from '@/lib/cartStore'

const BADGE_MAP: Record<string, { label: string; style: string }> = {
  nouveau: { label: 'Nouveau', style: 'bg-lux-dark text-white' },
  bestseller: { label: 'Best-seller', style: 'bg-gold text-white' },
  promo: { label: 'Promo', style: 'bg-red-500 text-white' },
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative overflow-hidden bg-cream aspect-[3/4]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 text-[10px] tracking-widest uppercase px-2 py-1 font-medium ${BADGE_MAP[product.badge].style}`}>
            {BADGE_MAP[product.badge].label}
          </span>
        )}
        {/* Add to cart overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAdd}
            className={`w-full py-3 text-xs tracking-widest uppercase font-medium transition-all duration-200 ${added ? 'bg-green-600 text-white' : 'bg-lux-dark text-white hover:bg-gold'}`}
          >
            {added ? '✓ Ajouté au panier' : 'Ajouter au panier'}
          </button>
        </div>
        {/* Favorite */}
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold hover:text-white">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
        </button>
      </div>
      <div className="pt-3 pb-1">
        <p className="text-[10px] tracking-widest uppercase text-lux-gray mb-1">{product.category}</p>
        <h3 className="font-medium text-sm text-lux-dark group-hover:text-gold transition-colors leading-tight">{product.name}</h3>
        <div className="flex items-center justify-between mt-1.5">
          <span className="font-serif text-base font-medium">{formatPrice(product.price)}</span>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-gold fill-gold" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            <span className="text-[10px] text-lux-gray">{product.rating} ({product.reviews})</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
""")

# ─── HOME PAGE ────────────────────────────────────────────────────────────────
w('src/app/page.tsx', """import Link from 'next/link'
import Image from 'next/image'
import { getFeatured, categories, getBest, getNew, formatPrice } from '@/lib/products'
import ProductCard from '@/components/ProductCard'

export default function HomePage() {
  const featured = getFeatured()
  const best = getBest()
  const newest = getNew()

  return (
    <div className="pt-[88px]">

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-lux-dark">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=90"
            alt="Hero"
            fill
            className="object-cover object-center opacity-40"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-lux-dark/90 via-lux-dark/60 to-transparent" />
        <div className="relative z-10 container-lux py-20">
          <div className="max-w-xl">
            <p className="section-label text-gold animate-fade-in delay-100">Collection 2024</p>
            <h1 className="font-serif text-5xl md:text-7xl text-white font-light leading-[1.05] mt-3 animate-fade-up delay-200">
              L'Art du<br/>
              <em>Quotidien</em>
            </h1>
            <div className="gold-divider animate-fade-in delay-300" />
            <p className="text-white/65 text-base leading-relaxed animate-fade-up delay-300 max-w-sm">
              Des produits soigneusement sélectionnés pour sublimer votre vie. Livraison dans tout le Maroc.
            </p>
            <div className="flex flex-wrap gap-4 mt-8 animate-fade-up delay-400">
              <Link href="/products" className="btn-gold"><span>Découvrir la collection</span></Link>
              <Link href="/products?badge=nouveau" className="btn-outline border-white text-white hover:bg-white hover:text-lux-dark"><span>Nouveautés</span></Link>
            </div>
            <p className="text-white/40 text-xs tracking-widest uppercase mt-8 animate-fade-in delay-500">
              ✓ Paiement à la livraison &nbsp;•&nbsp; ✓ Livraison 24-48h &nbsp;•&nbsp; ✓ Retour gratuit
            </p>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/40 text-[10px] tracking-widest uppercase">Défiler</span>
          <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7"/></svg>
        </div>
      </section>

      {/* COD BANNER */}
      <section className="bg-gold py-4">
        <div className="container-lux flex flex-wrap justify-center gap-8 text-white text-xs tracking-widest uppercase font-medium">
          <span>🚚 Livraison Rapide 24–48h</span>
          <span>💳 Paiement à la Livraison</span>
          <span>↩️ Retour Gratuit 30 Jours</span>
          <span>🌟 Produits Premium Sélectionnés</span>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 container-lux">
        <div className="text-center mb-12">
          <p className="section-label">Explorer par univers</p>
          <h2 className="section-title">Nos Univers</h2>
          <div className="gold-divider mx-auto" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <Link key={cat.id} href={`/products?cat=${cat.id}`} className="group relative overflow-hidden aspect-[4/3] bg-cream">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-lux-dark/80 via-lux-dark/20 to-transparent" />
              <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-serif text-white text-xl font-medium">{cat.name}</h3>
                <p className="text-white/70 text-xs mt-1">{cat.description}</p>
                <span className="inline-block mt-2 text-gold text-xs tracking-widest uppercase border-b border-gold/40 group-hover:border-gold transition-colors">
                  Voir →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-20 bg-cream">
        <div className="container-lux">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-label">Notre sélection</p>
              <h2 className="section-title">Produits Vedettes</h2>
              <div className="gold-divider" />
            </div>
            <Link href="/products" className="text-xs tracking-widest uppercase border-b border-lux-dark hover:border-gold hover:text-gold transition-colors pb-0.5 hidden md:block">
              Voir tout →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="text-center mt-10 md:hidden">
            <Link href="/products" className="btn-outline"><span>Voir tous les produits</span></Link>
          </div>
        </div>
      </section>

      {/* PROMO SECTION */}
      <section className="py-20 container-lux">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative overflow-hidden bg-lux-dark aspect-[4/3] flex items-end p-8 group">
            <Image src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80" alt="Maison" fill className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" />
            <div className="relative z-10">
              <p className="text-gold text-xs tracking-widest uppercase mb-2">Nouvelle collection</p>
              <h3 className="font-serif text-white text-3xl font-light">Art de vivre<br/><em>à la maison</em></h3>
              <Link href="/products?cat=maison" className="inline-block mt-4 text-white text-xs tracking-widest uppercase border-b border-white/40 hover:border-gold hover:text-gold transition-colors">Découvrir →</Link>
            </div>
          </div>
          <div className="relative overflow-hidden bg-cream aspect-[4/3] flex items-end p-8 group">
            <Image src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt="Mode" fill className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-lux-dark/70 to-transparent" />
            <div className="relative z-10">
              <p className="text-gold text-xs tracking-widest uppercase mb-2">Style intemporel</p>
              <h3 className="font-serif text-white text-3xl font-light">Mode &<br/><em>Accessoires</em></h3>
              <Link href="/products?cat=mode" className="inline-block mt-4 text-white text-xs tracking-widest uppercase border-b border-white/40 hover:border-gold hover:text-gold transition-colors">Explorer →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      {best.length > 0 && (
        <section className="py-20 bg-lux-dark text-white">
          <div className="container-lux">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-2">Les plus populaires</p>
                <h2 className="font-serif text-4xl font-light">Best-Sellers</h2>
                <div className="gold-divider" />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {best.slice(0,3).map(p => (
                <Link key={p.id} href={`/products/${p.id}`} className="group block">
                  <div className="relative overflow-hidden aspect-square bg-white/5">
                    <Image src={p.image} alt={p.name} fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" sizes="33vw" />
                    <span className="absolute top-3 left-3 bg-gold text-white text-[10px] tracking-widest uppercase px-2 py-1">Best-seller</span>
                  </div>
                  <div className="pt-3">
                    <p className="text-white/50 text-[10px] tracking-widest uppercase">{p.category}</p>
                    <h3 className="text-white font-medium mt-1 group-hover:text-gold transition-colors">{p.name}</h3>
                    <p className="font-serif text-gold mt-1">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NEWSLETTER */}
      <section className="py-20 bg-cream">
        <div className="container-lux">
          <div className="max-w-lg mx-auto text-center">
            <p className="section-label">Restez informé</p>
            <h2 className="section-title">Abonnez-vous</h2>
            <div className="gold-divider mx-auto" />
            <p className="text-lux-gray text-sm mt-4 mb-8">Recevez nos nouveautés, offres exclusives et inspirations directement dans votre boîte mail.</p>
            <div className="flex gap-0">
              <input type="email" placeholder="Votre adresse email" className="input-lux flex-1" />
              <button className="btn-gold shrink-0 px-6"><span>S'inscrire</span></button>
            </div>
            <p className="text-lux-gray text-xs mt-3">Pas de spam. Désabonnement à tout moment.</p>
          </div>
        </div>
      </section>

    </div>
  )
}
""")

# ─── PRODUCTS PAGE ────────────────────────────────────────────────────────────
w('src/app/products/page.tsx', """'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { products, categories, formatPrice } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import { Suspense } from 'react'

const SORT_OPTIONS = [
  { value: 'default', label: 'Recommandés' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'rating', label: 'Mieux notés' },
]

function ProductsContent() {
  const searchParams = useSearchParams()
  const [cat, setCat] = useState(searchParams.get('cat') || '')
  const [badge, setBadge] = useState(searchParams.get('badge') || '')
  const [sort, setSort] = useState('default')
  const [search, setSearch] = useState('')

  let filtered = [...products]
  if (cat) filtered = filtered.filter(p => p.category === cat)
  if (badge) filtered = filtered.filter(p => p.badge === badge)
  if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
  if (sort === 'price-asc') filtered.sort((a,b) => a.price - b.price)
  else if (sort === 'price-desc') filtered.sort((a,b) => b.price - a.price)
  else if (sort === 'rating') filtered.sort((a,b) => b.rating - a.rating)

  const selectedCat = categories.find(c => c.id === cat)

  return (
    <div className="pt-[88px] min-h-screen">
      {/* Hero bar */}
      <div className="bg-cream border-b border-lux-border py-10">
        <div className="container-lux">
          <p className="section-label">{selectedCat ? selectedCat.description : 'Toute la boutique'}</p>
          <h1 className="section-title">{selectedCat ? selectedCat.name : 'Nos Produits'}</h1>
          <div className="gold-divider" />
          <p className="text-lux-gray text-sm mt-1">{filtered.length} produit{filtered.length > 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="container-lux py-8">
        {/* Filters bar */}
        <div className="flex flex-wrap gap-3 items-center justify-between mb-8 pb-6 border-b border-lux-border">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => { setCat(''); setBadge('') }} className={`px-4 py-2 text-xs tracking-widest uppercase border transition-colors ${!cat && !badge ? 'bg-lux-dark text-white border-lux-dark' : 'border-lux-border text-lux-gray hover:border-gold hover:text-gold'}`}>
              Tout
            </button>
            {categories.map(c => (
              <button key={c.id} onClick={() => { setCat(c.id); setBadge('') }} className={`px-4 py-2 text-xs tracking-widest uppercase border transition-colors ${cat === c.id ? 'bg-lux-dark text-white border-lux-dark' : 'border-lux-border text-lux-gray hover:border-gold hover:text-gold'}`}>
                {c.name}
              </button>
            ))}
          </div>
          <div className="flex gap-3 items-center">
            <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} className="input-lux w-40 md:w-56 py-2 text-sm" />
            <select value={sort} onChange={e => setSort(e.target.value)} className="input-lux w-auto py-2 text-sm cursor-pointer">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-lux-gray">Aucun produit trouvé</p>
            <button onClick={() => { setCat(''); setBadge(''); setSearch('') }} className="btn-outline mt-6"><span>Effacer les filtres</span></button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return <Suspense fallback={<div className="pt-[88px] flex items-center justify-center min-h-screen"><div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"/></div>}><ProductsContent /></Suspense>
}
""")

# ─── PRODUCT DETAIL ───────────────────────────────────────────────────────────
w('src/app/products/[id]/page.tsx', """'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getById, products, formatPrice } from '@/lib/products'
import { useCart } from '@/lib/cartStore'
import ProductCard from '@/components/ProductCard'

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getById(params.id)
  if (!product) notFound()

  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const [qty, setQty] = useState(1)
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, image: product.image })
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="pt-[88px]">
      {/* Breadcrumb */}
      <div className="container-lux py-4 border-b border-lux-border">
        <div className="flex items-center gap-2 text-xs text-lux-gray">
          <Link href="/" className="hover:text-gold transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gold transition-colors">Produits</Link>
          <span>/</span>
          <Link href={`/products?cat=${product.category}`} className="hover:text-gold transition-colors capitalize">{product.category}</Link>
          <span>/</span>
          <span className="text-lux-dark">{product.name}</span>
        </div>
      </div>

      <div className="container-lux py-12">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="relative aspect-square bg-cream overflow-hidden">
            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="50vw" priority />
            {product.badge && (
              <span className={`absolute top-4 left-4 text-xs tracking-widest uppercase px-3 py-1.5 font-medium ${product.badge === 'bestseller' ? 'bg-gold text-white' : 'bg-lux-dark text-white'}`}>
                {product.badge === 'bestseller' ? 'Best-seller' : product.badge === 'nouveau' ? 'Nouveau' : 'Promo'}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-start py-4">
            <p className="section-label capitalize">{product.category}</p>
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-lux-dark mt-1">{product.name}</h1>
            <div className="gold-divider mt-3 mb-4" />

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} className={`w-4 h-4 ${s <= Math.floor(product.rating) ? 'text-gold fill-gold' : 'text-lux-border fill-lux-border'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                ))}
              </div>
              <span className="text-sm text-lux-gray">{product.rating} ({product.reviews} avis)</span>
            </div>

            <p className="font-serif text-4xl font-medium text-gold mb-2">{formatPrice(product.price)}</p>
            <p className="text-xs text-green-600 mb-6 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              En stock ({product.stock} disponibles)
            </p>

            <p className="text-lux-gray text-sm leading-relaxed mb-6">{product.details}</p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {product.features.map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-lux-gray">
                  <span className="w-1 h-1 bg-gold rounded-full shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-lux-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-lux-gray hover:text-gold transition-colors">−</button>
                <span className="w-10 text-center font-medium">{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="w-10 h-10 flex items-center justify-center text-lux-gray hover:text-gold transition-colors">+</button>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <button onClick={handleAdd} className={`btn-gold flex-1 justify-center ${added ? '!bg-green-600' : ''}`}>
                <span>{added ? '✓ Ajouté au panier !' : 'Ajouter au panier'}</span>
              </button>
              <Link href="/checkout" onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })} className="btn-outline px-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </Link>
            </div>

            {/* Reassurance */}
            <div className="mt-6 pt-6 border-t border-lux-border space-y-3">
              {[
                ['🚚', 'Livraison 24-48h dans tout le Maroc'],
                ['💳', 'Paiement à la livraison disponible'],
                ['↩️', 'Retour gratuit sous 30 jours'],
                ['🔒', 'Produit authentique garanti'],
              ].map(([icon, text]) => (
                <p key={text as string} className="text-xs text-lux-gray flex items-center gap-2">
                  <span>{icon}</span> {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 bg-cream">
          <div className="container-lux">
            <h2 className="section-title mb-8">Vous aimerez aussi</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
""")

# ─── CART PAGE ────────────────────────────────────────────────────────────────
w('src/app/cart/page.tsx', """'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/cartStore'
import { formatPrice } from '@/lib/products'

export default function CartPage() {
  const { items, removeItem, updateQty, total, count } = useCart()

  if (items.length === 0) return (
    <div className="pt-[88px] min-h-screen flex items-center justify-center">
      <div className="text-center py-20">
        <div className="text-7xl mb-6">🛒</div>
        <h1 className="font-serif text-3xl mb-3">Votre panier est vide</h1>
        <p className="text-lux-gray mb-8">Découvrez notre sélection premium</p>
        <Link href="/products" className="btn-gold"><span>Continuer mes achats</span></Link>
      </div>
    </div>
  )

  return (
    <div className="pt-[88px] min-h-screen">
      <div className="bg-cream border-b border-lux-border py-10">
        <div className="container-lux">
          <h1 className="section-title">Mon Panier</h1>
          <div className="gold-divider" />
          <p className="text-lux-gray text-sm">{count()} article{count() > 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="container-lux py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex gap-5 p-5 bg-cream border border-lux-border hover:border-gold transition-colors">
                <div className="relative w-24 h-24 shrink-0 overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gold font-serif font-medium mt-1">{formatPrice(item.price)}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center border border-lux-border">
                      <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-lux-gray hover:text-gold">−</button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-lux-gray hover:text-gold">+</button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-xs text-lux-gray hover:text-red-500 transition-colors">Supprimer</button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-serif font-medium">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div className="bg-cream border border-lux-border p-6 sticky top-24">
              <h2 className="font-serif text-xl mb-4">Récapitulatif</h2>
              <div className="space-y-3 mb-4 pb-4 border-b border-lux-border">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-lux-gray truncate max-w-[160px]">{item.name} ×{item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-lux-gray">Livraison</span>
                <span className="text-green-600 font-medium">{total() >= 500 ? 'Gratuite' : '50 DH'}</span>
              </div>
              {total() < 500 && <p className="text-xs text-lux-gray mb-3">Plus que {formatPrice(500 - total())} pour la livraison gratuite</p>}
              <div className="flex justify-between font-medium text-lg pt-3 border-t border-lux-border mt-3">
                <span>Total</span>
                <span className="font-serif">{formatPrice(total() >= 500 ? total() : total() + 50)}</span>
              </div>
              <div className="mt-5 p-3 bg-green-50 border border-green-200 text-xs text-green-700 flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                Paiement à la livraison disponible
              </div>
              <Link href="/checkout" className="btn-gold w-full text-center justify-center mt-4"><span>Commander — Payer à la livraison</span></Link>
              <Link href="/products" className="block text-center mt-3 text-xs text-lux-gray hover:text-gold transition-colors">← Continuer mes achats</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
""")

# ─── CHECKOUT PAGE ────────────────────────────────────────────────────────────
w('src/app/checkout/page.tsx', """'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '@/lib/cartStore'
import { formatPrice } from '@/lib/products'

const CITIES = ['Casablanca','Rabat','Marrakech','Fès','Tanger','Agadir','Meknès','Oujda','Kenitra','Tétouan','Safi','El Jadida','Beni Mellal','Mohammedia','Khouribga','Laâyoune','Settat','Berrechid','Nador','Khemisset']

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', phone2: '', address: '', city: '', zip: '', note: '' })
  const [errors, setErrors] = useState<Record<string,string>>({})

  const shipping = total() >= 500 ? 0 : 50
  const orderTotal = total() + shipping

  const validate = () => {
    const e: Record<string,string> = {}
    if (!form.firstName.trim()) e.firstName = 'Prénom requis'
    if (!form.lastName.trim()) e.lastName = 'Nom requis'
    if (!form.phone.match(/^(\\+212|0)[5-7][0-9]{8}$/)) e.phone = 'Numéro marocain invalide (ex: 06 12 34 56 78)'
    if (!form.address.trim()) e.address = 'Adresse requise'
    if (!form.city) e.city = 'Ville requise'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    clearCart()
    router.push('/confirmation?name=' + encodeURIComponent(form.firstName))
  }

  if (items.length === 0) {
    if (typeof window !== 'undefined') router.push('/products')
    return null
  }

  const Field = ({ name, label, type = 'text', placeholder = '', required = true }: { name: keyof typeof form; label: string; type?: string; placeholder?: string; required?: boolean }) => (
    <div>
      <label className="block text-xs tracking-widest uppercase text-lux-gray mb-1.5">{label}{required && <span className="text-gold ml-1">*</span>}</label>
      <input
        type={type}
        value={form[name]}
        onChange={e => setForm({...form, [name]: e.target.value})}
        placeholder={placeholder}
        className={`input-lux ${errors[name] ? 'border-red-400' : ''}`}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  )

  return (
    <div className="pt-[88px] min-h-screen">
      <div className="bg-cream border-b border-lux-border py-10">
        <div className="container-lux">
          <h1 className="section-title">Finaliser la commande</h1>
          <div className="gold-divider" />
          <div className="flex items-center gap-6 mt-4 text-xs text-lux-gray">
            {['Informations','Livraison','Confirmation'].map((step, i) => (
              <span key={step} className={`flex items-center gap-2 ${i === 0 ? 'text-gold font-medium' : ''}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium ${i === 0 ? 'bg-gold text-white' : 'bg-lux-border text-lux-gray'}`}>{i+1}</span>
                {step}
                {i < 2 && <span className="text-lux-border ml-4">→</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container-lux py-12">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Personal info */}
              <div className="bg-white border border-lux-border p-6">
                <h2 className="font-serif text-xl mb-5 flex items-center gap-3">
                  <span className="w-7 h-7 bg-gold text-white flex items-center justify-center text-xs font-medium">1</span>
                  Informations personnelles
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <Field name="firstName" label="Prénom" placeholder="Mohammed" />
                  <Field name="lastName" label="Nom" placeholder="Alami" />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Field name="phone" label="Téléphone principal" type="tel" placeholder="06 12 34 56 78" />
                  <Field name="phone2" label="Téléphone secondaire" type="tel" placeholder="06 12 34 56 78 (optionnel)" required={false} />
                </div>
              </div>

              {/* Delivery */}
              <div className="bg-white border border-lux-border p-6">
                <h2 className="font-serif text-xl mb-5 flex items-center gap-3">
                  <span className="w-7 h-7 bg-gold text-white flex items-center justify-center text-xs font-medium">2</span>
                  Adresse de livraison
                </h2>
                <Field name="address" label="Adresse complète" placeholder="N° rue, quartier, immeuble..." />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-lux-gray mb-1.5">Ville<span className="text-gold ml-1">*</span></label>
                    <select value={form.city} onChange={e => setForm({...form, city: e.target.value})} className={`input-lux ${errors.city ? 'border-red-400' : ''}`}>
                      <option value="">Sélectionner une ville</option>
                      {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                  <Field name="zip" label="Code postal" placeholder="20000" required={false} />
                </div>
                <div className="mt-4">
                  <label className="block text-xs tracking-widest uppercase text-lux-gray mb-1.5">Note pour la livraison</label>
                  <textarea value={form.note} onChange={e => setForm({...form, note: e.target.value})} placeholder="Précisions sur l'adresse, horaires préférés..." rows={3} className="input-lux resize-none" />
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white border border-lux-border p-6">
                <h2 className="font-serif text-xl mb-5 flex items-center gap-3">
                  <span className="w-7 h-7 bg-gold text-white flex items-center justify-center text-xs font-medium">3</span>
                  Mode de paiement
                </h2>
                <div className="border-2 border-gold bg-gold/5 p-4 flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full border-2 border-gold bg-gold shrink-0 mt-0.5 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Paiement à la livraison (Cash)</p>
                    <p className="text-lux-gray text-xs mt-1">Vous payez en espèces directement au livreur lors de la réception de votre commande. 100% sécurisé.</p>
                  </div>
                  <span className="text-2xl">💵</span>
                </div>
                <div className="mt-4 p-4 bg-cream border border-lux-border">
                  <p className="text-xs text-lux-gray leading-relaxed">
                    ✓ Aucun paiement en avance requis &nbsp;•&nbsp; ✓ Paiement uniquement à la réception &nbsp;•&nbsp; ✓ Vérifiez votre colis avant de payer
                  </p>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <div className="bg-cream border border-lux-border p-6 sticky top-24">
                <h2 className="font-serif text-lg mb-4">Ma Commande</h2>
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-12 h-12 shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover rounded" sizes="48px" />
                        <span className="absolute -top-1 -right-1 bg-lux-dark text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{item.quantity}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{item.name}</p>
                        <p className="text-xs text-lux-gray mt-0.5">{formatPrice(item.price)}</p>
                      </div>
                      <span className="text-xs font-medium shrink-0">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-lux-border space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-lux-gray">Sous-total</span><span>{formatPrice(total())}</span></div>
                  <div className="flex justify-between"><span className="text-lux-gray">Livraison</span><span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>{shipping === 0 ? 'Gratuite 🎉' : formatPrice(shipping)}</span></div>
                  <div className="flex justify-between font-semibold text-base pt-2 border-t border-lux-border mt-2">
                    <span>Total</span>
                    <span className="font-serif text-gold text-xl">{formatPrice(orderTotal)}</span>
                  </div>
                </div>
                <p className="text-xs text-lux-gray mt-3 text-center">💳 Paiement à la livraison</p>
                <button type="submit" disabled={loading} className="btn-gold w-full justify-center mt-4 disabled:opacity-60">
                  <span>{loading ? 'Traitement...' : `Confirmer — ${formatPrice(orderTotal)}`}</span>
                  {loading && <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin ml-2" />}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
""")

# ─── CONFIRMATION PAGE ────────────────────────────────────────────────────────
w('src/app/confirmation/page.tsx', """'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ConfirmationContent() {
  const params = useSearchParams()
  const name = params.get('name') || 'cher client'
  const orderId = 'LX' + Math.random().toString(36).substr(2,8).toUpperCase()

  return (
    <div className="pt-[88px] min-h-screen flex items-center justify-center bg-cream">
      <div className="max-w-lg w-full mx-auto text-center px-6 py-16">
        {/* Success icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
          </svg>
        </div>

        <p className="section-label text-green-600">Commande confirmée</p>
        <h1 className="font-serif text-4xl font-light mt-2 mb-2">Merci, {name} !</h1>
        <div className="gold-divider mx-auto mb-5" />

        <div className="bg-white border border-lux-border p-6 mb-6 text-left">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs tracking-widest uppercase text-lux-gray">N° de commande</span>
            <span className="font-mono font-bold text-gold">#{orderId}</span>
          </div>
          <div className="space-y-3 text-sm">
            {[
              ['📞', 'Confirmation', 'Vous recevrez un appel de confirmation sous 24h'],
              ['🚚', 'Livraison', 'Votre colis sera livré dans 24 à 48h ouvrables'],
              ['💵', 'Paiement', 'Payez en espèces à la réception de votre commande'],
              ['📦', 'Suivi', 'Un SMS avec votre numéro de suivi sera envoyé'],
            ].map(([icon, title, desc]) => (
              <div key={title as string} className="flex items-start gap-3">
                <span className="text-xl">{icon}</span>
                <div>
                  <p className="font-medium">{title}</p>
                  <p className="text-lux-gray text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-gold"><span>Retour à l'accueil</span></Link>
          <Link href="/products" className="btn-outline"><span>Continuer mes achats</span></Link>
        </div>

        <p className="text-lux-gray text-xs mt-8">
          Une question? Appelez-nous au <a href="tel:+212600000000" className="text-gold hover:underline">+212 6 00 00 00 00</a>
        </p>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return <Suspense fallback={null}><ConfirmationContent /></Suspense>
}
""")

# Done!
print('\n' + '='*50)
print('🎉 LUXÉ BOUTIQUE — Installation terminée!')
print('='*50)
print('\n📋 Prochaines étapes:')
print('  1. npm run dev')
print('  2. Ouvrir http://localhost:3000')
print('\n✨ Fonctionnalités:')
print('  • 22 produits dans 6 catégories')
print('  • Panier persistant (Zustand)')
print('  • Checkout paiement à la livraison')
print('  • Design luxe blanc & or')
print('  • Animations professionnelles')
print('  • 100% en français / Dirham marocain')
print('  • Responsive mobile')
print('='*50 + '\n')