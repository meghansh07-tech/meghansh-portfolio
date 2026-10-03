import { NextResponse } from 'next/server'

const ADMIN_COOKIE = 'ms_analytics_admin'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const token = url.searchParams.get('token')
  const adminToken = process.env.ANALYTICS_ADMIN_TOKEN

  if (!adminToken || token !== adminToken) {
    return NextResponse.json({ error: 'Invalid admin token' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })

  response.cookies.set(ADMIN_COOKIE, 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  })

  return response
}
