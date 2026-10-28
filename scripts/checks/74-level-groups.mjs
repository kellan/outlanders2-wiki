// PR 74: levels split into campaign and challenge levels, challenges by type; the rotation on the Challenges page.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness();const strip=s=>s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const lv=strip(h.render('levels/'));
for(const t of ['Campaign levels','Challenge levels','Original in the rotation','Redux in the rotation','Bounty in the rotation','Chill 27 levels','Ranked 27 levels','Remix 27 levels','Tutorials and other maps'])assert.ok(lv.includes(t),'levels page section: '+t);
assert.ok(lv.includes('Friends in the Frost Redux (a Redux of Friends in the Frost )'),'observed Redux linked to its base level');
assert.ok(lv.includes('Chill challenge · batch 00')&&!lv.includes('Standalone or challenge'),'legacy challenges labelled by type and batch');
const ff=strip(h.render('levels/friends-in-the-frost/'));assert.ok(ff.includes('Chill · batch 01, 2 of 27'),'legacy challenge context line');
const mo=strip(h.render('levels/magnus-opus/'));assert.ok(mo.includes('Ranked · batch'),'Leaderboard levels shown as Ranked');
const ch=strip(h.render('challenges/'));assert.ok(ch.includes('The rotation')&&ch.includes('81 maps in 27 batches'),'challenges page explains the rotation');
console.log('PASS: levels grouped by campaign and challenge type; rotation explained.');
