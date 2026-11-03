// PR 91 (issue 90): which stock a building keeps when recycled. Only piles with PileConfig.PublicOutput are recovered.
import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const DM=JSON.parse(readFileSync(new URL('../../content/reference/decoded-mechanics.json',import.meta.url))),RS=DM.recycle_stock;
assert.ok(RS&&RS.records.length>=80&&RS.checked_versions.includes('31 build 255'),'recycle_stock section exported and checked against 31');
const rec=id=>RS.records.find(r=>r.gameobject_id===id);
// The two player observations from issue 90.
assert.deepEqual(rec(57394).kept.map(x=>x.resource),['IcePop'],'Ice Pop Stand keeps its Ice Pops');
assert.equal(rec(105702).kept.length+rec(105702).kept_unassigned_piles,0,'Winter Pub keeps nothing');
const row=p=>{const m=h.render(p).match(/When recycled<\/dt><dd>(.*?)<\/dd>/);return m?strip(m[1]):''};
assert.ok(/^Keeps Ice Pop ; loses Fruit and part-made items/.test(row('buildings/ice-pop-stand/')),'ice pop stand row: '+row('buildings/ice-pop-stand/'));
assert.ok(/^Keeps none of its stock; loses Wheatshine , Stick , Wheat and part-made items/.test(row('buildings/winter-pub/')),'winter pub row: '+row('buildings/winter-pub/'));
assert.ok(/^Keeps everything stored in it/.test(row('buildings/warehouse/')),'warehouse keeps its stock');
assert.ok(/^Keeps Bread ; loses Flour/.test(row('buildings/bakery/')),'bakery row');
assert.ok(h.lookup['recycling/'],'recycling route');
const page=h.render('recycling/'),t=strip(page);
assert.ok(t.includes('Recovering the Ice Pop from the Ice Pop Stand')&&t.includes('Not tested yet'),'rule and open questions');
assert.ok(/Winter Pub<\/a><\/td><td data-sort="1"><strong>Nothing<\/strong><\/td>/.test(page),'winter pub listed as keeping nothing');
assert.ok(/Trading Outpost<\/a> <span class="objective-note">\(Tropics\)<\/span>/.test(page),'differing variants get their own row');
assert.ok(!/KitchenFire|JuiceInMold|Wheelbarrow|Cooking Pot/.test(t),'internal names and workplace tools stay out');
assert.ok(h.render('mechanics/').includes('href="/recycling/"'),'listed on the mechanics hub');
console.log('PASS: recycling keeps only public output piles.');
