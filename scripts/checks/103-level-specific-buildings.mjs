// PR 103: level-specific buildings (the game's Story/Mission and Special build-menu groups, and its level-unique folders).
import assert from 'node:assert/strict';import vm from 'node:vm';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const names=JSON.parse(vm.runInContext("JSON.stringify(uniq(D.buildings.filter(b=>isLevelSpecific(b))).map(b=>b.name).sort())",h.ctx));
for(const n of ["Author's Stand",'Beer Stand','Ritual of Hidden Light','Giant Wheel','Hanging Garden','Gift Shop','Wishing Well','Watchtower','Concert Stage',"Pablo's Ladder",'Gingerbread Man Man'])assert.ok(names.includes(n),'level-specific: '+n);
for(const n of ['Bakery','Mead Hall','Beehive','Fountain','Trading Outpost','Communal Plaza'])assert.ok(!names.includes(n),'ordinary, not level-specific: '+n);
const rit=strip(h.render('buildings/ritual-of-hidden-light/'));
assert.ok(rit.includes('Level-specific building.')&&/Only on The Mirror/.test(rit)&&rit.includes('Counterspell'),'ritual note and Only on row');
assert.ok(strip(h.render('buildings/beer-stand/')).includes('Not in any starting build list'),'beer stand: placed or unlocked, not in a build list');
assert.ok(strip(h.render('buildings/wishing-well/')).includes('In the game’s build menu it is under Story')&&strip(h.render('buildings/wishing-well/')).includes('built from a Story tab in the build menu'),'Story pointer where a Story-group building is buildable, confirmed in play');
for(const p of ['buildings/beer-stand/','buildings/author-s-stand/','buildings/ritual-of-hidden-light/'])assert.ok(!strip(h.render(p)).includes('under Story'),'no Story pointer where it cannot be built from a menu or is outside the group: '+p);
const dir=strip(h.render('buildings/'));assert.ok(dir.includes('Level-specific')&&/Beer Stand Level-specific/.test(dir),'directory tab and chip');
console.log('PASS: level-specific buildings identified and labelled.');
