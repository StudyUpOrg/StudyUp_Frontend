/*import { test, expect } from '@playwright/test';

test('add course', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.goto('http://localhost:4200/studiengang/%C3%BCbersicht');
  await page.locator('a').filter({ hasText: 'Login' }).click();
  await page.getByLabel('Nutzername *').fill('Justin');
  await page.getByLabel('Nutzername *').press('Tab');
  await page.getByLabel('Passwort *').fill('Justin!');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Studiengang hinzufügen' }).click();
  await page.getByLabel('Titel *').click();
  await page.getByLabel('Titel *').fill('Playwright Test');
  await page.getByLabel('Abschlussart *').click();
  await page.getByLabel('Abschlussart *').fill('Bachelor Playwright');
  await page.getByLabel('Startdatum *').click();
  await page.getByRole('button', { name: 'Open calendar' }).click();
  await page.getByText('18').click();
  await page.getByLabel('Beschreibung *').click();
  await page.getByLabel('Beschreibung *').fill('Dies ist ein Studiengang für Playwright Tests!');
  await page.locator('#mat-slide-toggle-1 div').nth(2).click();
  await page.getByRole('button', { name: 'Studiengang hinzufügen' }).click();
  await expect(page.locator('snack-bar-container')).toHaveText('Neuer Kurs wurde erfolgreich angelegt')
});*/