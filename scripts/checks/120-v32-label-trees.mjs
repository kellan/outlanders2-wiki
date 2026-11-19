// PR 120: "Added in Update 32" no longer says "not yet released"; the Cypress and Willow trees (wild on Oona's levels) are public.
import assert from 'node:assert/strict';import fs from 'node:fs';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<[^>]+>/g,' ').replace(/&#39;/g,"'").replace(/\s+/g,' ');
for(const p of ['buildings/swamp-trappers-hut/','food/stroganoff/']){const t=strip(h.render(p));assert.match(t,/Added in Update 32 \(released; Oona’s update, reported live by the maintainer on 19 November 2026\)/,p);assert.ok(!t.includes('not yet released'),p+': stale label gone')}
for(const n of ['cypress-tree','willow-tree']){assert.ok(!h.render('plants/'+n+'/').includes('Spoiler warning'),n+' public');assert.ok(!h.lookup['spoilers/plants/'+n+'/'],n+' off the spoiler routes')}
const sp=JSON.parse(fs.readFileSync(new URL('../../content/spoilers.json',import.meta.url),'utf8')).entries;assert.ok(sp.some(e=>String(e.id)==='78175'),'the unplaced non-recyclable Brick Road stays held');
console.log('PASS: update 32 shown as released; Cypress and Willow trees public; non-recyclable Brick Road still held.');
