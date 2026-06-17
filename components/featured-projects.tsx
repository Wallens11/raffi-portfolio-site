"use client"

import Link from "next/link"
import { ArrowUpRight, BarChart3, Cpu, FileText, RefreshCw } from "lucide-react"
import { getFeaturedProjects } from "@/lib/portfolio-content"
import { AnimateIn } from "@/components/animate-in"
import { useLanguage } from "@/lib/language-context"

const iconMap = {
  cpu: Cpu,
  sync: RefreshCw,
  chart: BarChart3,
  template: FileText,
}

export function FeaturedProjects() {
  const { t } = useLanguage()
  const fp = t.featuredProjects
  const projects = getFeaturedProjects()

  return (
    <section id="projects" className="bg-secondary/32 px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <AnimateIn>
          <div className="mb-4 flex items-center gap-4">
            <span className="text-sm font-mono tracking-wide text-accent">02</span>
            <h2 className="text-sm font-mono uppercase tracking-wide text-muted-foreground">{fp.sectionLabel}</h2>
          </div>
          <p className="mb-16 max-w-2xl text-2xl font-medium text-foreground text-balance md:text-3xl">
            {fp.heading}
          </p>
        </AnimateIn>

        <div className="grid gap-8 md:gap-12">
          {projects.map((project, index) => {
            const Icon = iconMap[project.icon]
            return (
              <AnimateIn key={project.title} delay={(index + 1) as 1 | 2 | 3}>
                <article className="group relative overflow-hidden rounded-xl border border-border/80 bg-card/92 p-8 shadow-[0_22px_70px_-54px_rgba(15,23,42,0.5)] transition-[border-color,background-color,box-shadow,transform] duration-300 ease-[var(--ease-out-quint)] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[linear-gradient(90deg,rgba(33,139,125,0),rgba(33,139,125,0.68),rgba(33,139,125,0))] before:opacity-0 before:transition-opacity before:duration-300 hover:-translate-y-1 hover:border-accent/45 hover:bg-card hover:shadow-[0_24px_80px_-48px_rgba(15,23,42,0.62)] hover:before:opacity-100 focus-within:border-accent/45 md:p-10">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12">
                    <div className="flex-shrink-0">
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-border/70 bg-secondary/80 shadow-[0_16px_36px_-32px_rgba(15,23,42,0.5)] transition-[background-color,border-color,transform] duration-300 ease-[var(--ease-out-quint)] group-hover:-translate-y-0.5 group-hover:border-accent/30 group-hover:bg-accent/10">
                        <Icon className="h-6 w-6 text-foreground transition-colors duration-300 group-hover:text-accent" />
                      </div>
                    </div>

                    <div className="flex-grow">
                      <div className="mb-4 flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-accent md:text-2xl">
                            {project.title}
                          </h3>
                          {project.status ? (
                            <p className="mt-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                              {project.status}
                            </p>
                          ) : null}
                        </div>
                        <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                      </div>

                      <p className="mb-6 max-w-2xl leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>

                      <div className="mb-6 flex flex-wrap items-center gap-3">
                        {project.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-border/60 bg-secondary/70 px-3 py-1 text-xs font-mono text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-sm font-medium text-accent">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {project.highlight}
                      </div>

                      <div className="mt-6 flex flex-wrap gap-4">
                        {project.href ? (
                          <Link href={project.href} className="group/link inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45">
                            {fp.readCaseStudy}
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                          </Link>
                        ) : null}
                        {project.demoHref ? (
                          <Link href={project.demoHref} className="group/link inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45">
                            {fp.tryDemo}
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                          </Link>
                        ) : null}
                      </div>
                    </div>

                    <div className="hidden text-5xl font-mono text-border transition-colors duration-300 group-hover:text-accent/20 lg:block">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                </article>
              </AnimateIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
