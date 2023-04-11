import { test, expect } from '@playwright/test';

test('authentification', async ({ page }) => {

  const username = 'Justin';
  const password = 'Justin!';

  await page.goto('https://localhost:3000/');
  await page.locator('a').filter({ hasText: 'Login' }).click();
  await page.getByLabel('Nutzername *').fill(username);
  await page.getByLabel('Passwort *').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('snack-bar-container')).toHaveText('Du wurdest erfolgreich eingeloggt.')

  //Wait for 7 seconds then continue with the test

  await page.waitForTimeout(6000);

  await page.locator('a').filter({ hasText: 'Konto' }).click();
  await page.getByRole('button', { name: 'Abmelden' }).click();

  await expect(page.locator('snack-bar-container')).toHaveText('Du wurdest erfolgreich ausgeloggt.')
});
