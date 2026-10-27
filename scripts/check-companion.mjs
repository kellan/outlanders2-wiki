import assert from 'node:assert/strict';
import fs2 from 'node:fs';import {root as root2} from './render-harness.mjs';
import {harness} from './render-harness.mjs';
const h=await harness();
const needsAll=()=>['needs/','needs/food/','needs/hydration/','needs/heat/','needs/energy/','needs/fun/','needs/cooling/','needs/wellness/','needs/community/','eating/'].map(p=>h.render(p)).join('\n');
const bakery=h.render('buildings/bakery/');
assert.ok(bakery.includes('class="infobox"'),'infobox');
assert.ok(bakery.includes('Recipe'),'infobox recipe');
assert.ok(bakery.includes('/food/bread/'),'infobox links output');
assert.ok(bakery.includes('class="verify-badge"'),'verification badge');
assert.ok(bakery.includes('github.com/kellan/outlanders2-wiki/edit/main/content/buildings/57395.json'),'suggest an edit link');
assert.ok(bakery.includes('template=content-correction.yml')&&bakery.includes('page=Bakery'),'report link prefilled');assert.ok(h.render('verification/buildings/bakery/').includes('template=gameplay-observation.yml'),'observation link on research page');
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
assert.ok(pumpkin.includes('Grows in'),'growth row');const apple=h.render('buildings/apple-tree/');assert.ok(apple.includes('Harvested by')&&apple.includes('Foragers&#39; Hut'),'harvested by');assert.ok(apple.includes('/buildings/orchard/'),'planted by');assert.ok(apple.includes('10 days (4 stages)'),'growth wording');assert.ok(!apple.includes('stored stage days'));assert.ok(h.render('verification/buildings/apple-tree/').includes('Growth stages'));
assert.ok(/<details><summary>[^<]*archive map/.test(pumpkin),'archive maps collapsed');
// Chain pages lead with the recipe; decoded steps are collapsed.
const chain=h.render('production-chains/bakery/');
assert.ok(chain.indexOf('In-game field guide')<chain.indexOf('Production steps'));
assert.ok(/<details>\s*<summary>Show the \d+ steps/.test(chain),'steps collapsed');
// Buildings catalog has type and produces columns.
const dir=h.render('buildings/');assert.ok(dir.includes('<th scope="col">Type</th>'));assert.ok(dir.includes('<th scope="col">Produces</th>'));
// Spoiler pages keep neutral report titles.
const oona=h.render('heroes/oona/');assert.ok(!/issues\/new\?[^"]*Oona/.test(oona),'spoiler name in issue title');assert.ok(!/issues\/new\?[^"]*Oona/.test(h.render('verification/heroes/Oona.000/')||''),'spoiler name in observation link');
console.log('PASS: infoboxes, verification badge, objective and recipe backlinks, grouped availability, story context, navboxes, collapsed research detail, catalog columns and contribution links.');
// Derived balances are ratios, not batches or capacities.
const bakeryBox=bakery.slice(bakery.indexOf('class="infobox"'),bakery.indexOf('</aside>'));
assert.ok(bakeryBox.includes('8 Bread'),'infobox shows per-cycle output');assert.ok(bakery.includes('ratio per 1 Flour'),'formula-graph ratio still shown as supporting detail');
const recipeRow=bakeryBox.slice(bakeryBox.indexOf('<dt>Recipe</dt>'),bakeryBox.indexOf('</div>',bakeryBox.indexOf('<dt>Recipe</dt>')));assert.ok(recipeRow&&!/\b40\b/.test(recipeRow),'recipe row must not present 40 Bread as output');
assert.ok(bakery.includes('not a batch size, a storage limit or a speed'));
assert.ok(h.render('verification/buildings/bakery/').includes('nominal 60 Bread'),'capacity observation on research page');
console.log('PASS: ratio presentation and Bakery capacity observation.');
// Per-cycle recipe and capacity come from the gameplay block.
const box2=(()=>{const b=h.render('buildings/bakery/');return b.slice(b.indexOf('class="infobox"'),b.indexOf('</aside>'))})();
assert.ok(box2.includes('1 Flour')&&box2.includes('1 Stick')&&box2.includes('8 Bread'),'per-cycle recipe in infobox');
assert.ok(box2.includes('Capacity')&&/60 <a[^>]*>Bread<\/a>/.test(box2),'capacity in infobox');
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
const log=h.render('changelog/');assert.ok(log.includes('<h2>Wiki changes</h2>')&&log.includes('<h3>2026-10-26</h3>')&&log.includes('href="https://outlanders2wiki.com/houses/"')&&/pull\/40">#40<\/a>/.test(log),'wiki changelog rendered from CHANGELOG.md');assert.ok(log.includes('<h2>Game updates</h2>'),'game updates section');{const ch=await import('./changelog.mjs');assert.equal(log.includes('<h3>Unreleased</h3>'),ch.fragments().length>0,'Unreleased heading appears exactly when fragments exist');assert.ok(log.includes('one file per change under'),'changelog header explains fragments')}assert.ok(log.includes('Update 21'));assert.ok(log.includes('/heroes/fjordi/'));assert.ok(!log.includes('Oona'),'changelog leaked spoiler');
assert.ok(h.render('levels/valley-draft/').includes('Added with the Jelena'));
console.log('PASS: history sections and changelog.');
// Stored-configuration additions: biome per level, starting conditions, needs page, age limits, harvest sources, placement.
const W2=JSON.parse(fs2.readFileSync(root2+'data/world.json'));
const snow=W2.levels.find(l=>l.scenario.level_config[0]?.LevelScene==='LevelSnow'&&!/Unnamed/.test(l.name));const snowPage=h.render(h.pages.find(p=>p.type==='levels'&&p.id===snow.id).path);
assert.ok(snowPage.includes('Winterlands'),'level biome');assert.ok(snowPage.includes('<h2>Starting conditions</h2>'));
const moon=h.render('levels/a-moon-part/');assert.ok(moon.includes('5 adults, 2 kids'),'starting villagers');assert.ok(moon.includes('/food/veggie/')||moon.includes('/resources/veggie/'),'stockpile links');
assert.ok(h.render('biomes/winterlands/').includes('Levels in this biome'));assert.ok(h.render('biomes/winterlands/').includes('Map resources'));
assert.ok(h.render('levels/').includes('<th scope="col">Biome</th>'));
const needs=needsAll();assert.ok(h.render('needs/cooling/').includes('<h1>Cooling</h1>')&&h.render('needs/cooling/').includes('Ice Pop'),'needs satisfiers on the Cooling page');assert.ok(needs.includes('adults only'),'age limit');
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
// Need effects stated in building descriptions appear beside stored units.
const porridge=h.render('food/barley-porridge/');assert.ok(porridge.includes('Community'),'stated community effect');assert.ok(porridge.includes('stated in the')||porridge.includes('when eaten at the'),'stated-effect label');
const needs2=needsAll();assert.ok(needs2.includes('Communal Plaza')&&needs2.includes('Ukulele')&&needs2.includes('Barley Porridge'),'stated effects on needs page');
assert.ok(h.render('verification/food/barley-porridge/').includes('raises Community'),'observation on research page');
console.log('PASS: description-stated need effects.');
// Research handoff: decoded gear, social spots, terrain, yields, day length and modelled rates.
const carrot=h.render('buildings/carrot/');assert.ok(carrot.includes('3 <a')||carrot.includes('yields 3'),'carrot yield per field');assert.ok(carrot.includes('per full field'));
const coat=h.render('resources/coat/');assert.ok(coat.includes('Gear effect')&&coat.includes('raises base Heat'),'coat gear row');
const boots=h.render('resources/boots/');assert.ok(boots.includes('walk speed')&&boots.includes('adults only'),'boots gear row');
const porridge2=h.render('food/barley-porridge/');assert.ok(porridge2.includes('Community 1')||porridge2.includes('Community</small><b>1</b>'),'porridge community value');
const cookhouse=h.render('buildings/porridge-cookhouse/');assert.ok(cookhouse.includes('Visiting gives')&&cookhouse.includes('Community 1'),'cookhouse social row');
assert.ok(h.render('buildings/bonfire/').includes('Heat 2'),'bonfire heat');
const needs3=needsAll();assert.ok(needs3.includes('base +129')||needs3.includes('base +129 (stored)'),'gear value on needs page');assert.ok(needs3.includes('1.2 (stored)'),'social value on needs page');
assert.ok(h.render('buildings/bridge/').includes('soil, water or sand'),'terrain names');assert.ok(h.render('buildings/bakery/').includes('flat soil only'));
assert.ok(h.render('buildings/').includes('300 simulation seconds'),'day length');
assert.ok(h.render('buildings/chicken-coop/').includes('Reported output')&&h.render('buildings/chicken-coop/').includes('per day'),'coop report');
assert.ok(h.render('verification/buildings/glassworks/').includes('Modelled production capacity'),'model on research page');
assert.ok(h.render('production-chains/glassworks/').includes('Production notes'),'highlights on chain page');
assert.ok(!h.render('buildings/glassworks/').includes('Modelled production capacity'),'model stays off reader page');
assert.ok(h.render('buildings/bakery/').includes('60 Bread'),'bakery capacity from decoded piles');
console.log('PASS: research handoff integration.');
// Stored per-unit recipes on resources, shown on resource, building and level pages.
{const canteenRecord=JSON.parse(fs2.readFileSync(new URL('../content/resources/300130.json',import.meta.url),'utf8'));
 assert.ok(Array.isArray(canteenRecord.made_from)&&canteenRecord.made_from.length===1,'canteen made_from stored in data');
 const per=Object.fromEntries(canteenRecord.made_from[0].per_unit.map(x=>[x.name,x.count]));assert.deepEqual(per,{'Glass Pane':2,Stick:0.4,'Reed Bunch':1},'per-unit canteen amounts');
 assert.equal(canteenRecord.made_from[0].smallest_whole_batch.outputs[0].count,5,'batch kept alongside per-unit');
 const breadRecord=JSON.parse(fs2.readFileSync(new URL('../content/resources/'+canteenRecord.made_from[0].per_unit[0].resource_id+'.json',import.meta.url),'utf8'));assert.ok(breadRecord.made_from.some(m=>m.building_name==='Glassworks'),'glass pane made_from');
 const canteen=h.render('resources/canteen/');assert.ok(canteen.includes('How it is made'),'resource recipe section');assert.ok(canteen.includes('Each Canteen:'),'per-unit heading');assert.ok(canteen.includes('2 Glass Pane')&&canteen.includes('1 Stick</a> for every 2.5 Canteen'),'per-unit amounts in prose');assert.ok(canteen.includes('Smallest whole batch:')&&canteen.includes('5 Canteen'),'batch shown');
 assert.ok(canteen.includes('Made from'),'infobox made-from row');
 const bread=h.render('food/bread/');assert.ok(bread.includes('Per cycle:')&&bread.includes('8 Bread'),'per-cycle recipe preferred for bread');
 const factory=h.render('buildings/canteen-factory/');assert.ok(factory.includes('Each Canteen:'),'per-unit line on building page');
 const firewood=JSON.parse(fs2.readFileSync(new URL('../content/resources/284894.json',import.meta.url),'utf8'));assert.ok(!(firewood.made_from||[]).some(m=>m.per_unit.some(x=>x.name==='Stick')),'stick-to-stick conversion excluded');
 const level=h.render('levels/mom-s-gardens/');assert.ok(level.includes('What the objectives need'),'level rollup');
 const start=level.indexOf('id="objective-needs"'),rows=level.slice(start,level.indexOf('</section>',start));const row=name=>{const i=rows.indexOf('>'+name+'</a></td>');return rows.slice(i,i+260).replace(/<[^>]+>/g,'|')};
 assert.ok(/Canteen\|+—\|+6\|+6\|/.test(row('Canteen')),'canteen optional only: '+row('Canteen'));
 assert.ok(/Glass Pane\|+—\|+12\|+—\|/.test(row('Glass Pane')),'glass pane expanded from canteens: '+row('Glass Pane'));
 assert.ok(/Stick\|+—\|+21\|/.test(row('Stick')),'sticks include glass fuel, rounded up: '+row('Stick'));assert.ok(row('Stick').includes('picked up near trees')&&!row('Stick').includes('|Log|'),'sticks are gathered, not worked back to logs');assert.ok(/Log\|+36\|+36\|+—\|+from the \|Lumberjacks/.test(row('Log')),'logs from the lumberjack, not the forester: '+row('Log'));assert.ok(!/<td>\d+\.\d+<\/td>/.test(rows),'no fractional amounts: '+(rows.match(/<td>\d+\.\d+<\/td>/)||[''])[0]);assert.equal((rows.match(/>Stick<\/a><\/td>/g)||[]).length,1,'same-named sticks merged');
 assert.ok(/Book\|+18\|+18\|+18\|/.test(row('Book')),'main objective book');
 assert.ok(/12 <a[^>]*>Glass Pane<\/a> at the/.test(level)&&/needs 18 <a[^>]*>Stick<\/a>/.test(level),'breakdown steps');
 const stones=h.render('levels/morrigwyn-stones/');assert.ok(/Egg<\/a><\/td><td>38<\/td><td>38<\/td><td>—<\/td><td>from the <a[^>]*>Chicken Coop/.test(stones),'eggs rounded up and sourced from the coop');assert.ok(/Wheat<\/a><\/td><td>19<\/td>[\s\S]{0,80}grown in fields: <a[^>]*>Wheat/.test(stones),'wheat grown in fields');
 console.log('PASS: stored recipes and objective rollups.');}
// Decoded mechanics: capacities, heating, housing, version gates, needs model, weather, boosts, pile tables.
{const glass=h.render('buildings/glassworks/');assert.ok(/Capacity<\/dt><dd>48 <a[^>]*>Glass Pane/.test(glass),'glassworks capacity from piles');assert.ok(glass.includes('2 piles of 24'),'pile breakdown');
 const factory=h.render('buildings/canteen-factory/');assert.ok(/Capacity<\/dt><dd>12 <a[^>]*>Canteen/.test(factory),'canteen capacity');
 const bakery2=h.render('buildings/bakery/');assert.ok(/Capacity<\/dt><dd>60 <a[^>]*>Bread/.test(bakery2),'bakery capacity kept from the gameplay block');
 const cabin=h.render('buildings/winter-cabin/');assert.ok(cabin.includes('Heating')&&cabin.includes('burns one fuel item every day')&&cabin.includes('warms 4 sleeping spots'),'winter cabin heating row: '+(cabin.match(/Heating<\/dt><dd>[^<]*/)||[''])[0]);
 const house=h.render('buildings/basic-house/');assert.ok(house.includes('4 villagers')&&house.includes('plus a crib and a doghouse'),'housing row with crib and doghouse');
 const dock=h.render('buildings/fishing-dock/');assert.ok(/Added in<\/dt><dd>Update 17/.test(dock),'added-in row from MinGameVersion');
 const needs=h.render('needs/');for(const t of ['The eight needs','More about needs','href="/villagers/"','href="/happiness/"','href="/eating/"','href="/needs/food/"','Falls per day'])assert.ok(needs.includes(t),'needs page: '+t);assert.ok(h.render('needs/food/').includes('<h2>The meter</h2>')&&h.render('needs/food/').includes('5.75 days'),'food page meter');{const v=h.render('villagers/');for(const t of ['adult in about 80 minutes','<td>Adult</td><td>16</td>','5.75 days','Population stops at 200'])assert.ok(v.includes(t),'villagers page: '+t);const hp=h.render('happiness/');for(const t of ['Food</td><td>4</td><td>42%</td>','the Boost','Town of the Year'])assert.ok(hp.includes(t),'happiness page: '+t)}
 const tropics=h.render('biomes/tropiclands/');assert.ok(tropics.includes('Weather')&&tropics.includes('Heat wave')&&tropics.includes('2 to 6 days'),'tropical weather');
 assert.ok(!h.render('biomes/winterlands/').includes('<h2>Weather</h2>'),'no weather section elsewhere');
 const research=h.render('verification/buildings/bakery/');assert.ok(research.includes('<h2>Piles</h2>')&&research.includes('public output'),'pile table on research page');assert.ok(!bakery2.includes('<h2>Piles</h2>'),'pile table stays on the research page');
 assert.ok(h.render('tournament/').includes('<h2>Boosts</h2>'),'tournament boosts');
 const spoil=JSON.parse(fs2.readFileSync(new URL('../content/spoilers.json',import.meta.url),'utf8'));assert.ok(spoil.entries.filter(e=>e.status==='confirmed-unreleased').length>=20,'version gates confirmed spoilers');
 assert.ok(!h.render('buildings/').includes('Stroganoff'),'gated building still withheld from the catalog');
 console.log('PASS: decoded mechanics on infoboxes, needs, biomes, research and tournament pages.');}
// Plants section (issue 20) and tree yields (issue 21).
{assert.ok(h.lookup['plants/'],'plants directory route');assert.ok(h.lookup['plants/apple-tree/']&&h.lookup['buildings/apple-tree/'],'plant route with building alias');assert.equal(h.lookup['buildings/apple-tree/'],h.lookup['plants/apple-tree/'],'alias resolves to the same page');
 const dir=h.render('plants/');assert.ok(dir.includes('Apple Tree')&&dir.includes('Carrot')&&dir.includes('Field crop'),'plants directory lists crops and trees');
 assert.ok(!h.render('buildings/').includes('>Apple Tree<'),'buildings catalog no longer lists plants');
 const ash=h.render('plants/ash-tree/');assert.ok(/4 <a[^>]*>Log<\/a> per tree when felled/.test(ash)&&ash.includes('6 chops'),'ash felling yield: '+(ash.match(/Yields<\/dt><dd>[^<]*<[^>]*>[^<]*<\/a>[^<]*/)||[''])[0]);
 const apple=h.render('plants/apple-tree/');assert.ok(apple.includes('every 1.65–2.5 days')&&apple.includes('at most 4 waiting'),'apple drops');assert.ok(/Yields<\/dt><dd>1 <a[^>]*>Fruit<\/a> every/.test(apple),'fruit tree leads with fruit');assert.ok(/Also<\/dt><dd>1 <a[^>]*>Log<\/a> per tree when felled/.test(apple),'felling is secondary on a fruit tree');assert.ok(apple.includes('Fruit tree')&&!apple.includes('Orchard tree'),'fruit tree label');
 const palm=h.render('plants/palm-tree/');assert.ok(/Rate<\/dt><dd>about 0.61 <a[^>]*>Fruit<\/a> a day while picked; a full tree holds 5 and fills in about 8 days/.test(palm),'palm rate: '+(palm.match(/Rate<\/dt><dd>[^<]*<[^>]*>[^<]*<\/a>[^<]*/)||[''])[0]);
 const nopal=h.render('plants/nopal-tree/');assert.ok(nopal.includes('Nopalito')&&/Also<\/dt><dd>1 <a[^>]*>Log<\/a> and 5/.test(nopal),'nopal shows fruit, nopals and felling');
 assert.ok(/Yields<\/dt><dd>4 <a[^>]*>Log<\/a> per tree when felled/.test(ash),'forestry leads with logs');assert.ok(dir.includes('>Rate</th>')&&dir.includes('Fruit/day'),'rate column on the overview');assert.ok(!apple.includes('Mushroom'),'gated mushroom spawner hidden');assert.ok(apple.includes('Plants</a>'),'plant breadcrumb');
 assert.ok(h.render('buildings/').includes('dial turns to day'),'clock wording in work schedules');
 console.log('PASS: plants section, felling yields, fruit spawners and clock wording.');}
// Plant biomes and data-driven planters.
{const nopal=h.render('plants/nopal-tree/');assert.ok(/Planted by<\/dt><dd><a[^>]*>Oasis<\/a>/.test(nopal),'nopal planted by the Oasis');assert.ok(/Biomes<\/dt><dd><a[^>]*>Drylands<\/a>/.test(nopal),'nopal biome row');assert.ok(nopal.includes('Grows wild</dt><dd>')&&nopal.includes('0.003 per tile'),'nopal wild spawn');assert.ok(nopal.includes('id="biomes"')&&nopal.includes('<th scope="col">Planted by</th>'),'biome table on the plant page');
 const palm=h.render('plants/palm-tree/');assert.ok(/Planted by<\/dt><dd><a[^>]*>Orchard<\/a><\/dd>/.test(palm),'palm planted by the Orchard (old prefab variant resolved)');
 const cabbage=h.render('plants/cabbage/');assert.ok(/Planted by<\/dt><dd>.*Greenhouse/.test(cabbage)&&cabbage.includes('Winterlands'),'greenhouse plants cabbage in Winterlands');
 const pine=h.render('plants/winter-pine-tree/');assert.ok(!pine.includes('HunterTrapFull'),'internal trap state hidden from yields');assert.ok(pine.includes('0.2 per tile'),'winter pine wild density');
 const dir=h.render('plants/');assert.ok(dir.includes('>Biomes</th>')&&/Nopal Tree[\s\S]*?<a[^>]*>Oasis<\/a>[\s\S]*?Drylands/.test(dir),'biomes column on the overview');
 console.log('PASS: plant biomes, wild spawns and data-driven planters.');}
// How eating works (Needs page).
{const needs=h.render('eating/');assert.ok(needs.includes('id="eating"')&&needs.includes('How eating works'),'eating page');assert.ok(needs.includes('starves only after about 6.25 days'),'days to starve from the stored curve');assert.ok(/<td>Satisfied<\/td><td>90–110<\/td><td>0.45<\/td>/.test(needs),'eat priority at Satisfied');assert.ok(/<td>Full<\/td><td>110 and above<\/td><td>0 \(never\)<\/td>/.test(needs),'full villagers never eat');
 assert.ok(/>Bread<\/a><\/td><td>2<\/td><td>120<\/td><td>30<\/td><td>0.33<\/td>/.test(needs),'bread row: units, restore, worth-it-below, per day');assert.ok(!/Stroganoff|Mushroom/.test(needs),'eating table keeps spoilers out');
 console.log('PASS: how eating works from the stored meter and eat priority.');}
// Salvage values on level starting conditions and biome map resources.
{const stones=h.render('levels/morrigwyn-stones/');assert.ok(/Salvage<\/dt><dd>/.test(stones)||stones.includes('<dt>Salvage</dt>')||stones.includes('>Salvage<'),'salvage row');assert.ok(/Pallet ×2 <span class="objective-note">\(1 <a[^>]*>Plank<\/a> each\)/.test(stones),'pallet salvage: '+(stones.match(/Pallet[^<]{0,40}<span[^<]*<a[^>]*>[^<]*<\/a>[^<]*/)||[''])[0]);assert.ok(/Dismantling them all gives 14 <a[^>]*>Plank<\/a>/.test(stones),'salvage total');
 if(h.lookup['biomes/spookylands/']){const spooky=h.render('biomes/spookylands/');assert.ok(/Ruins<[\s\S]{0,200}10 <a[^>]*>Stone<\/a> when dismantled/.test(spooky),'ruins salvage on the biome page')}
 console.log('PASS: salvage values from recyclable overrides.');}
// Tree self-seeding and workspot effects (issues 32, 35).
{const palm=h.render('plants/palm-tree/');assert.ok(/Spreads<\/dt><dd>2% chance a day to seed a new tree within 3 grid units, never closer than 1 grid unit/.test(palm),'palm spreads row');assert.ok(/Spreads<\/dt><dd>4% chance/.test(h.render('plants/mesquite-tree/')),'mesquite spreads at 4%');assert.ok(/Spreads<\/dt><dd>3% chance/.test(h.render('plants/ash-tree/')),'ash spreads at 3%');assert.ok(!/Spreads<\/dt>/.test(h.render('plants/carrot/')),'crops do not spread');
 assert.ok(h.render('plants/').includes('Trees also seed themselves (2–4% a day'),'overview note');assert.ok(h.render('buildings/lumberjacks-base/').includes('Wild trees regrow on their own'),'regrowth note on the lumberjack');
 const dock=h.render('buildings/fishing-dock/');assert.ok(dock.includes('0–1 at 2 spots, 0–2 at 1 spot')&&dock.includes('about 0.67 per cycle per spot'),'fishing dock random output: '+(dock.match(/Each cycle lands[^<]*/)||[''])[0]);
 assert.ok(/Finishing the “1 Stick -&gt; 1 Heat” task also gives the worker 2 Heat units/.test(h.render('buildings/bonfire/')),'bonfire tender warmth');
 console.log('PASS: tree self-seeding and workspot effects.');}
// Houses page (issue 37) and villagers fed (issue 36).
{assert.ok(h.lookup['houses/'],'houses route');const hp=h.render('houses/');assert.ok(/Tropical Shelter<\/a><\/td><td>8<\/td><td>1<\/td><td>1<\/td><td>3 × 3<\/td>/.test(hp),'tropical shelter row');assert.ok(hp.includes('0.5 Log + 1 Reed Bunch'),'cost per villager');assert.ok(hp.includes('multiplied by 0.025')&&hp.includes('exactly one crib')&&hp.includes('<th scope="col">Crib</th><th scope="col">Doghouse</th>'),'no-housing multiplier and crib wording');assert.ok(/A keeper feeds <a[^>]*>Stick<\/a> into the fire; each one burns for 0.7 days, and the fire holds 2, so it stays lit about 1.4 days/.test(h.render('buildings/bonfire/')),'bonfire summary');assert.ok(h.render('gathering-places/').includes('A unit here is the same unit as on a food or drink item'),'gathering unit explanation');assert.ok(/Winter Cabin[\s\S]{0,400}<td>Yes<\/td>/.test(hp),'heated cabin');
 assert.ok(h.render('needs/').includes('href="/houses/"')||h.render('needs/').includes("houses/"),'needs page links to houses');
 const carrot=h.render('plants/carrot/');assert.ok(/Feeds<\/dt><dd>about 0.5 villagers from one full field/.test(carrot)&&carrot.includes('3 Veggie per 9 days = 0.33 food units a day'),'carrot feeds');assert.ok(/Feeds<\/dt><dd>about 0.91 villagers from one tree/.test(h.render('plants/palm-tree/')),'palm feeds');assert.ok(!/Feeds<\/dt>/.test(h.render('plants/wheat/')),'wheat is not food until processed');
 const food=h.render('food/');assert.ok(food.includes('id="food-sources"')&&/Palm Tree<\/a><\/td><td>Fruit tree<\/td><td>0.61 Fruit a day<\/td><td>0.61<\/td><td>0.91<\/td>/.test(food),'food sources table');assert.ok(h.render('plants/').includes('>Feeds</th>'),'feeds column');
 console.log('PASS: houses page and villagers fed per source.');}
// Gathering places (issue 34).
{assert.ok(h.lookup['gathering-places/'],'gathering route');const g=h.render('gathering-places/');assert.ok(/Fitness Park<\/a><\/td><td>12<\/td><td>10 visitor spots: Wellness 6 each<br>2 staff spots: Wellness 6 <span class="objective-note">\(used by its own workers while on shift\)/.test(g),'fitness park row');assert.ok(/Open Kitchen<\/a><\/td><td>8<\/td><td>Community 4<\/td><td>Fun<\/td>/.test(g),'open kitchen: one version counted, not pickable for Community');assert.ok(/Swimming Pier<\/a><\/td><td>3<\/td><td>Fun 6, Cooling 6<\/td>/.test(g),'pier row');assert.ok(g.includes('stored delay is 0.5–0.7 of a day'),'reuse delay');
 assert.ok(/Visiting gives<\/dt><dd>8 spots: each visit gives Community 4/.test(h.render('buildings/open-kitchen/')),'infobox row from decoded spots');const needs=needsAll();assert.ok(h.render('needs/community/').includes('<h1>Community</h1>')&&/Communal Plaza<\/a><\/td><td>1.2<\/td><td>30<\/td><td>2<\/td>/.test(needs),'needs page places table');assert.ok(h.render('needs/').includes('<h2>The eight needs</h2>')||needs.includes('<h2>The eight needs at a glance</h2>')&&/Food<\/a><\/td><td>Hunger[^<]*<\/td><td>40<\/td><td>60<\/td><td>yes, at -100<\/td>/.test(needs),'needs overview table');assert.ok(/Stew<\/a><\/td><td>1<\/td><td>60<\/td><td>Community 4 at the <a[^>]*>Open Kitchen/.test(needs),'stew also gives community at the open kitchen');assert.ok(!/Stroganoff|Mushroom/.test(g),'gathering page keeps spoilers out');
 console.log('PASS: gathering places from decoded social spots.');}
// Level starting conditions (issue 33).
{const stones=h.render('levels/morrigwyn-stones/');const sec=stones.slice(stones.indexOf('<h2>Starting conditions</h2>'));const row=k=>(sec.match(new RegExp('<dt>'+k+'</dt><dd>([\\s\\S]*?)</dd>'))||['',''])[1].replace(/<[^>]+>/g,'');
 assert.ok(row('Workplaces').includes('Farm')&&row('Workplaces').includes('Cookie Shop'),'workplaces resolved by localization key: '+row('Workplaces'));assert.ok(row('Homes').includes('Basic House'),'homes split out');assert.ok(/Road ×52/.test(row('Roads &amp; decoration')),'roads counted');
 assert.ok(/Dead Tree ×375/.test(row('Wild trees'))&&/Apple Tree ×6/.test(row('Wild trees')),'wild trees resolved to plant pages: '+row('Wild trees'));assert.ok(/Pumpkin ×72/.test(row('Growing already')),'planted crops');assert.ok(/Rock sources ×21/.test(row('Map resources')),'rock sources');assert.ok(/11 loose piles/.test(row('Stockpile')),'standalone piles explained');assert.ok(/Scythe · Rock/.test(row('Tools'))&&!/Scythe/.test(row('Stockpile')),'tool resources listed under tools');
 const sold=h.render('levels/sold-out/');assert.ok(/led by <a[^>]*>Izzy<\/a>/.test(sold),'starting leader linked');assert.ok(sold.includes('Spawn 30 Adults'),'scripted arrival');assert.ok(sold.includes('leaving out')&&sold.includes('scenery object'),'scenery count');
 assert.ok(h.render('levels/').includes('>You start with</th>')&&/5 adults, 2 kids · 1 building/.test(h.render('levels/')),'levels directory start column');
 assert.ok(/Visitors<\/dt><dd>30 adults on day 50 <span class="objective-note">\(announced from the start\)/.test(sold),'visitors row with day and notice');const anth=h.render('levels/anthology/');assert.ok(anth.includes('3 adults on day 12 <span class="objective-note">(announced 8 days ahead)'),'waves of visitors');assert.ok(/the leaders <a[^>]*>Maira<\/a>/.test(h.render('levels/outgrown/')),'leader arrivals linked');assert.ok(h.render('levels/an-apple-a-day/').includes('No babies are born on this map; Rain on day 22 for 2 days'),'events row');assert.ok(!sold.includes('Scripted'),'old scripted row gone');
 const dock=h.render('buildings/fishing-dock/');assert.ok(dock.includes('straight from the map; no materials go in')&&dock.includes('3 work spots. Each cycle lands a random catch')&&dock.includes('Its output store holds <strong>72 Meat</strong>'),'fishing dock production text');assert.ok(dock.includes('at the water’s edge (no land terrain listed)'),'placement wording');assert.ok(/10 visitor spots: Wellness 6 each<br>2 staff spots: Wellness 6/.test(h.render('gathering-places/')),'fitness park wording');
 console.log('PASS: level starting conditions resolved and grouped.');}
// Guides elsewhere (issue 38).
{assert.ok(h.lookup['guides/'],'guides route');const g=h.render('guides/');assert.ok(g.includes('Guides elsewhere')&&g.includes('<h2>Communities</h2>')&&/rel="nofollow noopener"[^>]*>r\/Outlanders_ios</.test(g),'guides page lists the seeded community link with nofollow');assert.ok(g.includes('not yet reviewed'),'unreviewed status shown');assert.ok(g.includes('external-link.yml'),'suggest-a-link form');
 console.log('PASS: guides elsewhere page.');}
// Why villagers pick a dish served at an eating place.
{const stew=h.render('food/stew/');assert.ok(stew.includes('<h2>Why villagers pick it</h2>')&&/prefer eating Stew at the <a[^>]*>Open Kitchen<\/a> over food with the same 1-unit value such as Fruit or Veggie/.test(stew)&&stew.includes('<strong>Community 4</strong>')&&stew.includes('/gathering-places/')&&stew.includes('/eating/'),'stew preference note: '+(stew.match(/prefer eating[^<]*/)||[''])[0]);
 assert.ok(h.render('food/fondue/').includes('<h2>Why villagers pick it</h2>'),'fondue preference note (matched by name across versions)');assert.ok(!h.render('food/veggie/').includes('Why villagers pick it'),'plain foods get no note');assert.ok(/Why villagers come here:<\/strong> eating <a[^>]*>Stew<\/a> here gives Community 4/.test(h.render('buildings/open-kitchen/')),'open kitchen note');assert.ok(!h.render('buildings/bakery/').includes('Why villagers come here'),'bakery is not an eating place');
 console.log('PASS: eating-place preference notes.');}
// Readable recipes for step graphs with alternatives, fuel, containers and self-made starts (issue 47).
{const strip=x=>x.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();const rec=p=>{const html=h.render('buildings/'+p+'/');const m=html.match(/<ul class="recipe-steps readable-recipes">[\s\S]*?<\/ul>/);return m?strip(m[0]):strip(html.slice(html.indexOf('<h2>Production</h2>'),html.indexOf('<h2>Production</h2>')+400))};
 assert.equal(rec('open-kitchen'),'3 Stew ← 2 × ( Veggie , Meat or Egg ) + 1/5 Stick (3 Plate reused)','open kitchen readable recipe');assert.equal(rec('winery'),'4 Wine ← 2 Fruit + 1 Bottle (4 WineGlassEmpty reused)','winery');assert.ok(rec('cheesery').startsWith('6 Cheese ← 1 Milk gathered from cows + 1/2 Stick'),'cheesery: '+rec('cheesery'));assert.ok(rec('trappers-hut').startsWith('2 Meat + 1 Animal Hide ← 1 HunterTrap (full) brought back by the workers'),'trappers');assert.ok(rec('clay-pit').startsWith('1 Clay ← nothing but time'),'clay pit');assert.ok(rec('porridge-cookhouse').includes('ingredients it grows or makes on the spot'),'porridge barley grown on the spot');
 assert.ok(rec('orchard').includes('Plants fruit trees and tends them'),'orchard non-producer');assert.ok(rec('warehouse').includes('for storage; nothing is produced'),'warehouse storage text');assert.ok(rec('zbeer-stand').includes('Serves Beer to visitors'),'beer stand');assert.ok(!h.render('buildings/open-kitchen/').includes('no single ratio applies'),'fallback text gone from the open kitchen');
 console.log('PASS: readable recipes from step graphs.');}
// Stored graph recipes feed resource pages and level rollups (issue 47).
{const strip=x=>x.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();const row=p=>strip((h.render(p).match(/Made from<\/dt><dd>[\s\S]*?<\/dd>/)||[''])[0]);
 assert.equal(row('food/stew/'),'Made from 2 × ( Veggie , Meat or Egg ) + 1/5 Stick → 3 Stew (Plate reused) at the Open Kitchen','stew stored recipe');assert.ok(row('food/cheese/').startsWith('Made from 1 Milk (from the map) + 1/2 Stick → 6 Cheese'),'cheese stored recipe');assert.ok(row('resources/beer/').includes('→ 5 Beer'),'beer stored recipe');assert.ok(row('resources/meat/').includes('brought back by the workers'),'trapped meat recipe');
 const frost=h.render('levels/frostbound-valley/');assert.ok(/100 <a[^>]*>Stew<\/a> at the <a[^>]*>Open Kitchen<\/a> needs 67 <a[^>]*>Veggie<\/a> <span class="objective-note">\(or Meat or Egg\)<\/span> \+ 7 <a[^>]*>Stick<\/a>/.test(frost),'stew rollup resolves the choice: '+(frost.match(/100 <a[^>]*>Stew<\/a> at[^<]*(<[^>]*>[^<]*){0,12}/)||[''])[0].replace(/<[^>]+>/g,''));
 const queso=h.render('levels/full-tilt-queso/');assert.ok(/Milk<\/a><\/td><td>17<\/td>/.test(queso)&&/Stick<\/a><\/td><td>9<\/td>/.test(queso),'cheese rollup needs milk and sticks');
 const stewRecord=JSON.parse(fs2.readFileSync(new URL('../content/resources/279343.json',import.meta.url),'utf8'));assert.ok(stewRecord.made_from[0].graph&&stewRecord.made_from[0].per_unit[0].choice.length===3&&stewRecord.made_from[0].batch.outputs[0].count===3,'stew record stores the choice and natural batch');
 console.log('PASS: stored graph recipes on resource pages and rollups.');}
{const sp=h.render('spoilers/');assert.ok(sp.includes('How we tell that something is unreleased')&&sp.includes('MinGameVersion'),'spoiler method note');console.log('PASS: unreleased-status method documented.');}
{const g=h.render('guides/');const [main,rest]=g.split('id="first-game"');assert.ok(rest&&rest.includes('steamcommunity.com')&&rest.includes('not on Steam'),'first-game links in their own section');assert.ok(!main.includes('steamcommunity.com'),'Steam board not listed among Outlanders 2 links');assert.ok(main.includes('outlanders-2.fandom.com')&&main.includes('both games'),'Outlanders 2 links and both-games tag');console.log('PASS: guides page separates Outlanders 2 from the first game.');}
{const hub=h.render('mechanics/');for(const t of ['href="/happiness/"','href="/villagers/"','href="/heat-cooling-water/"','href="/time/"','href="/gear/"','href="/houses/"','href="/gathering-places/"','Not written yet','Trading'])assert.ok(hub.includes(t),'mechanics hub: '+t);
 const cl=h.render('heat-cooling-water/');for(const t of ['Heat on 39 of 130 levels','Winter Cabin','one fuel per 0.7 days','Wheatshine','stored base Heat increase 129','Heat wave','Cooling falls 4× as fast'])assert.ok(cl.includes(t),'climate page: '+t);
 const tm=h.render('time/');for(const t of ['five minutes at normal speed','about 3 minutes','30 seconds later','Middle Ground'])assert.ok(tm.includes(t),'time page: '+t);assert.ok(!/Unnamed scenario/.test(tm)&&!/Unnamed scenario/.test(h.render('happiness/')),'archive levels stay off mechanics pages');
 const gr=h.render('gear/');for(const t of ['Tailor','Adults only','×1.4, ×1.2 on roads','The Hermit'])assert.ok(gr.includes(t),'gear page: '+t);
 for(const p of ['needs/','houses/','gathering-places/','gear/'])assert.ok(h.render(p).includes('aria-label="Mechanics pages"'),'mechanics strip on '+p);
 for(const p of ['mechanics/','happiness/','villagers/','heat-cooling-water/','time/','gear/'])assert.ok(!/Oona|Concoction|Stroganoff|Mushroom|Wetlands/.test(h.render(p)),p+' leaked spoilers');
 console.log('PASS: mechanics section hub and pages.');}
{const fs3=await import('node:fs');const tpl=fs3.readFileSync(new URL('../src/template.html',import.meta.url),'utf8'),pj=fs3.readFileSync(new URL('../src/page.js',import.meta.url),'utf8'),css=fs3.readFileSync(new URL('../src/style.css',import.meta.url),'utf8');
 assert.ok(tpl.includes('src="./page.js"'),'static pages load page.js (sorting and theme toggle)');assert.ok(/function sortTable/.test(pj)&&pj.includes('theme-toggle'),'page.js carries sorting and the toggle');
 assert.ok(tpl.includes('Bricolage+Grotesque')&&tpl.includes('id="theme-toggle"'),'game font and theme toggle in the template');
 assert.ok(css.includes('--ink:#473547')&&css.includes('--paper:#f2eeed')&&css.includes('--cat-food:#db4954'),'game palette tokens');assert.ok(/prefers-color-scheme:dark/.test(css)&&css.includes(':root[data-theme="dark"]'),'dark mode tokens');
 const leftover=css.replace(/:root[^{]*\{[^}]*\}/g,'').replace(/@media \(prefers-color-scheme:dark\)\{[^{]*\{[^}]*\}\}/g,'').match(/#[0-9a-fA-F]{6}\b/g)||[];assert.ok(leftover.every(h=>['#473547','#e4dbd4'].includes(h.toLowerCase())),'no stray hard-coded colours: '+[...new Set(leftover)].join(' '));
 const bk=h.render('buildings/bakery/');assert.ok(bk.includes('class="field-guide-card"')&&/<h3 class="fg-label">Needs<\/h3>/.test(bk)&&/<h3 class="fg-label">Provides<\/h3>/.test(bk)&&bk.includes('Checked against the in-game field guide'),'bakery field-guide card');assert.ok(/gi-tile" style="--tile:#db4954"/.test(bk),'bakery icon on its own Food-red tile');assert.ok(bk.includes('fg-need')&&bk.includes('Food</span>'),'provides shows the need it meets');
 const ok=h.render('buildings/open-kitchen/');assert.ok(ok.includes('fg-group')&&ok.includes('fg-bracket')&&!/<h3 class="fg-label">Needs<\/h3>[\s\S]*?title="Plate/.test(ok.split('fg-label">Provides')[0])&&ok.includes('Checked against the in-game field guide'),'open kitchen card: grouped any-of choice, no reused plates (the game omits them), checked');assert.ok(/--tile:#8e86f4/.test(ok),'open kitchen and stew use their Community-coloured icons');assert.ok(/title="Stick"[\s\S]*?<span class="fg-count">1<\/span>/.test(ok),'fuel shown as a whole stick, as the field guide counts it');assert.ok(/title="Community"><span>Community<\/span><\/span><span class="fg-count">2<\/span>/.test(ok)&&ok.includes('Stew itself restores Food 1'),'provides shows the field guide display values and says what Stew itself restores');assert.ok(/gi-inline/.test(ok),'inline icons in the description');
 assert.ok(/cat-chip" style="--tile:var\(--cat-construction\)">Construction/.test(h.render('resources/')),'resource directory shows game categories');
 console.log('PASS: field guide style (palette, font, dark mode, categories, card, static scripts).');}
{const vm=await import('node:vm');const h2=await harness();vm.runInContext("A.tiles={gameobjects:{'57395':{tile:'tile-57395.png',glyph:'glyph-57395.png'}},resources:{'319667':{tile:'tile-bread.png',glyph:'glyph-bread.png'}},concerns:{Nutrition:{tile:'concern-Nutrition.png',glyph:'concern-glyph-Nutrition.png'}}}",h2.ctx);
 const bk=h2.render('buildings/bakery/');assert.ok(bk.includes('wiki-artwork/tile-57395.png')&&bk.includes('wiki-artwork/tile-bread.png'),'game-composited tiles replace the plain tiles when present');assert.ok(bk.includes('wiki-artwork/concern-Nutrition.png'),'need circle uses the game need icon');assert.ok(bk.includes('wiki-artwork/glyph-bread.png'),'inline icons use the unframed glyph');assert.ok(!/tile-bread\.png" [^>]*style=/.test(bk),'no CSS tile behind a composited tile');
 const ok=h2.render('buildings/open-kitchen/');assert.ok(/<strong class="need-term"[^>]*>(?:<img[^>]*>)?Food<\/strong>/.test(ok),'need terms in the description are bold, as in the game');
 console.log('PASS: game-composited tiles and need icons are used when committed.');}
{const hub=h.render('needs/');for(const sl of ['food','hydration','heat','energy','fun','cooling','wellness','community'])assert.ok(hub.includes('href="/needs/'+sl+'/"')&&!h.render('needs/'+sl+'/').includes('Entry not found'),'need page '+sl);
 assert.ok(hub.replace(/<[^>]+>/g,' ').split(/\s+/).length<800,'Needs hub stays short');assert.ok(!hub.includes('id="need-food"')&&!hub.includes('id="eating"'),'per-need sections moved off the hub');
 const fs5=await import('node:fs');assert.ok(fs5.readFileSync(new URL('../src/page.js',import.meta.url),'utf8').includes("'#need-food':'food/'"),'old Needs anchors forward to the new pages');
 assert.ok(/href="\/needs\/community\/"/.test(h.render('food/stew/')),'resource infobox links to need pages');
 console.log('PASS: Needs split into a hub, eight need pages and How eating works.');}
{const home=h.render('');for(const t of ['>Mechanics</a><small>','>Reference</a><small>','href="/eating/"','href="/challenges/"','href="/guides/"'])assert.ok(home.includes(t),'home boxes: '+t);assert.ok(!home.includes('class="reference-links"'),'old reference links row replaced by a box');
 const bk=h.render('buildings/bakery/');assert.ok(bk.includes('wiki-artwork/filled/icon-'),'stand-in filled glyphs used when no game tiles are present');
 console.log('PASS: home Mechanics and Reference boxes; filled glyph stand-ins.');}
{const strip=s=>s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');const to=strip(h.render('buildings/trading-outpost/'));
 assert.ok(to.includes('12 Wheat → 6 Glass Pane or 6 Animal Hide'),'Trading Outpost outputs are a choice, not both');assert.ok(!to.includes('6 Glass Pane + 6 Animal Hide'),'no doubled trade');
 for(const t of ['Receives (choose one)','8 Glass Pane 6 Animal Hide or 9 Wheat','8 Animal Hide 9 Wheat or 6 Glass Pane','There is no Drylands outpost','How a trade runs','the fire costs nothing'])assert.ok(to.includes(t),'trade section: '+t);
 assert.equal(String(h.lookup['buildings/trading-outpost/'].id),'75226','Evergreen outpost takes the plain URL');assert.equal(String(h.lookup['buildings/trading-outpost-75226/'].id),'75226','old Evergreen URL still resolves');
 for(const id of [65543,83845])assert.ok(!h.pages.some(p=>(p.type==='buildings'||p.type==='chains')&&String(p.id)===String(id)),'hidden outpost '+id);
 assert.ok(strip(h.render('buildings/trading-outpost-75225/')).includes('8 Glass Pane → 6 Animal Hide or 9 Wheat'),'Tropics trade in infobox');
 const hide=strip(h.render('resources/animal-hide/'));assert.ok(hide.includes('Trading Outpost (Tropiclands)')&&hide.includes('Trading Outpost (Evergreen)')&&!/1 Wheat each/.test(hide),'resource page lists outposts by biome');
 console.log('PASS: Trading Outpost trades are a choice, per biome, with base and test variants hidden.');}
{const plants=h.render('plants/');assert.ok(!/>Base</.test(plants),'junk Base plant row hidden');assert.ok(!h.pages.some(p=>p.type==='buildings'&&String(p.id)==='92320'),'Base plant page hidden');
 for(const n of ['Cypress Tree','Willow Tree']){assert.ok(!plants.includes('>'+n+'<'),n+' kept off the plants list');assert.ok(h.render('spoilers/').includes(n),n+' listed on the spoilers page')}
 assert.equal(String(h.lookup['buildings/zbeer-stand/'].id),'35464','old Beer Stand URL resolves');assert.ok(h.render('buildings/beer-stand/').includes('<h1>Beer Stand</h1>'),'Beer Stand display name');
 console.log('PASS: junk Base plant hidden; update-32 Cypress and Willow trees moved to spoilers; Beer Stand named.');}
{const strip=s=>s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');const sb=strip(h.render('sandbox/'));
 for(const t of ['Scarce 4 0 0 4 60 12','Average 7 2 0 9 135 27','Abundant 12 6 2 20 300 60','180 × 136','228 × 140','256 × 208','15 construction tiles','Drylands','Mesquite Tree','Hydration','Winter Pine Tree'])assert.ok(sb.includes(t),'sandbox page: '+t);
 assert.ok(h.render('mechanics/').includes('href="/sandbox/"'),'Sandbox listed on the mechanics hub');
 console.log('PASS: Sandbox page from the decoded sandbox options and biome lists.');}
{const strip=s=>s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
 for(const [p,f] of [['plants/carrot/','Footprint 1 × 1'],['plants/apple-tree/','Footprint 2 × 2'],['buildings/basic-house/','Footprint 2 × 2'],['buildings/trading-outpost/','Footprint 3 × 3']])assert.ok(strip(h.render(p)).includes(f),p+' '+f);
 assert.ok(strip(h.render('plants/potato/')).includes('3 Veggie per full field (one plant)')&&strip(h.render('plants/carrot/')).includes('(3 plants, 1 each)'),'plant count wording');
 const food=strip(h.render('food/'));assert.ok(food.includes('Carrot Field crop 3 Veggie per 9 days 0.33 0.5 1 × 1 0.33')&&food.includes('Grape Vine Fruit tree 0.61 Fruit a day 0.61 0.91 2 × 2 0.15'),'food per square');assert.ok(food.includes('Cookie Food: 1; Fun: 4')&&!/Entertainment|22 versions|Unknown/.test(food.split('How much each source feeds')[0]),'food list labels');
 console.log('PASS: footprints in game squares; one Potato plant versus three Carrot plants; food per square.');}
{const fs6=await import('node:fs');const src=fs6.readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
 const raw=(src.match(/dimensions\.x\}? × \$\{(?:fmt\()?[a-z]+\.dimensions\.z/g)||[]).length;assert.ok(raw<=1,'footprints go through footprint(): only the raw research aside may print stored dimensions ('+raw+' found)');
 assert.ok(!/within \$\{plural\(sp\.max_reproduction_distance,'tile'\)/.test(src),'stored distances are labelled grid units, not tiles');
 console.log('PASS: sizes in game squares; stored distances labelled as grid units.');}
{const home=h.render('');
 for(const b of ['drylands','evergreen','tropiclands','winterlands'])assert.ok(home.includes(`href="/biomes/${b}/"><img class="gi home-biome-img"`),'home biome island '+b);
 assert.ok(!home.includes('mapshape-valley'),'only island previews in the home strip');
 assert.ok((home.match(/home-head-icon/g)||[]).length>=9,'section header icons');assert.ok((home.match(/gi gi-inline/g)||[]).length>60,'icons beside home links');assert.ok(home.includes('home-portrait'),'leader portraits');
 assert.ok(!/<h2><a href="\/biomes\/">/.test(home),'the biome strip replaces the Biomes box');
 console.log('PASS: home page art: biome islands, section icons, link icons and leader portraits.');}
