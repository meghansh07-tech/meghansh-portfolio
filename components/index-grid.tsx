'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { easeOutExpo } from './reveal'

const entries = [
  { n: '01', label: 'About', href: '#about', note: 'Focus & experience' },
  { n: '02', label: 'Projects', href: '#projects', note: '5 selected works' },
  { n: '03', label: 'Tech Stack', href: '#stack', note: 'Languages & tools' },
  { n: '04', label: 'Contact', href: '#contact', note: 'Say hello' },
]

export function IndexGrid() {
  return (
    <nav aria-label="Table of contents" className="px-6 py-16 md:px-12">
      <ol className="mx-auto grid max-w-7xl grid-cols-1 overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {entries.map((entry, i) => (
          <motion.li
            key={entry.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOutExpo, delay: i * 0.08 }}
            className="border-white/10 [&:not(:last-child)]:border-b sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:[&:not(:last-child)]:border-r"
          >
            <a
              href={entry.href}
              className="group relative flex h-full min-h-56 flex-col justify-between overflow-hidden p-6 transition-colors hover:bg-white/[0.03] md:p-8"
            >
              <div className="pointer-events-none absolute -bottom-24 -right-24 size-56 rounded-full bg-primary/0 blur-3xl transition-colors duration-700 group-hover:bg-primary/25" />
              <div className="flex items-start justify-between">
                <span className="font-display text-7xl font-extrabold leading-none text-transparent transition-colors duration-500 [-webkit-text-stroke:1px_rgb(255_255_255/0.25)] group-hover:text-primary group-hover:[-webkit-text-stroke:1px_transparent]">
                  {entry.n}
                </span>
                <ArrowUpRight
                  className="size-5 text-muted-foreground transition-all duration-500 group-hover:rotate-45 group-hover:text-primary"
                  aria-hidden="true"
                />
              </div>
              <div className="relative">
                <span className="block font-display text-2xl font-bold uppercase tracking-tight">{entry.label}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{entry.note}</span>
              </div>
            </a>
          </motion.li>
        ))}
      </ol>
    </nav>
  )
}
