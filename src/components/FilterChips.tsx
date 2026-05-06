import { categoryLabels } from '../utils/archive';
const filters = ['all','public','foreshadowing','hidden','character','federation','biology','plotline','chapter','lexicon','signal','pitch'];
export function FilterChips({ active, onChange }: { active: string; onChange: (filter: string) => void }) {
  return <div className="flex gap-2 overflow-x-auto pb-2">{filters.map((filter) => <button key={filter} onClick={() => onChange(filter)} className={`shrink-0 rounded-full border px-3 py-2 text-xs transition ${active === filter ? 'border-stardust/70 bg-stardust/15 text-stardust' : 'border-white/10 bg-white/[0.03] text-slate-400 hover:text-white'}`}>{categoryLabels[filter]}</button>)}</div>;
}
