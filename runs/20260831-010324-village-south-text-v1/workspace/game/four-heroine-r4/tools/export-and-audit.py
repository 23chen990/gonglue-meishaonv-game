#!/usr/bin/env python3
"""Export canonical narrative and produce conservative dependency inventories.
Static dependencies are not asserted to be causal runtime effects.
"""
from pathlib import Path
import json,hashlib,re,collections
R=Path(__file__).resolve().parent.parent
D=R/'data';O=R/'docs';Q=R/'qa/current'
O.mkdir(exist_ok=True);Q.mkdir(exist_ok=True)
read=lambda n:json.loads((D/n).read_text())
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
(O/'FULL_STORY.md').write_text('\n'.join(chunks))

# Conditions and direct reference locations are traced rather than equated to meaningful choices.
refs=collections.defaultdict(list);crefs=collections.defaultdict(list);allbeats=[];memory=[];allconditions=[];errors=[]
cues=re.compile(r'上次|那天|那晚|你说过|还记得|第一次|又一次|比上次|早就|我们以前|上回|后来|那次|昨晚|明天|刚才')
allowed={'all','any','not','eq','ne','ge','seen','chosen','deniedPeer','hasDenial','otherActive','canDate','pairReady'}
def scan(x,path,guards=()):
    if isinstance(x,dict):
        own=guards+(x['when'],) if x.get('when') else guards
        if 'when'in x and x['when'] is not None:allconditions.append({'location':path+'/when','condition':x['when']})
        if 'text'in x and 'speaker'in x:
            allbeats.append({'location':path,**x})
            if cues.search(x['text']):
                memory.append({'location':path,'id':x['id'],'text':x['text'],'guards':list(guards),
                  'sourceCheck':'明确条件来源' if guards else '线性前驱或当场行为；自然语言需结合上下文',
                  'note':'命中词不等于错误；第一次可能正在发生，昨晚也可能是角色新报告。不得把词匹配计为已证明一致。'})
        for k in ('eq','ne','ge'):
            if k in x and isinstance(x[k],list):refs[x[k][0]].append(path+'/'+k)
        if 'chosen'in x:crefs['/'.join(x['chosen'])].append(path)
        for k,v in x.items():scan(v,path+'/'+str(k),own)
    elif isinstance(x,list):
        for i,v in enumerate(x):scan(v,path+'/'+str(i),guards)
for fn,obj in [('STORY.json',story),('EPILOGUES.json',ep),('BONUS.json',bonus),('CODA.json',coda)]:
    scan(obj,fn)
def validateq(q,loc):
    if not isinstance(q,dict) or len(q)!=1 or not set(q)<=allowed:errors.append({'location':loc,'error':'unknown/malformed condition','condition':q});return
    k,v=next(iter(q.items()))
    if k in ['all','any']:
        for sub in v:validateq(sub,loc)
    elif k=='not':validateq(v,loc)
    elif k=='chosen':
        sc=story['scenes'].get(v[0]);assert sc and any(o['id']==v[1] for o in sc['choices']),(loc,v)
    elif k=='seen':assert v in story['scenes'],(loc,v)
for x in allconditions:validateq(x['condition'],x['location'])
ids=collections.Counter(x['id'] for x in allbeats)
for k,v in ids.items():
    if v!=1:errors.append({'id':k,'error':'duplicate text ID','count':v})
for b in allbeats:
    if sha_value:=hashlib.sha256((b['speaker']+'\0'+b['text']).encode()).hexdigest()[:16]:
        if b['textHash']!=sha_value:errors.append({'id':b['id'],'error':'stale textHash'})
implicit=[
 (r'^(active|scope|reciprocal|pending|value_conflict|latent|breach|opening_lie|pursued)_[tslg]$', 'tools/engine.mjs: canDate/clean/endingFacts/classifyEnding/availableActions'),
 (r'^(pair_|bridge_|group_accepted_)', 'tools/engine.mjs: pairReady/groupFinish/endingFacts'),
 (r'^(promise_target|promise_due|promise_status|promise_owner)$', 'tools/engine.mjs: choose/@promiseReturn'),
 (r'^(repair_started|repair_issue|repair_action|issue|reopen_after)_[tslg]$', 'tools/engine.mjs: availableActions/finishRepair'),
 (r'^commitment_[tslg]$', 'tools/preview-ui.js: relationsHTML; tools/engine.mjs: knowledge source records'),
 (r'^(t|s|l|g)_goal$', 'tools/engine.mjs: classifyEnding X03'),
 (r'^(first|opening_work|early_end|public_photo_t|xu_result|final_xu|plan_l)$', 'tools/engine.mjs: route selection/evidence/work/lateApplication'),
 (r'^plan_(t|s|l|g|lu)$', 'tools/engine.mjs: recordFate; tools/preview-ui.js: fateHTML（仅因果记录，是否另有演出须看直接读取）')
]
opreads={
 'disclose':'具体人物的 current_relationships 来源；相互知情门槛；可能触发真实前后矛盾发现',
 'discloseAll':'分别更新当场参与者的实际获知；不是替她们同意',
 'denyRelations':'保留当次被否认的具体对象；CROSS/FOUND/修复/遗憾原因',
 'latentLie':'保留未发现的谎言来源；阻止虚假健康结局，允许后续修复',
 'pairConsent':'双方独立接受，形成这一对的关系事实',
 'groupVote':'仅该女主的回答；groupFinish 读取全部独立回答',
 'groupFinish':'组内全部回答、知情、范围、实际成员及分歧共同判定',
 'confessKnown':'主动承认具体历史隐瞒，不直接清除未解决分歧',
 'beginRepair':'保存这次分歧编号；不能跨新问题复用',
 'performRepair':'必须先承认，再实际更正；为最终重新协商提供事实',
 'finishRepair':'核对同一问题的两次实际步骤，再接受关系范围',
 'endRelationship':'结束一段实际关系，并重新计算其他承诺',
 'endAll':'明确停止恋爱安排；仍保留历史而不替别人遗忘',
 'deferDisclosure':'散场后进入真实后续事件，未提前更新知识',
 'recordFate':'核对真实取得的材料及其来源，形成完整命运因果链',
 'resolveWork':'由实际工作选择和早期自救方法结算独身事业',
 'learnFact':'只有指定对象获得指定说法，不等于相信或全员共享',
 'lateApplication':'前期申请计划改变此次晚期实际提交的材料',
 'cooldownReopen':'下一次实际日程重新允许邀约',
 'revealFromPeer':'在场同伴亲口证实具体恋爱事实',
 'ackDiscovery':'实际承认此次已发现的谎言',
 'groupStart':'记录本次真实共同事件和新的个别回答容器',
 'groupWait':'共同关系尚未成立；保留再邀入口'
}
prefixes=json.loads((Q/'choice-witness-prefixes.json').read_text())['choices'] if (Q/'choice-witness-prefixes.json').exists() else {}
explore=json.loads((Q/'exploration.json').read_text()) if (Q/'exploration.json').exists() else {}
contracts=[];writes=collections.defaultdict(list)
for sid,sc in story['scenes'].items():
    for o in sc['choices']:
        cid=sid+'/'+o['id'];down=[];readflags=[];recordonly=[]
        for e in o['effects']:
            if e['op'] in ('set','add'):
                k=e['key'];writes[k].append(cid);ds=refs.get(k,[]);impl=[text for pat,text in implicit if re.search(pat,k)]
                if ds or impl:readflags.append({'fact':k,'value':e.get('value'),'dataReads':ds,'runtimeReads':impl})
                else:recordonly.append(k)
            elif e['op'] in opreads:down.append({'operation':e['op'],'runtimeConsumer':opreads[e['op']]})
        contracts.append({
          'id':cid,'label':o['label'],'availableWhen':o.get('when'),
          'immediateReaction':{'textIds':[x['id'] for x in o['reply']],'conditionalReplies':o.get('replyBlocks',[])},
          'writesAndOperations':o['effects'],'laterFlagReads':readflags,'exactChoiceReads':crefs.get(cid,[]),
          'runtimeConsumers':down,'recordOnlyFlags':recordonly,
          'classification':'存在后续条件或运行时依赖，效果仍需具体回放验证' if readflags or down or crefs.get(cid) else '即时反应／终局色彩／留档，不宣称长期改写',
          'endingImpacts':'见上述具体门槛与命运模块；静态关联不保证这次游玩一定触发',
          'ordinaryInputWitness':'qa/current/choice-witness-prefixes.json :: '+cid if cid in prefixes else None})
(D/'CHOICE_CONTRACTS.json').write_text(json.dumps({'version':story['version'],'storySha256':sha(D/'STORY.json'),
 'method':'全量选择登记；只列真实文本条件和明确运行时消费。留档字段不算长期影响；见测试中具体反事实案例。',
 'choices':contracts},ensure_ascii=False,indent=2)+'\n')
(Q/'memory-inventory.json').write_text(json.dumps({'storySha256':sha(D/'STORY.json'),'method':'全量关键词定位+所在条件；自然语言审查索引，不是语义正确性证明','items':memory},ensure_ascii=False,indent=2)+'\n')
direct=json.loads((Q/'conditional-r3.json').read_text()) if (Q/'conditional-r3.json').exists() else None
nevertrue={x['id']:x for x in direct['missing']} if direct else {k:v for k,v in explore.get('conditionalCoverage',{}).items() if not v['true']}
(Q/'conditional-gaps.json').write_text(json.dumps({'storySha256':sha(D/'STORY.json'),
 'interpretation':'以conditional-r3.json的实际显示见证为准。回应只在对应选项真正执行时计数。覆盖全部文本块不等于穷尽所有状态组合。',
 'unseenTrue':nevertrue},ensure_ascii=False,indent=2)+'\n')
# No hidden assumption that an old r1 tool/report is a current score.
report={'status':'PASS' if not errors else 'FAIL','storySha256':sha(D/'STORY.json'),'errors':errors,
 'counts':{'scenes':len(story['scenes']),'choices':len(contracts),'mainEndings':sum(x['kind']=='ending' for x in story['scenes'].values()),
 'bodyBlocks':sum(len(x['blocks']) for x in story['scenes'].values()),'replyBlocks':sum(len(o.get('replyBlocks',[])) for x in story['scenes'].values() for o in x['choices']),
 'epilogues':len(ep['modules']),'bonus':len(bonus['items']),'coda':len(coda['items']),'textBeats':len(allbeats),'hanCharacters':sum(len(re.findall(r'[\u3400-\u9fff]',x['text'])) for x in allbeats),
 'memoryCueMatches':len(memory),'conditionalLocations':len(allconditions),'dynamicConditionsNotSeenTrue':len(nevertrue),
 'recordOnlyChoices':sum(not x['laterFlagReads'] and not x['exactChoiceReads'] and not x['runtimeConsumers'] for x in contracts)},
 'scope':'Schema/IDs/hashes/predicate structure/source export/dependency inventory. Not a proof that all natural language is consistent or fun.'}
(Q/'static-audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
# Exact scene ledger + author review, regenerated from current sources.
audit=json.loads((Q/'scene-editorial-audit.json').read_text())['reviewedScenes']
ledger=['# r4 逐场交付与审查台账\n','命中代表普通命令到达，不是穷尽条件组合。审查说明为作者第二轮自查，不是外部真人验收。\n','| 场景 | 标题 | 类型 | 选项 | 条件块 | 输入 | 作者复查 |\n|---|---|---|---:|---:|---|---|']
for sid in scene_order:
    sc=story['scenes'][sid]
    reached=any(sid+'/'+o['id'] in prefixes for o in sc['choices'])
    ledger.append('| '+sid+' | '+sc['title']+' | '+sc['kind']+' | '+str(len(sc['choices']))+' | '+str(len(sc['blocks']))+' | '+('有见证' if reached else '未覆盖')+' | '+audit[sid].replace('|','／')+' |')
(O/'SCENE_LEDGER.md').write_text('\n'.join(ledger)+'\n')
# Readable full export: all authored body/replies and explicit conditions, no large effects objects.
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
(O/'FULL_STORY_READABLE.txt').write_text('\n\n'.join(plain)+'\n')
print(json.dumps(report,ensure_ascii=False,indent=2))
if errors:raise SystemExit(1)
