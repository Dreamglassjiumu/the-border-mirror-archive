import type { Chapter } from '../../data';

function MissionBlock({ title, children, tone = 'default' }: { title: string; children?: string | string[]; tone?: 'default' | 'danger' | 'gold' }) {
  const content = Array.isArray(children) ? children : children ? [children] : [];
  if (content.length === 0) return null;
  const toneClass = tone === 'danger' ? 'border-red-200/20 bg-red-950/25' : tone === 'gold' ? 'border-stardust/25 bg-stardust/10' : 'border-white/10 bg-black/20';
  return (
    <section className={`rounded-2xl border p-4 ${toneClass}`}>
      <h3 className="text-[10px] uppercase tracking-[0.28em] text-stardust/70">{title}</h3>
      <div className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
        {content.length === 1 ? <p>{content[0]}</p> : <ul className="space-y-2">{content.map((item) => <li key={item} className="pl-3 before:-ml-3 before:mr-2 before:text-cyan-100/50 before:content-['✦']">{item}</li>)}</ul>}
      </div>
    </section>
  );
}

export function ChapterMissionPanel({ chapter }: { chapter: Chapter }) {
  return (
    <aside className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(218,188,111,.10),transparent_32%),rgba(255,255,255,.045)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.05)]">
      <div className="mb-4">
        <p className="text-xs uppercase tracking-[0.35em] text-stardust">Mission Briefing</p>
        <h2 className="mt-2 text-xl font-semibold text-white">章节作战面板</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">{chapter.part} · {chapter.status}</p>
      </div>
      <div className="space-y-3">
        <MissionBlock title="Mission Briefing / 本章剧情摘要">{chapter.synopsis}</MissionBlock>
        <MissionBlock title="Worldbuilding Payload / 本章展示的世界观">{chapter.worldbuilding}</MissionBlock>
        <MissionBlock title="Chapter Constraints / 本章制造的冲突" tone="gold">{chapter.conflict}</MissionBlock>
        <MissionBlock title="Active Foreshadowing / 本章埋下的伏笔">{chapter.foreshadowing}</MissionBlock>
        <MissionBlock title="Sheppard Delta / 本章谢泼德的变化">{chapter.sheppardChange}</MissionBlock>
        <MissionBlock title="Exit Hook / 本章结尾钩子" tone="gold">{chapter.endingHook}</MissionBlock>
        <MissionBlock title="Related Characters / 关联人物">{chapter.relatedCharacters}</MissionBlock>
        <MissionBlock title="Related Terms / 关联术语">{chapter.relatedTerms}</MissionBlock>
        <MissionBlock title="Do Not Reveal Yet / 禁止提前暴露的信息" tone="danger">{chapter.doNotRevealYet}</MissionBlock>
      </div>
    </aside>
  );
}
