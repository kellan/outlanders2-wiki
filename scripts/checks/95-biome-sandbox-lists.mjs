// PR 95: biome pages list their sandbox plants and buildings, what other biomes have that this one lacks,
// and which hand-made maps in the biome still offer those buildings.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/&#39;/g,'’').replace(/&amp;/g,'&').replace(/\s+/g,' ').replace(/ \( /g,' (').replace(/ \)/g,')').replace(/ ([,.;])/g,'$1');
const spooky=h.render('biomes/spookylands/'),sp=strip(spooky);
assert.ok(spooky.includes('id="sandbox"')&&spooky.includes('<h2>Sandbox build list</h2>'),'sandbox section on the biome page');
assert.ok(!sp.includes('Available plants and buildings depend on the scenario'),'placeholder paragraph replaced');
assert.ok(/<h3>Plants<\/h3>[\s\S]*?<a[^>]*>Wheat<\/a>[\s\S]*?<a[^>]*>Dead Tree<\/a>/.test(spooky),'plants listed with links');
// Version 32 decode: the shared base list's Foresters' Hub (Forester old) plants Dead Tree fields, so it is no longer flagged.
assert.ok(/Dead Tree<\/a>[^<]*<span class="objective-note">\(planted by the [^)]*Foresters/.test(spooky),'dead tree planted by the shared Foresters’ Hub: '+(spooky.match(/Dead Tree<\/a>[^<]{0,40}<[^>]*>[^<]*/)||[''])[0]);
assert.ok(/<h3>Houses<\/h3>[\s\S]*?Two-Story House/.test(spooky)&&/<h3>Workplaces<\/h3>[\s\S]*?<a[^>]*>Bakery<\/a>/.test(spooky)&&/<h3>Gathering places & decoration<\/h3>[\s\S]*?Halloween Tombstone/.test(spooky),'buildings grouped by kind');
assert.ok(/Compared with other biomes/.test(sp),'comparison paragraph');
// Version 32 added Trading Post Evergreen, Fishing Dock and seven more to Spookylands, and the shared base list covers the Foresters' Hub.
assert.ok(/<h3>Workplaces<\/h3>[\s\S]*?Trading Outpost<\/a>[\s\S]*?<h3>/.test(spooky)&&!/all offer [^.]*(Trading Outpost|Foresters’ Hub|Fishing Dock)/.test(sp),'spookylands now offers the outpost, dock and hub: '+(sp.match(/Not offered here[\s\S]{0,300}/)||[''])[0]);
assert.ok(/Only here:[^.]*Halloween Tombstone/.test(sp)&&!/Only here:[^.]*Playground/.test(sp),'halloween-only buildings listed, swapped shared ones not counted');
assert.ok(/Shared by every biome \(the game’s base list, less the ones excluded below\): [^.]*Market[^.]*Warehouse/.test(sp)&&!/Shared by every biome[^.]*Zen Garden/.test(sp),'shared base list shown, minus the excluded ones');
assert.ok(sp.includes('swapped for this biome’s own versions'),'excluded base placeables explained');
const green=strip(h.render('biomes/evergreen/'));
assert.ok(/<h3>Workplaces<\/h3>[\s\S]*?<a[^>]*>Trading Outpost<\/a>/.test(h.render('biomes/evergreen/')),'evergreen lists the outpost');
assert.ok(/Not offered here, though other biomes have it\. Tropiclands and Wetlands offer Hibiscus Planter and Orchid Tree Pit\./.test(green),'evergreen lacks only the two planters Tropiclands and Wetlands share: '+(green.match(/Not offered here[\s\S]{0,200}/)||[''])[0]);
const dry=strip(h.render('biomes/drylands/'));
assert.ok(/Not offered here, though other biomes have it\.[\s\S]*?Trading Outpost/.test(dry.match(/Not offered here[\s\S]*?Only here/)[0]),'drylands reports no outpost');
assert.ok(/\([^)]*and \d+ more\)/.test(dry.match(/Still offered on hand-made maps[\s\S]*?Map resources/)?.[0]||''),'long level lists are capped');
const wet=strip(h.render('biomes/wetlands/'));
assert.ok(/Only here: Concoction Shop, Stroganoff Cookhouse, Swamp Trappers’ Hut\./.test(wet)&&/Forestry: Willow Tree, Cypress Tree \(planted by the Foresters’ Hub\)/.test(wet),'Wetlands decoded from version 32: '+wet.slice(wet.indexOf('Plants'),wet.indexOf('Plants')+200));
const sandbox=h.render('sandbox/');
assert.ok(/Which buildings a biome offers is in the <a href="[^"]*biomes\/[^"]*">Sandbox build list<\/a> on its page/.test(sandbox)||/Sandbox build list<\/a>/.test(sandbox),'sandbox page links to the biome section');
assert.ok(strip(sandbox).includes('Extra need column is editorial'),'extra-need caveat on the sandbox page');
console.log('PASS: biome pages list sandbox plants, buildings, gaps and hand-made fallbacks.');
