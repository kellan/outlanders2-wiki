// PR 94: estimates on the Recycling and Roads and walking pages come from one timing model (research data/timing-model.json).
import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const DM=JSON.parse(readFileSync(new URL('../../content/reference/decoded-mechanics.json',import.meta.url))),TM=DM.timing_model;
assert.ok(TM&&TM.checked_versions.includes('31 build 255')&&Object.keys(TM.constants).length>=40,'timing model copied');
for(const [k,c] of Object.entries(TM.constants))assert.ok(c.unit&&c.source&&['decoded','assumed','measured'].includes(c.status),'constant has unit, source and status: '+k);
assert.equal(TM.constants.units_per_square.status,'assumed','still to be tested in play: units_per_square');
for(const k of ['handling_seconds','handling_shoulder_seconds','items_per_trip'])assert.equal(TM.constants[k].status,'decoded','decoded since research PR 16: '+k);
assert.ok(!DM.walking.road_cost&&!('walk_speed' in DM.recycle_stock.unloading)&&!('finished_multiplier' in DM.recycle_stock.refund),'no duplicate constants left outside the model');
// Same worked examples as research tests/test_timing_model.py.
const w=strip(h.render('roads-and-walking/')),r=strip(h.render('recycling/'));
assert.ok(/Bare ground 63 s 2\.9 Road 45 s 4 Bare ground, in Boots 45 s 4 Road, in Boots 38 s 4\.7/.test(w),'road example');
assert.ok(w.includes('5.5–8.2 minutes of villager work')&&w.includes('A shift is about 180 seconds of work'),'road cost');
assert.ok(/A Warehouse 17 units away, just inside the reach 29\.7 s 7\.4 minutes/.test(r)&&r.includes('27 minutes of work')&&r.includes('A shift is 60% of a 300-second day'),'recycling examples');
assert.ok(/Recycle refund<\/dt><dd>[^]*?5 Clay[^]*?2 Stone/.test(h.render('buildings/bakery/')),'refund from the model');
// Changing a constant changes the page: the pages really read the model.
const src=readFileSync(new URL('../../src/app.js',import.meta.url),'utf8');
assert.ok(/TM\('handling_seconds'\)/.test(src)&&/TM\('refund_multiplier'\)/.test(src)&&!/hand=2,/.test(src)&&!/0\.6\*300/.test(src),'pages read constants from the model');
console.log('PASS: Recycling and Roads and walking estimates come from the shared timing model.');
