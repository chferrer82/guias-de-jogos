// Rotas do original (N64) e do 3DS. No Master Quest do 3DS o mapa é espelhado; o remake de 2026 muda as rotas.
import type { HeartAge } from './collectibles';

export type Turn = 'esquerda' | 'direita' | 'reto';

export interface LostWoodsRoute {
	id: string;
	destination: string;
	path: Turn[];
	age: HeartAge;
	needs: string[];
	what: string;
}

export const lostWoodsRoutes: LostWoodsRoute[] = [
	{
		id: 'skull-kid',
		destination: 'Skull Kid no toco',
		path: ['esquerda'],
		age: 'criança',
		needs: ['Canção de Saria'],
		what: 'Suba no toco em frente ao Skull Kid e toque a Canção de Saria: ele dá uma Peça de Coração. Quando adulto, os Skull Kids daqui atacam.',
	},
	{
		id: 'mirante',
		destination: 'Mirante da ponte',
		path: ['esquerda', 'esquerda'],
		age: 'criança',
		needs: [],
		what: 'Área alta com vista para a ponte da Floresta Kokiri. Tem um Deku comerciante que vende melhoria de Galho Deku (derrote-o antes) e terra fofa para soltar insetos (Skulltula).',
	},
	{
		id: 'alvo',
		destination: 'Alvo e Skull Kids músicos',
		path: ['direita'],
		age: 'criança',
		needs: ['Estilingue'],
		what: 'Acerte o centro do alvo 3 vezes seguidas com o estilingue para ganhar uma bolsa de sementes maior. Na parte de baixo, repita as melodias dos dois Skull Kids: na terceira rodada você ganha uma Peça de Coração.',
	},
	{
		id: 'goron',
		destination: 'Atalho para a Cidade Goron',
		path: ['direita', 'esquerda'],
		age: 'ambas',
		needs: [],
		what: 'Siga reto pelo túnel. O atalho só abre depois que você explode as pedras do outro lado, no túnel do segundo andar da Cidade Goron, com uma Flor-Bomba ou uma bomba.',
	},
	{
		id: 'zora',
		destination: 'Lago do atalho para o Rio Zora',
		path: ['direita', 'esquerda', 'direita'],
		age: 'ambas',
		needs: ['Escama de Prata'],
		what: 'Mergulhe no lago e passe pelo túnel submerso. Você sai no Rio Zora, perto da entrada do Domínio Zora.',
	},
	{
		id: 'teatro-deku',
		destination: 'Clareira do Teatro Deku',
		path: ['direita', 'esquerda', 'direita', 'esquerda', 'esquerda'],
		age: 'criança',
		needs: [],
		what: 'Tem dois Deku comerciantes, terra fofa e o buraco do Teatro Deku, marcado por borboletas. No teatro, a Máscara de Caveira e a Máscara da Verdade dão melhorias de Galho e de Noz Deku. Plante um Feijão Mágico aqui para pegar uma Skulltula quando adulto.',
	},
	{
		id: 'prado',
		destination: 'Prado Sagrado da Floresta',
		path: ['direita', 'esquerda', 'direita', 'esquerda', 'reto', 'esquerda', 'direita'],
		age: 'ambas',
		needs: [],
		what: 'Criança: Saria ensina a Canção de Saria (depois de você conhecer Zelda). Adulto: Mido bloqueia o caminho até você tocar a Canção de Saria, e Sheik ensina o Minueto da Floresta.',
	},
];
