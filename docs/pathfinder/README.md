# Commander’s Codex — Pathfinder: Wrath of the Righteous

**Acesso:** https://chferrer82.github.io/guias-de-jogos/pathfinder/

Módulo independente do portal Guias de Jogos, pensado para funcionar **primeiro sem servidor** e, futuramente, oferecer bases consultáveis por APIs como as utilizadas por ferramentas de regras de RPG.

## MVP implementado

- Painel de campanha com ato atual, nível, dificuldade e Caminho Mítico.
- Checkpoints por ato, com prioridade e alertas sobre oportunidades potencialmente perdíveis.
- **Estou perdido:** recomendação determinística do próximo checkpoint não concluído, com justificativa e botão para avançar.
- Até seis integrantes com nível e funções declaradas; cálculo transparente de cobertura de oito funções.
- Catálogo inicial de cinco arquétipos/builds, **sem ranking supostamente preciso**.
- Salvamento offline por `localStorage`, backup em JSON e importação com validação básica.
- Dados do jogo em JSON independente da interface.

**Limites:** guia ainda não exaustivo; não lê saves, não executa IA nem simulação de talentos, equipamentos ou fórmulas de combate. Nota de party é **cobertura de funções declaradas**, não desempenho real. Não há sincronização de progresso entre dispositivos.

## Estrutura

```text
public/pathfinder/data/catalog.json   # Catálogo público JSON versionado
src/pages/pathfinder/index.astro       # Dashboard e lógica local
docs/pathfinder/README.md              # Documentação e roteiro
```

O endpoint **estático de dados** é:

```http
GET https://chferrer82.github.io/guias-de-jogos/pathfinder/data/catalog.json
```

Este GET devolve um JSON versionado. **Não** é um servidor de API com autenticação ou armazenamento de campanhas.

## Rodar localmente

```bash
git clone https://github.com/chferrer82/guias-de-jogos.git
cd guias-de-jogos
npm install
npm run dev
```

Visite `http://localhost:4321/guias-de-jogos/pathfinder/`. Para validar o build: `npm run build`.

## Arquitetura futura (API-first)

Proposta de contratos estáveis, ainda **não implementados**:

- `GET /api/v1/chapters` — atos e objetivos verificados.
- `GET /api/v1/builds?mythic=Angel&difficulty=Core` — builds filtradas.
- `GET /api/v1/classes/:id` — classes, níveis e habilidades.
- `POST /api/v1/party/evaluate` — nota baseada em cálculos definidos e explicações.
- `POST /api/v1/guidance` — orientação contextual a partir de estágio, diário e escolhas.
- `GET /api/v1/rules?version=...` — regras atribuídas à edição/patch.

Recomendação: usar **IDs estáveis**, campos `source`, `verifiedAt`, `gameVersion`, `confidence` por registro, JSON Schema, migração de dados, testes automatizados e separação entre informações verificadas, hipótese e cálculo. O front-end não deverá conhecer as regras internamente; usará os mesmos contratos do servidor.

## Próximas prioridades

1. Aumentar qualidade do banco de missões por ato (com fontes e critérios de desbloqueio).
2. Cadastro de classes, arquétipos, feats, spells, equipamentos e interações míticas.
3. Serviço de cálculo para builds, progressão e party, com cenários Core / Hard / Unfair.
4. Importador de saves local em PC, somente leitura, com consentimento explícito.
5. API backend opcional com FastAPI e consultas assistidas por IA, mantendo o cliente estático utilizável sem ela.

## Direitos e créditos

Projeto independente de fãs, sem afiliação com Owlcat Games ou Paizo. Não republicar integralmente walkthroughs ou bancos de dados de terceiros sem autorização. Use referências, paráfrases, verificação manual, fontes e licenças compatíveis.
