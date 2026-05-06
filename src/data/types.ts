export type SpoilerLevel = 'Public' | 'Foreshadowing' | 'Hidden Truth';
export type ArchiveCategory = 'world' | 'federation' | 'biology' | 'character' | 'plotline' | 'chapter' | 'lexicon' | 'signal' | 'pitch';

export interface ArchiveEntry {
  id: string;
  title: string;
  subtitle?: string;
  category: ArchiveCategory;
  spoilerLevel: SpoilerLevel;
  tags: string[];
  summary: string;
  content?: string;
  related?: string[];
}

export interface WorldSystem extends ArchiveEntry {
  englishName: string;
  layer: number;
  readerVisible: string;
  authorOnly: string;
  entryCount: number;
}

export interface FederationEntry extends ArchiveEntry {
  englishName: string;
  namingSource?: string;
  territory?: string;
  capital?: string;
  socialState?: string;
  resourceSystem?: string;
  citizenLife?: string;
  environmentSystem?: string;
  landmarks?: string[];
  institutions?: string[];
  potentialConflicts?: string[];
  sceneSeeds?: string[];
}

export interface BiologyEntry extends ArchiveEntry {
  type: string;
  surfaceExplanation: string;
  socialMeaning: string;
  humanFeeling: string;
  conflicts: string[];
  relatedCharacters: string[];
  relatedChapters: string[];
  touchesFinalTwist: boolean;
}

export interface Character extends ArchiveEntry {
  name: string;
  englishName: string;
  age: string;
  species: string;
  birthplace: string;
  vocation: string;
  currentCore: string;
  desire: string;
  fear: string;
  falseBelief: string;
  arc: string;
  knows: string[];
  doesNotKnow: string[];
  thematicQuestion: string;
  relatedChapters: string[];
  relatedSettings: string[];
  keyLines: string[];
  cognitiveStability: number;
  anomalyIndex: number;
}

export interface Plotline extends ArchiveEntry {
  type: string;
  status: string;
  start: string;
  midpoint: string;
  end: string;
  relatedChapters: string[];
  relatedCharacters: string[];
  relatedSettings: string[];
  unresolvedQuestions: string[];
  foreshadowing: string[];
  finalReveal: string;
}

export interface Chapter extends ArchiveEntry {
  part: string;
  status: string;
  synopsis: string;
  worldbuilding: string[];
  conflict: string;
  foreshadowing: string[];
  sheppardChange: string;
  endingHook: string;
  draftPlaceholder: string;
}

export interface LexiconTerm extends ArchiveEntry {
  chineseName: string;
  englishName: string;
  type: string;
  surfaceMeaning: string;
  hiddenMeaning: string;
  firstChapter: string;
  isSpoiler: boolean;
  relatedPages: string[];
}

export interface Signal extends ArchiveEntry {
  signalName: string;
  type: string;
  firstAppearance: string;
  surfaceExplanation: string;
  trueDirection: string;
  dangerLevel: 'Low' | 'Medium' | 'High';
  status: 'Dormant' | 'Active' | 'Resolved' | 'Hidden';
  isResolved: boolean;
  resolvedChapter?: string;
  relatedSettings: string[];
  relatedCharacters: string[];
}

export interface Pitch extends ArchiveEntry {
  logline: string;
  pitch100: string;
  pitch300: string;
  synopsis1000: string;
  keywords: string[];
  comps: string[];
  authorNotes: string;
}
