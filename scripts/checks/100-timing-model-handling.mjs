// PR 100: re-copy the timing model after research PR 16 decoded the handling times; Logs use the shoulder carry.
import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const TM=JSON.parse(readFileSync(new URL('../../content/reference/decoded-mechanics.json',import.meta.url))).timing_model.constants;
assert.equal(TM.handling_seconds.value,1.32,'two-hand pick-up or drop');assert.equal(TM.handling_shoulder_seconds.value,3.58,'shoulder carry (Logs)');
const r=strip(h.render('recycling/')),w=strip(h.render('roads-and-walking/'));
assert.ok(r.includes('Logs, carried on the shoulder, take 3.58 each way')&&/Nothing within 18 units 8\.5 s 2\.1 minutes/.test(r)&&r.includes('drops everything beside the building in about 2.1 minutes'),'Lumberjack example uses the shoulder time');
assert.ok(w.includes('5.5–8.2 minutes of villager work')&&/Bare ground 63 s/.test(w),'road numbers from the new handling time');
console.log('PASS: timing model re-copied; handling decoded, Logs on the shoulder.');
