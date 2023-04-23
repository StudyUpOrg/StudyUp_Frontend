import { test, expect } from '@playwright/test';

test('createApplicationAndChangeStatus', async ({ page }) => {
await page.goto('http://localhost:4200/');
await page.goto('http://localhost:4200/studiengang/%C3%BCbersicht');

await page.locator('mat-row').filter({ hasText: 'Playwright Test' }).last().locator('mat-cell:nth-child(4) > a').click();
await page.getByRole('button', { name: 'Jetzt bewerben' }).click();
await page.getByLabel('Vorname *').click();
await page.getByLabel('Vorname *').fill('Playwright');
await page.getByLabel('Vorname *').press('Tab');
await page.getByLabel('Nachname *').fill('Test');
await page.getByLabel('Nachname *').press('Tab');
await page.getByLabel('E-Mail *').fill('playwright@playwright.de');
await page.getByLabel('E-Mail *').press('Tab');
await page.getByLabel('Telefonnummer *').fill('010110101');
await page.getByLabel('Anschreiben *').click();
await page.getByLabel('Anschreiben *').fill('Ich bin ein Playwright Test :D');
await page.getByRole('button', { name: 'Bewerbung abschicken' }).click();
await expect(page.getByText('Link zum Bewerbungsstatus')).toHaveText('Link zum Bewerbungsstatus')

await page.locator('a').filter({ hasText: 'Login' }).click();
  await page.getByLabel('Nutzername *').fill('Justin');
  await page.getByLabel('Nutzername *').press('Tab');
  await page.getByLabel('Passwort *').fill('Justin!');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Bewerbungen' }).click();
  await page.getByText('StudiengangStudiengang').click();
  await page.getByRole('listbox', { name: 'Studiengang' }).getByText('Playwright Test').click();
  await page.locator('.cdk-overlay-backdrop').click();
  await page.getByRole('row', { name: 'Playwright Test 23.04.2023 Playwright Test Eingereicht' }).last().getByRole('link').click();
  await page.getByText('EingereichtStatus').click();
  await page.getByRole('option', { name: 'In Bearbeitung' }).click();
  await page.getByRole('button', { name: 'Status speichern' }).click();
await expect(page.locator('snack-bar-container')).toHaveText('Der Status wurde erfolgreich aktualisiert')

});