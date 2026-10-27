import assert from 'node:assert/strict';
import {harness} from './render-harness.mjs';
const h=await harness();
const pumpkin=h.render('buildings/pumpkin/');
assert.ok(pumpkin.includes('<h1>Pumpkin</h1>'));
for(const phrase of ['Construction inputs','Pending verification','Needs gameplay verification','Sandbox biome references','Work range'])assert.ok(!pumpkin.includes(phrase),phrase);
assert.equal(h.lookup['buildings/field-pumpkin/'].id,h.lookup['buildings/pumpkin/'].id);
const farm=h.render('buildings/farm/');assert.ok(farm.includes('Fields'));assert.ok(!farm.includes('Sources.Field'));assert.ok(!farm.includes('Work range'));assert.ok(!farm.includes('Pending verification'));
assert.ok(h.render('verification/buildings/farm/').includes('Work schedule fields'));
assert.ok(h.render('verification/buildings/pumpkin/').includes('Tropiclands'));
assert.ok(h.render('verification/buildings/bakery/').includes('Fuel discrepancy'));
for(const name of ['too-hot-to-write','cordial-work-environment','frostbound-valley'])assert.ok(h.render('levels/'+name+'/').includes('Main objectives'));
for(const p of h.pages.filter(p=>p.type==='levels'))assert.ok(!/^Single_|^Level\d/.test(p.name),p.name);
for(const id of [35718,105746,75802]){assert.ok(!h.pages.some(p=>(p.type==='buildings'||p.type==='chains')&&String(p.id)===String(id)),'non-game building '+id);}
console.log('PASS: reader/research separation, plant names, crop-only content, old URLs, localized terms, renamed scenario aliases, and retained recipe discrepancies, non-game buildings hidden.');
{const hp=await harness();const bh=hp.render('buildings/basic-house/');if(!bh.includes('Seen in play')||!bh.includes('3 of its 6 Logs'))throw new Error('Basic House refund observation missing');
 const to=hp.render('buildings/trading-outpost/').replace(/<[^>]+>/g,'');if(!to.includes('12 Wheat → 6 Glass Pane or 6 Animal Hide')||/Makes\s*1\s*Animal Hide/.test(to))throw new Error('Trading Outpost field-guide recipe or stale derived ratio');
 if(!hp.render('time/').includes('day counter goes up at dawn'))throw new Error('dawn observation missing from Days and time');
 if(!hp.render('eating/').includes('0.8 units per villager per day'))throw new Error('meal log missing from Needs');
 const c2=hp.render('campaigns/campaign-2/');if((c2.match(/Level order checked in game/g)||[]).length!==7)throw new Error('Campaign 2 stories not all menu-verified');
 for(const b of ['winery','brewery','cheesery','mead-hall','fondue-bar','fishing-dock'])if(!hp.render('buildings/'+b+'/').includes('Checked against the in-game field guide'))throw new Error(b+' field guide not recorded');
 const fs4=await import('node:fs');for(const f of ['fieldguide/Winery.jpg','refund/refund-3-finished-after-9-logs.jpg','challenges/challenges-menu-rules.jpg'])if(!fs4.existsSync(new URL('../assets/gameplay-evidence/'+f,import.meta.url)))throw new Error('missing evidence '+f);
 console.log('PASS: local agent playtest answers recorded and shown.');}
{const {harness:hz}=await import('./render-harness.mjs');const h2=await hz();const strip=s=>s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
 const bk=strip(h2.render('buildings/bakery/'));if(!bk.includes('5 Clay and 2 Stone'))throw new Error('Bakery refund observation missing');
 for(const b of ['basic-house','plank-house','brick-house','two-story-house','playground','zen-garden','fitness-park'])if(!h2.render('buildings/'+b+'/').includes('Checked against the in-game field guide'))throw new Error(b+' field guide not shown');
 const fs7=await import('node:fs');for(const f of ['fieldguide/Fitness-Park.jpg','refund/refund-8-bakery-preview.jpg'])if(!fs7.existsSync(new URL('../assets/gameplay-evidence/'+f,import.meta.url)))throw new Error('missing evidence '+f);
 const to2=strip(h2.render('buildings/trading-outpost/'));if(!to2.includes('216 to 232 seconds')||!to2.includes('6 Glass Pane and no Animal Hide'))throw new Error('outpost trade timing or choice observation missing');
 const beer=strip(h2.render('verification/resources/beer/'));if(!beer.includes('low (about a fifth full) to completely full')||!fs7.existsSync(new URL('../assets/gameplay-evidence/beer/day30-joshua-after-172609916Z.jpg',import.meta.url)))throw new Error('Beer Fun refill observation missing');
 const fish=strip(h2.render('verification/buildings/fishing-dock/'));if(!fish.includes('four 0s, five 1s and eleven 2s')||!fs7.existsSync(new URL('../assets/gameplay-evidence/fishing/first-position-20-casts.csv',import.meta.url)))throw new Error('Fishing Dock cast observation missing');
 console.log('PASS: 27 October playtest answers recorded and shown.');}
