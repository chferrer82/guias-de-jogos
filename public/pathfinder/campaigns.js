export const STORAGE = 'commanders-codex-v2';
export const LEGACY = 'commanders-codex-v1';
export const STATUSES = {
  pending: 'Não iniciada', active: 'Em andamento', done: 'Concluída',
  failed: 'Falhou', unavailable: 'Indisponível', skipped: 'Ignorada deliberadamente',
};
export const SPOILERS = { none: 'Sem spoilers', hints: 'Dicas progressivas', full: 'Guia completo' };
export const DIFFICULTIES = ['Story', 'Casual', 'Normal', 'Daring', 'Core', 'Hard', 'Unfair', 'Personalizada'];
export const EVENTS = { unknown: 'Não conferido', before: 'Ainda não ocorreu', after: 'Já ocorreu' };

export function newCampaign(catalog, name = 'Minha campanha') {
  return {
    id: crypto.randomUUID(), name, chapter: catalog.chapters[0].id, difficulty: 'Core',
    mythic: catalog.paths[0], character: 'Comandante', level: 1,
    characterClass: '', archetype: '', location: '', objective: '', spoilers: 'none',
    defense: 'unknown', checkpoints: {}, party: [],
  };
}

export function newBook(campaign) {
  return { version: 2, activeId: campaign.id, campaigns: [campaign] };
}

const shortText = value => typeof value === 'string' && value.length <= 120;
const level = value => Number.isInteger(value) && value >= 1 && value <= 20;
const allowed = (options, value) => typeof value === 'string' && Object.hasOwn(options, value);
const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);

function validateCampaign(campaign, catalog) {
  if (!record(campaign)) throw Error('Campanha inválida.');
  const { id, name, character, level: rank, chapter, difficulty, mythic, characterClass,
    archetype, location, objective, spoilers, defense, checkpoints, party } = campaign;
  const ids = new Set(catalog.chapters.flatMap(act => act.checkpoints.map(point => point.id)));
  if (!/^[\w-]{1,80}$/.test(typeof id === 'string' ? id : '') ||
      ![name, character, characterClass, archetype, location, objective].every(shortText) ||
      !name.trim() || !level(rank) || !catalog.chapters.some(act => act.id === chapter) ||
      !DIFFICULTIES.includes(difficulty) || !catalog.paths.includes(mythic) ||
      !allowed(SPOILERS, spoilers) || !allowed(EVENTS, defense) ||
      !record(checkpoints) || !Object.entries(checkpoints).every(([key, value]) =>
        ids.has(key) && allowed(STATUSES, value)) ||
      !Array.isArray(party) || party.length > 6) throw Error('Dados de campanha incompatíveis.');

  const members = party.map(member => {
    if (!record(member) || !shortText(member.name) || !level(member.level) ||
        !Array.isArray(member.roles) || !member.roles.every(id => catalog.roles.some(role => role.id === id)) ||
        !shortText(member.characterClass ?? '')) throw Error('Integrante inválido.');
    return { name: member.name, level: member.level, roles: [...new Set(member.roles)],
      characterClass: member.characterClass ?? '' };
  });
  return { id, name, character, level: rank, chapter, difficulty, mythic, characterClass,
    archetype, location, objective, spoilers, defense, checkpoints, party: members };
}

export function parseBook(raw, catalog) {
  let book = JSON.parse(raw);
  if (book?.version === 1) {
    if (!Array.isArray(book.done) || !book.done.every(id => typeof id === 'string')) {
      throw Error('Checkpoints antigos inválidos.');
    }
    const { chapter, difficulty, mythic, character, level, party, done } = book;
    book = newBook({ ...newCampaign(catalog), chapter, difficulty, mythic, character, level, party,
      checkpoints: Object.fromEntries(done.map(id => [id, 'done'])) });
  }
  if (book?.version !== 2 || !Array.isArray(book.campaigns) || book.campaigns.length === 0) {
    throw Error('Formato de backup incompatível.');
  }
  const campaigns = book.campaigns.map(campaign => validateCampaign(campaign, catalog));
  if (new Set(campaigns.map(c => c.id)).size !== campaigns.length ||
      !campaigns.some(c => c.id === book.activeId)) throw Error('Identificadores de campanha inválidos.');
  return { version: 2, activeId: book.activeId, campaigns };
}

export function mergeBooks(book, incoming) {
  const ids = new Set(book.campaigns.map(campaign => campaign.id));
  const imported = incoming.campaigns.map(campaign => ({
    ...campaign, id: ids.has(campaign.id) ? crypto.randomUUID() : campaign.id,
  }));
  const activeIndex = incoming.campaigns.findIndex(campaign => campaign.id === incoming.activeId);
  return { ...book, activeId: imported[activeIndex].id, campaigns: [...book.campaigns, ...imported] };
}
