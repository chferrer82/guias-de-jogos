import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { validateCatalog } from '../../public/pathfinder/catalog.js';
import { newBook, newCampaign, mergeBooks, parseBook } from '../../public/pathfinder/campaigns.js';
import { guideCampaign, visiblePoint } from '../../public/pathfinder/guidance.js';


const catalog = JSON.parse(readFileSync(new URL('../../public/pathfinder/data/catalog.json', import.meta.url), 'utf8'));

describe('Pathfinder Commander Codex initial catalog', () => {
  it('defines versioned chapters with unique checkpoint IDs', () => {
    expect(catalog.schemaVersion).toMatch(/^\d+\.\d+\.\d+$/);
    expect(catalog.chapters).toHaveLength(7);
    const chapterIds = catalog.chapters.map(c => c.id);
    expect(new Set(chapterIds).size).toBe(chapterIds.length);
    const checkpoints = catalog.chapters.flatMap(c => c.checkpoints);
    expect(checkpoints.length).toBeGreaterThan(0);
    const ids = checkpoints.map(p => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const cp of checkpoints) {
      expect(['main', 'recommended', 'missable']).toContain(cp.priority);
      expect(cp.title.length).toBeGreaterThan(0);
      expect(cp.hint.length).toBeGreaterThan(0);
      expect(cp.reason.length).toBeGreaterThan(0);
    }
  });

  it('uses valid role references for the initial build catalog', () => {
    const roles = new Set(catalog.roles.map(r => r.id));
    expect(new Set(catalog.builds.map(b => b.id)).size).toBe(catalog.builds.length);
    for (const build of catalog.builds) {
      expect(build.tags.length).toBeGreaterThan(0);
      expect(build.tags.every(tag => roles.has(tag))).toBe(true);
      expect(build.status).toBe('referência para validar');
    }
  });

  it('has unique companion names and mythic paths', () => {
    expect(new Set(catalog.companions).size).toBe(catalog.companions.length);
    expect(new Set(catalog.paths).size).toBe(catalog.paths.length);
  });
});


it('converte o progresso v1 sem perder checkpoints nem integrantes', () => {
  const legacy = { version: 1, chapter: 'prologue', difficulty: 'Core', mythic: 'Angel',
    character: 'Joana', level: 3, done: ['p-1'], party: [{ name: 'Seelah', level: 3, roles: ['frontline'] }] };
  const book = parseBook(JSON.stringify(legacy), catalog);
  expect(book.version).toBe(2);
  expect(book.campaigns[0]).toMatchObject({ character: 'Joana', checkpoints: { 'p-1': 'done' }, party: legacy.party });
  expect(parseBook(JSON.stringify(book), catalog)).toEqual(book);
  const merged = mergeBooks(book, book);
  expect(merged.campaigns).toHaveLength(2);
  expect(merged.campaigns[0]).toEqual(book.campaigns[0]);
  expect(merged.activeId).not.toBe(book.activeId);
});

it('recusa referências, estados e níveis inválidos no backup', () => {
  for (const change of [{ checkpoints: { ficticio: 'done' } }, { checkpoints: { 'p-1': [] } },
    { level: 21 }, { party: [null] }, { spoilers: 'unknown' }]) {
    const book = newBook({ ...newCampaign(catalog), ...change });
    expect(() => parseBook(JSON.stringify(book), catalog)).toThrow();
  }
});

it('distingue dependências, oportunidade temporizada e status terminal', () => {
  const campaign = { ...newCampaign(catalog), location: 'Cavernas sob Kenabres' };
  expect(guideCampaign(catalog, campaign).next.id).toBe('p-1');
  expect(guideCampaign(catalog, campaign).blocked[0].reason).toBe('prerequisite');
  campaign.checkpoints['p-1'] = 'done';
  expect(guideCampaign(catalog, campaign).next.id).toBe('p-2');
  campaign.chapter = 'act1';
  const findLibrary = () => guideCampaign(catalog, campaign).blocked.find(({ point }) => point.id === 'a1-2');
  expect(findLibrary().reason).toBe('unknown-event');
  campaign.defense = 'after';
  expect(findLibrary().reason).toBe('closed-window');
  campaign.defense = 'before';
  expect(guideCampaign(catalog, campaign).next.id).toBe('a1-2');
  expect(visiblePoint(guideCampaign(catalog, campaign).next, 'none').title).not.toMatch(/Blackwing/);
  campaign.checkpoints['a1-2'] = 'skipped';
  expect(guideCampaign(catalog, campaign).next.id).not.toBe('a1-2');
});

it('requer referência para orientação e mantém dependências locais e acíclicas', () => {
  for (const chapter of catalog.chapters) {
    const seen = new Set();
    for (const point of chapter.checkpoints) {
      expect(point.generalTitle).toBeTruthy();
      if (point.guidance) {
        expect(point.source).toMatch(/^https:\/\//);
        expect(point.confidence).toBe('community-reference');
        for (const key of ['where', 'route', 'action', 'prepare']) expect(point.guidance[key]).toBeTruthy();
        for (const id of point.guidance.requires ?? []) expect(seen.has(id)).toBe(true);
      } else expect(point.confidence).toBe('unverified');
      seen.add(point.id);
    }
  }
});

it('valida o esquema consumido pelo cliente e recusa ciclo', () => {
  expect(validateCatalog(catalog)).toBe(catalog);
  const bad = structuredClone(catalog);
  bad.chapters[0].checkpoints[0].guidance.requires = ['p-2'];
  expect(() => validateCatalog(bad)).toThrow(/dependências/);
});
