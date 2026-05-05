import { categories, formatPrice } from './products'
import type { Product, Category } from './products'

export type { Product, Category }
export { categories, formatPrice }

const GITHUB_RAW = `https://raw.githubusercontent.com/${process.env.GITHUB_REPO}/${process.env.GITHUB_BRANCH}/public/data/products.json`

import { products as staticProducts } from './products'
export { staticProducts as products }

async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(GITHUB_RAW + '?t=' + Date.now(), {
      next: { revalidate: 60 }
    })
    if (!res.ok) return staticProducts
    const data = await res.json()
    return data.length > 0 ? data : staticProducts
  } catch {
    return staticProducts
  }
}

export async function getFeaturedAsync(): Promise<Product[]> {
  const products = await fetchProducts()
  return products.slice(0, 8)
}

export async function getBestAsync(): Promise<Product[]> {
  const products = await fetchProducts()
  return products.filter((p: Product) => p.badge === 'bestseller')
}

export async function getNewAsync(): Promise<Product[]> {
  const products = await fetchProducts()
  return products.filter((p: Product) => p.badge === 'nouveau')
}

export async function getByCatAsync(cat: string): Promise<Product[]> {
  const products = await fetchProducts()
  return products.filter((p: Product) => p.category === cat)
}

export async function getByIdAsync(id: string): Promise<Product | undefined> {
  const products = await fetchProducts()
  return products.find((p: Product) => p.id === id || p.slug === id)
}

export const getFeatured = () => staticProducts.slice(0, 8)
export const getBest = () => staticProducts.filter(p => p.badge === 'bestseller')
export const getNew = () => staticProducts.filter(p => p.badge === 'nouveau')
export const getByCat = (cat: string) => staticProducts.filter(p => p.category === cat)
export const getById = (id: string) => staticProducts.find(p => p.id === id)
