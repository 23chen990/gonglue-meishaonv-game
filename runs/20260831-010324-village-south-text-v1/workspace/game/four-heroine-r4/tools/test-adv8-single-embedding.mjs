#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const game=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const manifest=JSON.parse(fs.readFileSync(path.join(game,'assets/adv8/asset-manifest.json'),'utf8'));
const html=fs.readFileSync(path.join(game,'play.html'),'utf8');
const runtime=fs.readFileSync(path.join(game,'runtime.mjs'),'utf8');
const images=Object.entries(manifest.images);
if(images.length!==11)throw Error('ADV8 manifest should contain exactly 11 sources');
let totalSourceBytes=0;
for(const [name,meta] of images){
 const bin=fs.readFileSync(path.join(game,meta.path));
 const sha=crypto.createHash('sha256').update(bin).digest('hex');
 if(sha!==meta.sha256 || bin.length!==meta.bytes)throw Error(name+' manifest checksum/byte mismatch');
 const b64=bin.toString('base64');
 // One compact bundle should not inline duplicates for portraits and V6 fallback aliases.
 const n=html.split(b64).length-1;
 const m=runtime.split(b64).length-1;
 if(n!==1||m!==1)throw Error(name+' embedded '+n+' times in HTML and '+m+' times in runtime; expected once');
 totalSourceBytes+=bin.length;
}
if(!html.includes('const PORTRAITS={')||!html.includes('ADV8_ART_PACK.singerBond'))throw Error('ADV8 compatibility alias missing');
if(Buffer.byteLength(html)>4500000)throw Error('Standalone HTML unexpectedly large (>4.5 MB)');
console.log(JSON.stringify({check:'ADV8 embedded only once',assets:images.length,totalSourceBytes,htmlBytes:Buffer.byteLength(html)}));
