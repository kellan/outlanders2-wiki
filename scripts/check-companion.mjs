import assert from 'node:assert/strict';
import fs2 from 'node:fs';import {root as root2} from './render-harness.mjs';
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
// Level strategies render apart from decoded data, with a contribution path on every level.
const endOfWorld=h.render('levels/the-end-of-the-world/');
assert.ok(endOfWorld.includes('Community · draft'),'strategy status');assert.ok(endOfWorld.includes('Suggested build order'));assert.ok(endOfWorld.includes('/buildings/foragers-hut/'),'build order links');
assert.ok(endOfWorld.includes('template=level-strategy.yml'),'strategy form link');
const noStrategy=h.render('levels/middle-ground/');assert.ok(noStrategy.includes('Share a strategy for this level'));assert.ok(noStrategy.includes('level=Middle%20Ground'),'level prefilled');
assert.ok(!/level=[^"&]*Oona|level=Clause/.test(h.render('spoilers/levels/clause/')||''),'spoiler level not prefilled');
console.log('PASS: level strategy section and contribution form.');
// History entries render on entity pages and the changelog, backdated only with evidence.
const jelena=h.render('heroes/jelena/');assert.ok(jelena.includes('<h2>History</h2>'),'history section');assert.ok(jelena.includes('Update 8'));
const log=h.render('changelog/');assert.ok(log.includes('Update 21'));assert.ok(log.includes('/heroes/fjordi/'));assert.ok(!log.includes('Oona'),'changelog leaked spoiler');
assert.ok(h.render('levels/valley-draft/').includes('Added with the Jelena'));
console.log('PASS: history sections and changelog.');
// Stored-configuration additions: biome per level, starting conditions, needs page, age limits, harvest sources, placement.
const W2=JSON.parse(fs2.readFileSync(root2+'data/world.json'));
const snow=W2.levels.find(l=>l.scenario.level_config[0]?.LevelScene==='LevelSnow'&&!/Unnamed/.test(l.name));const snowPage=h.render(h.pages.find(p=>p.type==='levels'&&p.id===snow.id).path);
assert.ok(snowPage.includes('Winterlands'),'level biome');assert.ok(snowPage.includes('<h2>Starting conditions</h2>'));
const moon=h.render('levels/a-moon-part/');assert.ok(moon.includes('5 adults, 2 kids'),'starting villagers');assert.ok(moon.includes('/food/veggie/')||moon.includes('/resources/veggie/'),'stockpile links');
assert.ok(h.render('biomes/winterlands/').includes('Levels in this biome'));assert.ok(h.render('biomes/winterlands/').includes('Map resources'));
assert.ok(h.render('levels/').includes('<th scope="col">Biome</th>'));
const needs=h.render('needs/');assert.ok(needs.includes('<h2>Cooling</h2>')&&needs.includes('Ice Pop'),'needs satisfiers');assert.ok(needs.includes('adults only'),'age limit');
assert.ok(!/Concoction|Stroganoff|Mushroom/.test(needs),'needs page leaked spoilers');
assert.ok(h.render('resources/wine/').includes('Adults only'));
assert.ok(h.render('buildings/quarry/').includes('rock sources'),'harvest row');
assert.ok(h.render('buildings/bridge/').includes('Placement')&&h.render('buildings/bridge/').includes('slopes up to 5'),'placement row');
console.log('PASS: biome per level, starting conditions, needs page, age limits, harvest sources and placement rules.');
// Internal names stay out of player-facing text.
const ch=h.render('challenges/');assert.ok(ch.includes('Tournament Mode supply-chain rules'));assert.ok(!ch.includes('FastMode supply chains'));
assert.ok(!h.render('about/').includes('FastMode supply-chain rules describe'),'about page leaks internal name');
console.log('PASS: FastMode shown as Tournament Mode.');
// Tournament Mode page from game text; unconfirmed seasons only in spoilers.
const tour=h.render('tournament/');assert.ok(tour.includes('Speed Bonus')&&tour.includes('Baby Boom'),'tiles');assert.ok(tour.includes('Nordic')&&tour.includes('Mesoamerican'),'seasons with reward sets');
assert.ok(!/Egyptian|Imperial/.test(tour),'public tournament page leaked withheld seasons');assert.ok(tour.includes('Rural')&&tour.includes('Current season'),'live season shown');assert.ok(tour.includes('Spoilers'),'pointer to spoilers');
for(const route of ['', 'index/','challenges/','needs/'])assert.ok(!/Egyptian|>Imperial</.test(h.render(route)),route+' leaked tournament season');
assert.ok(h.render('spoilers/').includes('Tournament seasons')&&h.render('spoilers/').includes('Egyptian'));
assert.ok(h.render('spoilers/tournament/').includes('Imperial'));assert.ok(h.lookup['spoilers/tournament/'].spoiler===true);
assert.ok(!tour.includes('not checked')&&tour.includes('Live ·'),'live tag');assert.ok(!h.render('spoilers/').includes('>Rural</a>'),'Rural left spoilers');
console.log('PASS: Tournament Mode page and season spoiler handling.');
