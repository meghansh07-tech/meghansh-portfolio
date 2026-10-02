'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { BarChart3, Eye, Star, Users, X } from 'lucide-react'
import { useState } from 'react'
import useSWR from 'swr'
import type { PortfolioStats } from '@/lib/stats'
import { easeOutExpo } from './reveal'

const fetcher = async (url: string): Promise<PortfolioStats> => {
  const res = await fetch(url, { credentials: 'include' })
  if (!res.ok) throw new Error('Failed to load stats')
  return res.json()
}

const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })

export function StatsPanel() {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)
  const { data, error, mutate } = useSWR('/api/stats', fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 60_000,
  })

  async function rate(value: number) {
    if (saving) return
    setSaving(true)
    try {
      await mutate(
        async () => {
          const res = await fetch('/api/stats', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rating: value }),
          })
          if (!res.ok) throw new Error('Failed to save rating')
          return res.json()
        },
        { optimisticData: data ? { ...data, myRating: value } : undefined, rollbackOnError: true, revalidate: false },
      )
    } finally {
      setSaving(false)
    }
  }

  const activeStars = hovered ?? data?.myRating ?? 0

  return (
    <aside aria-label="Portfolio stats" className="fixed bottom-4 left-4 z-40 sm:bottom-6 sm:left-6">
      <AnimatePresence mode="wait" initial={false}>
        {open ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, x: -24, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -24, scale: 0.96 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="glass w-64 rounded-2xl p-4"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                Live stats
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                aria-label="Hide stats"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            {error ? (
              <p className="mt-4 text-sm text-muted-foreground">Stats are unavailable right now.</p>
            ) : (
              <>
                <dl className="mt-4 grid grid-cols-3 gap-2">
                  <Stat icon={<Users className="size-3.5" />} label="Viewers" value={data ? compact.format(data.viewers) : null} />
                  <Stat icon={<Eye className="size-3.5" />} label="Views" value={data ? compact.format(data.views) : null} />
                  <Stat
                    icon={<Star className="size-3.5" />}
                    label="Rating"
                    value={data ? (data.ratingCount ? data.ratingAverage.toFixed(1) : '—') : null}
                  />
                </dl>

                <div className="mt-4 border-t border-white/10 pt-4">
                  <p className="text-xs text-muted-foreground">
                    {data?.myRating ? 'Thanks! Update your rating' : 'Rate this portfolio'}
                    {data && data.ratingCount > 0 && (
                      <span className="text-muted-foreground/70">{` · ${data.ratingCount} ${data.ratingCount === 1 ? 'rating' : 'ratings'}`}</span>
                    )}
                  </p>
                  <div
                    role="radiogroup"
                    aria-label="Your rating"
                    className="mt-2 flex gap-1"
                    onMouseLeave={() => setHovered(null)}
                  >
                    {[1, 2, 3, 4, 5].map((value) => {
                      const filled = value <= activeStars
                      return (
                        <button
                          key={value}
                          type="button"
                          role="radio"
                          aria-checked={data?.myRating === value}
                          aria-label={`${value} star${value > 1 ? 's' : ''}`}
                          disabled={!data || saving}
                          onMouseEnter={() => setHovered(value)}
                          onFocus={() => setHovered(value)}
                          onBlur={() => setHovered(null)}
                          onClick={() => rate(value)}
                          className="rounded-md p-1 transition-transform hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Star
                            className={`size-5 transition-colors ${filled ? 'fill-primary text-primary' : 'text-white/30'}`}
                            aria-hidden="true"
                          />
                        </button>
                      )
                    })}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        ) : (
          <motion.button
            key="toggle"
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
            onClick={() => setOpen(true)}
            className="glass flex items-center gap-2 rounded-full px-4 py-2.5 text-sm transition-colors hover:text-primary"
            aria-label="Show portfolio stats"
          >
            <BarChart3 className="size-4" aria-hidden="true" />
            <span className="font-mono text-xs">{data ? `${compact.format(data.viewers)} viewers` : 'Stats'}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </aside>
  )
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | null }) {
  return (
    <div className="rounded-xl bg-white/[0.03] p-2.5">
      <dt className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
        <span aria-hidden="true">{icon}</span>
        {label}
      </dt>
      <dd className="mt-1 font-display text-xl font-bold tabular-nums">
        {value ?? <span className="inline-block h-6 w-8 animate-pulse rounded bg-white/10" />}
      </dd>
    </div>
  )
}
