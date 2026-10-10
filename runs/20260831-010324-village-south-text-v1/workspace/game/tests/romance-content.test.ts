import { describe, expect, it } from 'vitest';
import {
  ROMANCE_STORY,
  STORY_VERSION,
  evaluateRomance,
  getContentCatalog,
  getRomanceScene,
  type Scene,
  type StoryContext,
} from '../src/romance-content.js';

const scene = (choices: string[], phase: 'prologue' | 'decision' | 'response' | 'ending', loop = 1, previousChoices: string[] = []): Scene =>
  getRomanceScene({ choices, loop, previousChoices }, phase);

const firstLoop = ['q1-z', 'q2-later', 'q3-z', 'q4-all', 'q5-z', 'q6-commit'];

describe('romance content contract', () => {
  it('exports the approved graph and stable content version', () => {
    expect(STORY_VERSION).toBe('romance-1.1.0');
    expect(ROMANCE_STORY.title).toBe('攻略美少女');
    expect(ROMANCE_STORY.characters.map((character) => character.age)).toEqual([25, 24]);
  });

  it('renders a grounded prologue without phantom portrait or carried item claims', () => {
    const prologue = scene([], 'prologue');
    expect(prologue.id).toMatch(/^prologue-loop1-text-[a-f0-9]+$/);
    expect(prologue.time).toContain('17:50');
    expect(prologue.paragraphs.join(' ')).toContain('23:20');
    expect(prologue.paragraphs.join(' ')).toContain('半拍');
    expect(prologue.paragraphs.join(' ')).not.toMatch(/立绘|文件夹里有|带回来的照片|实体相册/);
    expect(prologue.choices).toEqual([]);
  });

  it('maps the current choice count to the next graph decision and filters friendship confirmation', () => {
    const prefixes = [[], ['q1-z'], ['q1-z', 'q2-now'], ['q1-z', 'q2-now', 'q3-z'], ['q1-z', 'q2-now', 'q3-z', 'q4-all'], ['q1-z', 'q2-now', 'q3-z', 'q4-all', 'q5-z']];
    const decisions = prefixes.map((prefix) => scene(prefix, 'decision'));
    expect(decisions.map((current) => current.id.replace(/-text-[a-f0-9]+$/, ''))).toEqual([
      'decision-q1-loop1-start',
      'decision-q2-loop1-q1-z',
      'decision-q3-loop1-q1-z-q2-now',
      'decision-q4-loop1-q1-z-q2-now-q3-z',
      'decision-q5-loop1-q1-z-q2-now-q3-z-q4-all',
      'decision-q6-loop1-q1-z-q2-now-q3-z-q4-all-q5-z',
    ]);
    expect(decisions[0].choices.map((choice) => choice.id)).toEqual(['q1-z', 'q1-w']);
    expect(decisions[4].choices.map((choice) => choice.id)).toContain('q5-friends');
    expect(decisions[5].choices.map((choice) => choice.id)).toEqual(['q6-commit', 'q6-slow', 'q6-friends']);
    expect(scene(['q1-z', 'q2-now', 'q3-w', 'q4-all', 'q5-friends'], 'decision').choices.map((choice) => choice.id)).toEqual(['q6-friends']);
  });

  it('renders every immediate response with content and history-specific stable ids', () => {
    const responseIds = firstLoop.map((choice, index) => scene(firstLoop.slice(0, index + 1), 'response').id);
    expect(new Set(responseIds).size).toBe(6);
    for (let index = 0; index < firstLoop.length; index += 1) {
      const response = scene(firstLoop.slice(0, index + 1), 'response');
      expect(response.paragraphs.length).toBeGreaterThanOrEqual(2);
      expect(response.paragraphs.join(' ').trim()).not.toBe('');
      expect(response.choices).toEqual([]);
    }
    expect(scene(['q1-z'], 'response').id).not.toBe(scene(['q1-w'], 'response').id);
    expect(scene(['q1-z', 'q2-later', 'q3-z'], 'response').id).not.toBe(scene(['q1-z', 'q2-now', 'q3-z'], 'response').id);
  });

  it('keeps fulfilled and waited q3 callbacks separate and does not erase a broken promise with apology', () => {
    const fulfilled = scene(['q1-z', 'q2-later', 'q3-w'], 'response').paragraphs.join(' ');
    const waited = scene(['q1-z', 'q2-later', 'q3-z'], 'response').paragraphs.join(' ');
    expect(fulfilled).toContain('这次你真的来了');
    expect(waited).toContain('空了二十分钟');
    expect(waited).toContain('不会替你把约会也画完');
    expect(waited).not.toContain('所以没关系');
  });

  it('does not claim the unselected character arrived when the callback is about her own work', () => {
    const unselectedAfterCall = scene(['q1-z', 'q2-now', 'q3-z'], 'response').paragraphs.join(' ');
    const afterLater = scene(['q1-z', 'q2-later', 'q3-w'], 'response').paragraphs;
    const unselectedAfterLater = afterLater.find(line => line.includes('知夏发来'))!;
    expect(unselectedAfterCall).toContain('重新装裱');
    expect(unselectedAfterCall).not.toContain('这次你真的来了');
    expect(unselectedAfterLater).toContain('知夏发来');
    expect(unselectedAfterLater).not.toContain('这次你真的来了');
    expect(afterLater.join(' ')).toContain('这次你真的来了');
  });

  it('keeps the q2 phone explanation causal when the player went to the coffee shop', () => {
    const response = scene(['q1-z', 'q2-now'], 'response').paragraphs.join(' ');
    expect(response).toContain('先去了半拍');
    expect(response).not.toContain('从撤展到店里');
  });

  it('keeps q4 public and private disclosure distinct, including delayed knowledge', () => {
    const publicDisclosure = scene(['q1-z', 'q2-now', 'q3-z', 'q4-all'], 'response').paragraphs.join(' ');
    const privateDisclosure = scene(['q1-z', 'q2-now', 'q3-z', 'q4-private'], 'response').paragraphs.join(' ');
    expect(publicDisclosure).toContain('两个人都知道');
    expect(privateDisclosure).toContain('只把周日');
    const q5 = scene(['q1-z', 'q2-now', 'q3-z', 'q4-private', 'q5-both'], 'response').paragraphs.join(' ');
    expect(q5).toContain('闻溪');
    expect(q5).toMatch(/刚知道|还没有准备好/);
  });

  it('renders independent answers for romantic and full friendship invitations', () => {
    const individual = scene(['q1-z', 'q2-now', 'q3-z', 'q4-all', 'q5-z'], 'response').paragraphs.join(' ');
    const shared = scene(['q1-z', 'q2-now', 'q3-z', 'q4-all', 'q5-both'], 'response').paragraphs.join(' ');
    const friendship = scene(['q1-z', 'q2-now', 'q3-z', 'q4-all', 'q5-friends', 'q6-friends'], 'response').paragraphs.join(' ');
    expect(individual).toContain('知夏');
    expect(shared).toContain('闻溪');
    expect(friendship).toContain('朋友');
    expect(friendship).toContain('边界');
    expect(friendship).not.toContain('恋人已经开始');
  });

  it('returns a visible q6 completion response before the ending and preserves five endings', () => {
    const paths = [
      ['q1-z', 'q2-now', 'q3-z', 'q4-all', 'q5-z', 'q6-commit'],
      ['q1-w', 'q2-now', 'q3-w', 'q4-all', 'q5-w', 'q6-commit'],
      ['q1-z', 'q2-now', 'q3-w', 'q4-all', 'q5-both', 'q6-commit'],
      ['q1-z', 'q2-now', 'q3-z', 'q4-all', 'q5-friends', 'q6-friends'],
      ['q1-z', 'q2-now', 'q3-z', 'q4-all', 'q5-none', 'q6-commit'],
    ];
    const endings = paths.map((path) => scene(path, 'ending'));
    expect(new Set(endings.map((ending) => ending.endingId))).toEqual(new Set(['zhixia', 'wenxi', 'together', 'friendship', 'open']));
    for (const path of paths) {
      const completion = scene(path, 'response');
      expect(completion.time).toBe('Sunday 22:30');
      expect(completion.paragraphs.join(' ')).toContain('“');
      expect(scene(path, 'ending').endingId).toBeTruthy();
    }
    expect(new Set(endings.map((ending) => ending.paragraphs.join(' '))).size).toBe(5);
  });

  it('keeps the q6 response at 22:30 and reserves 22:59 for the ending scene', () => {
    const path = ['q1-z', 'q2-now', 'q3-z', 'q4-all', 'q5-z', 'q6-commit'];
    const completion = scene(path, 'response');
    expect(completion.time).toBe('Sunday 22:30');
    expect(completion.paragraphs.join(' ')).not.toContain('22:59');
    expect(scene(path, 'ending').time).toBe('Sunday 22:59');
  });

  it('renders a complete spoken invitation and the conditional portrait wording', () => {
    const zhixia = scene(['q1-z', 'q2-now', 'q3-z', 'q4-all', 'q5-z'], 'response').paragraphs.join(' ');
    const wenxiAfterPortrait = scene(['q1-z', 'q2-now', 'q3-w', 'q4-all', 'q5-w'], 'response').paragraphs.join(' ');
    const wenxiWithoutPortrait = scene(['q1-z', 'q2-now', 'q3-z', 'q4-all', 'q5-w'], 'response').paragraphs.join(' ');
    const shared = scene(['q1-z', 'q2-now', 'q3-z', 'q4-all', 'q5-both'], 'response').paragraphs.join(' ');
    expect(zhixia).toContain('下一次回来，我想先约你');
    expect(wenxiAfterPortrait).toContain('那张画，我想自己来取');
    expect(wenxiAfterPortrait).toContain('不是工作场合');
    expect(wenxiWithoutPortrait).toContain('不带工作，也不带相机');
    expect(wenxiWithoutPortrait).not.toContain('那张画，我想自己来取');
    expect(shared).toContain('我对你们都有感情');
    expect(shared).toContain('愿不愿意继续了解');
  });

  it('uses only the most recent loop own-experience memory before q1 and q2, then both initiatives after q3', () => {
    const q1 = scene([], 'prologue', 2, firstLoop).paragraphs.join(' ');
    const q2 = scene(['q1-w'], 'decision', 2, firstLoop).paragraphs.join(' ');
    const q3 = scene(['q1-w', 'q2-now', 'q3-w'], 'response', 2, firstLoop).paragraphs.join(' ');
    expect(q1).toContain('认真地约过我一次');
    expect(q1).not.toContain('我好像自己说过愿意试试');
    expect(q2).toContain('明天来不了');
    expect(q2).toContain('闻溪');
    expect(q3).toContain('知夏主动');
    expect(q3).toContain('闻溪先发来');
    expect(scene([], 'prologue', 2, firstLoop).id).toMatch(/^prologue-loop2-mz-romance-mw-waited-text-/);
  });

  it('shows replay memories before the q1 and q2 decisions and gives q4 a replay conversation', () => {
    const beforeQ1 = scene([], 'prologue', 2, firstLoop).paragraphs.join(' ');
    const q2Decision = scene(['q1-z'], 'decision', 2, firstLoop).paragraphs.join(' ');
    const q4Replay = scene(['q1-z', 'q2-now', 'q3-z', 'q4-all'], 'response', 2, firstLoop).paragraphs.join(' ');
    expect(beforeQ1).toContain('已经很认真地约过我一次');
    expect(q2Decision).toContain('如果明天来不了');
    const wenxiRomance = ['q1-w', 'q2-now', 'q3-w', 'q4-all', 'q5-w', 'q6-commit'];
    expect(scene(['q1-z'], 'decision', 2, wenxiRomance).paragraphs.join(' ')).toContain('我总觉得，我们已经约好了一个不工作的下午');
    expect(q4Replay).toContain('重开');
    expect(q4Replay).toContain('记得');
    expect(q4Replay).not.toContain('坦白不是三人恋爱的自动开关');
  });

  it('distinguishes identical current choices when the previous loop memory differs', () => {
    const previousRomance = ['q1-z', 'q2-later', 'q3-z', 'q4-all', 'q5-z', 'q6-commit'];
    const previousOpen = ['q1-z', 'q2-now', 'q3-z', 'q4-all', 'q5-none', 'q6-commit'];
    const romanceResponse = scene([], 'prologue', 2, previousRomance);
    const openResponse = scene([], 'prologue', 2, previousOpen);
    expect(romanceResponse.paragraphs.join(' ')).not.toBe(openResponse.paragraphs.join(' '));
    expect(romanceResponse.id).not.toBe(openResponse.id);
  });

  it('is deterministic and exposes an auditable catalog of authored variants', () => {
    const context: StoryContext = { choices: firstLoop, loop: 2, previousChoices: firstLoop };
    expect(getRomanceScene(context, 'ending')).toEqual(getRomanceScene(context, 'ending'));
    const catalog = getContentCatalog();
    expect(catalog.length).toBeGreaterThan(30);
    expect(catalog.every((record) => record.id && record.title && record.time && record.paragraphs.length > 0)).toBe(true);
    expect(new Set(catalog.map((record) => record.id)).size).toBe(catalog.length);
    expect(catalog.some((record) => record.id.includes('loop2') && record.id.includes('mz-romance-mw-waited'))).toBe(true);
    expect(catalog.some((record) => record.id.includes('loop2') && record.id.includes('mz-arrived-mw-call'))).toBe(true);
    expect(catalog.some((record) => record.id.startsWith('ending-') && record.id.includes('loop2'))).toBe(true);
    expect(catalog.some((record) => record.id === scene([], 'prologue', 2, firstLoop).id)).toBe(true);
  });

  it('uses the same read identity for identical authored text on later replay loops', () => {
    const second = scene(['q1-z'], 'decision', 2, firstLoop);
    const third = scene(['q1-z'], 'decision', 3, firstLoop);
    expect(third).toEqual(second);
  });

  it('shows each early memory once before its own decision instead of repeating it afterwards', () => {
    const context = {loop:2,previousChoices:firstLoop};
    const opening = [getRomanceScene({...context,choices:[]},'prologue'),getRomanceScene({...context,choices:[]},'decision'),getRomanceScene({...context,choices:['q1-z']},'response'),getRomanceScene({...context,choices:['q1-z']},'decision'),getRomanceScene({...context,choices:['q1-z','q2-now']},'response')];
    const text=opening.flatMap(record=>record.paragraphs).join(' ');
    expect(text.split('已经很认真地约过我一次').length-1).toBe(1);
    expect(text.split('如果明天来不了').length-1).toBe(1);
  });

  it('keeps product prose free of authoring commentary and gives the q6 answer a spoken response', () => {
    const records=getContentCatalog();
    const prohibited=/不被写成|不会被写成|两条前史|自动开关|一件凭空出现|一张根本没画过|没有把一段你没经历过|被结算成|偷偷改成个人线|攻略成一件物品/;
    expect(records.flatMap(record=>record.paragraphs).filter(line=>prohibited.test(line))).toEqual([]);
    expect(records.flatMap(record=>record.paragraphs).filter(line=>/被写成/.test(line))).toEqual([]);
    expect(records.filter(record=>record.id.startsWith('response-q3-')).every(record=>record.paragraphs.some(line=>line.includes('周六 16:30')))).toBe(true);
    const completion=scene(firstLoop,'response');
    expect(completion.paragraphs.join(' ')).toContain('到站');
    expect(completion.paragraphs.join(' ')).toContain('“');
  });

  it('describes the already revealed Sunday photo consistently when explaining a replay', () => {
    const text=getRomanceScene({loop:2,previousChoices:firstLoop,choices:['q1-z','q2-now','q3-w','q4-all']},'response').paragraphs.join(' ');
    expect(text).not.toContain('周日没有显影');
    expect(text).toContain('周五迟迟没有显影');
    expect(text).toContain('周日出现的告别照');
  });

  it('gives both private disclosures and slow-answer replies distinct heroine voices', () => {
    const z=getRomanceScene({loop:2,previousChoices:firstLoop,choices:['q1-z','q2-now','q3-z','q4-private']},'response').paragraphs.join(' ');
    const w=getRomanceScene({loop:2,previousChoices:firstLoop,choices:['q1-w','q2-now','q3-w','q4-private']},'response').paragraphs.join(' ');
    expect(z).toContain('店里缺人');
    expect(w).toContain('工作搭档');
    const zSlow=scene(['q1-z','q2-now','q3-w','q4-all','q5-both','q6-slow'],'response').paragraphs.join(' ');
    expect(zSlow).toContain('为了让我开心');
    expect(zSlow).toContain('定稿');
  });

  it('does not quote an absent Wenxi message as if she had sent it', () => {
    const text=scene(['q1-z'],'response').paragraphs.join(' ');
    expect(text).not.toContain('没有把那句');
    expect(text).toContain('她没有再问');
    expect(text).toContain('取回来了');
  });

  it('delegates outcome evaluation to the graph path checker', () => {
    const friendship = evaluateRomance(['q1-z', 'q2-now', 'q3-w', 'q4-all', 'q5-friends', 'q6-friends']);
    expect(friendship.endingId).toBe('friendship');
    expect(friendship.memoryIds).toEqual({ zhixia: 'mz-friends', wenxi: 'mw-friends' });
    expect(friendship.friendshipResponseIds).toEqual({ zhixia: 'friends-zhixia', wenxi: 'friends-wenxi' });
  });
});
