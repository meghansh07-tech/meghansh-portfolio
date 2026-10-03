import { NextResponse } from 'next/server'
import { desc, sql } from 'drizzle-orm'
import { db } from '@/lib/db'
import { portfolioVisitEvents } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const recentVisits = await db
      .select({
        visitorId: portfolioVisitEvents.visitorId,
        visitedAt: portfolioVisitEvents.visitedAt,
        page: portfolioVisitEvents.page,
        referrer: portfolioVisitEvents.referrer,
        userAgent: portfolioVisitEvents.userAgent,
      })
      .from(portfolioVisitEvents)
      .orderBy(desc(portfolioVisitEvents.visitedAt))
      .limit(50)

    const [totals] = await db
      .select({
        totalEvents: sql<number>`count(*)`,
        uniqueVisitors: sql<number>`count(distinct ${portfolioVisitEvents.visitorId})`,
      })
      .from(portfolioVisitEvents)

    return NextResponse.json({
      totals: {
        events: Number(totals?.totalEvents ?? 0),
        uniqueVisitors: Number(totals?.uniqueVisitors ?? 0),
      },
      recentVisits,
    })
  } catch (error) {
    console.error('[analytics] GET failed', error)
    return NextResponse.json(
      { error: 'Could not load analytics' },
      { status: 500 },
    )
  }
}