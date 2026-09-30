export type StatId = 'economy' | 'skill' | 'health' | 'bonds';
export type StatBlock = Record<StatId, number>;
export interface FamilyCondition { id:string; name:string; summary:string; effects:Partial<StatBlock>; setFlag:string }
export interface Keepsake { id:string; name:string; description:string; effects:Partial<StatBlock>; flag:string }
export interface ChoiceRequirement { stats?:Partial<Record<StatId,{min?:number;max?:number}>>; flags?:string[] }
export interface Choice { id:string; label:string; result:string; immediateEffects:Partial<StatBlock>; delayedEcho:{afterEvents:number;text:string;effects:Partial<StatBlock>;setFlags:string[]}; requirements?:ChoiceRequirement; unavailable:string; setFlags:string[]; qualificationFlags:string[] }
export interface StoryEvent { id:string; slot:number; year:number; title:string; body:string; choices:Choice[] }
export const CHAPTER_TITLE='第一章 · 村口向南';
export const CHAPTER_YEARS='1978—1982';
export const STAT_DEFINITIONS=[
  {id:'economy',label:'家底',initial:5,min:0,max:20},
  {id:'skill',label:'本事',initial:5,min:0,max:20},
  {id:'health',label:'筋骨',initial:12,min:0,max:20},
  {id:'bonds',label:'乡情',initial:10,min:0,max:20},
] as const;
const choice=(id:string,label:string,result:string,immediateEffects:Partial<StatBlock>,echoText:string,echoEffects:Partial<StatBlock>,setFlags:string[],requirements?:ChoiceRequirement):Choice=>({id,label,result,immediateEffects,delayedEcho:{afterEvents:2,text:echoText,effects:echoEffects,setFlags:[`${id}_echoed`]},requirements,unavailable:requirements?'家底不足，眼下还凑不齐学费。':'',setFlags,qualificationFlags:requirements?['tuition_gate']:[]});
const event=(id:string,slot:number,year:number,title:string,body:string,a:Choice,b:Choice):StoryEvent=>({id,slot,year,title,body,choices:[a,b]});
export const FAMILY_CONDITIONS:FamilyCondition[]=[
 {id:'condition_county_relative',name:'县城亲戚递来一封信',summary:'表叔在县城供销社做事，说有机会就去见见世面。',effects:{economy:1,skill:1},setFlag:'county_connection'},
 {id:'condition_fertilizer_debt',name:'家里欠着一笔化肥钱',summary:'春耕前的账还没结清，每一粒粮都得先算成本。',effects:{economy:-1,skill:1},setFlag:'fertilizer_debt'},
 {id:'condition_old_craft',name:'爷爷留下修理手艺',summary:'一盒旧螺丝和几把钳子，成了家里不值钱却有用的传家物。',effects:{skill:2,economy:-1},setFlag:'old_craft'},
 {id:'condition_studious_sister',name:'妹妹读书很争气',summary:'她把借来的课本翻得起毛，家里第一次认真谈起“读出去”。',effects:{bonds:2,skill:1},setFlag:'studious_sister'},
 {id:'condition_distant_field',name:'分到一块远田',summary:'田远，水也远，但地契上的名字第一次写着自家。',effects:{economy:1,health:-1},setFlag:'distant_field'},
 {id:'condition_southern_letter',name:'南边寄来招工消息',summary:'信封里夹着一张地址：南方缺人，肯吃苦就能挣现钱。',effects:{skill:1,bonds:-1},setFlag:'southern_letter'},
];
export const KEEPSAKES:Keepsake[]=[
 {id:'keepsake_book',name:'缺封面的代数书',description:'书页薄，算式硬；它让夜里有一盏不太亮的灯。',effects:{skill:2,health:-1},flag:'keepsake_book'},
 {id:'keepsake_pliers',name:'爷爷的旧钳子',description:'钳口已经磨圆，但握在手里，什么都像能修。',effects:{skill:1,bonds:1},flag:'keepsake_pliers'},
 {id:'keepsake_address',name:'南方招工地址',description:'一张折了四道的纸，指向还没去过的地方。',effects:{economy:1,bonds:-1},flag:'keepsake_address'},
];
export const CHAPTER_EVENTS:StoryEvent[]=[
 event('event_01',1,1978,'煤油灯下的准考证','县里贴出恢复招生考试的消息。白天要下地，夜里只剩半盏煤油，你手里还有一本缺了封面的代数书。',choice('event_01_choice_a','把夜里的时间留给书本','你把灯芯拧到最亮，白天的困乏换来几页真正属于自己的路。',{economy:-1,skill:2,health:-1},'两年后，村小学缺代课人，老校长想起你总在灯下做题。',{skill:1,bonds:1},['kept_studying','event_01_a_chosen']),choice('event_01_choice_b','先把家里的秋收顶下来','你把准考证压在粮袋底下，先让家里过完这一季。',{economy:2,bonds:1,health:-1},'后来有人来借你的旧书，你发现自己仍能讲清几道题。',{skill:1,bonds:1},['kept_harvest','event_01_b_chosen'])),
 event('event_02',2,1979,'分到手的田','东坪村讨论把收成责任落到户。有人怕担风险，也有人说庄稼终于能自己盘算。父亲让你表态。',choice('event_02_choice_a','接下最远的那块薄田','你接下薄田，也接下了每一场天候和收成的风险。',{economy:2,bonds:1,health:-1},'薄田没有立刻变肥，却逼着你学会记工、看天和留种。',{economy:1,skill:1},['took_land_contract','event_02_a_chosen']),choice('event_02_choice_b','先跟着邻里合做一年','你和几户人家把农具、劳力和收成放在一张账上。',{bonds:3},'来年重新分工时，几户人家愿意听你的折中办法。',{bonds:1,skill:1},['shared_land','event_02_b_chosen'])),
 event('event_03',3,1980,'哑火的手电筒','生产队留下的手电筒坏了，夜里巡渠不方便。你在桌上摊开螺丝和铁皮，没人保证还能装回去。',choice('event_03_choice_a','拆开看看毛病在哪','你在煤油灯下拆开线路，第一次知道手艺能换来信任。',{economy:-1,skill:3},'此后坏收音机、旧锁头都被人送来，你的手艺从小物件上长出来。',{skill:1,bonds:1},['learned_repair','event_03_a_chosen']),choice('event_03_choice_b','去县里换一支能用的','你花钱买回一支亮堂的手电，也记住了县城的铺面和价钱。',{economy:1,bonds:1,health:1},'手电又坏时，你已知道县里哪家铺子肯给熟人便宜。',{bonds:1,skill:1},['bought_tool','event_03_b_chosen'])),
 event('event_04',4,1981,'第一担早菜','自留地的早菜比往年多。县城逢集，天不亮就得挑担走二十里，价钱和销路都说不准。',choice('event_04_choice_a','自己挑到县城试卖','你挑着菜进城，第一次看见自己的汗水直接换成钞票。',{economy:2,bonds:1,health:-1},'下个集日，两个老主顾远远就认出你的竹筐。',{economy:1,bonds:1},['tested_county_market','event_04_a_chosen']),choice('event_04_choice_b','卖给进村收货的人','你少走一趟路，收货人也答应下次照旧来村口。',{economy:1,bonds:2},'收货人后来压过一次价，你开始明白省事也有代价。',{skill:1,economy:1},['accepted_village_buyer','event_04_b_chosen'])),
 event('event_05',5,1982,'妹妹的学费','妹妹考进县中学，学费、车钱和住处都要花钱。家里刚攒下买化肥的款，父亲整夜没说话。',choice('event_05_choice_a','先让妹妹把书读下去','你把化肥钱拆出一部分，送妹妹坐上去县城的班车。',{economy:-2,bonds:3,health:-1},'几年后，妹妹替家里写信、看合同，也替你挡过一次含糊的账。',{skill:1,bonds:1},['funded_sister','event_05_a_chosen'],{stats:{economy:{min:8}}}),choice('event_05_choice_b','先保住明年的收成','你把钱留在地里，妹妹留下来帮忙，家里先稳住一季。',{economy:3,bonds:-1},'妹妹留在村里帮忙，做事利落，却很少再提县城学校。',{economy:1,bonds:1},['protected_harvest','event_05_b_chosen'])),
 event('event_06',6,1982,'暴雨后的田埂','一夜暴雨冲开了两段田埂。自家的稻田在进水，隔壁孤寡老人的田口更低。',choice('event_06_choice_a','先喊人一起堵最低的缺口','你先把最危险的缺口堵住，回头时自家田也还剩半片秧苗。',{economy:-1,bonds:3,health:-2},'秋后修水渠时，出工的人比往年齐，没人忘记那场雨。',{economy:1,bonds:1},['helped_neighbors','event_06_a_chosen']),choice('event_06_choice_b','先守住自家的秧苗','你守住自家的田口，至少明年的口粮有了着落。',{economy:2,bonds:1,health:-1},'老人没有责怪你，只在来年换工时少问了一句。',{economy:1,bonds:-1},['protected_own_field','event_06_b_chosen'])),
 event('event_01_alt_agritech',1,1978,'县农技站的听课证','农技站来人讲密植和留种，名额只有一个。父亲说，听懂了未必就能种出来。',choice('event_01_alt_choice_a','拿着听课证进城','你把新法记满一页纸，回来先在自家地边试一垄。',{skill:2,economy:1,health:-1},'试验田第二年长得齐，邻里开始来问你行距。',{skill:1,bonds:1},['learned_agritech','event_01_alt_a_chosen']),choice('event_01_alt_choice_b','把名额让给种田老把式','你留下来多干一天活，也换来老人把看天的经验教给你。',{bonds:2,health:1},'后来村里试新种，老人把你的名字写进了记工本。',{skill:1,bonds:1},['honored_experience','event_01_alt_b_chosen'])),
 event('event_02_alt_riverland',2,1979,'河滩边的三亩荒地','河滩边腾出三亩荒地，村里允许先种先得。它离水近，却也离洪水近。',choice('event_02_alt_choice_a','签下荒地试一年','你押上一年的力气，把荒草翻成一畦畦能看见收成的土。',{economy:2,health:-1},'第二年有人跟着你留种，荒地边多了几户新开的田。',{skill:1,economy:1},['claimed_riverland','event_02_alt_a_chosen']),choice('event_02_alt_choice_b','拉几户人家一起做','你先把水线和出工排好，收成按事先写下的办法分。',{bonds:3,economy:1},'那张合做的纸后来成了村里谈承包时的样板。',{skill:1,bonds:1},['formed_coop','event_02_alt_b_chosen'])),
 event('event_03_alt_thresher',3,1980,'吱呀作响的打谷机','公社的打谷机卡住了，收成正等着入仓。县里师傅要过几天才来。',choice('event_03_alt_choice_a','照着旧图纸试修','你把磨损的轴承垫起来，机器终于重新吱呀转动。',{skill:3,economy:-1},'后来村里买第一台新机，大家让你去县里帮着验货。',{skill:1,bonds:1},['repaired_thresher','event_03_alt_a_chosen']),choice('event_03_alt_choice_b','凑钱请县里师傅','你把钱凑齐，也趁机站在旁边把每个步骤记下来。',{economy:-1,skill:1,bonds:2},'下次再坏，师傅只寄来一张图，你已经敢自己动手。',{skill:1,economy:1},['hired_repairman','event_03_alt_b_chosen'])),
 event('event_04_alt_eggs',4,1981,'一篮鸡蛋的去处','家里的鸡下蛋多了，供销站给价稳，县城饭馆却说能多给一分。',choice('event_04_alt_choice_a','自己进城找饭馆','你挨家问价，带回一笔更高的现钱和一张饭馆地址。',{economy:2,skill:1,health:-1},'饭馆后来让你固定送货，你第一次像个小买卖人一样记账。',{economy:1,skill:1},['sold_to_restaurant','event_04_alt_a_chosen']),choice('event_04_alt_choice_b','交给供销站统一收','你少操一份心，鸡蛋按时换成家里需要的布票和盐。',{economy:1,bonds:2},'供销站改了收购办法，你因熟悉乡亲需求成了中间传话的人。',{skill:1,bonds:1},['used_supply_station','event_04_alt_b_chosen'])),
 event('event_05_alt_medicine',5,1982,'母亲的药费与化肥钱','母亲的药方压在桌上，化肥票也等着付款。南边的亲戚说，做小生意能见钱。',choice('event_05_alt_choice_a','先把母亲送去看病','你卖掉一批粮，先让母亲把药吃上，再慢慢想地里的钱。',{economy:-2,bonds:3,health:-1},'母亲好转后替你守摊，也把家里每笔账记得清清楚楚。',{economy:1,skill:1},['paid_medicine','event_05_alt_a_chosen']),choice('event_05_alt_choice_b','借钱保住化肥和收成','你先保住地里的投入，承诺秋后连本带利还上。',{economy:2,health:-1,bonds:-1},'秋收后你还清了账，终于敢想一回不只靠地吃饭的买卖。',{skill:1,economy:1},['borrowed_for_fertilizer','event_05_alt_b_chosen'])),
 event('event_06_alt_canal',6,1982,'冬前修水渠','村里要在封冻前修完水渠，县里说修好就能多分一台抽水机。',choice('event_06_alt_choice_a','带头把渠线重新量一遍','你拿绳子量出最省力的坡度，几户人家少走了弯路。',{skill:2,bonds:2,health:-1},'来年抽水机到了，大家把最难修的那段交给你安排。',{economy:1,bonds:1},['led_canal_work','event_06_alt_a_chosen']),choice('event_06_alt_choice_b','先把自家那段修完','你先保住自家田的水路，剩下的人也照着你的办法接着做。',{economy:2,skill:1},'下一次分工时，村里知道你肯把自己的办法说出来。',{bonds:1,skill:1},['secured_own_canal','event_06_alt_b_chosen'])),
];
export const VERDICTS=[['verdict_night_lamp','灯下的人'],['verdict_field_accountant','会算田的人'],['verdict_village_repairer','村里的修理匠'],['verdict_market_pathfinder','第一个进城的人'],['verdict_people_gatherer','能把人叫到一起的人'],['verdict_steady_household','把日子稳住的人']] as const;
export const INHERITANCES=[['experience_accounting','把账算清楚','economy'],['experience_craft','把手艺留下','skill'],['experience_pacing','把身体顾好','health'],['experience_reciprocity','把人情记住','bonds']] as const;
