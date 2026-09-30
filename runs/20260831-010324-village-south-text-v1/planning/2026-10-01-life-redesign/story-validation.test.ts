import { readFileSync, existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { RomanceStorySchema } from './story-schema.js';

const raw = () => JSON.parse(readFileSync(new URL('./story-graph.json', import.meta.url), 'utf8'));
type Story = ReturnType<typeof RomanceStorySchema.parse>;
type Trace = {
  choices: string[];
  endingId: string;
  consent: Record<'zhixia' | 'wenxi', boolean>;
  memoryIds: Record<'zhixia' | 'wenxi', string>;
  openReason: string | null;
  responseIds: Record<'zhixia' | 'wenxi', string>;
  secondLoopResponseIds: Record<'zhixia' | 'wenxi', string>;
};
type AuthoringApi = {
  traceStoryPath: (story: Story, choices: string[]) => Trace;
  enumerateStoryPaths: (story: Story) => Trace[];
  storyDecision: (story: Story, nodeId: string, loop: number) => Story['nodes'][number];
};
async function api(): Promise<AuthoringApi> {
  expect(existsSync(new URL('./story-validation.ts', import.meta.url)), 'authoring path checker must exist').toBe(true);
  return import(/* @vite-ignore */ './story-validation.js');
}

describe('story authoring contract (no game runtime)', () => {
  it('accepts the current six-decision story draft', () => {
    expect(RomanceStorySchema.safeParse(raw()).success).toBe(true);
  });
  it('rejects the previous working title after the user named the game', () => {
    const story = raw();
    story.title = '重开后，她们都记得我';
    expect(RomanceStorySchema.safeParse(story).success).toBe(false);
  });
  it('rejects a disclosure choice that is not in the story', () => {
    const story = raw();
    story.romanceEligibility.publicDisclosure = 'q4-nonexistent';
    expect(RomanceStorySchema.safeParse(story).success).toBe(false);
  });
  it('rejects an invitation node that is not in the story', () => {
    const story = raw();
    story.romanceEligibility.inviteNode = 'q7';
    expect(RomanceStorySchema.safeParse(story).success).toBe(false);
  });
  it('rejects a confirmation choice from an earlier decision', () => {
    const story = raw();
    story.romanceEligibility.confirmChoice = 'q1-z';
    expect(RomanceStorySchema.safeParse(story).success).toBe(false);
  });
  it('rejects duplicate decision IDs', () => {
    const story = raw();
    story.nodes[1].id = story.nodes[0].id;
    expect(RomanceStorySchema.safeParse(story).success).toBe(false);
  });
  it('requires an actual ending predicate on romance memories', () => {
    const story = raw();
    delete story.memoryTemplates[0].requiredEndingId;
    expect(RomanceStorySchema.safeParse(story).success).toBe(false);
  });
  it('checks every authored combination and all four endings', async () => {
    const { enumerateStoryPaths } = await api();
    const paths = enumerateStoryPaths(RomanceStorySchema.parse(raw()));
    expect(paths).toHaveLength(128);
    expect(new Set(paths.map(p => p.choices.join('/'))).size).toBe(128);
    expect(new Set(paths.map(p => p.endingId))).toEqual(new Set(['zhixia', 'wenxi', 'together', 'open']));
    expect(paths.every(p => p.choices.length === 6)).toBe(true);
  });
  it('keeps a shared invitation with only one consent in the open ending', async () => {
    const { traceStoryPath } = await api();
    const trace = traceStoryPath(RomanceStorySchema.parse(raw()), ['q1-z', 'q2-now', 'q3-z', 'q4-all', 'q5-both', 'q6-commit']);
    expect(trace.consent).toEqual({ zhixia: true, wenxi: false });
    expect(trace.endingId).toBe('open');
    expect(trace.openReason).toBe('partial-shared-consent');
    expect(trace.responseIds).toEqual({ zhixia: 'answer-zhixia-yes', wenxi: 'answer-wenxi-pending' });
    expect(trace.memoryIds.zhixia).not.toBe('mz-shared');
    expect(trace.memoryIds.wenxi).not.toBe('mw-shared');
  });
  it('does not manufacture romance memories when the invitation is refused', async () => {
    const { traceStoryPath } = await api();
    const trace = traceStoryPath(RomanceStorySchema.parse(raw()), ['q1-w', 'q2-now', 'q3-w', 'q4-private', 'q5-z', 'q6-commit']);
    expect(trace.endingId).toBe('open');
    expect(trace.openReason).toBe('consent-declined-or-pending');
    expect(trace.memoryIds.zhixia).toBe('mz-call');
  });
  it('does not make a romance start when the player chooses to slow down', async () => {
    const { traceStoryPath } = await api();
    const trace = traceStoryPath(RomanceStorySchema.parse(raw()), ['q1-z', 'q2-now', 'q3-w', 'q4-all', 'q5-both', 'q6-slow']);
    expect(trace.consent).toEqual({ zhixia: true, wenxi: true });
    expect(trace.endingId).toBe('open');
    expect(trace.openReason).toBe('player-slow');
    expect(trace.memoryIds).toEqual({ zhixia: 'mz-arrived', wenxi: 'mw-call' });
  });
  it('distinguishes a fulfilled promise from waiting in each character memory', async () => {
    const { traceStoryPath } = await api();
    const story = RomanceStorySchema.parse(raw());
    const returned = traceStoryPath(story, ['q1-w', 'q2-later', 'q3-z', 'q4-all', 'q5-none', 'q6-commit']);
    const waited = traceStoryPath(story, ['q1-w', 'q2-later', 'q3-w', 'q4-all', 'q5-none', 'q6-commit']);
    expect(returned.memoryIds.zhixia).toBe('mz-returned');
    expect(waited.memoryIds.zhixia).toBe('mz-waited');
    const wenxiReturned = traceStoryPath(story, ['q1-z', 'q2-later', 'q3-w', 'q4-all', 'q5-none', 'q6-commit']);
    const wenxiWaited = traceStoryPath(story, ['q1-z', 'q2-later', 'q3-z', 'q4-all', 'q5-none', 'q6-commit']);
    expect(wenxiReturned.memoryIds.wenxi).toBe('mw-returned');
    expect(wenxiWaited.memoryIds.wenxi).toBe('mw-waited');
  });
  it('reaches every one of the twelve separate memory responses', async () => {
    const { enumerateStoryPaths } = await api();
    const story = RomanceStorySchema.parse(raw());
    const memories = enumerateStoryPaths(story).flatMap(p => Object.values(p.memoryIds));
    expect(new Set(memories)).toEqual(new Set(story.memoryTemplates.map(m => m.id)));
    const responses = enumerateStoryPaths(story).flatMap(p => Object.values(p.secondLoopResponseIds));
    expect(new Set(responses).size).toBe(12);
  });
  it('records no invitation separately from slowing an accepted relationship', async () => {
    const { traceStoryPath } = await api();
    const trace = traceStoryPath(RomanceStorySchema.parse(raw()), ['q1-z', 'q2-now', 'q3-w', 'q4-all', 'q5-none', 'q6-commit']);
    expect(trace.openReason).toBe('no-invite');
    expect(trace.responseIds).toEqual({ zhixia: 'answer-zhixia-not-asked', wenxi: 'answer-wenxi-not-asked' });
  });
  it('gives second-loop q4 its own text while retaining six decision IDs', async () => {
    const { storyDecision } = await api();
    expect(typeof storyDecision).toBe('function');
    const story = RomanceStorySchema.parse(raw());
    const first = storyDecision(story, 'q4', 1);
    const second = storyDecision(story, 'q4', 2);
    expect(second.choices.map(c => c.id)).toEqual(first.choices.map(c => c.id));
    expect(second.choices[0].label).toContain('重开');
    expect(second.choices[1].label).toContain('记得');
    expect(second.choices.map(c => c.label)).not.toEqual(first.choices.map(c => c.label));
  });
  it('binds both early replay responses to each character own memory', () => {
    const story = raw();
    expect(story.secondLoop?.responseEvents).toHaveLength(2);
    for (const event of story.secondLoop.responseEvents) {
      expect(['q1', 'q2']).toContain(event.beforeNodeId);
      expect(event.memoryTemplateIds).toHaveLength(6);
      expect(event.memoryTemplateIds.every((id: string) => story.memoryTemplates.some((m: { id: string; characterId: string }) => m.id === id && m.characterId === event.characterId))).toBe(true);
    }
    expect(story.secondLoop.initiatives.map((event: { characterId: string }) => event.characterId)).toEqual(['zhixia', 'wenxi']);
  });
  it('gives both q3 choices a distinct callback from the unselected character', () => {
    const story = raw();
    expect(story.q3Callbacks?.map((c: { choiceId: string; characterId: string }) => [c.choiceId, c.characterId])).toEqual([['q3-z', 'wenxi'], ['q3-w', 'zhixia']]);
    expect(new Set(story.q3Callbacks.map((c: { responseId: string }) => c.responseId)).size).toBe(2);
  });
  it('rejects a path using a choice from the wrong node', async () => {
    const { traceStoryPath } = await api();
    expect(() => traceStoryPath(RomanceStorySchema.parse(raw()), ['q3-z', 'q2-now', 'q1-z', 'q4-all', 'q5-z', 'q6-commit'])).toThrow(/node|decision/);
  });
});
