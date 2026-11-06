// PR 101: production steps, plant production chains, same-name copies and never-released unnamed maps have no
// reader page of their own; research pages stay out of search engines.
import assert from 'node:assert/strict';import fs from 'node:fs';import {harness,root} from '../render-harness.mjs';
const h=await harness(),byPath=new Map(h.pages.map(p=>[p.path,p]));
// No canonical page for an unnamed resource or a plant's production chain.
assert.ok(!h.pages.some(p=>p.category==='Intermediate'),'no production-step pages');
assert.ok(!h.pages.some(p=>p.type==='chains'&&p.path.startsWith('production-chains/field-')),'no field-crop chain pages');
for(const p of ['production-chains/carrot/','production-chains/apple-tree/'])assert.ok(!byPath.has(p),p+' is not a canonical page');
// Old addresses redirect to the page a player wants.
const target=p=>h.lookup[p]?.path;
assert.equal(target('production-chains/carrot/'),'plants/carrot/');
assert.equal(target('production-chains/field-carrot/'),'plants/carrot/');
assert.equal(target('resources/almoststew/'),'buildings/open-kitchen/');
assert.equal(target('resources/swimsuit/'),'gear/');
// Research pages for steps survive.
assert.ok(h.pages.some(p=>p.type==='evidence'&&p.path==='verification/resources/almoststew/'),'step research page kept');
// The resources catalog has no intermediates tab, and the A–Z index lists no steps.
assert.ok(!h.render('resources/').includes('Include intermediates'),'no intermediates tab');
assert.ok(!h.render('index/').includes('AlmostStew'),'A–Z index without steps');
// Same-name copies merge into the most-used version; biome Trading Outposts keep their own pages.
assert.equal(target('food/fondue-279217/'),'food/fondue/');
assert.equal(target('buildings/communal-plaza-115541/'),'buildings/communal-plaza/');
assert.equal(target('buildings/fountain-65619/'),'buildings/fountain/');
assert.ok(byPath.has('buildings/trading-outpost-75225/'),'Tropiclands outpost keeps its page');
const fountain=h.render('buildings/fountain/');
assert.ok(fountain.includes('<h2>Other versions</h2>')&&fountain.includes('Standard (shown)')&&fountain.includes('Halloween'),'versions table with plain labels');
assert.ok(!fountain.includes('Halloween Fountain ·'),'no internal names in the versions table');
assert.ok(!h.pages.some(p=>p.type!=='evidence'&&/-\d{5,}\/$/.test(p.path)&&!p.path.startsWith('buildings/trading-outpost')&&!p.path.startsWith('production-chains/trading-outpost')&&!p.path.startsWith('challenges/')),'no numbered reader pages besides the biome outposts');
// Never-released unnamed maps: no page, not in level lists, unlinked in the type page's collapsed table.
assert.ok(!h.pages.some(p=>p.type==='levels'&&/^Unnamed scenario/.test(p.name)),'no unnamed map pages');
assert.equal(target('levels/unnamed-scenario-archive-19-1/'),'challenges/chill/');
assert.ok(!/Unnamed scenario/.test(h.render('buildings/farm/'))&&!/Unnamed scenario/.test(h.render('levels/')),'unnamed maps out of level lists');
// Research pages: noindex and not in the sitemap, when the static build exists.
if(fs.existsSync(root+'sitemap.xml')){
 assert.ok(!fs.readFileSync(root+'sitemap.xml','utf8').includes('/verification/'),'sitemap without research pages');
 assert.ok(fs.readFileSync(root+'verification/buildings/farm/index.html','utf8').includes('<meta name="robots" content="noindex, follow">'),'research pages are noindex');
 assert.ok(!fs.readFileSync(root+'buildings/farm/index.html','utf8').includes('name="robots"'),'reader pages stay indexable');
}
console.log('PASS: no production-step, plant-chain, duplicate or unnamed-map pages; old addresses redirect; research pages noindex and out of the sitemap.');
