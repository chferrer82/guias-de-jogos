// Notação do controle de Nintendo 64: A e as quatro setas são os botões C.
export type Note = 'A' | '↑' | '↓' | '←' | '→';
export type Age = 'criança' | 'adulto';

export interface Song {
	id: string;
	name: string;
	nameEn: string;
	kind: 'normal' | 'teletransporte';
	notes: Note[];
	learnedFrom: string;
	where: string;
	age: Age;
	effect: string;
}

export const songs: Song[] = [
	{
		id: 'zeldas-lullaby',
		name: 'Canção de Ninar de Zelda',
		nameEn: "Zelda's Lullaby",
		kind: 'normal',
		notes: ['←', '↑', '→', '←', '↑', '→'],
		learnedFrom: 'Impa',
		where: 'Pátio do Castelo de Hyrule, depois de falar com Zelda',
		age: 'criança',
		effect: 'Ativa símbolos da Triforce, abre o caminho para o Domínio Zora e prova que você é mensageiro da família real.',
	},
	{
		id: 'eponas-song',
		name: 'Canção de Epona',
		nameEn: "Epona's Song",
		kind: 'normal',
		notes: ['↑', '←', '→', '↑', '←', '→'],
		learnedFrom: 'Malon',
		where: 'Rancho Lon Lon (fale com Malon no curral com a ocarina em mãos)',
		age: 'criança',
		effect: 'Chama Epona quando adulto e faz as vacas darem Leite Lon Lon.',
	},
	{
		id: 'sarias-song',
		name: 'Canção de Saria',
		nameEn: "Saria's Song",
		kind: 'normal',
		notes: ['↓', '→', '←', '↓', '→', '←'],
		learnedFrom: 'Saria',
		where: 'Prado Sagrado da Floresta (Sacred Forest Meadow)',
		age: 'criança',
		effect: 'Conversa com Saria à distância e anima Darunia, que dá o Bracelete Goron.',
	},
	{
		id: 'suns-song',
		name: 'Canção do Sol',
		nameEn: "Sun's Song",
		kind: 'normal',
		notes: ['→', '↓', '↑', '→', '↓', '↑'],
		learnedFrom: 'Inscrição na tumba real',
		where: 'Tumba da Família Real, Cemitério de Kakariko (abra o túmulo à noite)',
		age: 'criança',
		effect: 'Alterna entre dia e noite e paralisa ReDeads e Gibdos.',
	},
	{
		id: 'song-of-time',
		name: 'Canção do Tempo',
		nameEn: 'Song of Time',
		kind: 'normal',
		notes: ['→', 'A', '↓', '→', 'A', '↓'],
		learnedFrom: 'Zelda',
		where: 'Fosso do Castelo de Hyrule, ao pegar a Ocarina do Tempo',
		age: 'criança',
		effect: 'Abre a Porta do Tempo e faz aparecer ou sumir os Blocos do Tempo azuis.',
	},
	{
		id: 'song-of-storms',
		name: 'Canção das Tempestades',
		nameEn: 'Song of Storms',
		kind: 'normal',
		notes: ['A', '↓', '↑', 'A', '↓', '↑'],
		learnedFrom: 'Homem do moinho (Guru-Guru)',
		where: 'Moinho de Kakariko, quando adulto',
		age: 'adulto',
		effect: 'Faz chover, revela grutas escondidas e, tocada quando criança no moinho, seca o poço de Kakariko.',
	},
	{
		id: 'minuet-of-forest',
		name: 'Minueto da Floresta',
		nameEn: 'Minuet of Forest',
		kind: 'teletransporte',
		notes: ['A', '↑', '←', '→', '←', '→'],
		learnedFrom: 'Sheik',
		where: 'Prado Sagrado da Floresta',
		age: 'adulto',
		effect: 'Teleporta para o Prado Sagrado da Floresta, na entrada do Templo da Floresta.',
	},
	{
		id: 'bolero-of-fire',
		name: 'Bolero do Fogo',
		nameEn: 'Bolero of Fire',
		kind: 'teletransporte',
		notes: ['↓', 'A', '↓', 'A', '→', '↓', '→', '↓'],
		learnedFrom: 'Sheik',
		where: 'Entrada da Cratera da Montanha da Morte',
		age: 'adulto',
		effect: 'Teleporta para a Cratera da Montanha da Morte, perto do Templo do Fogo.',
	},
	{
		id: 'serenade-of-water',
		name: 'Serenata da Água',
		nameEn: 'Serenade of Water',
		kind: 'teletransporte',
		notes: ['A', '↓', '→', '→', '←'],
		learnedFrom: 'Sheik',
		where: 'Saída da Caverna de Gelo (Ice Cavern)',
		age: 'adulto',
		effect: 'Teleporta para o Lago Hylia, perto do Templo da Água.',
	},
	{
		id: 'nocturne-of-shadow',
		name: 'Noturno da Sombra',
		nameEn: 'Nocturne of Shadow',
		kind: 'teletransporte',
		notes: ['←', '→', '→', 'A', '←', '→', '↓'],
		learnedFrom: 'Sheik',
		where: 'Vila Kakariko, ao entrar depois de ter os medalhões da Floresta, do Fogo e da Água',
		age: 'adulto',
		effect: 'Teleporta para a entrada do Templo da Sombra, no Cemitério de Kakariko.',
	},
	{
		id: 'requiem-of-spirit',
		name: 'Réquiem do Espírito',
		nameEn: 'Requiem of Spirit',
		kind: 'teletransporte',
		notes: ['A', '↓', 'A', '→', '↓', 'A'],
		learnedFrom: 'Sheik',
		where: 'Colosso do Deserto, depois de atravessar o Deserto Assombrado',
		age: 'adulto',
		effect: 'Teleporta para o Colosso do Deserto, no Templo do Espírito. Funciona também quando criança.',
	},
	{
		id: 'prelude-of-light',
		name: 'Prelúdio da Luz',
		nameEn: 'Prelude of Light',
		kind: 'teletransporte',
		notes: ['↑', '→', '↑', '→', '←', '↑'],
		learnedFrom: 'Sheik',
		where: 'Templo do Tempo, depois de concluir o Templo da Floresta',
		age: 'adulto',
		effect: 'Teleporta para o Templo do Tempo.',
	},
];
