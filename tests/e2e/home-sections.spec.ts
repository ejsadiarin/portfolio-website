import { expect, test } from "@playwright/test";

test("homepage contains all core sections", async ({ page }) => {
  await page.goto("/");

  for (const id of [
    "hero",
    "about",
    "projects",
    "experience",
    "skills",
    "homelab",
    "blog",
    "contact",
  ]) {
    await expect(page.locator(`section#${id}`)).toBeVisible();
  }

  await expect(page.locator("#projects article").first()).toBeVisible();
  await expect(page.locator("#blog article").first()).toBeVisible();
});
