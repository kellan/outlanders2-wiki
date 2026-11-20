// PR 129: Oona's three levels use their version 32 files (changed at release); Mushroom is an Ingredient; the Update 32 label drops "reported by the maintainer".
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),st=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ');
const clause=st(h.render('levels/clause/'));
assert.match(clause,/Have 60 tiles of Brick Road/);assert.match(clause,/Have 10 Calla Lilly Planters/);assert.match(clause,/Roadworks Office \(build site, not yet built\)/);assert.ok(!/Brick Road ×27/.test(clause),'no starting road');assert.match(clause,/led by Oona/);
const copies=st(h.render('levels/copies/'));assert.match(copies,/Villagers 6 adults · led by Oona/);assert.match(copies,/Reach a Population of 16/);
const chaos=st(h.render('levels/chaos/'));assert.match(chaos,/Produce 16 pairs of Boots/);assert.match(chaos,/Reach a Population of 20/);assert.ok(!/Book Workshop ×|Workplaces Book Workshop/.test(chaos),'no starting Book Workshop');assert.match(chaos,/Villagers 6 adults, 4 kids · led by Oona/);
for(const p of ['levels/clause/','levels/copies/','levels/chaos/'])assert.match(st(h.render(p)),/Changed at release/,p+' history row');
assert.match(st(h.render('resources/')),/Mushroom — Ingredient/);
assert.ok(!/reported live by the maintainer/.test(st(h.render('resources/mushroom/'))),'plain Update 32 label');
console.log('PASS: Oona levels from version 32, Mushroom an Ingredient, plain Update 32 label.');
