import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import CaseStudyPage, {
  generateMetadata,
  generateStaticParams,
} from "@/app/case-studies/[slug]/page"

describe("Internal Metrics Dashboard case study route", () => {
  it("publishes internal-metrics-dashboard in the static params list", async () => {
    await expect(generateStaticParams()).resolves.toEqual(
      expect.arrayContaining([{ slug: "internal-metrics-dashboard" }])
    )
  })

  it("renders the Internal Metrics Dashboard detail page with analytics UX sections", async () => {
    const page = await CaseStudyPage({
      params: Promise.resolve({ slug: "internal-metrics-dashboard" }),
    })

    render(page)

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Internal Metrics Dashboard/i,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByText("Searchable views that narrowed large metric sets quickly")
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { level: 2, name: "Operator UX" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { level: 2, name: "Outcome" })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole("link", { name: /Try runnable demo/i })
    ).not.toBeInTheDocument()
  })

  it("generates page metadata for the Internal Metrics Dashboard slug", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "internal-metrics-dashboard" }),
    })

    expect(metadata.title).toContain("Internal Metrics Dashboard")
    expect(metadata.description).toMatch(/dashboard/i)
  })
})
