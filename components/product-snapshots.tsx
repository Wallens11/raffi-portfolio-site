"use client"

import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  FileText,
  RefreshCw,
  ShieldCheck,
  Wallet,
} from "lucide-react"
import {
  getProductPipelineSteps,
  getProductSnapshots,
} from "@/lib/portfolio-content"
import { AnimateIn } from "@/components/animate-in"
import { useLanguage } from "@/lib/language-context"

const iconMap = {
  template: FileText,
  ops: Cpu,
  sync: RefreshCw,
  budget: Wallet,
}

export function ProductSnapshots() {
  const { t } = useLanguage()
  const ps = t.productSnapshots
  const snapshots = getProductSnapshots()
  const pipelineSteps = getProductPipelineSteps()

  return (
    <section id="product-snapshots" className="px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
          <AnimateIn>
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-4">
                <span className="text-sm font-mono tracking-wide text-accent">01</span>
                <h2 className="text-sm font-mono uppercase tracking-wide text-muted-foreground">
                  {ps.sectionLabel}
                </h2>
              </div>

              <p className="text-2xl font-medium text-foreground text-balance md:text-3xl">
                {ps.heading}
              </p>
              <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
                {ps.intro}
              </p>

              <div className="mt-8 rounded-xl border border-border/80 bg-card p-6 shadow-[0_22px_70px_-54px_rgba(15,23,42,0.5)]">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-accent" />
                  <h3 className="text-sm font-mono uppercase tracking-[0.18em] text-muted-foreground">
                    {ps.boundaryLabel}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {ps.boundaryText}
                </p>
              </div>
            </div>
          </AnimateIn>

          <div className="grid gap-4 sm:grid-cols-2">
            {snapshots.map((snapshot, index) => {
              const Icon = iconMap[snapshot.icon]

              return (
                <AnimateIn
                  key={snapshot.title}
                  delay={((index % 4) + 1) as 1 | 2 | 3 | 4}
                >
                  <article className="group flex h-full flex-col rounded-xl border border-border/80 bg-card/92 p-6 shadow-[0_18px_56px_-44px_rgba(15,23,42,0.45)] transition-[border-color,background-color,box-shadow,transform] duration-300 ease-[var(--ease-out-quint)] hover:-translate-y-1 hover:border-accent/45 hover:bg-card hover:shadow-[0_22px_70px_-46px_rgba(15,23,42,0.58)] focus-within:border-accent/45">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/70 bg-secondary/78 transition-[background-color,border-color,transform] duration-300 ease-[var(--ease-out-quint)] group-hover:-translate-y-0.5 group-hover:border-accent/30 group-hover:bg-accent/10">
                        <Icon className="h-5 w-5 text-foreground transition-colors duration-300 group-hover:text-accent" />
                      </div>
                      <span className="min-w-0 rounded-full border border-border/70 bg-secondary/70 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.14em] text-muted-foreground">
                        {snapshot.scope}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-accent">
                      {snapshot.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {snapshot.signal}
                    </p>

                    <div className="mt-5 flex items-start gap-3 text-sm leading-7 text-foreground">
                      <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-accent" />
                      <span>{snapshot.proof}</span>
                    </div>

                    <Link
                      href={snapshot.href}
                      className="group/link mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45"
                    >
                      {ps.openCaseStudy}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </Link>
                  </article>
                </AnimateIn>
              )
            })}
          </div>
        </div>

        <AnimateIn delay={2} className="mt-12">
          <div className="overflow-hidden rounded-xl border border-border/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(238,246,244,0.92))] p-6 shadow-[0_26px_76px_-54px_rgba(15,23,42,0.45)] md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-mono uppercase tracking-[0.18em] text-accent">
                  {ps.flowLabel}
                </p>
                <h3 className="mt-3 max-w-2xl text-xl font-semibold text-foreground md:text-2xl">
                  {ps.flowHeading}
                </h3>
              </div>
              <p className="max-w-md text-sm leading-7 text-muted-foreground">
                {ps.flowNote}
              </p>
            </div>

            <ol className="mt-8 grid gap-3 md:grid-cols-5">
              {pipelineSteps.map((step, index) => (
                <li
                  key={step.label}
                  className="group/step relative min-w-0 rounded-lg border border-border/70 bg-background/72 p-4 transition-[border-color,background-color,transform] duration-300 ease-[var(--ease-out-quint)] hover:-translate-y-0.5 hover:border-accent/35 hover:bg-card"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-xs font-mono text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {index < pipelineSteps.length - 1 ? (
                      <ArrowRight className="hidden h-4 w-4 text-muted-foreground transition-colors duration-300 group-hover/step:text-accent md:block" />
                    ) : null}
                  </div>
                  <p className="text-sm font-semibold text-foreground">{step.label}</p>
                  <p className="mt-2 text-xs leading-6 text-muted-foreground">
                    {step.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
