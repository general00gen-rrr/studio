import { NextResponse } from 'next/server'
import { products as staticProducts } from '@/lib/products'
export const dynamic = 'force-dynamic'
export const revalidate = 0
export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN
    const repo = process.env.GITHUB_REPO
    const branch = process.env.GITHUB_BRANCH || 'main'
    if (!token || !repo) return NextResponse.json(staticProducts)
    const url = 'https://api.github.com/repos/' + repo + '/contents/public/data/products.json?ref=' + branch + '&t=' + Date.now()
    const res = await fetch(url, {
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'luxe-cms',
      },
      cache: 'no-store',
    })
    if (!res.ok) return NextResponse.json(staticProducts)
    const data = await res.json()
    const content = Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf-8')
    const dynamicProducts = JSON.parse(content)
    if (Array.isArray(dynamicProducts) && dynamicProducts.length > 0)
      return NextResponse.json(dynamicProducts)
    return NextResponse.json(staticProducts)
  } catch {
    return NextResponse.json(staticProducts)
  }
}
