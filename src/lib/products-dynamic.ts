import { categories, formatPrice, products as staticProducts } from './products'
import type { Product, Category } from './products'

export type { Product, Category }
export { categories, formatPrice }
export { staticProducts as products }

export async function getFeaturedAsync(): Promise<Product[]> {
  return staticProducts.slice(0, 8)
}

export async function getBestAsync(): Promise<Product[]> {
  return staticProducts.filter((p: Product) => p.badge === 'bestseller')
}

export async function getNewAsync(): Promise<Product[]> {
  return staticProducts.filter((p: Product) => p.badge === 'nouveau')
}

export async function getByCatAsync(cat: string): Promise<Product[]> {
  return staticProducts.filter((p: Product) => p.category === cat)
}

export async function getByIdAsync(id: string): Promise<Product | undefined> {
  return staticProducts.find((p: Product) => p.id === id || p.slug === id)
}

export const getFeatured = () => staticProducts.slice(0, 8)
export const getBest = () => staticProducts.filter(p => p.badge === 'bestseller')
export const getNew = () => staticProducts.filter(p => p.badge === 'nouveau')
export const getByCat = (cat: string) => staticProducts.filter(p => p.category === cat)
export const getById = (id: string) => staticProducts.find(p => p.id === id)
