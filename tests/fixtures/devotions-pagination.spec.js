const { test, expect } = require('@playwright/test');

test('readers replace five-card groups and return to the selected older group', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?page=renungan');
  const cards = page.locator('[data-devotion-grid] [data-devotion-card]');
  const newer = page.getByRole('button', { name: 'Sebelumnya', exact: true });
  const older = page.getByRole('button', { name: 'Berikutnya', exact: true });
  await expect(cards).toHaveCount(5);
  await expect(cards.first()).toContainText('Sebab Allah!');
  await expect(newer).toBeDisabled();
  await older.click();
  await expect(cards).toHaveCount(5);
  await expect(cards.first()).toContainText('Bacaan uji 23');
  await expect(cards.last()).toContainText('Bacaan uji 19');
  await expect(
    page.getByText('Renungan Terbaru', { exact: true }),
  ).toBeHidden();
  await cards.last().scrollIntoViewIfNeeded();
  const collectionScroll = await page.evaluate(() => scrollY);
  await cards.last().click();
  await expect(
    page.getByRole('heading', { name: 'Bacaan uji 19', exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Kembali ke Renungan' }).click();
  await expect(cards.last()).toBeFocused();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(collectionScroll);
  await expect(cards.first()).toContainText('Bacaan uji 23');
  await cards.last().click();
  await page.goBack();
  await expect(cards.last()).toBeFocused();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(collectionScroll);
  await older.click();
  await expect(cards).toHaveCount(2);
  await expect(cards.first()).toContainText('Bacaan uji 18');
  await expect(cards.last()).toContainText('Bacaan uji 17');
  await expect(older).toBeDisabled();
  await newer.click();
  await expect(cards).toHaveCount(5);
  await expect(cards.first()).toContainText('Bacaan uji 23');
  await newer.click();
  await expect(cards.first()).toContainText('Sebab Allah!');
  await expect(newer).toBeDisabled();
});
