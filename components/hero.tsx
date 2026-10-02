'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, MapPin } from 'lucide-react'
import { profile } from '@/lib/portfolio-data'
import { easeOutExpo } from './reveal'

const firstName = 'Meghansh'.split('')
const lastName = 'Singh'.split('')

export function Hero() {
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })
  const glowX = useTransform(springX, (v) => `${v * 100}%`)
  const glowY = useTransform(springY, (v) => `${v * 100}%`)

  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const exitRotateX = useTransform(scrollYProgress, [0, 1], [0, 38])
  const exitScale = useTransform(scrollYProgress, [0, 1], [1, 0.78])
  const exitY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const exitOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const exitBlur = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(8px)'])
  const badgeRotate = useTransform(scrollYProgress, [0, 1], [0, 270])

  return (
    <section
      ref={sectionRef}
      id="top"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mouseX.set((e.clientX - rect.left) / rect.width)
        mouseY.set((e.clientY - rect.top) / rect.height)
      }}
      className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden px-6 pb-12 pt-32 md:px-12 md:pb-16"
    >
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-aurora absolute left-[10%] top-[5%] size-[42rem] rounded-full bg-primary/20 blur-[140px]" />
        <div className="animate-aurora absolute bottom-[-20%] right-[-10%] size-[36rem] rounded-full bg-[#ef5a4c]/10 blur-[140px] [animation-delay:-6s]" />
        <motion.div
          className="absolute size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[100px]"
          style={{ left: glowX, top: glowY }}
        />
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to explore"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: easeOutExpo, delay: 1.4 }}
        style={reduceMotion ? undefined : { rotate: badgeRotate }}
        className="group absolute right-6 top-28 hidden size-32 items-center justify-center md:flex lg:right-12 lg:size-36"
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-[spin_18s_linear_infinite]" aria-hidden="true">
          <defs>
            <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
          </defs>
          <text className="fill-foreground/70 font-mono text-[9px] uppercase tracking-[0.32em]">
            <textPath href="#badge-circle">Scroll to explore • GenAI • ML •</textPath>
          </text>
        </svg>
        <span className="glass flex size-12 items-center justify-center rounded-full transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowDownRight className="size-5 rotate-45" aria-hidden="true" />
        </span>
      </motion.a>

      <motion.div
        className="mx-auto w-full max-w-7xl"
        style={
          reduceMotion
            ? undefined
            : {
                rotateX: exitRotateX,
                scale: exitScale,
                y: exitY,
                opacity: exitOpacity,
                filter: exitBlur,
                transformPerspective: 1200,
                transformOrigin: '50% 0%',
              }
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.3 }}
          className="mb-8 flex flex-wrap items-center gap-3"
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em]">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            {profile.role}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3.5" aria-hidden="true" />
            {profile.location}
          </span>
        </motion.div>

        <h1 className="font-display font-extrabold uppercase leading-[0.85] tracking-tighter">
          <span className="sr-only">{profile.name}</span>
          <span aria-hidden="true" className="block overflow-hidden whitespace-nowrap text-[clamp(2rem,8.8vw,9rem)]">
            {firstName.map((char, i) => (
              <motion.span
                key={`f-${i}`}
                className="inline-block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: easeOutExpo, delay: 0.4 + i * 0.04 }}
              >
                {char}
              </motion.span>
            ))}
          </span>
          <span aria-hidden="true" className="flex items-end gap-4 overflow-hidden whitespace-nowrap text-[clamp(2rem,8.8vw,9rem)] md:gap-8">
            <span>
              {lastName.map((char, i) => (
                <motion.span
                  key={`l-${i}`}
                  className="text-glow inline-block text-primary"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, ease: easeOutExpo, delay: 0.7 + i * 0.04 }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </span>
        </h1>

        <div className="mt-12 grid gap-10 border-t border-white/10 pt-8 md:grid-cols-[1fr_auto] md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOutExpo, delay: 1.1 }}
            className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            I build <span className="text-foreground">GenAI and data-driven applications</span> — RAG pipelines,
            LLM-powered chatbots, and machine learning models that ship.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOutExpo, delay: 1.25 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              View projects
              <ArrowDownRight className="size-4 transition-transform group-hover:rotate-[-45deg]" aria-hidden="true" />
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="glass group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors hover:border-white/25"
            >
              GitHub
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
