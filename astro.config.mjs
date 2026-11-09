// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { satteri } from '@astrojs/markdown-satteri';
import itemLinks from './src/plugins/item-links.mjs';
import { items } from './src/data/zelda-oot/items.ts';

const REPO = 'https://github.com/chferrer82/guias-de-jogos';
const BASE = '/guias-de-jogos';

// Nome ou apelido de item -> id, para os links automáticos dos guias de Zelda.
const itemNames = Object.fromEntries(items.flatMap((it) => [it.name, ...(it.aliases ?? [])].map((n) => [n, it.id])));

// https://astro.build/config
export default defineConfig({
	site: 'https://chferrer82.github.io',
	base: BASE,
	markdown: {
		processor: satteri({
			hastPlugins: [
				itemLinks({
					names: itemNames,
					href: (id) => `${BASE}/zelda-ocarina-of-time/itens/#item-${id}`,
					include: (path) => path.includes('/zelda-ocarina-of-time/') && !path.endsWith('/itens.mdx'),
				}),
			],
		}),
	},
	integrations: [
		starlight({
			title: 'Guias de Jogos',
			description: 'Guias de jogos gratuitos, leves e feitos pela comunidade, em português.',
			defaultLocale: 'root',
			locales: { root: { label: 'Português', lang: 'pt-BR' } },
			social: [{ icon: 'github', label: 'GitHub', href: REPO }],
			editLink: { baseUrl: `${REPO}/edit/main/` },
			lastUpdated: true,
			customCss: ['./src/styles/custom.css'],
			components: { Footer: './src/components/Footer.astro' },
			sidebar: [
				{ label: 'Início', link: '/' },
				{
					label: 'Zelda: Ocarina of Time',
					items: [
						{ label: 'Visão geral', slug: 'zelda-ocarina-of-time' },
						{ label: 'Primeiros passos', slug: 'zelda-ocarina-of-time/primeiros-passos' },
						{ label: 'Detonado: Link criança', slug: 'zelda-ocarina-of-time/detonado-crianca' },
						{ label: 'Detonado: Link adulto', slug: 'zelda-ocarina-of-time/detonado-adulto' },
						{ label: 'Guia por local', slug: 'zelda-ocarina-of-time/guia-por-local' },
						{ label: 'Bosque Perdido: rotas', slug: 'zelda-ocarina-of-time/bosque-perdido' },
						{ label: 'Banco de itens', slug: 'zelda-ocarina-of-time/itens' },
						{ label: 'Masmorras e chefes', slug: 'zelda-ocarina-of-time/masmorras' },
						{ label: 'Canções da ocarina', slug: 'zelda-ocarina-of-time/cancoes' },
						{ label: 'Peças de Coração', slug: 'zelda-ocarina-of-time/pecas-de-coracao' },
						{ label: 'Skulltulas Douradas', slug: 'zelda-ocarina-of-time/skulltulas-douradas' },
						{ label: 'Espada Biggoron', slug: 'zelda-ocarina-of-time/espada-biggoron' },
					],
				},
				{ label: 'Como contribuir', slug: 'contribuir' },
			],
		}),
	],
});
