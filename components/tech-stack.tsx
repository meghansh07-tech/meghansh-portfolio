import { coursework, skillGroups } from '@/lib/portfolio-data'
import { Reveal, SectionHeading } from './reveal'

const marqueeItems = ['Python', 'LangChain', 'RAG', 'ChromaDB', 'Ollama', 'Streamlit', 'Pandas', 'Scikit-learn', 'SQL', 'C++']

export function TechStack() {
  return (
    <section id="stack" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <SectionHeading number="03" label="Tech Stack" title="The tools I reach for." />
      </div>

      <div className="relative mb-16 overflow-hidden border-y border-white/10 py-6 [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <div aria-hidden="true" className="animate-marquee flex w-max gap-12">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-12 font-display text-4xl font-bold uppercase tracking-tight text-foreground/80 md:text-6xl">
              {item}
              <span className="text-primary">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-4 px-6 sm:grid-cols-2 md:px-12 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={(i % 3) * 0.08}>
            <article className="glass group relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_-10px_rgb(245_185_113/0.35)]">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold">{group.title}</h3>
                <span className="font-mono text-xs text-muted-foreground">
                  {String(group.items.length).padStart(2, '0')}
                </span>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-foreground/85 transition-colors group-hover:border-white/15"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mx-auto mt-4 max-w-7xl px-6 md:px-12">
        <div className="glass flex flex-col gap-4 rounded-2xl p-6 md:flex-row md:items-center">
          <span className="shrink-0 font-mono text-xs uppercase tracking-[0.25em] text-primary">Coursework</span>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {coursework.map((course) => (
              <li key={course}>{course}</li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}
