// PR 126: every sourced biome page leads with "What's different here", built from its data; biome art is island previews only.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const lead=p=>{const html=h.render('biomes/'+p+'/'),h2=[...html.matchAll(/<h2>([^<]*)/g)].map(x=>x[1]);assert.equal(h2[0],'What’s different here',p+' leads with the lead: '+h2.join(' | '));return strip(html.match(/id="special"[\s\S]*?<\/section>/)[0])};
const w=lead('wetlands');
for(const s of ['No extra need','shallow marsh','Willow Tree (drops Mushrooms','Cypress Tree (coypu burrows)','Concoction Shop','Stroganoff Cookhouse','Swamp Trappers','Missing here','Quarry'])assert.ok(w.includes(s),'Wetlands lead mentions '+s+': '+w);
assert.ok(/Thirst is a need here/.test(lead('drylands'))&&/Cooling is a need here/.test(lead('tropiclands'))&&/Heat is a need here/.test(lead('winterlands')),'need biomes name their need');
assert.ok(/Winter Pine Tree \(rabbit burrows\)/.test(lead('winterlands'))&&/Dead Tree/.test(lead('spookylands'))&&!/Pumpkin/.test(lead('spookylands')),'grows-only-here compares plants across naming styles');
assert.ok(!lead('evergreen').includes('Missing here'),'Evergreen lacks nothing every other biome has');
for(const p of ['evergreen','wetlands','spookylands'])assert.ok(!h.render('biomes/'+p+'/').includes('See individual scenarios for their enabled needs'),'no filler needs section on '+p);
for(const p of ['biomes/','biomes/wetlands/','biomes/spookylands/'])assert.ok(!h.render(p).includes('mapshape-valley'),'no level map preview on '+p);
assert.ok(h.render('biomes/evergreen/').includes('minibiome-'),'island preview kept');
