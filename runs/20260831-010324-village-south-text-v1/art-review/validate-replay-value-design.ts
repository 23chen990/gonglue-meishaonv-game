import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'yaml';
import { HumanDecisionSchema, ReplayValueDesignSchema } from './replay-value-design.schema.js';

const runRoot = path.resolve(import.meta.dirname, '..');
const approval = HumanDecisionSchema.parse(parse(await readFile(path.join(runRoot, 'human/replay-value-decision.yaml'), 'utf8')));
const design = ReplayValueDesignSchema.parse(JSON.parse(await readFile(path.join(runRoot, 'artifacts/replay-value-design.json'), 'utf8')) as unknown);

if (design.sourceArtifacts.humanDecision !== 'human/replay-value-decision.yaml' || approval.decision !== 'APPROVE') {
  throw new Error('Replay value design is not linked to the approved human decision.');
}

process.stdout.write(`${JSON.stringify({
  valid: true,
  runId: design.runId,
  familyConditions: design.familyConditions.length,
  eventPoolSize: design.scope.eventPoolSize,
  visualRevision: design.visualLock.revision,
  saveMigration: `${design.saveMigration.fromVersion}->${design.saveMigration.toVersion}`,
})}\n`);
