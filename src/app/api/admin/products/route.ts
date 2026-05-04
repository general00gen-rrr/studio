import { NextRequest, NextResponse } from "next/server";
import { writeJSONToGitHub } from "@/lib/github";

const GITHUB_PATH = "public/data/products.json";
const RAW_URL =
  "https://raw.githubusercontent.com/" +
  process.env.GITHUB_REPO +
  "/" +
  process.env.GITHUB_BRANCH +
  "/" +
  GITHUB_PATH;

const FALLBACK = [
  {"id":"1","name":"Lampe Arc Doree","slug":"lampe-arc-doree","price":890,"category":"maison","description":"Lampe sur pied en metal dore","image":"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80","badge":"nouveau","stock":15,"createdAt":"2026-01-01"},
  {"id":"2","name":"Miroir Ovale Arche","slug":"miroir-ovale-arche","price":1200,"category":"maison","description":"Miroir mural arche 60x120cm","image":"https://images.unsplash.com/photo-1576020799627-aeac74d58064?w=600&q=80","stock":8,"createdAt":"2026-01-01"},
  {"id":"3","name":"Bougie Oud Rose","slug":"bougie-oud-rose","price":280,"category":"maison","description":"Bougie artisanale cire soja 60h","image":"https://images.unsplash.com/photo-1602607165068-3afc1b67e521?w=600&q=80","badge":"bestseller","stock":45,"createdAt":"2026-01-01"},
  {"id":"4","name":"Vase Marbre Blanc","slug":"vase-marbre-blanc","price":450,"category":"maison","description":"Vase sculpture marbre naturel","image":"https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&q=80","stock":12,"createdAt":"2026-01-01"},
  {"id":"5","name":"Coussin Velours Camel","slug":"coussin-velours-camel","price":180,"category":"maison","description":"Coussin velours premium 50x50cm","image":"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80","stock":30,"createdAt":"2026-01-01"},
  {"id":"6","name":"Plateau Laiton Cisele","slug":"plateau-laiton-cisele","price":320,"category":"maison","description":"Plateau laiton motifs arabesques","image":"https://images.unsplash.com/photo-1617104551722-3b2d51366400?w=600&q=80","badge":"nouveau","stock":20,"createdAt":"2026-01-01"},
  {"id":"7","name":"Blazer Structure Ivoire","slug":"blazer-structure-ivoire","price":1100,"category":"mode","description":"Blazer crepe de laine coupe francaise","image":"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80","badge":"nouveau","stock":10,"createdAt":"2026-01-01"},
  {"id":"8","name":"Sac Cuir Camel","slug":"sac-cuir-camel","price":1800,"category":"mode","description":"Sac main cuir veritable fermoir dore","image":"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80","badge":"bestseller","stock":6,"createdAt":"2026-01-01"},
  {"id":"9","name":"Montre Classic Or","slug":"montre-classic-or","price":2500,"category":"mode","description":"Montre elegante acier dore cadran nacre","image":"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80","stock":9,"createdAt":"2026-01-01"},
  {"id":"10","name":"Sneakers Blanc Cuir","slug":"sneakers-blanc-cuir","price":890,"category":"mode","description":"Baskets cuir blanc semelle plateforme","image":"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80","stock":20,"createdAt":"2026-01-01"},
  {"id":"11","name":"Robe Lin Naturel","slug":"robe-lin-naturel","price":680,"category":"mode","description":"Robe mi-longue lin 100 naturel","image":"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80","stock":18,"createdAt":"2026-01-01"},
  {"id":"12","name":"Parfum Oud Intense","slug":"parfum-oud-intense","price":650,"category":"beaute","description":"Eau de parfum 100ml oud ambre rose","image":"https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80","badge":"bestseller","stock":25,"createdAt":"2026-01-01"},
  {"id":"13","name":"Serum Vitamine C Gold","slug":"serum-vitamine-c-gold","price":380,"category":"beaute","description":"Serum vitamine C or 24K","image":"https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80","badge":"nouveau","stock":35,"createdAt":"2026-01-01"},
  {"id":"14","name":"Set Soin Argan Bio","slug":"set-soin-argan-bio","price":920,"category":"beaute","description":"Coffret 5 soins huile argan Maroc","image":"https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80","stock":12,"createdAt":"2026-01-01"},
  {"id":"15","name":"Casque Audio Premium","slug":"casque-audio-premium","price":1200,"category":"tech","description":"Casque sans fil ANC 30h autonomie","image":"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80","stock":14,"createdAt":"2026-01-01"},
  {"id":"16","name":"Montre Connectee Sport","slug":"montre-connectee-sport","price":1800,"category":"tech","description":"Smartwatch GPS sante AMOLED","image":"https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80","badge":"nouveau","stock":11,"createdAt":"2026-01-01"},
  {"id":"17","name":"Enceinte Portable Luxe","slug":"enceinte-portable-luxe","price":650,"category":"tech","description":"Enceinte Bluetooth 360 aluminium","image":"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80","stock":20,"createdAt":"2026-01-01"},
  {"id":"18","name":"Robot Patissier Pro","slug":"robot-patissier-pro","price":2800,"category":"cuisine","description":"Robot 6.5L 1200W 10 vitesses","image":"https://images.unsplash.com/photo-1556910103-1c02745adc4b?w=600&q=80","stock":7,"createdAt":"2026-01-01"},
  {"id":"19","name":"Set Couteaux Japonais","slug":"set-couteaux-japonais","price":780,"category":"cuisine","description":"5 couteaux acier Damas 67 couches","image":"https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600&q=80","badge":"bestseller","stock":15,"createdAt":"2026-01-01"},
  {"id":"20","name":"Service The Marocain","slug":"service-the-marocain","price":450,"category":"cuisine","description":"Service 8 pieces metal argente","image":"https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80","stock":22,"createdAt":"2026-01-01"},
  {"id":"21","name":"Tapis Yoga Premium","slug":"tapis-yoga-premium","price":480,"category":"sport","description":"Tapis yoga TPE 6mm antiderapant","image":"https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80","stock":25,"createdAt":"2026-01-01"},
  {"id":"22","name":"Bouteille Inox Luxe","slug":"bouteille-inox-luxe","price":250,"category":"sport","description":"Gourde isotherme 750ml inox 24h","image":"https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80","stock":40,"createdAt":"2026-01-01"}
];

async function readProducts() {
  try {
    const res = await fetch(RAW_URL + "?t=" + Date.now(), { cache: "no-store" });
    if (!res.ok) return FALLBACK;
    const data = await res.json();
    return data.length > 0 ? data : FALLBACK;
  } catch {
    return FALLBACK;
  }
}

export async function GET() {
  return NextResponse.json(await readProducts());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const products = await readProducts();
  const newProduct = { ...body, id: Date.now().toString(), createdAt: new Date().toISOString() };
  products.push(newProduct);
  await writeJSONToGitHub(GITHUB_PATH, products, "CMS: Add " + newProduct.name);
  return NextResponse.json(newProduct);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const products = (await readProducts()).map((p: any) => p.id === body.id ? { ...p, ...body } : p);
  await writeJSONToGitHub(GITHUB_PATH, products, "CMS: Update " + body.name);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const products = (await readProducts()).filter((p: any) => p.id !== id);
  await writeJSONToGitHub(GITHUB_PATH, products, "CMS: Delete " + id);
  return NextResponse.json({ success: true });
}
