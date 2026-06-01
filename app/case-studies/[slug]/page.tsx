import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/portfolio-content"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return getCaseStudies().map((study) => ({
    slug: study.slug,
  }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)

  if (!study) {
    return {
      title: "Case Study Not Found | Raffi",
    }
  }

  return {
    title: `${study.title} | Raffi`,
    description: `${study.hero.intro} Read how this case study was framed, constrained, and rebuilt into a clear product and engineering story.`,
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const caseStudies = getCaseStudies()
  const studyIndex = caseStudies.findIndex((candidate) => candidate.slug === slug)
  const study = studyIndex === -1 ? undefined : caseStudies[studyIndex]
  const relatedStudy =
    caseStudies.length > 1 && studyIndex !== -1
      ? caseStudies[(studyIndex + 1) % caseStudies.length]
      : undefined

  if (!study) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border/80 px-6 pb-16 pt-6 md:px-12 md:pb-20 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/#case-studies"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to selected work
          </Link>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div className="max-w-4xl">
              <p className="text-sm font-mono uppercase tracking-[0.28em] text-accent">
                {study.hero.eyebrow}
              </p>
              <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.05em] text-balance md:text-6xl">
                {study.title}
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-relaxed text-foreground/88 md:text-2xl">
                {study.hero.intro}
              </p>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {study.hero.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                {study.demoHref ? (
                  <Link
                    href={study.demoHref}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm text-foreground transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    Try runnable demo
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                ) : null}
                <Link
                  href="/demos"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
                >
                  Browse all demos
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="border-l border-border/80 pl-6">
              <p className="text-xs font-mono uppercase tracking-[0.24em] text-muted-foreground">
                {study.summary.label}
              </p>
              <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground">
                {study.summary.value}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {study.summary.detail}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 md:px-12 lg:px-24">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {study.stats.map((stat) => (
            <div
              key={stat.label}
              className="border border-border/80 bg-card/70 px-5 py-5"
            >
              <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
                {stat.label}
              </p>
              <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-foreground">
                {stat.value}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {study.screenshots && study.screenshots.length > 0 && (
        <section className="px-6 py-12 md:px-12 lg:px-24">
          <div className="mx-auto max-w-6xl">
            <p className="mb-8 text-xs font-mono uppercase tracking-[0.26em] text-muted-foreground">
              App screenshots
            </p>
            <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
              {study.screenshots.map((shot) => (
                <div key={shot.src} className="shrink-0 snap-start w-48 md:w-56">
                  <div className="overflow-hidden rounded-[1.6rem] border-4 border-border/60 bg-[#ebe8e1] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)]">
                    <Image
                      src={shot.src}
                      alt={shot.caption}
                      width={390}
                      height={844}
                      className="w-full"
                    />
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground/70 text-center">
                    {shot.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-6 pb-20 pt-8 md:px-12 lg:px-24 lg:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="space-y-16">
            {study.sections.map((section, index) => (
              <section
                key={section.title}
                className="grid gap-6 border-t border-border/80 pt-8 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10"
              >
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.26em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-foreground">
                    {section.title}
                  </h2>
                </div>

                <div className="max-w-3xl">
                  <p className="text-base leading-8 text-foreground/88 md:text-lg">
                    {section.body}
                  </p>
                  {section.bullets ? (
                    <ul className="mt-6 grid gap-3">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 text-sm leading-7 text-muted-foreground md:text-base"
                        >
                          <span className="mt-3 h-1.5 w-1.5 rounded-full bg-accent" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/80 bg-secondary/30 px-6 py-14 md:px-12 lg:px-24">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-mono uppercase tracking-[0.24em] text-accent">
              Continue Exploring
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground">
              {relatedStudy
                ? `${relatedStudy.title} is also live.`
                : "More portfolio builds are on the way."}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {relatedStudy
                ? "Each case study covers a different part of the stack — see how the same engineering principles show up across different problem types."
                : "More case studies are in progress. Browse the demos to see the product thinking in action."}
            </p>
          </div>

          {relatedStudy ? (
            <Link
              href={`/case-studies/${relatedStudy.slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              Read {relatedStudy.title}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              View homepage projects
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </section>
    </main>
  )
}
