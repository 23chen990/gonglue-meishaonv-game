import { z } from 'zod';
export const Handoff = z.object({
  schemaVersion: z.literal(1),
  taskId: z.string().min(1),
  role: z.enum(['QAAgent','BuilderAgent','FixerAgent','EditorAgent']),
  repository: z.literal('23chen990/gonglue-meishaonv-game'),
  repoPath: z.string().min(1),
  workspace: z.string().min(1),
  baseCommit: z.string().regex(/^[a-f0-9]{40}$/),
  mode: z.enum(['read-only','isolated-write']),
  scope: z.array(z.string()).min(1),
  requirements: z.array(z.string()).min(1),
  acceptance: z.array(z.string()).min(1),
  outputPath: z.string().min(1),
}).strict();
export const Finding = z.object({id:z.string(),severity:z.enum(['P0','P1','P2']),file:z.string(),sceneId:z.string(),evidence:z.string(),change:z.string(),acceptance:z.array(z.string()).min(1)}).strict();
export const Report = z.object({schemaVersion:z.literal(1),taskId:z.string(),status:z.enum(['PASS','FAIL','BLOCKED','COMPLETE']),summary:z.string(),findings:z.array(Finding),artifacts:z.array(z.string()),checks:z.array(z.object({id:z.string(),status:z.enum(['PASS','FAIL','BLOCKED','SKIP']),evidence:z.string()}).strict()),gaps:z.array(z.string())}).strict();
