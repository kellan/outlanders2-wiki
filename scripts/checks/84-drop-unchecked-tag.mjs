// PR 84: downloaded challenge levels no longer carry a "not checked in play" warning; they are decoded the same way as the packaged levels, which carry none.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const stew=strip(h.render('challenges/bounty/dark-stew-feast/'));
assert.ok(!stew.includes('not checked in play'),'no amber warning on a downloaded level');
assert.ok(strip(h.render('verification/challenges/bounty/dark-stew-feast/')).includes('Decoded from the game’s download cache'),'research page says where the level came from');
for(const t of ['original','redux','bounty'])assert.ok(!strip(h.render(`challenges/${t}/`)).includes('checked in play'),t+': type page has no unchecked-state warning');
console.log('PASS: downloaded challenge levels carry no "not checked in play" warning.');
