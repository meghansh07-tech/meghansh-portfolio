'use client'

import { useEffect, useRef } from 'react'

type Sparkle = {
  x: number
  y: number
  r: number
  phase: number
  speed: number
  drift: number
  hue: 'gold' | 'white'
}

export function Sparkles({ density = 0.00012 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let sparkles: Sparkle[] = []
    let width = 0
    let height = 0
    let frame = 0

    const seed = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(width * height * density)
      sparkles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.4,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.006,
        drift: Math.random() * 0.15 + 0.03,
        hue: Math.random() > 0.65 ? 'gold' : 'white',
      }))
    }

    const drawStar = (s: Sparkle, alpha: number) => {
      const color = s.hue === 'gold' ? `rgba(215, 255, 90, ${alpha})` : `rgba(255, 255, 255, ${alpha})`
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fill()

      if (s.r > 1.3 && alpha > 0.6) {
        const len = s.r * 4 * alpha
        ctx.strokeStyle = color
        ctx.lineWidth = 0.6
        ctx.beginPath()
        ctx.moveTo(s.x - len, s.y)
        ctx.lineTo(s.x + len, s.y)
        ctx.moveTo(s.x, s.y - len)
        ctx.lineTo(s.x, s.y + len)
        ctx.stroke()
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      for (const s of sparkles) {
        if (!reduceMotion) {
          s.phase += s.speed
          s.y -= s.drift
          if (s.y < -4) {
            s.y = height + 4
            s.x = Math.random() * width
          }
        }
        const alpha = 0.15 + ((Math.sin(s.phase) + 1) / 2) * 0.85
        drawStar(s, alpha)
      }
      if (!reduceMotion) frame = requestAnimationFrame(render)
    }

    seed()
    render()
    const onResize = () => {
      cancelAnimationFrame(frame)
      seed()
      render()
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
    }
  }, [density])

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 size-full opacity-70" />
}
