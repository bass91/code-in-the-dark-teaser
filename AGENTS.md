# Repository Guidelines

## Project Structure & Module Organization
- Nuxt 4 app. Entry UI: `app/app.vue` (SFC).
- Public assets: `public/` (served at root).
- Auto-generated build files: `.nuxt/` (do not edit).
- Add features using Nuxt conventions:
  - `pages/` for route-based views, `components/` for shared UI,
  - `composables/` for reusable logic, `assets/` for styles/images.

## Build, Test, and Development Commands
- `pnpm dev` (or `npm run dev`) — start local dev server with HMR.
- `pnpm build` — production build.
- `pnpm preview` — preview production build locally.
- `pnpm generate` — prerender static site (if applicable).
- Node 18+ recommended. After dependency changes: `pnpm install`.

## Coding Style & Naming Conventions
- Indentation: 2 spaces; UTF-8; end lines with LF.
- Vue SFCs: `<script setup lang="ts">` preferred for new code.
- Naming: Components `PascalCase.vue` (e.g., `HeaderBar.vue`), composables `useThing.ts`, files kebab-case for non-components.
- CSS: Use module/scoped styles by default; BEM for class names.
- Imports: path aliases via `~`/`@` supported by Nuxt; avoid deep relative chains.

## Testing Guidelines
- No tests configured yet. If adding tests:
  - Use Vitest + Vue Test Utils.
  - Place unit tests alongside code or under `tests/` with `*.spec.ts`.
  - Aim for coverage on composables and critical components.
  - Example command (once configured): `pnpm vitest`.

## Commit & Pull Request Guidelines
- Commits: concise, present-tense. Prefer Conventional Commits when feasible:
  - `feat: add scoreboard widget`
  - `fix: correct SSR asset path`
- PRs: clear description, rationale, and screenshots for UI changes; include reproduction steps and linked issues.
- Keep PRs scoped; avoid unrelated refactors. Update docs when behavior or commands change.

## Security & Configuration Tips
- Do not commit secrets. Use `.env` and reference via `runtimeConfig` in `nuxt.config.ts`.
- Never edit `.nuxt/` directly; changes go in source dirs.
- Validate third-party additions; keep dependencies minimal.

## Agent-Specific Instructions
- Follow Nuxt conventions over custom wiring.
- Prefer incremental changes with runnable state.
- If introducing tooling (ESLint/Prettier/Vitest), include minimal config and scripts and document them here.
