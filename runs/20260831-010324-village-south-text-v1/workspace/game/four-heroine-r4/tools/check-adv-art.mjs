#!/usr/bin/env node
/**
 * ADV-V6 master CG technical preflight; intentionally does NOT pretend to judge composition.
 * No third-party packages required. Works with PNG, lossy/lossless WebP, and JPEG.
 *
 * Usage (from game/four-heroine-r4):
 *   node tools/check-adv-art.mjs --manifest art/adv-v6/shot-manifest.json
 *   node tools/check-adv-art.mjs --manifest art/adv-v6/shot-manifest.json --strict
 *   node tools/check-adv-art.mjs --baseline
 *   node tools/check-adv-art.mjs --root /path/to/four-heroine-r4 --baseline --json report.json
 *
 * In report mode 'planned' images are BLOCKED, not erroneously passed.
 * In strict mode, any planned/unapproved/missing or low-res shot causes exit code 2.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const opts = process.argv.slice(2);
function valueOf(flag, fallback) {
  const i = opts.indexOf(flag);
  if (i < 0) return fallback;
  if (i + 1 >= opts.length || opts[i + 1].startsWith('--')) throw new Error(`${flag} needs a value`);
  return opts[i + 1];
}
const root = path.resolve(valueOf('--root', path.resolve(here, '..')));
const strict = opts.includes('--strict');
const baseline = opts.includes('--baseline');
const activePreview = opts.includes('--active-preview');
if(baseline&&activePreview)throw new Error('--baseline and --active-preview cannot be used together');
const manifestPath = valueOf('--manifest', 'art/adv-v6/shot-manifest.json');
const jsonPath = valueOf('--json', '');

function readImageDimensions(buf) {
  if (buf.length >= 24 && buf.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) {
    return {kind:'PNG', width:buf.readUInt32BE(16),height:buf.readUInt32BE(20)};
  }
  if (buf.length >= 30 && buf.toString('ascii',0,4)==='RIFF' && buf.toString('ascii',8,12)==='WEBP') {
    let p = 12;
    while (p + 8 <= buf.length) {
      const tag=buf.toString('ascii',p,p+4),size=buf.readUInt32LE(p+4),d=p+8;
      if (d+size>buf.length) throw new Error('truncated WebP chunk');
      if (tag==='VP8X' && size>=10) {
        return {kind:'WebP/VP8X',width:1+buf.readUIntLE(d+4,3),height:1+buf.readUIntLE(d+7,3)};
      }
      if (tag==='VP8L' && size>=5 && buf[d]===0x2f) {
        const width=1+buf[d+1]+((buf[d+2]&0x3f)<<8);
        const height=1+((buf[d+2]>>6)&0x03)+(buf[d+3]<<2)+((buf[d+4]&0x0f)<<10);
        return {kind:'WebP/VP8L',width,height};
      }
      if (tag==='VP8 ' && size>=10) {
        if (buf[d+3]!==0x9d||buf[d+4]!==0x01||buf[d+5]!==0x2a) throw new Error('invalid VP8 frame header');
        return {kind:'WebP/VP8',width:buf.readUInt16LE(d+6)&0x3fff,height:buf.readUInt16LE(d+8)&0x3fff};
      }
      p=d+size+(size&1);
    }
    throw new Error('WebP image dimensions not found');
  }
  if (buf.length>=4 && buf[0]===0xff && buf[1]===0xd8) {
    let p=2;
    while (p+4<buf.length) {
      while (p<buf.length && buf[p]!==0xff) p++;
      while (p<buf.length && buf[p]===0xff) p++;
      if (p>=buf.length)break;
      const marker=buf[p++];
      if (marker===0xd9 || marker===0xda) break;
      if ([0x01,0xd0,0xd1,0xd2,0xd3,0xd4,0xd5,0xd6,0xd7].includes(marker))continue;
      if (p+2>buf.length)break;
      const size=buf.readUInt16BE(p);if(size<2||p+size>buf.length)break;
      if ([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker) && size>=7) {
        return {kind:'JPEG',width:buf.readUInt16BE(p+5),height:buf.readUInt16BE(p+3)};
      }
      p+=size;
    }
    throw new Error('JPEG SOF image dimensions not found');
  }
  throw new Error('unsupported/corrupt image: expected PNG, WebP or JPEG');
}
function resolveSafe(relative) {
  const actual=path.resolve(root,relative);
  if (!actual.startsWith(root+path.sep)) throw new Error('asset escapes game root');
  return actual;
}
function auditAsset(item) {
  const errors=[];const warnings=[];
  const name=item.shotId || item.name || '?';
  const filename=item.assetPath;
  if (!filename || typeof filename!=='string') return {name,assetPath:filename,status:'BLOCKED',errors:['assetPath missing'],warnings};
  if (/^scene_[^/]+\.(webp|png)$/i.test(path.basename(filename))) errors.push('legacy feather-composite scene_* asset is forbidden');
  let actual;
  try{actual=resolveSafe(filename);}catch(e){return {name,assetPath:filename,status:'BLOCKED',errors:[e.message],warnings};}
  if(!fs.existsSync(actual)) {
    return {name,assetPath:filename,status:'BLOCKED',errors:[item.status==='planned'?'planned asset is not yet produced':'declared asset file missing',...errors],warnings};
  }
  let buf,dim;
  try{buf=fs.readFileSync(actual);dim=readImageDimensions(buf);}catch(e){return {name,assetPath:filename,status:'BLOCKED',errors:['unreadable asset: '+e.message],warnings};}
  const minW=item.minDeliveryWidth||1536,minH=item.minDeliveryHeight||2400;
  const ratio=dim.width/dim.height;
  if(dim.width<minW || dim.height<minH)errors.push(`resolution ${dim.width}x${dim.height} < ${minW}x${minH}`);
  const rmin=item.aspectMin??0.57,rmax=item.aspectMax??0.64;
  if(ratio<rmin || ratio>rmax)errors.push(`wrong stage aspect ratio ${ratio.toFixed(3)} not in [${rmin}, ${rmax}]`);
  if(buf.length<120000) warnings.push('very small photographic CG (<120 KB): manually inspect facial/hand detail (not automatic rejection)');
  if(item.hasUIInImage===true)errors.push('generated CG has baked-in UI');
  if(item.status!=='approved')errors.push('asset status is not approved');
  for(const key of ['visual','inGame','rights']) if(item.reviews?.[key]!=='approved') errors.push(`${key} review not approved`);
  const sha256=crypto.createHash('sha256').update(buf).digest('hex');
  return {name,assetPath:filename,status:errors.length?'BLOCKED':'READY',sizeBytes:buf.length,dimensions:dim,ratio:Number(ratio.toFixed(4)),sha256,errors,warnings};
}
function auditBaseline() {
  const names=['crew_headset','pov_badge','stage_piano','girl_singer','lin_camera','gu_email','usb_case','usb_hand'];
  return names.map(name=>auditAsset({name,assetPath:`assets/v4/${name}.webp`,status:'legacy',minDeliveryWidth:1536,minDeliveryHeight:2400,aspectMin:.57,aspectMax:.64,reviews:{visual:'pending',inGame:'pending',rights:'pending'}}));
}
function auditActivePreview(){
 const names=['crew','badge','piano','singer','lin','gu','usb','usbHeld'];
 return names.map(name=>auditAsset({name,assetPath:`assets/v6-preview/${name==='crew'||name==='badge'?name+'-single-cg':name}.webp`,status:(name==='crew'||name==='badge')?'cg-candidate':'preview-legacy',minDeliveryWidth:1536,minDeliveryHeight:2400,aspectMin:.57,aspectMax:.64,reviews:{visual:'pending',inGame:'pending',rights:'pending'}}));
}
function auditManifest() {
  const file=resolveSafe(manifestPath);
  const man=JSON.parse(fs.readFileSync(file,'utf8'));
  if(!Array.isArray(man.shots)||!man.shots.length)throw new Error('manifest.shots missing or empty');
  const ids=new Set();
  for(const shot of man.shots){if(ids.has(shot.shotId))throw new Error('duplicate shotId: '+shot.shotId);ids.add(shot.shotId);}
  return man.shots.map(auditAsset);
}
const rows=activePreview?auditActivePreview():(baseline?auditBaseline():auditManifest());
const report={mode:activePreview?'active-preview':(baseline?'baseline':'manifest'),root,manifest:activePreview||baseline?null:manifestPath,strict,summary:{ready:rows.filter(r=>r.status==='READY').length,blocked:rows.filter(r=>r.status==='BLOCKED').length,total:rows.length},shots:rows};
console.log(`ADV art ${report.mode}: READY=${report.summary.ready} BLOCKED=${report.summary.blocked} TOTAL=${report.summary.total}`);
for(const row of rows){
  const dims=row.dimensions?`${row.dimensions.width}x${row.dimensions.height} ${row.dimensions.kind}`:'MISSING';
  console.log(`  ${row.status.padEnd(7)} ${row.name.padEnd(18)} ${dims.padEnd(22)} ${row.assetPath}`);
  for(const e of row.errors)console.log('     - '+e);
  for(const w of row.warnings)console.log('     ~ '+w);
}
if(jsonPath){const target=path.resolve(jsonPath);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,JSON.stringify(report,null,2)+'\n');}
if(strict && report.summary.blocked>0){console.error('FAIL: No visual/game/rights-approved master image set. Do not publish.');process.exitCode=2;}
export {readImageDimensions,auditAsset};
