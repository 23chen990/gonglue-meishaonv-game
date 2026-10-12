import fs from 'node:fs';
import crypto from 'node:crypto';
const root=new URL('../',import.meta.url),read=n=>fs.readFileSync(new URL(n,root),'utf8');
const spec=[['DATA','STORY.json'],['EP','EPILOGUES.json'],['BONUS','BONUS.json'],['CODA','CODA.json'],['HB','HANDBOOK.json']];
const vars=spec.map(([v,n])=>'const '+v+'='+JSON.stringify(JSON.parse(read('data/'+n))).replaceAll('<','\\u003c')+';').join('\n');
const hash=crypto.createHash('sha256').update(read('data/STORY.json')).digest('hex');
const engine=read('tools/engine.mjs').replace(/^export\s+/gm,'');
const ui=read('tools/preview-ui.js'),meta='\nconst STORY_HASH='+JSON.stringify(hash)+';\n';
const script=engine+'\n'+vars+meta+ui;
if(script.includes('</script'))throw Error('Unescaped closing script in bundle');
const template=read('tools/preview-template.html').replace('<!--META-->','<meta name="story-sha256" content="'+hash+'">');
const html=template.replace('<!--CSS-->','<style>'+read('tools/preview.css')+'</style>').replace('<!--SCRIPT-->','<script>'+script+'</script>');
fs.writeFileSync(new URL('play.html',root),html);
fs.writeFileSync(new URL('index.html',root),html);
const imports="import {VERSION,createState,active,condition,availableActions,endingFacts,classifyEnding,renderScene,choose,replay,rewind,reviewEnding} from './tools/engine.mjs';\nimport './tools/preview.css';\n";
fs.writeFileSync(new URL('runtime.mjs',root),'// GENERATED from canonical JSON and controller. Run npm run build; never edit this file.\n'+imports+vars+meta+ui);
const index=template.replace('<!--CSS-->','').replace('<!--SCRIPT-->','<script type="module" src="/src/main.ts"></script>')
 .replace("default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; base-uri 'none'; form-action 'none'",
 "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' ws:; base-uri 'none'; form-action 'none'");
fs.writeFileSync(new URL('repository-index.html',root),index);
const files=['data/STORY.json','data/EPILOGUES.json','data/BONUS.json','data/CODA.json','data/HANDBOOK.json','tools/engine.mjs','tools/preview-ui.js','tools/preview.css','tools/preview-template.html','runtime.mjs','index.html','play.html','repository-index.html'];
fs.writeFileSync(new URL('build-meta.json',root),JSON.stringify({version:'revision-r4.0',storyHash:hash,files:Object.fromEntries(files.map(p=>[p,crypto.createHash('sha256').update(read(p)).digest('hex')]))},null,2)+'\n');
console.log(JSON.stringify({file:'play.html',bytes:Buffer.byteLength(html),storyHash:hash,repositoryModule:'runtime.mjs'},null,2));
