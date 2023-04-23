/*import { test, expect } from '@playwright/test';

test('edit course', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.goto('http://localhost:4200/studiengang/%C3%BCbersicht');
  await page.locator('a').filter({ hasText: 'Login' }).click();
  await page.getByLabel('Nutzername *').fill('Justin');
  await page.getByLabel('Nutzername *').press('Tab');
  await page.getByLabel('Passwort *').fill('Justin!');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('.mat-cell > a').first().click();
  await page.locator('#mat-slide-toggle-1 div').first().click();
  await page.getByRole('button', { name: 'Änderungen speichern' }).click();
  await expect(page.locator('snack-bar-container')).toHaveText('Der Studiengang wurde erfolgreich aktualisiert')
  await page.waitForTimeout(6000);
  await page.locator('#mat-slide-toggle-1 div').first().click();
  await page.getByRole('button', { name: 'Änderungen speichern' }).click();
  await expect(page.locator('snack-bar-container')).toHaveText('Der Studiengang wurde erfolgreich aktualisiert')
});*/