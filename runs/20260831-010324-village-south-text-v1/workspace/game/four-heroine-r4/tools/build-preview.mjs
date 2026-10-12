import fs from 'node:fs';
import crypto from 'node:crypto';
const root=new URL('../',import.meta.url),read=n=>fs.readFileSync(new URL(n,root),'utf8');
const spec=[['DATA','STORY.json'],['EP','EPILOGUES.json'],['BONUS','BONUS.json'],['CODA','CODA.json'],['HB','HANDBOOK.json']];
const vars=spec.map(([v,n])=>'const '+v+'='+JSON.stringify(JSON.parse(read('data/'+n))).replaceAll('<','\\u003c')+';').join('\n');
const hash=crypto.createHash('sha256').update(read('data/STORY.json')).digest('hex');
const engine=read('tools/engine.mjs').replace(/^export\s+/gm,'');
const ui=read('tools/preview-ui.js');
const script=engine+'\n'+vars+'\nconst STORY_HASH='+JSON.stringify(hash)+';\n'+ui;
if(script.includes('</script'))throw Error('Unescaped script closer in bundle');
const template=read('tools/preview-template.html').replace('<!--META-->','<meta name="story-sha256" content="'+hash+'">');
const html=template.replace('<!--CSS-->','<style>'+read('tools/preview.css')+'</style>').replace('<!--SCRIPT-->','<script>'+script+'</script>');
for(const name of ['play.html','index.html'])fs.writeFileSync(new URL(name,root),html);
const imports="import {VERSION,createState,active,condition,availableActions,endingFacts,classifyEnding,renderScene,choose,replay,rewind,reviewEnding} from './tools/engine.mjs';\nimport './tools/preview.css';\n";
fs.writeFileSync(new URL('runtime.mjs',root),'// Generated runtime; do not hand-edit.\n'+imports+vars+'\nconst STORY_HASH='+JSON.stringify(hash)+';\n'+ui);
const repoIndex=template.replace('<!--CSS-->','').replace('<!--SCRIPT-->','<script type="module" src="/src/main.ts"></script>')
 .replace("default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; base-uri 'none'; form-action 'none',
 "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' ws:; base-uri 'none'; form-action 'none'");
fs.writeFileSync(new URL('repository-index.html',root),repoIndex);
console.log(JSON.stringify({status:'BUILT',hash,standalone:'play.html',repositoryRuntime:'runtime.mjs'},null,2));
