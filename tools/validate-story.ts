import { readFileSync } from 'node:fs';
import { createHash as hash } from 'node:crypto';
import { RomanceStorySchema } from '../runs/20260831-010324-village-south-text-v1/planning/2026-10-01-life-redesign/story-schema.js';
import { enumerateStoryPaths } from '../runs/20260831-010324-village-south-text-v1/planning/2026-10-01-life-redesign/story-validation.js';
import { PlanningReviewSchema } from '../runs/20260831-010324-village-south-text-v1/planning/2026-10-01-life-redesign/review-contract.js';

const directory = new URL('../runs/20260831-010324-village-south-text-v1/planning/2026-10-01-life-redesign/', import.meta.url);
const data = (file: string) => JSON.parse(readFileSync(new URL(file, directory), 'utf8'));
const story = RomanceStorySchema.parse(data('story-graph.json'));
for (const file of ['luna-story-review.json', 'luna-story-retest.json']) PlanningReviewSchema.parse(data(file));
const paths = enumerateStoryPaths(story);
const count = (values: Array<string | null>) => Object.fromEntries([...new Set(values)].filter((key): key is string => key !== null).map(key => [key, values.filter(value => value === key).length]));
const memories = [...new Set(paths.flatMap(path => Object.values(path.memoryIds)))];
if (paths.length !== 128 || Object.keys(count(paths.map(path => path.endingId))).length !== 4 || memories.length !== 12) throw new Error('Story coverage is incomplete.');
console.log(JSON.stringify({
  schemaVersion: 1,
  title: story.title,
  runId: story.runId,
  scope: 'authoring-only',
  paths: paths.length,
  endingCounts: count(paths.map(path => path.endingId)),
  openReasonCounts: count(paths.map(path => path.openReason)),
  memoryIds: memories,
  inputs: ['story-graph.json', 'story-bible.md', 'story-schema.ts', 'story-validation.ts', 'luna-story-retest.json'].map(file => ({ file, sha256: hash('sha256').update(readFileSync(new URL(file, directory))).digest('hex') })),
  romanceRuntimeImplemented: false,
  readerExperienceVerified: false,
}, null, 2));
