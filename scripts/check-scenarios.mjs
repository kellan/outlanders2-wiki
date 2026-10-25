import assert from 'node:assert/strict';
import fs from 'node:fs';
import {harness,root} from './render-harness.mjs';
const w=JSON.parse(fs.readFileSync(root+'data/world.json'));
const h=await harness();let linked=0;
for(const l of w.levels){
 const page=h.pages.find(p=>p.type==='levels'&&p.id===l.id);assert.ok(page);
 const html=h.render(page.path);
 if(!l.scenario)continue;linked++;
 assert.ok(!html.includes('Objective quantities are not decoded'),l.id);
 for(const heading of ['Main objectives','Optional objectives','Villager needs','Available buildings &amp; plants','Starting objects &amp; resources'])assert.ok(html.includes(heading)||html.includes(heading.replaceAll('&amp;','&')),l.id+': '+heading);
 assert.equal(l.scenario.world_objectives_match_header,true);
 assert.equal(l.scenario.primary_objective_count,l.scenario.objectives.filter(x=>!x.IsSecondary).length);
 assert.equal(l.scenario.optional_objective_count,l.scenario.objectives.filter(x=>x.IsSecondary).length);
}
const page=id=>h.render(h.pages.find(p=>p.type==='levels'&&p.id===id).path);
const binge=page('Level02B');assert.ok(binge.includes('≥ 120'));assert.ok(binge.includes('65 days'));assert.ok(binge.includes('Unspecified in this file'));
const town=page('Single_C_Villagers100');assert.ok(town.includes('≥ 100'));assert.ok(!town.includes('AudioEventBase'));
const first=page('Level01A');assert.ok(first.includes('2 distinct configured entries'));assert.ok(first.includes('/buildings/foragers-hut/'));
assert.ok(h.render('buildings/foragers-hut/').includes('Where it can be built'));
assert.equal(linked,133);assert.equal(w.levels.filter(l=>!l.scenario).length,0);
console.log(`PASS: ${linked} decoded scenario pages, primary/optional counts, exact targets, needs, legacy unknowns, asset links, and build-list backlinks.`);
