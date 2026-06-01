import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { getDemos } from "@/lib/portfolio-content"

export const metadata: Metadata = {
  title: "Runnable Demos | Raffi",
  description:
    "Interactive fake-data demos showing real product thinking — queue triage, record sync, and operator UX without any company data.",
}

export default async function DemosIndexPage() {
  const demos = getDemos()

  return (
    <main className="min-h-screen bg-background px-6 py-8 text-foreground md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>

        <div className="mt-10">
          <p className="text-sm font-mono uppercase tracking-[0.28em] text-accent">
            Runnable Demos
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-balance md:text-5xl">
            Product surfaces, fake data.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            Each demo is rebuilt from scratch with fake data — you can interact
            with them without an account or any company context.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {demos.map((demo) => (
            <article
              key={demo.slug}
              className="group rounded-lg border border-border bg-card p-8 transition-all duration-300 hover:border-accent/50"
            >
              <p className="text-xs font-mono uppercase tracking-[0.22em] text-accent">
                {demo.eyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-foreground group-hover:text-accent transition-colors">
                {demo.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {demo.description}
              </p>
              <div className="mt-6 space-y-2">
                {demo.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={`/demos/${demo.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                >
                  Open demo
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href={demo.caseStudyHref}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Read case study
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
