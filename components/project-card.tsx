'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowUpRight, ExternalLink, Images, Play } from 'lucide-react'
import type { Project } from '@/lib/portfolio-data'
import { GithubIcon } from './brand-icons'
import { DemoModal } from './demo-modal'

export function ProjectCard({
  project,
  featured = false,
  side = 'left',
}: {
  project: Project
  featured?: boolean
  side?: 'left' | 'right'
}) {
  const [demoOpen, setDemoOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ['start end', 'start 0.35'] })
  const entry = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 })
  const tiltDirection = featured ? 0 : side === 'left' ? 1 : -1
  const enterRotateX = useTransform(entry, [0, 1], [featured ? 45 : 28, 0])
  const enterRotateY = useTransform(entry, [0, 1], [tiltDirection * 22, 0])
  const enterScale = useTransform(entry, [0, 1], [0.82, 1])
  const enterY = useTransform(entry, [0, 1], [120, 0])
  const enterOpacity = useTransform(entry, [0, 0.5], [0, 1])
  const demoLabel = project.media?.type === 'video' ? 'Watch demo' : 'View results'
  const rotateX = useSpring(0, { stiffness: 150, damping: 18 })
  const rotateY = useSpring(0, { stiffness: 150, damping: 18 })
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)
  const glow = useMotionTemplate`radial-gradient(500px circle at ${glowX}% ${glowY}%, rgb(245 185 113 / 0.16), transparent 45%)`

  function handleMove(e: React.PointerEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    glowX.set(px * 100)
    glowY.set(py * 100)
    rotateY.set((px - 0.5) * 8)
    rotateX.set((0.5 - py) * 8)
  }

  function handleLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={wrapperRef}
      className={featured ? 'md:col-span-2' : ''}
      style={
        reduceMotion
          ? undefined
          : { opacity: enterOpacity, scale: enterScale, rotateX: enterRotateX, rotateY: enterRotateY, y: enterY, transformPerspective: 1400 }
      }
    >
      <motion.article
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        whileHover={{ y: -6 }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="glass group relative flex h-full flex-col overflow-hidden rounded-3xl"
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glow }}
        />

        <div className={`relative overflow-hidden ${featured ? 'aspect-[16/10] md:aspect-[16/7]' : 'aspect-[16/10]'} m-2 rounded-2xl`}>
          <Image
            src={project.image || '/placeholder.svg'}
            alt={`${project.title} preview`}
            fill
            sizes={featured ? '(min-width: 768px) 80vw, 100vw' : '(min-width: 768px) 40vw, 100vw'}
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {project.metrics.map((metric) => (
              <span
                key={metric}
                className="rounded-full border border-white/15 bg-black/50 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-foreground backdrop-blur-md"
              >
                {metric}
              </span>
            ))}
          </div>

          <div className="absolute inset-0 z-20 flex items-center justify-center gap-3 bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-105"
            >
              <GithubIcon className="size-4" aria-hidden="true" />
              GitHub
              <span className="sr-only">repository for {project.title}</span>
            </a>
            {project.media && (
              <button
                type="button"
                onClick={() => setDemoOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
              >
                {project.media.type === 'video' ? (
                  <Play className="size-4" aria-hidden="true" />
                ) : (
                  <Images className="size-4" aria-hidden="true" />
                )}
                {demoLabel}
              </button>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
              >
                <ExternalLink className="size-4" aria-hidden="true" />
                Live Demo
              </a>
            )}
          </div>
        </div>

        <div className="relative flex flex-1 flex-col p-6 pt-4 md:p-8 md:pt-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                {project.index} / {project.tagline}
              </span>
              <h3 className="mt-3 text-balance font-display text-2xl font-bold tracking-tight md:text-3xl">{project.title}</h3>
            </div>
            <ArrowUpRight
              className="mt-1 size-6 shrink-0 text-muted-foreground transition-all duration-500 group-hover:rotate-45 group-hover:text-primary"
              aria-hidden="true"
            />
          </div>
          <p className={`mt-4 text-pretty leading-relaxed text-muted-foreground ${featured ? 'max-w-3xl' : ''}`}>
            {project.description}
          </p>
          <ul className="mt-auto flex flex-wrap gap-2 pt-6" aria-label="Technologies">
            {project.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-foreground/80">
                {tag}
              </li>
            ))}
          </ul>
          <div className="relative z-20 mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-5">
            {project.media && (
              <button
                type="button"
                onClick={() => setDemoOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
              >
                {project.media.type === 'video' ? (
                  <Play className="size-4" aria-hidden="true" />
                ) : (
                  <Images className="size-4" aria-hidden="true" />
                )}
                {demoLabel}
                <span className="sr-only">for {project.title}</span>
              </button>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <GithubIcon className="size-4" aria-hidden="true" />
              View code
              <span className="sr-only">for {project.title} on GitHub</span>
            </a>
          </div>
        </div>
      </motion.article>
      {project.media && (
        <DemoModal demo={project.media} title={project.title} open={demoOpen} onClose={() => setDemoOpen(false)} />
      )}
    </motion.div>
  )
}
