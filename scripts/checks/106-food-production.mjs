// PR 106: Food production compared — one sortable table of every field, tree, gatherer and kitchen that makes food.
import assert from 'node:assert/strict';import vm from 'node:vm';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<[^>]+>/g,' ').replace(/&#39;/g,"'").replace(/\s+/g,' ').replace(/ ([,.)])/g,'$1');
const html=h.render('food-production/'),t=strip(html);
const rows=[...html.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(m=>strip(m[1]).trim());
const row=n=>rows.find(r=>r.startsWith(n+' ')||r.startsWith(n+' * '))||'';
// Every food-making building and every food plant has exactly one row.
const want=vm.runInContext(`DM.food_rates.records.filter(r=>B[r.gameobject_id]&&!isSuppressed("buildings",r.gameobject_id)&&r.rates.length).map(r=>r.building).concat(uniq(D.buildings.filter(b=>b.is_plant&&!isSuppressed("buildings",b.gameobject_id)&&foodPerDay(b))).map(b=>b.name))`,h.ctx);
for(const n of new Set(want))assert.equal(rows.filter(r=>r.startsWith(n+' ')||r.startsWith(n+' * ')).length,1,'one row for '+n);
// Numbers match the research tests (Bakery and Cheesery agree with the older production profiles).
assert.match(row('Bakery'),/Kitchen 43\.6 Bread 43\.6 87\.1 \(2 workers\) 4\.4 Stick, 5\.4 Flour 87\.1 130\.7 Workers/);
assert.match(row('Cheesery'),/27 Cheese .*81 \(2 workers\).*Milk from Cows.*6 timed spots: Cheese Wheel \(400 s\)/);
assert.match(row('Open Kitchen'),/54\.3 Stew .*Veggie, Meat or Egg 18\.1 \(54\.3 if cooked from non-food\).*One work spot/);
assert.match(row('Desert Cookhouse'),/57\.6 Manchamanteles .*19\.2 Fruit, 19\.2 Veggie 19\.2 /);
assert.match(row("Foragers' Hut"),/Gatherer 87\.1 Fruit 29 87\.1 \(3 workers\) Fruit growing nearby — \(picks what trees grow\)/);
assert.match(row('Carrot'),/Field crop 3 Veggie per 9 days \(per full field\) — 0\.33 /);
assert.ok(/^Dried Meat Shop \*/.test(row('Dried Meat Shop'))&&/needs a worker, so treat its figure as a loose upper bound/.test(t),'unreadable step flagged');
assert.ok(/Past a point, more workers add little/.test(t)&&/Open Kitchen \(2 workers make as much as 3\)/.test(t),'bottleneck takeaway');
// Linked from Mechanics and from the Food directory, which no longer says factory speed is not stored.
assert.ok(h.render('mechanics/').includes('Food production'),'listed on Mechanics');
const food=h.render('food/');assert.ok(!/factory speed, which is not stored/.test(food)&&/Food production compared/.test(strip(food)),'Food page links the comparison');
console.log('PASS: food production page lists every food source with decoded ceilings and net food.');
