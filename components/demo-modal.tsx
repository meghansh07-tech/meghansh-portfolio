'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { ProjectDemo } from '@/lib/portfolio-data'

type DemoModalProps = {
  demo: ProjectDemo
  title: string
  open: boolean
  onClose: () => void
}

export function DemoModal({ demo, title, open, onClose }: DemoModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      setSlide(0)
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
    if (!open) videoRef.current?.pause()
  }, [open])

  const images = demo.type === 'gallery' ? demo.images : []
  const go = (dir: number) => setSlide((s) => (s + dir + images.length) % images.length)

  function handleKeyDown(e: React.KeyboardEvent<HTMLDialogElement>) {
    if (demo.type !== 'gallery') return
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      aria-labelledby="demo-title"
      className="m-auto w-[min(1100px,94vw)] max-h-[92vh] overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] p-0 text-foreground backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 md:px-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            {demo.type === 'video' ? 'Demo video' : `Results · ${slide + 1} / ${images.length}`}
          </p>
          <h2 id="demo-title" className="mt-1 font-display text-lg font-bold md:text-xl">
            {title}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/10 p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <X className="size-5" aria-hidden="true" />
          <span className="sr-only">Close demo</span>
        </button>
      </div>

      <div className="p-3 md:p-5">
        {demo.type === 'video' ? (
          <video
            ref={videoRef}
            src={demo.src}
            controls
            playsInline
            preload="metadata"
            className="max-h-[72vh] w-full rounded-2xl bg-black"
          >
            <track kind="captions" />
          </video>
        ) : (
          <figure>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-white">
              <Image
                key={images[slide].src}
                src={images[slide].src}
                alt={images[slide].alt}
                fill
                sizes="(min-width: 1100px) 1060px, 94vw"
                className="object-contain"
              />
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/70 p-2.5 text-white transition-transform hover:scale-110"
                  >
                    <ChevronLeft className="size-5" aria-hidden="true" />
                    <span className="sr-only">Previous image</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/70 p-2.5 text-white transition-transform hover:scale-110"
                  >
                    <ChevronRight className="size-5" aria-hidden="true" />
                    <span className="sr-only">Next image</span>
                  </button>
                </>
              )}
            </div>
            <figcaption className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <span className="text-sm text-muted-foreground">{images[slide].caption}</span>
              <span className="flex gap-2">
                {images.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setSlide(i)}
                    aria-current={i === slide}
                    className={`h-1.5 rounded-full transition-all ${i === slide ? 'w-8 bg-primary' : 'w-4 bg-white/20 hover:bg-white/40'}`}
                  >
                    <span className="sr-only">Show image {i + 1}</span>
                  </button>
                ))}
              </span>
            </figcaption>
          </figure>
        )}
      </div>
    </dialog>
  )
}
