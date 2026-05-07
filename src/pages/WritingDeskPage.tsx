import { useMemo, useState } from 'react';
import { chapters, lexiconTerms } from '../data';
import { ArchiveLookupPanel } from '../components/writing/ArchiveLookupPanel';
import { ChapterMissionPanel } from '../components/writing/ChapterMissionPanel';
import { DetectedTermsPanel } from '../components/writing/DetectedTermsPanel';
import { DraftEditor } from '../components/writing/DraftEditor';
import { detectTerms, draftKey } from '../components/writing/writingUtils';
import { PageTitle } from '../components/AppShell';

function loadDraft(chapterId: string) {
  try {
    return window.localStorage.getItem(draftKey(chapterId)) ?? '';
  } catch (error) {
    console.warn('Unable to load local draft', error);
    return '';
  }
}

export function WritingDeskPage() {
  const initialChapterId = chapters[0]?.id ?? '';
  const [chapterId, setChapterId] = useState(initialChapterId);
  const currentChapter = chapters.find((chapter) => chapter.id === chapterId) ?? chapters[0];
  const [draft, setDraft] = useState(() => initialChapterId ? loadDraft(initialChapterId) : '');
  const detectedTerms = useMemo(() => detectTerms(draft, lexiconTerms), [draft]);

  function handleChapterChange(nextChapterId: string) {
    setChapterId(nextChapterId);
    setDraft(loadDraft(nextChapterId));
  }

  if (!currentChapter) {
    return <PageTitle eyebrow="Writing Desk" title="写作台" description="No chapter records are available yet." />;
  }

  return (
    <div className="animate-fade-in">
      <PageTitle eyebrow="Writing Desk / 写作台" title="Deep Space Creation Cockpit" description="左侧查资料，中间写正文，右侧锁定章节作战目标与当前草稿触发的术语信号。" />
      <div className="grid gap-5 2xl:grid-cols-[minmax(260px,0.9fr)_minmax(520px,1.8fr)_minmax(300px,1fr)]">
        <ArchiveLookupPanel />
        <div className="min-w-0 space-y-5">
          <DraftEditor chapters={chapters} currentChapter={currentChapter} onChapterChange={handleChapterChange} draft={draft} setDraft={setDraft} />
          <DetectedTermsPanel terms={detectedTerms} />
        </div>
        <ChapterMissionPanel chapter={currentChapter} />
      </div>
    </div>
  );
}
