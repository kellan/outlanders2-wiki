// PR 113: buildings on level maps are marked with numbered pins and named in a key under the map.
import assert from 'node:assert/strict';import vm from 'node:vm';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<[^>]+>/g,' ').replace(/&#39;/g,"'").replace(/\s+/g,' ').replace(/ ([,.)])/g,'$1');
const recs=JSON.parse(vm.runInContext('JSON.stringify(DM.level_maps.records)',h.ctx)),sf=recs.find(r=>r.asset_name==='Level06A');
assert.equal(sf.labels.length,9,'Storefront: 9 placed buildings and sites have label positions');
for(const l of sf.labels)assert.ok(l.x>0&&l.x<100&&l.y>0&&l.y<100,'label inside the image: '+JSON.stringify(l));
const wt=sf.labels.find(l=>/Watchtower/.test(l.name)),lj=sf.labels.find(l=>/Lumberjacks/.test(l.name));
assert.ok(wt.y<lj.y&&wt.x>lj.x,'Watchtower site above and right of the Lumberjacks\' Base, as on the in-game screenshot');
const x=h.render('levels/Level06A/'),t=strip(x);
assert.equal((x.match(/class="map-pin" style="left:/g)||[]).length,7,'7 pins: camp buildings close together share pins');
assert.match(t,/Map 1 2 2 3 4 5 6 1 Watchtower \(build site\) 2 Foragers' Hut \(2 places\) 3 Basic House, Warehouse 4 Basic House ×2 5 Clay Pit 6 Lumberjacks' Base Water Sand/);
assert.match(t,/Numbers mark the buildings already placed\./);
assert.match(strip(h.render('levels/Level01B/')),/Map 1 1 Foragers' Hut Water/);
assert.ok(!/map-pin/.test(h.render('levels/Level01A/')),'no pins where nothing is placed');
console.log('PASS: numbered building markers with a key on level maps.');
