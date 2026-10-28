// PR 83: site-wide redundancy pass. Each fact is stated once per page, and shared explanations live on one page.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' '),count=(s,t)=>s.split(t).length-1;
// Tables drop columns that never change.
for(const r of ['buildings/','plants/','resources/','biomes/'])assert.ok(!h.render(r).includes('>Availability</th>'),r+': no all-Unknown Availability column');
assert.ok(!h.render('campaigns/campaign-1/').includes('>Category</th>'),'campaign tables drop the Category column');
assert.ok(strip(h.render('challenges/redux/')).includes('Day limit: No limit on every row.'),'constant informative column becomes one note');
// Building and chain pages.
const bakery=strip(h.render('buildings/bakery/'));
assert.ok(!bakery.includes('Construction inputs')&&!bakery.includes('How production works')&&!bakery.includes('Each Bread:'),'Bakery states cost and recipe once');
assert.ok(bakery.includes('The game files differ on one point')&&!bakery.includes('one difference noted below'),'field-guide card links the difference');
const chain=strip(h.render('production-chains/bakery/'));
assert.ok(!chain.includes('In-game field guide')&&chain.includes('The game files differ'),'chain page keeps the ratio difference, not a field-guide repeat');
assert.ok(count(strip(h.render('buildings/sawmill/')),'1 Log → 1 Plank')<=1,'Sawmill recipe once');
// Resources, food and plants.
const plank=strip(h.render('resources/plank/'));
assert.ok(!plank.includes('Needs it satisfies')&&!plank.includes('View building ↗')&&!plank.includes('Smallest whole batch'),'Plank: no empty needs section, link labels or trivial batch');
const bread=strip(h.render('food/bread/'));assert.ok(bread.includes('Made from 1 Flour + 1 Stick → 8 Bread')&&!bread.includes('Each Bread:'),'Bread recipe once, as the field guide shows it');
assert.ok(!strip(h.render('plants/apple-tree/')).includes('A fruit tree that yields'),'plant pages skip the paragraph that repeats the infobox');
// Mechanics: one home per explanation.
const heat=h.render('heat-cooling-water/');assert.ok(!heat.includes('From the warning</th>')&&heat.includes('/villagers/#death'),'death table only on Villagers and life');
assert.ok(!h.render('villagers/').includes('Sandbox starting villagers'),'sandbox villagers only on Sandbox');
assert.ok(!strip(h.render('needs/')).includes('More about needs'),'needs page relies on the mechanics menu');
assert.ok(h.render('houses/').includes('/villagers/#births'),'houses links to the birth rules');
// Meta pages.
const sp=strip(h.render('spoilers/'));assert.ok(count(sp,'The mushroom production chain is reported unreleased')<=2,'spoiler reasons stated once per group');
assert.ok(!strip(h.render('verification/')).includes('New findings'),'no stale findings block');
assert.ok(count(strip(h.render('tournament/')),'Streak Shields help you protect your streak')<=1,'Streak Shield text once, not on every reward row');
console.log('PASS: constant columns, building/chain/resource/plant pages, mechanics homes, spoilers, verification and tournament.');
