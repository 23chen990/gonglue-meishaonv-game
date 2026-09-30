import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  auditNarrativeChoices,
  CompetitorResearchSchema,
  IaaMonetizationReviewSchema,
  NarrativeLifePrototypeSchema,
  ProductionCostReviewSchema,
  RunStateSchema,
  resolveNarrativeEnding,
} from '../../../src/schemas/index.js';
import { OpenSourceResearchArtifactSchema } from '../../../src/schemas/open-source-research.js';

const runId = '20260831-010324-village-south-text-v1';
const runRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const artifactsRoot = path.join(runRoot, 'artifacts');
const humanRoot = path.join(runRoot, 'human');
const createdAt = '2026-08-31T01:03:24+08:00';
const revisedAt = '2026-08-31T01:21:07+08:00';
const targetWorkspace = `runs/${runId}/workspace/game`;

type RawStatId = 'household' | 'skill' | 'trust' | 'family';
type VisibleStatId = 'economy' | 'skill' | 'health' | 'bonds';
type Effects = Partial<Record<RawStatId, number>>;
type VisibleEffects = Partial<Record<VisibleStatId, number>>;
type ChoiceRequirements = {
  stats: Partial<Record<VisibleStatId, { min?: number; max?: number }>>;
};
type RawChoice = {
  label: string;
  result: string;
  immediate: Effects;
  flags?: string[];
  echo: string;
  echoEffects: Effects;
};
type RawEvent = {
  year: number;
  title: string;
  body: string;
  sourceIds: string[];
  a: RawChoice;
  b: RawChoice;
};

const sourceRecords = [
  {
    id: 'hist_gaokao',
    kind: 'historical' as const,
    title: '教育部：恢复高考——中国改革的先声',
    url: 'https://www.moe.gov.cn/jyb_xwfb/xw_zt/moe_357/s3580/moe_2448/moe_2470/tnull_41368.html',
    accessedAt: createdAt,
  },
  {
    id: 'hist_rural_reform',
    kind: 'historical' as const,
    title: '中国人大网：农村改革启大幕',
    url: 'https://www.npc.gov.cn/WZWSREL3pncmR3L25wYy9sZnp0L3JseXcvMjAxOC0xMi8yOC9jb250ZW50XzIwNjk0NzkuaHRt',
    accessedAt: createdAt,
  },
  {
    id: 'hist_individual_business',
    kind: 'historical' as const,
    title: '市场监管总局：服务改革开放，企业注册改革勇往直前',
    url: 'https://www.samr.gov.cn/djzcj/gzdt/art/2023/art_84467713b557457c8c5964266941f8da.html',
    accessedAt: createdAt,
  },
  {
    id: 'hist_township_enterprise',
    kind: 'historical' as const,
    title: '国家统计局：乡镇企业异军突起',
    url: 'https://www.stats.gov.cn/zt_18555/ztfx/xzg50nxlfxbg/202303/t20230301_1920444.html',
    accessedAt: createdAt,
  },
  {
    id: 'hist_mobility',
    kind: 'historical' as const,
    title: '国家统计局：农村劳动力流动政策与就业增长',
    url: 'https://www.stats.gov.cn/zt_18555/ztfx/jnggkf30n/202303/t20230301_1920465.html',
    accessedAt: createdAt,
  },
  {
    id: 'hist_special_zones',
    kind: 'historical' as const,
    title: '中国人大网：经济特区与改革开放历程',
    url: 'https://www.npc.gov.cn/zgrdw/npc/xinwen/rdlt/sd/2010-09/27/content_1597319.htm',
    accessedAt: createdAt,
  },
  {
    id: 'comp_life_restart',
    kind: 'competitor' as const,
    title: 'TapTap：人生重开模拟器',
    url: 'https://www.taptap.cn/app/223281',
    accessedAt: createdAt,
  },
  {
    id: 'comp_100m_goal',
    kind: 'competitor' as const,
    title: 'TapTap：一亿小目标',
    url: 'https://www.taptap.cn/app/79900',
    accessedAt: createdAt,
  },
  {
    id: 'comp_contemporary_life',
    kind: 'competitor' as const,
    title: 'TapTap：当代人生',
    url: 'https://www.taptap.cn/app/228286',
    accessedAt: createdAt,
  },
  {
    id: 'comp_work_life',
    kind: 'competitor' as const,
    title: 'App Store：打工生活模拟器',
    url: 'https://apps.apple.com/cn/app/%E6%89%93%E5%B7%A5%E7%94%9F%E6%B4%BB%E6%A8%A1%E6%8B%9F%E5%99%A8-%E6%A8%A1%E6%8B%9F/id1611685440',
    accessedAt: createdAt,
  },
  {
    id: 'policy_taptap_ads',
    kind: 'platform-policy' as const,
    title: 'TapTap 小游戏广告审核规范',
    url: 'https://developer.taptap.cn/minigameapidoc/tap-operation/operation-standards/minigame-ad-policy/',
    accessedAt: createdAt,
  },
];

const rawEvents: RawEvent[] = [
  {
    year: 1978,
    title: '煤油灯下的准考证',
    body: '县里贴出恢复招生考试的消息。白天要下地，夜里只剩半盏煤油，你手里还有一本缺了封面的代数书。',
    sourceIds: ['hist_gaokao'],
    a: {
      label: '把夜里的时间留给书本',
      result: '你托人抄来复习提纲，困了就用凉水洗脸。家里的活落下一点，但你重新相信读书能开一扇门。',
      immediate: { skill: 2, household: -1 },
      flags: ['kept_studying'],
      echo: '两年后，村小学缺代课人，老校长想起你总在灯下做题。',
      echoEffects: { skill: 1, trust: 1 },
    },
    b: {
      label: '先把家里的秋收顶下来',
      result: '你把书压在箱底，陪父亲抢收。粮囤满了一点，心里却总记得那张告示。',
      immediate: { household: 2, family: 1 },
      echo: '后来有人来借你的旧书，你发现自己仍能讲清几道题。',
      echoEffects: { skill: 1 },
    },
  },
  {
    year: 1979,
    title: '分到手的田',
    body: '东坪村讨论把收成责任落到户。有人怕担风险，也有人说庄稼终于能自己盘算。父亲让你表态。',
    sourceIds: ['hist_rural_reform'],
    a: {
      label: '接下最远的那块薄田',
      result: '你画下田界，也把收成好坏背到自家肩上。全家第一次围着一张纸认真算来年。',
      immediate: { household: 2, family: 1 },
      flags: ['took_land_contract'],
      echo: '薄田没有立刻变肥，却逼着你学会记工、看天和留种。',
      echoEffects: { skill: 1, household: 1 },
    },
    b: {
      label: '先跟着邻里合做一年',
      result: '你没有抢先，把力气投进大家商量好的活计里，也把每户的难处看得更清楚。',
      immediate: { trust: 2, family: 1 },
      echo: '来年重新分工时，几户人家愿意听你的折中办法。',
      echoEffects: { trust: 1 },
    },
  },
  {
    year: 1979,
    title: '哑火的手电筒',
    body: '生产队留下的手电筒坏了，夜里巡渠不方便。你在桌上摊开螺丝和铁皮，没人保证还能装回去。',
    sourceIds: ['hist_rural_reform'],
    a: {
      label: '拆开看看毛病在哪',
      result: '你折腾到后半夜，用罐头皮垫住松掉的触片。灯亮时，屋里的人都笑了。',
      immediate: { skill: 3, household: -1 },
      flags: ['learned_repair'],
      echo: '此后坏收音机、旧锁头都被人送来，你的手艺从小物件上长出来。',
      echoEffects: { skill: 1, trust: 1 },
    },
    b: {
      label: '去县里换一支能用的',
      result: '你用两天零工换回一支旧手电，事情办得稳妥，只是没弄懂里面为何会亮。',
      immediate: { household: 1, trust: 1 },
      echo: '手电又坏时，你已知道县里哪家铺子肯给熟人便宜。',
      echoEffects: { trust: 1 },
    },
  },
  {
    year: 1980,
    title: '第一担早菜',
    body: '自留地的早菜比往年多。县城逢集，天不亮就得挑担走二十里，价钱和销路都说不准。',
    sourceIds: ['hist_individual_business', 'hist_rural_reform'],
    a: {
      label: '自己挑到县城试卖',
      result: '你第一次在街边开口叫卖，午前卖掉大半，也记住了什么菜先有人问。',
      immediate: { household: 2, trust: 1 },
      echo: '下个集日，两个老主顾远远就认出你的竹筐。',
      echoEffects: { household: 1, trust: 1 },
    },
    b: {
      label: '卖给进村收货的人',
      result: '价钱低一些，却不用误一天农活。你把现钱交给母亲，家里都松了口气。',
      immediate: { household: 1, family: 2 },
      echo: '收货人后来压过一次价，你开始明白省事也有代价。',
      echoEffects: { skill: 1 },
    },
  },
  {
    year: 1980,
    title: '妹妹的学费',
    body: '妹妹考进县中学，学费、车钱和住处都要花钱。家里刚攒下买化肥的款，父亲整夜没说话。',
    sourceIds: ['hist_gaokao', 'hist_rural_reform'],
    a: {
      label: '先让妹妹把书读下去',
      result: '你推迟买化肥，又接了几趟挑货的活。妹妹把录取通知夹进了家里的账本。',
      immediate: { family: 3, household: -2 },
      flags: ['paid_sibling_tuition'],
      echo: '几年后，妹妹替家里写信、看合同，也替你挡过一次含糊的账。',
      echoEffects: { trust: 1, skill: 1 },
    },
    b: {
      label: '先保住明年的收成',
      result: '你买下化肥，答应妹妹来年再想办法。田里见了起色，饭桌上却安静了许多。',
      immediate: { household: 3, family: -1 },
      echo: '妹妹留在村里帮忙，做事利落，却很少再提县城学校。',
      echoEffects: { household: 1, family: 1 },
    },
  },
  {
    year: 1981,
    title: '暴雨后的田埂',
    body: '一夜暴雨冲开了两段田埂。自家的稻田在进水，隔壁孤寡老人的田口更低。',
    sourceIds: ['hist_rural_reform'],
    a: {
      label: '先喊人一起堵最低的缺口',
      result: '你敲遍半条村，大家先保住连成一片的低田，再回头补各家的埂。',
      immediate: { trust: 3, household: -1 },
      echo: '秋后修水渠时，出工的人比往年齐，没人忘记那场雨。',
      echoEffects: { trust: 1, household: 1 },
    },
    b: {
      label: '先守住自家的秧苗',
      result: '你和父亲抢回大半秧苗，等腾出手时，隔壁的水已经漫过田边。',
      immediate: { household: 2, family: 1 },
      echo: '老人没有责怪你，只在来年换工时少问了一句。',
      echoEffects: { trust: -1, household: 1 },
    },
  },
  {
    year: 1982,
    title: '旧仓房里的机声',
    body: '村外旧仓房改成了农机修配点，师傅招一个肯从扫铁屑做起的学徒，头三个月工钱很少。',
    sourceIds: ['hist_township_enterprise'],
    a: {
      label: '去修配点从学徒做起',
      result: '你白天递扳手，夜里把零件形状画在废纸上，手上的油污总洗不净。',
      immediate: { skill: 3, household: -1 },
      flags: ['learned_machine'],
      echo: '师傅病了一周，你第一次独自让一台停摆的脱粒机重新转动。',
      echoEffects: { skill: 2, trust: 1 },
    },
    b: {
      label: '留在家里把两季庄稼做好',
      result: '你没有去等那份低工钱，靠精细安排换来一季稳收。',
      immediate: { household: 2, family: 1 },
      echo: '修配点后来扩大时，你已经成了常来送活的熟客。',
      echoEffects: { trust: 1 },
    },
  },
  {
    year: 1982,
    title: '县城的摊位证',
    body: '县里开始给固定摊位登记。办证要交费、守时，也意味着你得把卖菜这件事当成正经生意。',
    sourceIds: ['hist_individual_business'],
    a: {
      label: '把名字写进登记簿',
      result: '你按下手印，领到一张薄薄的凭证。以后不必见人就收摊，也得对短斤少两负责。',
      immediate: { trust: 2, household: 1 },
      flags: ['registered_stall'],
      echo: '老顾客愿意把下周要的东西提前告诉你，你第一次有了能预估的生意。',
      echoEffects: { household: 2, trust: 1 },
    },
    b: {
      label: '仍旧逢集才来，卖完就走',
      result: '你省下固定费用，忙完农活才挑货进城，赚多赚少都不压在肩上。',
      immediate: { household: 1, family: 1 },
      echo: '摊位排满以后，你常要在街尾重新找地方。',
      echoEffects: { skill: 1 },
    },
  },
  {
    year: 1983,
    title: '乡镇厂招工表',
    body: '镇上的小厂扩招，做的是农具零件。工钱按月发，但农忙时不能随便回家。',
    sourceIds: ['hist_township_enterprise'],
    a: {
      label: '报名进厂',
      result: '你在表格上写下名字，第一次按钟声上工。稳定工资背后，是每天重复到手臂发酸的工序。',
      immediate: { household: 2, skill: 2, family: -1 },
      flags: ['joined_township_factory'],
      echo: '半年后，领班发现你能听出机器异响，让你开始带新工。',
      echoEffects: { skill: 1, trust: 1 },
    },
    b: {
      label: '留在村里照顾农忙',
      result: '你把招工表让给了别人，家里的春种没误，也继续保有自己安排时间的自由。',
      immediate: { household: 1, family: 2 },
      echo: '厂里的人每月领工资时，你会多看一眼自家粮囤。',
      echoEffects: { household: 1 },
    },
  },
  {
    year: 1983,
    title: '信用社的借条',
    body: '旧木车跑一趟只能拉半担货。信用社愿意贷一笔钱买胶轮车，若两季生意不好，债也不会消失。',
    sourceIds: ['hist_rural_reform', 'hist_individual_business'],
    a: {
      label: '签借条买胶轮车',
      result: '你一笔一画签下名字，车轮滚得轻快，胸口却多了一本每天都要算的账。',
      immediate: { household: 2, skill: 1, trust: -1 },
      flags: ['borrowed_for_cart'],
      echo: '赶上一个好季节，胶轮车把邻村的货也带进县城，借款开始一点点变薄。',
      echoEffects: { household: 2, trust: 1 },
    },
    b: {
      label: '不借钱，继续用旧木车',
      result: '你走得慢些，每趟赚得少些，晚上却不用盯着还款日。',
      immediate: { trust: 1, family: 1 },
      echo: '旧车轴断过一次，你用三天工钱换来一段更结实的木料。',
      echoEffects: { skill: 1, household: 1 },
    },
  },
  {
    year: 1984,
    title: '县城来的一封信',
    body: '堂兄来信说，城里做活的人多起来，修车铺正缺帮手。信末写着：来了不保证留下。',
    sourceIds: ['hist_mobility'],
    a: {
      label: '背上铺盖去试三个月',
      result: '你把回程钱缝进衣角，坐上清晨班车。县城没有给你承诺，只给了一个拥挤铺位。',
      immediate: { skill: 2, family: -1 },
      flags: ['followed_city_letter'],
      echo: '三个月后铺子没留你，但你带回一套做活规矩和几张新地址。',
      echoEffects: { skill: 1, trust: 1 },
    },
    b: {
      label: '回信道谢，等更稳的机会',
      result: '你把信收进木箱，继续做眼前能算清的活。母亲知道后明显安心。',
      immediate: { family: 2, household: 1 },
      echo: '堂兄又寄来一封信，这一次只说城里变化很快。',
      echoEffects: { skill: 1 },
    },
  },
  {
    year: 1984,
    title: '三十里外的送货',
    body: '邻镇有人订了二十件农具，约好后天送到。偏偏家里插秧缺人，晚一天也许就没人买单。',
    sourceIds: ['hist_mobility', 'hist_township_enterprise'],
    a: {
      label: '请邻居帮工，按时送到',
      result: '你付出换工的人情，把货在约定时辰送到。对方没多夸一句，只当场结清了钱。',
      immediate: { trust: 3, household: 1, family: -1 },
      flags: ['kept_delivery_promise'],
      echo: '秋后，那家铺子把你介绍给了更远的一位客人。',
      echoEffects: { trust: 1, household: 1 },
    },
    b: {
      label: '先顾插秧，托人说明晚一天',
      result: '自家秧苗没误时节，订货人却只收了一半，说另一半已经另找了人。',
      immediate: { family: 2, household: 1 },
      echo: '你后来每接一单都会先在日历上画出农忙的日子。',
      echoEffects: { skill: 1, trust: 1 },
    },
  },
  {
    year: 1985,
    title: '南下的硬座票',
    body: '汽车站有人招工去南方，车费要先交一半。你只知道那里厂房多、口音杂，没人认识东坪村。',
    sourceIds: ['hist_mobility', 'hist_special_zones'],
    a: {
      label: '买一张向南的硬座票',
      result: '你带着搪瓷缸、铺盖和家里的地址上了车。窗外的田一块块退到身后。',
      immediate: { skill: 2, household: -1, family: -1 },
      flags: ['went_south'],
      echo: '第一次领到异乡工资时，你终于知道那张车票值多少钱，也知道孤单值多少钱。',
      echoEffects: { household: 2, skill: 1 },
    },
    b: {
      label: '留在镇厂等下次机会',
      result: '你把车费留作家用，在熟悉的机器声里继续上班。远方变成工友口中的故事。',
      immediate: { household: 2, family: 2 },
      echo: '镇厂接到一批新订单，你成了少数能稳住老机器的人。',
      echoEffects: { trust: 1, skill: 1 },
    },
  },
  {
    year: 1986,
    title: '车间里那台旧机器',
    body: '南方车间换了设备，说明书没人看得顺。学新机器要占休息时间，加班则能立刻多拿钱。',
    sourceIds: ['hist_special_zones'],
    a: {
      label: '留下来把说明书啃懂',
      result: '你对着图一点点试，错了就记在烟盒纸背面。几晚后，你能让机器少停一次。',
      immediate: { skill: 3, family: -1 },
      flags: ['studied_machine'],
      echo: '新线开工时，主管把一串钥匙交给你，让你负责交接班。',
      echoEffects: { skill: 2, trust: 1 },
    },
    b: {
      label: '先多加几班把钱寄回家',
      result: '你把能接的班都接了，工资袋厚一些，脑子里仍只有自己那道工序。',
      immediate: { household: 3, family: 1 },
      echo: '旺季过去后，加班减少，你开始借别人的说明书来看。',
      echoEffects: { skill: 1 },
    },
  },
  {
    year: 1986,
    title: '宿舍里的合伙话',
    body: '同宿舍的老周接到一批私活，缺一个懂修理的人。他愿意分账，却不肯把客户地址写下来。',
    sourceIds: ['hist_special_zones', 'hist_individual_business'],
    a: {
      label: '先把分工和分账讲明白',
      result: '你们在饭票背面写下各自负责的事，也约定谁都不能绕开另一人接单。',
      immediate: { trust: 2, household: 1 },
      flags: ['shared_opportunity'],
      echo: '第一单出了返工，老周按约一起赔钱；第二单开始，客户直接来找你们俩。',
      echoEffects: { trust: 2, skill: 1 },
    },
    b: {
      label: '只拿自己的工钱，不问客户',
      result: '你做完手上的部分就收钱，关系简单，也没有机会知道整单生意怎么谈。',
      immediate: { household: 2, trust: 1 },
      echo: '老周后来换了搭档，你偶尔仍替他们解决最难的故障。',
      echoEffects: { skill: 1 },
    },
  },
  {
    year: 1987,
    title: '汇款单与存折',
    body: '这一年工资涨了。家里想修屋顶，你也想攒一笔回乡做事的本钱，两个数写在同一张纸上。',
    sourceIds: ['hist_mobility'],
    a: {
      label: '寄一半，另一半留作本钱',
      result: '你在信里解释了打算，也给自己留下一点能改变方向的钱。父亲回信只有一句：账要算清。',
      immediate: { household: 2, family: 1, trust: 1 },
      flags: ['saved_seed_capital'],
      echo: '屋顶先补了最漏的一角，你的存折则慢慢够买第一套旧工具。',
      echoEffects: { household: 2, skill: 1 },
    },
    b: {
      label: '把大部分钱寄回家修屋顶',
      result: '家里赶在雨季前换好瓦，你的存折几乎清空，心里却踏实。',
      immediate: { family: 3, household: 1 },
      echo: '母亲寄来一张全家站在新屋檐下的照片，你把它放进工具箱。',
      echoEffects: { family: 1, trust: 1 },
    },
  },
  {
    year: 1987,
    title: '停转十分钟',
    body: '工友发现防护罩松了，领班催着赶产量。停线会让整班少做一批货，不停也许什么都不会发生。',
    sourceIds: ['hist_special_zones'],
    a: {
      label: '按下停机，把防护罩固定好',
      result: '车间安静了十分钟，领班脸色难看。你和工友重新开机时，谁都没少一根手指。',
      immediate: { trust: 3, household: -1 },
      flags: ['protected_workers'],
      echo: '月底你没拿到最多奖金，却被安排给新工讲第一堂安全课。',
      echoEffects: { trust: 2, skill: 1 },
    },
    b: {
      label: '先把这一批做完再修',
      result: '机器撑到交班，产量没有落下。你把松动处写在交接本上，整夜没睡稳。',
      immediate: { household: 2, skill: 1 },
      echo: '下一班及时换了螺栓，没人受伤，但工友以后会先自己检查设备。',
      echoEffects: { trust: -1, skill: 1 },
    },
  },
  {
    year: 1988,
    title: '父亲摔了一跤',
    body: '妹妹来信说父亲修屋梁时摔伤，能下地但干不了重活。厂里正准备提你做小组长。',
    sourceIds: ['hist_mobility'],
    a: {
      label: '辞掉提拔，回家照看一季',
      result: '你把工牌交回去，带着行李回到东坪村。父亲骂你傻，吃饭时却把唯一的鸡腿夹给你。',
      immediate: { family: 3, household: -1 },
      flags: ['returned_for_parent'],
      echo: '父亲恢复后，把家里最重要的账和人情都交给你拿主意。',
      echoEffects: { family: 2, trust: 1 },
    },
    b: {
      label: '寄钱请亲戚帮忙，留下接任',
      result: '你寄回药费和工钱，留在厂里带班。每封家书都写得比以前更长。',
      immediate: { household: 2, skill: 2, family: -1 },
      echo: '提拔让你站稳了脚跟，也让你错过父亲重新下地的第一天。',
      echoEffects: { trust: 1, family: 1 },
    },
  },
  {
    year: 1989,
    title: '车站边的修理棚',
    body: '县车站边空出一间漏雨棚，租金不高。你会修车和小电器，但开门第一天不一定有人来。',
    sourceIds: ['hist_individual_business', 'hist_mobility'],
    a: {
      label: '挂起“东坪修理”木牌',
      result: '你用旧门板写了招牌，第一天只修好一把伞。第三天，有人推来一辆链条断掉的自行车。',
      immediate: { skill: 2, household: -1, trust: 1 },
      flags: ['opened_repair_shop'],
      echo: '半年后，候车的人会顺手问一句：师傅，收音机也能看吗？',
      echoEffects: { household: 2, trust: 1 },
    },
    b: {
      label: '去运输站做固定维修工',
      result: '你领一份按月发的工资，不必天天等客，也不能挑自己想接的活。',
      immediate: { household: 2, skill: 1 },
      echo: '运输站的司机都认识你，私下也会带来家里的旧电器。',
      echoEffects: { trust: 1, household: 1 },
    },
  },
  {
    year: 1990,
    title: '要不要添第二间门面',
    body: '隔壁门面要转租，拿下后能摆更多货，也会让租金和进货款同时翻上去。家里刚有一点余钱。',
    sourceIds: ['hist_individual_business'],
    a: {
      label: '添下门面，先只卖熟悉的货',
      result: '你没有追最热闹的商品，只把顾客常问的零件和日用品摆齐。账本从一页变成两页。',
      immediate: { household: 3, trust: 1, family: -1 },
      flags: ['expanded_shop'],
      echo: '新门面头两月没有赚大钱，却让老客不必再跑第二家。',
      echoEffects: { household: 2, trust: 1 },
    },
    b: {
      label: '不扩张，先把欠账收齐',
      result: '你谢绝房东，把赊账一本本理清。铺子仍小，手里的现金却更稳。',
      immediate: { household: 2, trust: 2 },
      echo: '市场冷过一阵时，你没有因为租金关门。',
      echoEffects: { household: 1 },
    },
  },
  {
    year: 1990,
    title: '新法子先教谁',
    body: '你试出一套省水省肥的种法，邻居来问细节。全说出去会少一点自己的先手，也可能让全村一起稳产。',
    sourceIds: ['hist_rural_reform', 'hist_township_enterprise'],
    a: {
      label: '拿半亩田做给大家看',
      result: '你把每道工序和花费都写在木板上，让愿意的人自己比较。没人被要求照做。',
      immediate: { trust: 3, skill: 1 },
      flags: ['shared_new_method'],
      echo: '来年有五户人家改了种法，大家凑钱修了一段共用水渠。',
      echoEffects: { trust: 2, household: 1 },
    },
    b: {
      label: '先在自家再试完整一年',
      result: '你把风险留在自家田里，也把每次用水和收成都记得更细。',
      immediate: { skill: 2, household: 1 },
      echo: '第二年再有人来问时，你拿得出一整年的账。',
      echoEffects: { trust: 1, skill: 1 },
    },
  },
  {
    year: 1991,
    title: '村小学缺一张讲桌',
    body: '村小学漏雨，代课老师也短缺。校长问你能不能每周来两晚，给高年级孩子补算术。',
    sourceIds: ['hist_gaokao', 'hist_rural_reform'],
    a: {
      label: '修讲桌，也来教两晚',
      result: '你把旧木板刨平，晚上站到煤油灯曾照过的那群孩子面前。第一堂课讲的是怎样看一张账。',
      immediate: { skill: 2, trust: 2, family: -1 },
      flags: ['supported_school'],
      echo: '多年后，有学生在县城替你认出了一个算错的小数点。',
      echoEffects: { trust: 2, skill: 1 },
    },
    b: {
      label: '出木料，请别人来教',
      result: '你送去够做讲桌的木料，坦白自己晚上离不开家里的活。',
      immediate: { trust: 1, family: 2 },
      echo: '新讲桌用了很多年，桌角还留着你量尺寸时画错的一道线。',
      echoEffects: { trust: 1 },
    },
  },
  {
    year: 1991,
    title: '三户人家的工具钱',
    body: '三户邻居想合钱办一个小修配组：一家出屋，一家出钱，你出手艺和订单。谁也拿不出足够抵押。',
    sourceIds: ['hist_township_enterprise', 'hist_individual_business'],
    a: {
      label: '把账目贴在墙上，三家一起做',
      result: '你们把工具、工时、损耗都写清，每月底当面核账。争执没有消失，但不再藏在心里。',
      immediate: { trust: 3, household: 1 },
      flags: ['formed_home_workshop'],
      echo: '第一名学徒出师后留在村里，修配组终于不只靠你一个人的双手。',
      echoEffects: { skill: 1, household: 2, trust: 1 },
    },
    b: {
      label: '先各做各的，缺工具再互借',
      result: '你没有把三家的钱拴在一起，合作慢一点，人情也暂时简单。',
      immediate: { family: 1, trust: 1 },
      echo: '订单多时，互借工具常撞期，你们开始重新谈那张合伙账。',
      echoEffects: { skill: 1, trust: 1 },
    },
  },
  {
    year: 1992,
    title: '村口向南',
    body: '一笔生意判断错了，你赔掉多年积蓄的一部分。村口仍有人上车南下，也有人下车回家。你翻到空白账页。',
    sourceIds: ['hist_mobility', 'hist_individual_business'],
    a: {
      label: '记下教训，从最小的活重新做起',
      result: '你没有把亏损撕掉，而是在下一页列出还能用的工具、还肯信你的人和明天能接的第一件活。',
      immediate: { skill: 2, trust: 1, household: -1 },
      flags: ['chose_restart'],
      echo: '后来你不再把“翻身”说成一夜之间，而说成每天把一件事重新做好。',
      echoEffects: { household: 1, trust: 2 },
    },
    b: {
      label: '停下扩张，守住已有的日子',
      result: '你关掉最冒险的一摊生意，把欠款和人情一笔笔结清。日子没有传奇，却重新能睡安稳觉。',
      immediate: { household: 1, family: 2, trust: 1 },
      echo: '村口的车仍来来去去，你不再觉得每一辆都必须赶上。',
      echoEffects: { family: 1, trust: 1 },
    },
  },
];

const routeFlagsByEvent = new Map<number, string>([
  [1, 'kept_studying'],
  [2, 'took_land_contract'],
  [3, 'learned_repair'],
  [5, 'paid_sibling_tuition'],
  [7, 'learned_machine'],
  [8, 'registered_stall'],
  [9, 'joined_township_factory'],
  [10, 'borrowed_for_cart'],
  [11, 'followed_city_letter'],
  [12, 'kept_delivery_promise'],
  [13, 'went_south'],
  [14, 'studied_machine'],
  [15, 'shared_opportunity'],
  [16, 'saved_seed_capital'],
  [17, 'protected_workers'],
  [18, 'returned_for_parent'],
  [19, 'opened_repair_shop'],
  [20, 'expanded_shop'],
  [21, 'shared_new_method'],
  [22, 'supported_school'],
  [23, 'formed_home_workshop'],
  [24, 'chose_restart'],
]);

for (const [eventNumber, flag] of routeFlagsByEvent) {
  if (!rawEvents[eventNumber - 1]?.a.flags?.includes(flag)) throw new Error(`route flag ${flag} is missing from event ${eventNumber}`);
}

const healthImmediateByEvent = new Map<number, { a?: number; b?: number }>([
  [1, { a: -1, b: -1 }],
  [2, { a: -1 }],
  [3, { b: 1 }],
  [4, { a: -1 }],
  [5, { a: -1 }],
  [6, { a: -2, b: -1 }],
  [7, { a: -1 }],
  [8, { a: -1 }],
  [9, { a: -1, b: -1 }],
  [10, { b: 1 }],
  [11, { a: -1 }],
  [12, { a: -1, b: -1 }],
  [13, { a: -2 }],
  [14, { a: -2, b: -2 }],
  [15, { a: -1 }],
  [16, { b: 1 }],
  [17, { a: 1, b: -1 }],
  [18, { a: 1, b: -1 }],
  [19, { a: -1 }],
  [20, { a: -1, b: 1 }],
  [21, { a: -1 }],
  [22, { a: -1, b: 1 }],
  [23, { a: -1 }],
  [24, { b: 1 }],
]);

const healthEchoByEvent = new Map<number, { a?: number; b?: number }>([
  [17, { a: 1, b: -1 }],
  [18, { a: 1 }],
  [24, { b: 1 }],
]);

const gatedChoices = new Map<string, { requirements: ChoiceRequirements; unavailable: string }>([
  ['5:a', { requirements: { stats: { economy: { min: 8 } } }, unavailable: '家底不足，眼下还凑不齐学费。' }],
  ['8:a', { requirements: { stats: { economy: { min: 10 } } }, unavailable: '家底不足，摊位登记和押金还承担不起。' }],
  ['10:a', { requirements: { stats: { bonds: { min: 24 } } }, unavailable: '人情不足，信用社暂时不肯批这笔借款。' }],
  ['13:a', { requirements: { stats: { economy: { min: 15 }, health: { min: 8 } } }, unavailable: '盘缠或身体不足，暂时走不了这趟远路。' }],
  ['14:a', { requirements: { stats: { skill: { min: 12 }, health: { min: 4 } } }, unavailable: '本事或身体不足，暂时啃不下这台新机器。' }],
  ['19:a', { requirements: { stats: { economy: { min: 28 }, skill: { min: 22 } } }, unavailable: '本钱或手艺不足，修理棚还开不起来。' }],
  ['20:a', { requirements: { stats: { economy: { min: 25 }, bonds: { min: 18 } } }, unavailable: '家底或客情不足，扩门面会把日子压垮。' }],
]);

function toVisibleEffects(effects: Effects, healthDelta = 0): VisibleEffects {
  const visible: VisibleEffects = {};
  if (effects.household) visible.economy = effects.household;
  if (effects.skill) visible.skill = effects.skill;
  const bonds = (effects.trust ?? 0) + (effects.family ?? 0);
  if (bonds !== 0) visible.bonds = bonds;
  if (healthDelta !== 0) visible.health = healthDelta;
  return visible;
}

const strings: Record<string, string> = {
  stat_economy: '家底',
  stat_skill: '本事',
  stat_health: '身体',
  stat_bonds: '人情',
  keepsake_book_name: '缺封面的代数书',
  keepsake_book_description: '书页里夹着旧演算纸。开局更有本事，也更容易坚持学习。',
  keepsake_pliers_name: '父亲的旧钳子',
  keepsake_pliers_description: '钳口已经磨平。开局更有本事，也多一点能换钱的手艺。',
  keepsake_address_name: '写着南方地址的信封',
  keepsake_address_description: '地址可能过时，人情仍在。开局多一点人情，也更敢迈出村口。',
  chapter_1_title: '第一章：田埂松动了（1978—1981）',
  chapter_2_title: '第二章：县城街面热起来（1982—1984）',
  chapter_3_title: '第三章：火车开往南边（1985—1988）',
  chapter_4_title: '第四章：回家还是留下（1989—1992）',
};

const events = rawEvents.map((event, offset) => {
  const eventNumber = offset + 1;
  const suffix = String(eventNumber).padStart(2, '0');
  const eventId = `event_${suffix}`;
  strings[`${eventId}_title`] = event.title;
  strings[`${eventId}_body`] = event.body;
  const choices = (['a', 'b'] as const).map((key) => {
    const choice = event[key];
    const gate = gatedChoices.get(`${eventNumber}:${key}`);
    strings[`${eventId}_${key}_label`] = choice.label;
    strings[`${eventId}_${key}_result`] = choice.result;
    strings[`${eventId}_${key}_echo`] = choice.echo;
    if (gate) strings[`${eventId}_${key}_unavailable`] = gate.unavailable;
    return {
      id: `${eventId}_choice_${key}`,
      labelTextId: `${eventId}_${key}_label`,
      resultTextId: `${eventId}_${key}_result`,
      immediateEffects: toVisibleEffects(choice.immediate, healthImmediateByEvent.get(eventNumber)?.[key] ?? 0),
      setFlags: [...(choice.flags ?? []), `${eventId}_${key}_chosen`],
      ...(gate ? {
        requirements: gate.requirements,
        unavailableTextId: `${eventId}_${key}_unavailable`,
      } : {}),
      delayedEcho: {
        trigger: eventNumber === 24 ? 'summary' as const : 'after_events' as const,
        ...(eventNumber === 24 ? {} : { afterEvents: eventNumber === 23 ? 1 : 2 }),
        textId: `${eventId}_${key}_echo`,
        effects: toVisibleEffects(choice.echoEffects, healthEchoByEvent.get(eventNumber)?.[key] ?? 0),
        setFlags: [`${eventId}_${key}_echoed`],
      },
    };
  });
  return {
    id: eventId,
    chapterId: `chapter_${Math.floor(offset / 6) + 1}`,
    year: event.year,
    titleTextId: `${eventId}_title`,
    bodyTextId: `${eventId}_body`,
    sourceIds: event.sourceIds,
    choices,
  };
});

const endingDrafts = [
  {
    id: 'ending_teacher',
    title: '从代课人到乡镇夜校校长',
    summary: '你从煤油灯下的旧课本起步，先在村小学代课，后来把夜班课堂办成乡里的技术夜校。教室从一间扩到三间，来学识字、算账和看图纸的人里，既有年轻人，也有已经当上个体户的老同学。',
    reflection: '你没有去追风口，却把更多人送到了风口前。',
    outcomeProfile: { trajectory: 'UPWARD', economicAgency: 'PUBLIC_SERVICE', geographicReach: 'COUNTY', riskLevel: 'MEDIUM' },
    flags: ['kept_studying', 'supported_school'],
    stats: { skill: { min: 12 } },
    priority: 110,
    path: [1, 22],
  },
  {
    id: 'ending_new_farmer',
    title: '包下荒坡的种养大户',
    summary: '你从责任田的第一本账起步，敢试新种法，也敢把几户人的水渠和销路合起来。后来你承包荒坡，建起养殖棚，旺季请来村里的季节工，成了河湾县最早一批靠土地扩大经营的种养大户。',
    reflection: '你没有离开土地，却把土地做成了自己的事业。',
    outcomeProfile: { trajectory: 'BREAKOUT', economicAgency: 'OWNER', geographicReach: 'COUNTY', riskLevel: 'HIGH' },
    flags: ['took_land_contract', 'shared_new_method'],
    stats: { economy: { min: 10 }, bonds: { min: 14 } },
    priority: 109,
    path: [2, 21],
  },
  {
    id: 'ending_repair_shop',
    title: '机电修理厂老板',
    summary: '从一支坏手电到车站边的修理棚，你把别人不敢接的农机一台台修活。订单越过邻镇后，你租下旧仓房，带出几名学徒，门口终于挂上“东坪机电修理厂”的牌子。',
    reflection: '别人看到的是老板，你记得一切始于第一次敢把机器拆开。',
    outcomeProfile: { trajectory: 'BREAKOUT', economicAgency: 'OWNER', geographicReach: 'REGIONAL', riskLevel: 'HIGH' },
    flags: ['learned_repair', 'opened_repair_shop'],
    stats: { skill: { min: 11 } },
    priority: 108,
    path: [3, 19],
  },
  {
    id: 'ending_family_anchor',
    title: '家书从未断过',
    summary: '你错过过提拔，也推迟过添置，但妹妹读完了书，父亲伤后有人照看。多年后家人提起你，先说的不是赚过多少钱，而是每次难处你都在。',
    reflection: '你成为了家里那根看不见、却一直绷着的绳。',
    outcomeProfile: { trajectory: 'ROOTED', economicAgency: 'HOUSEHOLD', geographicReach: 'VILLAGE', riskLevel: 'LOW' },
    flags: ['paid_sibling_tuition', 'returned_for_parent'],
    stats: { bonds: { min: 18 } },
    priority: 107,
    path: [5, 18],
  },
  {
    id: 'ending_township_technician',
    title: '承包乡镇厂的厂长',
    summary: '你从扫铁屑的学徒做起，摸透了厂里每台老机器。厂子订单下滑时，你押上积蓄接下承包责任，跑销路、改工序、按件算工钱。几年后，旧仓房扩成两排厂房，大家开始叫你厂长。',
    reflection: '你不再只修机器，也开始决定一座厂怎样活下去。',
    outcomeProfile: { trajectory: 'BREAKOUT', economicAgency: 'COLLECTIVE', geographicReach: 'REGIONAL', riskLevel: 'HIGH' },
    flags: ['learned_machine', 'joined_township_factory'],
    stats: { skill: { min: 12 } },
    priority: 106,
    path: [7, 9],
  },
  {
    id: 'ending_store_owner',
    title: '跑南北货的批发商',
    summary: '你从集市边的一只竹筐起步，把摊位做成门面，又第一次坐长途车去南方看货。到九十年代初，县里不少小店都从你的仓库进货，账本上写的不再是一篮菜，而是一车车跨省运来的商品。',
    reflection: '你学会了在价格、眼光和信用之间押注，成了真正的生意人。',
    outcomeProfile: { trajectory: 'BREAKOUT', economicAgency: 'OWNER', geographicReach: 'CROSS_PROVINCE', riskLevel: 'HIGH' },
    flags: ['registered_stall', 'expanded_shop'],
    stats: { economy: { min: 12 }, bonds: { min: 14 } },
    priority: 105,
    path: [8, 20],
  },
  {
    id: 'ending_transport_operator',
    title: '第一支民营车队的老板',
    summary: '一张借条先换来胶轮车，准时送货又换来更多订单。你把赚到的钱押进第一辆旧货车，后来雇了司机、添了第二辆车，路线从邻镇延伸到几个县，东坪村有了第一支私人货运车队。',
    reflection: '你卖的从来不只是运力，也是别人愿意托付整车货物的信用。',
    outcomeProfile: { trajectory: 'BREAKOUT', economicAgency: 'OWNER', geographicReach: 'REGIONAL', riskLevel: 'HIGH' },
    flags: ['borrowed_for_cart', 'kept_delivery_promise'],
    stats: { economy: { min: 10 }, bonds: { min: 15 } },
    priority: 104,
    path: [10, 12],
  },
  {
    id: 'ending_south_supervisor',
    title: '从打工仔到小厂老板',
    summary: '你带着一张硬座票南下，在车间里学机器、盯订单，也看懂了老板怎样算交期和损耗。后来你和两个工友租下小厂房，接来第一批零件单；到一九九二年，门口已经等着十几名来上班的人。',
    reflection: '你曾经站在流水线末端，后来亲手决定一条流水线从哪里开始。',
    outcomeProfile: { trajectory: 'BREAKOUT', economicAgency: 'OWNER', geographicReach: 'CROSS_PROVINCE', riskLevel: 'HIGH' },
    flags: ['went_south', 'studied_machine'],
    stats: { skill: { min: 13 }, health: { min: 2 } },
    priority: 103,
    path: [13, 14],
  },
  {
    id: 'ending_trusted_partner',
    title: '工友合办厂的掌舵人',
    summary: '你把机会分给工友，也曾为安全停下整条线。后来几个人凑钱合办加工厂，最难的不是买机器，而是把出资、分红和伤病责任写清楚。订单起落几次，合伙人仍愿意让你掌舵。',
    reflection: '你证明了敢闯不等于只顾自己，合伙也可以把账写在明处。',
    outcomeProfile: { trajectory: 'BREAKOUT', economicAgency: 'COLLECTIVE', geographicReach: 'REGIONAL', riskLevel: 'HIGH' },
    flags: ['shared_opportunity', 'protected_workers'],
    stats: { bonds: { min: 20 } },
    priority: 102,
    path: [15, 17],
  },
  {
    id: 'ending_return_leader',
    title: '返乡办厂的第一代厂主',
    summary: '你把南方攒下的本钱、订单习惯和机器经验一起带回东坪村。三户人的修配组先接零活，后来扩成小厂，产品卖到外省；曾经送你去车站的人，又把自家孩子送来当学徒。',
    reflection: '你走出村口看见机会，又把一部分机会带回了村口。',
    outcomeProfile: { trajectory: 'BREAKOUT', economicAgency: 'OWNER', geographicReach: 'CROSS_PROVINCE', riskLevel: 'HIGH' },
    flags: ['saved_seed_capital', 'formed_home_workshop'],
    stats: { economy: { min: 11 }, bonds: { min: 18 } },
    priority: 101,
    path: [16, 23],
  },
  {
    id: 'ending_second_start',
    title: '破产后再起的个体老板',
    summary: '县城没有第一次就留下你，后来一笔生意又赔掉大半积蓄。你关过门、躲过债主，也把每笔损失重新写进账本。再开张时店面更小、账更清楚；几年后，人们只记得你是那个倒下后又站起来的老板。',
    reflection: '这个年代允许人突然成功，也允许你在失败后重新定义成功。',
    outcomeProfile: { trajectory: 'RECOVERY', economicAgency: 'SELF_EMPLOYED', geographicReach: 'COUNTY', riskLevel: 'HIGH' },
    flags: ['followed_city_letter', 'chose_restart'],
    stats: { skill: { min: 10 }, bonds: { min: 15 } },
    priority: 100,
    path: [11, 24],
  },
  {
    id: 'ending_ordinary_life',
    title: '在村口把日子过稳',
    summary: '你没有走出一条能被报纸写下的路，却把欠账还清，把家人照顾好，也在每次变化来时做了当时能承担的选择。村口车来车往，你知道普通日子同样需要本事。',
    reflection: '你成为了千千万万没有名字、却真正走过那个年代的人。',
    outcomeProfile: { trajectory: 'ROOTED', economicAgency: 'HOUSEHOLD', geographicReach: 'VILLAGE', riskLevel: 'LOW' },
    flags: [],
    stats: {},
    priority: 0,
    path: [],
    fallback: true,
  },
];

const defaultPath = events.map(({ id }) => `${id}_choice_b`);
const endings = endingDrafts.map((ending) => {
  strings[`${ending.id}_title`] = ending.title;
  strings[`${ending.id}_summary`] = ending.summary;
  strings[`${ending.id}_reflection`] = ending.reflection;
  strings[`${ending.id}_path`] = ending.fallback
    ? '每一张事件卡都选择较稳妥的 B 项，验证普通生活结局不是失败态，而是明确的兜底人生。'
    : `在第 ${ending.path.join('、')} 张事件卡选择 A，其余选择 B，可验证该结局独立可达。`;
  return {
    id: ending.id,
    titleTextId: `${ending.id}_title`,
    summaryTextId: `${ending.id}_summary`,
    reflectionTextId: `${ending.id}_reflection`,
    outcomeProfile: ending.outcomeProfile,
    priority: ending.priority,
    fallback: ending.fallback ?? false,
    conditions: ending.fallback ? {} : { allFlags: ending.flags, stats: ending.stats },
  };
});

const reachability = endingDrafts.map((ending) => ({
  endingId: ending.id,
  choiceIds: defaultPath.map((choiceId, offset) => ending.path.includes(offset + 1) ? events[offset]!.choices[0]!.id : choiceId),
  rationaleTextId: `${ending.id}_path`,
}));

const narrativePrototype = NarrativeLifePrototypeSchema.parse({
  schemaVersion: 1,
  prototypeId: 'village-south-text-v2',
  targetGame: '村口向南',
  targetWorkspace,
  targetPlatforms: ['wechat-minigame', 'douyin-minigame', 'taptap-minigame'],
  prototypeQuestion: '玩家能否在手机上一眼读懂四个状态如何限制选择，并相信改革开放初期的人生既可能扎根，也可能跨省经商、承包办厂或失败后再起？',
  format: 'throwaway_text_spike',
  timeboxMinutes: 180,
  sessionMinutes: { min: 10, max: 15 },
  mobileUiPolicy: {
    visibleStatIds: ['economy', 'skill', 'health', 'bonds'],
    maxPrimaryChoices: 2,
    unavailableChoiceBehavior: 'disabled_with_short_reason',
    hiddenContext: [
      '年代跟随四章自动推进，不占状态栏。',
      '地点、职业、负债和生产资料使用隐藏标签记录，只在相关事件中露出。',
      '每张事件卡固定两个主按钮；条件不足时保留禁用按钮并显示一行短原因。',
    ],
  },
  historicalFrame: {
    startYear: 1978,
    endYear: 1992,
    fictionalSetting: '架空的河湾县东坪村；不使用真实人物和真实村镇作为剧情角色或场景。',
    disclaimers: [
      '人物、村镇、商号与具体遭遇均为原创架空，不影射真实个人。',
      '年代变化依据公开史料校对，但单个家庭的经历不宣称代表所有地区。',
      '不把贫困、升学、务工或经商结果归结为单一品德；每个选择都同时有收益、代价和不可控环境。',
    ],
    sourceIds: ['hist_gaokao', 'hist_rural_reform', 'hist_individual_business', 'hist_township_enterprise', 'hist_mobility', 'hist_special_zones'],
  },
  sources: sourceRecords,
  locale: 'zh-CN',
  strings,
  stats: [
    { id: 'economy', labelTextId: 'stat_economy', initial: 5, min: 0, max: 60 },
    { id: 'skill', labelTextId: 'stat_skill', initial: 5, min: 0, max: 40 },
    { id: 'health', labelTextId: 'stat_health', initial: 12, min: 0, max: 20 },
    { id: 'bonds', labelTextId: 'stat_bonds', initial: 10, min: 0, max: 80 },
  ],
  keepsakes: [
    { id: 'keepsake_book', nameTextId: 'keepsake_book_name', descriptionTextId: 'keepsake_book_description', effects: { skill: 2 }, setFlags: ['keepsake_book'] },
    { id: 'keepsake_pliers', nameTextId: 'keepsake_pliers_name', descriptionTextId: 'keepsake_pliers_description', effects: { skill: 1, economy: 1 }, setFlags: ['keepsake_pliers'] },
    { id: 'keepsake_address', nameTextId: 'keepsake_address_name', descriptionTextId: 'keepsake_address_description', effects: { bonds: 2 }, setFlags: ['keepsake_address'] },
  ],
  chapters: [1, 2, 3, 4].map((chapterNumber) => ({
    id: `chapter_${chapterNumber}`,
    titleTextId: `chapter_${chapterNumber}_title`,
    eventIds: events.slice((chapterNumber - 1) * 6, chapterNumber * 6).map(({ id }) => id),
  })),
  events,
  endings,
  reachability,
  iaaPrototypePolicy: {
    included: false,
    rationale: '本轮只验证“选择—延迟回声—人生结算”是否成立；任何广告都会污染核心玩法的首轮可理解性和再开意愿数据。',
  },
  keepCriteria: [
    '5 名新玩家中至少 4 名能在 30 秒内说清家底、本事、身体、人情各自影响什么。',
    '条件不足的按钮仍可读，且玩家无需打开说明页就能理解为何暂时不可选。',
    '5 名新玩家中至少 4 名在 30 秒内说清“当前收益可能在以后回响”。',
    '5 名新玩家中至少 3 名结算后能复述两次早期选择如何影响后来事件或人生评价。',
    '5 名新玩家中至少 4 名在不看结局列表时，能说出自己可能成为老板、厂长、承包人或跨省生意人，而不只是在原职业中缓慢升迁。',
    '5 名新玩家中至少 3 名不经引导主动点击“再走一次”，或明确说出下一局想改哪两个选择。',
    '单局中位完成时长位于 10—15 分钟，且没有事件卡被多数玩家认为只是同义数值按钮。',
  ],
  killCriteria: [
    '玩家需要同时查看超过四个常驻数值，或一张卡出现超过两个主选择。',
    '禁用按钮只显示数值门槛，玩家不理解它与当前人生处境的关系。',
    '玩家只盯四项数值，不读即时结果和延迟回声。',
    '多数玩家认为结局由最后一张卡决定，无法感受到早期选择的长期作用。',
    '为了让路线可懂而必须在界面上暴露隐藏结局条件。',
    '历史背景只像换皮装饰，去掉年代后体验没有实质变化。',
    '突破型结局少于 6 个，或玩家普遍认为无论怎样选择最终都只会得到一份更稳定的工作。',
  ],
});

const narrativeChoiceAudit = auditNarrativeChoices(narrativePrototype, { sampleRuns: 4096, seed: 1978 });

const competitorResearch = CompetitorResearchSchema.parse({
  schemaVersion: 1,
  market: '中国大陆移动端/小游戏人生模拟、轻经营与生存叙事；来源见 narrative-life-prototype.json 的 competitor sources。',
  competitors: [
    {
      name: '人生重开模拟器',
      positioning: '极低操作门槛的随机人生文本模拟，以天赋、属性分配和快速重开制造传播性。',
      coreLoop: ['选择初始天赋与属性', '按年龄快速阅读随机事件', '查看人生总结并立即重开'],
      monetization: ['移动版公开说明含小广告；玩家评论中广告频率是高频讨论项'],
      strengths: ['30 秒内能理解', '单局短、重开成本低', '极端事件和稀有路线利于分享'],
      weaknesses: ['玩家容易把成败归因于随机表', '中后期事件重复后新鲜感衰减', '广告频率会直接伤害重开节奏'],
    },
    {
      name: '一亿小目标',
      positioning: '以有限寿命内积累一亿元为单一目标的轻量经营人生模拟。',
      coreLoop: ['逐年选择行业、投资与伴侣', '观察资产和机会变化', '在寿命结束时结算财富并重试'],
      monetization: ['广告驱动的移动免费游戏模式；评论区长期讨论广告体验'],
      strengths: ['目标清楚，资产反馈强', '经营选择比纯随机年表更有参与感'],
      weaknesses: ['熟悉最优投资后容易路线固化', '财富成为唯一尺度，人物关系更像加成器'],
    },
    {
      name: '当代人生',
      positioning: '覆盖升学、职业、家庭、经营和代际继承的长线现代人生模拟。',
      coreLoop: ['按年龄推进并培养属性', '参与考试、职业、关系和经营玩法', '结婚生育并通过下一代延续资产'],
      monetization: ['广告用于救济、资源或进程补偿；玩家评价集中出现广告频率与跳转体验'],
      strengths: ['系统面广，人生阶段完整', '职业和经营分支能支撑较长游玩'],
      weaknesses: ['系统多导致学习与内容成本高', '随机事件和亲属互动容易沦为重复操作', '不适合纯 2D 低成本小包体首版照搬'],
    },
    {
      name: '打工生活模拟器',
      positioning: '以城市底层务工、生存压力和逐步改善生活为情绪核心的模拟经营。',
      coreLoop: ['接受工作并完成简单操作', '管理现金、体力和家庭责任', '解锁技能与收入渠道改善处境'],
      monetization: ['免费移动游戏常见广告变现，具体频控需以在架版本实测为准'],
      strengths: ['处境具体，劳动与家庭压力具有情绪重量', '手动工作让赚钱过程更具身体感'],
      weaknesses: ['重复劳动可能变成消耗', '长线系统和小游戏合集显著抬高制作成本'],
    },
  ],
  opportunities: [
    '把人生模拟从“随机年表”改为 24 张有上下文的决定卡，并让关键选择在 2—6 张卡后以人物和关系回响。',
    '将成功定义为本事、信用、亲情和家底的组合，12 个结局不做财富高低榜。',
    '1978—1992 的农村到县城/南方流动提供天然的四章节奏，纯 2D 仍能靠物件和场景变化形成时代感。',
    '用一张“如果当时选另一边”的反事实卡承载自愿激励视频，而不是售卖数值胜利。',
  ],
  risks: [
    '年代题材需要逐条史料校对和内容审核，不能把全国差异压成一条必然进步线。',
    '过多文字会降低小游戏首屏留存，需要每卡正文控制在约 70 字并让结果可扫读。',
    '若结局条件过于透明，玩家会把人物选择优化成刷路线；过于隐藏又会觉得被系统判错。',
    '真实历史节点、人物和地名的使用可能增加平台内容审核风险，因此首版采用架空县村和生活侧切入。',
  ],
  differentiationThesis: '《村口向南》不竞争“大而全的人生系统”，而用 12—15 分钟的一代人生，专注改革开放初期一个农村家庭在土地、手艺、教育、务工、经商与亲情之间的可承担选择；核心卖点是延迟回声和不以财富论英雄的多维人生结算。',
});

const openSourceResearch = OpenSourceResearchArtifactSchema.parse({
  schemaVersion: 1,
  researchId: 'village-south-oss-20260831-v1',
  targetGame: '村口向南',
  targetWorkspace,
  researchedAt: createdAt,
  candidates: [
    {
      name: 'inkjs',
      repositoryUrl: 'https://github.com/y-lohse/inkjs',
      immutableRevision: 'edccead8700e9f21be9825d87d8645d8c82a9936',
      version: '2.4.0',
      directLicenseEvidence: 'https://github.com/y-lohse/inkjs/blob/edccead8700e9f21be9825d87d8645d8c82a9936/LICENSE.md',
      licenseSpdx: 'MIT',
      targetPlatformFit: {
        webLite: { verdict: 'APPROVED', evidence: '官方仓库提供 JavaScript 运行时，适合浏览器文本原型。' },
        wechatMiniGame: { verdict: 'CONDITIONAL', evidence: '无官方微信小游戏适配证据；必须先验证包体、动态加载与无 DOM 环境。' },
        douyinMiniGame: { verdict: 'CONDITIONAL', evidence: '无官方抖音小游戏适配证据；需对目标运行时执行兼容性尖峰。' },
        tapTapMiniGame: { verdict: 'CONDITIONAL', evidence: '无官方 TapTap 小游戏适配证据；不能从浏览器可运行推定可发布。' },
      },
      maintenanceRisk: 'MEDIUM',
      securityRisk: 'LOW',
      attributionDuties: ['在第三方许可清单保留 MIT 许可证与版权声明。'],
      decision: 'REJECT',
      approvedScope: [],
      rationale: 'Ink 的编写体验有价值，但本原型仅 24 个事件，现有原创 JSON 图已足够；在三平台兼容性未验证前引入依赖得不偿失。',
    },
    {
      name: 'Cocos Engine',
      repositoryUrl: 'https://github.com/cocos/cocos-engine',
      immutableRevision: '411f98df047c25902f93440d4b22925c2fb65461',
      version: '3.8.8',
      directLicenseEvidence: 'https://github.com/cocos/cocos-engine/blob/411f98df047c25902f93440d4b22925c2fb65461/LICENSE.md',
      licenseSpdx: 'MIT',
      targetPlatformFit: {
        webLite: { verdict: 'APPROVED', evidence: '官方 3.8 发布文档覆盖 Web 构建，但这不等同于当前工厂 web-lite 模板。' },
        wechatMiniGame: { verdict: 'APPROVED', evidence: 'Cocos Creator 3.8 官方发布面板包含微信小游戏构建目标。' },
        douyinMiniGame: { verdict: 'APPROVED', evidence: 'Cocos Creator 3.8 官方发布面板包含字节系小游戏构建目标。' },
        tapTapMiniGame: { verdict: 'CONDITIONAL', evidence: 'TapTap 文档提供 Cocos 插件接入，仍需版本组合和真机验证。' },
      },
      maintenanceRisk: 'MEDIUM',
      securityRisk: 'MEDIUM',
      attributionDuties: ['分发时保留引擎 MIT 许可证与版权声明。'],
      decision: 'REJECT',
      approvedScope: [],
      rationale: '三端覆盖潜力最高，但仓库当前叙事原型没有 Cocos 2D 模板，且 TapTap 仍依赖额外插件；先做文本验证，不提前锁定高成本工具链。',
    },
    {
      name: 'Phaser',
      repositoryUrl: 'https://github.com/phaserjs/phaser',
      immutableRevision: 'a9965625f49cf366584f454556b039e06e8adad6',
      version: '3.90.0',
      directLicenseEvidence: 'https://github.com/phaserjs/phaser/blob/a9965625f49cf366584f454556b039e06e8adad6/LICENSE.md',
      licenseSpdx: 'MIT',
      targetPlatformFit: {
        webLite: { verdict: 'APPROVED', evidence: '仓库已有 Phaser 依赖，适合浏览器 QA 和交互原型。' },
        wechatMiniGame: { verdict: 'REJECTED', evidence: '未找到该固定版本的官方微信小游戏发布适配与维护承诺。' },
        douyinMiniGame: { verdict: 'REJECTED', evidence: '未找到该固定版本的官方抖音小游戏发布适配与维护承诺。' },
        tapTapMiniGame: { verdict: 'REJECTED', evidence: 'TapTap 官方引擎适配文档未证明 Phaser 3.90.0 可直接产出可发布包。' },
      },
      maintenanceRisk: 'LOW',
      securityRisk: 'LOW',
      attributionDuties: ['分发时保留 Phaser MIT 许可证与版权声明。'],
      decision: 'REJECT',
      approvedScope: [],
      rationale: '适合 web-lite 开发证据，但浏览器构建不能证明微信、抖音和 TapTap 三端可发布，不能作为生产运行时。',
    },
    {
      name: 'Life Restart / remake',
      repositoryUrl: 'https://github.com/VickScarlet/remake',
      immutableRevision: 'a3e81b668e68465afbac70cf7b08aee6b6a89845',
      version: 'commit-20260831',
      directLicenseEvidence: 'https://github.com/VickScarlet/remake/blob/a3e81b668e68465afbac70cf7b08aee6b6a89845/LICENSE',
      licenseSpdx: 'MIT',
      targetPlatformFit: {
        webLite: { verdict: 'APPROVED', evidence: '官方 README 提供浏览器版本的本地运行方式。' },
        wechatMiniGame: { verdict: 'REJECTED', evidence: '当前仓库主线没有固定版本的微信小游戏发布证据。' },
        douyinMiniGame: { verdict: 'REJECTED', evidence: '当前仓库主线没有固定版本的抖音小游戏发布证据。' },
        tapTapMiniGame: { verdict: 'REJECTED', evidence: '当前仓库主线没有固定版本的 TapTap 小游戏发布证据。' },
      },
      maintenanceRisk: 'MEDIUM',
      securityRisk: 'MEDIUM',
      attributionDuties: ['若复用代码须保留 MIT 许可证与版权声明。'],
      decision: 'REJECT',
      approvedScope: [],
      rationale: '它是重要竞品和机制参考，但代码结构紧贴其既有事件、天赋与表现；复用会带来表达相似和内容边界风险，本项目只吸收“短局重开”的通用机制。',
    },
  ],
  conclusion: {
    approvedCandidateNames: [],
    rejectedCandidateNames: ['inkjs', 'Cocos Engine', 'Phaser', 'Life Restart / remake'],
    noSuitablePlatformAdapter: true,
    architectureDecision: '文本尖峰采用仓库自有 Zod 数据契约和纯 TypeScript 结局解析器，零新增生产依赖。若人类评审通过，再单独创建三端运行时兼容性尖峰；在微信、抖音、TapTap 真机与包体测试前不锁定引擎。',
  },
});

const productionCostReview = ProductionCostReviewSchema.parse({
  schemaVersion: 1,
  costBand: 'low',
  prototypeDays: 3,
  productionWeeks: 6,
  teamSize: 2,
  assetEstimate: { characters: 8, environments: 10, ui: 18, audio: 10 },
  technicalRisks: [
    '三端小游戏运行时和广告 API 尚未选型与真机验证，浏览器原型不能替代平台包验证。',
    '中文文本排版、低端机字体内存和多分辨率安全区需尽早做竖屏真机尖峰。',
    '24 张卡的延迟回声与 12 结局容易出现不可达或条件抢占，必须保留机器路径验证。',
    '年代内容审核的返工成本可能高于 2D 资产本身。',
  ],
  scopeCuts: [
    '首版固定 24 张主事件，不做无限随机年表和在线活动事件。',
    '不做自由行走地图、实时经营、种田操作或工作小游戏合集。',
    '不做角色捏脸、配音、多人排行、UGC、云存档和后台服务。',
    '只做 8 个半身人物姿态、10 张可复用年代场景和少量物件叠图。',
    '广告只保留章节断点的自愿线索、结算后的反事实卡与互斥插屏，不做 Banner 和开屏。',
  ],
  recommendation: 'reduce_scope',
  rationale: '纯 2D 与数据驱动事件让首版可控，但跨三平台、历史审核和 12 结局校验仍需要明确预算；先用本轮文本尖峰证明延迟回声和再开意愿，再投入引擎与美术。',
});

const iaaReview = IaaMonetizationReviewSchema.parse({
  schemaVersion: 1,
  audienceFit: '适合偏剧情、怀旧和轻模拟用户；题材可能吸引成年玩家，也必须按未成年人可接触产品设计，不使用现金、红包、焦虑倒计时或道德绑架广告。',
  sessionFit: 'high',
  placements: [
    {
      format: 'rewarded',
      trigger: '完整人生结算后，玩家主动点“看看如果当时选另一边”；只改写一张已选卡并展示反事实短结局，不增加属性或保证稀有结局。',
      playerValue: '满足对关键选择的好奇，同时不抹掉第一次人生记录；广告失败时允许取消，不阻断再开。',
      frequencyCap: '首个人生结算即可出现；每局最多 1 次；若观看，本次结算不再展示插屏。',
    },
    {
      format: 'rewarded',
      trigger: '从第二个人生开始，第二章结束后可主动查看一条未来机会线索；线索不增加属性、不保证特定结局，也不打断当前选择。',
      playerValue: '帮助玩家理解早期选择可能打开的方向，同时保留是否采纳线索的自主权。',
      frequencyCap: '每局最多 1 次；首个人生不展示；与上一条广告至少间隔 6 分钟。',
    },
    {
      format: 'interstitial',
      trigger: '完整人生总结页关闭、返回村口主界面之后的自然断点；仅当本次结算未观看激励视频时展示，绝不插在事件正文、选择确认或延迟回声之间。',
      playerValue: '不交换数值，仅用于维持免费体验；展示后直接回到可操作主界面。',
      frequencyCap: '首个人生完成后即可展示；每局最多 1 次；两次广告间隔不少于 6 分钟；单次会话最多 3 次广告。',
    },
  ],
  deliveryRules: {
    firstRun: 'ENDING_ONLY',
    endingAdPolicy: 'REWARDED_OR_INTERSTITIAL',
    minMinutesBetweenAds: 6,
    maxAdsPerRun: 2,
    maxAdsPerSession: 3,
    targetImpressionsPerCompletedLife: { min: 0.8, max: 1.3 },
  },
  retentionRisk: 'medium',
  revenuePotential: 'medium',
  complianceRisks: [
    'TapTap 规范要求首次启动 60 秒或首关内不展示广告，并要求激励规则事先明确；本方案整段首个人生不在剧情中展示广告，只在完整结算后提供机会。',
    '不得把“改写人生”“回到过去”包装成真实现金、必得成功或能撤销现实损失。',
    '历史与家庭题材的情绪节点不适合紧贴强制广告，必须在总结关闭后的自然断点展示。',
    '微信、抖音、TapTap 的广告组件、频控和审核文案需按提审时最新规则分别复核。',
  ],
  recommendation: 'test_cautiously',
  rationale: '12—15 分钟完整人生提供结算断点，首局结算即可产生一次互斥广告机会；后续人生最多增加一次章节线索，使目标曝光达到每个完整人生 0.8—1.3 次，同时避免在剧情阅读中强插广告。',
});

const completedRecord = (stage: 'COMPETITOR_RESEARCH' | 'OPEN_SOURCE_RESEARCH' | 'PRODUCTION_COST_REVIEW' | 'IAA_MONETIZATION_REVIEW', outputArtifacts: string[], evidence: string[]) => ({
  stage,
  status: 'completed' as const,
  startedAt: createdAt,
  finishedAt: createdAt,
  attempts: 1,
  inputArtifacts: ['input/generate-artifacts.ts'],
  outputArtifacts,
  errors: [],
  evidence,
  providerCalls: { agent: 0, image: 0 },
  tokenUsage: { inputTokens: 0, outputTokens: 0, totalTokens: 0 },
});

const state = RunStateSchema.parse({
  schemaVersion: 1,
  runId,
  runKind: 'game',
  stage: 'WAITING_FOR_PROTOTYPE_APPROVAL',
  status: 'waiting',
  createdAt,
  updatedAt: revisedAt,
  fixAttempts: 0,
  prototypeBatch: 1,
  providerMode: 'mock',
  stages: {
    COMPETITOR_RESEARCH: completedRecord('COMPETITOR_RESEARCH', ['artifacts/competitor-research.json'], ['zod:CompetitorResearchSchema', 'web-research:2026-08-31']),
    OPEN_SOURCE_RESEARCH: completedRecord('OPEN_SOURCE_RESEARCH', ['artifacts/open-source-research.json'], ['zod:OpenSourceResearchArtifactSchema', 'immutable-revisions:git-ls-remote']),
    PRODUCTION_COST_REVIEW: completedRecord('PRODUCTION_COST_REVIEW', ['artifacts/production-cost-review.json'], ['zod:ProductionCostReviewSchema']),
    IAA_MONETIZATION_REVIEW: completedRecord('IAA_MONETIZATION_REVIEW', ['artifacts/iaa-monetization-review.json'], ['zod:IaaMonetizationReviewSchema', 'TapTap-ad-policy:reviewed']),
  },
});

const mobileStatNames: Record<VisibleStatId, string> = {
  economy: '家底',
  skill: '本事',
  health: '身体',
  bonds: '人情',
};

function requirementSummary(requirements: ChoiceRequirements): string {
  return Object.entries(requirements.stats).map(([statId, bounds]) => {
    const label = mobileStatNames[statId as VisibleStatId];
    if (bounds?.min !== undefined) return `${label}≥${bounds.min}`;
    return `${label}≤${String(bounds?.max)}`;
  }).join(' · ');
}

const cardDeck = [
  '# 《村口向南》文本原型评审卡组',
  '',
  `目标工作区（当前保持为空）：\`${targetWorkspace}\``,
  '',
  '手机端只常驻四个状态：家底、本事、身体、人情。年代自动推进；地点、职业、负债和生产资料只作为事件标签出现，不增加顶栏数字。',
  '',
  '玩法：先选一件旧物，然后依次阅读 24 张事件卡。每张固定 A、B 两个主按钮；条件不足的按钮保留但禁用，并显示一行原因。即时结果立刻出现，延迟回声在后续 1—2 张卡或总结时出现。当前文本尖峰不含广告。',
  '',
  ...events.flatMap((event) => {
    const title = strings[event.titleTextId];
    const body = strings[event.bodyTextId];
    return [
      `## ${event.year} · ${title}`,
      '',
      body,
      '',
      ...event.choices.flatMap((choice, index) => {
        const gated = choice.requirements && choice.unavailableTextId
          ? [`条件：${requirementSummary(choice.requirements)}`, '', `不足时：${strings[choice.unavailableTextId]}`, '']
          : [];
        return [
          `${index === 0 ? 'A' : 'B'}. ${strings[choice.labelTextId]}`,
          '',
          ...gated,
          `即时：${strings[choice.resultTextId]}`,
          '',
          `延迟回声：${strings[choice.delayedEcho.textId]}`,
          '',
        ];
      }),
    ];
  }),
  '# 12 种人生结算',
  '',
  ...endings.flatMap((ending) => [
    `## ${strings[ending.titleTextId]}`,
    '',
    strings[ending.summaryTextId],
    '',
    `回望：${strings[ending.reflectionTextId]}`,
    '',
  ]),
].join('\n');

const reviewPage = `# 《村口向南》原型审批页

当前状态：WAITING_FOR_PROTOTYPE_APPROVAL

本轮验证两个问题：玩家能否在手机上一眼理解家底、本事、身体、人情四个状态如何影响选择；以及“选择现在有收益，但会在以后以人物关系或机会回响”是否足够清楚。

请重点看五件事：

1. 四个常驻状态是否仍然太多，或者有两个看起来意义重复？
2. 哪些禁用原因像生硬的数值门槛，而不像当前人生自然形成的限制？
3. 哪三张卡最像真实的人生两难，哪三张卡文字太长或带有说教感？
4. 老板、厂长、承包人、批发商和失败再起等结局是否足够放开，同时没有把发财写成唯一正确人生？
5. 你是否愿意批准进入交互原型；若批准，三端引擎适配必须另做兼容性尖峰。

审批结果请另存为 \`human/prototype-decision.json\`，不要直接修改已验证的原型 JSON。
`;

const mobileSystemDesign = `# 《村口向南》手机端系统收束方案

## 常驻状态：只保留四个

- 家底：合并现金、余粮、负债压力和生产资料价值。
- 本事：合并文化、农技、手艺和经营经验。
- 身体：合并体力、伤病和长期劳损。
- 人情：合并家庭关系、师徒、邻里、客户与信用。

年代随章节自动推进；地点、职业、负债、证件和生产资料只用隐藏标签记录，在相关事件正文中自然露出，不增加常驻数值。

## 单张选择卡

竖屏安全区内从上到下固定为：年份与地点、事件标题、70 字左右正文、四状态变化预览、两个等高主按钮。每张卡恰好两个主选择，不使用横向三按钮。

条件不足时不把选项藏掉，而是保留禁用按钮，并只显示一行生活化原因，例如“盘缠或身体不足，暂时走不了这趟远路”。另一项永远无条件可选，防止流程卡死。

## 系统如何影响选择

- 家底控制学费、登记、车票、开店和扩张。
- 本事控制学机器、开修理棚、教夜课和组织作坊。
- 身体控制远行与高强度学习，透支还会产生延迟伤病回声。
- 人情控制借款、客情、夜课支持和多人合伙。

全 24 张卡中只安排 7 个条件选项，避免每张卡都像检查属性门槛；其余选择通过即时得失、隐藏标签和延迟回声影响后续人生。
`;

const formatEffects = (effects: Partial<Record<VisibleStatId, number>>) => Object.entries(effects)
  .map(([statId, value]) => `${mobileStatNames[statId as VisibleStatId]}${value! > 0 ? '+' : ''}${value}`)
  .join('、');
const redEvents = narrativeChoiceAudit.events.filter(({ status }) => status === 'RED');
const yellowEvents = narrativeChoiceAudit.events.filter(({ status }) => status === 'YELLOW');
const endingTitleById = new Map(narrativePrototype.endings.map((ending) => [ending.id, strings[ending.titleTextId]]));
const breakoutEndingCount = narrativePrototype.endings.filter(({ outcomeProfile }) => outcomeProfile.trajectory === 'BREAKOUT').length;
const ownerEndingCount = narrativePrototype.endings.filter(({ outcomeProfile }) => outcomeProfile.economicAgency === 'OWNER').length;
const crossProvinceEndingCount = narrativePrototype.endings.filter(({ outcomeProfile }) => outcomeProfile.geographicReach === 'CROSS_PROVINCE').length;
const choiceAuditSummary = `# 《村口向南》选择合理性体检

本页不展示剧情正文，只看选择结构和统计结果。

## 一眼结论

- 建议：${narrativeChoiceAudit.summary.recommendation}
- 机器分：${narrativeChoiceAudit.summary.score}/100
- 24 张卡：绿 ${narrativeChoiceAudit.summary.greenEvents} / 黄 ${narrativeChoiceAudit.summary.yellowEvents} / 红 ${narrativeChoiceAudit.summary.redEvents}
- 问题：P1 ${narrativeChoiceAudit.summary.p1Issues} / P2 ${narrativeChoiceAudit.summary.p2Issues} / P3 ${narrativeChoiceAudit.summary.p3Issues}
- 判定口径：有无“标准答案”、门槛是否真能达到、四个系统是否实际参与、按钮与反馈是否适合手机扫读、结局是否过度集中。

## 红灯事件（先改）

${redEvents.length === 0 ? '- 无。' : redEvents.map((event) => [
  `- ${event.year}《${event.title}》：${event.issues.filter(({ priority }) => priority === 'P1').map(({ message }) => message).join('；')}`,
  ...event.choices.map((choice, index) => `  - ${index === 0 ? 'A' : 'B'} ${choice.label}｜${formatEffects(choice.totalEffects) || '无可见数值变化'}${choice.requirement ? `｜条件 ${choice.requirement}` : ''}`),
].join('\n')).join('\n')}

## 黄灯事件（不读剧情也能定位）

${yellowEvents.length === 0 ? '- 无。' : yellowEvents.map((event) => `- ${event.year}《${event.title}》：${event.issues.map(({ code }) => code).join('、')}`).join('\n')}

## 四系统是否真的影响选择

| 系统 | 涉及事件 | 涉及选项 |
|---|---:|---:|
${narrativeChoiceAudit.systemInfluence.map(({ statId, eventCount, choiceCount }) => `| ${mobileStatNames[statId]} | ${eventCount}/24 | ${choiceCount}/48 |`).join('\n')}

## ${narrativeChoiceAudit.simulation.gatedChoiceAvailability.length} 个条件选项的实际可选率

| 选项 | 条件 | 可选率 | 判断 |
|---|---|---:|---|
${narrativeChoiceAudit.simulation.gatedChoiceAvailability.map(({ choiceId, availableRate }) => {
  const event = narrativeChoiceAudit.events.find(({ choices }) => choices.some((choice) => choice.choiceId === choiceId))!;
  const choice = event.choices.find((candidate) => candidate.choiceId === choiceId)!;
  const verdict = availableRate === 0 ? '死门槛' : availableRate < narrativeChoiceAudit.thresholds.rareGateRate ? '太稀有' : availableRate > narrativeChoiceAudit.thresholds.trivialGateRate ? '近乎白送' : '可接受';
  return `| ${event.year}·${choice.label} | ${choice.requirement} | ${(availableRate * 100).toFixed(1)}% | ${verdict} |`;
}).join('\n')}

## 结局可能性谱系

- 突破型：${breakoutEndingCount}
- 经营主导者：${ownerEndingCount}
- 跨省发展：${crossProvinceEndingCount}
- 其他可能：上升型 1、扎根型 2、失败后再起 1
- 判定原则：允许成为老板、厂长、承包人和批发商，也保留家庭、普通生活与创业失败；财富不是唯一正确答案。

## 结局抽样分布

${[...narrativeChoiceAudit.simulation.endingRates].sort((left, right) => right.rate - left.rate).map(({ endingId, rate }) => `- ${endingTitleById.get(endingId)}：${(rate * 100).toFixed(1)}%`).join('\n')}

机器检查只能排除结构性问题，不能判断一个两难是否“打动人”。最终只需让 5 人各看 8 张随机卡，不要求读全剧情：8 秒内做选择、说出影响哪两个系统、说明理由不是单纯“数值更高”，再问是否愿意重开。四项通过规则已写入 JSON 报告。
`;

const artifactFiles: Array<[string, unknown]> = [
  ['narrative-life-prototype.json', narrativePrototype],
  ['narrative-choice-audit.json', narrativeChoiceAudit],
  ['competitor-research.json', competitorResearch],
  ['open-source-research.json', openSourceResearch],
  ['production-cost-review.json', productionCostReview],
  ['iaa-monetization-review.json', iaaReview],
];

await mkdir(artifactsRoot, { recursive: true });
await mkdir(humanRoot, { recursive: true });
for (const [name, artifact] of artifactFiles) {
  await writeFile(path.join(artifactsRoot, name), `${JSON.stringify(artifact, null, 2)}\n`, 'utf8');
}
await writeFile(path.join(runRoot, 'state.json'), `${JSON.stringify(state, null, 2)}\n`, 'utf8');
await writeFile(path.join(humanRoot, 'card-deck.md'), `${cardDeck}\n`, 'utf8');
await writeFile(path.join(humanRoot, 'prototype-review.md'), reviewPage, 'utf8');
await writeFile(path.join(humanRoot, 'mobile-system-design.md'), mobileSystemDesign, 'utf8');
await writeFile(path.join(humanRoot, 'choice-audit-summary.md'), choiceAuditSummary, 'utf8');

const routeEvidence = narrativePrototype.reachability.map((pathEvidence) => {
  const result = resolveNarrativeEnding(narrativePrototype, pathEvidence.choiceIds);
  return {
    expectedEndingId: pathEvidence.endingId,
    resolvedEndingId: result.ending.id,
    finalStats: result.stats,
    choiceCount: pathEvidence.choiceIds.length,
    passed: result.ending.id === pathEvidence.endingId,
  };
});
await writeFile(path.join(runRoot, 'logs', 'reachability-evidence.json'), `${JSON.stringify({ schemaVersion: 1, prototypeId: narrativePrototype.prototypeId, paths: routeEvidence }, null, 2)}\n`, 'utf8');

process.stdout.write(JSON.stringify({
  runId,
  events: narrativePrototype.events.length,
  endings: narrativePrototype.endings.length,
  pathsPassed: routeEvidence.filter(({ passed }) => passed).length,
  artifactFiles: artifactFiles.map(([name]) => name),
}, null, 2));
