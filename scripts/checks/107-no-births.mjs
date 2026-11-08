// PR 107: maps that switch births off (a placed level event with ReproductionMultiplier 0) are flagged on their level pages and listed on Villagers.
import assert from 'node:assert/strict';import vm from 'node:vm';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<[^>]+>/g,' ').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').replace(/ ([,.)])/g,'$1');
// The decoded effect keeps the zero (the exporter used to drop it as "default").
const off=JSON.parse(vm.runInContext(`JSON.stringify(DM.level_events.records.filter(e=>e.effect?.ReproductionMultiplier===0).map(e=>e.path).sort())`,h.ctx));
assert.deepEqual(off,['Level 01A','Level 01B','No Reproduction Single00 L']);
const lv=JSON.parse(vm.runInContext(`JSON.stringify(noBirthsLevels().map(l=>[l.id,l.name]))`,h.ctx));
assert.equal(lv.length,16,'16 maps place a no-births event: '+lv.map(x=>x[1]).join(', '));
for(const [id,name] of lv){const t=strip(h.render('levels/'+id+'/'));
 assert.match(t,/No babies are born on this map\. A map rule sets the birth chance to zero for the whole level/,name+': tip');
 assert.match(t,/Events No babies are born on this map/,name+': events row');}
const ftq=lv.find(x=>x[1]==='Full Tilt Queso');assert.match(strip(h.render('levels/'+ftq[0]+'/')),/Seen in play On Full Tilt Queso no babies are born\. tested in play, 2026-11-08/,'in-play confirmation');
const eow=lv.find(x=>x[1]==='The End of the World');assert.match(strip(h.render('levels/'+eow[0]+'/')),/Nobody dies here either, and happiness stays fixed\./);
const ov=lv.find(x=>x[1]==='Overgrown');assert.ok(ov,'online challenge maps are covered (no event schedule, detected from placed prefabs)');
// A map without the rule says nothing about it.
assert.ok(!/No babies are born/.test(strip(h.render('levels/'+vm.runInContext(`W.levels.find(l=>l.scenario&&!noBirthsRule(l.scenario)).id`,h.ctx)+'/'))));
// Villagers page: corrected birth rules and the list.
const v=strip(h.render('villagers/'));
assert.match(v,/Once a game day, if the village has more than one adult, every house that has residents and an empty crib rolls once for a baby\. The chance of each roll starts at 14%/);
assert.match(v,/Free beds: ×0\.025 once villagers fill every bed/);assert.ok(!/pairs of adults|How often the check runs/.test(v),'old wording gone');
assert.match(v,/Maps where no babies are born On 15 maps .*Story and standalone maps: Alike!, .*Middle Ground\. Online challenges: Retirement Town, .*Mother Knows Best\. On The End of the World the same rule also stops deaths/);
assert.ok(!/Maps where no babies are born[^.]*Unnamed scenario/.test(v),'unnamed archive entries left out of the list');
console.log('PASS: no-births maps flagged on 16 level pages and listed on Villagers; birth rules match the game code.');
