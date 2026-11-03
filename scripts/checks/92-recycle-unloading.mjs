// PR 92: how a recycled building is unloaded and where the kept stock lands (from code, version 31).
import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const RS=JSON.parse(readFileSync(new URL('../../content/reference/decoded-mechanics.json',import.meta.url))).recycle_stock;
assert.equal(RS.unloading.max_distance_for_pile_find,18,'pile reach stored');
assert.ok(RS.records.find(r=>r.gameobject_id===57394).kept_capacity===24,'ice pop stand kept capacity');
const page=h.render('recycling/'),t=strip(page);
assert.ok(t.includes('Unloading: where the stock lands')&&t.includes('within 18 grid units')&&t.includes('new loose pile where the building stood'),'unloading section');
assert.ok(t.includes('Each demolition spot needs 10 rounds of work, or 5 on the smaller sites')&&t.includes('A full Warehouse holds up to 216 items'),'demolition rounds and warehouse example: '+(t.match(/Each demolition spot[^.]*\./)||[''])[0]);
assert.ok(/Ice Pop Stand<\/a><\/td>[\s\S]{0,600}?<td data-sort="24">up to 24<\/td>/.test(page),'carried-out-first column');
assert.ok(t.includes('How long unloading takes in play')&&!t.includes('Whether recovered stock always waits on the ground'),'open questions updated');
console.log('PASS: recycling page explains unloading and where kept stock lands.');
