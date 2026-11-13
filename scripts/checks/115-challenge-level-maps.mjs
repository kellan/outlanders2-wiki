// PR 115: maps for the packaged challenge levels and the tournament tutorials (84 more pages), on top of the story levels.
import assert from 'node:assert/strict';import vm from 'node:vm';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<[^>]+>/g,' ').replace(/&#39;/g,"'").replace(/\s+/g,' ').replace(/ ([,.)])/g,'$1');
const lm=JSON.parse(vm.runInContext('JSON.stringify(DM.level_maps)',h.ctx)),has=n=>lm.records.some(r=>r.asset_name===n);
const pages=JSON.parse(vm.runInContext(`JSON.stringify(W.levels.filter(l=>['packaged legacy challenge','FAST tutorial'].includes(l.scenario?.source_category)).map(l=>[l.id,l.scenario.asset_name,l.scenario.source_category]))`,h.ctx));
assert.equal(pages.filter(p=>p[2]==='packaged legacy challenge').length,81);assert.equal(pages.filter(p=>p[2]==='FAST tutorial').length,3);
for(const [id,n] of pages){assert.ok(has(n),n+': has a map');assert.ok(/id="map"/.test(h.render('levels/'+id+'/')),n+': map section on its page')}
assert.equal(lm.records.length,130,'46 story levels + 81 packaged challenges + 3 tutorials');
assert.ok(!lm.records.some(r=>/^Test /.test(r.asset_name)),'no maps for the game’s internal test levels (they have no pages)');
const t=strip(h.render('levels/FAST_Tutorial01/'));assert.match(t,/Map .*Our own drawing from the level file/);
console.log('PASS: maps on 81 packaged challenge pages and 3 tournament tutorial pages; 130 maps in all.');
