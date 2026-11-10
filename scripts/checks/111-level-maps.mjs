// PR 111 (issue 96): schematic level maps on level pages, drawn in the game's default view.
import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import {harness,root} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<[^>]+>/g,' ').replace(/&#39;/g,"'").replace(/\s+/g,' ').replace(/ ([,.)])/g,'$1');
const lm=JSON.parse(vm.runInContext('JSON.stringify(DM.level_maps)',h.ctx));
assert.deepEqual(lm.records.map(r=>r.asset_name).sort(),['Level01A','Level01B','Level01C','Level06A']);
assert.match(lm.orientation,/Flat and top-down, turned 45 degrees anticlockwise .*Not mirrored.*flat chosen over tilted by the maintainer/);assert.match(lm.publication,/level files themselves are not published/);
for(const r of lm.records){const png=fs.readFileSync(root+r.image);assert.ok(png.length<60000,r.asset_name+': image under 60 KB');
 const id=vm.runInContext(`W.levels.find(l=>l.scenario?.asset_name===${JSON.stringify(r.asset_name)}).id`,h.ctx),x=h.render('levels/'+id+'/');
 assert.ok(x.includes(`src="/${r.image}"`)&&/<section class="rule-section" id="map"><h2>Map<\/h2>/.test(x),r.asset_name+': map section');
 assert.ok(x.indexOf('id="map"')<x.indexOf('Starting conditions'),r.asset_name+': map before Starting conditions');
 assert.match(x,/alt="Schematic map of [^"]+, seen from above, facing the same way as the game&#39;s camera at the start\./,r.asset_name+': alt text');}
const sf=strip(h.render('levels/Level06A/'));
assert.match(sf,/Map .*?Water Sand Soil Mountain Trees Fruit trees Rocks Buildings Build sites Villagers Our own drawing from the level file: one patch of colour per map square, seen flat from above and turned to face the same way as the game’s camera at the start/);
assert.match(sf,/Numbers mark the buildings already placed\./);
const r6=lm.records.find(r=>r.asset_name==='Level06A');assert.equal(r6.villagers,7,'Storefront: 5 adults, 1 kid and the leader (matches the in-game count)');
assert.ok(!/id="map"/.test(h.render('levels/'+vm.runInContext(`W.levels.find(l=>l.scenario&&!['Level01A','Level01B','Level01C','Level06A'].includes(l.scenario.asset_name)).id`,h.ctx)+'/')),'no map section where none is exported');
assert.match(fs.readFileSync(new URL('../../docs/TOOLS-AND-PUBLICATION.md',import.meta.url),'utf8'),/Facts and our own drawings derived from those files are allowed; the files themselves are not/);
console.log('PASS: schematic maps on 4 level pages, game orientation, legend, alt text; policy reworded.');
