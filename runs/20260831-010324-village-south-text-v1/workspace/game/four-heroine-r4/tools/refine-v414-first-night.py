#!/usr/bin/env python3
"""Safely refine only a known applied v4.14 edit. No new script decisions."""
import argparse,copy,hashlib,json
from pathlib import Path
R=Path(__file__).resolve().parent.parent
S=R/'data/STORY.json'
P=R/'patch/v414_first_night_edits.json'
PLAN=R/'patch/v414_first_night_plan.json'
sha=lambda b:hashlib.sha256(b).hexdigest()
h=lambda row:sha((row['speaker']+'\0'+row['text']).encode())[:16]
serialize=lambda d:(json.dumps(d,ensure_ascii=False,indent=2)+'\n').encode()
p=argparse.ArgumentParser();p.add_argument('--apply',action='store_true');args=p.parse_args()
raw=S.read_bytes();story=json.loads(raw)
patch=json.loads(P.read_text());plan=json.loads(PLAN.read_text())
assert sha(raw)==patch['newStorySha256'],'Unknown source hash; no changes permitted'
assert patch['baseStorySha256']==plan['baseStorySha256']
assert patch['counts']=={'beats':31,'scenes':8}
assert len(patch['changes'])==len(plan['changes'])==31
wanted={(x['scene'],x['id']):x for x in plan['changes']}
changed=[]
for c in patch['changes']:
 key=(c['scene'],c['id']);a=wanted[key]
 assert a['speaker']==c['speaker'] and c['before']!=a['text']
 row=next(x for x in story['scenes'][c['scene']]['body'] if x['id']==c['id'])
 assert row['speaker']==c['speaker'] and row['text']==c['after']
 assert row['textHash']==c['afterHash']==h(row)
 if row['text']!=a['text']:
  changed.append(c['id'])
  row['text']=a['text'];row['textHash']=h(row)
  c['after']=row['text'];c['afterHash']=row['textHash']
assert len(changed) in (0,4),('Unexpected refinement scope',changed)
assert all(x.startswith('OP_TALK_g.r4.body.') for x in changed),changed
assert len(story['scenes'])==228
assert sum(len(s['choices']) for s in story['scenes'].values())==751
assert sum(s['kind']=='ending' for s in story['scenes'].values())==24
original=copy.deepcopy(story)
for c in reversed(patch['changes']):
 row=next(x for x in original['scenes'][c['scene']]['body'] if x['id']==c['id'])
 assert row['text']==c['after'] and row['textHash']==c['afterHash']
 row['text']=c['before'];row['textHash']=c['beforeHash']
assert sha(serialize(original))==patch['baseStorySha256'],'Historical source changed'
patch['newStorySha256']=sha(serialize(story))
if changed and args.apply:
 S.write_bytes(serialize(story));P.write_bytes(serialize(patch))
elif changed:raise SystemExit('Refinement pending; rerun with --apply')
assert sha(S.read_bytes())==patch['newStorySha256']
print('PASS controlled v4.14 refinement',changed,patch['newStorySha256'])

