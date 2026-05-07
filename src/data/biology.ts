import type { BiologyEntry } from './types';

const biologyRows = [
  ['bio-citizen-body', '公民身体结构', 'Body', '胶质结构、柔性器官与可外挂感官模块构成公民基础身体。', '身体能按生活需要改变局部密度与形态。', '身体不是边界，而是可持续更新的接口。', '柔软、陌生，介于生命与器官系统之间。', 'public', false, ['term-module']],
  ['bio-mouthpart', '口器', 'Organ', '吞噬模块、营养与核心时使用的温和器官。', '用于安全拆解并吸收外部信息。', '吃、学习、悼念与继承在此合一。', '亲密又惊悚。', 'public', false, ['term-phagocytosis']],
  ['bio-tentacles', '触手', 'Organ', '用于绘画、移动、交融与操作有机技术的多用途肢体。', '触手末端可分化为细密感知纤维。', '接触是语言之前的礼仪。', '美感与不适并存。', 'public', false, ['term-communion']],
  ['bio-gel-skin', '胶质皮肤', 'Tissue', '可透光、可调色、可修复的胶质外层。', '承担保护、情绪显色与环境交换。', '情绪透明让误解变少。', '缺少人类式隐私。', 'public', false, ['term-organic-tech']],
  ['bio-visual-module', '视觉模块', 'Module', '可被吞噬并装载的视觉外挂。', '公民可按职业和场景更换感官。', '感知是公共技术，而非天生限制。', '像把眼睛当工具食用。', 'foreshadowing', true, ['term-module', 'term-phagocytosis']],
  ['bio-phagocytosis', '吞噬机制', 'Mechanism', '公民通过吞噬融合外部信息、模块、经验与逝者核心。', '吸收对象被温和拆解为可整合的信息与物质。', '继承、悼念、共享、延续。', '惊悚，近似食用同类遗物。', 'public', true, ['term-phagocytosis', 'term-core-fusion']],
  ['bio-core-fusion', '核心融合', 'Core', '融合核心以获得经验、技能与新的认知倾向。', '核心在个体内部与原核心协调。', '死亡并非终止，而是进入公共生命。', '哀悼与摄食混在一起。', 'foreshadowing', true, ['term-core-fusion', 'term-public-memory']],
  ['bio-division', '分裂繁衍', 'Reproduction', '信息与能量积累到阈值后分裂出新的子体。', '子体继承部分核心倾向，同时拥有独立成长路径。', '繁衍是自我的延伸与释放。', '父母、后代与自我边界不清。', 'public', false, ['term-division']],
  ['bio-vocation-gene', '职业基因', 'Core Program', '公民诞生时核心已带有职业倾向。', '天职倾向被解释为个体自然热爱。', '避免选择焦虑，保证社会协作。', '命运被预设。', 'hidden', true, ['term-vocation-gene']],
  ['bio-post-death-core', '死亡后的核心处理', 'Ritual', '离世后的核心会被配送、保存或捐献。', '核心进入图书馆或配送系统，供其他公民融合。', '个体经验回到共同体。', '庄严，也像社会化回收。', 'foreshadowing', true, ['term-core', 'term-library', 'term-public-memory']],
  ['bio-ecological-flora', '生态菌群', 'Ecosystem', '协助分解、清洁、情绪稳定与模块兼容的微生态。', '菌群是城市与身体之间的翻译层。', '环境与个体不是分开的。', '舒适背后有被管理的感觉。', 'public', true, ['term-organic-tech']],
] as const;

export const biologyEntries: BiologyEntry[] = biologyRows.map(([id, title, type, summary, surface, social, feeling, spoilerLevel, touchesFinalTwist, terms]) => ({
  id,
  title,
  type,
  category: 'biology',
  spoilerLevel,
  tags: ['生物学', type],
  summary,
  details: `${summary} 维护重点：表层是乌洛托比亚生命日常，隐藏层用于追踪自我边界、欲望设计和模拟实验线索。`,
  surfaceExplanation: surface,
  socialMeaning: social,
  humanFeeling: feeling,
  conflicts: ['自我边界是否仍然存在？', '拒绝融合是否被允许？'],
  touchesFinalTwist,
  relatedCharacters: ['谢泼德'],
  relatedChapters: ['chapter-01'],
  relatedTerms: [...terms],
  related: ['谢泼德', '第一章'],
}));
