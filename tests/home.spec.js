const { test, expect } = require('@playwright/test');
const fs = require('node:fs');

test('preview server exposes website files without project internals', async ({ request }) => {
  expect((await request.get('/')).status()).toBe(200);
  expect((await request.get('/PRODUCT.md')).status()).toBe(404);
  expect((await request.get('/.impeccable/config.json')).status()).toBe(404);
  expect((await request.get('/assets/fonts%5c..%5c..%5cPRODUCT.md')).status()).toBe(400);
});

test('homepage navigation, local assets, responsive chapters, and reduced motion', async ({ page }) => {
  test.setTimeout(60000);
  fs.mkdirSync('.impeccable/review', { recursive: true });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  for (const [name, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844], ['small', 320, 740]]) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('h1')).toHaveText('GKIm Kanaan');
    await expect(page.locator('.site-header')).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: `.impeccable/review/${name}.png`, fullPage: true });
    if (name === 'desktop') {
      await page.mouse.wheel(0, 650);
      await expect(page.locator('.site-header [data-section="kids"]')).toHaveAttribute('aria-current', 'location');
    }
    for (const id of ['kids', 'kyc', 'acara', 'kanaan']) {
      await page.locator(`.site-header [data-section="${id}"]`).click();
      await expect.poll(async () => page.locator(`.site-header [data-section="${id}"]`).getAttribute('aria-current')).toBe('location');
      await expect.poll(async () => Math.abs(await page.locator(`#${id}`).evaluate(el => el.getBoundingClientRect().top) - await page.locator('.site-header').evaluate(el => el.offsetHeight))).toBeLessThan(3);
      await page.screenshot({ path: `.impeccable/review/${name}-${id}.png` });
    }
    expect(await page.locator('.kids-photo img').evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
    await expect(page.locator('.event-template')).toHaveCount(3);
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollSnapType)).toBe('none');
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  expect(errors).toEqual([]);
});
