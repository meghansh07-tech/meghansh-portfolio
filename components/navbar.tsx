'use client'

import { motion } from 'framer-motion'
import { profile } from '@/lib/portfolio-data'
import { easeOutExpo } from './reveal'

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: easeOutExpo, delay: 0.2 }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav
        aria-label="Primary"
        className="glass flex w-full max-w-3xl items-center justify-between rounded-full py-2 pl-5 pr-2"
      >
        <a href="#top" className="font-display text-sm font-bold tracking-tight">
          MS<span className="text-primary">.</span>
        </a>
        <ul className="hidden items-center gap-1 sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-primary"
        >
          {"Let's talk"}
        </a>
      </nav>
    </motion.header>
  )
}
