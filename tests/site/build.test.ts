// Roda sobre o site gerado: execute `npm run test:site`, que faz o build antes.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, posix, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

const DIST = join(process.cwd(), 'dist');
const BASE = '/guias-de-jogos/';

const walk = (dir: string): string[] =>
	readdirSync(dir).flatMap((name) => {
		const full = join(dir, name);
		return statSync(full).isDirectory() ? walk(full) : [full];
	});

const files = existsSync(DIST) ? walk(DIST) : [];
const htmlPages = files.filter((f) => f.endsWith('.html') && !f.endsWith('404.html'));
const urlOf = (file: string) => BASE + relative(DIST, file).split('\\').join('/').replace(/index\.html$/, '');
const read = (url: string) => readFileSync(join(DIST, url.slice(BASE.length), 'index.html'), 'utf8');

const EXPECTED = [
	'',
	'contribuir/',
	'zelda-ocarina-of-time/',
	'zelda-ocarina-of-time/primeiros-passos/',
	'zelda-ocarina-of-time/guia-por-local/',
	'zelda-ocarina-of-time/bosque-perdido/',
	'zelda-ocarina-of-time/detonado-crianca/',
	'zelda-ocarina-of-time/detonado-adulto/',
	'zelda-ocarina-of-time/masmorras/',
	'zelda-ocarina-of-time/cancoes/',
	'zelda-ocarina-of-time/pecas-de-coracao/',
	'zelda-ocarina-of-time/skulltulas-douradas/',
	'zelda-ocarina-of-time/espada-biggoron/',
].map((p) => BASE + p);

describe('Site gerado', () => {
	it('o build existe', () => {
		expect(files.length, 'rode `npm run build` antes').toBeGreaterThan(0);
	});

	it('gera todas as páginas esperadas', () => {
		const urls = htmlPages.map(urlOf);
		for (const u of EXPECTED) expect(urls).toContain(u);
	});

	it('toda página está em pt-BR e tem título e descrição', () => {
		for (const f of htmlPages) {
			const html = readFileSync(f, 'utf8');
			expect(html, f).toContain('lang="pt-BR"');
			expect(html, f).toMatch(/<title>[^<]{5,}<\/title>/);
			expect(html, f).toMatch(/<meta name="description" content="[^"]{20,}"/);
		}
	});

	it('nenhum link interno está quebrado', () => {
		const broken: string[] = [];
		for (const f of htmlPages) {
			const pageUrl = urlOf(f);
			for (const [, href] of readFileSync(f, 'utf8').matchAll(/<a[^>]+href="([^"#?]+)/g)) {
				if (/^(https?:|mailto:|\/\/)/.test(href)) continue;
				const abs = href.startsWith('/') ? href : posix.join(posix.dirname(pageUrl + 'x'), href);
				if (!abs.startsWith(BASE)) {
					broken.push(`${pageUrl} -> ${href} (fora do base)`);
					continue;
				}
				const target = join(DIST, abs.slice(BASE.length));
				const ok = existsSync(join(target, 'index.html')) || (existsSync(target) && statSync(target).isFile());
				if (!ok) broken.push(`${pageUrl} -> ${href}`);
			}
		}
		expect(broken).toEqual([]);
	});

	it('mostra as 12 canções e as 36 caixas de Peças de Coração', () => {
		const songsHtml = read(BASE + 'zelda-ocarina-of-time/cancoes/');
		expect(songsHtml.match(/<tr id="/g)).toHaveLength(12);
		const hpHtml = read(BASE + 'zelda-ocarina-of-time/pecas-de-coracao/');
		expect(hpHtml.match(/<input type="checkbox"/g)).toHaveLength(36);
		const gsHtml = read(BASE + 'zelda-ocarina-of-time/skulltulas-douradas/');
		expect(gsHtml.match(/<input type="checkbox"/g)).toHaveLength(100);
	});

	it('mostra as 7 rotas do bosque e os 19 locais do guia', () => {
		const lw = read(BASE + 'zelda-ocarina-of-time/bosque-perdido/');
		expect(lw.match(/<li id="rota-/g)).toHaveLength(7);
		const guide = read(BASE + 'zelda-ocarina-of-time/guia-por-local/');
		expect(guide.match(/<div class="age[ "]/g)).toHaveLength(19 * 2);
	});

	it('continua leve: cada página HTML fica abaixo de 150 KB', () => {
		for (const f of htmlPages) expect(statSync(f).size, f).toBeLessThan(150 * 1024);
	});
});
