# Commander’s Codex · Pathfinder: Wrath of the Righteous

[Painel no GitHub Pages](https://chferrer82.github.io/guias-de-jogos/pathfinder/)

## Auditoria e decisão de arquitetura

A rota estática existia no build de `cd34a24`. O teste de links lia um trecho do módulo embutido como se fosse um elemento HTML. As cinco execuções mais recentes daquela revisão falharam, e a rota pública devolvia HTTP 404 embora o catálogo devolvesse HTTP 200. O erro de sintaxe histórico já havia sido corrigido em `c7ca714`. [Execução de CI auditada](https://github.com/chferrer82/guias-de-jogos/actions/runs/45111047907)

O Codex permanece independente do Starlight e usa a rota única `public/pathfinder/index.html`. O Astro copia os arquivos para o artefato e mantém o prefixo `/guias-de-jogos/`. O módulo externo elimina a colisão com o teste de links. A aplicação resolve seus arquivos por caminho relativo e oferece uma página de consulta estática se o JavaScript estiver desativado.

## Instalação e testes

Use Node.js 24.

```sh
npm ci
npm run dev
npm test
npm run test:site
npx playwright install chromium
npm run test:browser
```

Abra [o painel local](http://localhost:4321/guias-de-jogos/pathfinder/). A suíte de navegador usa o artefato de `test:site` e inicia o preview local. Defina `CHROMIUM_PATH` para usar um Chromium instalado. Para executar a suíte contra Pages, defina `CODEX_SITE_URL=https://chferrer82.github.io/guias-de-jogos/`.

A CI valida dados, build, links do portal e fluxos interativos antes de enviar o artefato a Pages. Em `main`, também roda a suíte no URL publicado. As preferências usadas nos testes ficam em contextos de navegador isolados.

## Dados, serviços e progresso

| Arquivo | Responsabilidade |
| --- | --- |
| `public/pathfinder/data/catalog.json` | Dados públicos versionados, atos, checkpoints, papéis, caminhos e builds de referência |
| `public/pathfinder/catalog.js` | Esquema executável do catálogo e validação de referências |
| `public/pathfinder/guidance.js` | Elegibilidade, prioridade, exposição de spoilers e cobertura declarada da party |
| `public/pathfinder/campaigns.js` | Criação, validação, migração e mesclagem de backups |
| `public/pathfinder/app.js` | Interface, eventos e adaptador de armazenamento do navegador |

O contrato HTTP disponível é `GET /guias-de-jogos/pathfinder/data/catalog.json`. O catálogo 1.1 mantém os IDs existentes e acrescenta `generalTitle`, `confidence`, `source`, `gameVersion`, `verifiedAt` e, quando disponível, `guidance`. A orientação lista destino, rota, ação, preparação e condições. Campos de verificação desconhecidos usam `null`. Fontes comunitárias descrevem o jogo digital e têm o patch a confirmar. Checkpoints sem referência ficam disponíveis no checklist editorial.

A função `guideCampaign(catalog, campaign)` retorna `next`, `available` e `blocked`. Cada bloqueio identifica a etapa e a condição faltante ou encerrada. A análise da party conta funções declaradas e aponta sobreposições para revisão. Os serviços são funções locais que podem ser reutilizadas por uma futura API REST. Os modos de spoiler controlam a apresentação, enquanto o JSON público contém o catálogo integral.

O backup tem `version: 2`, `activeId` e `campaigns`. Cada campanha tem ID próprio, ficha, party, ato, localização, objetivo declarado, preferências, evento temporizado e mapa de estados dos checkpoints. A migração mantém o original v1 no navegador. A importação valida o arquivo inteiro e acrescenta campanhas, gerando novos IDs quando necessário. A exportação abrange todas as campanhas. O progresso fica no `localStorage` da origem do site.

## Cobertura e próximos incrementos

- **MVP:** painel, ficha do comandante, múltiplas campanhas, seis integrantes, seis estados de checkpoint, três modos de spoiler e backup. O guia tem checkpoints em todos os atos e orientação fundamentada no Prólogo e no Ato 1. A cobertura da party descreve papéis informados pelo jogador.
- **Próxima prioridade:** verificar a versão PC, ampliar missões e condições do Ato 2 em diante, e tornar consultáveis os bloqueios por missão. Classes, magias, talentos e itens ainda precisam de catálogo validado.
- **Otimização e estratégia:** progressão por nível, pré-requisitos, cenários por dificuldade, análise mecânica da party, combate, Cruzada, equipamentos e decisões dependem desse catálogo.
- **Integrações:** IndexedDB é uma opção para substituir o adaptador local. Uma API futura pode oferecer `GET /api/v1/chapters` e `POST /api/v1/guidance` usando os serviços locais. Planejar leitura de saves PC com consentimento, cópia de trabalho e compatibilidade verificada. Integrações de IA devem usar fontes recuperadas, manter chaves no servidor e pedir confirmação para mudanças de progresso.

Projeto de fãs independente da Owlcat Games e da Paizo.
