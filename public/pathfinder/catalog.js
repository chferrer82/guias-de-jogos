const text = value => typeof value === 'string' && value.trim().length > 0;
const key = value => typeof value === 'string' && /^[a-z][a-z0-9-]*$/.test(value);
const priorities = ['main', 'recommended', 'missable'];
const populatedList = value => Array.isArray(value) && value.length > 0;
const distinct = values => new Set(values).size === values.length;
const https = value => typeof value === 'string' && URL.canParse(value) && new URL(value).protocol === 'https:';

function check(condition, label) {
  if (!condition) throw Error('Catálogo incompatível: ' + label);
}

export function validateCatalog(catalog) {
  check(typeof catalog?.schemaVersion === 'string' && /^1\.\d+\.\d+$/.test(catalog.schemaVersion), 'versão');
  for (const name of ['chapters', 'paths', 'roles', 'companions', 'builds']) {
    check(populatedList(catalog[name]), name);
  }
  for (const names of [catalog.paths, catalog.companions]) {
    check(names.every(text) && distinct(names), 'nomes de caminhos e companheiros');
  }
  const roles = catalog.roles.map(role => role?.id);
  check(roles.every(key) && distinct(roles) && catalog.roles.every(role => text(role.name)), 'funções');
  const builds = catalog.builds.map(build => build?.id);
  check(builds.every(key) && distinct(builds), 'identificadores de builds');
  for (const build of catalog.builds) {
    check([build.name, build.style, build.notes, build.status].every(text) && catalog.paths.includes(build.path) &&
      populatedList(build.tags) && build.tags.every(id => roles.includes(id)), build.id);
  }
  const chapters = catalog.chapters.map(chapter => chapter?.id);
  check(chapters.every(key) && distinct(chapters), 'identificadores de capítulos');
  const checkpoints = new Set();
  for (const chapter of catalog.chapters) {
    check([chapter.title, chapter.subtitle, chapter.objective].every(text) && populatedList(chapter.checkpoints), chapter.id);
    const previous = new Set();
    for (const point of chapter.checkpoints) {
      check(key(point?.id) && !checkpoints.has(point.id) && priorities.includes(point.priority) &&
        [point.title, point.generalTitle, point.hint, point.reason].every(text), chapter.id + ' / checkpoint');
      check((point.gameVersion === null || text(point.gameVersion)) &&
        (point.verifiedAt === null || /^\d{4}-\d\d-\d\d$/.test(point.verifiedAt)), point.id + ' / versão');
      if (point.guidance) {
        const { where, route, action, prepare, event, when, requires } = point.guidance;
        check(point.confidence === 'community-reference' && https(point.source) &&
          [where, route, action, prepare].every(text), point.id + ' / orientação');
        check(event === undefined ? when === undefined : event === 'defense' && ['before', 'after'].includes(when), point.id + ' / evento');
        check(requires === undefined || (Array.isArray(requires) && requires.every(id => previous.has(id))), point.id + ' / dependências');
      } else {
        check(point.confidence === 'unverified' && point.source === null, point.id + ' / fonte');
      }
      previous.add(point.id);
      checkpoints.add(point.id);
    }
  }
  return catalog;
}
