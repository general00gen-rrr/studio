import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
export async function GET() {
  const token = process.env.GITHUB_TOKEN
  const repo = process.env.GITHUB_REPO
  const branch = process.env.GITHUB_BRANCH || 'main'
  const res = await fetch(
    `https://api.github.com/repos/${repo}/contents/public/data/products.json?ref=${branch}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'luxe-cms',
      },
      cache: 'no-store',
    }
  )
  const data = await res.json()
  return NextResponse.json({
    status: res.status,
    repo,
    branch,
    hasToken: !!token,
    tokenPrefix: token?.slice(0, 8),
    error: data.message || null,
  })
}
