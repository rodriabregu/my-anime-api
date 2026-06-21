# AGENTS.md

GraphQL anime API: a single Apollo Server reading from an in-memory dataset. No database, no build step.

## Commands

- `yarn start` — runs `node --loader ts-node/esm ./index.ts` (TypeScript executed directly via ts-node ESM loader, no compile).
- `yarn dev` — `nodemon index.ts` for watch mode.
- Package manager is **yarn 1.x** (pinned via `packageManager`). Do not use npm.
- `yarn test` is a placeholder that always fails — there is no test suite.
- No `lint` script exists despite ESLint being configured. Run `yarn eslint .` manually if needed.

Server listens on `process.env.PORT` or `3000`. GraphQL Playground is enabled (`introspection: true`).

## Gotchas (these will bite you)

- **`tsconfig.ts` is NOT read by anyone.** TypeScript/ts-node only load `tsconfig.json`. This repo has no `tsconfig.json`, so ts-node runs on its defaults and the settings in `tsconfig.ts` (strict, esModuleInterop, etc.) are effectively dead. If you need real compiler options to take effect, create a `tsconfig.json`.
- **Schema/resolver mismatch.** `typeDefs.ts` declares a `Mutation { createAnime }` but `index.ts` has **no Mutation resolver**. Calling it fails at runtime. Same for the `Seasons`/`curiosities` fields in `Info` — declared but not populated by `data.ts`.
- Several resolvers use unguarded `.filter(...)[0]` / `.find(...)` chains (`allCharactersAnime`, `oneCharacter`). An unmatched name throws instead of returning null.

## Layout

- `index.ts` — Apollo Server setup + all resolvers (Query only).
- `typeDefs.ts` — GraphQL SDL (`gql` template).
- `data.ts` — hardcoded anime/character dataset (the only data source).
- `interfaces.ts` — TS interfaces; `animeInt.info` is typed `any`.

## Style

Prettier: no semicolons, single quotes, 2-space tabs, printWidth 120, `arrowParens: avoid`. Match this in edits.
