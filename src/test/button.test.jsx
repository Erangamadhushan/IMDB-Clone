import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import { Button } from "./Button"

describe("Button component", () => {
  it("renders the button", () => {
    render(<Button />)

    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()
  })

  it("renders correct button text", () => {
    render(<Button />)

    expect(screen.getByText("Test Button")).toBeInTheDocument()
  })
})
