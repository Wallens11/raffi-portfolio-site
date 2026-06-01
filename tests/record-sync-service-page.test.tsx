import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import CaseStudyPage, {
  generateMetadata,
  generateStaticParams,
} from "@/app/case-studies/[slug]/page"

describe("Record Sync Service case study route", () => {
  it("publishes record-sync-service in the static params list", async () => {
    await expect(generateStaticParams()).resolves.toEqual(
      expect.arrayContaining([{ slug: "record-sync-service" }])
    )
  })

  it("renders the Record Sync Service detail page with backend reliability sections", async () => {
    const page = await CaseStudyPage({
      params: Promise.resolve({ slug: "record-sync-service" }),
    })

    render(page)

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Record Sync Service/i,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        "Deterministic ID resolution to avoid accidental duplicate creation"
      )
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { level: 2, name: "Diagnostics" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { level: 2, name: "Outcome" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: /Try runnable demo/i })
    ).toHaveAttribute("href", "/demos/record-sync-service")
  })

  it("generates page metadata for the Record Sync Service slug", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "record-sync-service" }),
    })

    expect(metadata.title).toContain("Record Sync Service")
    expect(metadata.description).toMatch(/integration/i)
  })
})
