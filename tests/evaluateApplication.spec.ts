import { test, expect } from '@playwright/test';

test('evaluateApplication', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.goto('http://localhost:4200/studiengang/%C3%BCbersicht');
  await page.locator('a').filter({ hasText: 'Login' }).click();
  await page.getByLabel('Nutzername *').fill('Justin');
  await page.getByLabel('Nutzername *').press('Tab');
  await page.getByLabel('Passwort *').fill('Justin!');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Bewerbungen' }).click();



  //await page.locator('mat-row:nth-child(112) > mat-cell:nth-child(5)').click();
  //await page.locator('mat-row:nth-child(112) > mat-cell').first().click();
  //await page.locator('mat-row:nth-child(112) > mat-cell:nth-child(6) > a').click();
  
  await page.locator('mat-row').filter({ hasText: 'Playwright Test' }).last().locator('mat-cell:nth-child(6) > a').click();
  
  
  await page.getByText('Neue Evaluation').click();
  await page.waitForTimeout(2000);
  await page.getByText('EvaluationsbogenEvaluationsbogen').click();
  await page.waitForTimeout(2000);
  await page.locator('#mat-option-9').getByText('Playwright Test').click();
  await page.waitForTimeout(2000);
  await page.locator('#mat-input-10').click();
  await page.locator('#mat-input-10').click();
  await page.locator('#mat-input-10').fill('1');
  await page.getByLabel('Feedback').click();
  await page.getByLabel('Feedback').fill('Test');
  await page.getByRole('button', { name: 'Bewertung speichern' }).click();

  await expect(page.locator('snack-bar-container').last()).toHaveText('Bewertung wurde erfolgreich angelegt')

});