import { expect, test } from '@playwright/test';

test('homepage shows Ej Sadiarin heading', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: /ej sadiarin/i })
  ).toBeVisible();
});
