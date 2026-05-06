import type { ArchiveEntry } from '../data';
import { SpoilerBadge } from './SpoilerBadge';

export function DetailDrawer({ entry, onClose }: { entry?: ArchiveEntry; onClose: () => void }) {
  return (
    <aside className={`fixed inset-x-0 bottom-0 z-40 max-h-[78vh] overflow-y-auto rounded-t-[2rem] border border-white/10 bg-[#070a18]/95 p-6 shadow-2xl backdrop-blur-2xl transition lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:rounded-3xl ${entry ? 'translate-y-0' : 'pointer-events-none translate-y-full lg:translate-y-0 lg:opacity-60'}`}>
      {entry ? (
        <>
          <div className="mb-5 flex items-start justify-between gap-3">
            <div><p className="text-xs uppercase tracking-[0.35em] text-cyan-100/45">Detail Dossier</p><h2 className="mt-2 text-2xl font-semibold text-white">{entry.title}</h2></div>
            <button onClick={onClose} className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300 lg:hidden">Close</button>
          </div>
          <SpoilerBadge level={entry.spoilerLevel} />
          <p className="mt-5 leading-8 text-slate-200">{entry.summary}</p>
          <dl className="mt-6 space-y-4 text-sm">
            {Object.entries(entry).filter(([k, v]) => !['id','title','subtitle','summary','category','tags','spoilerLevel'].includes(k) && v !== undefined).map(([key, value]) => (
              <div key={key} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <dt className="mb-2 text-[11px] uppercase tracking-[0.26em] text-stardust/70">{key}</dt>
                <dd className="leading-7 text-slate-300">{Array.isArray(value) ? value.join(' · ') : typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)}</dd>
              </div>
            ))}
          </dl>
        </>
      ) : <p className="text-slate-400">Select an archive card to open its encrypted dossier.</p>}
    </aside>
  );
}
