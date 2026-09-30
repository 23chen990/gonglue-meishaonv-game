import { z } from 'zod';

const StatIdSchema = z.enum(['economy', 'skill', 'health', 'bonds']);
const EffectsSchema = z.partialRecord(StatIdSchema, z.number().int().min(-3).max(3));

const HumanDecisionSchema = z.object({
  schemaVersion: z.literal(1),
  runId: z.literal('20260831-010324-village-south-text-v1'),
  decision: z.literal('APPROVE'),
  approvedScope: z.tuple([
    z.literal('replay_value_vertical_slice'),
    z.literal('modern_archive_system_impact_v3'),
  ]),
  sourceQuote: z.literal('做吧，你是总策划，你来指挥，直接做成最好的样子交付给我'),
  constraints: z.array(z.string().min(1)).min(3),
  recordedAt: z.string().datetime(),
}).strict();

export const ReplayValueDesignSchema = z.object({
  schemaVersion: z.literal(1),
  artifactType: z.literal('replay_value_vertical_slice_design'),
  runId: z.literal('20260831-010324-village-south-text-v1'),
  targetGame: z.literal('村口向南'),
  targetWorkspace: z.literal('runs/20260831-010324-village-south-text-v1/workspace/game'),
  generatedAt: z.string().datetime(),
  sourceArtifacts: z.object({
    narrativePrototype: z.literal('artifacts/narrative-life-prototype.json'),
    choiceAudit: z.literal('artifacts/narrative-choice-audit.json'),
    iaaReview: z.literal('artifacts/iaa-monetization-review.json'),
    openSourceResearch: z.literal('artifacts/open-source-research.json'),
    visualComparison: z.literal('artifacts/ui-visual-comparison.json'),
    humanDecision: z.literal('human/replay-value-decision.yaml'),
  }).strict(),
  scope: z.object({
    visibleStats: z.tuple([
      z.literal('economy'), z.literal('skill'), z.literal('health'), z.literal('bonds'),
    ]),
    noNewVisibleSystems: z.literal(true),
    decisionsPerRun: z.literal(6),
    choicesPerDecision: z.literal(2),
    familyConditionCount: z.literal(6),
    eventPoolSize: z.literal(12),
    secondRunDifferenceByDecision: z.literal(2),
  }).strict(),
  familyConditions: z.array(z.object({
    id: z.string().regex(/^condition_[a-z_]+$/),
    title: z.string().min(2),
    summary: z.string().min(8),
    effects: EffectsSchema,
    setFlag: z.string().regex(/^condition_[a-z_]+$/),
  }).strict()).length(6),
  eventSlots: z.array(z.object({
    slot: z.number().int().min(1).max(6),
    year: z.number().int().min(1978).max(1981),
    beat: z.string().min(2),
    variantIds: z.tuple([z.string().regex(/^event_0[1-6]/), z.string().regex(/^event_0[1-6]_alt_/)]),
    selectionRule: z.literal('seeded_by_run_number_and_family_condition'),
  }).strict()).length(6),
  verdicts: z.array(z.object({
    id: z.string().regex(/^verdict_[a-z_]+$/),
    title: z.string().min(2),
    conditionHint: z.string().min(4),
  }).strict()).min(5).max(7),
  inheritances: z.array(z.object({
    id: z.string().regex(/^experience_[a-z_]+$/),
    stat: StatIdSchema,
    title: z.string().min(2),
    nextRunEffects: EffectsSchema,
  }).strict()).length(4),
  visualLock: z.object({
    baseDirection: z.literal('direction_c_modern_archive'),
    revision: z.literal('modern_archive_system_impact_v3'),
    referencePath: z.literal('art-review/ui-concepts/ui-revision-system-impact-v3.png'),
    standardFactoryStyleLockCreated: z.literal(false),
    reason: z.literal('The run does not have standard game-blueprint/art-directions inputs; this run-specific approval must not be misrepresented as the factory StyleLockSchema.'),
    implementationRules: z.array(z.string().min(8)).min(7),
  }).strict(),
  feedback: z.object({
    choicePressMs: z.number().int().min(80).max(200),
    statPulseMs: z.number().int().min(180).max(500),
    resultRevealMs: z.number().int().min(300).max(900),
    reducedMotionSupported: z.literal(true),
    layers: z.tuple([
      z.literal('button_press'), z.literal('stat_direction'), z.literal('result_stamp'), z.literal('delayed_echo_stamp'),
    ]),
  }).strict(),
  saveMigration: z.object({
    fromVersion: z.literal(2),
    toVersion: z.literal(3),
    preservesInProgressRun: z.literal(true),
    futureVersionPolicy: z.literal('fail_closed_to_fresh_v3'),
    corruptPolicy: z.literal('fail_closed_to_fresh_v3'),
  }).strict(),
  iaa: z.object({
    provider: z.literal('browser_mock_only'),
    firstRun: z.literal('no_mid_chapter_ads'),
    optionalPlacement: z.literal('chapter_complete_route_clue_from_run_2'),
    noAdLockedChoices: z.literal(true),
    maxAdsPerRun: z.literal(2),
    maxAdsPerSession: z.literal(3),
    minMinutesBetweenAds: z.literal(6),
  }).strict(),
  acceptance: z.array(z.string().min(8)).min(10),
}).strict().superRefine((design, context) => {
  if (new Set(design.familyConditions.map((item) => item.id)).size !== 6) {
    context.addIssue({ code: 'custom', path: ['familyConditions'], message: 'family condition ids must be unique' });
  }
  if (new Set(design.eventSlots.map((item) => item.slot)).size !== 6) {
    context.addIssue({ code: 'custom', path: ['eventSlots'], message: 'event slots must be unique' });
  }
  if (design.eventSlots.flatMap((item) => item.variantIds).length !== design.scope.eventPoolSize) {
    context.addIssue({ code: 'custom', path: ['eventSlots'], message: 'event pool size must match all variants' });
  }
});

export { HumanDecisionSchema };
