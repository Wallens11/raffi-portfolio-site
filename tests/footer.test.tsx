import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Footer } from "@/components/footer"

describe("Footer CTA", () => {
  it("surfaces launch-ready contact actions and v1 scope", () => {
    render(<Footer />)

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Open to product engineering roles and select builds/i,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: /Browse demos/i })
    ).toHaveAttribute("href", "/demos")
    expect(
      screen.getByRole("link", { name: /Kakeibo demo/i })
    ).toHaveAttribute("href", "/demos/kakeibo")
    expect(
      screen.getByText(/Integration-heavy backends/i)
    ).toBeInTheDocument()
  })
})
