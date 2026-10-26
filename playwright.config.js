const { defineConfig } = require('@playwright/test');
const path = require('node:path');
const fs = require('node:fs');
const localBrowser = process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'ms-playwright', 'chromium-1248', 'chrome-win64', 'chrome.exe');
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || (localBrowser && fs.existsSync(localBrowser) ? localBrowser : undefined);

module.exports = defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://127.0.0.1:4174',
    launchOptions: {
      executablePath,
    },
  },
  webServer: {
    command: 'npm run build && npm run preview -- --port 4174',
    url: 'http://127.0.0.1:4174',
    reuseExistingServer: false,
  },
});
