// PR 116: the developers announced the next story on 12 November 2026 ("coming soon"); its content stays held back as a spoiler.
import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import {harness} from '../render-harness.mjs';
const h=await harness(),sp=JSON.parse(fs.readFileSync(new URL('../../content/spoilers.json',import.meta.url),'utf8')).entries;
const hero=sp.find(e=>e.type==='heroes'&&e.id==='Oona.000');assert.equal(hero.status,'confirmed-unreleased','still unreleased: announced, not out');
assert.match(hero.reason,/announced Oona on the official Outlanders Discord on 12 November 2026, “coming soon” in an update they call Oona’s Potion \(the game’s own update notes call it Oona’s Wetlands\)/);
for(const id of ['Campaign3_Level2A','Campaign3_Level2B','Campaign3_Level2C']){const e=sp.find(x=>x.type==='levels'&&x.id===id);assert.ok(e,id+' still held back');assert.match(e.reason,/announced on 12 November 2026 as coming soon\. It is not out yet\./)}
assert.ok(!sp.some(e=>/Oona’s Wetlands as the next update/.test(e.reason)),'old wording replaced everywhere');
const lm=JSON.parse(vm.runInContext('JSON.stringify(DM.level_maps.records.map(r=>r.asset_name))',h.ctx));assert.ok(!lm.some(n=>/^Campaign3_Level2/.test(n)),'no maps for the held-back levels');
for(const p of ['','heroes/','levels/','biomes/','index/','campaigns/campaign-3/'])assert.ok(!/Oona|Potion|Wetlands/.test(h.render(p)),p+' leaked the announced update');
assert.match(h.render('spoilers/'),/Oona’s Potion/,'the spoiler index carries the announcement');
console.log('PASS: announcement recorded on the held-back content; still hidden from public pages.');
