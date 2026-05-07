# The Border Mirror Archive

A React + TypeScript + Tailwind CSS archive prototype for managing worldbuilding, characters, factions, plotlines, chapters, foreshadowing signals, lexicon entries, pitches, and hidden-truth layers for *The Border Mirror*.

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- Local TypeScript mock data only; no backend required

## Local Development

Install dependencies from the committed lockfile:

```bash
npm ci
```

Start the local development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## GitHub Pages Deployment

This repository deploys to GitHub Pages with GitHub Actions.

Required repository setting:

1. Open **Settings > Pages** in the GitHub repository.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.

Deployment flow:

1. Push changes to the `main` branch.
2. GitHub Actions runs `.github/workflows/deploy.yml`.
3. The workflow installs dependencies with `npm ci`.
4. The workflow builds the app with `npm run build`.
5. The generated `./dist` directory is uploaded and deployed to GitHub Pages.

The Vite base path is configured in `vite.config.ts`:

```ts
base: '/the-border-mirror-archive/',
```

Published URL:

```text
https://jiumu-dreamglass.github.io/the-border-mirror-archive/
```

## Daily Update Workflow

1. Pull the latest `main` branch before editing.
2. Update archive data or UI code as needed.
3. Run `npm run build` locally before pushing.
4. Commit source changes, `package.json`, and `package-lock.json` when dependency changes are intentional.
5. Do not commit generated or local-only files such as `node_modules/`, `dist/`, or `.env`.
6. Push to `main` and confirm the GitHub Actions deployment succeeds.

## Information Architecture

The prototype includes ten primary archive views:

1. **Command Deck**: title, subtitle, logline, writing status, orbital map, pinned entries, and signal alerts.
2. **Cosmology**: work positioning, twist layers, reader-visible layer, author-only layer, and world systems.
3. **Ourotopia Federation**: civilization, places, institutions, infrastructure, transit, and dossier levels.
4. **Biology & Core System**: body systems, core fusion, division, post-death handling, and ecological flora.
5. **Characters**: character dossier records.
6. **Plotlines**: narrative timeline records.
7. **Chapters**: chapter status, synopsis, worldbuilding, conflict, foreshadowing, character change, and hooks.
8. **Lexicon**: searchable and filterable term table.
9. **Signals**: foreshadowing and anomaly records.
10. **Pitches**: logline, pitch materials, synopsis placeholder, keywords, comps, and author notes.

## Data Files

Mock data is separated from presentation so it can later be replaced by Markdown, CMS, database records, Notion, or Obsidian exports.

- `src/data/types.ts`: shared interfaces.
- `src/data/world.ts`: cosmology brief and world systems.
- `src/data/federation.ts`: federation, locations, and institutions.
- `src/data/biology.ts`: biology and core-system entries.
- `src/data/characters.ts`: character dossiers.
- `src/data/plotlines.ts`: plotline records.
- `src/data/chapters.ts`: chapter planning records.
- `src/data/lexicon.ts`: bilingual lexicon terms.
- `src/data/signals.ts`: foreshadowing and anomaly records.
- `src/data/pitches.ts`: external pitch materials.
- `src/data/index.ts`: consolidated exports.

## Adding a New Entry

1. Choose the correct file in `src/data/`.
2. Add an object that satisfies the relevant TypeScript interface from `src/data/types.ts`.
3. Give it a stable `id`, `title`, `category`, `spoilerLevel`, `tags`, and `summary`.
4. Add relationship names in `related`, `relatedCharacters`, `relatedChapters`, or `relatedSettings` where useful.
5. The global search and filter index will pick up exported entries through `src/data/index.ts` and `src/utils/archive.ts`.
