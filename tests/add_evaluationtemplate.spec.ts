import { test, expect } from '@playwright/test';

test('add evaluationtemplate', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.goto('http://localhost:4200/studiengang/%C3%BCbersicht');
  await page.locator('a').filter({ hasText: 'Login' }).click();
  await page.getByLabel('Nutzername *').fill('Justin');
  await page.getByLabel('Nutzername *').press('Tab');
  await page.getByLabel('Passwort *').fill('Justin!');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Evaluationsbogen erstellen' }).click();
  await page.getByLabel('Name *').click();
  await page.getByLabel('Name *').fill('Playwright Test');
  await page.getByLabel('Kriterium *').click();
  await page.getByLabel('Kriterium *').fill('Playwright Kriterium');
  await page.getByRole('button', { name: 'Kriterium hinzufügen' }).click();
  await page.getByRole('button', { name: 'Evaluationsbogen erstellen' }).click();
  await expect(page.locator('snack-bar-container')).toHaveText('Evaluationsbogen wurde erfolgreich angelegt')

  await page.getByRole('link', { name: 'Evaluationsbögen' }).click();
  await page.getByText('EvaluationsbogenEvaluationsbogen').click();
  await page.getByText('Playwright Test').last().click();
  //await page.getByRole('option').last().click();
  await expect(page.getByText('label Playwright Kriterium')).toHaveText('label Playwright Kriterium')
});