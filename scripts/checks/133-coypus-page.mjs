// PR 133: the Coypus page (burrows, trapping, reach, output, levels) from decoded-mechanics trapping.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),st=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/\s+/g,' ');
const p=st(h.render('coypus/'));
assert.match(p,/Every 6–10 days the tree grows a new burrow, if its last one has gone/);
assert.match(p,/about half the Cypress Trees already have a burrow, and the rest get one within the first 2 days/);
assert.match(p,/each full trap gives 2 Meat and 1 Animal Hide/);
assert.match(p,/a rounded square 14 squares across, centred on the hut\. That reaches 6 squares out/);
assert.match(p,/10 1\.25 2\.5/,'10 trees: 1.25 Hides and 2.5 Meat a day');
assert.match(p,/Copies 83 Yes 100 for 100 Books/);assert.match(p,/Chaos 112 Yes 32 for 16 Boots \(optional\)/);assert.match(p,/Clause 122 No None/);
assert.match(p,/keep at least 13 Cypress Trees/);
assert.ok(!/not (yet )?(known|tested|measured)|unverified|pending/i.test(p),'no hedging on the page');
assert.ok(h.render('buildings/cypress-tree/').includes('/coypus/"'),'Cypress Tree links to the page');
assert.ok(h.render('mechanics/').includes('/coypus/"'),'listed under Mechanics');
console.log('PASS: Coypus page with burrows, trapping, reach, output and level needs.');
