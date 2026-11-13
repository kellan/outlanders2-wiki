// PR 117: recovered stock goes only onto loose piles (9 each), never straight into storage (code, version 30); live checks flagged.
import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/&#39;/g,"'").replace(/\s+/g,' ').replace(/ ([,.)])/g,'$1');
const t=strip(h.render('recycling/'));
assert.ok(t.includes('Each load goes onto a loose pile on the ground, never into storage.')&&t.includes('a loose pile holds 9')&&t.includes('within 18 grid units (about 9 squares on screen) in a straight line'),'the rule');
assert.ok(t.includes('A Warehouse next door gets nothing directly'),'warehouses are not a target');
assert.ok(!/make sure a warehouse or other storage that takes the goods is within/.test(t),'old warehouse tip gone');
assert.ok(!/Whether loose piles count is one of the open questions/.test(t)&&!/whether the 18 is straight-line or walking distance/.test(t),'settled questions removed');
assert.ok(!/A Warehouse 17 units away|In the Warehouse|Another Warehouse 15 units away/.test(t),'no worked example deposits into a Warehouse');
assert.ok(t.includes('A Warehouse 5 units away, no loose Logs 9.8 s 2.5 minutes of work: within one shift Same as the first row: nothing goes into the Warehouse'),'warehouse row shows no effect');
assert.ok(t.includes('out onto loose piles beside it, the same way a real recycle does; your haulers then take those to storage'),'fake recycling section agrees');
assert.ok(t.includes('Where a new loose pile appears while the building is still standing')&&t.includes('5–8 squares away (expected slower)')&&t.includes('That a Warehouse next door gets nothing directly'),'live checks listed on the page');
const pt=readFileSync(new URL('../../docs/PLAYTESTS.md',import.meta.url),'utf8'),need=readFileSync(new URL('../../docs/INFORMATION-NEEDED.md',import.meta.url),'utf8');
assert.match(pt,/### B11 Where recycled stock lands `recycle-unload`[\s\S]*Ice Pop Stand[\s\S]*5–8 squares away \(inside the reach\)[\s\S]*Warehouse that accepts Ice Pops 3–5 squares away[\s\S]*wheelbarrow/,'B11 protocol');
assert.match(need,/\| Where recycled stock lands and how long unloading takes \|[^\n]*test: PLAYTESTS\.md B11 \| Code settled; play check open \|/,'information-needed row');
const RS=JSON.parse(readFileSync(new URL('../../content/reference/decoded-mechanics.json',import.meta.url))).recycle_stock;
assert.match(RS.unloading.rule,/nearest loose standalone pile[\s\S]*storage buildings are never a target/);assert.equal(RS.unloading.loose_pile_prefab.capacity,9);
console.log('PASS: recycling page says recovered stock lands on loose piles, never in storage; B11 live checks flagged.');
