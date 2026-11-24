import { test, expect } from '@playwright/test';

test('guia de KCD II usa o diário como condição e mantém o checklist', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/guias-de-jogos/');
  await page.getByRole('link', { name: /Kingdom Come: Deliverance II/ }).first().click();
  await expect(page).toHaveURL(/\/kingdom-come-deliverance-2\/$/);
  const guide = page.locator('kcd2-journey');
  await guide.getByLabel('O que você quer resolver agora?').selectOption('route');
  await expect(guide.locator('output')).toContainText('Consulte o diário');
  await guide.getByLabel('Confirmei Wedding Crashers no diário').check();
  await expect(guide.locator('output')).toContainText('Radovan em Tachov');
  await page.reload();
  await expect(guide.getByLabel('Confirmei Wedding Crashers no diário')).toBeChecked();
  await page.getByRole('main').getByRole('link', { name: 'Wedding Crashers', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Wedding Crashers' })).toBeVisible();
  const reveal = page.getByText('Revelar o começo da rota do ferreiro');
  await expect(page.getByText(/Saia de Troskowitz/)).toBeHidden();
  await reveal.click();
  await expect(page.getByText(/Saia de Troskowitz/)).toBeVisible();
});
