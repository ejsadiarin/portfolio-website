import { expect, test } from "@playwright/test";

test("blog and project routes render", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.getByRole("heading", { name: /blog/i })).toBeVisible();

  await expect(page.getByRole("link", { name: "Hero" })).toHaveAttribute(
    "href",
    "/#hero",
  );
  await expect(page.getByRole("link", { name: "GitHub" })).toHaveAttribute(
    "href",
    "https://github.com/ejsadiarin",
  );
  await expect(page.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/edwinsadiarin",
  );

  await page.goto("/projects/leap-2025");
  await expect(page.getByRole("heading", { name: /leap 2025/i })).toBeVisible();
});
