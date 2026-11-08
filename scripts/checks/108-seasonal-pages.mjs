// PR 108: Halloween and Christmas collection pages, built from internal names, placed scenery and build lists.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<[^>]+>/g,' ').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').replace(/ ([,.)])/g,'$1');
const hw=h.render('halloween/'),hwt=strip(hw),xm=h.render('christmas/'),xmt=strip(xm);
// Halloween: biome, every Halloween-variant building and plant, the food, the maps.
assert.ok(hw.includes('/biomes/')&&/Spookylands is the Halloween biome/.test(hwt),'Spookylands linked');
for(const n of ['Halloween Tombstone','Communal Plaza','Fountain','Open Kitchen','Playground','Two-Story House','Zen Garden','Dead Tree','Pumpkin','Stew'])assert.ok(hwt.includes(n),'Halloween lists '+n);
assert.match(hwt,/Two-Story House \(Halloween look; the ordinary one is here\)/);
assert.match(hwt,/19 maps in all\. 9 of the online challenges ran in October 2025\./);
assert.match(hwt,/Halloween maps These 11 maps use the game’s own Halloween scene, so the whole map has the Halloween look, including its own day-and-night lighting, with a version for each Tournament Mode style \(Rural, Imperial, Egyptian, Mesoamerican and Nordic\)\./);
assert.match(hwt,/Other maps with Halloween touches Ordinary scenes with Halloween decorations or buildings added\. Map Kind What is Halloween about it Hollowgrounds Online challenge, 2025-04-18/);
for(const n of ['The Great Pumpkin Race','Morrigwyn Stones','A Moon Part','Spooktown','Spooky Veggie Ritual','The Pit of Thorns','Hollowgrounds','Dark Stew Feast'])assert.ok(hwt.includes(n),'Halloween map '+n);
assert.match(hwt,/The Great Pumpkin Race Story or standalone map Halloween trees, candles, spooky fences, gravestones and the Halloween ambience event/);
assert.ok(!/Town of the Year|River of Harmony|Unnamed scenario/.test(hwt),'build-list-only and unnamed maps left out');
// Christmas: Gingerbread buildings and food, the decorated maps; snowman-only and Gift Shop maps left out.
for(const n of ['Gingerbread Man Shop','Gingerbread Man Man','Gingerbread Man'])assert.ok(xmt.includes(n),'Christmas lists '+n);
assert.match(xmt,/13 maps in all\. 7 of the online challenges ran in December 2025\./);
assert.match(xmt,/Christmas maps These 9 maps use the game’s own Christmas scene/);
assert.match(xmt,/Presents The wrapped presents placed on Christmas maps are worth opening: recycle one and it gives 3 Coat or 1 Coat \+ 2 Book, depending on the present\./);
for(const n of ["Season's Greetings",'The Gingerbread Man Man','Last Minute Plan','Holiday Shores','Merry Gingerbread Man Party','Secret Gift Exchange'])assert.ok(xmt.includes(n),'Christmas map '+n);
assert.match(xmt,/Other maps with Christmas touches .*Holiday Shores Online challenge, 2025-12-19 Christmas tree lights, presents, candy canes and sleds; builds Gingerbread Man Shop and Gingerbread Man Man/);
assert.ok(!/Gift Shop|Mount Frosting|Snow Reign|Bundle Up! Story/.test(xmt.replace('Secret Gift Exchange','')),'Gift Shop (memorabilia) and snowman-only maps left out');
assert.ok(!/Holiday style|Not seen in game/.test(hwt+xmt),'no unreleased tournament style');
// Level pages link back, beside the biome.
assert.match(strip(h.render('levels/Single_C_SnowValley/')),/Biome Winterlands Christmas event scene · Christmas Main objectives/);
assert.match(strip(h.render('levels/Single06.1_L_Pumpkins/')),/Biome Spookylands · Halloween Main/);
// Linked from the home page.
const home=h.render('');assert.ok(home.includes('/halloween/')&&home.includes('/christmas/'),'home links both pages');
console.log('PASS: Halloween (19 maps) and Christmas (13 maps) collection pages, linked from the home page.');
