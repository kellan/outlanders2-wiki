// PR 88: game version 31 (255). Greek Tournament season added; Holiday and Arctic named only (spoilers); Oona gated at 32 (released per the maintainer, PR 119).
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const t=strip(h.render('tournament/'));
assert.ok(t.includes('Greek Quarry')&&t.includes('Greek Book Workshop')&&t.includes('Greek Villagers Style'),'Greek season rewards on the Tournament page');
assert.ok(!t.includes('Holiday')&&!t.includes('Arctic'),'Holiday and Arctic withheld from the regular page');
const sp=strip(h.render('spoilers/'));
assert.ok(sp.includes('Holiday')&&sp.includes('Arctic'),'Holiday and Arctic listed under Spoilers');
assert.ok(!sp.includes('the current game is version 31'),'no spoiler reason still calls version 31 current (all version 32 holds lifted by PR 120)');
assert.ok(strip(h.render('tournament/seasons/')).includes('Holiday'),'all-seasons spoiler view includes the new names');
const bak=h.render('buildings/bakery/');assert.ok(bak.includes('Game data v32 · build 257')&&!bak.includes('v30 · build 254'),'version label (switched to 32 in PR 121)');
console.log('PASS: version 31 Greek season, withheld Holiday and Arctic, Oona still gated, version label 31.');
