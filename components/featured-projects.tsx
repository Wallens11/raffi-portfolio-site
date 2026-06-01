"use client"

import Link from "next/link"
import { ArrowUpRight, BarChart3, Cpu, RefreshCw } from "lucide-react"
import { getFeaturedProjects } from "@/lib/portfolio-content"
import { AnimateIn } from "@/components/animate-in"
import { useLanguage } from "@/lib/language-context"

const iconMap = {
  cpu: Cpu,
  sync: RefreshCw,
  chart: BarChart3,
}

export function FeaturedProjects() {
  const { t } = useLanguage()
  const fp = t.featuredProjects
  const projects = getFeaturedProjects()

  return (
    <section id="projects" className="px-6 md:px-12 lg:px-24 py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <AnimateIn>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-mono text-accent tracking-wide">01</span>
            <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-wide">{fp.sectionLabel}</h2>
          </div>
          <p className="text-2xl md:text-3xl font-medium text-foreground mb-16 max-w-2xl text-balance">
            {fp.heading}
          </p>
        </AnimateIn>

        <div className="grid gap-8 md:gap-12">
          {projects.map((project, index) => {
            const Icon = iconMap[project.icon]
            return (
              <AnimateIn key={project.title} delay={(index + 1) as 1 | 2 | 3}>
                <article className="group relative bg-card border border-border rounded-lg p-8 md:p-10 hover:border-accent/50 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12">
                    <div className="flex-shrink-0">
                      <div className="h-14 w-14 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                        <Icon className="h-6 w-6 text-foreground group-hover:text-accent transition-colors" />
                      </div>
                    </div>

                    <div className="flex-grow">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-accent transition-colors">
                            {project.title}
                          </h3>
                          {project.status ? (
                            <p className="mt-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                              {project.status}
                            </p>
                          ) : null}
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 text-xs font-mono text-muted-foreground bg-secondary rounded-full">
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
                          <Link href={project.href} className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent">
                            {fp.readCaseStudy}
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        ) : null}
                        {project.demoHref ? (
                          <Link href={project.demoHref} className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                            {fp.tryDemo}
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        ) : null}
                      </div>
                    </div>

                    <div className="hidden lg:block text-5xl font-mono text-border group-hover:text-accent/20 transition-colors">
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
