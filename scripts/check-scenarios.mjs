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
 for(const heading of [...(l.scenario.scoring?.length?['Main objectives']:['Main objectives','Optional objectives']),'Villager needs','Available buildings &amp; plants','Starting objects &amp; resources'])assert.ok(html.includes(heading)||html.includes(heading.replaceAll('&amp;','&')),l.id+': '+heading);
 assert.equal(l.scenario.world_objectives_match_header,true);
 assert.equal(l.scenario.primary_objective_count,l.scenario.objectives.filter(x=>!x.IsSecondary).length);
 assert.equal(l.scenario.optional_objective_count,l.scenario.objectives.filter(x=>x.IsSecondary).length);
}
const page=id=>h.render(h.pages.find(p=>p.type==='levels'&&p.id===id).path);
const binge=page('Level02B');assert.ok(binge.includes('Brew <strong>120'));assert.ok(binge.includes('65 days'));assert.ok(binge.includes('Not set (older map)'));
const town=page('Single_C_Villagers100');assert.ok(town.includes('Population') && town.includes('<strong>100</strong>'));assert.ok(!town.includes('AudioEventBase'));
const first=page('Level01A');assert.ok(first.includes('2 buildings and plants can be built'));assert.ok(first.includes('/buildings/foragers-hut/'));
assert.ok(h.render('buildings/foragers-hut/').includes('Where it can be built'));
assert.equal(linked,133+w.levels.filter(l=>l.live_challenge).length);assert.equal(w.levels.filter(l=>!l.scenario).length,0);
console.log(`PASS: ${linked} decoded scenario pages, primary/optional counts, exact targets, needs, legacy unknowns, asset links, and build-list backlinks.`);
// Player wording must preserve the separate settlement and Housing-concern conditions.
const resort=page('Single05_C_PeakResort');
assert.ok(resort.includes('Satisfy <strong>Housing</strong>.'));
assert.ok(resort.includes('mugs of'),'game wording for Create objectives');
assert.ok(resort.includes('A running total'));
const settled=page('Level01B');
assert.ok(settled.includes('Have everyone settled.'));
assert.ok(settled.includes('Stock on hand'));
