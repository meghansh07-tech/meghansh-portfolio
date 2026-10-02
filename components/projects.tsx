import { projects } from '@/lib/portfolio-data'
import { ProjectCard } from './project-card'
import { SectionHeading } from './reveal'

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-24 md:px-12 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[50rem] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[160px]" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading number="02" label="Projects" title="Selected work across GenAI, data & tooling." />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.index} project={project} featured={i === 0} side={i % 2 === 1 ? 'left' : 'right'} />
          ))}
        </div>
      </div>
    </section>
  )
}
