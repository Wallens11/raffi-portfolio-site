import { describe, expect, it } from "vitest"
import {
  getDemoBySlug,
  getDemos,
  getCaseStudies,
  getCaseStudyBySlug,
  getFeaturedProjects,
} from "@/lib/portfolio-content"

describe("portfolio content", () => {
  it("returns the AI Ops Room case study with structured narrative sections", () => {
    const study = getCaseStudyBySlug("ai-ops-room")

    expect(study).toMatchObject({
      slug: "ai-ops-room",
      title: "AI Ops Room",
      hero: {
        eyebrow: "Flagship Case Study",
      },
      summary: {
        label: "Primary result",
      },
    })
    expect(study?.sections.map((section) => section.title)).toEqual(
      expect.arrayContaining([
        "Problem",
        "Constraints",
        "Approach",
        "Trust Signals",
        "Outcome",
      ])
    )
  })

  it("returns the Record Sync Service case study with integration-specific sections", () => {
    const study = getCaseStudyBySlug("record-sync-service")

    expect(study).toMatchObject({
      slug: "record-sync-service",
      title: "Record Sync Service",
      hero: {
        eyebrow: "Backend Integration Case Study",
      },
      summary: {
        label: "Reliability gain",
      },
    })
    expect(study?.sections.map((section) => section.title)).toEqual(
      expect.arrayContaining([
        "Problem",
        "Constraints",
        "Approach",
        "Diagnostics",
        "Outcome",
      ])
    )
  })

  it("returns the Internal Metrics Dashboard case study with product-facing analytics sections", () => {
    const study = getCaseStudyBySlug("internal-metrics-dashboard")

    expect(study).toMatchObject({
      slug: "internal-metrics-dashboard",
      title: "Internal Metrics Dashboard",
      hero: {
        eyebrow: "Operational Analytics Case Study",
      },
      summary: {
        label: "Adoption story",
      },
    })
    expect(study?.sections.map((section) => section.title)).toEqual(
      expect.arrayContaining([
        "Problem",
        "Constraints",
        "Approach",
        "Operator UX",
        "Outcome",
      ])
    )
  })

  it("returns undefined for an unpublished case study slug", () => {
    expect(getCaseStudyBySlug("not-a-real-case-study")).toBeUndefined()
  })

  it("keeps homepage featured projects wired to published case study paths", () => {
    const publishedSlugs = new Set(getCaseStudies().map((study) => study.slug))
    const demoSlugs = new Set(getDemos().map((demo) => demo.slug))

    expect(getFeaturedProjects()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "AI Ops Room",
          href: "/case-studies/ai-ops-room",
          demoHref: "/demos/ai-ops-room",
        }),
        expect.objectContaining({
          title: "Record Sync Service",
          href: "/case-studies/record-sync-service",
          demoHref: "/demos/record-sync-service",
        }),
        expect.objectContaining({
          title: "Document Template Studio",
          href: "/case-studies/document-template-studio",
          status: "Private product work",
        }),
        expect.objectContaining({
          title: "Internal Metrics Dashboard",
          href: "/case-studies/internal-metrics-dashboard",
        }),
      ])
    )

    for (const project of getFeaturedProjects()) {
      if (!project.href?.startsWith("/case-studies/")) {
        continue
      }

      const slug = project.href.replace("/case-studies/", "")
      expect(publishedSlugs.has(slug)).toBe(true)
    }

    for (const project of getFeaturedProjects()) {
      if (!project.demoHref?.startsWith("/demos/")) {
        continue
      }

      const slug = project.demoHref.replace("/demos/", "")
      expect(demoSlugs.has(slug)).toBe(true)
    }
  })

  it("exposes runnable demos for the two rebuilt project issues", () => {
    expect(getDemoBySlug("ai-ops-room")).toMatchObject({
      slug: "ai-ops-room",
      title: "AI Ops Room Demo",
    })

    expect(getDemoBySlug("record-sync-service")).toMatchObject({
      slug: "record-sync-service",
      title: "Record Sync Service Demo",
    })
  })
})
