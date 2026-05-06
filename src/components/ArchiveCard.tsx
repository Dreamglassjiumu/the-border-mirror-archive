import type { ArchiveEntry } from '../data';
import { SpoilerBadge } from './SpoilerBadge';

export function ArchiveCard({ entry, active, pinned, onSelect, onPin }: { entry: ArchiveEntry; active?: boolean; pinned?: boolean; onSelect: () => void; onPin: () => void }) {
  return (
    <article className={`group relative overflow-hidden rounded-3xl border p-5 transition duration-300 ${active ? 'border-stardust/70 bg-stardust/10 shadow-[0_0_35px_rgba(218,188,111,.16)]' : 'border-white/10 bg-white/[0.055] hover:border-cyan-200/30 hover:bg-cyan-100/[0.06]'}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/50 to-transparent opacity-0 transition group-hover:opacity-100" />
      <button onClick={onSelect} className="w-full text-left">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-100/50">{entry.category}</p>
            <h3 className="mt-2 text-lg font-semibold text-white">{entry.title}</h3>
            {entry.subtitle && <p className="mt-1 text-sm text-stardust/80">{entry.subtitle}</p>}
          </div>
          <SpoilerBadge level={entry.spoilerLevel} />
        </div>
        <p className="line-clamp-3 text-sm leading-7 text-slate-300">{entry.summary}</p>
      </button>
      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">{entry.tags.slice(0, 3).map((tag) => <span key={tag} className="rounded-full bg-white/5 px-2 py-1 text-xs text-slate-300">{tag}</span>)}</div>
        <button onClick={onPin} className={`rounded-full border px-3 py-1 text-xs transition ${pinned ? 'border-stardust/60 bg-stardust/20 text-stardust' : 'border-white/10 text-slate-400 hover:text-white'}`}>{pinned ? 'Pinned' : 'Pin'}</button>
      </div>
    </article>
  );
}
