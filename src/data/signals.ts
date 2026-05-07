import type { Signal } from './types';

const signalRows = [
  ['signal-weather', '天气总是很好', 'Environmental', '气候调节装置完美运行。', '模拟世界的环境服务化。', 'Low', 'Dormant', ['天幕穹顶'], ['term-sky-dome', 'term-great-day']],
  ['signal-core-label', '核心标签是职业而非姓名', 'Identity', '便于融合者了解核心用途。', '个体被功能化分类。', 'Medium', 'Active', ['核心信息系统'], ['term-core', 'term-vocation-gene']],
  ['signal-library-eye', '图书馆像沉睡的眼睛', 'Institution', '特殊建筑美学。', '核心存储与高维观察系统可能有关。', 'High', 'Hidden', ['图书馆'], ['term-library', 'term-higher-humans']],
  ['signal-philosopher-core', '谢泼德随机获得哲人核心', 'Cognition', '申请制度公平随机。', '系统可能预判或安排了她的认知转变。', 'High', 'Active', ['核心配送署'], ['term-philosopher-core']],
  ['signal-thought-leaf-early', '思维草叶提前抵达', 'Transit', '公共交通调度效率很高。', '交通系统可能先于公民意识完成路线判断。', 'Medium', 'Active', ['思维草叶轨道车'], ['term-thought-leaf', 'term-neural-tree']],
  ['signal-birthday-template', '生日祝福语重复得像模板', 'Language', '公共祝福格式统一。', '幸福叙事可能由系统批量生成。', 'Low', 'Dormant', ['公民广场'], ['term-great-day', 'term-communion']],
  ['signal-no-bad-weather', '没有坏天气的词汇', 'Culture', '公民很少需要描述恶劣气候。', '语言缺口暴露经验边界。', 'Medium', 'Dormant', ['天幕穹顶'], ['term-sky-dome']],
  ['signal-core-delivery-time', '核心配送时间过于恰好', 'Logistics', '配送系统效率极高。', '哲人核心可能不是临时随机，而是被安排在转折点。', 'High', 'Active', ['核心配送署', '居住舱'], ['term-core', 'term-philosopher-core']],
  ['signal-painting-blind-spot', '谢泼德画不出“不舒适”', 'Character', '她缺少相关生活经验。', '完美社会削弱了表达痛苦的能力。', 'Medium', 'Active', ['居住舱', '公民广场'], ['term-great-day']],
  ['signal-public-memory-softness', '公共记忆过于温柔', 'Memory', '图书馆会过滤痛苦记忆以便融合。', '历史可能被处理成可消费经验。', 'High', 'Hidden', ['图书馆'], ['term-public-memory', 'term-library']],
  ['signal-nutrient-pulse', '营养液水道像心跳', 'Infrastructure', '城市基础设施的有机节律。', '城市可能作为单一实验体运行。', 'Low', 'Dormant', ['营养液水道'], ['term-nutrient-canal', 'term-organic-tech']],
  ['signal-unnecessary-question', '不必要的问题第一次出现', 'Cognition', '哲人核心带来思辨副作用。', '系统无法完全吸收没有用途的思想。', 'High', 'Active', ['哲人核心'], ['term-philosopher-core', 'term-inequality-simulator']],
] as const;

export const signals: Signal[] = signalRows.map(([id, title, type, surface, truth, danger, status, settings, terms]) => ({
  id,
  title,
  signalName: title,
  type,
  category: 'signal',
  spoilerLevel: status === 'Hidden' ? 'hidden' : 'foreshadowing',
  tags: ['伏笔', type, status],
  summary: surface,
  details: `表层解释：${surface} 真相方向：${truth}`,
  firstAppearance: 'chapter-01',
  surfaceExplanation: surface,
  trueDirection: truth,
  dangerLevel: danger,
  status,
  isResolved: false,
  relatedSettings: [...settings],
  relatedCharacters: ['谢泼德'],
  relatedChapters: ['chapter-01'],
  relatedTerms: [...terms],
  related: [...settings, '谢泼德'],
}));
