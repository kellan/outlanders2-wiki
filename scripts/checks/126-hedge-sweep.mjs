// PR 126: reader pages state facts without how-we-checked asides. Research pages, the changelog and About keep them.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const banned=[/not (yet )?(timed|checked|tested) in play/i,/\(stored\)/,/stored on (the|its) (workspot|social spots)/,/stored durations/,/From the stored/,/Read from the (game code|stored steps)/,/game files hold/,/The game files (differ|keep|call)/,/stored recipe; see/,/speed is not stored/,/\(decoded\)/,/decoded data/i];
const skip=/^(verification|spoilers|evidence|research|changelog|about|contribute)\b/;let pages=0;const bad=[];
for(const k of Object.keys(h.lookup)){if(skip.test(k))continue;let t;try{t=strip(h.render(k))}catch{continue};const j=t.lastIndexOf('Sources & research notes for this page');if(j>0)t=t.slice(0,j);pages++;for(const re of banned){const m=t.match(re);if(m)bad.push(k+': '+m[0])}}
assert.equal(bad.length,0,'how-we-checked asides on reader pages:\n'+bad.slice(0,20).join('\n'));
console.log(`PASS: no how-we-checked asides on ${pages} reader pages.`);
