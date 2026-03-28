import { expect, test } from "@playwright/test";

test("homepage uses fixed nav and accent token", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("header[data-fixed-nav='true']")).toBeVisible();

  const accent = await page.evaluate(() =>
    getComputedStyle(document.documentElement)
      .getPropertyValue("--color-accent")
      .trim(),
  );

  expect(accent).toBe("#fbbf24");

  const monoFont = await page
    .locator("[data-terminal-brand='true']")
    .evaluate((el) => getComputedStyle(el).fontFamily.toLowerCase());

  expect(monoFont).toContain("jetbrains mono");
});
