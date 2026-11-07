// PR 103: level-specific buildings (the game's Story/Mission and Special build-menu groups, and its level-unique folders).
import assert from 'node:assert/strict';import vm from 'node:vm';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const names=JSON.parse(vm.runInContext("JSON.stringify(uniq(D.buildings.filter(b=>isLevelSpecific(b))).map(b=>b.name).sort())",h.ctx));
for(const n of ["Author's Stand",'Beer Stand','Ritual of Hidden Light','Giant Wheel','Hanging Garden','Gift Shop','Wishing Well','Watchtower','Concert Stage',"Pablo's Ladder",'Gingerbread Man Man'])assert.ok(names.includes(n),'level-specific: '+n);
for(const n of ['Bakery','Mead Hall','Beehive','Fountain','Trading Outpost','Communal Plaza'])assert.ok(!names.includes(n),'ordinary, not level-specific: '+n);
const rit=strip(h.render('buildings/ritual-of-hidden-light/'));
assert.ok(rit.includes('Level-specific building.')&&/Only on (built on )?The Mirror/.test(rit)&&rit.includes('Counterspell'),'ritual note and Only on row');
const au=strip(h.render('buildings/author-s-stand/'));assert.ok(/Only on built on Picun.{1,6}s Secret , Too Hot to Write ; starts on the map in Where Am I\?/.test(au)&&au.includes('it starts on the map, already placed or as a build site to finish, in Where Am I?'),'Author\'s Stand: built on two levels, starts on the map in Where Am I?: '+(au.match(/Only on[^]*?Game data/)||[''])[0]);
assert.ok(/Giant Wheel/.test(names)&&strip(h.render('buildings/giant-wheel/')).includes('Wheel of Thirst'),'giant wheel mentions Wheel of Thirst');
assert.ok(strip(h.render('buildings/beer-stand/')).includes('Anthology , Sold Out ask for it without it being on the build list or the map'),'beer stand: required by levels that do not list or place it');
assert.ok(strip(h.render('buildings/wishing-well/')).includes('In the game’s build menu it is under Story')&&strip(h.render('buildings/wishing-well/')).includes('built from a Story tab in the build menu'),'Story pointer where a Story-group building is buildable, confirmed in play');
for(const p of ['buildings/beer-stand/','buildings/author-s-stand/','buildings/ritual-of-hidden-light/'])assert.ok(!strip(h.render(p)).includes('under Story'),'no Story pointer where it cannot be built from a menu or is outside the group: '+p);
const dir=strip(h.render('buildings/'));assert.ok(dir.includes('Level-specific')&&/Beer Stand Level-specific/.test(dir),'directory tab and chip');
console.log('PASS: level-specific buildings identified and labelled.');
