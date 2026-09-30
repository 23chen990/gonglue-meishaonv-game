import { z } from 'zod';

export const PlanningReviewSchema = z.object({
  schemaVersion: z.literal(1),
  targetGame: z.literal('村口向南'),
  runId: z.literal('20260831-010324-village-south-text-v1'),
  workspace: z.literal('/Users/kker/Documents/ChatGPT/妖怪夜市/runs/20260831-010324-village-south-text-v1/workspace'),
  role: z.enum(['runtime-source-audit', 'redesign-challenge']),
  workspaceModified: z.literal(false),
  sources: z.array(z.object({
    path: z.string().min(1),
    lines: z.string().min(1),
    claim: z.string().min(1),
  }).strict()).min(1),
  findings: z.array(z.object({
    id: z.string().min(1),
    priority: z.enum(['P0', 'P1', 'P2']),
    evidenceLevel: z.enum(['source-observation', 'runtime-observation', 'hypothesis']),
    observation: z.string().min(1),
    playerConsequence: z.string().min(1),
    recommendation: z.string().min(1),
    acceptance: z.array(z.string().min(1)).min(1),
  }).strict()).min(1),
  keep: z.array(z.string().min(1)),
  avoid: z.array(z.string().min(1)),
  gaps: z.array(z.string().min(1)),
  validation: z.object({ schema: z.literal('PlanningReviewSchema'), passed: z.literal(true) }).strict(),
}).strict();
