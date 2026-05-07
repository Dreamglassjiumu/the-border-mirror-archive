import { useState } from 'react';
import type { LexiconTerm } from '../../data';
import { SpoilerBadge } from '../SpoilerBadge';

export function DetectedTermsPanel({ terms }: { terms: LexiconTerm[] }) {
  const [expandedId, setExpandedId] = useState<string | undefined>();

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-4">
      <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/50">Detected Terms</p>
      <h2 className="mt-2 text-xl font-semibold text-white">已检测术语</h2>
      <div className="mt-4 space-y-3">
        {terms.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-400">No terms detected in current draft.</div>
        ) : terms.map((term) => (
          <button
            key={term.id}
            onClick={() => setExpandedId((current) => current === term.id ? undefined : term.id)}
            className="w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-left transition hover:border-stardust/45 hover:bg-stardust/10"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-stardust/60">{term.type}</p>
                <h3 className="mt-1 text-sm font-semibold text-white">{term.chineseName}</h3>
                <p className="text-xs text-cyan-100/65">{term.englishName}</p>
              </div>
              <SpoilerBadge level={term.spoilerLevel} />
            </div>
            <p className="mt-3 text-xs leading-6 text-slate-300">{term.surfaceMeaning || term.summary}</p>
            {expandedId === term.id && <p className="mt-3 rounded-2xl border border-white/10 bg-black/25 p-3 text-xs leading-6 text-slate-300">{term.details}</p>}
          </button>
        ))}
      </div>
    </section>
  );
}
