// PR 114: maps for every story level (not only the first four); fields and roads drawn in their own colours, unlabelled.
import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';import {harness,root} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<[^>]+>/g,' ').replace(/&#39;/g,"'").replace(/\s+/g,' ').replace(/ ([,.)])/g,'$1');
const lm=JSON.parse(vm.runInContext('JSON.stringify(DM.level_maps)',h.ctx)),has=n=>lm.records.some(r=>r.asset_name===n);
const story=JSON.parse(vm.runInContext(`JSON.stringify(W.levels.filter(l=>l.scenario&&/^(Level0\\d[ABC]|Level06Map|Campaign\\d_Level\\d[ABC])$/.test(l.scenario.asset_name)).map(l=>[l.id,l.scenario.asset_name]))`,h.ctx));
assert.equal(story.length,46,'46 story level pages (Oona’s three levels are held back as spoilers)');
for(const [id,n] of story){assert.ok(has(n),n+': has a map');assert.ok(/id="map"/.test(h.render('levels/'+id+'/')),n+': map section on its page')}
const spoilers=JSON.parse(fs.readFileSync(new URL('../../content/spoilers.json',import.meta.url),'utf8')).entries.filter(e=>e.type==='levels').map(e=>e.id);
assert.ok(spoilers.length>=3);for(const n of spoilers){assert.ok(!has(n),n+': no map record for a spoiler level');assert.ok(!fs.existsSync(root+'assets/level-maps/'+n+'.png'),n+': no image file for a spoiler level')}
for(const r of lm.records){for(const l of r.labels)assert.ok(l.x>0&&l.x<100&&l.y>0&&l.y<100,r.asset_name+': label inside the image');
 assert.ok(!r.labels.some(l=>/^(Field |Road$|Stone Road|Brick Road)/.test(l.name)),r.asset_name+': no field or road labels');assert.ok(!r.buildings.some(b=>/^Field |Road$/.test(b)),r.asset_name+': fields and roads are not listed as buildings')}
const mg=lm.records.find(r=>r.asset_name==='Level06B');assert.ok(mg.objects.field>0&&mg.objects.road>0,'Management has fields and roads');
assert.match(strip(h.render('levels/Level06B/')),/Trees Rocks Fields Roads Buildings Build sites Villagers/);
assert.deepEqual(lm.records.find(r=>r.asset_name==='Campaign2_Level1C').buildings,[],'Summit Heat: its Stone Road is a road, not a building');
assert.deepEqual(lm.records.find(r=>r.asset_name==='Campaign2_Level7A').buildings,['UFO part 1','UFO part 2','UFO part 3'],'Unidentified: story props get readable names');
const vd=h.render('levels/Campaign2_Level1A/');assert.match(vd,/alt="Schematic map of Valley Draft[^"]*Land in sand, soil and mountain, with water\./);assert.ok(!/surrounded by water/.test(vd));
console.log('PASS: maps on all 46 story level pages, none for spoiler levels; fields and roads unlabelled.');
