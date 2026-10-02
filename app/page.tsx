import { About } from '@/components/about'
import { Contact } from '@/components/contact'
import { Hero } from '@/components/hero'
import { IndexGrid } from '@/components/index-grid'
import { Navbar } from '@/components/navbar'
import { Projects } from '@/components/projects'
import { ScrollProgress } from '@/components/scroll-progress'
import { Sparkles } from '@/components/sparkles'
import { StatsPanel } from '@/components/stats-panel'
import { TechStack } from '@/components/tech-stack'

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Sparkles />
      <Navbar />
      <StatsPanel />
      <main className="relative z-10">
        <Hero />
        <IndexGrid />
        <About />
        <Projects />
        <TechStack />
        <Contact />
      </main>
    </>
  )
}
