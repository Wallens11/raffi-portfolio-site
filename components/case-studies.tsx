"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getCaseStudyPreviews } from "@/lib/portfolio-content"
import { AnimateIn } from "@/components/animate-in"
import { useLanguage } from "@/lib/language-context"

export function CaseStudies() {
  const { t } = useLanguage()
  const cs = t.caseStudies
  const caseStudies = getCaseStudyPreviews()

  return (
    <section id="case-studies" className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <AnimateIn>
          <div className="mb-4 flex items-center gap-4">
            <span className="text-sm font-mono tracking-wide text-accent">04</span>
            <h2 className="text-sm font-mono uppercase tracking-wide text-muted-foreground">{cs.sectionLabel}</h2>
          </div>
          <p className="mb-16 max-w-2xl text-2xl font-medium text-foreground text-balance md:text-3xl">
            {cs.heading}
          </p>
        </AnimateIn>

        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <AnimateIn key={study.title} delay={(index + 1) as 1 | 2 | 3}>
              <article className="group overflow-hidden rounded-xl border border-border/80 bg-card shadow-[0_22px_70px_-54px_rgba(15,23,42,0.5)] transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-quint)] hover:-translate-y-1 hover:border-accent/45 hover:shadow-[0_24px_80px_-48px_rgba(15,23,42,0.62)] focus-within:border-accent/45">
                <div className="bg-card p-8 md:p-10">
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-mono text-accent/40">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-accent md:text-2xl">
                          {study.title}
                        </h3>
                        {study.status ? (
                          <p className="mt-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                            {study.status}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-accent" />
                  </div>

                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <h4 className="mb-3 text-xs font-mono uppercase tracking-wide text-accent">{cs.problemLabel}</h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">{study.problem}</p>
                    </div>
                    <div>
                      <h4 className="mb-3 text-xs font-mono uppercase tracking-wide text-accent">{cs.constraintsLabel}</h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">{study.constraints}</p>
                    </div>
                    <div>
                      <h4 className="mb-3 text-xs font-mono uppercase tracking-wide text-accent">{cs.decisionsLabel}</h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">{study.decisions}</p>
                    </div>
                    <div>
                      <h4 className="mb-3 text-xs font-mono uppercase tracking-wide text-accent">{cs.outcomeLabel}</h4>
                      <p className="text-sm font-medium leading-relaxed text-foreground">{study.outcome}</p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">
                    {study.slug ? (
                      <Link
                        href={`/case-studies/${study.slug}`}
                        className="group/link inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                      >
                        {cs.readFull}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                      </Link>
                    ) : null}
                    {study.demoHref ? (
                      <Link
                        href={study.demoHref}
                        className="group/link inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                      >
                        {cs.tryDemo}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
