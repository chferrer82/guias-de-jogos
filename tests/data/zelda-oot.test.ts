import { describe, expect, it } from 'vitest';
import { songs } from '../../src/data/zelda-oot/songs';
import { dungeons } from '../../src/data/zelda-oot/dungeons';
import {
	BOSS_HEART_CONTAINERS,
	GOLD_SKULLTULA_TOTAL,
	STARTING_HEARTS,
	biggoronTrade,
	heartPieces,
	skulltulaRewards,
} from '../../src/data/zelda-oot/collectibles';
import { goldSkulltulas } from '../../src/data/zelda-oot/skulltulas';
import { lostWoodsRoutes } from '../../src/data/zelda-oot/lost-woods';
import { places } from '../../src/data/zelda-oot/places';
import { categoryLabels, findItem, items } from '../../src/data/zelda-oot/items';

const unique = <T>(list: T[]) => new Set(list).size === list.length;

describe('Canções', () => {
	it('tem 12 canções: 6 normais e 6 de teletransporte', () => {
		expect(songs).toHaveLength(12);
		expect(songs.filter((s) => s.kind === 'normal')).toHaveLength(6);
		expect(songs.filter((s) => s.kind === 'teletransporte')).toHaveLength(6);
	});

	it('não repete ids nem sequências de notas', () => {
		expect(unique(songs.map((s) => s.id))).toBe(true);
		expect(unique(songs.map((s) => s.notes.join('')))).toBe(true);
	});

	it('usa só os 5 botões da ocarina, com 5 a 8 notas', () => {
		for (const s of songs) {
			expect(s.notes.length, s.id).toBeGreaterThanOrEqual(5);
			expect(s.notes.length, s.id).toBeLessThanOrEqual(8);
			for (const n of s.notes) expect(['A', '↑', '↓', '←', '→']).toContain(n);
		}
	});

	// Gabarito independente dos dados, conferido em fonte externa (Wikibooks e Zelda Dungeon).
	it('as notas das 12 canções batem com o gabarito', () => {
		const byId = Object.fromEntries(songs.map((s) => [s.id, s.notes.join(' ')]));
		expect(byId).toEqual({
			'zeldas-lullaby': '← ↑ → ← ↑ →',
			'eponas-song': '↑ ← → ↑ ← →',
			'sarias-song': '↓ → ← ↓ → ←',
			'suns-song': '→ ↓ ↑ → ↓ ↑',
			'song-of-time': '→ A ↓ → A ↓',
			'song-of-storms': 'A ↓ ↑ A ↓ ↑',
			'minuet-of-forest': 'A ↑ ← → ← →',
			'bolero-of-fire': '↓ A ↓ A → ↓ → ↓',
			'serenade-of-water': 'A ↓ → → ←',
			'nocturne-of-shadow': '← → → A ← → ↓',
			'requiem-of-spirit': 'A ↓ A → ↓ A',
			'prelude-of-light': '↑ → ↑ → ← ↑',
		});
	});

	it('as canções de teletransporte são todas ensinadas por Sheik', () => {
		for (const s of songs.filter((s) => s.kind === 'teletransporte')) expect(s.learnedFrom).toBe('Sheik');
	});
});

describe('Masmorras', () => {
	const withBoss = dungeons.filter((d) => d.boss);

	it('tem ordem sem repetição de 1 até N', () => {
		const orders = dungeons.map((d) => d.order).sort((a, b) => a - b);
		expect(orders).toEqual(dungeons.map((_, i) => i + 1));
		expect(unique(dungeons.map((d) => d.id))).toBe(true);
	});

	it('tem 9 masmorras com chefe: 3 como criança e 6 como adulto', () => {
		expect(withBoss).toHaveLength(9);
		expect(withBoss.filter((d) => d.age === 'criança')).toHaveLength(3);
		expect(withBoss.filter((d) => d.age === 'adulto')).toHaveLength(6);
	});

	it('cada chefe tem dica, e chefes com Recipiente de Coração são 8', () => {
		for (const d of withBoss) expect(d.bossTip, d.id).toBeTruthy();
		const heartBosses = withBoss.filter((d) => d.id !== 'ganons-castle');
		expect(heartBosses).toHaveLength(BOSS_HEART_CONTAINERS);
	});

	it('cada chefe dá a recompensa certa', () => {
		const pairs = Object.fromEntries(dungeons.filter((d) => d.boss).map((d) => [d.boss, d.reward]));
		expect(pairs).toEqual({
			'Rainha Gohma': 'Esmeralda Kokiri',
			'Rei Dodongo': 'Rubi Goron',
			Barinade: 'Safira Zora',
			'Phantom Ganon': 'Medalhão da Floresta',
			Volvagia: 'Medalhão do Fogo',
			Morpha: 'Medalhão da Água',
			'Bongo Bongo': 'Medalhão da Sombra',
			Twinrova: 'Medalhão do Espírito',
			'Ganondorf e Ganon': null,
		});
	});

	it('dá 3 Pedras Espirituais e 5 medalhões nas masmorras', () => {
		const rewards = dungeons.map((d) => d.reward).filter(Boolean) as string[];
		expect(rewards.filter((r) => /Esmeralda|Rubi|Safira/.test(r))).toHaveLength(3);
		expect(rewards.filter((r) => r.startsWith('Medalhão'))).toHaveLength(5);
	});

	it('a Caverna de Gelo vem antes do Templo da Água e o Castelo de Ganon é o último', () => {
		const order = (id: string) => dungeons.find((d) => d.id === id)!.order;
		expect(order('ice-cavern')).toBeLessThan(order('water-temple'));
		expect(order('bottom-of-the-well')).toBeLessThan(order('shadow-temple'));
		expect(order('ganons-castle')).toBe(dungeons.length);
	});
});

describe('Peças de Coração', () => {
	it('tem 36 peças numeradas de 1 a 36, sem repetição', () => {
		expect(heartPieces).toHaveLength(36);
		expect(heartPieces.map((p) => p.id)).toEqual(Array.from({ length: 36 }, (_, i) => i + 1));
	});

	it('cada peça tem região e explicação de verdade', () => {
		for (const p of heartPieces) {
			expect(p.region.length, `#${p.id}`).toBeGreaterThan(3);
			expect(p.how.length, `#${p.id}`).toBeGreaterThan(30);
		}
	});

	it('somadas aos corações iniciais e dos chefes dão 20 corações', () => {
		expect(heartPieces.length % 4).toBe(0);
		expect(STARTING_HEARTS + BOSS_HEART_CONTAINERS + heartPieces.length / 4).toBe(20);
	});

	it('a peça das Skulltulas exige 50 fichas, como na tabela de recompensas', () => {
		const hp = heartPieces.find((p) => p.region.includes('Skulltula'))!;
		expect(hp.how).toContain('50');
		expect(skulltulaRewards.find((r) => r.tokens === 50)?.reward).toBe('Peça de Coração');
	});
});

describe('Skulltulas Douradas', () => {
	it('recompensas em ordem crescente, a última em 100 fichas', () => {
		const tokens = skulltulaRewards.map((r) => r.tokens);
		expect(tokens).toEqual([...tokens].sort((a, b) => a - b));
		expect(tokens.at(-1)).toBe(GOLD_SKULLTULA_TOTAL);
	});

	it('lista as 100, numeradas de 1 a 100: 56 no mundo e 44 nas masmorras', () => {
		expect(goldSkulltulas).toHaveLength(GOLD_SKULLTULA_TOTAL);
		expect(goldSkulltulas.map((s) => s.id)).toEqual(Array.from({ length: 100 }, (_, i) => i + 1));
		expect(goldSkulltulas.filter((s) => s.kind === 'mundo')).toHaveLength(56);
		expect(goldSkulltulas.filter((s) => s.kind === 'masmorra')).toHaveLength(44);
	});

	// Contagem por área em que as duas listas de referência concordam.
	it('tem a quantidade certa em cada área', () => {
		const counts: Record<string, number> = {};
		for (const s of goldSkulltulas) counts[s.region] = (counts[s.region] ?? 0) + 1;
		expect(counts).toEqual({
			'Floresta Kokiri': 3,
			'Bosque Perdido': 3,
			'Prado Sagrado da Floresta': 1,
			'Campo de Hyrule': 2,
			'Cidade do Castelo e Castelo de Hyrule': 4,
			'Rancho Lon Lon': 4,
			'Vila Kakariko': 6,
			'Cemitério de Kakariko': 2,
			'Trilha da Montanha da Morte': 4,
			'Cidade Goron': 2,
			'Cratera da Montanha da Morte': 2,
			'Rio Zora': 4,
			'Domínio Zora': 1,
			'Fonte Zora': 3,
			'Lago Hylia': 5,
			'Vale Gerudo': 4,
			'Fortaleza Gerudo': 2,
			'Deserto Assombrado': 1,
			'Colosso do Deserto': 3,
			'Interior da Árvore Deku': 4,
			'Caverna dos Dodongos': 5,
			'Barriga do Lorde Jabu-Jabu': 4,
			'Templo da Floresta': 5,
			'Templo do Fogo': 5,
			'Caverna de Gelo': 3,
			'Templo da Água': 5,
			'Fundo do Poço': 3,
			'Templo da Sombra': 5,
			'Templo do Espírito': 5,
		});
	});

	it('as masmorras da lista existem na tabela de masmorras', () => {
		const dungeonNames = new Set(dungeons.map((d) => d.name));
		for (const s of goldSkulltulas.filter((s) => s.kind === 'masmorra')) expect(dungeonNames, s.region).toContain(s.region);
	});

	it('cada uma tem explicação e só pede itens conhecidos', () => {
		const known = new Set([
			'Insetos', 'Hookshot', 'Longshot', 'Bombas', 'Bumerangue', 'Estilingue', 'Feijão Mágico', 'Fogo', 'Fogo Azul',
			'Martelo Megaton', 'Botas de Ferro', 'Manoplas de Prata', 'Lente da Verdade', 'Chaves pequenas', 'Ataque giratório',
			'Canção das Tempestades', 'Canção do Tempo', 'Canção do Espantalho', 'Bolero do Fogo', 'Réquiem do Espírito',
		]);
		for (const s of goldSkulltulas) {
			expect(s.where.length, `#${s.id}`).toBeGreaterThan(20);
			for (const n of s.needs) expect(known, `#${s.id}: ${n}`).toContain(n);
		}
	});

	it('itens de adulto não aparecem em Skulltulas só de criança', () => {
		const adultOnly = new Set(['Hookshot', 'Longshot', 'Martelo Megaton', 'Botas de Ferro', 'Fogo Azul']);
		for (const s of goldSkulltulas.filter((s) => s.age === 'criança')) {
			for (const n of s.needs) expect(adultOnly.has(n), `#${s.id}: ${n}`).toBe(false);
		}
	});
});

describe('Espada Biggoron', () => {
	it('tem 11 itens em sequência, começando no Ovo de Bolso e terminando no Recibo', () => {
		expect(biggoronTrade.map((t) => t.step)).toEqual(Array.from({ length: 11 }, (_, i) => i + 1));
		expect(biggoronTrade[0].item).toMatch(/Ovo de Bolso/);
		expect(biggoronTrade.at(-1)!.item).toMatch(/Recibo/);
	});

	it('marca os itens com tempo limite', () => {
		expect(biggoronTrade.filter((t) => t.timed).map((t) => t.step)).toEqual([4, 9, 10]);
	});
});

describe('Bosque Perdido', () => {
	const route = (id: string) => lostWoodsRoutes.find((r) => r.id === id)!.path;

	it('a rota do Prado Sagrado é direita, esquerda, direita, esquerda, reto, esquerda, direita', () => {
		expect(route('prado')).toEqual(['direita', 'esquerda', 'direita', 'esquerda', 'reto', 'esquerda', 'direita']);
	});

	// As fontes concordam que estes caminhos começam iguais à rota do Prado.
	it('Goron, Zora e Teatro Deku seguem o começo da rota do Prado', () => {
		const prado = route('prado');
		expect(route('goron')).toEqual(prado.slice(0, 2));
		expect(route('zora')).toEqual(prado.slice(0, 3));
		expect(route('teatro-deku')).toEqual([...prado.slice(0, 4), 'esquerda']);
	});

	it('cada rota tem id único, curvas válidas e explicação', () => {
		expect(unique(lostWoodsRoutes.map((r) => r.id))).toBe(true);
		for (const r of lostWoodsRoutes) {
			expect(r.path.length, r.id).toBeGreaterThan(0);
			for (const t of r.path) expect(['esquerda', 'direita', 'reto']).toContain(t);
			expect(r.what.length, r.id).toBeGreaterThan(40);
		}
	});
});

describe('Guia por local', () => {
	const dungeonNames = new Set(dungeons.map((d) => d.name));
	const placeOf = (region: string) => places.filter((p) => p.regions.includes(region));

	it('tem ids únicos e conteúdo nas duas idades', () => {
		expect(unique(places.map((p) => p.id))).toBe(true);
		for (const p of places) {
			for (const side of [p.child, p.adult]) {
				expect(side.open.length + side.blocked.length, p.id).toBeGreaterThan(0);
			}
		}
	});

	it('toda região de Peça de Coração do mundo aberto pertence a exatamente um local', () => {
		for (const hp of heartPieces.filter((p) => !dungeonNames.has(p.region))) {
			expect(placeOf(hp.region), `#${hp.id} ${hp.region}`).toHaveLength(1);
		}
	});

	it('toda Skulltula do mundo aberto pertence a exatamente um local', () => {
		for (const s of goldSkulltulas.filter((s) => s.kind === 'mundo')) {
			expect(placeOf(s.region), `#${s.id} ${s.region}`).toHaveLength(1);
		}
	});

	it('não cita regiões que não existem nas listas', () => {
		const known = new Set([...heartPieces.map((p) => p.region), ...goldSkulltulas.map((s) => s.region)]);
		for (const p of places) for (const r of p.regions) expect(known, `${p.id}: ${r}`).toContain(r);
	});

	it('somando os locais dá 56 Skulltulas e todas as Peças fora das masmorras', () => {
		const all = places.flatMap((p) => p.regions);
		expect(goldSkulltulas.filter((s) => all.includes(s.region))).toHaveLength(56);
		const outside = heartPieces.filter((p) => !dungeonNames.has(p.region));
		expect(heartPieces.filter((p) => all.includes(p.region))).toHaveLength(outside.length);
	});
});

describe('Banco de itens', () => {
	const names = items.flatMap((it) => [it.name, ...(it.aliases ?? [])]);

	it('ids e nomes são únicos, para os links não apontarem para o item errado', () => {
		expect(unique(items.map((it) => it.id))).toBe(true);
		expect(unique(names)).toBe(true);
	});

	it('ids servem como âncora de URL', () => {
		for (const it of items) expect(it.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
	});

	it('todo item tem categoria conhecida, descrição e como conseguir', () => {
		for (const it of items) {
			expect(Object.keys(categoryLabels), it.id).toContain(it.category);
			expect(it.description.length, it.id).toBeGreaterThan(10);
			expect(it.obtain.length, it.id).toBeGreaterThan(10);
		}
	});

	it('todas as categorias têm itens', () => {
		for (const c of Object.keys(categoryLabels)) expect(items.some((it) => it.category === c), c).toBe(true);
	});

	it('o item principal de cada masmorra está no banco (o Castelo de Ganon não tem)', () => {
		for (const d of dungeons.filter((d) => d.id !== 'ganons-castle')) {
			for (const part of d.item.split(' e ')) expect(findItem(part), `${d.id}: ${part}`).toBeDefined();
		}
	});

	it('cada passo da troca da Espada Biggoron está no banco, como item da troca do adulto', () => {
		for (const t of biggoronTrade) expect(findItem(t.item)?.category, t.item).toBe('troca-adulto');
	});

	it('os itens pedidos pelas Skulltulas e pelo Bosque Perdido estão no banco (canções à parte)', () => {
		// "Fogo" vale qualquer chama (Galho Deku aceso, Fogo de Din, Flechas de Fogo);
		// a Canção do Espantalho (criada pelo jogador) e o Ataque giratório não são itens.
		const notItems = new Set([...songs.map((s) => s.name), 'Fogo', 'Canção do Espantalho', 'Ataque giratório']);
		const needs = new Set([...goldSkulltulas.flatMap((s) => s.needs), ...lostWoodsRoutes.flatMap((r) => r.needs)]);
		for (const n of needs) if (!notItems.has(n)) expect(findItem(n), n).toBeDefined();
	});

	it('findItem ignora o nome em inglês entre parênteses', () => {
		expect(findItem('Bumerangue (Boomerang)')?.id).toBe('bumerangue');
		expect(findItem('Nada disso')).toBeUndefined();
	});
});
