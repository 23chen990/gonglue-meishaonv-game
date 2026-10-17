import fs from 'node:fs';
import crypto from 'node:crypto';
const base='runs/20260831-010324-village-south-text-v1/workspace/game/';
const verified=fs.readFileSync(base+'four-heroine-r4/play.html');
const release=fs.readFileSync(base+'dist/index.html');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
if(!release.equals(verified)){
 console.error('BLOCKED: production default URL is not the exact HTTP-tested standalone player');
 console.error(JSON.stringify({canonical:hash(verified),defaultEntry:hash(release)}));
 process.exit(1);
}
const s=release.toString('utf8');
if(!s.includes('name="story-sha256"')||!s.includes('const ADV8_ART_PACK=')||!s.includes('ENTRY_WAKE')){
 console.error('BLOCKED: current canonical story or CG package missing from published entry');process.exit(1);
}
if(s.includes('<script type="module" src="/src/main.ts"')){
 console.error('BLOCKED: Vite source shell exposed instead of compiled playable client');process.exit(1);
}
console.log(JSON.stringify({status:'PASS',file:base+'dist/index.html',canonicalHash:hash(verified),bytes:release.length,oneExecutable:true}));
