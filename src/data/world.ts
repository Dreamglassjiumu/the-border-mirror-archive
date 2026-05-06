import type { WorldSystem } from './types';

export const worldSystems: WorldSystem[] = [
  { id: 'material-environment', title: '物质环境系统', englishName: 'Material Environment', layer: 1, category: 'world', spoilerLevel: 'Public', tags: ['读者可见', '环境', '城市'], summary: '被调控的完美自然。气候、城市、营养、交通都像服务一样照料公民。', readerVisible: '乌洛托比亚的天气、交通、居住与营养均由温和而精准的系统照料。', authorOnly: '环境像服务接口一样响应公民，是模拟世界可控性的第一层证据。', entryCount: 12, related: ['天气总是很好', '天幕穹顶'] },
  { id: 'biological-life', title: '生物生命系统', englishName: 'Biological Life', layer: 2, category: 'world', spoilerLevel: 'Foreshadowing', tags: ['生物学', '吞噬', '分裂'], summary: '吞噬、融合、分裂。生命通过吸收而非占有成长。', readerVisible: '公民以融合外部模块、经验与核心的方式成长。', authorOnly: '这种“无隔阂生命”是高维人类对自身社会裂隙的反向设计。', entryCount: 11, related: ['吞噬核心', '分裂繁衍'] },
  { id: 'core-information', title: '核心信息系统', englishName: 'Core Information', layer: 3, category: 'world', spoilerLevel: 'Foreshadowing', tags: ['核心', '记忆', '天职'], summary: '核心决定天职，保存经验，死亡后可被融合。', readerVisible: '核心是身份、经验与职业倾向的交汇点。', authorOnly: '核心标签按功能而非姓名组织，显示个体在代码层被分类。', entryCount: 15, related: ['哲人核心', '核心标签是职业而非姓名'] },
  { id: 'social-order', title: '社会秩序系统', englishName: 'Social Order', layer: 4, category: 'world', spoilerLevel: 'Hidden Truth', tags: ['社会', '欲望设计'], summary: '没有强制，但欲望本身被设计成稳定。', readerVisible: '社会不需要暴力或强制劳动也能维持平衡。', authorOnly: '自由并非被压迫，而是在欲望生成前被驯化。', entryCount: 9, related: ['职业基因'] },
  { id: 'cultural-values', title: '文化价值系统', englishName: 'Cultural Values', layer: 5, category: 'world', spoilerLevel: 'Public', tags: ['文化', '美德'], summary: '完整、融合、舒适、贡献构成乌洛托比亚的美德。', readerVisible: '个体以交融、贡献与被照料的舒适为荣。', authorOnly: '价值观天然排斥“不必要的问题”。', entryCount: 8, related: ['交融'] },
  { id: 'organic-technology', title: '有机技术系统', englishName: 'Organic Technology', layer: 6, category: 'world', spoilerLevel: 'Foreshadowing', tags: ['有机技术', '建筑'], summary: '机器像器官，建筑像组织，城市像巨大的身体。', readerVisible: '乌洛托比亚的基础设施呈现器官般的柔性与自愈。', authorOnly: '城市的有机形态暗示文明是一个可观测、可维护的实验体。', entryCount: 10, related: ['图书馆', '神经树'] },
  { id: 'simulation-layer', title: '高维模拟系统', englishName: 'Simulation Layer', layer: 7, category: 'world', spoilerLevel: 'Hidden Truth', tags: ['作者隐藏', '模拟宇宙'], summary: '整个文明可能是高维人类创造的完美模拟代码。', readerVisible: '读者早期只看到若有若无的精准与重复。', authorOnly: '乌洛托比亚是人类寻找文明解药的理想生命模拟。', entryCount: 6, related: ['高维人类', '不平等社会模拟器'] },
];

export const cosmologyBrief = {
  positioning: '史诗科幻 / 太空歌剧 / 文明实验 / 模拟宇宙 / 哲学科幻',
  twist: '主角所在的完美种族其实是高维人类创造的“完美模拟代码”。',
  partOneTheme: 'What a wonderful world：在完美日常中追踪第一个不必要的问题。',
  ourotopiaDefinition: 'Ourotopia 是横跨超过 14 万颗宜居行星、以循环、融合、永恒与舒适为美德的巨型共同体。',
  experimentPurpose: '高维人类试图在模拟器中创造一种消除了所有隔阂的理想生命形式，用来寻找拯救自身文明的解药。',
};
