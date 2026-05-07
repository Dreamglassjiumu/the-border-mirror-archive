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

The prototype includes eleven primary archive views:

1. **Command Deck**: title, subtitle, logline, writing status, orbital map, pinned entries, and signal alerts.
2. **Writing Desk**: three-column creation cockpit with archive lookup, local draft editing, chapter mission guidance, Markdown export, copy, clear, and detected lexicon terms.
3. **Cosmology**: work positioning, twist layers, reader-visible layer, author-only layer, and world systems.
4. **Ourotopia Federation**: civilization, places, institutions, infrastructure, transit, and dossier levels.
5. **Biology & Core System**: body systems, core fusion, division, post-death handling, and ecological flora.
6. **Characters**: character dossier records.
7. **Plotlines**: narrative timeline records.
8. **Chapters**: chapter status, synopsis, worldbuilding, conflict, foreshadowing, character change, and hooks.
9. **Lexicon**: searchable and filterable term table.
10. **Signals**: foreshadowing and anomaly records.
11. **Pitches**: logline, pitch materials, synopsis placeholder, keywords, comps, and author notes.

## Writing Desk / 写作台

The **Writing Desk** upgrades the archive from a reference library into a lightweight creation cockpit. It does not require a backend, database, login, or rich-text editor.

1. Enter it from the left navigation by selecting **Writing Desk / 写作台**.
2. Use the chapter selector in the central **Draft Editor** to choose the active chapter; the first chapter is **第一章 · Another Great Day in Ourotopia**.
3. Drafts auto-save to browser `localStorage` while you type, using the key format `border-mirror-draft-[chapterId]`.
4. `localStorage` drafts are only stored in the current browser on the current device; they do not automatically sync to other devices or collaborators.
5. Chapter records can include `chapter.manuscript` to store an archived chapter body that is part of the local TypeScript data set.
6. The Writing Desk never automatically overwrites a browser draft with `chapter.manuscript`; the editor continues to prefer the current `localStorage` draft by default.
7. To continue writing from an archived body, click **Load Archive / 载入归档正文** in the **Manuscript Archive / 章节正文档案** panel. If a local draft already exists, the page asks for confirmation before replacing it.
8. `localStorage` drafts are only stored in the current browser on the current device; they do not automatically sync to other devices or collaborators.
9. Click **Copy Archive / 复制归档正文** to copy the archived manuscript text without loading it into the editor. If the Clipboard API is unavailable, the page attempts a safe textarea fallback.
10. Click **Copy Draft** to copy the full current draft to the clipboard. If the Clipboard API is unavailable, the page attempts a safe textarea fallback.
11. Click **Export .md** to download a Markdown file named `[chapterId]-draft.md` with the chapter title and draft body.
12. Click **Clear Draft** to remove the current chapter draft from the editor and local storage; the page asks for confirmation before deleting.
13. Use the left **Archive Lookup / 资料检索区** to search worldbuilding, federation records, biology/core mechanisms, characters, plotlines, chapters, lexicon terms, foreshadowing signals, and pitches while writing. Search results open inline so you can review details and relationships without leaving the desk.
14. Use **Detected Terms / 已检测术语** below the editor to check which lexicon terms appear in the current draft. Terms are detected by simple Chinese/English name matching and can be expanded for their surface meaning and details.

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
