"""Auditable v4.9 restore: reverse patch into EXACT v4.8 canonical JSON SHA.
No dependency on original repo files or on JS object property order.
"""
from pathlib import Path
import json,hashlib,copy,collections
ROOT=Path(__file__).resolve().parent.parent
sha=lambda b:hashlib.sha256(b).hexdigest()
story=(ROOT/'data/STORY.json').read_bytes()
new=json.loads(story)
p=json.loads((ROOT/'patch/v49_story_punchup.json').read_text())
p410=json.loads((ROOT/'patch/v410_scene_polish.json').read_text())
p411=json.loads((ROOT/'patch/v411_dialogue_pov.json').read_text())
p412=json.loads((ROOT/'patch/v412_reaction_copy.json').read_text())
# v4.14 is only 31 edits of body text + textHash. Reverse its
# exact annotated edits BEFORE all historical predecessor checks.
p415=json.loads((ROOT/'patch/v415_first_night_edits.json').read_text())
assert sha(story)==p415['newStorySha256'], 'v4.15 source drift'
for ch in reversed(p415['changes']):
 sc=new['scenes'][ch['scene']]
 rows=sc['body'] if ch['location']=='body' else next(x for x in sc['choices'] if x['id']==ch['choice'])['reply']
 row=next(x for x in rows if x['id']==ch['id'])
 assert row['text']==ch['after'] and row['textHash']==ch['afterHash']
 row['text']=ch['before'];row['textHash']=ch['beforeHash']
assert sha((json.dumps(new,ensure_ascii=False,indent=2)+'\n').encode())==p415['baseStorySha256']
p414=json.loads((ROOT/'patch/v414_first_night_edits.json').read_text())
assert sha((json.dumps(new,ensure_ascii=False,indent=2)+'\n').encode())==p414['newStorySha256'],'v4.14 predecessor source SHA drift'
assert p414['counts']=={'beats':31,'scenes':8}
assert len(p414['changes'])==31
for ch in reversed(p414['changes']):
 row=next(x for x in new['scenes'][ch['scene']]['body'] if x['id']==ch['id'])
 assert row['speaker']==ch['speaker'] and row['text']==ch['after'] and row['textHash']==ch['afterHash'],ch['id']
 assert sha((row['speaker']+'\0'+row['text']).encode())[:16]==row['textHash'],ch['id']
 row['text']=ch['before'];row['textHash']=ch['beforeHash']
assert sha((json.dumps(new,ensure_ascii=False,indent=2)+'\n').encode())==p414['baseStorySha256'], 'v4.14 exact original-byte restore failed'

# v4.13 adds 16 fully authored intent decision phases without changing any
# historical leaf choice. Reverse the new fields before validating the exact
# v4.12 -> v4.8 editorial provenance chain.
p413=json.loads((ROOT/'patch/v413_decision_steps.json').read_text())
assert p413['baseStorySha256']==p412['newStorySha256']
assert len(p413['decisions'])==16
for sid,groups in p413['decisions'].items():
    sc=new['scenes'][sid]
    staged=sc.pop('decisionSteps')
    assert [x['id'] for x in staged]==[x['id'] for x in groups]
    assert sorted(x for row in staged for x in row['options'])==sorted(x['id'] for x in sc['choices'])
v412_bytes=(json.dumps(new,ensure_ascii=False,indent=2)+'\n').encode()
assert sha(v412_bytes)==p413['baseStorySha256'], 'v4.13 reverse must restore exact v4.12 bytes'
old=copy.deepcopy(new)
assert p412['baseStorySha256']==p411['newStorySha256'], 'v4.11 predecessor SHA drift'
assert p411['baseStorySha256']==p410['newStorySha256'], 'v4.10 predecessor SHA drift'
assert p410['baseStorySha256']==p['newStorySha256'], 'v4.9 predecessor SHA drift'
for ch in reversed(p412['changes']):
 c=next(x for x in old['scenes'][ch['scene']]['choices'] if x['id']==ch['choice'])
 row=c['reply'][ch['index']]
 assert row['id']==ch['id'] and row['speaker']==ch['speaker']
 assert row['text']==ch['after'] and row['textHash']==ch['afterTextHash']
 row['text']=ch['before'];row['textHash']=ch['beforeTextHash']
v411_bytes=(json.dumps(old,ensure_ascii=False,indent=2)+'\n').encode()
assert sha(v411_bytes)==p412['baseStorySha256'], 'v4.12 reverse must restore exact v4.11 bytes'
for ch in reversed(p411['changes']):
 sc=old['scenes'][ch['scene']]
 row=(sc['body'][ch['index']] if ch['loc']=='body' else
      sc['blocks'][ch['index']]['lines'][ch['lineIndex']] if ch['loc']=='block' else
      next(x for x in sc['choices'] if x['id']==ch['choice'])['reply'][ch['lineIndex']])
 assert row['id']==ch['id'] and row['speaker']==ch['speaker'] and row['text']==ch['after'] and row['textHash']==ch['afterTextHash']
 row['text']=ch['before'];row['textHash']=ch['beforeTextHash']
v410_bytes=(json.dumps(old,ensure_ascii=False,indent=2)+'\n').encode()
assert sha(v410_bytes)==p411['baseStorySha256'], 'v4.11 must restore exact v4.10 source'
seen410=set()
for ch in reversed(p410['changes']):
 key=(ch['scene'],ch['choice'],ch['id'])
 assert key not in seen410,key
 seen410.add(key)
 choice=next(x for x in old['scenes'][ch['scene']]['choices'] if x['id']==ch['choice'])
 row=next(x for x in choice['reply'] if x['id']==ch['id'])
 assert row['speaker']==ch['speaker'] and row['text']==ch['after'] and row['textHash']==ch['afterTextHash'],key
 row['text']=ch['before'];row['textHash']=ch['beforeTextHash']
v49_bytes=(json.dumps(old,ensure_ascii=False,indent=2)+'\n').encode()
assert sha(v49_bytes)==p['newStorySha256'], 'v4.10 reverse must restore EXACT v4.9 bytes'
seen=set()
for ch in p['changes']:
 path=ch['path'];assert path not in seen,path;seen.add(path)
 scene=old['scenes'][ch['scene']]
 if ch['kind']=='scene_title':
  assert scene['title']==ch['after'];scene['title']=ch['before'];continue
 bits=path.split('/')[1:]
 if ch['kind']=='choice_label':
  choice=next(x for x in scene['choices'] if x['id']==bits[0]);assert choice['label']==ch['after']
  choice['label']=ch['before'];continue
 assert ch['kind']=='text',ch
 cur=scene
 if bits[0] not in ('body','blocks'):
  cur=next(x for x in scene['choices'] if x['id']==bits[0]);bits.pop(0)
 for bit in bits:cur=cur[int(bit)] if isinstance(cur,list) else cur[bit]
 assert cur['id']==ch['id'] and cur['speaker']==ch['speaker'] and cur['text']==ch['after'],path
 assert cur['textHash']==sha((cur['speaker']+'\0'+cur['text']).encode())[:16],path
 cur['text']=ch['before'];cur['textHash']=sha((cur['speaker']+'\0'+cur['text']).encode())[:16]
old_bytes=(json.dumps(old,ensure_ascii=False,indent=2)+'\n').encode()
assert sha(old_bytes)==p['baseStorySha256'], 'unexpected change outside listed text, label, title or textHash'
counts=collections.Counter(ch['kind'] for ch in p['changes']);assert counts=={'text':158,'choice_label':68,'scene_title':26},counts
assert len({ch['scene'] for ch in p['changes']})==28
print('PASS exact v4.14 -> v4.13 -> v4.12 -> v4.11 -> v4.10 -> v4.9 -> v4.8 rollback; gameplay unchanged')
print('BASE_SHA',p['baseStorySha256'],'NEW_SHA',p['newStorySha256'])
