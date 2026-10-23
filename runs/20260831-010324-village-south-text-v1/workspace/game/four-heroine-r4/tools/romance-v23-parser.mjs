/** Plain-text authoring with strict syntax. No executable author expressions. */
export const V23_CANON = '84842ca69a861849f16b20d72b4b45421675ea5a934cad51d5f7866e703acf93';
export function parseRomance23(text) {
 const scenes = Object.create(null);
 let id = '', scene = null;
 for (const [index, raw] of text.split(/\r?\n/).entries()) {
  const line = raw.trim();
  if (!line || line.startsWith('#')) continue;
  const at = () => `V23 line ${index + 1} (${id})`;
  if (/^\[[A-Za-z0-9_]+\]$/.test(line)) {
   id=line.slice(1,-1);
   if (scenes[id]) throw Error(at()+' duplicate scene');
   scene=scenes[id]={intro:[],choices:Object.create(null),cue:''};continue;
  }
  if (!scene) throw Error(at()+' content before scene');
  const [type,...p]=line.split('|');
  if (p.some(x=>!x.trim())) throw Error(at()+' blank field');
  if (type==='C' && p.length===1) { scene.cue=p[0];continue; }
  if (type==='I' && p.length===2 && /^[TSLGB]$/.test(p[0])) {
   scene.intro.push({speaker:p[0],text:p[1]});continue;
  }
  if (type==='O' && p.length>=3 && p.length<=5 && /^[a-z_]+$/.test(p[0])) {
   const [key,label,...responses]=p;
   if (scene.choices[key]) throw Error(at()+' duplicate action');
   scene.choices[key]={label,replies:responses.map(text=>({text}))};continue;
  }
  if (type==='K' && p.length===3 && /^\d+$/.test(p[1])) {
   const target=scene.choices[p[0]]?.replies[Number(p[1])];
   if (!target || target.stage) throw Error(at()+' invalid stage cue');
   target.stage=p[2];continue;
  }
  throw Error(at()+' unknown or invalid record');
 }
 return scenes;
}
