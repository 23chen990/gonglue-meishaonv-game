import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { UiVisualComparisonArtifactSchema } from './ui-visual-comparison.schema.js';

const runRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const artifactPath = path.join(runRoot, 'artifacts', 'ui-visual-comparison.json');
const raw = JSON.parse(await readFile(artifactPath, 'utf8')) as unknown;
const artifact = UiVisualComparisonArtifactSchema.parse(raw);

process.stdout.write(`${JSON.stringify({
  valid: true,
  artifactType: artifact.artifactType,
  candidateCount: artifact.candidates.length,
  selectedCandidateId: artifact.selectionEvidence.selectedCandidateId,
  recommendation: artifact.recommendation.candidateId,
  gameWorkspaceModified: artifact.scope.gameWorkspaceModified,
})}\n`);
