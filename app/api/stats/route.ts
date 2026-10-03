import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import {
  getOrCreateVisitorId,
  getStats,
  isAnalyticsAdmin,
  recordVisit,
  recordVisitEvent,
  saveRating,
} from '@/lib/stats'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies()
    const adminCookie = cookieStore.get('ms_analytics_admin')?.value
    const isAdmin = isAnalyticsAdmin(adminCookie)

    const { id } = await getOrCreateVisitorId()

    if (!isAdmin) {
      await recordVisit(id)
      await recordVisitEvent(
        id,
        '/',
        request.headers.get('referer'),
        request.headers.get('user-agent'),
      )
    }

    return NextResponse.json(await getStats(id), {
      headers: { 'Cache-Control': 'no-store' },
    })
  } catch (error) {
    console.error('[stats] GET failed', error)
    return NextResponse.json(
      { error: 'Could not load stats' },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  let rating: unknown
  try {
    rating = (await request.json())?.rating
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  if (typeof rating !== 'number' || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Rating must be an integer from 1 to 5' }, { status: 400 })
  }

  try {
    const cookieStore = await cookies()
const adminCookie = cookieStore.get('ms_analytics_admin')?.value
const isAdmin = isAnalyticsAdmin(adminCookie)

const { id } = await getOrCreateVisitorId()

if (!isAdmin) {
  await recordVisit(id)
  await recordVisitEvent(
    id,
    '/',
    request.headers.get('referer'),
    request.headers.get('user-agent'),
  )
}

await saveRating(id, rating)
    return NextResponse.json(await getStats(id), { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('[stats] POST failed', error)
    return NextResponse.json({ error: 'Could not save rating' }, { status: 500 })
  }
}
