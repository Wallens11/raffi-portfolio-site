import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import CaseStudyPage, {
  generateMetadata,
  generateStaticParams,
} from "@/app/case-studies/[slug]/page"

describe("AI Ops Room case study route", () => {
  it("publishes ai-ops-room in the static params list", async () => {
    await expect(generateStaticParams()).resolves.toEqual(
      expect.arrayContaining([{ slug: "ai-ops-room" }])
    )
  })

  it("renders the AI Ops Room detail page with the key narrative sections", async () => {
    const page = await CaseStudyPage({
      params: Promise.resolve({ slug: "ai-ops-room" }),
    })

    render(page)

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /AI Ops Room/i,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByText("Runtime routing controls with visible execution context")
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { level: 2, name: "Trust Signals" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { level: 2, name: "Outcome" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: /Try runnable demo/i })
    ).toHaveAttribute("href", "/demos/ai-ops-room")
  })

  it("generates page metadata for the AI Ops Room slug", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "ai-ops-room" }),
    })

    expect(metadata.title).toContain("AI Ops Room")
    expect(metadata.description).toMatch(/AI operations/i)
  })
})
