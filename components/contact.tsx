import { ArrowUpRight, Code2, Mail } from 'lucide-react'
import { profile } from '@/lib/portfolio-data'
import { GithubIcon, LinkedinIcon } from './brand-icons'
import { Reveal } from './reveal'
import { CopyEmailButton } from './copy-email-button'

const gmailCompose = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`

const channels = [
  { label: 'GitHub', handle: 'meghansh07-tech', href: profile.links.github, icon: GithubIcon },
  { label: 'LinkedIn', handle: 'meghansh-singh', href: profile.links.linkedin, icon: LinkedinIcon },
  { label: 'Codolio', handle: 'Coding tracker', href: profile.links.codolio, icon: Code2 },
  { label: 'Email', handle: profile.email, href: gmailCompose, icon: Mail },
]

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 pb-10 pt-24 md:px-12 md:pt-32">
      <div aria-hidden="true" className="animate-aurora pointer-events-none absolute bottom-0 left-1/2 -z-10 size-[44rem] -translate-x-1/2 translate-y-1/3 rounded-full bg-primary/20 blur-[160px]" />
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">04 — Contact</span>
          <h2 className="mt-6 text-balance font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tighter md:text-8xl">
            {"Let's build"}
            <br />
            <span className="text-glow text-primary">something smart.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={gmailCompose}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 border-b border-white/20 pb-2 font-display text-xl font-semibold transition-colors hover:border-primary hover:text-primary md:text-3xl"
          >
            {profile.email}
            <ArrowUpRight className="size-6 transition-transform group-hover:rotate-45" aria-hidden="true" />
          </a>
          <CopyEmailButton email={profile.email} />
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((channel, i) => (
            <Reveal key={channel.label} delay={i * 0.06}>
              <div className="h-full">
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noreferrer"
                  className="glass group flex h-full items-center justify-between gap-4 rounded-2xl p-5 transition-all duration-500 hover:border-primary/40 hover:bg-white/[0.04]"
                >
                  <span className="flex min-w-0 items-center gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <channel.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold">{channel.label}</span>
                      <span className="block truncate text-sm text-muted-foreground">{channel.handle}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover:rotate-45 group-hover:text-primary" aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <footer className="mt-24 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.2em]">GenAI · Machine Learning · Data Science</p>
        </footer>
      </div>
    </section>
  )
}
