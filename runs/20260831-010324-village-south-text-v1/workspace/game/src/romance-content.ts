import rawStory from '../../../planning/2026-10-01-life-redesign/story-graph.json';
import { RomanceStorySchema } from '../../../planning/2026-10-01-life-redesign/story-schema.js';
import { enumerateStoryPaths, storyDecision, traceStoryPath } from '../../../planning/2026-10-01-life-redesign/story-validation.js';

export const STORY_VERSION = 'romance-1.1.0' as const;

export type StoryContext = {
  choices: string[];
  loop: number;
  previousChoices: string[];
};

export type Phase = 'prologue' | 'decision' | 'response' | 'ending';

export type Scene = {
  id: string;
  title: string;
  time: string;
  paragraphs: string[];
  choices: { id: string; label: string }[];
  endingId?: string;
};

export const ROMANCE_STORY = RomanceStorySchema.parse(rawStory);
type Story = typeof ROMANCE_STORY;
type Character = Story['characters'][number]['id'];
type Trace = ReturnType<typeof traceStoryPath>;
type Choice = Story['nodes'][number]['choices'][number];

const characterNames: Record<Character, string> = {
  zhixia: '知夏',
  wenxi: '闻溪',
};

const choicePath = (choices: string[]) => choices.length > 0 ? choices.join('-') : 'start';

function memoryKey(trace: Trace | undefined): string {
  return trace ? `${trace.memoryIds.zhixia}-${trace.memoryIds.wenxi}` : 'fresh';
}

function nodeForChoices(choices: string[]): Story['nodes'][number] {
  const node = ROMANCE_STORY.nodes[choices.length];
  if (!node) throw new Error(`No romance decision follows ${choices.length} choices.`);
  return node;
}

function validatePrefix(choices: string[], loop: number): void {
  if (!Number.isInteger(loop) || loop < 1) throw new Error('Romance loop must be a positive integer.');
  if (choices.length > ROMANCE_STORY.nodes.length) throw new Error('Romance context has too many choices.');
  for (let index = 0; index < choices.length; index += 1) {
    const node = ROMANCE_STORY.nodes[index];
    const decision = storyDecision(ROMANCE_STORY, node.id, loop, choices.slice(0, index));
    if (!decision.choices.some((choice) => choice.id === choices[index])) {
      throw new Error(`Choice ${choices[index]} is unavailable at ${node.id}.`);
    }
  }
}

function previousTrace(context: StoryContext): Trace | undefined {
  if (context.loop <= 1 || context.previousChoices.length === 0) return undefined;
  if (context.previousChoices.length !== ROMANCE_STORY.nodes.length) throw new Error('Previous romance loop must be complete.');
  return evaluateRomance(context.previousChoices);
}

function memoryFor(trace: Trace | undefined, character: Character): Story['memoryTemplates'][number] | undefined {
  if (!trace) return undefined;
  const memoryId = trace.memoryIds[character];
  return ROMANCE_STORY.memoryTemplates.find((memory) => memory.id === memoryId);
}

function graphChoice(id: string): Choice {
  for (const node of ROMANCE_STORY.nodes) {
    const choice = node.choices.find((candidate) => candidate.id === id);
    if (choice) return choice;
  }
  throw new Error(`Unknown romance choice ${id}.`);
}

function answerFor(character: Character, invited: Character[], consent: Record<Character, boolean>): string {
  const answer = ROMANCE_STORY.characterAnswers.find(candidate => candidate.characterId === character)!;
  if (!invited.includes(character)) return character === 'zhixia'
    ? '知夏把门边的小牌子翻成“闭店”：“我去收杯子。你们慢慢聊，走的时候叫我。”'
    : '闻溪把作品说明压平：“我先把最后这一张贴好。你们说完了，来帮我看一眼歪没歪。”';
  if (!consent[character]) return `${characterNames[character]}看着你，没有躲开目光：“${answer.pendingText}”`;
  return `${characterNames[character]}：“我愿意。${answer.yesText}”`;
}

function answerIdFor(character: Character, trace: Trace): string {
  const answer = ROMANCE_STORY.characterAnswers.find(candidate => candidate.characterId === character)!;
  if (trace.responseIds[character] === answer.yesResponseId) return character === 'zhixia'
    ? '知夏：“我想约你的心意没变。但你别为了让我开心，先应下来。下次来见我，把时间留实在。”'
    : '闻溪：“刚才点头是我自己想的。你还没想好，就别把我的下一页也说成定稿。”';
  if (trace.responseIds[character] === answer.pendingResponseId) return character === 'zhixia'
    ? '知夏：“好，我也要想清楚。下次想见的时候，我会直接问；你也别拿一句随时都行敷衍我。”'
    : '闻溪：“我还没答应。先停在这里。我要怎么往下画，等我想好了，自己告诉你。”';
  return character === 'zhixia' ? '知夏把最后一个杯子放进柜里，等你把话说完。' : '闻溪把笔扣好，站在画框旁听着。';
}

function consentAtInvitation(choices: string[], character: Character): boolean {
  const eligibility = ROMANCE_STORY.romanceEligibility;
  const attention = eligibility.attentionChoices[character].some((choice) => choices.includes(choice));
  const disclosed = choices.includes(eligibility.publicDisclosure)
    || (choices.includes(eligibility.privateDisclosure) && eligibility.attentionChoices[character].includes(choices[2]));
  return attention && disclosed;
}

function invitationContext(choices: string[]): { invited: Character[]; consent: Record<Character, boolean> } {
  const invitation = choices[4];
  const target = ROMANCE_STORY.romanceEligibility.invitationTargets.find((candidate) => candidate.choiceId === invitation);
  if (!target) throw new Error(`Unknown invitation choice ${invitation}.`);
  return {
    invited: target.characters,
    consent: {
      zhixia: target.characters.includes('zhixia') && consentAtInvitation(choices, 'zhixia'),
      wenxi: target.characters.includes('wenxi') && consentAtInvitation(choices, 'wenxi'),
    },
  };
}

function memoryParagraph(character: Character, trace: Trace | undefined): string | undefined {
  const memory = memoryFor(trace, character);
  if (!memory) return undefined;
  return `${characterNames[character]}像是从一个很真的梦里醒来：${memory.text}`;
}

function q1Response(choiceId: string): string[] {
  if (choiceId === 'q1-z') return [
    '半拍的试营业比知夏预想得更忙。门铃响时，她从磨豆机旁抬头，一眼就看见了你。',
    '她递来的杯子没有画爱心，奶泡上是一个歪歪的小相机。你低头看：“镜头好像有点歪。”',
    '知夏把围裙往上提了提：“第一次画，嫌弃也得喝。”你端起杯子，她又补了一句：“你真来了，我挺高兴的。”',
    '你举起相机，等她站回自己店里的灯光下。她能安排客人、应付排队，偶尔路过你时，却会停一停，看看你拍了什么。',
    '收起相机时，你才看见闻溪发来的照片：画袋已靠在画室的墙边。“取回来了。展方的事我处理完了。”她没有再问你来了没，只把照片和这句话留在对话框里；你盯着输入框，知道她已经自己把撤展处理完，也知道缺席仍然落在你们之间。',
  ];
  return [
    '闻溪已经把最后一张画装进袋里。见你赶来，她先说：“不是让你跑。”',
    '她把最轻的袋子递给你。你问：“最轻的给我？”她偏开视线：“怕你下次不来了。”',
    '“你也可以直接说想让我来。”你接过袋子。她看着你，耳根微红：“那你不是已经来了。”',
    '回画室的路上，她把展方要求改画的消息给你看。“不笑就不好看吗？”她问。你说：“画里的人都累了一天，总能坐一会儿吧。”她把袋子往肩上提了提：“我也是这么想的。”',
    '知夏发来店门口的照片：“开起来了。第一杯给你留过，凉了我倒了。”门口的试营业牌子还是正的，排队的人也没有少。你没出现在她的第一张开店照里。',
  ];
}

function q2Response(choices: string[]): string[] {
  const missed = choices[0] === 'q1-z' ? '闻溪' : '知夏';
  if (choices[1] === 'q2-now') return [
    `你拨通${missed}的电话。铃声响了几次，她才接起来。你说：“今天临时改了安排，应该先告诉你的。”`,
    missed === '闻溪'
      ? '你把先去了半拍、拍完试营业照片的经过告诉她。闻溪听了一会儿：“谁问你这么详细了。”她的声音松下来，你问作品怎么样，她说：“明天重新装裱。我想让它们有个不必一直笑的地方。”'
      : '你把从撤展现场离开、陪闻溪把画搬回去的经过告诉她。知夏那边传来叠杯子的声音。“先让我把店收完。”她笑了一声，“下次来听你讲。记得别又说顺路。”',
    '挂断前，你又说了一次：“我想见你。今天没见成，也是我要说明白的事。”电话那端安静了一小会儿，她应了声：“好。”',
  ];
  return [
    `你给${missed}发去消息：“今天没赶上你的事。明天十四点，我去找你，当面把话说清楚。”`,
    missed === '闻溪' ? '闻溪回：“那我空二十分钟。要改时间就提前说。”' : '知夏回：“好。那会儿店里不忙，我给你留个座。来不了就告诉我。”',
    '你把时间写进行程，回复：“我记下了。”屏幕暗下去之前，你又看了一眼她发来的时间。',
  ];
}

function q3Response(choices: string[]): string[] {
  const selected = choices[2];
  const fulfilledPromise = choices[1] === 'q2-later' && ((choices[0] === 'q1-z' && selected === 'q3-w') || (choices[0] === 'q1-w' && selected === 'q3-z'));
  const paragraphs = selected === 'q3-z' ? [
    '知夏把“店主”的招呼声收起来，真的坐到你对面。桌上两只杯子，一只是不在菜单上的新口味。',
    '“以前你总赶末班车。”她把杯子转了半圈，“我每次想多问一句，又怕耽误你。”你问她想问什么，她摇头：“今天先不问。今天我不想看你一直看时间。”',
    '她说店名“半拍”是自己取的：“不是什么都慢。就是有时候，我也想先想想自己要什么。”你把手机扣在桌上，尝了第二口咖啡。',
    '临走，她把你的名字写在杯套里面。你问为什么，她说：“外面给客人看。里面给你看。”',
  ] : [
    '闻溪把椅子推到窗边，让你做二十分钟模特。你习惯性调整坐姿，她抬起笔：“不要摆摄影师觉得好看的那个姿势。”',
    '“那我该怎么坐？”你问。“像一个今天真的想待在这里的人。”她说完自己也笑了，低头继续画。',
    '你凑过去看纸上的自己，肩膀有点松，眼神有点累。“你把我画得有点累。”她说：“因为你有点累。”停了一下，又补一句：“但不难看。”',
    '她没有把画立刻送给你。“下次来取。”你问这是拖稿吗，她抬头：“这是再见你一次的理由。”',
  ];
  if (fulfilledPromise) paragraphs.unshift(selected === 'q3-z'
    ? '知夏拉开对面的椅子：“昨晚说十四点，这次你真的来了。”你坐下，把昨晚没讲完的话讲给她听。'
    : '闻溪把窗边留给你：“这次你真的来了。我还以为又得问你是哪一个明天。”你把昨晚没讲完的话讲给她听，她听完才取出画纸。');
  const callback = ROMANCE_STORY.q3Callbacks.find(candidate => candidate.choiceId === selected)!;
  const waited = callback.waitedSourceChoices.every(sourceChoice => choices.includes(sourceChoice));
  // The callback is the unselected heroine's own message, not the selected
  // heroine's promise fulfilment or a report of a private conversation.
  const callbackText = waited ? callback.waitedText : callback.text
    .replace('她照常经营新店，未到场不被写成拒绝。', '')
    .replace('她继续布展，没有被写成已得到陪伴。', '');
  paragraphs.push(`周六 16:30，手机亮起：${callbackText}`);
  return paragraphs;
}

function q4Response(choices: string[], loop: number): string[] {
  const companion = choices[2] === 'q3-z' ? '知夏' : '闻溪';
  const other = companion === '知夏' ? '闻溪' : '知夏';
  const preparation = '知夏指着店里的空墙：“周日借这一面给你，作品说明你自己写。”闻溪扶住画框：“当然我自己写。你先替我看看灯。”你站上小凳，三个人把最后一盏灯调好。';
  if (loop > 1 && choices[3] === 'q4-all') return [
    preparation,
    '知夏看向你：“你是不是也记得一点？”闻溪把手从画框上放下来：“我只记得和你说过的几句话。像梦，但又太具体了。”',
    '你把重开的经历说出来，从周五迟迟没有显影的相纸，说到周日出现的告别照，再到重新回到周五十七点五十。“我记得上一轮。”你承认，“但你们这次想怎么做，我还是要重新问。”',
    '你把周日 23:20 的夜车提醒给两人看：“这次也会走。可我回来，不只是想帮忙。我想见你们。”',
    '知夏摸了摸杯沿：“那这次别把想见藏起来。”闻溪点头：“也别因为你记得，就替我决定。我的答案，我自己说。”',
  ];
  if (loop > 1) return [
    preparation,
    '你先承认三个人都留下了一点记忆。知夏说她只记得自己的片段，闻溪也点头。你没有让她们把一个梦当作你的解释。',
    `稍晚，你在巷口把相机重开、周日 23:20 的车票和自己仍想靠近她们的心意，完整讲给${companion}听。` + (companion === '知夏'
      ? '她问：“所以，你这次坐下来，不是看我店里缺人？”你说：“不是。我想来见你。”'
      : '她问：“所以，这次你回来，我也不只是工作搭档？”你说：“不只是。我想来见你。”'),
    companion === '知夏'
      ? '知夏看了一会儿车票：“我不会让你把工作推了。可下次我约你的时候，能来哪一天，直接告诉我。别让我空着座位猜。”'
      : '闻溪看了一会儿车票：“工作我会继续做，画也不会等你才画。你想来看，就提前约。别只在我发新图的时候，给我一个点赞。”',
    `回店后，${other}正低头检查明天的布置。你没有让${companion}替你转述。车票的事，你决定明天亲口告诉${other}。`,
  ];
  if (choices[3] === 'q4-all') return [
    preparation,
    '手机上的周日 23:20 夜车提醒亮起来。你把屏幕翻给两人：“我周日晚上走。接了外地的工作，一直没认真告诉你们。”',
    '知夏看完，问你：“我不介意你有自己的安排。我介意的是，我一直以为还有下个周末。”闻溪把画框扶正：“你可以走。别把‘我会想见你们’也一起藏起来。”',
    '你说：“我也舍不得。不是只有你们需要帮忙，我才想留下来。”知夏把杯子放下，闻溪没有立刻接话。两个人都知道这趟车票，也都还需要想想。',
  ];
  return [
    preparation,
    `你只把周日 23:20 的夜车先告诉${companion}。你说：“我怕留下来没有方向，也怕离开后，又变成只会给你点赞的人。”`,
    companion === '知夏'
      ? '知夏没有催你改车票。她问：“那下次，你是想来拍开店照，还是想坐到我对面？”你说：“想坐到你对面。先把时间约好。”'
      : '闻溪没有催你改车票。她问：“那下次来画室，你是来交照片，还是来看我？”你说：“来看你。工作可以另外约。”',
    `${other}从店里探出头，叫你们去看灯。你把手机收起来。她还不知道你要走，这件事得由你明天亲口说。`,
  ];
}

function q5Response(choices: string[]): string[] {
  const invitation = choices[4];
  const before = choices[3] === 'q4-private' ? [
    `展览告一段落，你先找到${choices[2] === 'q3-z' ? '闻溪' : '知夏'}：“我今晚 23:20 坐夜车走，去外地工作。现在才告诉你，是我拖得太久了。”`,
    `${choices[2] === 'q3-z' ? '闻溪' : '知夏'}看着你：“我刚知道你要走。先让我把今天过完，有些事我还没想好。”`,
  ] : [];
  if (invitation === 'q5-friends') return [...before,
    '你把两只杯子放回桌面：“我很珍惜你们，但这次我想把关系留在朋友的位置。不会让谁等着，也不是要谁替我圆场。”',
    ...ROMANCE_STORY.friendshipAnswers.map(answer => answer.text),
  ];
  if (invitation === 'q5-none') return [...before,
    '你看了看墙上的画，再看向她们：“我喜欢和你们在一起。但现在，我还不能把下一次说成恋爱邀请。”',
    '知夏问：“那我也不用把下个周末空着，是吗？”你点头：“不用等我想清楚才做自己的事。”闻溪把笔收进袋里：“好。你想好了，就当面讲。”',
  ];
  const {invited,consent}=invitationContext(choices);
  const paragraphs=[...before, invitation === 'q5-both'
    ? '你看着两人：“我对你们都有感情。我不想瞒着谁，也不想把喜欢藏在朋友两个字后面。你们愿不愿意继续了解？请分别给我答案。”'
    : invited[0] === 'zhixia'
      ? '你看向知夏：“下一次回来，我想先约你。不是借拍照的名义，也不是刚好路过。你愿意把一个晚上留给我吗？”'
      : choices[2] === 'q3-w'
        ? '你对闻溪说：“那张画，我想自己来取。也想和你去一个不是工作场合的地方。你愿意把下一次留给我吗？”'
        : '你对闻溪说：“我想去你的画室坐一会儿，不带工作，也不带相机。想和你有一个不工作的下午。你愿意吗？”'];
  for (const character of ['zhixia','wenxi'] as const) paragraphs.push(answerFor(character,invited,consent));
  if(invitation==='q5-both' && consent.zhixia && consent.wenxi) paragraphs.push('闻溪又补了一句：“不是因为知夏点头，我才跟着点头。我也愿意。”知夏看了她一眼：“谁不舒服，都能停。有事当面说。”你点头，把她们两个人的话都听完。');
  return paragraphs;
}

function completionResponse(choices: string[]): string[] {
  const trace=evaluateRomance(choices);
  if (trace.endingId==='friendship') return [
    choices[4]==='q5-friends' ? '你说：“刚才说的朋友，我是认真的。到站我发个平安，回来提前说，不拿一句下次让你们空等。”' : '你看着她们：“刚才你们说的，我都听见了。但我现在想以朋友的身份继续。不能一边答应，一边让自己含糊过去。”',
    ...ROMANCE_STORY.friendshipAnswers.map(answer=>answer.text),
    '周日 22:30，你们把话说完，开始收起展览的桌椅。',
  ];
  if(trace.endingId==='zhixia') return ['周日 22:30，你把手机调到到站提醒：“到了先视频。让你看看我那边清晨的街道，行吗？”','知夏把你的手机轻轻推回来：“行。下一次回来，我约个不营业的晚上。别又穿着拍照那件外套来加班。”','你说：“这次我只来见你。”她笑着应了声：“我记下了。”'];
  if(trace.endingId==='wenxi') return ['周日 22:30，你问闻溪：“下次找个不工作的下午。你定地方，我提前把时间空下来。”','闻溪把笔夹进本子：“也不许临时带相机来交差。”你说：“那到站先发一张拍得不怎么样的照片？”','她抬起眼：“可以。我又不是只想看你的作品。”'];
  if(trace.endingId==='together') return ['周日 22:30，你说：“到站我给你们报平安。下次的约，我们分别说具体。不躲，也不替谁安排。”','知夏：“我想约一个不营业的晚上。”闻溪接道：“我要一个不工作的下午。不是她的约剩下来的一小段。”','你答应：“都由你们自己问，我也会把能做到的时间说清楚。”知夏问如果不舒服怎么办，你说：“当面说，谁都可以停。”闻溪这才点头。'];
  const paragraphs=['周日 22:30，你在店门边把相机包放下。'];
  if(trace.openReason==='player-slow') paragraphs.push('你说：“我想慢下来，不是因为你们的答案不好。我现在答应了，却不知道能不能做到，那样更不认真。”',...(['zhixia','wenxi'] as const).map(character=>answerIdFor(character,trace)),'你又说：“等我能把下一次说具体，再来问。你们不用替我空着时间。”');
  else if(trace.openReason==='no-invite') paragraphs.push('你说：“今天不让谁等一个没定好的约。想见你们的时候，我会先问，不说顺路。”','知夏点头：“这句我收下了。”闻溪把最后一张说明贴平：“那就先把今天收好。”');
  else if(trace.openReason==='partial-shared-consent') paragraphs.push(...(['zhixia','wenxi'] as const).map(character=>answerIdFor(character,trace)),'你说：“我问的是两个人，不能拿一个人的愿意替另一个回答。今天先停在这里。下次想怎么见面，再由我们各自说。”');
  else paragraphs.push(...(['zhixia','wenxi'] as const).map(character=>answerIdFor(character,trace)),'你说：“好。我听见了。不用再解释到我满意，也不用为了这趟车票改答案。”');
  return paragraphs;
}

function endingParagraphs(choices: string[], trace: Trace): string[] {
  if(trace.endingId==='zhixia') return [
    '打烊后，知夏没有把最后那盏灯关掉。你问是不是还有客人。',
    '“有啊。一个每次都说顺路的人。”她把杯套交给你，这一次，你的名字写在外面。你说：“这次是特意来的。”',
    '她笑了：“那就从特意约下一次开始。”你们又确认了一次到站后的视频。她不要求你取消工作，只在那张告别照里，轻轻把手搭在你的手背上。',
  ];
  if(trace.endingId==='wenxi') return choices.includes('q3-w') ? [
    '闻溪把画夹递给你，里面却没有那张肖像。你打开看：“空的？”',
    '“画我留着。夹子你拿走，下次交换。”你说她安排得很周全，她抬起眼：“总得有个人，把想见你说得像一回事。”',
    '你们再次约好那个不工作的下午。走到巷口，你收到她刚发来的小头像：坐在窗边的你，眉眼没有摆好，却很放松。',
    '你问这是不是赠品。闻溪回：“不是赠品。是我想送你。”你回头，她正把画夹袋的绳结替你系好。',
  ] : [
    '闻溪递给你一张空白卡，在角落画了一个小取景框。“下次换我画你。时间先给我留着。”',
    '你把卡收进相机包，问是不是得坐成一个好模特。她说：“别准备。你来就行。”',
    '你们约好一个不工作的下午。她看着你把卡收好，又补了一句：“不是赠品。是我想送你。”',
  ];
  if(trace.endingId==='together') return [
    '知夏把店门关上，转身说：“先说好，别用忙来躲任何一个人。”闻溪接道：“也别替我们安排。我自己的约，我自己问。”',
    '你说：“所以现在是——”闻溪笑着打断：“你刚才表白的时候，不是挺会说的吗？”你重新说了一遍，想分别认真约她们，也不想瞒着任何人。',
    '知夏给出她想要的下一次，闻溪也把自己的时间记在手机上。你们分别核对，谁都没有替谁点头。',
    '最后拍照时，你习惯性站到两人后面。知夏把你拉回来，闻溪看着取景框：“这次就别藏了。”你站进照片里，听见两个人各自说了一声“好了”。',
  ];
  if(trace.endingId==='friendship') return [
    '知夏把最后一盏灯调暗，闻溪继续给作品说明落款。你把折好的桌布递给她们，问下次展览还在这里吗。',
    '“店当然还开。”知夏说，“你来不来，我都得试新菜单。”闻溪把笔一扣：“我的画也还得画。想看，就提前问。”',
    '你说：“好。特意就是特意，来不了就提前说。”知夏把相机包递回来：“朋友也一样。”闻溪走到镜头旁：“那朋友，给今天拍完吧。”',
  ];
  const reason = trace.openReason==='player-slow' ? '你没有急着给关系取名字。她们也没有改口，刚才的答案仍留在你们各自心里。'
    : trace.openReason==='no-invite' ? '今天没有提出恋爱邀请。你看着她们忙完自己的工作，知道下次想见谁，还得自己认真开口。'
    : trace.openReason==='partial-shared-consent' ? '一个人的愿意和另一个人的犹豫都在。你没有转头追问“那就只约你”，也没有让她们替你把这句话圆过去。'
    : '她还没准备好，你也没有再追问一次。店门仍替你开着，你们可以把告别照拍完，再各自往前走。';
  return [
    '你们把作品说明的最后一个字贴正，店里的灯一盏盏熄掉。',reason,
    '知夏替你拉好相机包，闻溪提醒你留点赶车的时间。你在巷口回头，她们还在讨论哪幅画下次应该挂得低一点。',
    '你问：“先给今天拍一张？”知夏站回来，闻溪扶住快门：“拍。别又把自己漏掉。”',
  ];
}

function prologueScene(context: StoryContext): Scene {
  const trace = previousTrace(context);
  const paragraphs = [
    '周五 17:50，你从老照相馆取回修好的旧相机。镜头里有一道很淡的重影，师傅只说：“别急着回卷，先把这一张拍完。”',
    '巷口的半拍正在挂试营业的小牌子。沈知夏把你往前拉了半步：“别每次都站镜头后面。今天你也得留在照片里。”陆闻溪抱着画框路过，只看了一眼取景框：“你俩再靠近一点。放心，镜头没那么爱误会。”',
    '快门响了两次，相纸上却什么也没有。你把它夹进相机包，手机同时亮起两条消息：知夏给你留了第一杯，闻溪问你现在能不能去看她被撤下的画。',
    '你是二十六岁的自由摄影师。三年前，你拍过二十五岁的知夏第一次站在自己店门口的照片；半年前，又和二十四岁的闻溪合办过一次小展览。你认识她们的工作，也认识她们忙完以后还想多聊一会儿的样子。',
    '你买了周日 23:20 的夜车票，要去外地接一份工作。这个周末不长。你还没认真告诉她们，自己也舍不得。',
  ];
  if (trace) {
    const zhixiaMemory = memoryParagraph('zhixia', trace);
    if (zhixiaMemory) paragraphs.push(zhixiaMemory);
    paragraphs.push('你摸了摸相机包，里面还是刚取回的相机和空白相纸。知夏看了你一会儿：“是个梦吧？可我连语气都记得。”');
  }
  return {
    id: `prologue-loop${context.loop}${trace ? `-${memoryKey(trace)}` : ''}`,
    title: '巷口的双重快门',
    time: 'Friday 17:50',
    paragraphs,
    choices: [],
  };
}

function decisionScene(context: StoryContext): Scene {
  const node = nodeForChoices(context.choices);
  const decision = storyDecision(ROMANCE_STORY, node.id, context.loop, context.choices);
  const paragraphs = [`周${node.order <= 2 ? '五' : node.order <= 4 ? '六' : '日'} ${node.time.split(' ')[1] ?? node.time}，${decision.title}。`];
  if (node.id === 'q1') paragraphs.push('知夏发来：“第一杯给你留着。你说好第一个来的。”闻溪的消息紧跟着亮起：“他们把画撤了。我能自己处理，但……你现在能过来吗？”两处都在这条街上，可这个开场，你只能先赶上一边。');
  if (node.id === 'q2') {
    paragraphs.push(context.choices[0] === 'q1-z' ? '闻溪发来：“画拿回来了。下次有变动告诉我，别让我一直猜。”' : '知夏发来：“店里终于静了。今天没见上，下次来坐一会儿？”');
    const memory=memoryParagraph('wenxi',previousTrace(context));
    if(memory) paragraphs.push(memory);
  }
  if(node.id==='q4') paragraphs.push('知夏提议周日把闻溪的画挂在店里，闻溪同意自己写作品说明。你们测灯时，手机亮起周日 23:20 的车票提醒。你看到它，也知道该自己把离开的事说清楚。');
  if (node.id === 'q3' && context.choices[1] === 'q2-later') paragraphs.push(`昨晚约好的，是${context.choices[0] === 'q1-z' ? '闻溪' : '知夏'}的十四点。若现在把下午留给另一人，她会等不到你。`);
  if (node.id === 'q5') paragraphs.push('展览的灯光落在《不营业的时候》上。画里的知夏没有笑，却很放松。她说：“这张不用改。我喜欢。”闻溪隔着两个人把画框扶正：“我也没打算改。”');
  if (node.id === 'q6') paragraphs.push('周日 22:30，离 23:20 的夜车只剩不到一小时。她们已经给过真实答案，现在轮到你回应。');
  return {
    id: `decision-${node.id}-loop${context.loop}-${choicePath(context.choices)}`,
    title: decision.title,
    time: node.time,
    paragraphs,
    choices: decision.choices.map(({ id, label }) => ({ id, label })),
  };
}

function responseScene(context: StoryContext): Scene {
  const choices = context.choices;
  const choiceId = choices[choices.length - 1];
  const node = nodeForChoices(choices.slice(0, -1));
  const choice = graphChoice(choiceId);
  const trace = choices.length === ROMANCE_STORY.nodes.length ? evaluateRomance(choices) : undefined;
  const previous = previousTrace(context);
  let paragraphs: string[];
  if (node.id === 'q1') paragraphs = q1Response(choice.id);
  else if (node.id === 'q2') paragraphs = q2Response(choices);
  else if (node.id === 'q3') paragraphs = q3Response(choices);
  else if (node.id === 'q4') paragraphs = q4Response(choices, context.loop);
  else if (node.id === 'q5') paragraphs = q5Response(choices);
  else paragraphs = completionResponse(choices);

  if (context.loop > 1 && node.id === 'q3') {
    paragraphs.push(ROMANCE_STORY.secondLoop.initiatives.find((event) => event.characterId === 'zhixia')!.text);
    paragraphs.push(ROMANCE_STORY.secondLoop.initiatives.find((event) => event.characterId === 'wenxi')!.text);
  }
  if (node.id === 'q6' && trace?.endingId) {
    paragraphs.push(`收尾：${ROMANCE_STORY.endings.find((ending) => ending.id === trace.endingId)!.title}`);
  }
  return {
    id: `response-${node.id}-${choice.id}-loop${context.loop}-${choicePath(choices)}${context.loop > 1 ? `-memory-${memoryKey(previous)}` : ''}`,
    title: node.title,
    time: node.time,
    paragraphs,
    choices: [],
  };
}

function endingScene(context: StoryContext): Scene {
  const trace = evaluateRomance(context.choices);
  const title = ROMANCE_STORY.endings.find((ending) => ending.id === trace.endingId)!.title;
  const paragraphs = [
    ...endingParagraphs(context.choices, trace),
    '周日 22:59，周五那张空白相纸浮出了刚刚拍下的告别照。相机的回卷钮轻轻动了一下。你还站在巷口，23:20 的夜车来得及。你可以收好照片，也可以按下回卷，再过一次这个周末。',
  ];
  return {
    id: `ending-${trace.endingId}-${trace.openReason ?? 'settled'}-loop${context.loop}-${choicePath(context.choices)}`,
    title,
    time: 'Sunday 22:59',
    paragraphs,
    choices: [],
    endingId: trace.endingId,
  };
}

export function evaluateRomance(choices: string[]): Trace {
  return traceStoryPath(ROMANCE_STORY, choices);
}

function withTextIdentity(scene: Scene): Scene {
  const text=JSON.stringify([scene.title,scene.time,scene.paragraphs,scene.choices,scene.endingId]);
  let hash=0xcbf29ce484222325n;
  for(const character of text) hash=BigInt.asUintN(64,(hash ^ BigInt(character.codePointAt(0)!))*0x100000001b3n);
  return {...scene,id:`${scene.id}-text-${hash.toString(16).padStart(16,'0')}`};
}

export function getRomanceScene(context: StoryContext, phase: Phase): Scene {
  validatePrefix(context.choices, context.loop);
  // Later loops have the same authored replay rules; the visible loop counter
  // lives in the engine/view and must not make identical prose unread again.
  context = {...context,loop:context.loop > 1 ? 2 : 1};
  if (!Array.isArray(context.previousChoices)) throw new Error('Previous romance choices must be an array.');
  if (phase === 'prologue') {
    if (context.choices.length !== 0) throw new Error('The romance prologue requires no current choices.');
    return withTextIdentity(prologueScene(context));
  }
  if (phase === 'decision') {
    if (context.choices.length >= ROMANCE_STORY.nodes.length) throw new Error('No decision follows a completed romance loop.');
    return withTextIdentity(decisionScene(context));
  }
  if (phase === 'response') {
    if (context.choices.length < 1) throw new Error('A response requires the latest choice.');
    return withTextIdentity(responseScene(context));
  }
  if (context.choices.length !== ROMANCE_STORY.nodes.length) throw new Error('The romance ending requires six choices.');
  return withTextIdentity(endingScene(context));
}

export function getContentCatalog(): Scene[] {
  const records = new Map<string, Scene>();
  const add = (record: Scene) => {
    const existing=records.get(record.id);
    if(existing && JSON.stringify(existing)!==JSON.stringify(record)) throw new Error(`Colliding content identity ${record.id}`);
    records.set(record.id,record);
  };
  const traces = enumerateStoryPaths(ROMANCE_STORY);
  const prefixes = new Map<string, string[]>();
  for (const trace of traces) {
    for (let length = 0; length <= ROMANCE_STORY.nodes.length; length += 1) {
      const prefix = trace.choices.slice(0, length);
      prefixes.set(prefix.join('/'), prefix);
    }
  }
  const currentPrefixes = [...prefixes.values()];
  add(getRomanceScene({ choices: [], loop: 1, previousChoices: [] }, 'prologue'));
  for (const prefix of currentPrefixes) {
    if (prefix.length < ROMANCE_STORY.nodes.length) {
      add(getRomanceScene({ choices: prefix, loop: 1, previousChoices: [] }, 'decision'));
    }
    if (prefix.length > 0) {
      add(getRomanceScene({ choices: prefix, loop: 1, previousChoices: [] }, 'response'));
    }
  }
  for (const trace of traces) {
    add(getRomanceScene({ choices: trace.choices, loop: 1, previousChoices: [] }, 'ending'));
  }

  // Every completed first-loop trace is a legal replay memory source. Pair it
  // with every legal current prefix so the catalog includes all authored
  // memory/content variants, rather than one repeated sample path.
  for (const previous of traces) {
    add(getRomanceScene({choices:[],loop:2,previousChoices:previous.choices},'prologue'));
    for (const prefix of currentPrefixes) {
      const context = { choices: prefix, loop: 2, previousChoices: previous.choices };
      if (prefix.length < ROMANCE_STORY.nodes.length) add(getRomanceScene(context, 'decision'));
      if (prefix.length > 0) add(getRomanceScene(context, 'response'));
    }
    add(getRomanceScene({ choices: previous.choices, loop: 2, previousChoices: traces[0].choices }, 'ending'));
  }
  return [...records.values()];
}
