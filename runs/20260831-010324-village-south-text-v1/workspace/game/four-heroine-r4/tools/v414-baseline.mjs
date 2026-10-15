/** v4.14 canonical and exact-before-value source adapter.
 * Strict bytewise historical restore is independently enforced in test-v49-restore.py.
 */
import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const base=new URL('../',import.meta.url);
const read=x=>fs.readFileSync(new URL(x,base),'utf8');
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
export const PREVIOUS_V413_SHA='e7e368dff5e07d70337a492d6d79b9daaf1e61dc5f870ad0f9775bef935a44c3';
export function verifiedV414(){
 const raw=read('data/STORY.json'),latest=JSON.parse(raw);
 const patch=JSON.parse(read('patch/v414_first_night_edits.json'));
 const v415=JSON.parse(read('patch/v415_first_night_edits.json'));
 assert.equal(sha(raw),v415.newStorySha256);
 const v414=structuredClone(latest);
 for(const c of [...v415.changes].reverse()){
  const sc=v414.scenes[c.scene];
  const row=(c.location==='body'?sc.body:sc.choices.find(o=>o.id===c.choice).reply).find(x=>x.id===c.id);
  assert(row&&row.speaker===c.speaker&&row.text===c.after&&row.textHash===c.afterHash);
  row.text=c.before;row.textHash=c.beforeHash;
 }
 assert.equal(sha(JSON.stringify(v414,null,2)+'\n'),patch.newStorySha256);
 assert.equal(patch.baseStorySha256,PREVIOUS_V413_SHA,'v4.14 must descend from exact verified v4.13');
 assert.equal(sha(JSON.stringify(v414,null,2)+'\n'),patch.newStorySha256,'v4.14 restored canonical hash must match signed reversible patch');
 assert.deepEqual(patch.counts,{beats:31,scenes:8});
 assert.equal(patch.changes.length,31);
 const legacy=structuredClone(v414),seen=new Set();
 const beatHash=b=>sha(b.speaker+'\0'+b.text).slice(0,16);
 for(const c of [...patch.changes].reverse()){
  assert(!seen.has(c.id),'duplicate v4.14 text id '+c.id);seen.add(c.id);
  const row=legacy.scenes[c.scene]?.body.find(b=>b.id===c.id);
  assert(row&&row.speaker===c.speaker,'changed or deleted v4.14 beat id '+c.id);
  assert.equal(row.text,c.after);assert.equal(row.textHash,c.afterHash);
  assert.equal(beatHash(row),c.afterHash,'v4.14 textHash drift '+c.id);
  row.text=c.before;row.textHash=c.beforeHash;
  assert.equal(beatHash(row),c.beforeHash);
 }
 // JS reorders numeric object keys during stringify; Python verifies EXACT original bytes.
 assert.equal(Object.keys(legacy.scenes).length,228);
 return {raw,latest:v414,legacy,patch,currentHash:sha(JSON.stringify(v414,null,2)+'\n')};
}

