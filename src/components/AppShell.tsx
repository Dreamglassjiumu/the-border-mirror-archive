import { useMemo, useState } from 'react';
import type { ArchiveEntry } from '../data';
import { allEntries, searchEntries } from '../utils/archive';
import { StarfieldBackground } from './StarfieldBackground';
import { SidebarNavigation, type View } from './SidebarNavigation';
import { TopCommandBar } from './TopCommandBar';
import { DetailDrawer } from './DetailDrawer';
import { ArchiveCard } from './ArchiveCard';
import { CommandDeck, CosmologyPage, FederationPage, BiologyPage, CharactersPage, PlotlinesPage, ChaptersPage, LexiconPage, SignalsPage, PitchesPage } from '../pages/Pages';

export function AppShell() {
  const [view, setView] = useState<View>('command');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<ArchiveEntry | undefined>();
  const [pins, setPins] = useState<string[]>(['sheppard','chapter-01','signal-library']);
  const [menuOpen, setMenuOpen] = useState(false);
  const results = useMemo(() => searchEntries(allEntries, query, filter), [query, filter]);
  const togglePin = (id: string) => setPins((current) => current.includes(id) ? current.filter((pin) => pin !== id) : [...current, id]);
  const common = { onSelect: setSelected, pins, togglePin };
  return <><StarfieldBackground /><div className="flex min-h-screen"><SidebarNavigation active={view} onChange={setView} open={menuOpen} onClose={() => setMenuOpen(false)} /><main className="min-w-0 flex-1"><TopCommandBar query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} onMenu={() => setMenuOpen(true)} /><div className="grid gap-6 p-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:p-8"><section className="min-w-0">{query || filter !== 'all' ? <ArchiveResults entries={results} {...common} /> : view === 'command' ? <CommandDeck {...common} /> : view === 'cosmology' ? <CosmologyPage {...common} /> : view === 'federation' ? <FederationPage {...common} /> : view === 'biology' ? <BiologyPage {...common} /> : view === 'characters' ? <CharactersPage {...common} /> : view === 'plotlines' ? <PlotlinesPage {...common} /> : view === 'chapters' ? <ChaptersPage {...common} /> : view === 'lexicon' ? <LexiconPage {...common} /> : view === 'signals' ? <SignalsPage {...common} /> : <PitchesPage {...common} />}</section><DetailDrawer entry={selected} onClose={() => setSelected(undefined)} /></div></main></div></>;
}
function ArchiveResults({ entries, onSelect, pins, togglePin }: { entries: ArchiveEntry[]; onSelect: (e: ArchiveEntry)=>void; pins: string[]; togglePin: (id:string)=>void }) {
  return <div><PageTitle eyebrow="Global Index" title="Search & Filter Results" description="跨人物、设定、章节、术语与伏笔检索档案。" /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{entries.map((entry) => <ArchiveCard key={entry.id} entry={entry} onSelect={() => onSelect(entry)} pinned={pins.includes(entry.id)} onPin={() => togglePin(entry.id)} />)}</div></div>;
}
export function PageTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) { return <header className="mb-8"><p className="text-xs uppercase tracking-[0.42em] text-stardust">{eyebrow}</p><h1 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">{title}</h1><p className="mt-4 max-w-3xl leading-8 text-slate-300">{description}</p></header>; }
