import { test, expect } from '@playwright/test';

test('authentification', async ({ page }) => {
  await page.goto('http://localhost:4200');
  await page.locator('a').filter({ hasText: 'Login' }).click();
  await page.getByLabel('Nutzername *').click();
  await page.getByLabel('Nutzername *').fill('Justin');
  await page.getByLabel('Passwort *').click();
  await page.getByLabel('Passwort *').fill('Justin!');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('snack-bar-container')).toHaveText('eingeloggt');

  

  await page.waitForTimeout(6000);

  await page.getByRole('link', { name: 'Konto' }).click();
  await page.getByRole('button', { name: 'Abmelden' }).click();
  await expect(page.locator('snack-bar-container')).toHaveText('Du wurdest erfolgreich ausgeloggt');

});
