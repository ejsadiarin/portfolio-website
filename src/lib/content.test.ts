import { describe, expect, it } from "vitest";
import { getFeaturedProjects, sortPostsByDateDesc } from "./content";

describe("content helpers", () => {
  it("returns only featured projects", () => {
    const featured = getFeaturedProjects([
      { data: { featured: true, date: "2025-01" } },
      { data: { featured: false, date: "2024-01" } },
    ] as any);

    expect(featured).toHaveLength(1);
  });

  it("sorts blog posts by newest first", () => {
    const sorted = sortPostsByDateDesc([
      { data: { pubDate: new Date("2024-01-01") } },
      { data: { pubDate: new Date("2025-01-01") } },
    ] as any);

    expect(sorted[0].data.pubDate.toISOString()).toContain("2025");
  });
});
