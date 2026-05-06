import type { LexiconTerm } from './types';

const terms = [
  ['边镜','The Border Mirror','作品','边界与镜像：完美文明映照人类自身。','模拟与真实彼此成镜。','第一章',true],
  ['乌洛托比亚','Ourotopia','文明','Ouroboros + Utopia，循环而完美的联邦。','完美本身是实验条件。','第一章',false],
  ['核心','Core','机制','保存经验、天职与可融合信息。','代码化身份索引。','第一章',true],
  ['哲人核心','Philosopher Core','核心','生成思辨力的特殊核心。','认知偏移触发器。','第一章',true],
  ['思维草叶','Thought Leaf','交通','叶片状轨道车。','预测式路径安排。','第一章',false],
  ['神经树','Neural Tree','基础设施','城市中的有机通信结构。','可能是观察网络节点。','第一章',true],
  ['天幕穹顶','Sky Dome','地点','控制天气与天光。','环境服务化接口。','第一章',true],
  ['图书馆','Library','机构','核心存储与公共记忆中心。','高维观察系统的伪装。','第一章',true],
  ['公民广场','Civic Plaza','地点','庆典与公共仪式场所。','个体同步进入共同体叙事。','第一章',false],
  ['不平等社会模拟器','Inequality Simulator','模拟器','用于理解不平等社会的模型。','通往人类真实历史。','后续章节',true],
  ['高维人类','Higher-Dimensional Humans','隐藏真相','尚未被读者直接识别的创造者。','乌洛托比亚的实验设计者。','后续章节',true],
  ['交融','Communion','文化','公民间的经验、身体与信息共享。','无隔阂理想的社会礼仪。','第一章',false],
  ['分裂','Division','繁衍','个体积累到阈值后生成子体。','可控增长算法。','后续章节',false],
] as const;

export const lexiconTerms: LexiconTerm[] = terms.map(([cn,en,type,surface,hidden,chapter,spoiler], index) => ({
  id: `term-${index + 1}`, title: `${cn} / ${en}`, chineseName: cn, englishName: en, type, surfaceMeaning: surface, hiddenMeaning: hidden, firstChapter: chapter, isSpoiler: spoiler, category: 'lexicon', spoilerLevel: spoiler ? 'Foreshadowing' : 'Public', tags: ['术语', type, spoiler ? '伏笔' : '读者可见'], summary: surface, relatedPages: ['Cosmology'], related: ['第一章'],
}));
