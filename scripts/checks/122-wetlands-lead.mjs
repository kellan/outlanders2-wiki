// PR 122: the Wetlands page leads with what is different there: mushrooms, trapping, stone from Ruins, marshes, cypress and willow, no Heat/Cooling/Thirst.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const html=h.render('biomes/wetlands/'),h2=[...html.matchAll(/<h2>([^<]*)/g)].map(x=>x[1]);
assert.equal(h2[0],'What’s different in the Wetlands','lead section comes first: '+h2.join(' | '));
const t=strip(html.match(/id="special"[\s\S]*?<\/section>/)[0]);
for(const s of ['Mushrooms','Stroganoff Cookhouse','Concoction Shop','Swamp Trappers','Recycling a Ruins gives 10 Stone','Copies starts with 4','Chaos starts with 7','Shallow marshes','Willow','No Heat, Cooling or Thirst'])assert.ok(t.includes(s),'lead mentions '+s+': '+t);
assert.ok(/Stone is scarce[^]*reported in play/.test(t)&&strip(html).includes('Seen in play'),'player-report items point at Seen in play');
for(const p of ['biomes/evergreen/','biomes/winterlands/'])assert.ok(!h.render(p).includes('id="special"'),'no Wetlands lead on '+p);
