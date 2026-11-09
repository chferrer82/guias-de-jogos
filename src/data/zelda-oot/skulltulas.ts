// Locais da versão original (N64) e do 3DS, cruzados entre duas listas independentes.
import type { HeartAge } from './collectibles';

export interface GoldSkulltula {
	id: number;
	region: string;
	kind: 'mundo' | 'masmorra';
	age: HeartAge;
	night: boolean;
	needs: string[];
	where: string;
}

type Entry = [age: HeartAge, night: boolean, needs: string[], where: string];

const area = (region: string, kind: GoldSkulltula['kind'], entries: Entry[]) => ({ region, kind, entries });

const areas = [
	area('Floresta Kokiri', 'mundo', [
		['criança', true, [], 'Na parede de trás da casa dos Irmãos Sabe-Tudo.'],
		['criança', false, ['Insetos'], 'Solte insetos na terra fofa ao lado da loja Kokiri.'],
		['adulto', true, ['Hookshot'], 'No alto da parede de trás da casa das gêmeas.'],
	]),
	area('Bosque Perdido', 'mundo', [
		['criança', false, ['Insetos'], 'Solte insetos na terra fofa da área depois do Skull Kid, a caminho da saída para o Campo de Hyrule.'],
		['criança', false, ['Insetos'], 'Solte insetos na terra fofa da clareira dos dois Deku comerciantes.'],
		['adulto', true, ['Feijão Mágico'], 'Plante o feijão na terra fofa da clareira dos Deku quando criança. Adulto, suba no pé de feijão até a saliência alta.'],
	]),
	area('Prado Sagrado da Floresta', 'mundo', [
		['adulto', true, ['Hookshot'], 'Na parede alta acima do labirinto, perto da escada que leva ao templo.'],
	]),
	area('Campo de Hyrule', 'mundo', [
		['ambas', false, ['Bombas'], 'Abra com bomba a gruta escondida perto de uma árvore a leste da entrada da Cidade do Castelo. A Skulltula fica atrás de uma teia.'],
		['ambas', false, ['Bombas', 'Fogo'], 'Abra a gruta no círculo de pedras perto do caminho do Vale Gerudo. Queime a teia para chegar à Skulltula.'],
	]),
	area('Cidade do Castelo e Castelo de Hyrule', 'mundo', [
		['criança', false, [], 'Dentro de um caixote nos fundos da guarita da entrada do Mercado.'],
		['criança', false, [], 'Na árvore do começo do caminho para o castelo. Dê um rolamento na árvore.'],
		['criança', false, ['Canção das Tempestades'], 'Toque a Canção das Tempestades ao lado da árvore perto do fosso para abrir uma gruta.'],
		['adulto', false, ['Hookshot'], 'Atrás do arco de pedra em ruínas, na beira da lava em frente ao Castelo de Ganon.'],
	]),
	area('Rancho Lon Lon', 'mundo', [
		['criança', false, [], 'Na árvore perto da entrada do rancho. Dê um rolamento na árvore.'],
		['criança', true, [], 'Atrás do pequeno abrigo junto ao curral dos cavalos.'],
		['criança', true, ['Bumerangue'], 'Na parede da casa de Talon e Malon, perto da janela de cima.'],
		['criança', true, ['Bumerangue'], 'Na parede externa alta, perto do silo, atrás do curral.'],
	]),
	area('Vila Kakariko', 'mundo', [
		['criança', true, [], 'Na árvore perto da entrada da vila. Dê um rolamento na árvore.'],
		['criança', true, [], 'Na parede da Casa da Skulltula, embaixo da janela.'],
		['criança', true, [], 'Na pilha de tijolos da obra no centro da vila.'],
		['criança', true, ['Estilingue'], 'Na escada da torre de vigia. Acerte com o estilingue e pegue a ficha ao subir.'],
		['criança', true, [], 'Na parede de trás da casa mais perto do portão da Montanha da Morte.'],
		['adulto', true, ['Hookshot'], 'No alto, junto ao telhado da casa de Impa.'],
	]),
	area('Cemitério de Kakariko', 'mundo', [
		['criança', false, ['Insetos'], 'Solte insetos na terra fofa do cemitério.'],
		['criança', true, ['Bumerangue'], 'Na parede alta do lado direito do cemitério.'],
	]),
	area('Trilha da Montanha da Morte', 'mundo', [
		['ambas', false, ['Bombas'], 'Atrás da parede rachada logo depois do portão de Kakariko.'],
		['criança', false, ['Insetos'], 'Solte insetos na terra fofa em frente à Caverna dos Dodongos.'],
		['adulto', true, ['Martelo Megaton'], 'Quebre a pedra vermelha na saliência acima da entrada da Caverna dos Dodongos.'],
		['adulto', true, ['Martelo Megaton'], 'Quebre a pedra vermelha no alto da trilha, na área onde caem pedras.'],
	]),
	area('Cidade Goron', 'mundo', [
		['criança', false, ['Bombas'], 'Dentro de um caixote no labirinto de pedras do andar de cima.'],
		['adulto', false, [], 'Atrás da plataforma suspensa no centro da cidade. Chegue pelas cordas do andar de cima.'],
	]),
	area('Cratera da Montanha da Morte', 'mundo', [
		['criança', false, [], 'Dentro de um caixote logo na entrada da cratera. Seja rápido por causa do calor.'],
		['criança', false, ['Bolero do Fogo', 'Insetos'], 'Solte insetos na terra fofa perto do ponto de teletransporte.'],
	]),
	area('Rio Zora', 'mundo', [
		['criança', false, [], 'Na árvore da entrada do rio. Dê um rolamento na árvore.'],
		['criança', true, [], 'Na escada perto da cachoeira.'],
		['adulto', true, ['Hookshot'], 'Na parede alta perto da área elevada com a gruta.'],
		['adulto', true, ['Longshot'], 'Na parede alta do cânion, perto da ponte para o Domínio Zora.'],
	]),
	area('Domínio Zora', 'mundo', [
		['adulto', true, ['Hookshot'], 'Na parede à esquerda do topo da cachoeira congelada.'],
	]),
	area('Fonte Zora', 'mundo', [
		['criança', false, [], 'Na árvore perto da parede que esconde a Fonte da Grande Fada. Dê um rolamento na árvore.'],
		['criança', true, ['Bumerangue'], 'Na parede de pedra acima do grande tronco caído.'],
		['adulto', true, ['Manoplas de Prata', 'Martelo Megaton', 'Lente da Verdade'], 'Levante a pedra prateada perto da Fonte da Grande Fada e desça pelo buraco escondido.'],
	]),
	area('Lago Hylia', 'mundo', [
		['criança', false, ['Insetos'], 'Solte insetos na terra fofa em frente ao Laboratório do Lago.'],
		['criança', true, ['Bumerangue'], 'Na parede de trás do Laboratório do Lago.'],
		['criança', true, [], 'Atrás de uma das colunas na ilhota pequena do lago.'],
		['adulto', false, ['Botas de Ferro', 'Hookshot'], 'Dentro do caixote no fundo do tanque do laboratório. Afunde com as Botas de Ferro.'],
		['adulto', true, ['Longshot'], 'No alto da árvore morta da ilha do Templo da Água.'],
	]),
	area('Vale Gerudo', 'mundo', [
		['criança', true, ['Bumerangue'], 'Na parede junto à queda d’água, perto da primeira ponte.'],
		['criança', false, ['Insetos'], 'Solte insetos na terra fofa da margem do rio, embaixo da segunda ponte. Desça planando com uma galinha.'],
		['adulto', true, ['Hookshot'], 'Atrás da barraca dos carpinteiros.'],
		['adulto', true, ['Hookshot'], 'Embaixo do arco de pedra perto da barraca.'],
	]),
	area('Fortaleza Gerudo', 'mundo', [
		['adulto', true, ['Hookshot'], 'Na parede de pedra alta acima da fortaleza. Chegue pelos telhados.'],
		['adulto', true, ['Longshot'], 'No alvo alto no fim do campo de arco e flecha a cavalo.'],
	]),
	area('Deserto Assombrado', 'mundo', [
		['adulto', false, ['Hookshot'], 'Dentro do abrigo de pedra no meio do deserto.'],
	]),
	area('Colosso do Deserto', 'mundo', [
		['criança', false, ['Réquiem do Espírito', 'Insetos'], 'Solte insetos na terra fofa perto da entrada do Templo do Espírito.'],
		['adulto', true, ['Longshot'], 'Na palmeira ao lado do oásis seco.'],
		['adulto', true, ['Feijão Mágico'], 'Numa grande rocha no caminho do pé de feijão plantado quando criança.'],
	]),
	area('Interior da Árvore Deku', 'masmorra', [
		['criança', false, [], 'Num nicho da sala da Bússola, no andar de cima.'],
		['criança', false, [], 'Nas trepadeiras do porão, depois de romper a teia do chão.'],
		['criança', false, [], 'Na grade da sala principal do porão, ao lado da água.'],
		['criança', false, ['Bombas'], 'Na salinha atrás de uma parede rachada, no fundo do porão.'],
	]),
	area('Caverna dos Dodongos', 'masmorra', [
		['criança', false, ['Bombas'], 'Atrás de uma parede que explode, no corredor dos Bebês Dodongo.'],
		['criança', false, [], 'Nas trepadeiras da sala da grande escada, depois de derrubá-la com uma bomba.'],
		['criança', false, ['Bombas'], 'Numa sala lateral atrás de uma parede explosiva, no caminho dos blocos empurráveis.'],
		['adulto', false, ['Longshot'], 'No nicho acima da grande escada.'],
		['adulto', false, ['Canção do Espantalho', 'Hookshot'], 'Numa saliência alta no corredor dos Bebês Dodongo.'],
	]),
	area('Barriga do Lorde Jabu-Jabu', 'masmorra', [
		['criança', false, [], 'Na parede de escalar da sala onde a água sobe.'],
		['criança', false, ['Bumerangue'], 'Na parede do porão, depois de cair pelo buraco com Ruto.'],
		['criança', false, [], 'Em outra parede da mesma sala do porão.'],
		['criança', false, [], 'Nas trepadeiras perto da parede de teia, no andar principal.'],
	]),
	area('Templo da Floresta', 'masmorra', [
		['adulto', false, [], 'Nas trepadeiras do primeiro pátio, na entrada do templo.'],
		['adulto', false, ['Hookshot'], 'Na parede perto da escada do saguão central.'],
		['adulto', false, ['Hookshot'], 'Numa saliência do pátio leste.'],
		['adulto', false, [], 'No fim da passarela sobre o pátio oeste.'],
		['adulto', false, [], 'Na sala giratória do porão.'],
	]),
	area('Templo do Fogo', 'masmorra', [
		['adulto', false, ['Martelo Megaton'], 'Na sala logo depois do totem que você quebra com o martelo, saindo da primeira sala.'],
		['adulto', false, ['Canção do Tempo'], 'Na sala com o Like Like, atrás dos blocos azuis do tempo.'],
		['adulto', false, ['Bombas'], 'Atrás de uma parede explosiva no labirinto das pedras rolantes.'],
		['adulto', false, ['Canção do Espantalho', 'Hookshot'], 'Numa sala ao lado do labirinto das pedras rolantes, alcançada com o espantalho.'],
		['adulto', false, [], 'Na grande sala circular do alto, a mesma das 200 rupias.'],
	]),
	area('Caverna de Gelo', 'masmorra', [
		['adulto', false, ['Hookshot'], 'Na parede alta da sala das lâminas giratórias e das rupias prateadas.'],
		['adulto', false, ['Fogo Azul'], 'Na sala da Bússola e da Peça de Coração.'],
		['adulto', false, ['Hookshot'], 'Na parede alta da sala do quebra-cabeça dos blocos de gelo.'],
	]),
	area('Templo da Água', 'masmorra', [
		['adulto', false, ['Bombas', 'Ataque giratório'], 'Atrás do piso rachado e da grade do primeiro andar.'],
		['adulto', false, ['Longshot'], 'No alto, por dentro da torre central.'],
		['adulto', false, ['Longshot'], 'Na parede norte da sala das plataformas que caem.'],
		['adulto', false, ['Botas de Ferro', 'Longshot'], 'Num canto do rio subterrâneo com redemoinhos.'],
		['adulto', false, ['Hookshot'], 'Na parede atrás das pedras rolantes, perto da cachoeira.'],
	]),
	area('Fundo do Poço', 'masmorra', [
		['criança', false, ['Chaves pequenas', 'Lente da Verdade'], 'Numa sala trancada ao lado da sala central.'],
		['criança', false, ['Chaves pequenas'], 'Na outra sala trancada ao lado da sala central.'],
		['criança', false, ['Chaves pequenas'], 'Na sala com o Like Like.'],
	]),
	area('Templo da Sombra', 'masmorra', [
		['adulto', false, ['Lente da Verdade'], 'Na sala da lâmina giratória invisível.'],
		['adulto', false, ['Lente da Verdade'], 'Numa cela na sala dos espinhos que caem do teto. Empurre o bloco para entrar.'],
		['adulto', false, [], 'Atrás do pote em forma de caveira gigante, na sala com uma caveira.'],
		['adulto', false, ['Canção do Espantalho', 'Longshot'], 'Numa plataforma lateral da sala onde você vê o barco pela primeira vez.'],
		['adulto', false, [], 'Na sala das três caveiras gigantes, depois do labirinto de paredes invisíveis.'],
	]),
	area('Templo do Espírito', 'masmorra', [
		['criança', false, ['Bumerangue'], 'Atrás da grade de metal de uma das primeiras salas.'],
		['criança', false, [], 'Na parede alta da sala da parede de tijolos de escalar.'],
		['criança', false, ['Bumerangue'], 'Acima da porta antes da luta contra o Iron Knuckle.'],
		['adulto', false, ['Canção do Tempo'], 'Na sala da pedra rolante, escondida atrás de blocos azuis do tempo.'],
		['adulto', false, ['Canção do Espantalho', 'Hookshot'], 'Numa saliência alta da sala da grande estátua.'],
	]),
];

let next = 1;
export const goldSkulltulas: GoldSkulltula[] = areas.flatMap(({ region, kind, entries }) =>
	entries.map(([age, night, needs, where]) => ({ id: next++, region, kind, age, night, needs, where })),
);
