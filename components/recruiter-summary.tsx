"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function RecruiterSummary() {
  const { t } = useLanguage()
  const r = t.recruiterSummary

  return (
    <section id="fast-read" className="px-6 pb-8 md:px-12 lg:px-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-xl border border-border/80 bg-foreground text-background shadow-[0_36px_100px_-48px_rgba(15,23,42,0.55)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(91,215,197,0.62),transparent)]" />
        <div className="grid gap-10 px-6 py-8 md:px-8 md:py-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-mono uppercase tracking-[0.26em] text-accent/90">
              {r.eyebrow}
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold text-balance md:text-4xl">
              {r.heading}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-background/78">
              {r.intro}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-white/12 bg-white/6 px-5 py-5">
                <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-accent/90">
                  {r.bestFitLabel}
                </p>
                <ul className="mt-4 grid gap-3">
                  {r.bestFit.map((signal) => (
                    <li key={signal} className="flex items-start gap-3 text-sm leading-7 text-background/74">
                      <span className="mt-3 h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-white/12 bg-white/6 px-5 py-5">
                <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-accent/90">
                  {r.whatTeamsGetLabel}
                </p>
                <ul className="mt-4 grid gap-3">
                  {r.workStyle.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-7 text-background/74">
                      <span className="mt-3 h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-lg border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] px-5 py-5">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-accent/90">
                {r.quickProofLabel}
              </p>
              <p className="mt-4 text-base leading-8 text-background/74">
                {r.quickProof}
              </p>
            </div>

            <div className="rounded-lg border border-white/12 bg-white/4 px-5 py-5">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-accent/90">
                {r.startHereLabel}
              </p>
              <div className="mt-4 grid gap-3">
                {r.proofLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group inline-flex items-center justify-between gap-3 rounded-lg border border-white/12 bg-background px-4 py-3 text-sm text-foreground shadow-[0_14px_32px_-28px_rgba(0,0,0,0.55)] transition-[border-color,color,transform] duration-300 ease-[var(--ease-out-quint)] hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45 active:translate-y-0"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
