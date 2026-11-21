// PR 132: 20 more field-guide cards (version 32), the Workers icon on cards, and Greek as the current tournament season.
import assert from 'node:assert/strict';import fs from 'node:fs';import {harness} from '../render-harness.mjs';
const h=await harness(),st=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ');
const W=JSON.parse(fs.readFileSync(new URL('../../content/reference/world.json',import.meta.url),'utf8'));
for(const n of ["Swamp Trappers' Hut",'Stroganoff Cookhouse','Winter Cabin','Winter Pub','Tailor','Bonfire',"Nopalero's Hut",'Desert Cookhouse','Desert Home','Well','Tropical Shelter','Canteen Factory','Swimming Pier','Ice Pop Stand','Glassworks','Reed Harvester','Road','Stone Road','Brick Road','Bridge']){const o=W.ui_observations.buildings[n];assert.ok(o&&o.screenshot&&fs.existsSync(new URL('../../assets/gameplay-evidence/'+o.screenshot,import.meta.url)),n+' card and screenshot')}
const strog=st(h.render('buildings/stroganoff-cookhouse/'));assert.match(strog,/Checked against the in-game field guide .* Needs 1 1 1 Provides 4 → Food 2/);
const glass=st(h.render('buildings/glassworks/'));assert.match(glass,/Needs 3 Provides 2/);assert.match(glass,/The recipe differs on one point/);assert.match(st(h.render('verification/buildings/glassworks/')),/The card shows 3 Sticks → 1 Glass Pane/);
assert.ok(h.render('buildings/bonfire/').includes('icon-workers.png'),'Workers icon on cards');
assert.match(st(h.render('tournament/')),/Greek Current season · reported 2026-11-21/);
console.log('PASS: 20 field-guide cards, Workers icon, Greek current season.');
