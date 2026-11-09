// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const REPO = 'https://github.com/chferrer82/guias-de-jogos';

// https://astro.build/config
export default defineConfig({
	site: 'https://chferrer82.github.io',
	base: '/guias-de-jogos',
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
			sidebar: [
				{ label: 'Início', link: '/' },
				{
					label: 'Zelda: Ocarina of Time',
					items: [
						{ label: 'Visão geral', slug: 'zelda-ocarina-of-time' },
						{ label: 'Primeiros passos', slug: 'zelda-ocarina-of-time/primeiros-passos' },
						{ label: 'Detonado: Link criança', slug: 'zelda-ocarina-of-time/detonado-crianca' },
						{ label: 'Detonado: Link adulto', slug: 'zelda-ocarina-of-time/detonado-adulto' },
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
