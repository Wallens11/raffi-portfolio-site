import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import DemosIndexPage from "@/app/demos/page"
import DemoPage, {
  generateMetadata,
  generateStaticParams,
} from "@/app/demos/[slug]/page"

describe("portfolio demos", () => {
  it("publishes runnable demos for the AI Ops Room and Record Sync Service routes", async () => {
    await expect(generateStaticParams()).resolves.toEqual(
      expect.arrayContaining([
        { slug: "ai-ops-room" },
        { slug: "record-sync-service" },
      ])
    )
  })

  it("renders the demos index with both runnable demo links", async () => {
    render(await DemosIndexPage())

    expect(screen.getByText(/Runnable Demos/i)).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { level: 1, name: /Product surfaces, fake data/i })
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole("link", { name: /Open demo/i })[0]
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole("link", { name: /Open demo/i })[1]
    ).toBeInTheDocument()
  })

  it("renders the AI Ops Room demo page with queue and handoff controls", async () => {
    const page = await DemoPage({
      params: Promise.resolve({ slug: "ai-ops-room" }),
    })

    render(page)

    expect(
      screen.getByRole("heading", { level: 1, name: /AI Ops Room Demo/i })
    ).toBeInTheDocument()
    expect(screen.getByText("Queue inbox")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Route to fallback/i })).toBeInTheDocument()
  })

  it("renders the Record Sync Service demo page with sync diagnostics controls", async () => {
    const page = await DemoPage({
      params: Promise.resolve({ slug: "record-sync-service" }),
    })

    render(page)

    expect(
      screen.getByRole("heading", { level: 1, name: /Record Sync Service Demo/i })
    ).toBeInTheDocument()
    expect(screen.getByText("Webhook inbox")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /Run duplicate-safe sync/i })
    ).toBeInTheDocument()
  })

  it("generates metadata for demo routes", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "record-sync-service" }),
    })

    expect(metadata.title).toContain("Record Sync Service Demo")
    expect(metadata.description).toMatch(/fake data/i)
  })
})
