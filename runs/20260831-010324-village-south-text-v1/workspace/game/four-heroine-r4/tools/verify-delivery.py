#!/usr/bin/env python3
"""Source/evidence identity gate. Browser, physical-device and human gates are separate."""
from pathlib import Path
import json,hashlib,re,sys
R=Path(__file__).resolve().parent.parent
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda n:json.loads((R/n).read_text())
errors=[];checks=[]
def check(name,fn):
    try: detail=fn();checks.append({'name':name,'status':'PASS','detail':detail})
    except Exception as e:errors.append({'name':name,'error':str(e)});checks.append({'name':name,'status':'FAIL','error':str(e)})
html=(R/'play.html').read_text();hs=sha(R/'data/STORY.json');he=sha(R/'tools/engine.mjs')
def bundles():
    assert (R/'index.html').read_bytes()==(R/'play.html').read_bytes()
    runtime=(R/'runtime.mjs').read_text()
    for symbol,fn in [('DATA','STORY.json'),('EP','EPILOGUES.json'),('BONUS','BONUS.json'),('CODA','CODA.json'),('HB','HANDBOOK.json')]:
        for text in (html,runtime):
            start=text.index('const '+symbol+'=')+len('const '+symbol+'=')
            parsed,end=json.JSONDecoder().raw_decode(text[start:])
            assert parsed==J('data/'+fn),symbol+' is stale'
    assert 'const STORY_HASH='+json.dumps(hs) in html
    import html as html_module
    for page in ('index.html','play.html','repository-index.html'):
        assert 'name="story-sha256" content="'+hs+'"' in (R/page).read_text(), page+' stale story metadata'
    engine=re.sub(r'^export\s+','',(R/'tools/engine.mjs').read_text(),flags=re.M)
    assert engine in html
    assert not re.search(r'<script[^>]+\bsrc\s*=',html,re.I)
    assert not re.search(r'<link[^>]+rel=["\']stylesheet',html,re.I)
    m=J('build-meta.json')
    for p,h in m['files'].items():assert sha(R/p)==h,p
    assert 'src="/src/main.ts"' in (R/'repository-index.html').read_text()
    return 'Standalone and repository module contain identical canonical content; build hashes checked.'
check('Canonical source and both builds match',bundles)
def graph():
    d=J('data/STORY.json');c=J('data/CHOICE_CONTRACTS.json');st=J('qa/current/static-audit.json')
    assert d['version']=='revision-r4.0' and len(d['scenes'])==225
    ids={s['id']+'/'+o['id'] for s in d['scenes'].values() for o in s['choices']}
    assert len(ids)==737 and ids=={x['id'] for x in c['choices']}
    assert c['storySha256']==hs and st['storySha256']==hs and st['status']=='PASS'
    assert len(J('data/EPILOGUES.json')['modules'])==40
    assert len(J('data/BONUS.json')['items'])==8 and len(J('data/CODA.json')['items'])==6
    assert hs in (R/'docs/FULL_STORY.md').read_text()
    for sid in d['scenes']:assert '## '+sid+'｜' in (R/'docs/FULL_STORY.md').read_text()
    return st['counts']
check('Counts, choice contracts and complete export',graph)
def evidence():
    for n in ['regression.json','information-regression.json','final-edges.json','exploration.json','witnesses.json','rendered-routes.json','r3-product.json','conditional-r3.json']:
        d=J('qa/current/'+n)
        assert d['hashes']['story']==hs and d['hashes']['engine']==he,n+' stale'
        assert not d.get('failed',0) and not d.get('failures',[]),n
    d=J('qa/current/conditional-r3.json')
    assert d['covered']==d['total']==565 and not d['missing']
    assert len(J('qa/current/archive-expectations.json')['endings'])==24
    return 'Current ordinary-command evidence matches this story/engine. All 565 conditional text blocks have displayed witnesses; state combinations are not exhaustive.'
check('Fresh command and displayed-text evidence',evidence)
for n in ['README.md','START_HERE.md','docs/CODEX_HANDOFF.md','docs/ENGINE_CONTRACT.md','docs/QA_REPORT.md','docs/FIRST_PLAY_REVIEW.md','docs/SCENE_LEDGER.md']:
    if not (R/n).is_file():errors.append({'name':'Required handoff','error':'Missing '+n})
report={'status':'PASS' if not errors else 'FAIL','hashes':{'story':hs,'engine':he,'html':sha(R/'play.html')},'checks':checks,'errors':errors,
'releaseGates':{'sourceAndCommandQA':'PASS' if not errors else 'FAIL','actualEntryAndNativePersistence':'REQUIRES_CURRENT_CI_BROWSER_REPORT','physicalPhone':'NOT_TESTED','allStateCombinations':'NOT_EXHAUSTIVE','humanRetention':'NOT_TESTED','IAAPlatformRelease':'NOT_IMPLEMENTED'},
'note':'This checker does not run browser tests or grant publishing approval. Never use historical browser evidence as a current result.'}
(R/'qa/current/delivery-integrity.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(report,ensure_ascii=False,indent=2))
if errors:sys.exit(1)
