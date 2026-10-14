from pathlib import Path
R=Path(__file__).resolve().parent.parent
P=R/'tools/preview-ui.js'
s=P.read_text(encoding='utf8')
def one(old,new):
 global s
 assert s.count(old)==1,(old,s.count(old))
 s=s.replace(old,new)
old47='c457d2158f27e231cecb7dfc3b4d49031891c7f19d8bfeb99a2542658af7f059'
old48='fae2d536b2b2a12436d0f39cf7a40abe516cde13a87c4295662ecba181dedbf8'
one("// v4.7 changes only displayed wording, not choice IDs, guards, effects or endings.\n// Existing v4.5 progress is replayed and backed up, never silently discarded.\nconst COMPATIBLE_STORY_HASH='"+old47+"';",
 "// v4.9 rewrites presentation text only, not choice IDs, conditions or effects.\n// Existing verified v4.5-v4.8 saves are replayed before backing up and migrating.\nconst COMPATIBLE_STORY_HASHES=new Set(['"+old47+"','"+old48+"']);")
one("(v.storyHash!==STORY_HASH&&v.storyHash!==COMPATIBLE_STORY_HASH)","(v.storyHash!==STORY_HASH&&!COMPATIBLE_STORY_HASHES.has(v.storyHash))")
one("original.storyHash===COMPATIBLE_STORY_HASH&&COMPATIBLE_STORY_HASH!==STORY_HASH","COMPATIBLE_STORY_HASHES.has(original.storyHash)&&original.storyHash!==STORY_HASH")
one("notice='已续接上一版进度，原始记录已备份。只修正了剧情措辞，你做过的选择都还在。';","notice='已续接上一版进度，原始记录已备份。剧情措辞升级，你做过的选择保持不变。';")
one("canon:'陆景行完成钢琴救场；你仍要面对第七天的背锅风险。'", "canon:'不抢陆景行的名场面，先看清程放准备甩锅的那张单。'")
one("rescue:'抢先找回原版 U 盘，改写首演，也改变别人看你的眼光。'","rescue:'按原著线索抢到原版。真正试听和切换交给音控，先赢一局。'")
one("investigate:'先查错版来源、留下证据，再把原版交给音控确认。'","investigate:'原版要找，错版更要追：先拿真证据，防他事后改口。'")
one("canon:'照原著走：留守设备箱'","canon:'按原著走：盯住背锅线'")
one("rescue:'抢先改写：找回原版U盘'","rescue:'抢先救场：找出原版U盘'")
one("investigate:'先查真相：留证再救场'","investigate:'先锁证据：找盘查错版'")
one('v4.8 竖屏全剧情候选。保留四女主','v4.9 竖屏全剧情候选。保留四位独立角色')
P.write_text(s,encoding='utf8')
Q=R/'tools/test-v47-continuity.mjs'
s=Q.read_text(encoding='utf8')
a='assert.equal(sha,patch.newStorySha256);'
b="const v49=JSON.parse(fs.readFileSync(new URL('patch/v49_story_punchup.json',root),'utf8'));\nassert.equal(patch.newStorySha256,v49.baseStorySha256,'v4.7 baseline must be preserved');\nassert.equal(sha,v49.newStorySha256,'current formal story must match v4.9 patch');"
assert s.count(a)==1
Q.write_text(s.replace(a,b),encoding='utf8')
print('UI compatibility and v47 test updated')
