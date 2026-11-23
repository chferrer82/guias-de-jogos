import { test, expect } from '@playwright/test';

const base = '/guias-de-jogos/';
const codex = base + 'pathfinder/';

test('portal, catálogo, navegação e persistência no celular', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(base);
  const catalog = page.waitForResponse(response => response.url().endsWith('/pathfinder/data/catalog.json'));
  await page.getByRole('link', { name: /Pathfinder.*Commander/ }).first().click();
  expect((await catalog).ok()).toBe(true);
  await expect(page).toHaveURL(new RegExp(codex + '$'));
  await expect(page.getByRole('heading', { name: 'Próxima prioridade' })).toBeVisible();
  await page.getByLabel('Nome do comandante').fill('Ariadne');
  await page.getByRole('button', { name: 'Salvar comandante' }).click();
  await page.reload();
  await expect(page.getByLabel('Nome do comandante')).toHaveValue('Ariadne');
  for (const name of [/Walkthrough por ato/, /Estou perdido/i, /Minha party/i, /Builds/, /Configurações/]) {
    await page.getByRole('navigation').getByRole('button', { name }).click();
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  expect(errors).toEqual([]);
  await page.goto(base + 'zelda-ocarina-of-time/pecas-de-coracao/');
  await expect(page.getByRole('checkbox')).toHaveCount(36);
});

test('conteúdo acessível sem JavaScript', async ({ browser }) => {
  const page = await browser.newPage({ javaScriptEnabled: false });
  await page.goto(new URL(codex, process.env.CODEX_SITE_URL || 'http://127.0.0.1:4371').href);
  await expect(page.getByRole('link', { name: /Consultar catálogo/ })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Módulos' })).toBeHidden();
  await page.close();
});

test('erro de catálogo tem mensagem visível', async ({ page }) => {
  await page.route('**/data/catalog.json', route => route.fulfill({ status: 503 }));
  await page.goto(codex);
  await expect(page.getByRole('heading', { name: 'Catálogo indisponível' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Módulos' })).toBeHidden();
});

test('campanhas independentes, janela temporizada e backup validado', async ({ page }) => {
  await page.goto(codex);
  const nav = page.getByRole('navigation', { name: 'Módulos' });
  await nav.getByRole('button', { name: 'Meu Comandante' }).click();
  await page.getByLabel('Ato atual').selectOption('act1');
  await page.getByLabel('Localização atual').fill('Defender’s Heart');
  await page.getByRole('button', { name: 'Salvar comandante' }).click();
  await nav.getByRole('button', { name: 'Estou perdido' }).click();
  await expect(page.getByText('Confira no diário se o evento temporizado do ato já aconteceu.')).toBeVisible();
  await nav.getByRole('button', { name: 'Meu Comandante' }).click();
  await page.getByLabel('Ataque a Defender’s Heart').selectOption('before');
  await page.getByRole('button', { name: 'Salvar comandante' }).click();
  await nav.getByRole('button', { name: 'Estou perdido' }).click();
  await expect(page.getByRole('heading', { name: 'Verifique uma oportunidade temporária' })).toBeVisible();
  await expect(page.locator('main')).not.toContainText('Blackwing Library');
  await nav.getByRole('button', { name: 'Configurações' }).click();
  await page.getByLabel('Spoilers').selectOption('hints');
  await nav.getByRole('button', { name: 'Estou perdido' }).click();
  await page.getByText('Revelar detalhes').click();
  await expect(page.getByText('Blackwing Library', { exact: true })).toBeVisible();
  await nav.getByRole('button', { name: 'Walkthrough por ato' }).click();
  await page.getByLabel('Status de Verifique uma oportunidade temporária').selectOption('done');
  await nav.getByRole('button', { name: 'Minha Party' }).click();
  await page.getByRole('button', { name: 'Adicionar integrante' }).click();
  await page.getByLabel('Nome do integrante').fill('Sera');
  await page.getByLabel('Linha de frente').check();
  await page.getByRole('button', { name: 'Salvar integrante' }).click();
  await expect(page.getByText('Linha de frente · Sera')).toBeVisible();
  await nav.getByRole('button', { name: 'Configurações' }).click();
  const downloaded = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Exportar progresso' }).click();
  const backup = await (await downloaded).path();
  await page.getByLabel('Nome da nova campanha').fill('Segunda campanha');
  await page.getByRole('button', { name: 'Criar campanha' }).click();
  await page.reload();
  await expect(page.getByLabel('Ato atual')).toHaveValue('prologue');
  await nav.getByRole('button', { name: 'Configurações' }).click();
  const input = page.getByLabel('Importar campanhas de um backup JSON');
  await input.setInputFiles({ name: 'invalid.json', mimeType: 'application/json', buffer: Buffer.from('{}') });
  await expect(page.getByRole('status')).toContainText('Importação recusada');
  await input.setInputFiles(backup);
  await expect(page.getByRole('status')).toContainText('Backup importado');
  await expect(page.getByLabel('Campanha ativa').locator('option')).toHaveCount(3);
  await nav.getByRole('button', { name: 'Walkthrough por ato' }).click();
  await expect(page.getByLabel('Status de Verifique uma oportunidade temporária')).toHaveValue('done');
});
