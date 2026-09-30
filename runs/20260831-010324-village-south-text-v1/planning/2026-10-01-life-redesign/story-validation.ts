import { RomanceStorySchema } from './story-schema.js';

type Story = ReturnType<typeof RomanceStorySchema.parse>;
type Character = Story['characters'][number]['id'];

/** Authoring analysis only. This module is never imported by workspace/game. */
export function traceStoryPath(story: Story, choices: string[]) {
  if (choices.length !== story.nodes.length) throw new Error('One choice is required per decision.');
  const selected = new Map<string, string>();
  story.nodes.forEach((node, index) => {
    const id = choices[index];
    if (!id || !node.choices.some(choice => choice.id === id)) throw new Error(`Choice ${id} does not belong to decision ${node.id}.`);
    selected.set(node.id, id);
  });
  const eligibility = story.romanceEligibility;
  const attention = (id: Character) => eligibility.attentionChoices[id].some(choice => choices.includes(choice));
  const disclosed = (id: Character) => choices.includes(eligibility.publicDisclosure)
    || (choices.includes(eligibility.privateDisclosure) && eligibility.attentionChoices[id].includes(selected.get(eligibility.privateRecipientNode)!));
  const invitation = selected.get(eligibility.inviteNode);
  const asked = eligibility.invitationTargets.find(target => target.choiceId === invitation)!.characters;
  const consent = { zhixia: asked.includes('zhixia') && attention('zhixia') && disclosed('zhixia'), wenxi: asked.includes('wenxi') && attention('wenxi') && disclosed('wenxi') };
  const committed = selected.get(eligibility.confirmNode) === eligibility.confirmChoice;
  let endingId: Story['endings'][number]['id'] = 'open';
  if (committed) {
    if (asked.length === 1 && consent[asked[0]]) endingId = asked[0];
    if (asked.length === 2 && consent.zhixia && consent.wenxi) endingId = 'together';
  }
  let openReason: Story['openReasons'][number]['id'] | null = null;
  if (endingId === 'open') {
    if (asked.length === 0) openReason = 'no-invite';
    else if (!committed) openReason = 'player-slow';
    else if (asked.length === 2 && consent.zhixia !== consent.wenxi) openReason = 'partial-shared-consent';
    else openReason = 'consent-declined-or-pending';
  }
  const memoryFor = (id: Character) => {
    const memory = story.memoryTemplates.filter(m => m.characterId === id).sort((a, b) => a.priority - b.priority).find(m => {
      if (m.requiredEndingId && endingId !== m.requiredEndingId) return false;
      return m.sourceChoices.every(choice => choices.includes(choice));
    });
    if (!memory) throw new Error(`No authored memory for ${id}.`);
    return memory;
  };
  const responseFor = (id: Character) => {
    const answer = story.characterAnswers.find(a => a.characterId === id)!;
    return !asked.includes(id) ? answer.notAskedResponseId : consent[id] ? answer.yesResponseId : answer.pendingResponseId;
  };
  const memories = { zhixia: memoryFor('zhixia'), wenxi: memoryFor('wenxi') };
  return { choices: [...choices], endingId, openReason, consent,
    responseIds: { zhixia: responseFor('zhixia'), wenxi: responseFor('wenxi') },
    memoryIds: { zhixia: memories.zhixia.id, wenxi: memories.wenxi.id },
    secondLoopResponseIds: { zhixia: memories.zhixia.responseId, wenxi: memories.wenxi.responseId },
  };
}

export function enumerateStoryPaths(story: Story) {
  const combinations = story.nodes.reduce<string[][]>((paths, node) => paths.flatMap(path => node.choices.map(choice => [...path, choice.id])), [[]]);
  return combinations.map(choices => traceStoryPath(story, choices));
}

export function storyDecision(story: Story, nodeId: string, loop: number) {
  const node = story.nodes.find(n => n.id === nodeId);
  if (!node) throw new Error(`Unknown decision ${nodeId}.`);
  const override = loop > 1 ? story.secondLoop.decisionOverrides.find(n => n.nodeId === nodeId) : undefined;
  return override ? { ...node, title: override.title, choices: override.choices } : node;
}
