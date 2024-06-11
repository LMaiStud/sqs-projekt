import { test, expect } from '@playwright/test';

test.use({
    geolocation: {
        latitude: 41.890221,
        longitude: 12.492348
    },
    locale: 'it-IT',
    permissions: ['geolocation'],
    timezoneId: 'Europe/Rome'
});

test('TestSucheWitheWrongName', async ({ page }) => {
    await page.goto('http://localhost/');
    await page.getByLabel('Suche').click();
    await page.getByLabel('Suche').fill('alskfdjlaskfj');
    await page.getByRole('button', { name: 'Suche' }).click();
    await page.getByRole('heading', { name: 'Diese Autobahn "ALSKFDJLASKFJ' }).click();
    await page.getByLabel('Suche').click();
    await page.getByLabel('Suche').fill('alskfdjlaskfjA');
    await page.getByLabel('Suche').press('ControlOrMeta+a');
    await page.getByLabel('Suche').fill('A99');
    await page.getByRole('button', { name: 'Suche' }).click();
    await page.getByRole('columnheader', { name: 'Standort' }).click();
    await page.getByRole('columnheader', { name: 'Beschreibung' }).click();
});

test('test', async ({ page }) => {
    await page.goto('http://localhost/');
    await page.getByLabel('Suche').click();
    await page.getByRole('button', { name: 'Suche' }).click();
    await page.getByLabel('Suche').click();
    await page.getByLabel('Suche').fill('a99');
    await page.getByRole('button', { name: 'Suche' }).click();
    await page.getByRole('columnheader', { name: 'Standort' }).click();
    await page.getByLabel('Suche').click();
    await page.getByLabel('Suche').fill('a99999');
    await page.getByRole('button', { name: 'Suche' }).click();
    await page.getByRole('heading', { name: 'Diese Autobahn "A99999"' }).click();
});