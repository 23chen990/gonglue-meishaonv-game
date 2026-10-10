import { RomanceStorySchema } from './story-schema.js';

type Story = ReturnType<typeof RomanceStorySchema.parse>;
type Character = Story['characters'][number]['id'];

/** Shared bounded story rules. Authoring and the romance runtime use the same evaluator. */
export function traceStoryPath(story: Story, choices: string[]) {
  if (choices.length !== story.nodes.length) throw new Error('One choice is required per decision.');
  const selected = new Map<string, string>();
  story.nodes.forEach((node, index) => {
    const id = choices[index];
    if (!id || !node.choices.some(choice => choice.id === id)) throw new Error(`Choice ${id} does not belong to decision ${node.id}.`);
    selected.set(node.id, id);
  });
  const invitation = selected.get('q5');
  const confirmation = selected.get('q6');
  if (invitation === 'q5-friends' && confirmation !== 'q6-friends') {
    throw new Error(`Choice ${confirmation} is unavailable after q5-friends.`);
  }
  const eligibility = story.romanceEligibility;
  const attention = (id: Character) => eligibility.attentionChoices[id].some(choice => choices.includes(choice));
  const disclosed = (id: Character) => choices.includes(eligibility.publicDisclosure)
    || (choices.includes(eligibility.privateDisclosure) && eligibility.attentionChoices[id].includes(selected.get(eligibility.privateRecipientNode)!));
  const asked = eligibility.invitationTargets.find(target => target.choiceId === invitation)!.characters;
  const consent = { zhixia: asked.includes('zhixia') && attention('zhixia') && disclosed('zhixia'), wenxi: asked.includes('wenxi') && attention('wenxi') && disclosed('wenxi') };
  const committed = confirmation === eligibility.confirmChoice;
  let endingId: Story['endings'][number]['id'] = 'open';
  if (confirmation === 'q6-friends') {
    endingId = 'friendship';
  } else if (committed) {
    if (asked.length === 1 && consent[asked[0]]) endingId = asked[0];
    if (asked.length === 2 && consent.zhixia && consent.wenxi) endingId = 'together';
  }
  let openReason: Story['openReasons'][number]['id'] | null = null;
  if (endingId === 'open') {
    if (!committed) openReason = 'player-slow';
    else if (asked.length === 0) openReason = 'no-invite';
    else if (asked.length === 2 && consent.zhixia !== consent.wenxi) openReason = 'partial-shared-consent';
    else openReason = 'consent-declined-or-pending';
  }
  const memoryFor = (id: Character) => {
    const memories = story.memoryTemplates.filter(m => m.characterId === id).sort((a, b) => a.priority - b.priority);
    const matches = (memory: typeof memories[number]) => memory.sourceChoices.every(choice => choices.includes(choice));
    const memory = memories.find(m => m.requiredEndingId === endingId && matches(m))
      ?? memories.find(m => !m.requiredEndingId && matches(m));
    if (!memory) throw new Error(`No authored memory for ${id}.`);
    return memory;
  };
  const responseFor = (id: Character) => {
    const answer = story.characterAnswers.find(a => a.characterId === id)!;
    return !asked.includes(id) ? answer.notAskedResponseId : consent[id] ? answer.yesResponseId : answer.pendingResponseId;
  };
  const friendshipResponseFor = (id: Character) => story.friendshipAnswers.find(answer => answer.characterId === id)!.responseId;
  const memories = { zhixia: memoryFor('zhixia'), wenxi: memoryFor('wenxi') };
  return { choices: [...choices], endingId, openReason, consent,
    responseIds: { zhixia: responseFor('zhixia'), wenxi: responseFor('wenxi') },
    friendshipResponseIds: { zhixia: friendshipResponseFor('zhixia'), wenxi: friendshipResponseFor('wenxi') },
    memoryIds: { zhixia: memories.zhixia.id, wenxi: memories.wenxi.id },
    secondLoopResponseIds: { zhixia: memories.zhixia.responseId, wenxi: memories.wenxi.responseId },
  };
}

export function enumerateStoryPaths(story: Story) {
  const walk = (index: number, choices: string[]): ReturnType<typeof traceStoryPath>[] => {
    if (index === story.nodes.length) return [traceStoryPath(story, choices)];
    const node = story.nodes[index];
    const decision = storyDecision(story, node.id, 1, choices);
    return decision.choices.flatMap(choice => walk(index + 1, [...choices, choice.id]));
  };
  return walk(0, []);
}

export function storyDecision(story: Story, nodeId: string, loop: number, history: string[] = []) {
  const node = story.nodes.find(n => n.id === nodeId);
  if (!node) throw new Error(`Unknown decision ${nodeId}.`);
  const override = loop > 1 ? story.secondLoop.decisionOverrides.find(n => n.nodeId === nodeId) : undefined;
  const decision = override ? { ...node, title: override.title, choices: override.choices } : node;
  if (nodeId !== 'q6' || history.length === 0) return decision;
  const q5Choice = history.length >= 5 ? history[4] : history[history.length - 1];
  if (q5Choice === 'q5-friends') return { ...decision, choices: decision.choices.filter(choice => choice.id === 'q6-friends') };
  return decision;
}
