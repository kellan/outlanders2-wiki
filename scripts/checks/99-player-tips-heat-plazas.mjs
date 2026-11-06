// PR 99: two player tips checked against the data: children cannot drink Wheatshine; fake build sites move materials.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
for(const p of ['heat-cooling-water/','resources/wheatshine/','buildings/winter-cabin/']){const t=strip(h.render(p));assert.ok(t.includes('Children cannot drink Wheatshine.')&&t.includes('stops Heat falling below 79'),'kids tip on '+p)}
const clim=strip(h.render('heat-cooling-water/'));assert.ok(clim.includes('killed the children: they cannot drink Wheatshine'),'report shown on the climate page');
const rec=strip(h.render('recycling/'));assert.ok(rec.includes('Fake build sites: carry materials where you need them')&&rec.includes('everything delivered so far')&&rec.includes('ten Planks'),'fake build sites section');
console.log('PASS: Wheatshine children tip and fake build sites.');
