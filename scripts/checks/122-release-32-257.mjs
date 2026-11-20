// PR 122: version 32 (build 257) data: Willow-only mushrooms, burrows, reworked Stroganoff, Wetlands and shared base lists, shallow marshes, Update 32 history.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/&#39;/g,"'").replace(/\s+/g,' ');
assert.match(strip(h.render('buildings/stroganoff-cookhouse/')),/Game data v32 · build 257/);
const apple=strip(h.render('plants/apple-tree/'));assert.ok(!/Mushroom|a Stick every/.test(apple.slice(0,apple.indexOf('Planted by'))),'apple tree: no mushrooms, no sticks (inactive spawners)');
assert.match(strip(h.render('plants/cypress-tree/')),/a coypu burrow every 6–10 days, at most 1 at a time, for the Swamp Trappers' Hut to trap\. The tree can’t be felled while its burrow is being trapped/);
assert.match(strip(h.render('plants/winter-pine-tree/')),/a rabbit burrow every 6–10 days/);
assert.match(strip(h.render('resources/mushroom/')),/Mushrooms grow only on the ground under Willow Trees/);
const fp=strip(h.render('food-production/'));assert.match(fp,/Stroganoff Cookhouse Kitchen 20\.7 Stroganoff 29\.1 41\.3 \(2 workers\)/);
const wet=strip(h.render('biomes/wetlands/'));assert.match(wet,/Shared by every biome \(the game’s base list\): Advanced Warehouse , Brick Road/);assert.match(wet,/CypressTree wood 0\.12/);assert.match(wet,/no Stone here/);
const spk=strip(h.render('biomes/spookylands/'));for(const n of ['Trading Outpost','Fishing Dock','Winery','Book Workshop'])assert.ok(spk.slice(spk.indexOf('Workplaces'),spk.indexOf('Gathering places')).includes(n),'spookylands gains '+n);
const walk=strip(h.render('roads-and-walking/'));assert.match(walk,/Brick Road and Stone Road are the same speed: both ×2\.15/);assert.match(walk,/Shallow marshes \( ?Wetlands ?\) ?: villagers sink in and walk ×0\.7/);// PR 123 made the marsh section a bullet
for(const p of ['buildings/advanced-warehouse/','resources/mushroom/','heroes/oona/','biomes/wetlands/'])assert.match(strip(h.render(p)),/History Update 32 2026-11-19/,p);
assert.ok(!strip(h.render('tournament/')).includes('Holiday'),'Holiday season stays in Spoilers');assert.match(strip(h.render('spoilers/tournament/')),/Holiday Not seen in game yet/);
console.log('PASS: version 32 data: Willow-only mushrooms, burrows, Stroganoff rework, Wetlands and shared base lists, shallow marshes, Update 32 history, Holiday still a spoiler.');
