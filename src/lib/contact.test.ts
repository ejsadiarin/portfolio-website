import { describe, expect, it } from "vitest";
import { buildMailtoHref, validateContact } from "./contact";

describe("contact helpers", () => {
  it("validates required fields", () => {
    const result = validateContact({ name: "", email: "", message: "" });

    expect(result.ok).toBe(false);
    expect(result.errors.name).toBe("Name is required");
    expect(result.errors.email).toBe("Email is required");
    expect(result.errors.message).toBe("Message is required");
  });

  it("builds encoded mailto href", () => {
    const href = buildMailtoHref({
      name: "EJ",
      email: "ej@example.com",
      message: "Hello there",
    });

    expect(href).toContain("mailto:ejsadiarin@gmail.com");
    expect(href).toContain("subject=");
    expect(href).toContain("body=");
    expect(href).toContain("ej%40example.com");
  });
});
