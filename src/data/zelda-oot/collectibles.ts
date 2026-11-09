// Localizações da versão original (N64) e do 3D (3DS). O remake de 2026 move algumas peças.
export type HeartAge = 'criança' | 'adulto' | 'ambas';

export interface HeartPiece {
	id: number;
	region: string;
	age: HeartAge;
	how: string;
}

export const heartPieces: HeartPiece[] = [
	{ id: 1, region: 'Mercado da Cidade do Castelo', age: 'criança', how: 'À noite, leve o cachorro branco que anda pelo mercado até a dona, numa casa do beco (Back Alley).' },
	{ id: 2, region: 'Mercado da Cidade do Castelo', age: 'criança', how: 'Vença o Jogo do Baú do Tesouro (aberto à noite). A Lente da Verdade mostra o baú certo.' },
	{ id: 3, region: 'Mercado da Cidade do Castelo', age: 'criança', how: 'Prêmio sorteado no Boliche de Bombchu. Continue jogando até sair a Peça.' },
	{ id: 4, region: 'Rancho Lon Lon', age: 'criança', how: 'Num dos galpões do rancho, engatinhe pela passagem estreita escondida atrás dos caixotes.' },
	{ id: 5, region: 'Vila Kakariko', age: 'ambas', how: 'Fale com o homem sentado no telhado. Criança: suba a torre de vigia e salte de lado para o telhado. Adulto: use o Hookshot.' },
	{ id: 6, region: 'Vila Kakariko', age: 'ambas', how: 'Fica na sala da vaca, na casa de Impa. Pule do telhado pela abertura acima do cercado das galinhas. A coruja do topo da Montanha da Morte pode deixar você nesse telhado.' },
	{ id: 7, region: 'Moinho de Kakariko', age: 'ambas', how: 'Fica numa saliência alta. Criança: pegue com o bumerangue de cima da plataforma giratória. Adulto: o túnel da corrida de Dampé termina dentro do moinho, ao lado dela.' },
	{ id: 8, region: 'Cemitério de Kakariko', age: 'criança', how: 'À noite, pague a Dampé pelo passeio de escavação. A Peça é um prêmio sorteado.' },
	{ id: 9, region: 'Cemitério de Kakariko', age: 'criança', how: 'Puxe um dos túmulos para revelar um buraco e toque a Canção do Sol diante da lápide lá dentro.' },
	{ id: 10, region: 'Cidade Goron', age: 'criança', how: 'No andar de baixo, acenda as tochas com um Galho Deku e jogue uma bomba no vaso giratório quando a face sorridente estiver virada para você.' },
	{ id: 11, region: 'Bosque Perdido', age: 'criança', how: 'Toque a Canção de Saria para o Skull Kid sentado no toco.' },
	{ id: 12, region: 'Bosque Perdido', age: 'criança', how: 'Repita as melodias dos dois Skull Kids no jogo de memória com a ocarina (três rodadas).' },
	{ id: 13, region: 'Trilha da Montanha da Morte', age: 'ambas', how: 'Acima da entrada da Caverna dos Dodongos. Dê um mortal para trás da saliência das Flores-Bomba ou suba com o Feijão Mágico.' },
	{ id: 14, region: 'Rio Zora', age: 'criança', how: 'No topo de um pilar. Plane carregando uma galinha (Cucco) ou pegue com o bumerangue.' },
	{ id: 15, region: 'Rio Zora', age: 'criança', how: 'No alto de um penhasco perto da cachoeira. Plane carregando uma galinha (Cucco) ou pegue com o bumerangue.' },
	{ id: 16, region: 'Domínio Zora', age: 'criança', how: 'Acenda todas as tochas com um Galho Deku antes que se apaguem. O baú aparece atrás da cachoeira.' },
	{ id: 17, region: 'Lago Hylia', age: 'criança', how: 'No lago de pesca, pegue um peixe de pelo menos 10 libras e mostre ao dono.' },
	{ id: 18, region: 'Campo de Hyrule', age: 'ambas', how: 'Exploda uma bomba no centro do cercado na entrada do Lago Hylia. Dentro da gruta, compre a Peça do Deku comerciante por 10 rupias.' },
	{ id: 19, region: 'Rio Zora', age: 'criança', how: 'Toque a Canção das Tempestades para os sapos sobre o tronco no rio.' },
	{ id: 20, region: 'Rio Zora', age: 'criança', how: 'Toque as canções normais para os sapos e depois vença o jogo de ritmo deles.' },
	{ id: 21, region: 'Cratera da Montanha da Morte', age: 'ambas', how: 'Num buraco na parede logo abaixo da entrada da cratera. Desça escalando a parede.' },
	{ id: 22, region: 'Vale Gerudo', age: 'ambas', how: 'Desça pela escada atrás da cachoeira, perto da ponte.' },
	{ id: 23, region: 'Vale Gerudo', age: 'ambas', how: 'Dentro de um caixote numa saliência do penhasco. Criança: plane com uma galinha. Adulto: use o Longshot.' },
	{ id: 24, region: 'Cemitério de Kakariko', age: 'adulto', how: 'Refaça a corrida do fantasma de Dampé e termine em menos de 1 minuto. A primeira vitória dá o Hookshot.' },
	{ id: 25, region: 'Cemitério de Kakariko', age: 'adulto', how: 'Num nicho alto no canto noroeste. Suba com o Feijão Mágico (plantado quando criança) ou use o Longshot.' },
	{ id: 26, region: 'Cratera da Montanha da Morte', age: 'adulto', how: 'No topo de um pilar alto, perto do ponto de teletransporte. Suba com o Feijão Mágico.' },
	{ id: 27, region: 'Fonte Zora', age: 'adulto', how: 'Salte pelas plataformas de gelo flutuantes até a Peça.' },
	{ id: 28, region: 'Caverna de Gelo', age: 'adulto', how: 'Na sala da Bússola, derreta o gelo vermelho com o Fogo Azul guardado numa garrafa.' },
	{ id: 29, region: 'Fonte Zora', age: 'adulto', how: 'No fundo da fonte. Afunde com as Botas de Ferro.' },
	{ id: 30, region: 'Lago Hylia', age: 'adulto', how: 'No telhado do Laboratório do Lago. Suba com o Feijão Mágico ou chame o espantalho e use o Hookshot.' },
	{ id: 31, region: 'Laboratório do Lago Hylia', age: 'adulto', how: 'Com a Escama Dourada, mergulhe até o fundo do tanque do laboratório sem as Botas de Ferro.' },
	{ id: 32, region: 'Campo de Hyrule', age: 'adulto', how: 'Exploda a gruta escondida perto de uma árvore a noroeste do Rancho Lon Lon e desça ao fundo da água com as Botas de Ferro.' },
	{ id: 33, region: 'Fortaleza Gerudo', age: 'adulto', how: 'Baú no telhado mais alto. Toque a Canção do Espantalho e use o Hookshot nele, ou use o Longshot.' },
	{ id: 34, region: 'Fortaleza Gerudo', age: 'adulto', how: 'Faça 1.000 pontos no Arco e Flecha a Cavalo, montado em Epona.' },
	{ id: 35, region: 'Colosso do Deserto', age: 'adulto', how: 'No alto do arco de pedra. Plante o Feijão Mágico quando criança e suba nele quando adulto.' },
	{ id: 36, region: 'Casa da Skulltula (Kakariko)', age: 'ambas', how: 'Entregue 50 fichas de Skulltula Dourada.' },
];

export interface SkulltulaReward {
	tokens: number;
	reward: string;
}

export const GOLD_SKULLTULA_TOTAL = 100;

export const skulltulaRewards: SkulltulaReward[] = [
	{ tokens: 10, reward: 'Carteira de Adulto (até 200 rupias)' },
	{ tokens: 20, reward: 'Pedra da Agonia (o controle vibra perto de segredos)' },
	{ tokens: 30, reward: 'Carteira do Gigante (até 500 rupias)' },
	{ tokens: 40, reward: '10 Bombchus' },
	{ tokens: 50, reward: 'Peça de Coração' },
	{ tokens: 100, reward: 'Rupia Enorme (200 rupias, pode ser recebida de novo)' },
];

export interface TradeStep {
	step: number;
	item: string;
	giveTo: string;
	timed: boolean;
}

/** Missão de troca do adulto, que termina na Espada Biggoron. */
export const biggoronTrade: TradeStep[] = [
	{ step: 1, item: 'Ovo de Bolso (Pocket Egg)', giveTo: 'Ganhe de Anju, a moça das galinhas de Kakariko. Espere o ovo chocar.', timed: false },
	{ step: 2, item: 'Cuco de Bolso (Pocket Cucco)', giveTo: 'Use para acordar Talon, que dorme numa casa de Kakariko, e mostre a Anju.', timed: false },
	{ step: 3, item: 'Cojiro', giveTo: 'Leve ao rapaz sentado no Bosque Perdido.', timed: false },
	{ step: 4, item: 'Cogumelo Estranho (Odd Mushroom)', giveTo: 'Leve à velha da loja de poções de Kakariko (porta dos fundos).', timed: true },
	{ step: 5, item: 'Poção Estranha (Odd Potion)', giveTo: 'Volte ao mesmo ponto do Bosque Perdido e entregue a Fado.', timed: false },
	{ step: 6, item: 'Serrote do Caçador (Poacher’s Saw)', giveTo: 'Entregue ao chefe dos carpinteiros na barraca do Vale Gerudo.', timed: false },
	{ step: 7, item: 'Espada Goron Quebrada (Broken Goron’s Sword)', giveTo: 'Leve a Biggoron, no topo da Montanha da Morte.', timed: false },
	{ step: 8, item: 'Receita (Prescription)', giveTo: 'Mostre ao Rei Zora, no Domínio Zora.', timed: false },
	{ step: 9, item: 'Sapo Olhudo (Eyeball Frog)', giveTo: 'Leve ao cientista do Laboratório do Lago Hylia.', timed: true },
	{ step: 10, item: 'Colírio Mais Fino do Mundo (World’s Finest Eye Drops)', giveTo: 'Leve a Biggoron antes que o tempo acabe.', timed: true },
	{ step: 11, item: 'Recibo (Claim Check)', giveTo: 'Volte a Biggoron depois de 3 dias no jogo (toque a Canção do Sol para passar o tempo).', timed: false },
];

export const STARTING_HEARTS = 3;
export const BOSS_HEART_CONTAINERS = 8;
