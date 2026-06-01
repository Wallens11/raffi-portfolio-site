import { describe, expect, it, vi } from "vitest"

vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "font-body" }),
  JetBrains_Mono: () => ({ variable: "font-code" }),
}))

import { metadata } from "@/app/layout"

describe("layout metadata", () => {
  it("publishes stronger share metadata for the portfolio homepage", () => {
    expect(metadata.title).toMatchObject({
      default: "Raffi Windarto | Product-minded Software Engineer",
    })
    expect(metadata.description).toMatch(/internal products/i)
    expect(metadata.metadataBase?.href).toBe("http://localhost:3000/")
    expect(metadata.openGraph).toMatchObject({
      siteName: "Raffi Windarto",
      type: "website",
    })
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "Raffi Windarto | Product-minded Software Engineer",
    })
  })
})
