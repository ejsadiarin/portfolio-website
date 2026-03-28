import React from "react";
import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  it("shows validation error before submit", () => {
    render(<ContactForm />);

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
  });
});
