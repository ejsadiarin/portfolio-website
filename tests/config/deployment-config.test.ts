import { describe, expect, it } from "vitest";
import fs from "node:fs";

describe("deployment config", () => {
  it("includes Traefik https router labels", () => {
    const compose = fs.readFileSync("docker-compose.yml", "utf-8");
    expect(compose).toContain("traefik.http.routers.portfolio.entrypoints=https");
  });
});
