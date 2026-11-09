// O que dá para fazer em cada local, por idade. Versão original (N64) e 3DS.

export interface AgeSide {
	/** O que está liberado nessa idade. */
	open: string[];
	/** O que está bloqueado nessa idade, e por quê. */
	blocked: string[];
}

export interface Place {
	id: string;
	name: string;
	/** Nomes de região usados nas listas de Peças de Coração e Skulltulas que pertencem a este local. */
	regions: string[];
	child: AgeSide;
	adult: AgeSide;
	/** Eventos do jogo que mudam o local. */
	changes: string[];
}

export const places: Place[] = [
	{
		id: 'floresta-kokiri',
		name: 'Floresta Kokiri',
		regions: ['Floresta Kokiri'],
		child: {
			open: [
				'Espada Kokiri, no baú do labirinto de pedras rolantes.',
				'Loja Kokiri: Escudo Deku por 40 rupias.',
				'Interior da Árvore Deku, a primeira masmorra.',
				'Skulltula atrás da casa dos Irmãos Sabe-Tudo (à noite) e na terra fofa (com insetos).',
			],
			blocked: ['Skulltula no alto da casa das gêmeas: precisa do Hookshot, que só o adulto usa.'],
		},
		adult: {
			open: ['A loja Kokiri continua aberta.', 'Skulltula no alto da casa das gêmeas, à noite, com o Hookshot.'],
			blocked: [
				'Interior da Árvore Deku: a Árvore Deku morreu e a masmorra não pode mais ser visitada.',
				'Até você vencer o Templo da Floresta, a vila fica cheia de monstros.',
			],
		},
		changes: ['Depois do Templo da Floresta, os monstros somem e o Broto Deku aparece no lugar da Árvore Deku.'],
	},
	{
		id: 'bosque-perdido',
		name: 'Bosque Perdido',
		regions: ['Bosque Perdido'],
		child: {
			open: [
				'Peça de Coração do Skull Kid (Canção de Saria) e do jogo de memória dos Skull Kids.',
				'Alvo do estilingue: bolsa de sementes maior.',
				'Teatro Deku: máscaras dão melhorias de Galho e de Noz Deku.',
				'Atalhos para a Cidade Goron e para o Rio Zora (com a Escama de Prata).',
				'Plantar Feijões Mágicos para usar quando adulto.',
			],
			blocked: ['Subir nos pés de feijão: eles só crescem quando você volta adulto.'],
		},
		adult: {
			open: [
				'Missão da Espada Biggoron: Cojiro e a Poção Estranha são entregues aqui.',
				'Pé de feijão da clareira do Teatro Deku leva a uma Skulltula, à noite.',
				'Mido bloqueia o caminho do Prado Sagrado até você tocar a Canção de Saria.',
			],
			blocked: [
				'Os Skull Kids ficam hostis: a Peça do Skull Kid e o jogo de memória são só para criança.',
				'Alvo do estilingue e Teatro Deku: só criança.',
			],
		},
		changes: [],
	},
	{
		id: 'prado-sagrado',
		name: 'Prado Sagrado da Floresta',
		regions: ['Prado Sagrado da Floresta'],
		child: {
			open: ['Saria ensina a Canção de Saria, depois que você conhece Zelda.', 'Labirinto com Wolfos e Deku comerciantes.'],
			blocked: ['Templo da Floresta: a entrada só é alcançada com o Hookshot, quando adulto.'],
		},
		adult: {
			open: [
				'Sheik ensina o Minueto da Floresta.',
				'Templo da Floresta (use o Hookshot no galho acima da entrada).',
				'Skulltula na parede alta do labirinto, à noite, com o Hookshot.',
			],
			blocked: ['Saria não está mais aqui.'],
		},
		changes: [],
	},
	{
		id: 'campo-de-hyrule',
		name: 'Campo de Hyrule',
		regions: ['Campo de Hyrule'],
		child: {
			open: [
				'Grutas escondidas: abra com bombas. Numa delas, um Deku vende uma Peça de Coração por 10 rupias.',
				'A coruja Kaepora Gaebora dá dicas do caminho.',
			],
			blocked: [
				'À noite, a ponte levadiça da Cidade do Castelo sobe e Stalchildren aparecem. Espere o dia ou toque a Canção do Sol.',
				'Andar a cavalo: Epona só é sua quando adulto.',
			],
		},
		adult: {
			open: [
				'Epona para atravessar o campo rápido.',
				'Caça aos Grandes Poes: acerte-os com flechas montado em Epona e venda no posto da guarda da Cidade do Castelo. Com 10, você ganha uma garrafa.',
				'Gruta inundada com Peça de Coração: precisa das Botas de Ferro.',
			],
			blocked: [],
		},
		changes: [],
	},
	{
		id: 'cidade-do-castelo',
		name: 'Cidade do Castelo, Templo do Tempo e Castelo de Hyrule',
		regions: ['Mercado da Cidade do Castelo', 'Cidade do Castelo e Castelo de Hyrule'],
		child: {
			open: [
				'Mercado com lojas, Galeria de Tiro, Boliche de Bombchu e Jogo do Baú do Tesouro (à noite).',
				'Loja de Máscaras, depois de mostrar a Carta de Zelda ao guarda de Kakariko.',
				'Pátio do castelo: Zelda e Impa (Canção de Ninar de Zelda).',
				'Grande Fada do Fogo de Din, atrás de uma pedra que se explode perto do castelo.',
				'Templo do Tempo.',
			],
			blocked: ['À noite a ponte levadiça fica levantada até amanhecer.'],
		},
		adult: {
			open: [
				'Templo do Tempo: devolva a Espada Mestra para voltar a ser criança.',
				'Posto da guarda: o colecionador compra os Grandes Poes.',
				'Castelo de Ganon, no fim do jogo, e a Grande Fada da Defesa Dobrada ao lado dele.',
			],
			blocked: [
				'O mercado está em ruínas e cheio de ReDeads: todas as lojas e os minijogos fecharam.',
				'O Castelo de Hyrule e a Fada do Fogo de Din deram lugar ao Castelo de Ganon.',
			],
		},
		changes: [],
	},
	{
		id: 'rancho-lon-lon',
		name: 'Rancho Lon Lon',
		regions: ['Rancho Lon Lon'],
		child: {
			open: [
				'Malon ensina a Canção de Epona.',
				'Jogo das galinhas de Talon: ganhe uma garrafa com Leite Lon Lon.',
				'Peça de Coração na passagem estreita de um dos galpões.',
			],
			blocked: ['Montar Epona e correr contra Ingo: só quando adulto.'],
		},
		adult: {
			open: [
				'Corrida contra Ingo: vença duas vezes para ficar com Epona.',
				'Depois de libertar o rancho, Malon propõe uma pista de obstáculos.',
			],
			blocked: ['O jogo das galinhas acabou: Talon saiu do rancho e foi para Kakariko.'],
		},
		changes: ['Depois que você vence Ingo e foge com Epona, Talon volta e o rancho é de Malon de novo.'],
	},
	{
		id: 'kakariko',
		name: 'Vila Kakariko',
		regions: ['Vila Kakariko', 'Moinho de Kakariko', 'Casa da Skulltula (Kakariko)'],
		child: {
			open: [
				'Anju e as galinhas: devolva todas e ganhe uma garrafa.',
				'Casa da Skulltula: entregue fichas para ganhar prêmios.',
				'Moinho: toque a Canção das Tempestades (aprendida quando adulto) para secar o poço e entrar no Fundo do Poço.',
				'Peça de Coração do homem no telhado, subindo pela torre de vigia.',
			],
			blocked: [
				'Galeria de Tiro de Kakariko: só adulto, com o arco.',
				'A Canção das Tempestades só é ensinada ao adulto.',
			],
		},
		adult: {
			open: [
				'Galeria de Tiro: ganhe uma aljava maior.',
				'Moinho: o homem do moinho ensina a Canção das Tempestades.',
				'Anju dá o Ovo de Bolso, que começa a missão da Espada Biggoron.',
				'Sheik ensina o Noturno da Sombra.',
			],
			blocked: ['Fundo do Poço: só dá para entrar quando criança, depois de secar o poço.'],
		},
		changes: [
			'Ao chegar adulto com os medalhões da Floresta, do Fogo e da Água, a vila pega fogo, algo escapa do poço e Sheik ensina o Noturno da Sombra.',
		],
	},
	{
		id: 'cemiterio',
		name: 'Cemitério de Kakariko',
		regions: ['Cemitério de Kakariko'],
		child: {
			open: [
				'Passeio de escavação de Dampé, à noite: pode sair uma Peça de Coração.',
				'Tumba da Família Real: aprenda a Canção do Sol.',
			],
			blocked: ['Templo da Sombra e corrida do fantasma de Dampé: só adulto.'],
		},
		adult: {
			open: [
				'Corrida do fantasma de Dampé: a primeira vitória dá o Hookshot, e em menos de 1 minuto você ganha uma Peça de Coração.',
				'Templo da Sombra: acenda as tochas da entrada com o Fogo de Din.',
			],
			blocked: ['Dampé já morreu: o passeio de escavação acabou.'],
		},
		changes: [],
	},
	{
		id: 'trilha-montanha',
		name: 'Trilha da Montanha da Morte',
		regions: ['Trilha da Montanha da Morte'],
		child: {
			open: [
				'Mostre a Carta de Zelda ao guarda do portão em Kakariko para subir.',
				'Caverna dos Dodongos, aberta com uma Flor-Bomba depois de ganhar o Bracelete Goron.',
				'Grande Fada no topo da montanha: medidor de magia.',
				'A coruja no topo leva você de volta a Kakariko.',
			],
			blocked: ['Pedras vermelhas com Skulltulas: só o Martelo Megaton quebra.'],
		},
		adult: {
			open: ['Biggoron, no topo: fim da missão da Espada Biggoron.', 'Pedras vermelhas com Skulltulas, à noite, com o Martelo Megaton.'],
			blocked: [],
		},
		changes: [],
	},
	{
		id: 'cidade-goron',
		name: 'Cidade Goron',
		regions: ['Cidade Goron'],
		child: {
			open: [
				'Darunia: toque a Canção de Saria e ganhe o Bracelete Goron.',
				'Vaso giratório do andar de baixo: Peça de Coração.',
				'Túnel do segundo andar: atalho para o Bosque Perdido (exploda as pedras).',
			],
			blocked: ['Túnica Goron: só é dada ao adulto.'],
		},
		adult: {
			open: ['Faça o Link Goron parar (jogue uma bomba no caminho dele) e ganhe a Túnica Goron.'],
			blocked: ['A cidade fica quase vazia: os Gorons foram presos no Templo do Fogo.'],
		},
		changes: ['Depois do Templo do Fogo, os Gorons voltam para a cidade.'],
	},
	{
		id: 'cratera',
		name: 'Cratera da Montanha da Morte',
		regions: ['Cratera da Montanha da Morte'],
		child: {
			open: [
				'Só a parte de cima, com um cronômetro de calor: Peça de Coração no buraco da parede e Skulltula no caixote.',
				'Terra fofa perto do teletransporte, chegando com o Bolero do Fogo.',
			],
			blocked: ['Templo do Fogo: precisa da Túnica Goron, que só o adulto ganha.'],
		},
		adult: {
			open: [
				'Sheik ensina o Bolero do Fogo.',
				'Templo do Fogo, com a Túnica Goron.',
				'Grande Fada (abra com o Martelo Megaton): medidor de magia maior.',
				'Peça de Coração no pilar alto, subindo pelo pé de feijão.',
			],
			blocked: [],
		},
		changes: [],
	},
	{
		id: 'rio-zora',
		name: 'Rio Zora',
		regions: ['Rio Zora'],
		child: {
			open: [
				'Sapos no tronco: toque canções para ganhar rupias e duas Peças de Coração.',
				'Vendedor de Feijão Mágico, na entrada do rio.',
				'Canção de Ninar de Zelda diante da cachoeira abre o caminho para o Domínio Zora.',
				'Duas Peças de Coração no alto, planando com uma galinha.',
			],
			blocked: [],
		},
		adult: {
			open: ['Skulltulas noturnas nas paredes altas, com Hookshot e Longshot.'],
			blocked: ['Os sapos não aparecem mais.'],
		},
		changes: [],
	},
	{
		id: 'dominio-zora',
		name: 'Domínio Zora',
		regions: ['Domínio Zora'],
		child: {
			open: [
				'Rei Zora: mostre a Carta de Ruto para chegar a Jabu-Jabu.',
				'Jogo de mergulho: ganhe a Escama de Prata.',
				'Tochas: acenda todas para abrir o baú com Peça de Coração.',
			],
			blocked: [],
		},
		adult: {
			open: ['Descongele o Rei Zora com o Fogo Azul e ganhe a Túnica Zora.', 'Skulltula no alto da cachoeira congelada.'],
			blocked: ['O domínio está congelado e vazio: o jogo de mergulho e as tochas não estão mais disponíveis.'],
		},
		changes: [],
	},
	{
		id: 'fonte-zora',
		name: 'Fonte Zora',
		regions: ['Fonte Zora'],
		child: {
			open: [
				'Lorde Jabu-Jabu: dê um peixe para entrar na masmorra.',
				'Grande Fada do Vento de Farore, atrás de uma parede que se explode.',
			],
			blocked: ['Caverna de Gelo: só aparece quando a fonte congela, no futuro.'],
		},
		adult: {
			open: [
				'Caverna de Gelo: Botas de Ferro, Fogo Azul e a Serenata da Água.',
				'Peças de Coração sobre o gelo e no fundo da fonte (Botas de Ferro).',
			],
			blocked: ['Jabu-Jabu sumiu: a masmorra dele é só para criança.'],
		},
		changes: [],
	},
	{
		id: 'lago-hylia',
		name: 'Lago Hylia',
		regions: ['Lago Hylia', 'Laboratório do Lago Hylia'],
		child: {
			open: [
				'Lago de pesca: peixe de 10 libras dá uma Peça de Coração.',
				'Carta de Ruto, numa garrafa na água.',
				'Espantalho: invente a Canção do Espantalho.',
			],
			blocked: ['Templo da Água e Flechas de Fogo: só adulto.'],
		},
		adult: {
			open: [
				'Templo da Água, descendo com as Botas de Ferro.',
				'Depois do Templo da Água: atire uma flecha no sol nascente da ilha para ganhar as Flechas de Fogo.',
				'Escama Dourada no lago de pesca e Peça de Coração no tanque do laboratório.',
			],
			blocked: ['Até vencer o Templo da Água, o lago fica quase seco.'],
		},
		changes: ['Depois do Templo da Água, o lago volta a encher.'],
	},
	{
		id: 'vale-gerudo',
		name: 'Vale Gerudo',
		regions: ['Vale Gerudo'],
		child: {
			open: ['Peças de Coração no caixote do penhasco e atrás da cachoeira, planando com uma galinha.'],
			blocked: ['A fortaleza não deixa Link criança passar.'],
		},
		adult: {
			open: [
				'Atravesse a ponte quebrada com o Longshot ou saltando com Epona.',
				'Barraca dos carpinteiros: entregue o Serrote do Caçador na missão Biggoron.',
			],
			blocked: [],
		},
		changes: ['Depois que você liberta os carpinteiros, eles consertam a ponte.'],
	},
	{
		id: 'fortaleza-gerudo',
		name: 'Fortaleza Gerudo',
		regions: ['Fortaleza Gerudo'],
		child: { open: [], blocked: ['Toda a fortaleza: Link criança não consegue entrar.'] },
		adult: {
			open: [
				'Liberte os quatro carpinteiros sem ser visto e ganhe o Cartão de Membro Gerudo.',
				'Campo de Treinamento Gerudo: Flechas de Gelo.',
				'Arco e flecha a cavalo: 1.000 pontos dão uma Peça de Coração.',
			],
			blocked: ['Sem o Cartão de Membro, as guardas prendem você se virem.'],
		},
		changes: [],
	},
	{
		id: 'deserto-assombrado',
		name: 'Deserto Assombrado',
		regions: ['Deserto Assombrado'],
		child: { open: [], blocked: ['Criança só chega ao outro lado do deserto pelo Réquiem do Espírito.'] },
		adult: {
			open: ['Abra o portão com o Cartão de Membro Gerudo e siga o fantasma guia com a Lente da Verdade.'],
			blocked: [],
		},
		changes: [],
	},
	{
		id: 'colosso',
		name: 'Colosso do Deserto',
		regions: ['Colosso do Deserto'],
		child: {
			open: [
				'Chegue com o Réquiem do Espírito.',
				'Parte infantil do Templo do Espírito: Manoplas de Prata.',
				'Grande Fada do Amor de Nayru, atrás de uma parede que se explode.',
			],
			blocked: [],
		},
		adult: {
			open: ['Sheik ensina o Réquiem do Espírito.', 'Parte adulta do Templo do Espírito.', 'Peça de Coração no arco de pedra, pelo pé de feijão.'],
			blocked: [],
		},
		changes: [],
	},
];
