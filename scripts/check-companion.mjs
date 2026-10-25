import assert from 'node:assert/strict';
import {harness} from './render-harness.mjs';
const h=await harness();
const bakery=h.render('buildings/bakery/');
assert.ok(bakery.includes('class="infobox"'),'infobox');
assert.ok(bakery.includes('Recipe'),'infobox recipe');
assert.ok(bakery.includes('/food/bread/'),'infobox links output');
assert.ok(bakery.includes('class="verify-badge"'),'verification badge');
assert.ok(bakery.includes('github.com/kellan/outlanders2-wiki/edit/main/content/buildings/57395.json'),'suggest an edit link');
assert.ok(bakery.includes('issues/new?'),'report link');
assert.ok(bakery.includes('class="navbox"'),'navbox');
assert.ok(bakery.includes('Campaign 1'),'availability grouped by campaign');
assert.ok(!/Pending verification|Gameplay verification/.test(bakery));
// Backlinks from formulas and objectives.
const cookie=h.render('food/cookie/');
assert.ok(cookie.includes('Level objectives'),'objective backlinks');
assert.ok(cookie.includes('/levels/a-moon-part/'));
assert.ok(cookie.includes('≥ 33'));
assert.ok(cookie.includes('/buildings/cookie-shop/'),'produced by');
const bread=h.render('food/bread/');
assert.ok(bread.includes('class="navbox"'));assert.ok(bread.includes('/food/cookie/'),'food navbox');
assert.ok(!/Mushroom|Stroganoff/.test(bread),'navbox leaked spoilers');
// Leaders link to their stories and levels.
const pablo=h.render('heroes/pablo/');
assert.ok(pablo.includes("Pablo&#39;s Quest"));assert.ok(pablo.includes('/levels/the-end-of-the-world/'));assert.ok(pablo.includes('/campaigns/campaign-1/'));
assert.ok(!pablo.includes('Oona'),'leader navbox leaked spoiler');
// Levels show story context and neighbours.
const middle=h.render('levels/middle-ground/');
assert.ok(middle.includes("Pablo&#39;s Quest"));assert.ok(middle.includes('/levels/the-end-of-the-world/'));assert.ok(middle.includes('/levels/a-new-start/'));
assert.ok(middle.includes('2 of 3'));
assert.ok(!/<details open><summary>Show \d+ starting object/.test(middle),'starting objects collapsed');
// Plants: growth from stored stages, grouped scenarios, archive maps collapsed.
const pumpkin=h.render('buildings/pumpkin/');
assert.ok(pumpkin.includes('Growth'),'growth row');
assert.ok(/<details><summary>[^<]*archive map/.test(pumpkin),'archive maps collapsed');
// Chain pages lead with the recipe; decoded steps are collapsed.
const chain=h.render('production-chains/bakery/');
assert.ok(chain.indexOf('In-game field guide')<chain.indexOf('Formula steps'));
assert.ok(/<details>\s*<summary>[^<]*decoded steps/.test(chain),'steps collapsed');
// Buildings catalog has type and produces columns.
const dir=h.render('buildings/');assert.ok(dir.includes('<th scope="col">Type</th>'));assert.ok(dir.includes('<th scope="col">Produces</th>'));
// Spoiler pages keep neutral report titles.
const oona=h.render('heroes/oona/');assert.ok(!/issues\/new\?[^"]*Oona/.test(oona),'spoiler name in issue title');
console.log('PASS: infoboxes, verification badge, objective and recipe backlinks, grouped availability, story context, navboxes, collapsed research detail, catalog columns and contribution links.');
// Derived balances are ratios, not batches or capacities.
const bakeryBox=bakery.slice(bakery.indexOf('class="infobox"'),bakery.indexOf('</aside>'));
assert.ok(bakeryBox.includes('8 Bread'),'infobox shows per-cycle output');assert.ok(bakery.includes('ratio per 1 Flour'),'formula-graph ratio still shown as supporting detail');
const recipeRow=bakeryBox.slice(bakeryBox.indexOf('<dt>Recipe</dt>'),bakeryBox.indexOf('</div>',bakeryBox.indexOf('<dt>Recipe</dt>')));assert.ok(recipeRow&&!/\b40\b/.test(recipeRow),'recipe row must not present 40 Bread as output');
assert.ok(bakery.includes('not a batch size, a storage capacity or a production rate'));
assert.ok(h.render('verification/buildings/bakery/').includes('holds 40 Bread'),'capacity observation on research page');
console.log('PASS: ratio presentation and Bakery capacity observation.');
// Per-cycle recipe and capacity come from the gameplay block.
const box2=(()=>{const b=h.render('buildings/bakery/');return b.slice(b.indexOf('class="infobox"'),b.indexOf('</aside>'))})();
assert.ok(box2.includes('1 Flour')&&box2.includes('1 Stick')&&box2.includes('8 Bread'),'per-cycle recipe in infobox');
assert.ok(box2.includes('Capacity')&&box2.includes('40 Bread'),'capacity in infobox');
assert.ok(!box2.includes('0.8 Stick'),'derived ratio must not replace the confirmed recipe');
assert.ok(h.render('production-chains/bakery/').includes('How production works'));
assert.ok(h.render('buildings/').includes('8 Bread'),'catalog uses per-cycle recipe');
assert.ok(h.render('verification/buildings/bakery/').includes('KitchenFire'),'fuel note on research page');
console.log('PASS: gameplay block drives recipe and capacity.');
// Work schedules come from WorkTimeRange, reported relative to the standard shift.
const clay=h.render('buildings/clay-pit/');
assert.ok(clay.includes('Work hours'),'work hours row');assert.ok(clay.includes('starts a tenth of a day later, finishes a tenth of a day later'),'clay pit offset');
assert.ok(h.render('buildings/bakery/').includes('Standard hours'));
assert.ok(h.render('buildings/quarry/').includes('starts a tenth of a day later <')||h.render('buildings/quarry/').includes('starts a tenth of a day later</'),'quarry starts late, finishes on time');
assert.ok(h.render('buildings/').includes('Work schedules'),'schedule table on catalog');
assert.ok(h.render('verification/buildings/clay-pit/').includes('Status: confirmed'),'decoded schedule observation');
console.log('PASS: work schedules relative to the standard shift.');
