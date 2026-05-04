import { NextResponse } from 'next/server'
import { products as staticProducts } from '@/lib/products'

const RAW_URL = `https://raw.githubusercontent.com/${process.env.GITHUB_REPO}/${process.env.GITHUB_BRANCH}/public/data/products.json`

export async function GET() {
  try {
    const res = await fetch(RAW_URL + '?t=' + Date.now(), { cache: 'no-store' })
    if (!res.ok) return NextResponse.json(staticProducts)
    const dynamic = await res.json()
    if (!Array.isArray(dynamic) || dynamic.length === 0) return NextResponse.json(staticProducts)
    // دمج المنتجات: الأولوية للمنتجات الديناميكية
    const dynamicIds = new Set(dynamic.map((p: any) => p.id))
    const filtered = staticProducts.filter((p: any) => !dynamicIds.has(p.id))
    return NextResponse.json([...filtered, ...dynamic])
  } catch {
    return NextResponse.json(staticProducts)
  }
}
