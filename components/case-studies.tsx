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
    <section id="case-studies" className="px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-6xl mx-auto">
        <AnimateIn>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-mono text-accent tracking-wide">04</span>
            <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-wide">{cs.sectionLabel}</h2>
          </div>
          <p className="text-2xl md:text-3xl font-medium text-foreground mb-16 max-w-2xl text-balance">
            {cs.heading}
          </p>
        </AnimateIn>

        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <AnimateIn key={study.title} delay={(index + 1) as 1 | 2 | 3}>
              <article className="group border border-border rounded-lg overflow-hidden hover:border-accent/50 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(15,23,42,0.14)] transition-all duration-300">
                <div className="p-8 md:p-10 bg-card">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-mono text-accent/40">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-accent transition-colors">
                          {study.title}
                        </h3>
                        {study.status ? (
                          <p className="mt-2 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                            {study.status}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                      <h4 className="text-xs font-mono text-accent uppercase tracking-wide mb-3">{cs.problemLabel}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{study.problem}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-mono text-accent uppercase tracking-wide mb-3">{cs.constraintsLabel}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{study.constraints}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-mono text-accent uppercase tracking-wide mb-3">{cs.decisionsLabel}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{study.decisions}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-mono text-accent uppercase tracking-wide mb-3">{cs.outcomeLabel}</h4>
                      <p className="text-sm text-foreground font-medium leading-relaxed">{study.outcome}</p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">
                    {study.slug ? (
                      <Link
                        href={`/case-studies/${study.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
                      >
                        {cs.readFull}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : null}
                    {study.demoHref ? (
                      <Link
                        href={study.demoHref}
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {cs.tryDemo}
                        <ArrowRight className="h-4 w-4" />
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
