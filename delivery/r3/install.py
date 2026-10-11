# One-time hash-verified transfer. Subsequent runs NEVER overwrite edits.
from pathlib import Path, PurePosixPath
import base64, bz2, hashlib, json, os, shutil, sys, subprocess
ROOT=Path(__file__).resolve().parents[2]
D=ROOT/'delivery/r3'
GAME=ROOT/'runs/20260831-010324-village-south-text-v1/workspace/game'
F=GAME/'four-heroine'
MARKER=D/'INSTALLED.json'
def sha(b):return hashlib.sha256(b).hexdigest()
def gitblob(p):
 b=p.read_bytes()
 return hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()
def output(value):
 target=os.environ.get('GITHUB_OUTPUT')
 if target:
  with open(target,'a') as f:f.write('installed='+value+'\n')
if MARKER.exists():
 marker=json.loads(MARKER.read_text())
 if marker.get('kind')!='four-heroine-r3-initial-transfer' or not (F/'data/STORY.json').is_file():
  raise SystemExit('Invalid installation marker; refusing silent repair or overwrite.')
 print('Canonical source is already installed. Keeping current edits; tests will verify them.')
 output('false');sys.exit(0)
assert not F.exists() and not F.is_symlink(),'Unexpected existing module; refusing bootstrap overwrite'
ready=json.loads((D/'READY.json').read_text())
assert ready['format']=='bz2-json-utf8-filemap-v1'
assert 0<len(ready['parts'])<=64
encoded=''
for name in ready['parts']:
 assert PurePosixPath(name).name==name and name.startswith('source-') and name.endswith('.b64')
 part=(D/name).read_text().strip()
 assert sha(part.encode('ascii'))==ready['partSHA256'][name],'Source shard mismatch: '+name
 encoded+=part
blob=base64.b64decode(encoded,validate=True)
assert sha(blob)==ready['payloadSHA256'],'Transferred source payload SHA mismatch'
raw=bz2.decompress(blob)
assert len(raw)<16_000_000 and sha(raw)==ready['decodedSHA256']
bundle=json.loads(raw.decode('utf-8'))
assert bundle['format']=='four-heroine-r3-source-map-v1'
files=bundle['files'];assert 1<len(files)<1000
expected={
 GAME/'src/main.ts':'8fbeb066df2eb20cb64d90f74f26ee1c14c0ebe3',
 GAME/'index.html':'a77231eba9e9bc22ce41292bb3105ea76bef24d9',
 ROOT/'package.json':'9e3bbf216cf9e2902c7d4baf41c853c4e57605c9',
 ROOT/'AGENTS.md':'d8b5c936afef5b3b8ec0c2ef471e1e3e5594eb49',
 ROOT/'HANDOFF.md':'7a6c2f20e3dcff195abfa9ca3174b65c08d9e710',
 ROOT/'README.md':'6c7feb22f5014014a52c7eb3a6afbd766d5f2712'
}
for path,h in expected.items():assert path.is_file() and gitblob(path)==h,'Existing user file changed: '+str(path)
for name,entry in files.items():
 parts=PurePosixPath(name)
 assert not parts.is_absolute() and '..' not in parts.parts and '\\' not in name and name
 dest=F.joinpath(*parts.parts)
 assert dest.resolve().is_relative_to(F.resolve())
 assert isinstance(entry['text'],str) and sha(entry['text'].encode('utf-8'))==entry['sha256'],name
 assert not dest.exists(),'Refusing to overwrite an existing canonical file: '+name
for name,entry in files.items():
 p=F/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(entry['text'],encoding='utf-8')
for name in ['qa/current','qa/ci','qa/browser-real']:
 (F/name).mkdir(parents=True,exist_ok=True)
H=ROOT/'docs/history/pre-r3';H.mkdir(parents=True,exist_ok=True)
for path in expected:
 dest=H/str(path.relative_to(ROOT))
 dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(path,dest)
(GAME/'src/main.ts').write_text("// Four-heroine canonical runtime. Historical engines remain isolated.\nimport '../four-heroine/runtime.mjs';\n")
subprocess.run(['node',str(F/'tools/build-preview.mjs')],cwd=F,check=True)
shutil.copyfile(F/'repository-index.html',GAME/'index.html')
p=ROOT/'package.json';pkg=json.loads(p.read_text());scripts=pkg['scripts']
module='runs/20260831-010324-village-south-text-v1/workspace/game/four-heroine'
old_verify=scripts['verify'];old_dev=scripts['dev'];old_build=scripts['build']
scripts.update({
 'r3:build':'pnpm --dir '+module+' build',
 'r3:verify':'pnpm --dir '+module+' verify',
 'r3:browser':'pnpm --dir '+module+' test:browser',
 'dev':'pnpm r3:build && '+old_dev,
 'build':'pnpm r3:build && '+old_build,
 'verify:legacy':old_verify,
 'verify':'pnpm r3:verify && pnpm verify:legacy'
})
p.write_text(json.dumps(pkg,ensure_ascii=False,indent=2)+'\n')
shutil.copyfile(F/'START_HERE.md',ROOT/'START_HERE.md')
(ROOT/'README.md').write_text('# 攻略美少女 · 四女主 r3\n\n先读 [START_HERE.md](START_HERE.md)。\n\n当前工作分支 codex/four-heroine-r3-acceptance-20261012；main 未自动合并。\n默认入口已切换到许照、唐映雪、沈清辞、林见月、顾晚棠；旧双女主代码保留但不加载。\n\n```sh\npnpm install --frozen-lockfile\npnpm verify\npnpm dev\n```\n\n正式源：`'+module+'/data/`。剧情、运行时、阅读器与测试全部在该模块。\n不要改生成 Markdown 代替 JSON。工程验收看当前 CI、build hash 与真实浏览器报告；真机/真人/广告另有发布门禁。\n\n历史根文档已保留于 docs/history/pre-r3/。\n',encoding='utf-8')
(ROOT/'HANDOFF.md').write_text('# 当前交接：四女主 r3\n\n本分支已根据用户授权安装真实四女主源码、切换默认入口、配置 CI。请按 START_HERE.md 和 `'+module+'/docs/CODEX_HANDOFF.md` 执行。\n\n历史两女主交接和原暂停/修复计数保留于 docs/history/pre-r3/HANDOFF.md 及原 implementation 目录，不把它们当本轮结果。\n\n当前验证状态以当前提交的 Actions 作业和匹配 build-meta.json 的结果为准。不要把上传前空工作流视为通过。\n',encoding='utf-8')
(ROOT/'AGENTS.md').write_text('''# Current four-heroine r3 instructions

User explicitly authorized continued implementation and GitHub upload. Work only in
codex/four-heroine-r3-acceptance-20261012 unless the user later chooses another branch.
Do not push/merge main or force-push. Do not delete prior failures or original user work.

Read START_HERE.md and the module docs/CODEX_HANDOFF.md and ENGINE_CONTRACT.md first.
Canonical source is workspace/game/four-heroine/data/*.json; default main.ts imports
four-heroine/runtime.mjs. Old zhixia/wenxi modules and old story graph are history, not
the four-heroine source. Do not restore the missing imaginary v6 or an old Markdown export.

Preserve four adult heroines, 15 combinations, 24 endings, 40 epilogues, 8 bonuses,
6 codas and independent Lu Jingxing agency. Consent, interest, commitments, knowledge
sources and repair causes must not collapse into a single affinity score.
Important memories require an actual source choice and event, not merely scene access.

Run pnpm verify and real HTTP browser QA for changed runtime/UI/storage. Add red/green
reproductions for defects. Never replace real navigation with injected markup to claim
native storage acceptance. Do not skip legacy tests or change expectations only to hide bugs.
Do not claim physical-phone, human timing/retention or platform release acceptance from CI.
No advertising SDK, production character art or audio is delivered by this story runtime.

delivery/r3 is a one-time transfer seed. INSTALLED.json makes later CI preserve the
checked-in canonical source; do not rerun bootstrap over later edits. Build and test
actual source. Keep failed evidence and hash-bind reports. No secrets in repository.
Historical agent instructions are preserved at docs/history/pre-r3/AGENTS.md.
''',encoding='utf-8')
marker={'kind':'four-heroine-r3-initial-transfer','payloadSHA256':ready['payloadSHA256'],
        'sourceFiles':{k:v['sha256'] for k,v in files.items()},
        'baseCommit':'42c779020c5818c7409ea051f099a454e81ac0a1'}
MARKER.write_text(json.dumps(marker,indent=2)+'\n')
print('Installed',len(files),'canonical files and the actual default entry; legacy source preserved.')
output('true')
