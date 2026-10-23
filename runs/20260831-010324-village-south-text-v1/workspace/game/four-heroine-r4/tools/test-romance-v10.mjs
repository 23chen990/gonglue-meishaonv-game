import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createState,choose} from './engine.mjs';
const d=JSON.parse(fs.readFileSync(new URL('../data/STORY.json',import.meta.url),'utf8'));
const go=(s,id)=>choose(s,d,id,s.revision).state;
const fromEntry=id=>go(createState(),id);
const canon=fromEntry('canon'),rescue=fromEntry('rescue'),investigate=fromEntry('investigate');
assert.equal(canon.current,'ENTRY_CLUES');
assert.equal(canon.f.first_win,false,'not rescuing should lose the stage victory');
assert.equal(rescue.current,'COLD');
assert.equal(investigate.current,'ENTRY_MEMORY');
const sign=go(canon,'obey'),refuse=go(canon,'refuse'),witness=go(canon,'witness');
assert.equal(sign.f.canon_signed_blame,true,'signature must create later liability');
assert.equal(sign.f.first_night_evidence,'none');
assert.equal(refuse.f.canon_signed_blame,false);
assert.equal(refuse.f.source_declined_handover,true);
assert.equal(witness.f.source_original_timeline,true);
assert.equal(witness.f.first_night_evidence,'timeline');
const t=go(rescue,'t'),s=go(rescue,'s'),l=go(go(investigate,'camera'),'l'),g=go(go(investigate,'email'),'g');
assert.equal(t.f.first_win,true);
assert.equal(t.f.opening_method,'performer_cue');
assert.equal(s.f.opening_method,'producer_switch');
assert.equal(l.f.opening_switch_video,true);
assert.equal(g.f.opening_authorization_checked,true);
assert.notDeepEqual(t.f,s.f);
const camera=go(investigate,'camera'),email=go(investigate,'email');
assert.equal(camera.f.source_pre_switch_timestamp,true);
assert.equal(email.f.source_programme_approval_note,true);
assert.notDeepEqual(camera.f,email.f);
const source=fs.readFileSync(new URL('romance-v10.js',import.meta.url),'utf8');
for (const k of ['ENTRY_CLUES/obey','ENTRY_CLUES/refuse','ENTRY_CLUES/witness','ENTRY_MEMORY/camera','ENTRY_MEMORY/email',
 'COLD/t','COLD/s','COLD/l','COLD/g','OP_FORK/backup','OP_FORK/confront','OP_FORK/quiet',
 'OP_TALK_t/flirt','OP_TALK_s/work','OP_TALK_l/slow','OP_TALK_g/work']){
 assert.ok(source.includes(`'${k}'`),'visible engine-linked consequence missing for '+k);
}
assert.match(source,/flag:\['canon_signed_blame',true\]/);
assert.match(source,/data-v10-next/);
assert.match(source,/source_original_timeline/);
assert.match(source,/ioActions\.wake=\[\['next','站起来'\]\]/);
console.log(JSON.stringify({status:'PASS',sourceHash:fs.readFileSync(new URL('../data/STORY.json',import.meta.url)).length,
 firstForks:['canon','rescue','investigate'],realNegative:'ENTRY_CLUES/obey -> canon_signed_blame=true',
 realWin:'COLD/t -> first_win=true',differentInvestigationFlags:true,heroineBranchCallbacks:4}));