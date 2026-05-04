import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { products as staticProducts } from '@/lib/products'

export async function GET() {
  try {
    const file = path.join(process.cwd(), 'public', 'data', 'products.json')
    if (!fs.existsSync(file)) return NextResponse.json(staticProducts)
    const dynamic = JSON.parse(fs.readFileSync(file, 'utf-8'))
    if (!dynamic.length) return NextResponse.json(staticProducts)
    return NextResponse.json([...staticProducts, ...dynamic])
  } catch {
    return NextResponse.json(staticProducts)
  }
}
