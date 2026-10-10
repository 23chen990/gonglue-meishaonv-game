import { z } from 'zod';
const Text = z.string().min(1);
const Character = z.enum(['zhixia', 'wenxi']);
const Ending = z.enum(['zhixia', 'wenxi', 'together', 'friendship', 'open']);
const Choice = z.object({ id: Text, label: Text, consequence: Text }).strict();
const OpenReason = z.enum(['player-slow', 'no-invite', 'consent-declined-or-pending', 'partial-shared-consent']);
export const RomanceStorySchema = z.object({
  schemaVersion: z.literal(1),
  artifactType: z.literal('romance-story-graph'),
  status: z.literal('DRAFT_FOR_STORY_REVIEW'),
  runId: z.literal('20260831-010324-village-south-text-v1'),
  workspace: z.literal('/Users/kker/Documents/ChatGPT/妖怪夜市/runs/20260831-010324-village-south-text-v1/workspace'),
  title: z.literal('攻略美少女'), chapter: Text, storyFile: Text,
  characters: z.array(z.object({ id: Character, name: Text, age: z.number().int().min(22), independentGoal: Text }).strict()).length(2),
  protagonistAge: z.number().int().min(22),
  nodes: z.array(z.object({ id: Text, order: z.number().int().min(1).max(6), time: Text, title: Text, choices: z.array(Choice).min(2).max(5) }).strict()).length(6),
  endings: z.array(z.object({ id: Ending, title: Text, condition: Text }).strict()).length(5),
  romanceEligibility: z.object({
    attentionChoices: z.object({ zhixia: z.array(Text), wenxi: z.array(Text) }).strict(),
    publicDisclosure: Text, privateDisclosure: Text, privateRecipientNode: Text,
    inviteNode: Text, confirmNode: Text, confirmChoice: Text,
    invitationIsNotConsent: z.literal(true), partialSharedConsentGoesTo: z.literal('open'),
    invitationTargets: z.array(z.object({ choiceId: Text, characters: z.array(Character).max(2) }).strict()).length(5),
  }).strict(),
  characterAnswers: z.array(z.object({ characterId: Character, yesResponseId: Text, pendingResponseId: Text, notAskedResponseId: Text, yesText: Text, pendingText: Text }).strict()).length(2),
  friendshipAnswers: z.array(z.object({ characterId: Character, responseId: Text, text: Text }).strict()).length(2),
  openReasons: z.array(z.object({ id: OpenReason, text: Text }).strict()).length(4),
  q3Callbacks: z.array(z.object({ choiceId: Text, characterId: Character, responseId: Text, text: Text, waitedSourceChoices: z.array(Text).min(1), waitedText: Text }).strict()).length(2),
  secondLoop: z.object({
    responseEvents: z.array(z.object({ eventId: Text, characterId: Character, beforeNodeId: Text, memoryTemplateIds: z.array(Text).length(7) }).strict()).length(2),
    decisionOverrides: z.array(z.object({ nodeId: Text, title: Text, choices: z.array(Choice).length(2) }).strict()).length(1),
    initiatives: z.array(z.object({ eventId: Text, characterId: Character, afterNodeId: Text, memoryTemplateIds: z.array(Text).length(7), text: Text }).strict()).length(2),
  }).strict(),
  replay: z.object({ anchor: Text, trigger: Text, optional: z.literal(true), physicalItemsCarry: z.literal(false), characterMemoryDepth: z.literal('most-recent-loop-only'), sourceVisibility: z.literal('own-experience-only'), responseSlots: z.object({ zhixia: Text, wenxi: Text }).strict() }).strict(),
  memoryTemplates: z.array(z.object({ id: Text, characterId: Character, priority: z.number().int().positive(), kind: z.enum(['self-romance','shared-romance','friendship','arrived','call','returned','waited']), sourceChoices: z.array(Text).min(1), requiredEndingId: Ending.optional(), responseId: Text, text: Text }).strict()).length(14),
  limitations: z.array(Text).min(1),
}).strict().superRefine((story, ctx) => {
  const choices = story.nodes.flatMap(n => n.choices.map(c => c.id));
  if (new Set(choices).size !== choices.length) ctx.addIssue({ code: 'custom', message: 'Choice IDs must be unique.' });
  if (new Set(story.nodes.map(n => n.id)).size !== story.nodes.length) ctx.addIssue({ code: 'custom', message: 'Decision IDs must be unique.' });
  if (story.nodes.some((n, i) => n.order !== i + 1)) ctx.addIssue({ code: 'custom', message: 'Six nodes must be in chronological order.' });
  const q5 = story.nodes.find(n => n.id === 'q5');
  const q6 = story.nodes.find(n => n.id === 'q6');
  const expectedQ5Choices = ['q5-z', 'q5-w', 'q5-both', 'q5-none', 'q5-friends'];
  const expectedQ6Choices = ['q6-commit', 'q6-slow', 'q6-friends'];
  if (!q5 || q5.choices.length !== expectedQ5Choices.length || q5.choices.map(choice => choice.id).some((id, index) => id !== expectedQ5Choices[index])) ctx.addIssue({ code: 'custom', message: 'q5 must expose the four original invitations followed by q5-friends.' });
  if (!q6 || q6.choices.length !== expectedQ6Choices.length || q6.choices.map(choice => choice.id).some((id, index) => id !== expectedQ6Choices[index])) ctx.addIssue({ code: 'custom', message: 'q6 must expose commit, slow and friendship responses in order.' });
  if (new Set(story.endings.map(e => e.id)).size !== 5) ctx.addIssue({ code: 'custom', message: 'All five endings must exist.' });
  if (new Set(story.characters.map(c => c.id)).size !== 2) ctx.addIssue({ code: 'custom', message: 'Both distinct characters must exist.' });
  if (new Set(story.memoryTemplates.map(m => m.id)).size !== 14) ctx.addIssue({ code: 'custom', message: 'Memory response IDs must be distinct.' });
  for (const memory of story.memoryTemplates) {
    if (memory.sourceChoices.some(id => !choices.includes(id))) ctx.addIssue({ code: 'custom', message: `Unknown memory source in ${memory.id}.` });
    const required = memory.kind === 'self-romance' ? memory.characterId : memory.kind === 'shared-romance' ? 'together' : memory.kind === 'friendship' ? 'friendship' : undefined;
    if (memory.requiredEndingId !== required) ctx.addIssue({ code: 'custom', message: `Incorrect actual-ending predicate in ${memory.id}.` });
    if (memory.kind === 'friendship' && (memory.sourceChoices.length !== 1 || memory.sourceChoices[0] !== 'q6-friends')) ctx.addIssue({ code: 'custom', message: `Friendship memory ${memory.id} must come from q6-friends.` });
  }
  for (const id of ['zhixia','wenxi']) {
    const memories = story.memoryTemplates.filter(m => m.characterId === id);
    if (new Set(memories.map(m => m.kind)).size !== 7) ctx.addIssue({ code: 'custom', message: `Character ${id} lacks a memory branch.` });
  }
  const eligibility = story.romanceEligibility;
  for (const id of [eligibility.publicDisclosure, eligibility.privateDisclosure, eligibility.confirmChoice, ...eligibility.attentionChoices.zhixia, ...eligibility.attentionChoices.wenxi]) {
    if (!choices.includes(id)) ctx.addIssue({ code: 'custom', message: `Unknown eligibility choice: ${id}.` });
  }
  for (const id of [eligibility.privateRecipientNode, eligibility.inviteNode, eligibility.confirmNode]) {
    if (!story.nodes.some(n => n.id === id)) ctx.addIssue({ code: 'custom', message: `Unknown eligibility decision: ${id}.` });
  }
  const confirm = story.nodes.find(n => n.id === eligibility.confirmNode);
  if (confirm && !confirm.choices.some(c => c.id === eligibility.confirmChoice)) ctx.addIssue({ code: 'custom', message: 'Confirmation choice must belong to confirmation decision.' });
  const invite = story.nodes.find(n => n.id === eligibility.inviteNode);
  if (new Set(eligibility.invitationTargets.map(t => t.choiceId)).size !== 5 || eligibility.invitationTargets.some(t => !invite?.choices.some(c => c.id === t.choiceId) || new Set(t.characters).size !== t.characters.length)) ctx.addIssue({ code: 'custom', message: 'Invitation targets must cover each unique invitation choice.' });
  if (new Set(story.openReasons.map(r => r.id)).size !== 4) ctx.addIssue({ code: 'custom', message: 'Every open-ending cause must have separate text.' });
  if (new Set(story.characterAnswers.map(a => a.characterId)).size !== 2) ctx.addIssue({ code: 'custom', message: 'Both characters need independent answers.' });
  for (const event of [...story.secondLoop.responseEvents, ...story.secondLoop.initiatives]) {
    const own = story.memoryTemplates.filter(m => m.characterId === event.characterId).map(m => m.id);
    if (new Set(event.memoryTemplateIds).size !== 7 || event.memoryTemplateIds.some(id => !own.includes(id))) ctx.addIssue({ code: 'custom', message: `Replay event ${event.eventId} must use only its own character memories.` });
    const nodeId = 'beforeNodeId' in event ? event.beforeNodeId : event.afterNodeId;
    const node = story.nodes.find(n => n.id === nodeId);
    if (!node || ('beforeNodeId' in event && node.order > 2)) ctx.addIssue({ code: 'custom', message: `Invalid replay event position: ${event.eventId}.` });
  }
  for (const events of [story.secondLoop.responseEvents, story.secondLoop.initiatives]) {
    if (new Set(events.map(e => e.characterId)).size !== 2) ctx.addIssue({ code: 'custom', message: 'Both characters need distinct replay events.' });
  }
  for (const override of story.secondLoop.decisionOverrides) {
    const node = story.nodes.find(n => n.id === override.nodeId);
    if (!node || override.choices.some(c => !node.choices.some(original => original.id === c.id)) || new Set(override.choices.map(c => c.id)).size !== node.choices.length) ctx.addIssue({ code: 'custom', message: 'Replay override must preserve original decision choice IDs.' });
  }
  for (const callback of story.q3Callbacks) {
    if (!choices.includes(callback.choiceId) || callback.waitedSourceChoices.some(id => !choices.includes(id))) ctx.addIssue({ code: 'custom', message: 'Unknown callback source choice.' });
  }
  const friendshipCharacters = new Set(story.friendshipAnswers.map(a => a.characterId));
  if (friendshipCharacters.size !== 2) ctx.addIssue({ code: 'custom', message: 'Both characters need independent friendship responses.' });
  const responseIds = [...story.memoryTemplates.map(m => m.responseId), ...story.characterAnswers.flatMap(a => [a.yesResponseId, a.pendingResponseId, a.notAskedResponseId]), ...story.friendshipAnswers.map(a => a.responseId), ...story.q3Callbacks.map(c => c.responseId)];
  if (new Set(responseIds).size !== responseIds.length) ctx.addIssue({ code: 'custom', message: 'Response IDs must be distinct.' });
});
