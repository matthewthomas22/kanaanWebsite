const base = require('../playwright.config.js');

module.exports = {
  ...base,
  testDir: './fixtures',
  testIgnore: [],
  use: { ...base.use, baseURL: 'http://127.0.0.1:4175' },
  webServer: {
    command:
      'npm run build -- --config tests/vite.devotions-fixture.config.mjs --outDir .scratch/renungan-harian/test-dist && npm run preview -- --port 4175 --outDir .scratch/renungan-harian/test-dist',
    url: 'http://127.0.0.1:4175',
    reuseExistingServer: false,
  },
};
