import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';
import { getContentCatalog, ROMANCE_STORY, STORY_VERSION } from '../runs/20260831-010324-village-south-text-v1/workspace/game/src/romance-content.js';
import { enumerateStoryPaths } from '../runs/20260831-010324-village-south-text-v1/planning/2026-10-01-life-redesign/story-validation.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const run = '20260831-010324-village-south-text-v1';
const audit = 'docs/release-audit/2026-10-08';
const biblePath = `runs/${run}/planning/2026-10-01-life-redesign/story-bible.md`;
const contentPath = `runs/${run}/workspace/game/src/romance-content.ts`;
const hash = (text: string) => createHash('sha256').update(text).digest('hex');
const SceneSchema = z.object({ id: z.string().min(1), title: z.string().min(1), time: z.string().min(1), paragraphs: z.array(z.string().min(1)).min(1), choices: z.array(z.object({id:z.string(),label:z.string()}).strict()), endingId:z.string().optional() }).strict();
const ReviewSchema = z.object({
  id:z.string(), sceneIds:z.array(z.string()).min(1), category:z.string(),
  source:z.object({path:z.string(),sha256:z.string(),line:z.number().int().positive(),original:z.string().min(1)}).strict(),
  classification:z.enum(['runtime-wiring','editorial-expansion']),
  finding:z.string().min(1), change:z.string().min(1), acceptance:z.array(z.string()).min(1),
  replacement:SceneSchema,
}).strict();

function originalRange(id:string):[number,number,string,string] {
  if(id.startsWith('prologue'))return [66,84,'prologue','把既有人物、离开安排和双重快门写入实际开场；知夏的上轮片段仅在重开序幕出现。'];
  const q=id.match(/^(?:decision|response)-(q[1-6])/)?.[1];
  if(q==='q1')return [84,109,q,'分别呈现参与开店/撤展的行动及缺席后果；通过当事人消息传递信息。'];
  if(q==='q2')return [109,126,q,'即时通话不追加隐含预约；次日当面沟通明确为十四点，闻溪记忆在作出当前决定前出现。'];
  if(q==='q3')return [128,173,q,'兑现承诺、失约等待与普通工作回访分开；肖像仅在画室路径创作并由闻溪保管；第二周目双方主动邀请。'];
  if(q==='q4')return [173,192,q,'公开说明与私下说明区分知情对象；重开时仅引用自身片段，另一人次日才听见车票安排。'];
  if(q==='q5')return [194,236,q,'写出完整邀请和两人独立回答；私下说明路径先告知另一人；未做模特不引用肖像；朋友选择有完整双方回答。'];
  if(q==='q6')return [236,246,q,'22:30 对实际回答作出口头回应；同意、暂缓、未询问与玩家慢下来分别保留；此处尚未触发回卷。'];
  if(id.startsWith('ending-zhixia'))return [248,260,'ending-zhixia','知夏由自己提出不营业的约会，以留灯和特意来见的行动收束。'];
  if(id.startsWith('ending-wenxi'))return [260,277,'ending-wenxi','闻溪主动提出不工作的下午；肖像归属随 q3 是否实际画过而改变。'];
  if(id.startsWith('ending-together'))return [277,292,'ending-together','分别保留两人的约会安排和自身意愿，明确建立共同恋爱关系。'];
  if(id.startsWith('ending-friendship'))return [236,246,'ending-friendship','落实现有未提交测试要求的朋友结局；保留曾有的恋爱回答，明确本次不开始恋爱。'];
  if(id.startsWith('ending-open'))return [292,302,'ending-open','分别写清玩家慢下来、未邀请、暂缓及共同邀请单方同意；不擅自改投个人线。'];
  throw new Error(`Unmapped published scene: ${id}`);
}

export async function exportAudit() {
  const bible=await readFile(resolve(root,biblePath),'utf8');
  const baseline=execFileSync('git',['show',`26b5481631aa396aac26a61de8bc9745a1599880:${biblePath}`],{cwd:root,encoding:'utf8'});
  if(bible!==baseline)throw new Error('Original prose no longer matches the recorded baseline; do not mislabel it.');
  const lines=bible.split('\n'),catalog=getContentCatalog().map(s=>SceneSchema.parse(s));
  const groups=new Map<string,{scene:typeof catalog[number];ids:string[]}>();
  for(const scene of catalog) {
    const key=JSON.stringify([scene.title,scene.time,scene.paragraphs,scene.choices,scene.endingId]);
    const group=groups.get(key);
    if(group)group.ids.push(scene.id);else groups.set(key,{scene,ids:[scene.id]});
  }
  const reviews=[...groups.values()].map(({scene,ids})=>{
    const [start,end,category,change]=originalRange(scene.id);
    return ReviewSchema.parse({id:`prose-${hash(JSON.stringify([scene.title,scene.time,scene.paragraphs,scene.choices,scene.endingId])).slice(0,16)}`,sceneIds:ids,category,source:{path:biblePath,sha256:hash(bible),line:start,original:lines.slice(start-1,end-1).join('\n')},classification:'editorial-expansion',finding:'原文属于剧情讨论稿；基线默认入口没有渲染本场景。此记录说明落实和编辑变化，不把原稿中的条件提示冒充已证实的运行缺陷。',change,acceptance:['实际 provider 导出的完整正文；精确 sceneIds 可对账','选择路径和来源条件见 actual-engine 回放与分支目录','正文可达不等于浏览器可读或玩家喜欢；后者单独验收'],replacement:scene});
  });
  if(reviews.flatMap(r=>r.sceneIds).length!==catalog.length)throw new Error('Published scene/review coverage mismatch');
  const paths=enumerateStoryPaths(ROMANCE_STORY);
  const mapping=catalog.map(scene=>({sceneId:scene.id,proseId:reviews.find(r=>r.sceneIds.includes(scene.id))!.id}));
  const document={schemaVersion:1,targetGame:'攻略美少女',runId:run,workspace:resolve(root,`runs/${run}/workspace/game`),baseCommit:'26b5481631aa396aac26a61de8bc9745a1599880',storyVersion:STORY_VERSION,source:{path:contentPath,sha256:hash(await readFile(resolve(root,contentPath),'utf8')),biblePath,bibleSha256:hash(bible)},counts:{sceneIds:catalog.length,distinctProse:reviews.length,uniqueParagraphs:new Set(catalog.flatMap(s=>s.paragraphs)).size,legalFirstPaths:paths.length},scope:'所有首轮及第二轮等价发布正文。loop>=3 与第二轮文本规则相同；目录调用实际 provider 枚举所有先前完整路径×当前合法前缀，不代替这些组合的逐步存档或浏览器回放。',mapping,reviews};
  await mkdir(resolve(root,audit),{recursive:true});
  await writeFile(resolve(root,audit,'scene-rewrite-records.json'),JSON.stringify(document,null,2)+'\n');
  await writeFile(resolve(root,audit,'scene-catalog.json'),JSON.stringify({schemaVersion:1,...document.source,counts:document.counts,scenes:catalog},null,2)+'\n');
  await writeFile(resolve(root,audit,'branch-map.json'),JSON.stringify({schemaVersion:1,runId:run,source:document.source,nodes:ROMANCE_STORY.nodes,secondLoop:ROMANCE_STORY.secondLoop,paths,mapping,finiteModel:'repository-story.json',engineWitnesses:'qa-romance-report.json',scope:document.scope},null,2)+'\n');
  const full=['# 《攻略美少女》完整替换稿','',`源码 ${contentPath}；版本 ${STORY_VERSION}。${catalog.length} 个发布场景 ID 对应以下 ${reviews.length} 份正文。精确映射见 scene-rewrite-records.json。`,'','人物与既定事实保持原稿；新增朋友收尾来自用户现有测试。序幕/回应使用“继续”，以下选项只在 decision 展示。'];
  for(const record of reviews){const s=record.replacement;full.push('',`## ${record.id}｜${s.title}｜${s.time}`,'',`代表 scene ID：${s.id}；同文场景 ${record.sceneIds.length} 个。`,'',...s.paragraphs.flatMap(p=>[p,'']),...(s.choices.length?['选项：','',...s.choices.map(c=>`- ${c.id}：${c.label}`)]:[]));}
  await writeFile(resolve(root,audit,'full-replacement-script.md'),full.join('\n')+'\n');
  const changes=['# 逐场改写记录','',`原文证据：${biblePath}（基线 26b5481631aa396aac26a61de8bc9745a1599880，SHA-256 ${hash(bible)}）。基线运行乡土篇，原恋爱文稿没有默认运行入口。所有改写的完整替换内容见 full-replacement-script.md / scene-rewrite-records.json。`];
  for(const record of reviews)changes.push('',`## ${record.id}｜${record.category}`,'',`代表场景：${record.replacement.id}；覆盖 ${record.sceneIds.length} 个同文场景。原文起始行：${record.source.line}。`,'',record.finding,'',`实际修改：${record.change}`,'','原文：','',...record.source.original.split('\n').map(l=>'> '+l),'',`完整替换稿：full-replacement-script.md 中的 ${record.id}。验收：${record.acceptance.join('；')}`);
  await writeFile(resolve(root,audit,'scene-rewrite-records.md'),changes.join('\n')+'\n');
  console.log(JSON.stringify(document.counts));
  return document;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))void exportAudit();
