# Guias de Jogos

Portal leve, gratuito e aberto de guias de jogos em português, feito pela e para a comunidade gamer.

**Site:** https://chferrer82.github.io/guias-de-jogos/

## Guias disponíveis

- **The Legend of Zelda: Ocarina of Time**: detonado (criança e adulto), masmorras e chefes, as 12 canções da ocarina, as 36 Peças de Coração com checklist, as 100 Skulltulas Douradas com checklist e filtros e a missão da Espada Biggoron.

## Como contribuir

Achou um erro ou quer ajudar? Veja a página [Como contribuir](https://chferrer82.github.io/guias-de-jogos/contribuir/). O caminho mais rápido é o botão **Editar página** no fim de qualquer guia, ou abrir uma issue.

## Rodando localmente

Precisa de Node.js 22.23 ou mais novo (recomendado: 24).

```bash
npm install
npm run dev        # site em http://localhost:4321/guias-de-jogos/
npm test           # confere os dados dos guias
npm run test:site  # gera o site e confere páginas, links e tamanho
```

## Como o projeto é organizado

| Pasta | O que tem |
| --- | --- |
| `src/content/docs/` | As páginas dos guias, em Markdown/MDX |
| `src/data/<jogo>/` | Listas (canções, masmorras, colecionáveis) usadas pelas páginas e pelos testes |
| `src/components/<jogo>/` | Tabelas e checklists que mostram essas listas |
| `tests/` | Testes de dados e do site gerado |

Feito com [Astro Starlight](https://starlight.astro.build). Cada push na `main` roda os testes e publica no GitHub Pages.

## Licença

Código sob licença MIT. Texto dos guias sob [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.pt_BR). Veja [LICENSE](LICENSE).

Site de fãs, sem vínculo com a Nintendo ou outras empresas. Nomes de jogos e personagens pertencem aos seus donos.
