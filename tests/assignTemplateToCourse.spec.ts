import { test, expect } from '@playwright/test';

test('assignTemplateToCourse', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.goto('http://localhost:4200/studiengang/%C3%BCbersicht');
  await page.locator('a').filter({ hasText: 'Login' }).click();
  await page.getByLabel('Nutzername *').fill('Justin');
  await page.getByLabel('Nutzername *').press('Tab');
  await page.getByLabel('Passwort *').fill('Justin!');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Studiengänge' }).click();
  await page.locator('mat-row').filter({ hasText: 'Playwright Test' }).last().locator('mat-cell:nth-child(4) > a').click();
  await page.locator('#mat-select-value-1').click();
  await page.waitForTimeout(1000);
  await page.getByText('Playwright Test').last().click();
  await page.waitForTimeout(1000);
  await page.locator('.cdk-overlay-backdrop').click();
  await page.waitForTimeout(750);
  await page.getByRole('button', { name: 'Änderungen speichern' }).click();
  await page.getByText('Playwright Test').last().click();
  await expect(page.locator('snack-bar-container').last()).toHaveText('Neue Templates wurden dem Kurs zugewiesen')

});