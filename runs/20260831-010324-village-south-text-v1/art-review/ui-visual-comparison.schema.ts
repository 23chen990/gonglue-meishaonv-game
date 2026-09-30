import { z } from 'zod';

const NonEmptyStringSchema = z.string().trim().min(1);
const Sha256Schema = z.string().regex(/^[a-f0-9]{64}$/);
const RatingSchema = z.number().int().min(1).max(5);

const ImageRecordSchema = z.object({
  path: NonEmptyStringSchema,
  sha256: Sha256Schema,
  dimensions: z.object({
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    orientation: z.enum(['portrait', 'landscape']),
  }).strict(),
  transparency: z.object({
    required: z.literal(false),
    validation: z.literal('not_applicable_fullscreen_opaque_mockup'),
    reason: NonEmptyStringSchema,
  }).strict(),
}).strict().superRefine((image, context) => {
  const expected = image.dimensions.height >= image.dimensions.width ? 'portrait' : 'landscape';
  if (image.dimensions.orientation !== expected) {
    context.addIssue({
      code: 'custom',
      path: ['dimensions', 'orientation'],
      message: `orientation must match dimensions (${expected})`,
    });
  }
});

const CandidateSchema = z.object({
  id: z.enum([
    'direction_a_rural_ledger_collage',
    'direction_b_woodcut_lianhuanhua',
    'direction_c_modern_archive',
    'direction_d_warm_pixel_narrative',
  ]),
  label: NonEmptyStringSchema,
  image: ImageRecordSchema,
  visualLanguage: NonEmptyStringSchema,
  interactionStructure: z.object({
    hierarchy: z.array(NonEmptyStringSchema).min(3),
    suitableFor: z.array(NonEmptyStringSchema).min(1),
    choiceImpactVisibility: z.enum(['not_shown', 'indirect', 'explicit']),
  }).strict(),
  mobileReadability: z.object({
    overall: RatingSchema,
    systemVisibility: RatingSchema,
    choiceConsequenceClarity: RatingSchema,
    touchTargetConfidence: RatingSchema,
    strengths: z.array(NonEmptyStringSchema).min(1),
    risks: z.array(NonEmptyStringSchema).min(1),
  }).strict(),
  productionFit: z.object({
    score: RatingSchema,
    strengths: z.array(NonEmptyStringSchema).min(1),
    risks: z.array(NonEmptyStringSchema).min(1),
  }).strict(),
  limitations: z.array(NonEmptyStringSchema).min(1),
}).strict();

const RevisionSchema = z.object({
  id: z.enum(['modern_archive_integrated_v2', 'modern_archive_system_impact_v3']),
  basedOnCandidateId: z.literal('direction_c_modern_archive'),
  image: ImageRecordSchema,
  intent: NonEmptyStringSchema,
  status: z.enum(['superseded_by_user_feedback', 'recommended_layout_revision_not_human_approved']),
  evidence: z.array(NonEmptyStringSchema).min(1),
}).strict();

export const UiVisualComparisonArtifactSchema = z.object({
  schemaVersion: z.literal(1),
  artifactType: z.literal('ui_visual_candidate_comparison'),
  runId: z.literal('20260831-010324-village-south-text-v1'),
  targetGame: z.literal('村口向南'),
  targetWorkspace: z.literal('runs/20260831-010324-village-south-text-v1/workspace/game'),
  generatedAt: z.string().datetime({ offset: true }),
  scope: z.object({
    mode: z.literal('read_only_production_support'),
    candidateCount: z.literal(4),
    gameWorkspaceModified: z.literal(false),
    comparisonBasis: z.array(NonEmptyStringSchema).min(3),
  }).strict(),
  candidates: z.array(CandidateSchema).length(4),
  selectionEvidence: z.object({
    status: z.literal('user_selected_base_visual_direction'),
    selectedCandidateId: z.literal('direction_c_modern_archive'),
    ordinalStatement: z.literal('第二张图作为视觉定稿吧'),
    screenshot: ImageRecordSchema,
    screenshotMatch: z.object({
      matchedCandidatePath: z.literal('runs/20260831-010324-village-south-text-v1/art-review/ui-concepts/ui-c-modern-archive.png'),
      basis: z.literal('manual_visual_match_of_header_crop'),
      confidence: z.literal('high'),
      note: NonEmptyStringSchema,
    }).strict(),
    subsequentFeedback: z.array(z.object({
      statement: NonEmptyStringSchema,
      designImplication: NonEmptyStringSchema,
    }).strict()).min(2),
    approvalBoundary: NonEmptyStringSchema,
  }).strict(),
  revisions: z.array(RevisionSchema).length(2),
  recommendation: z.object({
    candidateId: z.literal('direction_c_modern_archive'),
    status: z.literal('recommended_and_user_selected_base_direction'),
    implementationReferencePath: z.literal('runs/20260831-010324-village-south-text-v1/art-review/ui-concepts/ui-revision-system-impact-v3.png'),
    rationale: z.array(NonEmptyStringSchema).min(3),
    requiredImplementationRules: z.array(NonEmptyStringSchema).min(5),
    humanApprovalWritten: z.literal(false),
  }).strict(),
  globalLimitations: z.array(NonEmptyStringSchema).min(5),
  validation: z.object({
    validator: z.literal('zod'),
    schemaPath: z.literal('runs/20260831-010324-village-south-text-v1/art-review/ui-visual-comparison.schema.ts'),
    command: z.literal('pnpm exec tsx runs/20260831-010324-village-south-text-v1/art-review/validate-ui-visual-comparison.ts'),
    validatedAt: z.string().datetime({ offset: true }),
    success: z.literal(true),
  }).strict(),
}).strict().superRefine((artifact, context) => {
  const ids = artifact.candidates.map((candidate) => candidate.id);
  if (new Set(ids).size !== ids.length) {
    context.addIssue({ code: 'custom', path: ['candidates'], message: 'candidate ids must be unique' });
  }
  if (!ids.includes(artifact.selectionEvidence.selectedCandidateId)) {
    context.addIssue({ code: 'custom', path: ['selectionEvidence', 'selectedCandidateId'], message: 'selected candidate must exist' });
  }
  if (!ids.includes(artifact.recommendation.candidateId)) {
    context.addIssue({ code: 'custom', path: ['recommendation', 'candidateId'], message: 'recommended candidate must exist' });
  }
});

export type UiVisualComparisonArtifact = z.infer<typeof UiVisualComparisonArtifactSchema>;
