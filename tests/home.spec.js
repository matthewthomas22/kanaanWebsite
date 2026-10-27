const { test, expect } = require('@playwright/test');
const fs = require('node:fs');

test('production website excludes project internals and original artwork', async ({
  request,
}) => {
  const home = await request.get('/');
  expect(home.status()).toBe(200);
  const homepage = await home.text();
  for (const path of [
    '/PRODUCT.md',
    '/.impeccable/config.json',
    '/package.json',
    '/src/App.vue',
    '/Foto%20Profil%20Kanaan%20Kids.af',
  ]) {
    const response = await request.get(path);
    // Vite preview may serve the homepage for unknown paths through its SPA fallback.
    if (response.ok()) expect(await response.text()).toBe(homepage);
    else expect(response.status()).toBe(404);
  }
  const output = fs.readdirSync('dist', { recursive: true });
  expect(output).toContain('index.html');
  expect(
    output.filter((file) =>
      /(^|[/\\])(src|tests|design-files|references|portraits|kanaan-kids-profiles)([/\\]|$)|\.(af|md|vue|lock)$|package\.json$/.test(
        file,
      ),
    ),
  ).toEqual([]);
});

test('homepage navigation, local assets, responsive chapters, and reduced motion', async ({
  page,
}) => {
  test.setTimeout(120000);
  fs.mkdirSync('.impeccable/review', { recursive: true });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  for (const [name, width, height] of [
    ['desktop', 1440, 900],
    ['mobile', 390, 844],
    ['small', 320, 740],
    ['tablet', 768, 1024],
    ['landscape', 844, 390],
    ['wide', 1920, 1080],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(() =>
        ['Cormorant', 'Inter'].every((family) =>
          [...document.fonts].some(
            (font) => font.family === family && font.status === 'loaded',
          ),
        ),
      ),
    ).toBe(true);
    await expect(page.locator('h1')).toHaveText('GKIm Kanaan');
    await expect(page.locator('header')).toBeInViewport();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    if (width < 768)
      await expect(
        page.locator('nav[aria-label="Pilih bagian halaman"]'),
      ).toBeHidden();
    else
      await expect(
        page.locator('nav[aria-label="Pilih bagian halaman"]'),
      ).toBeVisible();
    await page.screenshot({
      path: `.impeccable/review/${name}.png`,
      fullPage: true,
    });
    if (name === 'desktop') {
      await page.mouse.wheel(0, 650);
      await expect(
        page.locator('header [data-section="jadwal"]'),
      ).toHaveAttribute('aria-current', 'location');
      await expect(
        page.locator(
          'nav[aria-label="Pilih bagian halaman"] [data-section="jadwal"]',
        ),
      ).toHaveAttribute('aria-current', 'location');
    }
    for (const id of ['jadwal', 'kids', 'kyc', 'acara', 'kanaan']) {
      await page.locator(`header [data-section="${id}"]`).click();
      await expect
        .poll(
          async () =>
            page.evaluate(
              (id) => ({
                active: document
                  .querySelector(`header [data-section="${id}"]`)
                  .getAttribute('aria-current'),
                hash: location.hash,
                scroll: scrollY,
                top: document.getElementById(id).getBoundingClientRect().top,
              }),
              id,
            ),
          { message: `${name}: navigate to ${id}` },
        )
        .toMatchObject({ active: 'location' });
      await expect(
        page.locator(
          `nav[aria-label="Pilih bagian halaman"] [data-section="${id}"]`,
        ),
      ).toHaveAttribute('aria-current', 'location');
      await expect
        .poll(async () =>
          Math.abs(
            (await page
              .locator(`#${id}`)
              .evaluate((el) => el.getBoundingClientRect().top)) -
              (await page.locator('header').evaluate((el) => el.offsetHeight)),
          ),
        )
        .toBeLessThan(3);
      await page.screenshot({ path: `.impeccable/review/${name}-${id}.png` });
    }
    expect(
      await page
        .locator('#kids figure img')
        .evaluate((img) => img.complete && img.naturalWidth > 0),
    ).toBe(true);
    await expect(page.locator('#acara article')).toHaveCount(3);
    await expect(
      page.locator('#acara article > div[aria-hidden="true"]'),
    ).toHaveCount(3);
    await expect(
      page.locator(
        '#acara article h3, #acara article time, #acara article img',
      ),
    ).toHaveCount(0);
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe('auto');
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollSnapType,
    ),
  ).toBe('none');
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator('a[href="#main"]')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  expect(errors).toEqual([]);
});

for (const reducedMotion of ['reduce', 'no-preference']) {
  test(`direct section links, rail links, and browser history stay synchronized (${reducedMotion})`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion });
    await page.goto('/#kyc');
    await expect(page.locator('header [data-section="kyc"]')).toHaveAttribute(
      'aria-current',
      'location',
    );
    await expect(
      page.locator(
        'nav[aria-label="Pilih bagian halaman"] [data-section="kyc"]',
      ),
    ).toHaveAttribute('aria-current', 'location');
    await page
      .locator('nav[aria-label="Pilih bagian halaman"] [data-section="kids"]')
      .click();
    await expect(page).toHaveURL(/#kids$/);
    await expect(page.locator('header [data-section="kids"]')).toHaveAttribute(
      'aria-current',
      'location',
    );
    await page.goBack();
    await expect(page).toHaveURL(/#kyc$/);
    await expect(
      page.locator(
        'nav[aria-label="Pilih bagian halaman"] [data-section="kyc"]',
      ),
    ).toHaveAttribute('aria-current', 'location');
    await page.goForward();
    await expect(page).toHaveURL(/#kids$/);
    await expect(page.locator('header [data-section="kids"]')).toHaveAttribute(
      'aria-current',
      'location',
    );
  });
}

test('desktop momentum settles accurately and switching to reduced motion restores native scrolling', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  // ScrollSmoother intentionally settles initial layout before applying momentum.
  await page.waitForTimeout(600);
  await page.mouse.wheel(0, 500);
  // Native scroll leads the visible content briefly, then both positions agree.
  const lag = () =>
    page.evaluate(
      () =>
        scrollY -
        (document.querySelector('header').offsetHeight -
          document.querySelector('#kanaan').getBoundingClientRect().top),
    );
  await expect.poll(lag).toBeGreaterThan(5);
  await expect.poll(async () => Math.abs(await lag())).toBeLessThan(2);
  await expect(page.locator('header')).toBeInViewport();
  await expect(
    page.locator('nav[aria-label="Pilih bagian halaman"]'),
  ).toBeInViewport();

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect
    .poll(() =>
      page
        .locator('#smooth-content')
        .evaluate((el) => getComputedStyle(el).transform),
    )
    .toBe('none');
  await expect
    .poll(() =>
      page
        .locator('#smooth-wrapper')
        .evaluate((el) => getComputedStyle(el).position),
    )
    .toBe('static');
  await page.locator('header [data-section="kyc"]').click();
  await expect(
    page.locator('nav[aria-label="Pilih bagian halaman"] [data-section="kyc"]'),
  ).toHaveAttribute('aria-current', 'location');

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect
    .poll(() =>
      page
        .locator('#smooth-wrapper')
        .evaluate((el) => getComputedStyle(el).position),
    )
    .toBe('fixed');
  await page.locator('header [data-section="kids"]').click();
  await expect
    .poll(() =>
      page
        .locator('#kids')
        .evaluate((el) =>
          Math.abs(
            el.getBoundingClientRect().top -
              document.querySelector('header').offsetHeight,
          ),
        ),
    )
    .toBeLessThan(3);
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator('a[href="#main"]')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
});

test.describe('touch devices', () => {
  test.use({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
  });

  test('keep native scrolling and section navigation', async ({ page }) => {
    await page.goto('/');
    await expect
      .poll(() =>
        page
          .locator('#smooth-wrapper')
          .evaluate((el) => getComputedStyle(el).position),
      )
      .toBe('static');
    await page.locator('header [data-section="kids"]').tap();
    await expect(
      page.locator('nav[aria-label="Pilih bagian halaman"]'),
    ).toBeHidden();
    await expect(page.locator('header [data-section="kids"]')).toHaveAttribute(
      'aria-current',
      'location',
    );
    await expect(page.locator('header')).toBeInViewport();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
});
