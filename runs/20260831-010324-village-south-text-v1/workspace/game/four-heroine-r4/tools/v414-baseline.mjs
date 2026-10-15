/** Restore authenticated v4.14 predecessor for legacy editorial audits.
 * Exact Python bytewise reversal is in test-v49-restore.py; JS objects
 * can reorder numeric-looking keys, so intermediate SHA is NOT guessed.
 */
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const base=new URL('../',import.meta.url);
const read=x=>fs.readFileSync(new URL(x,base),'utf8');
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const beatHash=b=>sha(b.speaker+'\0'+b.text).slice(0,16);
export const PREVIOUS_V413_SHA='e7e368dff5e07d70337a492d6d79b9daaf1e61dc5f870ad0f9775bef935a44c3';
export function verifiedV414(){
 const raw=read('data/STORY.json'),current=JSON.parse(raw);
 const v417=JSON.parse(read('patch/v417_p0_scene_edits.json'));
 const v416=JSON.parse(read('patch/v416_first_night_edits.json'));
 const v415=JSON.parse(read('patch/v415_first_night_edits.json'));
 const patch=JSON.parse(read('patch/v414_first_night_edits.json'));
 assert.equal(sha(raw),v417.newStorySha256,'v4.17 current canonical SHA');
 assert.equal(v417.baseStorySha256,v416.newStorySha256,'v4.17 predecessor');
 assert.equal(v416.baseStorySha256,v415.newStorySha256,'v4.16 predecessor');
 assert.equal(v415.baseStorySha256,patch.newStorySha256,'v4.15 predecessor');
 const reverse=(story,changes)=>{
  const result=structuredClone(story);
  for(const c of [...changes].reverse()){
   const sc=result.scenes[c.scene];
   if(c.location==='label'){
    const option=sc.choices.find(x=>x.id===c.choice);
    assert(option&&option.label===c.after,c.id);
    option.label=c.before;
   } else {
    const rows=c.location==='body'?sc.body:sc.choices.find(x=>x.id===c.choice).reply;
    const row=rows.find(x=>x.id===c.id);
    assert(row&&row.speaker===c.speaker&&row.text===c.after&&row.textHash===c.afterHash,c.id);
    assert(beatHash(row)===row.textHash,c.id);
    row.text=c.before;row.textHash=c.beforeHash;
    assert(beatHash(row)===row.textHash,c.id);
   }
  }
  return result;
 };
 const predecessor416=reverse(current,v417.changes);
 const predecessor415=reverse(predecessor416,v416.changes);
 const v414=reverse(predecessor415,v415.changes);
 assert.equal(patch.baseStorySha256,PREVIOUS_V413_SHA,'v4.14 must descend from v4.13');
 assert.deepEqual(patch.counts,{beats:31,scenes:8});
 assert.equal(patch.changes.length,31);
 const legacy=structuredClone(v414),seen=new Set();
 for(const c of [...patch.changes].reverse()){
  assert(!seen.has(c.id),'duplicate v4.14 id '+c.id);seen.add(c.id);
  const row=legacy.scenes[c.scene]?.body.find(x=>x.id===c.id);
  assert(row&&row.speaker===c.speaker&&row.text===c.after&&row.textHash===c.afterHash,c.id);
  row.text=c.before;row.textHash=c.beforeHash;
  assert(beatHash(row)===c.beforeHash,c.id);
 }
 assert.equal(Object.keys(legacy.scenes).length,228);
 return {raw,latest:v414,legacy,patch,currentHash:patch.newStorySha256};
}
