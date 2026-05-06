import { biologyEntries, chapters, characters, federationEntries, lexiconTerms, pitches, plotlines, signals, worldSystems } from '../data';
import type { ArchiveEntry } from '../data';

export const allEntries: ArchiveEntry[] = [
  ...worldSystems,
  ...federationEntries,
  ...biologyEntries,
  ...characters,
  ...plotlines,
  ...chapters,
  ...lexiconTerms,
  ...signals,
  ...pitches,
];

export const categoryLabels: Record<string, string> = {
  all: 'All Archives', world: '世界观', federation: '联邦', biology: '生物学', character: '人物', plotline: '剧情线', chapter: '章节', lexicon: '术语', signal: '伏笔', pitch: 'Pitch', public: '读者可见', foreshadowing: '伏笔', hidden: '作者隐藏', pinned: 'Pinned',
};

export function searchEntries(entries: ArchiveEntry[], query: string, filter: string) {
  const q = query.trim().toLowerCase();
  return entries.filter((entry) => {
    const matchesFilter = filter === 'all'
      || entry.category === filter
      || (filter === 'public' && entry.spoilerLevel === 'Public')
      || (filter === 'foreshadowing' && entry.spoilerLevel === 'Foreshadowing')
      || (filter === 'hidden' && entry.spoilerLevel === 'Hidden Truth');
    const haystack = [entry.title, entry.subtitle, entry.summary, entry.content, entry.category, entry.spoilerLevel, ...(entry.tags ?? []), ...(entry.related ?? [])].filter(Boolean).join(' ').toLowerCase();
    return matchesFilter && (!q || haystack.includes(q));
  });
}
