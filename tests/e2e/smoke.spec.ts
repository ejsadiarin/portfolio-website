import { expect, test } from '@playwright/test';

test('homepage shows Edwin Sadiarin heading', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: /edwin sadiarin/i })
  ).toBeVisible();
});
