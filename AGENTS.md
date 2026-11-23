## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Project verification

- Use `research-ops` for Pathfinder mechanics and campaign data. Record the digital-game source and flag unknown patch versions or unverified claims.
- Use `verification-loop` with the checks provided by this repository: `npm test`, `npm run test:site`, then `npm run test:browser`. Report the test results and whether the published URL was verified separately.
- Use `e2e-testing` when changing interactive workflows. Test the built portal under `/guias-de-jogos/`, including the relevant error state and existing Zelda entry points.
- See [project skills](.agents/skills/README.md) for upstream attribution and the pinned revision.
