const { test, expect } = require('@playwright/test');

async function pose(card) {
  return card.evaluate((element) => {
    const matrix = new DOMMatrix(getComputedStyle(element).transform);
    return {
      x: matrix.m41,
      y: matrix.m42,
      rotation: Math.atan2(matrix.b, matrix.a),
    };
  });
}

test('floating cards straighten and lift for pointer and keyboard selection', async ({
  page,
}) => {
  await page.goto('/?page=renungan');
  const card = page.locator('[data-devotion-card]').first();
  await expect(card).toBeVisible();
  await page.mouse.move(1, 1);
  const first = await pose(card);
  await expect
    .poll(async () => Math.abs((await pose(card)).x - first.x))
    .toBeGreaterThan(0.05);
  const bounds = await card.boundingBox();
  await page.mouse.move(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2,
  );
  await expect.poll(async () => (await pose(card)).y).toBeCloseTo(-9, 1);
  await expect
    .poll(async () => Math.abs((await pose(card)).rotation))
    .toBeLessThan(0.001);
  await card.focus();
  await page.mouse.move(1, 1);
  await page.waitForTimeout(450);
  expect((await pose(card)).y).toBeCloseTo(-9, 1);
  await page
    .getByRole('heading', { name: 'Renungan Harian', exact: true })
    .click();
  await expect
    .poll(async () => Math.abs((await pose(card)).y + 9))
    .toBeGreaterThan(0.05);
});

test('reduced-motion changes stop floating immediately and keep readings still', async ({
  page,
}) => {
  await page.goto('/?page=renungan');
  const card = page.locator('[data-devotion-card]').first();
  await expect(card).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(async () => (await pose(card)).x).toBe(0);
  await card.focus();
  await page.waitForTimeout(400);
  expect(await pose(card)).toEqual({ x: 0, y: 0, rotation: 0 });
  await card.press('Enter');
  const reader = page.locator('[data-devotion-reader]');
  await expect(reader).toBeVisible();
  await expect(reader).toBeFocused();
  await expect(page.locator('[data-devotion-transition]')).toHaveCount(0);
  const before = await reader.boundingBox();
  await page.waitForTimeout(400);
  expect(await reader.boundingBox()).toEqual(before);
  await page.getByRole('button', { name: 'Kembali ke Renungan' }).click();
  await expect(card).toBeFocused();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page
    .getByRole('heading', { name: 'Renungan Harian', exact: true })
    .click();
  await expect
    .poll(async () => Math.abs((await pose(card)).x))
    .toBeGreaterThan(0.05);
});

test('selected card expands and reverses repeatedly without leaving an overlay', async ({
  page,
}) => {
  await page.goto('/?page=renungan');
  for (let repeat = 0; repeat < 2; repeat += 1) {
    const card = page.locator('[data-devotion-card]').first();
    await card.focus();
    await card.press('Enter');
    await expect(page.locator('[data-devotion-transition]')).toBeAttached();
    await expect(page.locator('[data-devotion-reader]')).toBeVisible();
    await expect(page.locator('[data-devotion-transition]')).toHaveCount(0);
    await page.getByRole('button', { name: 'Kembali ke Renungan' }).click();
    await expect(page.locator('[data-devotion-transition]')).toBeAttached();
    await expect(card).toBeVisible();
    await expect(card).toBeFocused();
    await expect(page.locator('[data-devotion-transition]')).toHaveCount(0);
  }
});

test('phone cards use lighter movement and fit the viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/?page=renungan');
  const card = page.locator('[data-devotion-card]').first();
  await card.focus();
  await expect.poll(async () => (await pose(card)).y).toBeCloseTo(-4.5, 1);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
  await card.press('Enter');
  await expect(page.locator('[data-devotion-transition]')).toBeAttached();
  await expect(page.locator('[data-devotion-reader]')).toBeVisible();
  await expect(page.locator('[data-devotion-transition]')).toHaveCount(0);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
});

test('scrolled cards open above the fold and browser Back reverses', async ({
  page,
}) => {
  await page.setViewportSize({ width: 800, height: 700 });
  await page.goto('/?page=renungan');
  const card = page.locator('[data-devotion-card]').last();
  await card.focus();
  await card.scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(100);
  await card.press('Enter');
  await expect(page.locator('[data-devotion-transition]')).toBeAttached();
  await expect(page.locator('[data-devotion-reader]')).toBeVisible();
  await expect(page.locator('[data-devotion-transition]')).toHaveCount(0);
  const readerBox = await page.locator('[data-devotion-reader]').boundingBox();
  expect(readerBox.y).toBeGreaterThan(0);
  expect(readerBox.y).toBeLessThan(400);
  await page.goBack();
  await expect(page.locator('[data-devotion-transition]')).toBeAttached();
  await expect(card).toBeFocused();
  await expect(page.locator('[data-devotion-transition]')).toHaveCount(0);
});
