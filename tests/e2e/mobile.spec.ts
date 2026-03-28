import { devices, expect, test } from "@playwright/test";

test.use({ ...devices["iPhone 13"] });
test.use({ browserName: "chromium" });

test("mobile nav and sections remain usable", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("header[data-fixed-nav='true']")).toBeVisible();
  await expect(page.locator("section#projects")).toBeVisible();
});
