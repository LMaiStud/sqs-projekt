import { test, expect } from '@playwright/test';


test.describe('New Todo', () => {
test('sucheMitFlaschenSuchbegriff', async ({ page }) => {
    await page.goto('http://localhost/');
    await page.getByLabel('Suche').click();
    await page.getByLabel('Suche').fill('sadfasfasfd');
    await page.getByRole('button', { name: 'Suche' }).click();
    await page.getByRole('heading', { name: 'Diese Autobahn "SADFASFASFD"' }).click();
});

test('sucheMitEchterA99', async ({ page }) => {
    await page.goto('http://localhost/');
    await page.getByLabel('Suche').click();
    await page.getByLabel('Suche').press('ControlOrMeta+a');
    await page.getByLabel('Suche').fill('A99');
    await page.getByRole('button', { name: 'Suche' }).click();
    await page.getByRole('columnheader', { name: 'Standort' }).click();
    await page.getByRole('columnheader', { name: 'Beschreibung' }).click();
});

test('leereSuche', async ({ page }) => {
    await page.goto('http://localhost/');
    await page.getByLabel('Suche').click();
    await page.getByRole('button', { name: 'Suche' }).click();
    await page.getByRole('heading', { name: 'Bitte Baustelle Suchen!' }).click();
    await page.getByLabel('Suche').click();
});

test('echteSucheDannFalscheSuche', async ({ page }) => {
    await page.goto('http://localhost/');
    await page.getByLabel('Suche').click();
    await page.getByLabel('Suche').fill('a99');
    await page.getByRole('button', { name: 'Suche' }).click();
    await page.getByRole('columnheader', { name: 'Standort' }).click();
    await page.getByRole('columnheader', { name: 'Beschreibung' }).click();
    await page.getByLabel('Suche').click();
    await page.getByLabel('Suche').fill('a9999');
    await page.getByRole('button', { name: 'Suche' }).click();
    await page.getByRole('heading', { name: 'Diese Autobahn "A9999"' }).click();
});

test('zweiMalEchteSucheLetzteFalsch', async ({ page }) => {
    await page.goto('http://localhost/');
    await page.getByLabel('Suche').click();
    await page.getByLabel('Suche').fill('A1');
    await page.getByRole('button', { name: 'Suche' }).click();
    await page.getByRole('columnheader', { name: 'Standort' }).click();
    await page.getByRole('columnheader', { name: 'Beschreibung' }).click();
    await page.getByLabel('Suche').click();
    await page.getByLabel('Suche').fill('A99');
    await page.getByRole('button', { name: 'Suche' }).click();
    await page.getByRole('columnheader', { name: 'Standort' }).click();
    await page.getByRole('columnheader', { name: 'Beschreibung' }).click();
    await page.getByLabel('Suche').click();
    await page.getByLabel('Suche').fill('alsfjdfsakfj');
    await page.getByRole('button', { name: 'Suche' }).click();
    await page.getByRole('heading', { name: 'Diese Autobahn "ALSFJDFSAKFJ' }).click();
});

test('sucheKleinGrossSchreibung', async ({ page }) => {
    await page.goto('http://localhost/');
    await page.getByLabel('Suche').click();
    await page.getByLabel('Suche').fill('a99');
    await page.getByRole('button', { name: 'Suche' }).click();
    await page.getByRole('columnheader', { name: 'Standort' }).click();
    await page.getByRole('columnheader', { name: 'Beschreibung' }).click();
    await page.getByLabel('Suche').click();
    await page.getByLabel('Suche').fill('A99');
    await page.getByRole('button', { name: 'Suche' }).click();
    await page.getByRole('columnheader', { name: 'Standort' }).click();
    await page.getByRole('columnheader', { name: 'Beschreibung' }).click();
    await page.getByLabel('Suche').click();
    await page.getByLabel('Suche').fill('A9999');
    await page.getByRole('button', { name: 'Suche' }).click();
    await page.getByRole('heading', { name: 'Diese Autobahn "A9999"' }).click();
});
});

