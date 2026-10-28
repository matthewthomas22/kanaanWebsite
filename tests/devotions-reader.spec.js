const { test, expect } = require('@playwright/test');

test('Renungan Harian opens a complete reading and restores the selected card', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?page=renungan');
  await expect(
    page.getByRole('heading', { name: 'Renungan Harian', exact: true }),
  ).toBeVisible();
  const card = page.getByRole('link', { name: /Sebab Allah!/ });
  await card.click();
  await expect(page).toHaveURL(/devotion=sebab-allah/);
  await expect(
    page.getByRole('heading', { name: 'Sebab Allah!', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText('Santapan Rohani Rabu, 28 Oktober 2026', { exact: true }),
  ).toBeVisible();
  await expect(page.getByText('Yeremia 15–17', { exact: false })).toBeVisible();
  await page.getByRole('button', { name: 'Kembali ke Renungan' }).click();
  await expect(card).toBeFocused();
  await card.click();
  await page.reload();
  await expect(
    page.getByRole('heading', { name: 'Sebab Allah!', exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Kembali ke Renungan' }).click();
  await expect(
    page.getByRole('heading', { name: 'Renungan Harian', exact: true }),
  ).toBeVisible();
});

test('shared devotional links survive refresh and recover from unknown entries on phones', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/?page=renungan&devotion=allah-mengenal-nama-anda');
  await expect(
    page.getByRole('heading', {
      name: 'Allah Mengenal Nama Anda',
      exact: true,
    }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByText('Ayat Bacaan: Yesaya 43:1-7', { exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Kembali ke Renungan' }).click();
  await expect(
    page.getByRole('heading', { name: 'Renungan Harian', exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.goto('/?page=renungan&devotion=unknown');
  await expect(
    page.getByRole('heading', { name: 'Renungan tidak ditemukan' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Kembali ke Renungan' }).click();
  await expect(
    page.getByRole('heading', { name: 'Renungan Harian', exact: true }),
  ).toBeVisible();
});

test('keyboard reading and browser back/forward preserve the selected devotional', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?page=renungan');
  const card = page.getByRole('link', {
    name: /Kesetiaan yang Tenang dalam Kristus/,
  });
  await card.focus();
  await page.keyboard.press('Enter');
  await expect(
    page.getByRole('heading', {
      name: 'Kesetiaan yang Tenang dalam Kristus',
      exact: true,
    }),
  ).toBeVisible();
  await page.goBack();
  await expect(card).toBeFocused();
  await page.goForward();
  await expect(
    page.getByRole('heading', {
      name: 'Kesetiaan yang Tenang dalam Kristus',
      exact: true,
    }),
  ).toBeVisible();
});
