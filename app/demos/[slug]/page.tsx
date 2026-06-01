import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { AiOpsRoomDemo } from "@/components/demos/ai-ops-room-demo"
import { RecordSyncServiceDemo } from "@/components/demos/record-sync-service-demo"
import { InternalMetricsDashboardDemo } from "@/components/demos/internal-metrics-dashboard-demo"
import { FormFlowDemo } from "@/components/demos/formflow-demo"
import { SecureRecordViewerDemo } from "@/components/demos/secure-record-viewer-demo"
import { KakeiboDemo } from "@/components/demos/kakeibo-demo"
import { KotobaTabiDemo } from "@/components/demos/kotoba-tabi-demo"
import { getDemoBySlug, getDemos } from "@/lib/portfolio-content"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

const demoComponents = {
  "ai-ops-room": AiOpsRoomDemo,
  "record-sync-service": RecordSyncServiceDemo,
  "internal-metrics-dashboard": InternalMetricsDashboardDemo,
  "formflow": FormFlowDemo,
  "secure-record-viewer": SecureRecordViewerDemo,
  "kakeibo": KakeiboDemo,
  "kotoba-tabi": KotobaTabiDemo,
} as const

export async function generateStaticParams() {
  return getDemos().map((demo) => ({
    slug: demo.slug,
  }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const demo = getDemoBySlug(slug)

  if (!demo) {
    return {
      title: "Demo Not Found | Raffi",
    }
  }

  return {
    title: `${demo.title} | Raffi`,
    description: `${demo.description} Built with fake data for portfolio demonstration and launch review.`,
  }
}

export default async function DemoPage({ params }: PageProps) {
  const { slug } = await params
  const demo = getDemoBySlug(slug)

  if (!demo) {
    notFound()
  }

  const DemoComponent = demoComponents[slug as keyof typeof demoComponents]

  if (!DemoComponent) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background px-6 py-8 text-foreground md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/demos"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to demos
        </Link>

        <div className="mt-10 border border-border/80 bg-card/50 p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-mono uppercase tracking-[0.28em] text-accent">
                {demo.eyebrow}
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-balance md:text-5xl">
                {demo.title}
              </h1>
              <p className="mt-5 text-base leading-8 text-muted-foreground md:text-lg">
                {demo.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 shrink-0">
              {demo.liveHref && (
                <a
                  href={demo.liveHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  Try the real app
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              <Link
                href={demo.caseStudyHref}
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
              >
                Read related case study
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {demo.highlights.map((highlight) => (
              <div key={highlight} className="border border-border/70 bg-background/80 p-4 text-sm text-muted-foreground">
                {highlight}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <DemoComponent />
        </div>
      </div>
    </main>
  )
}
