import type { Plotline } from './types';

const make = (
  id: string,
  title: string,
  type: string,
  summary: string,
  finalReveal: string,
  spoilerLevel: 'foreshadowing' | 'hidden' = 'foreshadowing',
): Plotline => ({
  id,
  title,
  type,
  category: 'plotline',
  spoilerLevel,
  tags: ['剧情线', type, '长期维护'],
  summary,
  details: `${summary} 这条线用于维护第一部和系列后续的因果推进、伏笔回收与认知递进。`,
  status: 'Active / 规划中',
  start: '完美日常被一个微小异常打断。',
  midpoint: '谢泼德开始把舒适识别为被设计的稳定。',
  end: '线索汇入“不平等社会模拟器”和高维实验真相。',
  relatedChapters: ['chapter-01'],
  relatedCharacters: ['谢泼德'],
  relatedSettings: ['乌洛托比亚', '核心系统', '图书馆'],
  relatedTerms: ['term-philosopher-core', 'term-inequality-simulator', 'term-higher-humans'],
  unresolvedQuestions: ['随机是否存在？', '拒绝是否被允许？', '无痛是否等于完整？'],
  foreshadowing: ['天气总是很好', '核心标签是职业而非姓名', '图书馆像沉睡的眼睛'],
  finalReveal,
  related: ['谢泼德', '第一部'],
});

export const plotlines: Plotline[] = [
  make('plot-series-main', '全系列主线', 'Series Mainline', '从完美文明的内部裂缝追踪到高维人类的文明实验。', '乌洛托比亚是人类写下的一段理想代码。', 'hidden'),
  make('plot-part-one-main', '第一部主线', 'Part One', '谢泼德在生日与哲人核心之后，第一次怀疑完美世界。', '完美世界并非自然终点，而是一种可运行假设。'),
  make('plot-sheppard-arc', '谢泼德人物线', 'Character Arc', '画家的感知转向哲人的思辨，热爱转化为怀疑。', '她必须决定是否保留痛苦带来的自我厚度。'),
  make('plot-philosopher-core', '哲人核心线', 'Core Line', '哲人核心不断生成无用而危险的问题。', '核心不是随机奖赏，而是一次认知干预。'),
  make('plot-library-line', '图书馆线', 'Institution Line', '图书馆从公共记忆机构逐渐显露观察接口的阴影。', '图书馆可能连接高维观察系统。', 'hidden'),
  make('plot-inequality-simulator', '不平等社会模拟器线', 'Simulator Line', '谢泼德开启一个被完美社会视为无用的痛苦模型。', '模拟器指向高维人类真实历史。', 'hidden'),
  make('plot-reader-cognition', '读者认知推进线', 'Reader Cognition', '让读者先爱上完美，再意识到完美的贫瘠。', '读者与谢泼德同步理解：无痛并不等于完整。'),
];
