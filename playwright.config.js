import { defineConfig } from '@playwright/test';

const deployed = process.env.CODEX_SITE_URL;
export default defineConfig({
  testDir: './tests/browser',
  use: {
    baseURL: deployed || 'http://127.0.0.1:4371',
    launchOptions: { executablePath: process.env.CHROMIUM_PATH || undefined },
  },
  webServer: deployed ? undefined : {
    reuseExistingServer: false,
    command: 'npm run preview -- --host 127.0.0.1 --port 4371 --ignore-lock',
    url: 'http://127.0.0.1:4371/guias-de-jogos/',
  },
});
