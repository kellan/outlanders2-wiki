// PR 101: production steps and plant production chains have no reader page; research pages stay out of search engines.
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
// Research pages: noindex and not in the sitemap, when the static build exists.
if(fs.existsSync(root+'sitemap.xml')){
 assert.ok(!fs.readFileSync(root+'sitemap.xml','utf8').includes('/verification/'),'sitemap without research pages');
 assert.ok(fs.readFileSync(root+'verification/buildings/farm/index.html','utf8').includes('<meta name="robots" content="noindex, follow">'),'research pages are noindex');
 assert.ok(!fs.readFileSync(root+'buildings/farm/index.html','utf8').includes('name="robots"'),'reader pages stay indexable');
}
console.log('PASS: no production-step or plant-chain pages, old addresses redirect, research pages noindex and out of the sitemap.');
