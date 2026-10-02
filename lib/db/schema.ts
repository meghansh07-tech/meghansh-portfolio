import { integer, pgTable, smallint, text, timestamp } from 'drizzle-orm/pg-core'

export const portfolioVisitors = pgTable('portfolio_visitors', {
  visitorId: text('visitor_id').primaryKey(),
  visits: integer('visits').notNull().default(1),
  firstSeen: timestamp('first_seen', { withTimezone: true }).notNull().defaultNow(),
  lastSeen: timestamp('last_seen', { withTimezone: true }).notNull().defaultNow(),
})

export const portfolioRatings = pgTable('portfolio_ratings', {
  visitorId: text('visitor_id').primaryKey(),
  rating: smallint('rating').notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})
