import type { ReactNode } from 'react';
import type { ArchiveEntry } from '../data';
import { biologyEntries, chapters, characters, cosmologyBrief, federationEntries, lexiconTerms, pitches, plotlines, signals, worldSystems } from '../data';
import { allEntries } from '../utils/archive';
import { ArchiveCard } from '../components/ArchiveCard';
import { OrbitSystemMap } from '../components/OrbitSystemMap';
import { CharacterDossier } from '../components/CharacterDossier';
import { PlotlineTimeline } from '../components/PlotlineTimeline';
import { LexiconTable } from '../components/LexiconTable';
import { SignalRadar } from '../components/SignalRadar';
import { PitchPanel } from '../components/PitchPanel';
import { PageTitle } from '../components/AppShell';

type Props = { onSelect: (entry: ArchiveEntry) => void; pins: string[]; togglePin: (id: string) => void };
const CardGrid = ({ entries, onSelect, pins, togglePin }: Props & { entries: ArchiveEntry[] }) => <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{entries.map((entry) => <ArchiveCard key={entry.id} entry={entry} onSelect={() => onSelect(entry)} pinned={pins.includes(entry.id)} onPin={() => togglePin(entry.id)} />)}</div>;

export function CommandDeck(props: Props) {
  const pinned = allEntries.filter((entry) => props.pins.includes(entry.id));
  return <div className="animate-fade-in"><section className="rounded-[2.5rem] border border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(218,188,111,.16),transparent_35%),rgba(255,255,255,.045)] p-7 md:p-10"><p className="text-xs uppercase tracking-[0.5em] text-stardust">Archive Access Granted</p><h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-7xl">The Border Mirror Archive</h1><h2 className="mt-4 text-2xl text-cyan-100/80">《边镜》宇宙档案馆</h2><p className="mt-8 max-w-3xl text-xl leading-10 text-slate-200">一个完美文明中的艺术家，在获得哲人的思辨力后，开始怀疑完美是否只是另一种被设计好的贫瘠。</p><div className="mt-8 grid gap-3 md:grid-cols-3"><Status label="第一部" value="What a wonderful world" /><Status label="当前章节" value="第一章 Another Great Day in Ourotopia" /><Status label="当前阶段" value="生日庆典前夕 / 哲人核心待融合" /></div></section><OrbitSystemMap systems={worldSystems} onSelect={props.onSelect} /><section className="mb-8 grid gap-5 lg:grid-cols-2"><Panel title="重点条目 / Recently Edited"><CardGrid entries={pinned} {...props} /></Panel><Panel title="伏笔警戒区 / Signal Detected"><div className="space-y-3">{signals.map((signal) => <button key={signal.id} onClick={() => props.onSelect(signal)} className="w-full rounded-2xl border border-amber-200/15 bg-amber-300/[0.045] p-4 text-left text-slate-200 hover:border-amber-200/40"><span className="text-xs uppercase tracking-[0.25em] text-amber-100/50">{signal.status}</span><p className="mt-1">{signal.signalName}</p></button>)}</div></Panel></section></div>;
}
function Status({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-xs uppercase tracking-[0.25em] text-cyan-100/45">{label}</p><p className="mt-2 text-sm text-white">{value}</p></div>; }
function Panel({ title, children }: { title: string; children: ReactNode }) { return <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5"><h2 className="mb-5 text-xl font-semibold text-white">{title}</h2>{children}</section>; }

export function CosmologyPage(props: Props) { return <div><PageTitle eyebrow="Cosmology" title="世界观总纲" description="《边镜》的文明结构、终极反转与七个底层系统。" /><div className="grid gap-4 md:grid-cols-2"><Panel title="Reader-Visible Layer"><p className="leading-8 text-slate-300">作品定位：{cosmologyBrief.positioning}<br />第一部主题：{cosmologyBrief.partOneTheme}<br />乌洛托比亚定义：{cosmologyBrief.ourotopiaDefinition}</p></Panel><Panel title="Author-Only Layer"><p className="leading-8 text-red-100/80">终极反转：{cosmologyBrief.twist}<br />实验目的：{cosmologyBrief.experimentPurpose}</p></Panel></div><OrbitSystemMap systems={worldSystems} onSelect={props.onSelect} /><CardGrid entries={worldSystems} {...props} /></div>; }
export function FederationPage(props: Props) { return <div><PageTitle eyebrow="Civilization Record" title="Ourotopia Federation" description="星际文明百科与帝国档案：地点、机构、交通、公共生活与潜在冲突。" /><div className="grid gap-6 lg:grid-cols-[220px_1fr]"><aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300">{['文明','地点','机构','基础设施','交通'].map((x)=><p key={x} className="rounded-2xl px-3 py-2 hover:bg-white/5">{x}</p>)}</aside><CardGrid entries={federationEntries} {...props} /></div></div>; }
export function BiologyPage(props: Props) { return <div><PageTitle eyebrow="Core Memory Index" title="Biology & Core System" description="吞噬、融合、分裂与职业基因共同构成乌洛托比亚生命逻辑。" /><CardGrid entries={biologyEntries} {...props} /></div>; }
export function CharactersPage(props: Props) { return <div><PageTitle eyebrow="Lifeform Scan" title="Characters" description="人物档案以生命体扫描记录呈现核心状态、认知稳定度与异常指数。" />{characters.map((c) => <CharacterDossier key={c.id} character={c} onSelect={props.onSelect} />)}</div>; }
export function PlotlinesPage(props: Props) { return <div><PageTitle eyebrow="Orbital Narrative" title="Plotlines" description="主线、人物线、伏笔线与读者认知推进线以星轨时间线组织。" /><PlotlineTimeline plotlines={plotlines} onSelect={props.onSelect} /></div>; }
export function ChaptersPage(props: Props) { return <div><PageTitle eyebrow="Chapter Atlas" title="Chapters" description="章节规划、世界观展示、冲突、伏笔与正文草稿占位。" /><CardGrid entries={chapters} {...props} /></div>; }
export function LexiconPage(props: Props) { return <div><PageTitle eyebrow="Lexicon" title="术语表" description="可通过顶部全局搜索与分类过滤检索术语、隐藏含义与首次出现章节。" /><LexiconTable terms={lexiconTerms} onSelect={props.onSelect} /></div>; }
export function SignalsPage(props: Props) { return <div><PageTitle eyebrow="Deep Space Anomaly Station" title="Signals" description="伏笔与异常清单：Dormant / Active / Resolved / Hidden。" /><SignalRadar signals={signals} onSelect={props.onSelect} /></div>; }
export function PitchesPage(_props: Props) { return <div><PageTitle eyebrow="External Packet" title="Pitches" description="对外材料、关键词、对标作品与作者备注。" /><PitchPanel pitch={pitches[0]} /></div>; }
