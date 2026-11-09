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
