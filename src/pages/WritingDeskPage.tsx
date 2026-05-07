import { useEffect, useMemo, useState } from 'react';
import { chapters, lexiconTerms } from '../data';
import { ArchiveLookupPanel } from '../components/writing/ArchiveLookupPanel';
import { ChapterMissionPanel } from '../components/writing/ChapterMissionPanel';
import { DetectedTermsPanel } from '../components/writing/DetectedTermsPanel';
import { DraftEditor } from '../components/writing/DraftEditor';
import { ResizablePanel } from '../components/writing/layout/ResizablePanel';
import { WritingDeskToolbar } from '../components/writing/layout/WritingDeskToolbar';
import { detectTerms, draftKey } from '../components/writing/writingUtils';
import { PageTitle } from '../components/AppShell';

const layoutPreferenceKey = 'writing-desk-layout-v0.2';
const defaultLayoutPreferences = {
  isLeftExpanded: true,
  isRightExpanded: true,
  isFocusMode: false,
  leftWidth: 320,
  rightWidth: 340,
};

type LayoutPreferences = typeof defaultLayoutPreferences;

function clampPanelWidth(width: number, minWidth = 260, maxWidth = 460) {
  return Math.min(Math.max(width, minWidth), maxWidth);
}

function loadDraft(chapterId: string) {
  try {
    return window.localStorage.getItem(draftKey(chapterId)) ?? '';
  } catch (error) {
    console.warn('Unable to load local draft', error);
    return '';
  }
}

function loadLayoutPreferences(): LayoutPreferences {
  try {
    const stored = window.localStorage.getItem(layoutPreferenceKey);
    if (!stored) return defaultLayoutPreferences;
    const parsed = JSON.parse(stored) as Partial<LayoutPreferences>;

    return {
      isLeftExpanded: parsed.isLeftExpanded ?? defaultLayoutPreferences.isLeftExpanded,
      isRightExpanded: parsed.isRightExpanded ?? defaultLayoutPreferences.isRightExpanded,
      isFocusMode: parsed.isFocusMode ?? defaultLayoutPreferences.isFocusMode,
      leftWidth: clampPanelWidth(parsed.leftWidth ?? defaultLayoutPreferences.leftWidth),
      rightWidth: clampPanelWidth(parsed.rightWidth ?? defaultLayoutPreferences.rightWidth),
    };
  } catch (error) {
    console.warn('Unable to load writing desk layout preferences', error);
    return defaultLayoutPreferences;
  }
}

export function WritingDeskPage() {
  const initialChapterId = chapters[0]?.id ?? '';
  const [chapterId, setChapterId] = useState(initialChapterId);
  const currentChapter = chapters.find((chapter) => chapter.id === chapterId) ?? chapters[0];
  const [draft, setDraft] = useState(() => initialChapterId ? loadDraft(initialChapterId) : '');
  const [layoutPreferences, setLayoutPreferences] = useState(loadLayoutPreferences);
  const detectedTerms = useMemo(() => detectTerms(draft, lexiconTerms), [draft]);
  const { isFocusMode, isLeftExpanded, isRightExpanded, leftWidth, rightWidth } = layoutPreferences;
  const showLeftPanel = isLeftExpanded && !isFocusMode;
  const showRightPanel = isRightExpanded && !isFocusMode;

  useEffect(() => {
    try {
      window.localStorage.setItem(layoutPreferenceKey, JSON.stringify(layoutPreferences));
    } catch (error) {
      console.warn('Unable to save writing desk layout preferences', error);
    }
  }, [layoutPreferences]);

  function updateLayoutPreferences(nextPreferences: Partial<LayoutPreferences>) {
    setLayoutPreferences((current) => ({ ...current, ...nextPreferences }));
  }

  function handleChapterChange(nextChapterId: string) {
    setChapterId(nextChapterId);
    setDraft(loadDraft(nextChapterId));
  }

  function handleToggleLeftPanel() {
    setLayoutPreferences((current) => ({
      ...current,
      isFocusMode: current.isFocusMode ? false : current.isFocusMode,
      isLeftExpanded: current.isFocusMode ? true : !current.isLeftExpanded,
    }));
  }

  function handleToggleRightPanel() {
    setLayoutPreferences((current) => ({
      ...current,
      isFocusMode: current.isFocusMode ? false : current.isFocusMode,
      isRightExpanded: current.isFocusMode ? true : !current.isRightExpanded,
    }));
  }

  if (!currentChapter) {
    return <PageTitle eyebrow="Writing Desk" title="写作台" description="No chapter records are available yet." />;
  }

  return (
    <div className={`animate-fade-in ${isFocusMode ? 'writing-desk-focus-mode' : ''}`}>
      <PageTitle eyebrow="Writing Desk / 写作台" title="Deep Space Creation Cockpit" description="左侧查资料，中间写正文，右侧锁定章节作战目标与当前草稿触发的术语信号。" />
      <WritingDeskToolbar
        isFocusMode={isFocusMode}
        isLeftExpanded={isLeftExpanded}
        isRightExpanded={isRightExpanded}
        onToggleFocusMode={() => updateLayoutPreferences({ isFocusMode: !isFocusMode })}
        onToggleLeft={handleToggleLeftPanel}
        onToggleRight={handleToggleRightPanel}
      />

      <div className="writing-desk-layout flex flex-col gap-5 lg:flex-row lg:items-start">
        {showLeftPanel && (
          <ResizablePanel className="order-2 lg:order-none" side="left" width={leftWidth} minWidth={260} maxWidth={460} onResize={(nextWidth) => updateLayoutPreferences({ leftWidth: nextWidth })}>
            <ArchiveLookupPanel />
          </ResizablePanel>
        )}

        <main className={`writing-desk-editor-column order-1 min-w-0 flex-1 space-y-5 lg:order-none ${isFocusMode ? 'mx-auto w-full max-w-5xl' : ''}`}>
          <DraftEditor chapters={chapters} currentChapter={currentChapter} onChapterChange={handleChapterChange} draft={draft} setDraft={setDraft} isFocusMode={isFocusMode} />
          {!isFocusMode && <DetectedTermsPanel terms={detectedTerms} />}
        </main>

        {showRightPanel && (
          <ResizablePanel className="order-3 lg:order-none" side="right" width={rightWidth} minWidth={280} maxWidth={500} onResize={(nextWidth) => updateLayoutPreferences({ rightWidth: nextWidth })}>
            <ChapterMissionPanel chapter={currentChapter} />
          </ResizablePanel>
        )}
      </div>
    </div>
  );
}
