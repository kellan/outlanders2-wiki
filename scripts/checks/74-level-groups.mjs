// PR 74: levels split into campaign and challenge levels, challenges by type; the rotation on the Challenges page.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness();const strip=s=>s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
// Since PR 79 the per-type listings live on challenges/<type>/ and levels/ is one table.
const lv=strip(h.render('levels/')),page=t=>strip(h.render('challenges/'+t+'/'));
for(const t of ['original','redux','bounty'])assert.ok(page(t).includes('levels in the rotation, numbered as in the game’s archive'),'live type page: '+t);
for(const t of ['chill','ranked','remix'])assert.ok(page(t).includes('The 20 '+t[0].toUpperCase()+t.slice(1)+' levels that were released, oldest first'),'legacy type page: '+t);
assert.ok(page('chill').includes('7 more Chill maps packaged but never released'),'never-released Chill maps');
assert.ok(page('redux').includes('&quot;Friends in the Frost&quot; Redux Redux of Friends in the Frost'),'Redux linked to its base level');
assert.ok(lv.includes('Chill challenge · batch 00 · 3 Jul 2024')&&!lv.includes('Standalone or challenge'),'legacy challenges labelled by type, batch and release date');assert.ok(page('chill').includes('came out every two weeks from 3 Jul 2024 to 26 Mar 2025'),'legacy release span');
const ff=strip(h.render('levels/friends-in-the-frost/'));assert.ok(ff.includes('Chill · batch 01, 2 of 27 · released 17 Jul 2024'),'legacy challenge context line');const sm=strip(h.render('levels/sweet-maze/'));assert.ok(sm.includes('released 26 Mar 2025'),'Sweet Maze dated as the archive showed');
const mo=strip(h.render('levels/magnus-opus/'));assert.ok(mo.includes('Ranked · batch'),'Leaderboard levels shown as Ranked');
const ch=strip(h.render('challenges/'));assert.ok(ch.includes('The rotation')&&ch.includes('60 were released, and 21 more were packaged but never released')&&!ch.includes('52-week'),'challenges page explains the rotation');
console.log('PASS: levels grouped by campaign and challenge type; rotation explained.');
