import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { RecruiterSummary } from "@/components/recruiter-summary"

describe("RecruiterSummary", () => {
  it("surfaces a fast hiring read with clear fit and proof links", () => {
    render(<RecruiterSummary />)

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Fast read for hiring managers/i,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Good fit if you need someone who can turn messy operational work into software people actually trust/i)
    ).toBeInTheDocument()
    expect(screen.getByText("Internal tools & operator software")).toBeInTheDocument()
    expect(screen.getByText("Product-minded engineering")).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: /Try Kakeibo/i })
    ).toHaveAttribute("href", "/demos/kakeibo")
    expect(
      screen.getByRole("link", { name: /See Record Sync pipeline demo/i })
    ).toHaveAttribute("href", "/demos/record-sync-service")
  })
})
