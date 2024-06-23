import { test, expect } from '@playwright/test';

test('istSeiteOnlineCheckundWirdRichtigAufgebaut', async ({ page }) => {
    await page.goto('http://localhost/');
    await page.getByRole('link', { name: 'Beste Autobaustellenauskunft' }).click();
    await page.getByRole('banner').locator('div').click();
    await page.getByLabel('Suche').click();
    await page.getByRole('button', { name: 'Suche' }).click();
    await page.locator('div').filter({ hasText: /^SucheSucheSuche Bitte Baustelle suchen!$/ }).nth(1).click();
    await page.getByRole('heading', { name: 'Bitte Baustelle suchen!' }).click();
    await page.locator('html').click();
  });

test('leereSuche', async ({ page }) => {
    await page.goto('http://localhost/');
    await page.getByLabel('Suche').click();
    await page.getByRole('button', { name: 'Suche' }).click();
    await page.getByRole('heading', { name: 'Bitte Baustelle suchen!' }).click();
});


test('falscheSuche', async ({ page }) => {
    await page.goto('http://localhost/');
    await page.getByLabel('Suche').click();
    await page.getByLabel('Suche').fill('asdflkjlaskfd');
    await page.getByRole('button', { name: 'Suche' }).click();
    await page.getByRole('heading', { name: 'Diese Autobahn "ASDFLKJLASKFD' }).click();
  });

  test('erfolgreicheSuche', async ({ page }) => {
    await page.goto('http://localhost/');
    await page.getByLabel('Suche').click();
    await page.getByLabel('Suche').fill('A99');
    await page.getByRole('button', { name: 'Suche' }).click();
    await page.getByRole('heading', { name: 'Die Autobahn A99 wurde' }).click();
  });

  test('erfolgreicheSucheDannFalscheSuche', async ({ page }) => {
    await page.goto('http://localhost/');
    await page.getByLabel('Suche').click();
    await page.getByLabel('Suche').fill('A99');
    await page.getByRole('button', { name: 'Suche' }).click();
    await page.getByRole('heading', { name: 'Die Autobahn A99 wurde' }).click();
    await page.getByLabel('Suche').click();
    await page.getByLabel('Suche').fill('A99999');
    await page.getByRole('button', { name: 'Suche' }).click();
    await page.getByRole('heading', { name: 'Diese Autobahn "A99999"' }).click();
  });

  test('erfolgreicheSucheDannleereSuche', async ({ page }) => {
    await page.goto('http://localhost/');
    await page.getByLabel('Suche').click();
    await page.getByLabel('Suche').fill('A99');
    await page.getByRole('button', { name: 'Suche' }).click();
    await page.getByLabel('Suche').click();
    await page.getByLabel('Suche').fill('');
    await page.getByRole('button', { name: 'Suche' }).click();
    await page.getByRole('heading', { name: 'Bitte Baustelle suchen!' }).click();
  });


test('checkTabelle', async ({ page }) => {
    await page.goto('http://localhost/');
    await page.getByLabel('Suche').click();
    await page.getByLabel('Suche').fill('A99');
    await page.getByRole('button', { name: 'Suche' }).click();
    await page.getByRole('heading', { name: 'Die Autobahn A99 wurde' }).click();
    await page.getByRole('columnheader', { name: 'Standort' }).click();
    await page.getByRole('columnheader', { name: 'Beschreibung' }).click();
});

test('End-to-End-Test', async ({ page }) => {
  await page.goto('http://localhost/');
  await page.getByLabel('Suche').click();
  await page.getByLabel('Suche').fill('A99');
  await page.getByRole('button', { name: 'Suche' }).click();
  await page.getByRole('heading', { name: 'Die Autobahn A99 wurde' }).click();
  await page.getByRole('columnheader', { name: 'Standort' }).click();
  await page.getByRole('columnheader', { name: 'Beschreibung' }).click();
  await page.getByLabel('Suche').click();
  await page.getByLabel('Suche').press('ArrowLeft');
  await page.getByLabel('Suche').press('ArrowLeft');
  await page.getByLabel('Suche').fill('a99');
  await page.getByRole('button', { name: 'Suche' }).click();
  await page.getByRole('heading', { name: 'Die Autobahn A99 wurde' }).click();
  await page.getByRole('columnheader', { name: 'Standort' }).click();
  await page.getByRole('columnheader', { name: 'Beschreibung' }).click();
  await page.getByLabel('Suche').click();
  await page.getByLabel('Suche').fill('');
  await page.getByRole('button', { name: 'Suche' }).click();
  await page.getByRole('heading', { name: 'Bitte Baustelle suchen!' }).click();
  await page.getByLabel('Suche').click();
  await page.getByLabel('Suche').fill('laksjdflasfjdk');
  await page.getByRole('button', { name: 'Suche' }).click();
  await page.getByRole('heading', { name: 'Diese Autobahn "' }).click();
  await page.getByLabel('Suche').click();
  await page.getByLabel('Suche').fill('');
  await page.getByRole('button', { name: 'Suche' }).click();
  await page.getByRole('heading', { name: 'Bitte Baustelle suchen!' }).click();
  await page.getByRole('link', { name: 'Beste Autobaustellenauskunft' }).click();
  await page.getByRole('banner').locator('div').click();
  await page.locator('div').filter({ hasText: /^SucheSucheSuche Bitte Baustelle suchen!$/ }).nth(1).click();
});




