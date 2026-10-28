const { test, expect } = require('@playwright/test');

test('readers browse the complete archive and resume their list or card group', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?page=renungan');
  await page.getByRole('button', { name: 'Berikutnya', exact: true }).click();
  await page
    .getByRole('button', { name: 'Tampilkan Semua', exact: true })
    .click();
  const entries = page.locator('[data-devotion-archive] a');
  await expect(entries).toHaveCount(12);
  await expect(entries.first()).toContainText('Sebab Allah!');
  await expect(entries.first()).toContainText('28 Oktober 2026');
  await expect(entries.first()).toContainText('Tiana yang berusia enam tahun');
  await expect(entries.last()).toContainText('Bacaan uji 17');
  await expect(page.locator('[data-devotion-card]')).toHaveCount(0);
  await entries.last().scrollIntoViewIfNeeded();
  const archiveScroll = await page.evaluate(() => scrollY);
  await entries.last().click();
  await expect(
    page.getByRole('heading', { name: 'Bacaan uji 17', exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Kembali ke Renungan' }).click();
  await expect(entries.last()).toBeFocused();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(archiveScroll);
  await entries.last().press('Enter');
  await page.goBack();
  await expect(entries.last()).toBeFocused();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(archiveScroll);
  await page
    .getByRole('button', { name: 'Kembali ke Kartu', exact: true })
    .click();
  const cards = page.locator('[data-devotion-grid] [data-devotion-card]');
  await expect(cards).toHaveCount(5);
  await expect(cards.first()).toContainText('Bacaan uji 23');
  await expect(cards.last()).toContainText('Bacaan uji 19');
  await expect(
    page.getByRole('button', { name: 'Tampilkan Semua', exact: true }),
  ).toBeFocused();
});

for (const [name, width, height] of [
  ['phone', 390, 844],
  ['desktop', 1440, 900],
]) {
  test(`the archive remains still and readable on ${name}`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height });
    await page.goto('/?page=renungan');
    await page
      .getByRole('button', { name: 'Tampilkan Semua', exact: true })
      .click();
    const entry = page.locator('[data-devotion-archive] a').first();
    await expect(entry).toHaveCSS('transform', 'none');
    await expect(entry).toHaveCSS('animation-name', 'none');
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: testInfo.outputPath(`archive-${name}.png`),
      fullPage: true,
    });
  });
}
