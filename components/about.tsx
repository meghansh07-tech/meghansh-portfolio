import { Briefcase } from 'lucide-react'
import { experience } from '@/lib/portfolio-data'
import { Reveal, SectionHeading } from './reveal'

export function About() {
  return (
    <section id="about" className="relative px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading number="01" label="About" title="Engineering mind, data-first curiosity." />

        <div className="grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <p className="text-pretty text-xl leading-relaxed text-muted-foreground md:text-2xl">
              {"I'm a developer who loves turning raw data into decisions and documents into conversations. My focus is "}
              <span className="text-foreground">Generative AI, machine learning and data science</span>
              {" — building with Python, LangChain and open-source LLMs."}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <article className="glass relative h-full overflow-hidden rounded-2xl p-6 md:p-8">
              <div aria-hidden="true" className="animate-pulse-glow pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-primary/15 blur-3xl" />
              <div className="relative flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <Briefcase className="size-4 text-primary" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold">{experience.role}</h3>
                    <p className="text-sm text-muted-foreground">
                      {experience.company} · {experience.mode}
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-muted-foreground">
                  {experience.period}
                </span>
              </div>
              <ul className="relative mt-6 flex flex-col gap-3">
                {experience.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                    <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-primary" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
