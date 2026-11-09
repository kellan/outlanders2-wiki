// PR 110: planter workplaces prepare every marked plot before planting; tip on their pages and on Plants, confirmed in play.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<[^>]+>/g,' ').replace(/&#39;/g,"'").replace(/\s+/g,' ').replace(/ ([,.)])/g,'$1');
for(const p of ['buildings/farm/','buildings/greenhouse/','buildings/oasis/'])assert.match(strip(h.render(p)),/Mark a few fields at a time\. Workers here prepare every marked field before they plant any of them: the game ranks preparing a marked plot just above planting \(only harvesting comes first\)\./,p);
for(const p of ['buildings/orchard/','buildings/foresters-hub/'])assert.match(strip(h.render(p)),/Mark a few tree plots at a time\. .*Mark a few plots of the tree you need, let them get planted and growing, then mark the rest\./,p);
assert.match(strip(h.render('plants/')),/Mark a few fields or tree plots at a time\. Farm, Greenhouse, Orchard, Foresters’ Hub and Oasis workers prepare every marked plot/);
assert.ok(!/Mark a few/.test(strip(h.render('buildings/bakery/'))),'not on other workplaces');
assert.match(strip(h.render('buildings/farm/')),/Seen in play Farm, Orchard and Foresters' Hub workers prepare every marked field or plot before they plant any of them/);
console.log('PASS: plant-in-batches tip on the five planter workplaces and Plants, confirmed in play.');
