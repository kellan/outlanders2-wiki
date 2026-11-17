// PR 92: how a recycled building is unloaded and where the kept stock lands (from code, version 31).
import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const RS=JSON.parse(readFileSync(new URL('../../content/reference/decoded-mechanics.json',import.meta.url))).recycle_stock;
assert.equal(RS.unloading.max_distance_for_pile_find,18,'pile reach stored');
assert.ok(RS.records.find(r=>r.gameobject_id===57394).kept_capacity===24,'ice pop stand kept capacity');
const page=h.render('recycling/'),t=strip(page);
assert.ok(t.includes('Unloading: where the stock lands')&&t.includes('within 18 grid units')&&t.includes('new loose pile just outside the building'),'unloading section');
assert.ok(t.includes('Each demolition spot needs 10 rounds of work, or 5 on the smaller sites')&&t.includes('A full Warehouse holds up to 216 items'),'demolition rounds and warehouse example: '+(t.match(/Each demolition spot[^.]*\./)||[''])[0]);
assert.ok(/Ice Pop Stand<\/a><\/td>[\s\S]{0,600}?<td data-sort="24">up to 24<\/td>/.test(page),'carried-out-first column');
assert.ok(t.includes('How long unloading takes in play')&&!t.includes('Whether recovered stock always waits on the ground'),'open questions updated');
// Worked examples: lumberjack with 30 logs and the full warehouse, computed from stored speeds.
assert.ok(t.includes('Worked examples')&&t.includes('A Lumberjacks’ Base with 30 Logs and 2 workers'),'lumberjack example');
assert.ok(/No loose Logs within 18 units 9\.8 s 2\.5 minutes of work: within one shift/.test(t),'new loose piles beside the building (updated in PR 117: recovered stock never goes into storage)');
assert.ok(/A loose pile of Logs with room for 9, 15 units away 27 s then 9\.8 s 3\.7 minutes/.test(t),'a matching loose pile in reach is slower');
assert.ok(/No loose piles of its goods within 18 units 5\.3 s 6\.3 minutes of work/.test(t)&&t.includes('216 items in at least 24 loose piles around it'),'warehouse pathological case');
assert.ok(t.includes('not timed in play'),'estimates flagged');
console.log('PASS: recycling page explains unloading, where kept stock lands, and worked examples.');
