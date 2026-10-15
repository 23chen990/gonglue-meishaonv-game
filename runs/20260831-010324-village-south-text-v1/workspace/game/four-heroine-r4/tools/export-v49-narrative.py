#!/usr/bin/env python3
"""Rebuild the two human-readable narrative artifacts exactly as the canonical
`export-and-audit.py` generator formats them, without requiring CI fixtures.
This local subset does not regenerate choice dependency inventories.
"""
from pathlib import Path
import json,hashlib
R=Path(__file__).resolve().parent.parent
D=R/'data';O=R/'docs'
read=lambda name:json.loads((D/name).read_text(encoding='utf-8'))
story=read('STORY.json');ep=read('EPILOGUES.json');bonus=read('BONUS.json');coda=read('CODA.json')
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
fmt=lambda x:json.dumps(x,ensure_ascii=False,separators=(',',':'))
names={'N':'旁白','P':'许照','T':'唐映雪','S':'沈清辞','L':'林见月','G':'顾晚棠','LU':'陆景行','A':'阿衡','B':'原著记忆','C':'程放','U':'系统','X':'现场'}
chunks=['# 《攻略美少女》r4 完整条件剧情导出\n',
'本文件由 `tools/export-and-audit.py` 从正式 JSON 自动生成。正文、条件块、即时回应、回应条件、效果与后继全部包含；条件分支并非在一次游玩中同时出现。Markdown 不作为编辑源。\n',
'正式剧情 SHA-256：`'+sha(D/'STORY.json')+'`\n',
'## 人物与日程\n', '```json\n'+json.dumps({k:story[k] for k in ['version','cast','actionBudget','calendar','anchors','endingRules']},ensure_ascii=False,indent=2)+'\n```\n']
def rows(bs):
    return '\n\n'.join('**'+names.get(b['speaker'],b['speaker'])+'**：'+b['text']+'\n\n`'+b['id']+'`' for b in bs)+'\n'
opening_order=['ENTRY_WAKE','ENTRY_CLUES','ENTRY_MEMORY','COLD','OP_SETTLE']
scene_order=opening_order+[k for k in story['scenes'] if k.startswith('OP_') and k not in opening_order]+[k for k in story['scenes'] if k not in opening_order and not k.startswith('OP_')]
for sid in scene_order:
    sc=story['scenes'][sid]
    chunks+=['\n---\n','## '+sid+'｜'+sc['title']+'\n',
             '类型：`'+sc['kind']+'`。元数据：`'+fmt({k:v for k,v in sc.items() if k not in ['body','blocks','choices','title','id','kind']})+'`\n',
             '### 正文\n',rows(sc['body'])]
    for b in sc['blocks']:
        chunks+=['### 条件正文 · '+b.get('id','')+'\n','条件：`'+fmt(b['when'])+'`\n',rows(b['lines'])]
    for o in sc['choices']:
        chunks+=['### 选择 '+sid+'/'+o['id']+'\n',o['label']+'\n',
                 '可选条件：`'+fmt(o.get('when'))+'`\n','立即回应：\n',rows(o['reply'])]
        for b in o.get('replyBlocks',[]):
            chunks+=['回应条件：`'+fmt(b['when'])+'`（按点击前状态判断）\n',rows(b['lines'])]
        chunks+=['写入与操作：`'+fmt(o['effects'])+'`\n','后继：`'+str(o.get('next',sc.get('next','完成本次私人日程'))) +'`\n']
for title,key,items in [('40项命运尾声','modules',ep['modules']),('8篇番外','items',bonus['items']),('6项补充收束','items',coda['items'])]:
    chunks+=['\n# '+title+'\n']
    for x in items:
        chunks+=['## '+x['id']+'｜'+x.get('title','补充收束')+'\n',
                 '条件与解锁：`'+fmt({k:v for k,v in x.items() if k not in ['id','title','body','blocks','choices']})+'`\n',rows(x['body'])]
        for b in x.get('blocks',[]):chunks+=['条件：`'+fmt(b['when'])+'`\n',rows(b['lines'])]
chunks+=['\n# 运行时原因模板及日程文案\n','```json\n'+json.dumps({k:story[k] for k in ['uiText','reasonText']},ensure_ascii=False,indent=2)+'\n```\n',
         '\n# 免费原著手册\n','```json\n'+json.dumps(read('HANDBOOK.json'),ensure_ascii=False,indent=2)+'\n```\n']
(O/'FULL_STORY.md').write_text('\n'.join(chunks),encoding='utf-8')
plain=['攻略美少女 r4 · 全量分支阅读稿\n','本稿含所有分支，不是一条线性小说。带条件的段落只在相应路径出现。\n','正式源SHA-256：'+sha(D/'STORY.json')+'\n']
def plainrows(rs):
    return '\n'.join((names.get(x['speaker'],x['speaker'])+'：' if names.get(x['speaker'],x['speaker']) else '')+x['text'] for x in rs)
for sid in scene_order:
    sc=story['scenes'][sid]
    plain.extend(['\n'+'='*40,'【'+sid+'】'+sc['title'],plainrows(sc['body'])])
    for b in sc['blocks']:
        plain.extend(['\n[条件正文 '+fmt(b['when'])+']',plainrows(b['lines'])])
    for o in sc['choices']:
        plain.extend(['\n【选择 '+sid+'/'+o['id']+'】'+o['label'],'[可选条件 '+fmt(o.get('when'))+']',plainrows(o['reply'])])
        for b in o.get('replyBlocks',[]):plain.extend(['[回应条件 '+fmt(b['when'])+']',plainrows(b['lines'])])
for category,items in [('命运尾声',ep['modules']),('番外',bonus['items']),('收束',coda['items'])]:
    plain.append('\n'+'='*40+'\n'+category)
    for x in items:
        plain.extend(['\n【'+x['id']+'】'+x.get('title','收束'),'[条件 '+fmt(x.get('when',x.get('requires')))+']',plainrows(x['body'])])
        for b in x.get('blocks',[]):plain.extend(['[条件 '+fmt(b['when'])+']',plainrows(b['lines'])])
plain.extend(['\n原著手册\n',json.dumps(read('HANDBOOK.json'),ensure_ascii=False,indent=2)])
(O/'FULL_STORY_READABLE.txt').write_text('\n\n'.join(plain)+'\n',encoding='utf-8')
print('Generated full Markdown and plain-text route exports for SHA',sha(D/'STORY.json'))
