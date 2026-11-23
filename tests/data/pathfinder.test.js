import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

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
