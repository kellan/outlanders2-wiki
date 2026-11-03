// PR 93: recycle refund is 60% rounded down (code), and the Roads and walking page from decoded speeds.
import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const DM=JSON.parse(readFileSync(new URL('../../content/reference/decoded-mechanics.json',import.meta.url)));
assert.equal(DM.recycle_stock.refund.finished_multiplier,0.6,'refund multiplier from code');
const row=p=>{const m=h.render(p).match(/Recycle refund<\/dt><dd>(.*?)<\/dd>/);return m?strip(m[1]).trim():''};
assert.ok(row('buildings/bakery/').startsWith('5 Clay + 2 Stone'),'bakery refund matches the playtest: '+row('buildings/bakery/'));
assert.ok(row('buildings/basic-house/').startsWith('3 Log'),'basic house refund matches the playtest: '+row('buildings/basic-house/'));
assert.ok(strip(h.render('recycling/')).includes('refunds 60% of each material it cost, rounded down'),'recycling page states the rule');
for(const f of ['bakery-demolition-refund','basic-house-demolition-refund']){const o=JSON.parse(readFileSync(new URL(`../../content/observations/${f}.json`,import.meta.url)));assert.ok(!/half of each material|half its construction cost/.test(o.claim)&&o.notes.includes('60%'),'observation reworded: '+f)}
assert.ok(h.lookup['roads-and-walking/'],'walking route');
const t=strip(h.render('roads-and-walking/'));
assert.ok(/Adult 1\.7 0\.85 100% Child 1\.35/.test(t)&&t.includes('Elder 1.2'),'speed table');
assert.ok(/Stone Road ×2\.15/.test(t)&&/Road ×1\.4/.test(t)&&/Bridge ×1\.35/.test(t)&&/Warehouse ×1\.2/.test(t),'surface table');
assert.ok(t.includes('Boots : ×1.4 off roads and ×1.2 on them')&&t.includes('×1.5 walking'),'gear and boost');
assert.ok(/Bare ground 55 s 3/.test(t)&&/Stone Road 27 s 6/.test(t),'road worth table');
const hub=strip(h.render('mechanics/'));assert.ok(hub.includes('Roads and walking')&&!hub.includes('Base walking speed and the road bonus are not in the exported data'),'hub lists the page; open item gone');
assert.ok(t.includes('When to build a road: rules of thumb')&&t.includes('Each square saves about 1.4 seconds per round trip')&&/A 20-square route walked 10 round trips a day saves about 280 seconds a day, 1\.6 shifts/.test(t)&&t.includes('60% of 1 Stone rounds down to 0'),'road rules of thumb: '+(t.match(/A 20-square route walked[^.]*\./)||[''])[0]);
console.log('PASS: recycle refund 60% rounded down; Roads and walking page with road rules of thumb.');
