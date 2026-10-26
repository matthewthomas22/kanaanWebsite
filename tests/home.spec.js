const { test, expect } = require('@playwright/test');
const fs = require('node:fs');

test('production website excludes project internals and original artwork', async ({ request }) => {
  const home = await request.get('/');
  expect(home.status()).toBe(200);
  const homepage = await home.text();
  for (const path of ['/PRODUCT.md', '/.impeccable/config.json', '/package.json', '/src/App.vue', '/Foto%20Profil%20Kanaan%20Kids.af']) {
    const response = await request.get(path);
    // Vite preview may serve the homepage for unknown paths through its SPA fallback.
    if (response.ok()) expect(await response.text()).toBe(homepage);
    else expect(response.status()).toBe(404);
  }
  const output = fs.readdirSync('dist', { recursive: true });
  expect(output).toContain('index.html');
  expect(output.filter(file => /(^|[/\\])(src|tests|design-files|references|portraits|kanaan-kids-profiles)([/\\]|$)|\.(af|md|vue|lock)$|package\.json$/.test(file))).toEqual([]);
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
    expect(await page.evaluate(() => ['Cormorant', 'Inter'].every(family => [...document.fonts].some(font => font.family === family && font.status === 'loaded')))).toBe(true);
    await expect(page.locator('h1')).toHaveText('GKIm Kanaan');
    await expect(page.locator('.site-header')).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: `.impeccable/review/${name}.png`, fullPage: true });
    if (name === 'desktop') {
      await page.mouse.wheel(0, 650);
      await expect(page.locator('.site-header [data-section="kids"]')).toHaveAttribute('aria-current', 'location');
      await expect(page.locator('.section-rail [data-section="kids"]')).toHaveAttribute('aria-current', 'location');
    }
    for (const id of ['kids', 'kyc', 'acara', 'kanaan']) {
      await page.locator(`.site-header [data-section="${id}"]`).click();
      await expect.poll(async () => page.locator(`.site-header [data-section="${id}"]`).getAttribute('aria-current')).toBe('location');
      await expect(page.locator(`.section-rail [data-section="${id}"]`)).toHaveAttribute('aria-current', 'location');
      await expect.poll(async () => Math.abs(await page.locator(`#${id}`).evaluate(el => el.getBoundingClientRect().top) - await page.locator('.site-header').evaluate(el => el.offsetHeight))).toBeLessThan(3);
      await page.screenshot({ path: `.impeccable/review/${name}-${id}.png` });
    }
    expect(await page.locator('.kids-photo img').evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
    await expect(page.locator('.event-template')).toHaveCount(3);
    await expect(page.locator('.event-template .blank-details')).toHaveCount(3);
    await expect(page.locator('.event-template h3, .event-template time, .event-template img')).toHaveCount(0);
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

test('direct section links, rail links, and browser history keep navigation synchronized', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#kyc');
  await expect(page.locator('.site-header [data-section="kyc"]')).toHaveAttribute('aria-current', 'location');
  await expect(page.locator('.section-rail [data-section="kyc"]')).toHaveAttribute('aria-current', 'location');
  await page.locator('.section-rail [data-section="kids"]').click();
  await expect(page).toHaveURL(/#kids$/);
  await expect(page.locator('.site-header [data-section="kids"]')).toHaveAttribute('aria-current', 'location');
  await page.goBack();
  await expect(page).toHaveURL(/#kyc$/);
  await expect(page.locator('.section-rail [data-section="kyc"]')).toHaveAttribute('aria-current', 'location');
  await page.goForward();
  await expect(page).toHaveURL(/#kids$/);
  await expect(page.locator('.site-header [data-section="kids"]')).toHaveAttribute('aria-current', 'location');
});
