const terminal = new Set(['done', 'failed', 'unavailable', 'skipped']);

export function visiblePoint(point, spoilers, revealed = false) {
  if (spoilers === 'full' || (spoilers === 'hints' && revealed)) return point;
  return {
    id: point.id, priority: point.priority,
    title: point.generalTitle ?? 'Checkpoint do capítulo',
    hint: point.generalHint ?? 'Confira a etapa correspondente no diário do jogo.',
  };
}

export function guideCampaign(catalog, campaign) {
  const chapter = catalog.chapters.find(act => act.id === campaign.chapter);
  const status = id => campaign.checkpoints[id] ?? 'pending';
  const available = [];
  const blocked = [];
  for (const point of chapter.checkpoints) {
    if (terminal.has(status(point.id)) || !point.guidance) continue;
    const rule = point.guidance;
    const unmet = (rule.requires ?? []).filter(id => status(id) !== 'done');
    if (unmet.length) {
      blocked.push({ point, reason: 'prerequisite', unmet });
      continue;
    }
    if (rule.event && campaign[rule.event] !== rule.when) {
      blocked.push({ point, reason: campaign[rule.event] === 'unknown' ? 'unknown-event' : 'closed-window' });
      continue;
    }
    if (!campaign.location.trim()) {
      blocked.push({ point, reason: 'unknown-location' });
      continue;
    }
    available.push(point);
  }
  const priority = { missable: 0, main: 1, recommended: 2 };
  const normalized = value => value.trim().toLocaleLowerCase('pt-BR');
  available.sort((a, b) => Number(Boolean(b.guidance.event)) - Number(Boolean(a.guidance.event)) ||
    priority[a.priority] - priority[b.priority] ||
    Number(status(b.id) === 'active') - Number(status(a.id) === 'active') ||
    Number(normalized(b.guidance.where) === normalized(campaign.location)) -
    Number(normalized(a.guidance.where) === normalized(campaign.location)));
  return { next: available[0], available, blocked };
}

export function assessParty(roles, party) {
  return roles.map(role => ({ ...role, members: party.filter(member => member.roles.includes(role.id)) }));
}
