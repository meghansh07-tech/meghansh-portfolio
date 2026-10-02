'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type HTMLMotionProps } from 'framer-motion'

export const easeOutExpo = [0.16, 1, 0.3, 1] as const

type RevealProps = HTMLMotionProps<'div'> & { delay?: number; y?: number; flip?: boolean }

export function Reveal({ delay = 0, y = 32, flip = true, children, ...props }: RevealProps) {
  const reduceMotion = useReducedMotion()
  const hidden = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y, rotateX: flip ? 35 : 0, filter: 'blur(10px)' }

  return (
    <motion.div
      initial={hidden}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.1, ease: easeOutExpo, delay }}
      style={{ transformPerspective: 1000, transformOrigin: '50% 100%' }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

function SpinningNumber({ number }: { number: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotateY = useTransform(scrollYProgress, [0, 1], [-60, 60])
  const rotateZ = useTransform(scrollYProgress, [0, 1], [-8, 8])
  const x = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      style={reduceMotion ? undefined : { rotateY, rotateZ, x, transformPerspective: 800 }}
      className="inline-block font-display text-[9rem] font-extrabold leading-none text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.14)]"
    >
      {number}
    </motion.span>
  )
}

export function SectionHeading({ number, label, title }: { number: string; label: string; title: string }) {
  return (
    <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
      <Reveal>
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          {number} — {label}
        </span>
        <h2 className="mt-4 max-w-3xl text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
          {title}
        </h2>
      </Reveal>
      <div className="hidden md:block">
        <SpinningNumber number={number} />
      </div>
    </div>
  )
}
