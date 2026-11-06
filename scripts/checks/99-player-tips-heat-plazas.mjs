// PR 99: two player tips checked against the data: children cannot drink Wheatshine; fake build sites move materials.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
for(const p of ['heat-cooling-water/','resources/wheatshine/','buildings/winter-cabin/']){const t=strip(h.render(p));assert.ok(t.includes('Wheatshine is not enough for Heat on levels with children.')&&t.includes('stops Heat falling below 79'),'kids tip on '+p)}
const clim=strip(h.render('heat-cooling-water/'));assert.ok(clim.includes('killed the children: they cannot drink Wheatshine'),'report shown on the climate page');
const rec=strip(h.render('recycling/'));assert.ok(rec.includes('Fake build sites: carry materials where you need them')&&rec.includes('everything delivered so far')&&rec.includes('ten Planks'),'fake build sites section');
// Level pages: warn wherever Wheatshine is a Heat source on a map with Heat switched on.
const lv=Object.keys(h.lookup).filter(k=>/^(levels|challenges|campaigns)\//.test(k)).map(k=>strip(h.render(k)));
const warned=lv.filter(t=>t.includes('Heat here: Wheatshine is not enough if there are children.'));
assert.ok(warned.length>0,'some level pages carry the Wheatshine warning');
assert.ok(warned.every(t=>/Heat Yes [^]*?Wheatshine/.test(t.slice(t.indexOf('What can meet it here'),t.indexOf('Available buildings')))),'only where Heat is on and Wheatshine can be made');
console.log('PASS: Wheatshine is not enough for Heat with children (climate, Wheatshine, Winter Cabin and level pages); fake build sites.');
