import { NextResponse } from 'next/server'
import { getFeaturedAsync } from '@/lib/products-dynamic'

export const revalidate = 0

export async function GET() {
  const products = await getFeaturedAsync()
  return NextResponse.json(products)
}
