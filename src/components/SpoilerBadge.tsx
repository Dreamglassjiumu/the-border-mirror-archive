import type { SpoilerLevel } from '../data';

const styles: Record<SpoilerLevel, string> = {
  public: 'border-cyan-200/25 bg-cyan-200/10 text-cyan-100',
  foreshadowing: 'border-amber-300/30 bg-amber-300/10 text-amber-100',
  hidden: 'border-red-300/30 bg-red-950/50 text-red-100 shadow-[0_0_18px_rgba(127,29,29,.35)]',
};

export function SpoilerBadge({ level }: { level: SpoilerLevel }) {
  return <span className={`rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.22em] ${styles[level]}`}>{level}</span>;
}
