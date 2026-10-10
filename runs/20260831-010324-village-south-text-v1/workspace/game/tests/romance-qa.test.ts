// QA tool regressions are tooling evidence, not the game's acceptance results.
import {describe,it,expect} from 'vitest';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {RomanceEngine} from '../src/romance-engine.js';
import {getRomanceScene,STORY_VERSION} from '../src/romance-content.js';
import {relevantState,runQa} from '../../../../../tools/qa-romance.js';

describe('QA tool provenance and finite scope',()=>{
  it('validates the current declared graph without recycling historical counts or reviewer approval',()=>{
    const result=JSON.parse(execFileSync(process.execPath,['--import','tsx',fileURLToPath(new URL('../../../../../tools/validate-story.ts',import.meta.url))],{cwd:fileURLToPath(new URL('../../../../../',import.meta.url)),encoding:'utf8',stdio:['ignore','pipe','pipe']}));
    expect(result.paths).toBe(208);
    expect(Object.keys(result.endingCounts)).toHaveLength(5);
    expect(result.memoryIds).toHaveLength(14);
    expect(result.readerExperienceVerified).toBe(false);
    expect(result.historicalReviewsAreCurrentAcceptance).toBe(false);
  });
  it('compares equivalent game states across independent engine instances without discarding narrative state',()=>{
    const storage=()=>{const data=new Map<string,string>();return {getItem:(k:string)=>data.get(k)??null,setItem:(k:string,v:string)=>{data.set(k,v);},removeItem:(k:string)=>{data.delete(k);}};};
    const first=new RomanceEngine(storage(),{storyVersion:STORY_VERSION,getScene:getRomanceScene});
    const second=new RomanceEngine(storage(),{storyVersion:STORY_VERSION,getScene:getRomanceScene});
    expect(first.getState().runId).not.toBe(second.getState().runId);
    expect(relevantState(first.getState())).toEqual(relevantState(second.getState()));
    expect(first.continue(first.getDecisionToken())).toBe(true);
    expect(relevantState(first.getState())).not.toEqual(relevantState(second.getState()));
  });
  it('stops a limited actual-engine export early and never emits complete coverage',async()=>{
    const folder=mkdtempSync(join(tmpdir(),'romance-qa-cap-'));
    try {
      const report=await runQa(['--max-states','2','--out',join(folder,'qa.json'),'--storycheck-out',join(folder,'model.json')]);
      expect(report.status).toBe('INCOMPLETE');
      expect(report.complete).toBe(false);
      expect(Number(report.observedFirstLoopPaths)).toBeLessThan(208);
    } finally {rmSync(folder,{recursive:true,force:true});process.exitCode=0;}
  });
});
