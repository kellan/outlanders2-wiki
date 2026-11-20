// PR 121: the Roads and walking surface table lists only roads and bridges; building grounds get a one-line note.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const html=h.render('roads-and-walking/'),sec=html.match(/id="surfaces"[\s\S]*?<\/section>/)[0];
const table=strip(sec.match(/<table[\s\S]*?<\/table>/)[0]),note=strip(sec.slice(sec.indexOf('</table>')));
assert.ok(/Stone Road/.test(table)&&/Bridge/.test(table),'roads and bridge stay in the table');
for(const n of ['Warehouse','Fitness Park','Communal Plaza','Zen Garden','Playground'])assert.ok(!table.includes(n)&&note.includes(n),'building grounds moved to the note: '+n);
assert.ok(note.includes('×1.2'),'note gives the floor multiplier');
