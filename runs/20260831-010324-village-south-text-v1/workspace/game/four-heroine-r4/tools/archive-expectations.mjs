import fs from 'node:fs';
import {reviewEnding,VERSION} from './engine.mjs';
import {data,root} from './route-runner.mjs';
const input=JSON.parse(fs.readFileSync(new URL('qa/current/witnesses.json',root)));
const endings={};for(const w of input.witnesses)if(!endings[w.ending]){const r=reviewEnding(data,w.commands);endings[w.ending]={title:r.title,body:r.body,commands:w.commands};}
fs.writeFileSync(new URL('qa/current/archive-expectations.json',root),JSON.stringify({version:VERSION,hashes:input.hashes,endings},null,2));
