"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowDown, FileText } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

function StatCard({ label, caption, index }: { label: string; caption: string; index: number }) {
  return (
    <div className="rounded-2xl border border-border/80 bg-background/70 px-4 py-4 backdrop-blur-sm">
      <p className="text-sm font-mono uppercase tracking-[0.2em] text-accent">
        {index === 0 ? <span className="tabular-nums">{label}</span> : label}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{caption}</p>
    </div>
  )
}

export function Hero() {
  const { t } = useLanguage()
  const h = t.hero

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToCaseStudies = () => {
    document.getElementById("case-studies")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-[90vh] overflow-hidden px-6 pb-20 pt-16 md:px-12 md:pt-20 lg:px-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(33,139,125,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.08),transparent_30%)]" />
      <div className="relative mx-auto grid min-h-[80vh] max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,1fr)_28rem]">
        <div className="max-w-4xl animate-hero-in">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-mono uppercase tracking-[0.24em] text-muted-foreground">
              {h.openTo}
            </span>
          </div>

          <p className="mb-5 text-sm font-mono uppercase tracking-[0.3em] text-accent">
            {h.tagline}
          </p>

          <h1 className="mb-4 max-w-3xl text-5xl font-semibold tracking-[-0.04em] text-foreground text-balance md:text-6xl lg:text-7xl">
            {h.name}
          </h1>

          <p className="mb-6 text-lg font-medium text-muted-foreground md:text-xl">
            {h.role}
          </p>

          <p className="mb-5 max-w-2xl text-xl leading-relaxed text-foreground/85 text-pretty md:text-2xl">
            {h.pitch}
          </p>

          <p className="mb-12 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {h.sub}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={scrollToProjects}
              className="group bg-foreground text-background hover:bg-foreground/90"
            >
              {h.viewProjects}
              <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToCaseStudies}
              className="group border-border bg-background/60 hover:bg-secondary"
            >
              <FileText className="mr-2 h-4 w-4" />
              {h.readCaseStudies}
            </Button>
          </div>

          <div className="mt-12 grid max-w-2xl gap-4 sm:grid-cols-3">
            {h.stats.map(({ label, caption }, i) => (
              <StatCard key={label} label={label} caption={caption} index={i} />
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md animate-hero-image lg:max-w-none">
          <div className="absolute -left-8 top-8 hidden h-40 w-40 rounded-full bg-accent/15 blur-3xl lg:block" />
          <div className="absolute -right-8 bottom-8 hidden h-40 w-40 rounded-full bg-foreground/8 blur-3xl lg:block" />
          <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/80 p-3 shadow-[0_32px_80px_-36px_rgba(15,23,42,0.45)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#dcdde2]">
              <Image
                src="/raffi-portrait.jpg"
                alt="Portrait of Raffi"
                fill
                priority
                sizes="(min-width: 1024px) 28rem, 80vw"
                className="object-cover object-[38%_20%]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(17,24,39,0.26),transparent_26%,transparent_72%,rgba(255,255,255,0.18))]" />
            </div>
            <div className="flex items-center justify-between gap-4 px-2 pb-1 pt-4">
              <div>
                <p className="text-sm font-mono uppercase tracking-[0.2em] text-accent">Raffi</p>
                <p className="mt-1 text-sm text-muted-foreground">Engineer building calm, practical systems for messy real work.</p>
              </div>
              <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                Osaka / Remote
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-6 hidden md:block md:left-12 lg:left-24">
        <div className="flex items-center gap-4 text-sm font-mono text-muted-foreground">
          <span className="h-px w-12 bg-border" />
          <span>{h.scrollHint}</span>
        </div>
      </div>
    </section>
  )
}
