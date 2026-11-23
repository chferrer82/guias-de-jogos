import { validateCatalog } from './catalog.js';
import { DIFFICULTIES, EVENTS, LEGACY, SPOILERS, STATUSES, STORAGE,
  mergeBooks, newBook, newCampaign, parseBook } from './campaigns.js';
import { assessParty, guideCampaign, visiblePoint } from './guidance.js';

const DATA_URL = new URL('./data/catalog.json', import.meta.url);
const safe = (value) => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

const main = document.querySelector('#content');
const feedback = document.querySelector('#feedback');
const nav = document.querySelector('.sidebar');
let catalog, book, state, currentView = 'home', storedRaw, storageInvalid = false;
const chapter = () => catalog.chapters.find(act => act.id === state.chapter);
const option = (value, selected, label = value) =>
  `<option value="${safe(value)}" ${value === selected ? 'selected' : ''}>${safe(label)}</option>`;
const options = (items, selected) => items.map(item => option(item, selected)).join('');
const choices = (items, selected) => Object.entries(items).map(([value, text]) => option(value, selected, text)).join('');
const title = (name, desc) => `<header class="panel"><h2>${name}</h2><p class="muted">${desc}</p></header>`;
const badge = priority => `<span class="tag">${{ missable: 'Sensível ao tempo ou perdível',
  main: 'História principal', recommended: 'Recomendado' }[priority]}</span>`;
const field = (key, label, control) => `<div class="field"><label for="${key}">${label}</label>${control}</div>`;
const textField = (key, label, value = state[key]) => field(key, label,
  `<input id="${key}" name="${key}" maxlength="120" value="${safe(value)}">`);
const select = (key, label, items) => field(key, label, `<select id="${key}" name="${key}">${items}</select>`);
const levelInput = (id, value) => `<input id="${id}" name="level" type="number" min="1" max="20" required value="${value}">`;
const button = (label, action) => `<button class="btn secondary" data-go="${action}">${label}</button>`;
const report = message => { feedback.textContent = message; };

function useBook(value) {
  book = value;
  state = book.campaigns.find(campaign => campaign.id === book.activeId);
}

function saveBook(candidate) {
  try {
    const validated = parseBook(JSON.stringify(candidate), catalog);
    if (storageInvalid) throw Error('Exporte o armazenamento original antes de continuar.');
    if (localStorage.getItem(STORAGE) !== storedRaw) throw Error('Outra aba alterou a campanha. Recarregue a página.');
    const raw = JSON.stringify(validated);
    localStorage.setItem(STORAGE, raw);
    storedRaw = raw;
    useBook(validated);
    return true;
  } catch (error) {
    report('Alteração não salva. ' + error.message);
    return false;
  }
}

function saveCampaign(change) {
  return saveBook({ ...book, campaigns: book.campaigns.map(campaign =>
    campaign.id === state.id ? { ...campaign, ...change } : campaign) });
}

function profileFields() {
  const paths = state.spoilers === 'full'
    ? catalog.paths : [...new Set([catalog.paths[0], state.mythic])];
  return `<form id="profile"><div class="grid">
    ${textField('character', 'Nome do comandante')}
    ${field('level', 'Nível do comandante (1–20)', levelInput('level', state.level))}
    ${textField('characterClass', 'Classe')}
    ${textField('archetype', 'Arquétipo')}
    ${select('chapter', 'Ato atual', catalog.chapters.map(act => option(act.id, state.chapter, act.title)).join(''))}
    ${select('difficulty', 'Dificuldade', options(DIFFICULTIES, state.difficulty))}
    ${select('mythic', 'Caminho Mítico', options(paths, state.mythic))}
    ${state.spoilers !== 'full' ? '<p class="small muted">Use Guia completo em Configurações para escolher entre todos os Caminhos Míticos.</p>' : ''}
    ${textField('location', 'Localização atual')}
    ${textField('objective', 'Objetivo no diário')}
    ${state.chapter === 'act1' ? select('defense', 'Ataque a Defender’s Heart', choices(EVENTS, state.defense)) : ''}
    </div><button class="btn" type="submit">Salvar comandante</button></form>`;
}

function home() {
  const act = chapter();
  const { next, available } = guideCampaign(catalog, state);
  const active = act.checkpoints.filter(point => state.checkpoints[point.id] === 'active');
  const alerts = available.filter(point => point.priority === 'missable');
  const pointTitle = point => safe(visiblePoint(point, state.spoilers).title);
  const subtitle = state.spoilers === 'full' ? ' — ' + safe(act.subtitle) : '';
  return `<section class="panel hero"><h2>${safe(state.character)} · Nível ${state.level}</h2>
    <p>${safe(state.characterClass || 'Classe a definir')}${state.archetype ? ' · ' + safe(state.archetype) : ''}
    · ${safe(state.mythic)} · ${safe(state.difficulty)}</p>
    <p>${safe(act.title)}${subtitle} · ${safe(state.location || 'Localização a confirmar')}</p>
    <div class="actions">${button('Para onde vou agora?', 'lost')}${button('Abrir meu walkthrough', 'guide')}</div></section>
    <section class="panel"><h3>Próxima prioridade</h3>
    <p>${next ? pointTitle(next) : 'Revise o diário e atualize sua situação para receber orientação.'}</p>
    ${alerts.length ? `<div class="notice"><strong>Oportunidades sensíveis ao tempo</strong><p>${alerts.map(pointTitle).join(', ')}</p></div>` : ''}
    <h3>Em andamento</h3><p>${active.length ? active.map(pointTitle).join(', ') : 'Nenhum checkpoint em andamento registrado.'}</p>
    <h3>Party ativa</h3><p>${state.party.map(member => safe(member.name)).join(', ') || 'Cadastre os integrantes da party.'}</p>
    <h3>Configuração da campanha</h3>${profileFields()}</section>`;
}

function commander() {
  return title('Meu Comandante', 'Registre a ficha atual e o objetivo anotado no diário.') +
    `<section class="panel">${profileFields()}</section>`;
}

function sourceNote(point) {
  return point.source
    ? `<p class="small muted">Referência comunitária do jogo digital. Patch a confirmar. <a href="${safe(point.source)}">Consultar fonte</a></p>`
    : '<p class="small muted">Checkpoint editorial. Condições do jogo a verificar.</p>';
}

function pointDetails(point, recommendation = false) {
  const route = point.guidance;
  return `<p>${safe(point.hint)}</p><p><strong>Por quê</strong> ${safe(point.reason)}</p>
    ${recommendation && route ? `<dl><dt>Onde ir</dt><dd>${safe(route.where)}</dd>
    <dt>Como chegar</dt><dd>${safe(route.route)}</dd><dt>O que fazer</dt><dd>${safe(route.action)}</dd>
    <dt>O que preparar</dt><dd>${safe(route.prepare)}</dd></dl>` : ''}${sourceNote(point)}`;
}

function reveal(point, recommendation = false) {
  if (state.spoilers === 'none') return '';
  if (state.spoilers === 'full') return pointDetails(point, recommendation);
  return `<details><summary>Revelar detalhes</summary><h4>${safe(point.title)}</h4>${pointDetails(point, recommendation)}</details>`;
}

function guide() {
  const act = chapter();
  return title('Walkthrough por ato', 'Acompanhe os checkpoints do capítulo selecionado na ficha do comandante.') +
    `<section class="panel"><h3>${safe(state.spoilers === 'full' ? act.subtitle : act.title)}</h3>
      ${act.checkpoints.map(point => {
        const shown = visiblePoint(point, state.spoilers);
        return `<article class="list-card"><h3>${safe(shown.title)}</h3>${badge(point.priority)}
          ${reveal(point, true)}
          <label for="status-${point.id}">Status de ${safe(shown.title)}</label>
          <select id="status-${point.id}" data-checkpoint="${point.id}">${choices(STATUSES, state.checkpoints[point.id] ?? 'pending')}</select>
        </article>`;
      }).join('')}</section>`;
}

function lost() {
  const { next, blocked } = guideCampaign(catalog, state);
  const explanations = {
    'unknown-location': 'Informe sua localização atual.',
    'unknown-event': 'Confira no diário se o evento temporizado do ato já aconteceu.',
    'closed-window': 'A janela da oportunidade cadastrada já passou.',
    prerequisite: 'Confira os checkpoints anteriores e marque os concluídos.',
  };
  const checks = [...new Set(blocked.map(item => explanations[item.reason]))];
  return title('Estou perdido', 'Orientação baseada no capítulo, na localização e nos checkpoints registrados.') +
    `<section class="panel"><h3>${safe(chapter().title)}</h3>
    ${state.objective ? `<p>Seu objetivo no diário: ${safe(state.objective)}</p>` : ''}
    ${next ? `<article class="notice"><h3>${safe(visiblePoint(next, state.spoilers).title)}</h3>
      ${badge(next.priority)}<p>${safe(visiblePoint(next, state.spoilers).hint)}</p>
      ${reveal(next, true)}</article>` : '<p>O catálogo não permite indicar uma próxima ação com o estado registrado.</p>'}
    ${checks.length ? `<h3>O que conferir</h3><ul>${checks.map(check => `<li>${check}</li>`).join('')}</ul>` : ''}
    <div class="actions">${button('Atualizar situação', 'commander')}${button('Revisar checkpoints', 'guide')}</div></section>`;
}

function party() {
  const coverage = assessParty(catalog.roles, state.party);
  const covered = coverage.filter(role => role.members.length).length;
  return title('Minha party', 'Cadastre até seis integrantes e revise a cobertura das funções que você atribuiu.') +
    `<section class="panel"><h3>${covered} de ${coverage.length} funções declaradas</h3>
      <ul>${coverage.map(role => `<li>${safe(role.name)} · ${role.members.map(member => safe(member.name)).join(', ') || 'sem responsável'}${role.members.length > 1 ? ' · confirme se a sobreposição é útil' : ''}</li>`).join('')}</ul>
      <p class="muted">A cobertura usa as funções declaradas. A avaliação de talentos, buffs e desempenho em combate está em desenvolvimento.</p>
      ${state.party.map((member, index) => `<form class="list-card" data-member="${index}"><h3>${safe(member.name)}</h3>
        <div class="grid">${select('companion-' + index, 'Selecionar companheiro', option('', '', 'Escolher da lista') +
          options(catalog.companions.filter(name => state.spoilers === 'full' || name === member.name), ''))}
          ${field('member-name-' + index, 'Nome do integrante', `<input id="member-name-${index}" name="name" required maxlength="120" value="${safe(member.name)}">`)}
          ${field('member-level-' + index, 'Nível do integrante', levelInput('member-level-' + index, member.level))}
          ${field('member-class-' + index, 'Classe do integrante', `<input id="member-class-${index}" name="characterClass" maxlength="120" value="${safe(member.characterClass)}">`)}
        </div>
        <fieldset class="checks"><legend>Funções</legend>${catalog.roles.map(role =>
          `<label><input type="checkbox" name="roles" value="${role.id}" ${member.roles.includes(role.id) ? 'checked' : ''}>${safe(role.name)}</label>`).join('')}</fieldset>
        <div class="actions"><button class="btn" type="submit">Salvar integrante</button><button class="btn ghost" type="button" data-remove="${index}">Remover integrante</button></div>
        </form>`).join('')}
      ${state.party.length < 6 ? '<button class="btn" id="add-member">Adicionar integrante</button>' : '<p>Limite de seis integrantes atingido.</p>'}
      ${state.spoilers !== 'full' ? '<p class="small muted">Use o nome no campo livre. O Guia completo libera a lista de companheiros.</p>' : ''}</section>`;
}
function builds(){return title('Catálogo de builds','Referências para pesquisa e validação. Não são builds nível a nível nem rankings de eficiência comprovados.')+'<section class="panel"><div class="field"><label for="filter-build">Buscar por classe ou caminho</label><input id="filter-build" placeholder="Ex.: Angel, Lich, Oracle, suporte"></div><div id="build-results">'+buildCards('')+'</div></section>';}
function buildCards(q){const arr=catalog.builds.filter(b=>(state.spoilers === 'full' || b.path === catalog.paths[0] || b.path === state.mythic) && (b.name+' '+b.style+' '+b.path+' '+b.notes).toLowerCase().includes(q.toLowerCase()));
  return arr.length?arr.map(b=>'<article class="list-card"><div class="row"><h3>'+safe(b.name)+'</h3><span class="badge">'+safe(b.status)+'</span></div><div><span class="tag">'+safe(b.style)+'</span><span class="tag">'+safe(b.path)+'</span></div><p>'+safe(b.notes)+'</p><span class="small muted">Papéis: '+b.tags.map(t=>safe(catalog.roles.find(r=>r.id===t)?.name||t)).join(', ')+'</span></article>').join(''):'<p>Nenhuma build inicial corresponde ao filtro.</p>';}

function settings() {
  return title('Configurações', 'Selecione uma campanha, ajuste spoilers e faça backups locais.') +
    `<section class="panel">
    ${select('campaign', 'Campanha ativa', book.campaigns.map(c => option(c.id, state.id, c.name)).join(''))}
    <form id="new-campaign">${textField('campaign-name', 'Nome da nova campanha', '')}
      <button class="btn" type="submit">Criar campanha</button></form>
    ${select('spoilers', 'Spoilers', choices(SPOILERS, state.spoilers))}
    <div class="actions"><button class="btn" id="export">Exportar progresso</button>
    <label for="import-file">Importar campanhas de um backup JSON</label>
    <input type="file" id="import-file" accept="application/json,.json"></div>
    <p class="muted">A importação adiciona campanhas às que já estão neste navegador.</p>
    ${storageInvalid ? '<button class="btn secondary" id="export-raw">Exportar armazenamento original</button>' : ''}
    ${state.spoilers === 'full' ? '<p><a href="./data/catalog.json">Abrir catálogo público JSON</a></p>' : ''}
    </section>`;
}

const views = { home, commander, guide, lost, party, builds, data: settings };

function render() {
  main.innerHTML = views[currentView]();
}

function updateView(view) {
  currentView = view;
  nav.querySelectorAll('[data-view]').forEach(button => {
    const selected = button.dataset.view === view;
    button.classList.toggle('active', selected);
    if (selected) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  });
  render();
  main.focus();
  window.scrollTo(0, 0);
}

function download(name, raw) {
  const url = URL.createObjectURL(new Blob([raw], { type: 'application/json' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function initEvents() {
  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    const { view, go, remove } = button.dataset;
    if (view || go) updateView(view || go);
    if (button.id === 'export') download('commanders-codex-backup.json', JSON.stringify(book, null, 2));
    if (button.id === 'export-raw') {
      download('commanders-codex-original.json', storedRaw ?? localStorage.getItem(LEGACY));
    }
    if (button.id === 'add-member' && state.party.length < 6 &&
        saveCampaign({ party: [...state.party, { name: 'Personagem personalizado', level: state.level, roles: [] }] })) {
      render();
      main.querySelector('form:last-of-type input[name="name"]')?.focus();
    }
    if (remove !== undefined && confirm('Remover este integrante da party?') &&
        saveCampaign({ party: state.party.filter((_, index) => index !== Number(remove)) })) render();
  });

  main.addEventListener('submit', event => {
    event.preventDefault();
    const { target } = event;
    const fields = new FormData(target);
    if (target.id === 'profile' && saveCampaign({ ...Object.fromEntries(fields), level: Number(fields.get('level')) })) {
      render();
      report('Comandante salvo.');
    }
    if (target.id === 'new-campaign') {
      const name = fields.get('campaign-name').trim();
      if (!name) return report('Informe um nome para criar a campanha.');
      const campaign = newCampaign(catalog, name);
      if (saveBook({ ...book, activeId: campaign.id, campaigns: [...book.campaigns, campaign] })) {
        render();
        report('Campanha criada.');
      }
    }
    if (target.dataset.member !== undefined) {
      const party = [...state.party];
      party[Number(target.dataset.member)] = { name: fields.get('name'),
        level: Number(fields.get('level')), characterClass: fields.get('characterClass'), roles: fields.getAll('roles') };
      if (saveCampaign({ party })) {
        render();
        report('Integrante salvo.');
      }
    }
  });

  main.addEventListener('input', event => {
    if (event.target.id === 'filter-build') document.querySelector('#build-results').innerHTML = buildCards(event.target.value);
  });

  main.addEventListener('change', async event => {
    const input = event.target;
    if (input.id === 'chapter') {
      // O evento temporizado aparece depois de salvar a mudança de ato.
      if (input.value === 'act1' && !main.querySelector('#defense')) report('Salve o ato para registrar o ataque a Defender’s Heart.');
    }
    if (input.id === 'campaign' && saveBook({ ...book, activeId: input.value })) render();
    if (input.id === 'spoilers' && saveCampaign({ spoilers: input.value })) render();
    if (input.dataset.checkpoint && saveCampaign({ checkpoints: { ...state.checkpoints, [input.dataset.checkpoint]: input.value } })) {
      report('Checkpoint salvo.');
    }
    if (input.id.startsWith('companion-') && input.value) input.form.elements.name.value = input.value;
    if (input.id !== 'import-file' || !input.files[0]) return;
    try {
      const file = input.files[0];
      if (file.size > 5_000_000) throw Error('O arquivo excede 5 MB.');
      const imported = parseBook(await file.text(), catalog);
      if (saveBook(mergeBooks(book, imported))) {
        if (currentView === 'data') render();
        report('Backup importado.');
      }
    } catch (error) {
      report('Importação recusada. ' + error.message);
      input.value = '';
    }
  });
}

try {
  const response = await fetch(DATA_URL);
  if (!response.ok) throw Error('HTTP ' + response.status);
  catalog = validateCatalog(await response.json());
} catch (error) {
  const panel = document.createElement('section');
  panel.className = 'panel';
  panel.innerHTML = '<h2>Catálogo indisponível</h2><p>Atualize a página para tentar novamente. Use o diário para conferir seu objetivo atual.</p>';
  const detail = document.createElement('p');
  detail.textContent = error.message;
  catalog = undefined;
  panel.append(detail);
  main.prepend(panel);
}

if (catalog) {
  useBook(newBook(newCampaign(catalog)));
  try {
    storedRaw = localStorage.getItem(STORAGE);
    const original = storedRaw ?? localStorage.getItem(LEGACY);
    if (original !== null) useBook(parseBook(original, catalog));
  } catch {
    storageInvalid = true;
    report('Não foi possível ler o progresso salvo. Em Configurações, exporte o armazenamento original.');
  }
  initEvents();
  updateView('home');
  nav.hidden = false;
}
