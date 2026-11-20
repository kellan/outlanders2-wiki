// PR 124: no special Oona tag on the home page; her page drops the stale "absent from the campaign menu" note; release evidence is the official patch notes.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const home=h.render('');assert.ok(!/maintainer report/.test(home)&&!/Oona<\/a> <span class="tag/.test(home),'no Oona tag on the home page');
const oona=strip(h.render('heroes/oona/')+h.render('verification/heroes/oona/'));assert.ok(!oona.includes('absent from that menu')&&!oona.includes('Observed campaign menu'),'stale menu note gone');assert.match(oona,/Released · official notes/);assert.match(oona,/developers’ patch notes, posted on the official Discord/);
assert.match(strip(h.render('biomes/wetlands/')),/Released · official notes/);
console.log('PASS: no Oona tag on the home page; stale menu note gone; release from the official patch notes.');
