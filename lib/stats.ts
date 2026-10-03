import { avg, count, eq, sql, sum } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'
import {
  portfolioRatings,
  portfolioVisitors,
  portfolioVisitEvents,
} from '@/lib/db/schema'


export type PortfolioStats = {
  viewers: number
  views: number
  ratingAverage: number
  ratingCount: number
  myRating: number | null
}

const VISITOR_COOKIE = 'ms_visitor'
const ONE_YEAR = 60 * 60 * 24 * 365

export async function getOrCreateVisitorId() {
  const store = await cookies()
  const existing = store.get(VISITOR_COOKIE)?.value
  if (existing && /^[0-9a-f-]{36}$/.test(existing)) return { id: existing, isNew: false }

  const id = crypto.randomUUID()
  store.set(VISITOR_COOKIE, id, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: ONE_YEAR,
  })
  return { id, isNew: true }
}

export async function recordVisit(visitorId: string) {
  await db
    .insert(portfolioVisitors)
    .values({ visitorId })
    .onConflictDoUpdate({
      target: portfolioVisitors.visitorId,
      set: {
        visits: sql`CASE WHEN ${portfolioVisitors.lastSeen} < now() - interval '30 minutes' THEN ${portfolioVisitors.visits} + 1 ELSE ${portfolioVisitors.visits} END`,
        lastSeen: sql`now()`,
      },
    })
}
export async function recordVisitEvent(
  visitorId: string,
  page: string,
  referrer: string | null,
  userAgent: string | null,
) {
  await db.insert(portfolioVisitEvents).values({
    visitorId,
    page,
    referrer,
    userAgent,
  })
}
export async function saveRating(visitorId: string, rating: number) {
  await db
    .insert(portfolioRatings)
    .values({ visitorId, rating })
    .onConflictDoUpdate({
      target: portfolioRatings.visitorId,
      set: { rating, updatedAt: sql`now()` },
    })
}

export async function getStats(visitorId: string): Promise<PortfolioStats> {
  const [[visitorTotals], [ratingTotals], [mine]] = await Promise.all([
    db.select({ viewers: count(), views: sum(portfolioVisitors.visits) }).from(portfolioVisitors),
    db.select({ average: avg(portfolioRatings.rating), total: count() }).from(portfolioRatings),
    db
      .select({ rating: portfolioRatings.rating })
      .from(portfolioRatings)
      .where(eq(portfolioRatings.visitorId, visitorId)),
  ])

  return {
    viewers: visitorTotals?.viewers ?? 0,
    views: Number(visitorTotals?.views ?? 0),
    ratingAverage: Number(ratingTotals?.average ?? 0),
    ratingCount: ratingTotals?.total ?? 0,
    myRating: mine?.rating ?? null,
  }
}
