# The Border Mirror Archive / 《边镜》宇宙档案馆

A runnable React + TypeScript + Tailwind CSS prototype for a long-lived space-opera writing archive. It is designed as a cosmic archive / interstellar civilization database for managing the worldbuilding, characters, factions, plotlines, chapters, foreshadowing signals, lexicon, pitches, and hidden-truth layers of **《边镜 / The Border Mirror》**.

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- Local TypeScript mock data only; no backend required

## Run Locally

```bash
npm install
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

This repository is configured for automated GitHub Pages deployment through GitHub Actions.

1. Push changes to the `main` branch to trigger the deployment workflow.
2. In the GitHub repository, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. After the workflow finishes, visit:

```text
https://jiumu-dreamglass.github.io/the-border-mirror-archive/
```

## Information Architecture

The prototype includes ten primary archive views:

1. **Command Deck / 首页总控台** — title, bilingual subtitle, logline, current writing status, seven-system orbital map, pinned entries, and signal alert zone.
2. **Cosmology / 世界观总纲** — work positioning, ultimate twist, reader-visible layer, author-only layer, and seven bottom systems.
3. **Ourotopia Federation / 乌洛托比亚联邦** — civilization, places, institutions, infrastructure, transit, dossier levels.
4. **Biology & Core System / 生物学与核心机制** — body, mouthpart, tentacles, gel skin, visual modules, phagocytosis, core fusion, division, vocation gene, post-death core handling, ecological flora.
5. **Characters / 人物档案** — lifeform scan style character dossier for Sheppard.
6. **Plotlines / 剧情线** — star-orbit narrative timeline for mainline, character, core, library, simulator, higher-human, and reader-cognition lines.
7. **Chapters / 章节规划** — chapter status, synopsis, worldbuilding, conflict, foreshadowing, character change, ending hook, draft placeholder.
8. **Lexicon / 术语表** — searchable/filterable term table with surface and hidden meanings.
9. **Signals / 伏笔与异常清单** — deep-space anomaly station with signal status and danger level.
10. **Pitches / 对外材料** — logline, 100-word pitch, 300-word pitch, synopsis placeholder, keywords, comps, and author notes.

## Data Files

Mock data is separated from presentation so it can later be replaced by Markdown, CMS, database records, Notion, or Obsidian exports.

- `src/data/types.ts` — shared interfaces: `WorldSystem`, `ArchiveEntry`, `Character`, `Plotline`, `Chapter`, `LexiconTerm`, `Signal`, `Pitch`.
- `src/data/world.ts` — cosmology brief and seven world systems.
- `src/data/federation.ts` — Ourotopia Federation and initial location/institution entries.
- `src/data/biology.ts` — biology and core-system entries.
- `src/data/characters.ts` — character dossiers.
- `src/data/plotlines.ts` — plotline records.
- `src/data/chapters.ts` — chapter planning records.
- `src/data/lexicon.ts` — bilingual lexicon terms.
- `src/data/signals.ts` — foreshadowing and anomaly records.
- `src/data/pitches.ts` — external pitch materials.
- `src/data/index.ts` — consolidated exports.

## How to Add a New Entry

1. Choose the correct file in `src/data/`.
2. Add an object that satisfies the relevant TypeScript interface from `src/data/types.ts`.
3. Give it a stable `id`, `title`, `category`, `spoilerLevel`, `tags`, and `summary`.
4. Add relationship names in `related`, `relatedCharacters`, `relatedChapters`, or `relatedSettings` so the detail drawer can surface cross-links.
5. The global search and filter index will pick up entries automatically when they are exported through `src/data/index.ts` and included in `src/utils/archive.ts`.

## Key Components

- `AppShell` — layout, navigation state, global search/filter, selected detail drawer, and pin state.
- `StarfieldBackground` — deep-space background with restrained motion and reduced-motion support.
- `SidebarNavigation` — desktop side navigation and mobile drawer navigation.
- `TopCommandBar` — global search and category filters.
- `ArchiveCard` — reusable dossier card with spoiler badge and pin action.
- `DetailDrawer` — responsive dossier details panel.
- `OrbitSystemMap` — seven-system orbital map.
- `SignalRadar` — anomaly monitoring station.
- `PlotlineTimeline` — star-track plotline timeline.
- `CharacterDossier` — lifeform scan record.
- `LexiconTable` — searchable/filterable lexicon display.
- `PitchPanel` — structured pitch packet.

## Future Improvements

- 接入 Markdown 文件作为资料来源
- 接入 Notion / Obsidian / CMS
- 本地编辑器
- 标签系统
- 人物关系图
- 星图式地点浏览
- 章节版本管理
- 伏笔回收追踪
- 导出 pitch 为 PDF
- 作者隐藏信息加密或本地权限保护
