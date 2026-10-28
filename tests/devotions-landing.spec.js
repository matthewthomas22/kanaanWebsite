const { test, expect } = require('@playwright/test');

test('short landscape layouts show a devotional title below the heading', async ({
  page,
}) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const url of ['/?page=renungan', '/#renungan']) {
    await page.goto(url);
    const title = page.locator('[data-devotion-card] h2').first();
    await expect(title).toBeVisible();
    await expect
      .poll(async () => {
        const box = await title.boundingBox();
        return box.y + box.height;
      })
      .toBeLessThanOrEqual(390);
  }
});

test('homepage introduces the three latest devotions after Jadwal Kebaktian', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const sections = await page
    .locator('main > section')
    .evaluateAll((elements) => elements.map((element) => element.id));
  expect(sections).toEqual([
    'kanaan',
    'jadwal',
    'renungan',
    'kids',
    'kyc',
    'acara',
  ]);
  const section = page.locator('#renungan');
  await expect(
    section.getByRole('heading', { name: 'Renungan Harian', exact: true }),
  ).toBeVisible();
  await expect(section.locator('[data-devotion-card]')).toHaveCount(3);
  await expect(section.locator('time')).toHaveText([
    '28 Oktober 2026',
    '27 Oktober 2026',
    '26 Oktober 2026',
  ]);
  await expect(
    page
      .getByRole('navigation', { name: 'Navigasi utama' })
      .getByRole('link', { name: 'Renungan Harian', exact: true }),
  ).toHaveCount(1);
});

for (const scenario of [
  {
    name: 'desktop',
    viewport: { width: 1440, height: 960 },
    hasTouch: false,
    reducedMotion: 'no-preference',
  },
  {
    name: 'touch phone',
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    reducedMotion: 'no-preference',
  },
  {
    name: 'reduced motion',
    viewport: { width: 390, height: 844 },
    hasTouch: false,
    reducedMotion: 'reduce',
  },
]) {
  test(`landing previews preserve origin and navigation on ${scenario.name}`, async ({
    browser,
  }) => {
    const context = await browser.newContext(scenario);
    const page = await context.newPage();
    await page.goto('/#renungan');
    const section = page.locator('#renungan');
    const titles = [
      'Sebab Allah!',
      'Hidup yang Kaya dengan Syukur',
      'Allah Mengenal Nama Anda',
    ];
    for (const [index, title] of titles.entries()) {
      const card = section.getByRole('link', {
        name: new RegExp(title.replace('!', '\\!')),
      });
      await card.focus();
      await card.scrollIntoViewIfNeeded();
      await page.waitForTimeout(scenario.name === 'desktop' ? 1100 : 250);
      const scroll = await page.evaluate(() => scrollY);
      await page.keyboard.press('Enter');
      await expect(
        page.getByRole('heading', { name: title, exact: true }),
      ).toBeVisible();
      if (index === 1) await page.goBack();
      else
        await page.getByRole('button', { name: 'Kembali ke Renungan' }).click();
      await expect(card).toBeFocused();
      await expect
        .poll(async () =>
          Math.abs((await page.evaluate(() => scrollY)) - scroll),
        )
        .toBeLessThan(8);
    }
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      )
      .toBe(true);
    if (scenario.name === 'desktop') {
      await page
        .getByRole('navigation', { name: 'Pilih bagian halaman' })
        .getByRole('link', { name: 'Renungan Harian', exact: true })
        .click();
      await expect(
        page
          .getByRole('navigation', { name: 'Pilih bagian halaman' })
          .getByRole('link', { name: 'Renungan Harian', exact: true }),
      ).toHaveAttribute('aria-current', 'location');
    }
    await section.getByRole('link', { name: 'Lihat Semua Renungan' }).click();
    await expect(page).toHaveURL(/page=renungan/);
    await expect(page.locator('[data-devotion-card]')).toHaveCount(5);
    await page.goBack();
    await expect(section).toBeVisible();
    await context.close();
  });
}
