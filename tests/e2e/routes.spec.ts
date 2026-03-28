import { expect, test } from "@playwright/test";

test("blog and project routes render", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.getByRole("heading", { name: /blog/i })).toBeVisible();

  await page.goto("/projects/leap-2025");
  await expect(page.getByRole("heading", { name: /leap 2025/i })).toBeVisible();
});
