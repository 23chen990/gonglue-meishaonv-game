import fs from 'node:fs';
import crypto from 'node:crypto';
const root=new URL('../',import.meta.url),read=n=>fs.readFileSync(new URL(n,root),'utf8');
const spec=[['DATA','STORY.json'],['EP','EPILOGUES.json'],['BONUS','BONUS.json'],['CODA','CODA.json'],['HB','HANDBOOK.json']];
const vars=spec.map(([v,n])=>'const '+v+'='+JSON.stringify(JSON.parse(read('data/'+n))).replaceAll('<','\\u003c')+';').join('\n');
const hash=crypto.createHash('sha256').update(read('data/STORY.json')).digest('hex');
const engine=read('tools/engine.mjs').replace(/^export\s+/gm,'');
const baseUI=read('tools/preview-ui.js');
if(baseUI.split('load();render();').length!==2)throw Error('Ambiguous UI startup anchor');
const ui=baseUI.replace('load();render();',read('tools/mobile-reader.js')+'\n'+read('tools/director-v6.js')+'\nload();render();'),meta='\nconst STORY_HASH='+JSON.stringify(hash)+';\n';
const portraitManifest=Object.fromEntries(['t','s','l','g'].map(c=>[c,'data:image/webp;base64,'+fs.readFileSync(new URL('assets/portraits/'+c+'.webp',root)).toString('base64')]));
const scenery='data:image/webp;base64,'+fs.readFileSync(new URL('assets/scenes/backstage.webp',root)).toString('base64');
const images='\nconst PORTRAITS='+JSON.stringify(portraitManifest)+';\nconst SCENERY='+JSON.stringify(scenery)+';\n';
const v6ArtFiles={crew:'crew.webp',badge:'badge.webp',lin:'lin.webp',gu:'gu.webp',usb:'usb.webp',usbHeld:'usbHeld.webp',piano:'piano.webp',singer:'singer.webp'};
const artV6='\nconst ADV6_ART_PACK='+JSON.stringify(Object.fromEntries(Object.entries(v6ArtFiles).map(([key,name])=>[key,'data:image/webp;base64,'+fs.readFileSync(new URL('assets/v6-preview/'+name,root)).toString('base64')]))).replaceAll('<','\\u003c')+';\n';
const script=engine+'\n'+vars+images+artV6+meta+ui;
if(script.includes('</script'))throw Error('Unescaped closing script in bundle');
const template=read('tools/preview-template.html').replace('<!--META-->','<meta name="story-sha256" content="'+hash+'">');
const html=template.replace('<!--CSS-->','<style>'+read('tools/preview.css')+'\n'+read('tools/vn.css')+'\n'+read('tools/mobile-reader.css')+'\n'+read('director-v6.css')+'</style>').replace('<!--SCRIPT-->','<script>'+script+'</script>');
fs.writeFileSync(new URL('play.html',root),html);
fs.writeFileSync(new URL('index.html',root),html);
const imports="import {VERSION,createState,active,condition,availableActions,endingFacts,classifyEnding,renderScene,choose,replay,rewind,reviewEnding} from './tools/engine.mjs';\nimport './tools/preview.css';\nimport './tools/vn.css';\nimport './tools/mobile-reader.css';\nimport './director-v6.css';\n";
fs.writeFileSync(new URL('runtime.mjs',root),'// GENERATED from canonical JSON and controller. Run npm run build; never edit this file.\n'+imports+vars+images+artV6+meta+ui);
const index=template.replace('<!--CSS-->','').replace('<!--SCRIPT-->','<script type="module" src="/src/main.ts"></script>')
 .replace("default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; base-uri 'none'; form-action 'none'",
 "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' ws:; base-uri 'none'; form-action 'none'");
fs.writeFileSync(new URL('repository-index.html',root),index);
// Keep the actual game default browser entry in sync with the canonical story.
// Only update the parent game when its main.ts explicitly targets this VN runtime.
const defaultMain=new URL('../src/main.ts',root);
const defaultIndex=new URL('../index.html',root);
if(fs.existsSync(defaultMain)&&fs.readFileSync(defaultMain,'utf8').includes("import '../four-heroine-r4/runtime.mjs';")){
 fs.writeFileSync(defaultIndex,index);
}

const files=['data/STORY.json','data/EPILOGUES.json','data/BONUS.json','data/CODA.json','data/HANDBOOK.json','tools/engine.mjs','tools/preview-ui.js','tools/preview.css','tools/vn.css','tools/mobile-reader.js','tools/mobile-reader.css','tools/director-v6.js','director-v6.css',...Object.values(v6ArtFiles).map(name=>'assets/v6-preview/'+name),'assets/portraits/t.webp','assets/portraits/s.webp','assets/portraits/l.webp','assets/portraits/g.webp','assets/scenes/backstage.webp','tools/preview-template.html','runtime.mjs','index.html','play.html','repository-index.html'];
fs.writeFileSync(new URL('build-meta.json',root),JSON.stringify({version:'revision-r4.5-ui',storyHash:hash,files:Object.fromEntries(files.map(p=>[p,crypto.createHash('sha256').update(fs.readFileSync(new URL(p,root))).digest('hex')]))},null,2)+'\n');
console.log(JSON.stringify({file:'play.html',bytes:Buffer.byteLength(html),storyHash:hash,repositoryModule:'runtime.mjs'},null,2));
