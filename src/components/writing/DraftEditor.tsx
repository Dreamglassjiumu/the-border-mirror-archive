import { useEffect, useMemo, useState } from 'react';
import type { Chapter } from '../../data';
import { chapterDisplayTitle, countDraft, draftKey } from './writingUtils';

export function DraftEditor({ chapters, currentChapter, onChapterChange, draft, setDraft, isFocusMode = false }: { chapters: Chapter[]; currentChapter: Chapter; onChapterChange: (chapterId: string) => void; draft: string; setDraft: (draft: string) => void; isFocusMode?: boolean }) {
  const [lastSavedAt, setLastSavedAt] = useState<Date | undefined>();
  const [copyState, setCopyState] = useState('Copy Draft');
  const stats = useMemo(() => countDraft(draft), [draft]);

  useEffect(() => {
    try {
      window.localStorage.setItem(draftKey(currentChapter.id), draft);
      setLastSavedAt(new Date());
    } catch (error) {
      console.warn('Unable to save local draft', error);
    }
  }, [currentChapter.id, draft]);

  useEffect(() => {
    setCopyState('Copy Draft');
  }, [currentChapter.id]);

  async function copyDraft() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(draft);
      } else {
        const helper = document.createElement('textarea');
        helper.value = draft;
        helper.setAttribute('readonly', '');
        helper.style.position = 'fixed';
        helper.style.opacity = '0';
        document.body.appendChild(helper);
        helper.select();
        document.execCommand('copy');
        document.body.removeChild(helper);
      }
      setCopyState('Copied.');
      window.setTimeout(() => setCopyState('Copy Draft'), 1600);
    } catch (error) {
      console.warn('Unable to copy draft', error);
      setCopyState('Copy unavailable');
      window.setTimeout(() => setCopyState('Copy Draft'), 1800);
    }
  }

  function exportMarkdown() {
    const title = chapterDisplayTitle(currentChapter);
    const blob = new Blob([`# ${title}\n\n${draft}`], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentChapter.id}-draft.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function clearDraft() {
    if (!window.confirm('Clear this local draft? This cannot be undone.')) return;
    try {
      window.localStorage.removeItem(draftKey(currentChapter.id));
    } catch (error) {
      console.warn('Unable to clear local draft', error);
    }
    setDraft('');
    setLastSavedAt(new Date());
  }

  return (
    <section className="rounded-[2.25rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(125,211,252,.09),transparent_34%),rgba(255,255,255,.05)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.06)] md:p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-stardust">Draft Editor</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">正文写作区</h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">{draft.trim() ? 'Draft signal active.' : 'No draft recorded in this browser yet.'}</p>
        </div>
        <label className="min-w-0 text-sm text-slate-300 xl:w-72">
          <span className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-cyan-100/45">Current Chapter</span>
          <select
            value={currentChapter.id}
            onChange={(event) => onChapterChange(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#080b19] px-4 py-3 text-sm text-white outline-none transition focus:border-stardust/60 focus:shadow-[0_0_0_3px_rgba(218,188,111,.08)]"
          >
            {chapters.map((chapter) => <option key={chapter.id} value={chapter.id}>{chapter.subtitle} · {chapter.title}</option>)}
          </select>
        </label>
      </div>

      <div className="mt-5 rounded-3xl border border-cyan-100/10 bg-black/20 p-4">
        <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-100/45">Chapter Signal</p>
        <h3 className="mt-2 text-xl font-semibold text-white">{chapterDisplayTitle(currentChapter)}</h3>
        <p className="mt-2 text-sm leading-7 text-slate-400">{currentChapter.summary}</p>
      </div>

      <textarea
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="在这里继续记录谢泼德穿过完美世界时听见的第一道裂缝……"
        className={`mt-5 w-full resize-y rounded-[1.75rem] border border-white/10 bg-[#070a16]/90 p-5 text-base leading-8 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-stardust/60 focus:bg-[#090d1d] focus:shadow-[0_0_0_4px_rgba(218,188,111,.08),0_0_40px_rgba(125,211,252,.08)] ${isFocusMode ? 'min-h-[70vh]' : 'min-h-[64vh]'}`}
      />

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <Stat label="rough words" value={stats.roughWords.toLocaleString()} />
        <Stat label="characters" value={stats.characters.toLocaleString()} />
        <Stat label="paragraphs" value={stats.paragraphs.toLocaleString()} />
      </div>

      <div className="mt-5 flex flex-col gap-3 rounded-3xl border border-white/10 bg-black/20 p-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-400">已自动保存{lastSavedAt ? ` · ${lastSavedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}` : ''}</p>
        <div className="flex flex-wrap gap-2">
          <button onClick={copyDraft} className="rounded-full border border-cyan-100/20 bg-cyan-100/10 px-4 py-2 text-sm text-cyan-50 transition hover:border-cyan-100/45 hover:bg-cyan-100/15 active:scale-95">{copyState}</button>
          <button onClick={exportMarkdown} className="rounded-full border border-stardust/30 bg-stardust/10 px-4 py-2 text-sm text-stardust transition hover:border-stardust/60 hover:bg-stardust/15 active:scale-95">Export .md</button>
          <button onClick={clearDraft} className="rounded-full border border-red-200/20 bg-red-950/30 px-4 py-2 text-sm text-red-100 transition hover:border-red-200/45 hover:bg-red-950/45 active:scale-95">Clear Draft</button>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-white/10 bg-black/20 p-3"><p className="text-[10px] uppercase tracking-[0.28em] text-cyan-100/45">{label}</p><p className="mt-1 text-lg font-semibold text-white">{value}</p></div>;
}
