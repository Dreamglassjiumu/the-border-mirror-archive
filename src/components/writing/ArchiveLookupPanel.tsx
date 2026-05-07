import { useMemo, useState } from 'react';
import type { ArchiveEntry } from '../../data';
import { allEntries, categoryLabels, searchEntries } from '../../utils/archive';
import { SpoilerBadge } from '../SpoilerBadge';

function FieldList({ label, values }: { label: string; values?: string[] }) {
  if (!values?.length) return null;
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.28em] text-stardust/60">{label}</p>
      <p className="mt-1 text-xs leading-6 text-slate-300">{values.join(' · ')}</p>
    </div>
  );
}

export function ArchiveLookupPanel() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<ArchiveEntry | undefined>();
  const results = useMemo(() => query.trim() ? searchEntries(allEntries, query, 'all').slice(0, 12) : [], [query]);
  const recommended = useMemo(() => allEntries.filter((entry) => ['sheppard', 'chapter-01', 'term-philosopher-core', 'term-library', 'signal-library'].includes(entry.id)), []);
  const visibleEntries = query.trim() ? results : recommended;

  return (
    <aside className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.05)]">
      <div className="mb-4">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/50">Archive Lookup</p>
        <h2 className="mt-2 text-xl font-semibold text-white">资料检索区</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">边写边查世界观、人物、术语、伏笔。</p>
      </div>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search archive while writing..."
        className="w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-200/45 focus:bg-cyan-100/[0.045] focus:shadow-[0_0_0_3px_rgba(125,211,252,.08)]"
      />
      <p className="mt-3 text-xs text-slate-500">{query.trim() ? `${results.length} archive signals matched.` : '输入关键词以检索档案。下方为推荐条目。'}</p>

      <div className="mt-4 space-y-3">
        {visibleEntries.map((entry) => (
          <button
            key={entry.id}
            onClick={() => setSelected((current) => current?.id === entry.id ? undefined : entry)}
            className={`w-full rounded-2xl border p-3 text-left transition ${selected?.id === entry.id ? 'border-stardust/60 bg-stardust/10' : 'border-white/10 bg-black/20 hover:border-cyan-200/35 hover:bg-cyan-100/[0.05]'}`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-cyan-100/45">{categoryLabels[entry.category] ?? entry.category}</p>
                <h3 className="mt-1 text-sm font-semibold text-white">{entry.title}</h3>
              </div>
              <SpoilerBadge level={entry.spoilerLevel} />
            </div>
            <p className="mt-2 line-clamp-3 text-xs leading-6 text-slate-300">{entry.summary}</p>
          </button>
        ))}
        {query.trim() && results.length === 0 && <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-400">No archive signal matched.</div>}
      </div>

      <div className="mt-5 rounded-3xl border border-white/10 bg-black/25 p-4">
        {selected ? (
          <div className="space-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-stardust/60">Expanded Dossier</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{selected.title}</h3>
            </div>
            <p className="text-sm leading-7 text-slate-300">{selected.details || selected.summary}</p>
            <FieldList label="Related Characters" values={selected.relatedCharacters} />
            <FieldList label="Related Chapters" values={selected.relatedChapters} />
            <FieldList label="Related Terms" values={selected.relatedTerms} />
          </div>
        ) : (
          <p className="text-sm leading-7 text-slate-500">Select a result to unfold details, related characters, chapters, and terms without leaving the writing cockpit.</p>
        )}
      </div>
    </aside>
  );
}
