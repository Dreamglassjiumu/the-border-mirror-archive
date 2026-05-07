import type { Chapter, LexiconTerm } from '../../data';

export function draftKey(chapterId: string) {
  return `border-mirror-draft-${chapterId}`;
}

export function chapterDisplayTitle(chapter: Chapter) {
  return `${chapter.subtitle ? `${chapter.subtitle} · ` : ''}${chapter.title}`;
}

export function countDraft(text: string) {
  const chineseCharacters = text.match(/[\u4e00-\u9fff]/g)?.length ?? 0;
  const englishWords = text.match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)*/g)?.length ?? 0;
  const paragraphs = text.split(/\n+/).map((paragraph) => paragraph.trim()).filter(Boolean).length;

  return {
    roughWords: chineseCharacters + englishWords,
    characters: text.length,
    paragraphs,
  };
}

export function detectTerms(draft: string, terms: LexiconTerm[]) {
  const normalizedDraft = draft.toLowerCase();
  if (!normalizedDraft.trim()) return [];

  return terms.filter((term) => {
    const candidates = [term.chineseName, term.englishName, term.title]
      .map((candidate) => candidate.toLowerCase().trim())
      .filter(Boolean);
    return candidates.some((candidate) => normalizedDraft.includes(candidate));
  });
}
