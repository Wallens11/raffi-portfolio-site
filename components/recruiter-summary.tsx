"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function RecruiterSummary() {
  const { t } = useLanguage()
  const r = t.recruiterSummary

  return (
    <section id="fast-read" className="px-6 pb-8 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-border/80 bg-foreground text-background shadow-[0_36px_100px_-48px_rgba(15,23,42,0.55)]">
        <div className="grid gap-10 px-6 py-8 md:px-8 md:py-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-mono uppercase tracking-[0.26em] text-accent/90">
              {r.eyebrow}
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-balance md:text-4xl">
              {r.heading}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-background/78">
              {r.intro}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="border border-white/12 bg-white/6 px-5 py-5">
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

              <div className="border border-white/12 bg-white/6 px-5 py-5">
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
            <div className="border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] px-5 py-5">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-accent/90">
                {r.quickProofLabel}
              </p>
              <p className="mt-4 text-base leading-8 text-background/74">
                {r.quickProof}
              </p>
            </div>

            <div className="border border-white/12 bg-white/4 px-5 py-5">
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-accent/90">
                {r.startHereLabel}
              </p>
              <div className="mt-4 grid gap-3">
                {r.proofLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="inline-flex items-center justify-between gap-3 border border-white/12 bg-background px-4 py-3 text-sm text-foreground transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-4 w-4" />
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
