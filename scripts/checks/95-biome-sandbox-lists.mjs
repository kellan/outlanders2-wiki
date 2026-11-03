// PR 92: biome pages list their sandbox plants and buildings, what other biomes have that this one lacks,
// and which hand-made maps in the biome still offer those buildings.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/&#39;/g,'’').replace(/&amp;/g,'&').replace(/\s+/g,' ').replace(/ \( /g,' (').replace(/ \)/g,')').replace(/ ([,.;])/g,'$1');
const spooky=h.render('biomes/spookylands/'),sp=strip(spooky);
assert.ok(spooky.includes('id="sandbox"')&&spooky.includes('<h2>Sandbox build list</h2>'),'sandbox section on the biome page');
assert.ok(!sp.includes('Available plants and buildings depend on the scenario'),'placeholder paragraph replaced');
assert.ok(/<h3>Plants<\/h3>[\s\S]*?<a[^>]*>Wheat<\/a>[\s\S]*?<a[^>]*>Dead Tree<\/a>/.test(spooky),'plants listed with links');
assert.ok(/Dead Tree<\/a>[^<]*<span class="objective-note">\(no planter in this list\)/.test(spooky),'dead tree flagged as having no planter: '+(spooky.match(/Dead Tree<\/a>[^<]{0,40}<[^>]*>[^<]*/)||[''])[0]);
assert.ok(/<h3>Houses<\/h3>[\s\S]*?Two-Story House/.test(spooky)&&/<h3>Workplaces<\/h3>[\s\S]*?<a[^>]*>Bakery<\/a>/.test(spooky)&&/<h3>Gathering places & decoration<\/h3>[\s\S]*?Halloween Tombstone/.test(spooky),'buildings grouped by kind');
assert.ok(/Compared with other biomes/.test(sp),'comparison paragraph');
assert.ok(/Not offered here, though other biomes have it\. Evergreen, Tropiclands and Winterlands all offer [^.]*Trading Outpost\./.test(sp),'trading outpost reported missing: '+(sp.match(/Not offered here[\s\S]{0,300}/)||[''])[0]);
assert.ok(/all offer [^.]*Foresters’ Hub[^.]*\./.test(sp)&&/all offer [^.]*Fishing Dock[^.]*\./.test(sp),'foresters hub and fishing dock reported missing');
assert.ok(/Only here:[^.]*Halloween Tombstone/.test(sp)&&!/Only here:[^.]*Playground/.test(sp),'halloween-only buildings listed, swapped shared ones not counted');
assert.ok(/Still offered on hand-made maps[\s\S]*?Trading Outpost<\/a>[^<]*<a[^>]*>A Moon Part<\/a>/.test(spooky),'levels that still offer the outpost: '+(spooky.match(/Still offered[\s\S]{0,400}/)||[''])[0].replace(/<[^>]+>/g,'|').slice(0,300));
assert.ok(!/Market|Warehouse/.test(sp.match(/Sandbox build list[\s\S]*?Map resources/)[0].replace(/Market, Warehouse, Sawmill/,'')),'shared buildings are explained, not listed');
assert.ok(sp.includes('swapped for this biome’s own versions'),'excluded base placeables explained');
const green=strip(h.render('biomes/evergreen/'));
assert.ok(/<h3>Workplaces<\/h3>[\s\S]*?<a[^>]*>Trading Outpost<\/a>/.test(h.render('biomes/evergreen/')),'evergreen lists the outpost');
assert.ok(!/Not offered here/.test(green)&&green.includes('Nothing that two or more other biomes offer is missing here'),'evergreen has no missing list');
const dry=strip(h.render('biomes/drylands/'));
assert.ok(/Not offered here, though other biomes have it\.[\s\S]*?Trading Outpost/.test(dry.match(/Not offered here[\s\S]*?Only here/)[0]),'drylands reports no outpost');
assert.ok(/Foresters’ Hub \([^)]*and \d+ more\)/.test(dry),'long level lists are capped: '+(dry.match(/Foresters’ Hub \([^)]*\)/)||[''])[0]);
const wet=strip(h.render('biomes/wetlands/'));
assert.ok(wet.includes('No sandbox configuration for this biome has been decoded'),'biome without a configuration says so');
const sandbox=h.render('sandbox/');
assert.ok(/Which buildings a biome offers is in the <a href="[^"]*biomes\/[^"]*">Sandbox build list<\/a> on its page/.test(sandbox)||/Sandbox build list<\/a>/.test(sandbox),'sandbox page links to the biome section');
assert.ok(strip(sandbox).includes('Extra need column is editorial'),'extra-need caveat on the sandbox page');
console.log('PASS: biome pages list sandbox plants, buildings, gaps and hand-made fallbacks.');
