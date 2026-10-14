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
assert sha(story)==p410['newStorySha256'], 'current v4.10 hash drift'
assert p410['baseStorySha256']==p['newStorySha256'], 'v4.9 predecessor SHA drift'
old=copy.deepcopy(new)
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
print('PASS exact v4.10 -> v4.9 -> v4.8 source rollback; no altered gameplay structures')
print('BASE_SHA',p['baseStorySha256'],'NEW_SHA',p['newStorySha256'])
