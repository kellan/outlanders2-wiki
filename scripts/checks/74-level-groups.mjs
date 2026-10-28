// PR 74: levels split into campaign and challenge levels, challenges by type; the rotation on the Challenges page.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness();const strip=s=>s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const lv=strip(h.render('levels/'));
for(const t of ['Campaign levels','Challenge levels','Original in the rotation','Redux in the rotation','Bounty in the rotation','Chill 20 levels','Ranked 20 levels','Remix 20 levels','7 more Chill maps packaged but never scheduled','Tutorials and other maps'])assert.ok(lv.includes(t),'levels page section: '+t);
assert.ok(lv.includes('Friends in the Frost Redux (a Redux of Friends in the Frost )'),'observed Redux linked to its base level');
assert.ok(lv.includes('Chill challenge · batch 00 · 3 Jul 2024')&&!lv.includes('Standalone or challenge'),'legacy challenges labelled by type, batch and release date');assert.ok(lv.includes('Released every two weeks from 3 Jul 2024 to 26 Mar 2025'),'legacy release span');
const ff=strip(h.render('levels/friends-in-the-frost/'));assert.ok(ff.includes('Chill · batch 01, 2 of 27 · released 17 Jul 2024'),'legacy challenge context line');const sm=strip(h.render('levels/sweet-maze/'));assert.ok(sm.includes('released 26 Mar 2025'),'Sweet Maze dated as the archive showed');
const mo=strip(h.render('levels/magnus-opus/'));assert.ok(mo.includes('Ranked · batch'),'Leaderboard levels shown as Ranked');
const ch=strip(h.render('challenges/'));assert.ok(ch.includes('The rotation')&&ch.includes('81 maps in 27 batches, of which 20 were released')&&ch.includes('began on 2 April 2025'),'challenges page explains the rotation');
assert.ok(ch.includes('When does a challenge come back?')&&h.render('challenges/').includes('id="cycle-calculator" data-start="2025-04-02" data-days="364"'),'cycle calculator on the Challenges page');
{const vm=await import('node:vm'),fs=await import('node:fs');const ctx={window:{},document:{getElementById:()=>null},location:{pathname:'/'}};vm.createContext(ctx);vm.runInContext(fs.readFileSync(new URL('../../src/page.js',import.meta.url),'utf8'),ctx);const runs=ctx.window.O2CycleRuns;
 const r=runs('2026-10-28','2025-04-02',364);assert.equal(r.slot,'Wednesday');assert.equal(r.cycle,2);assert.equal(r.first,'2025-10-29');assert.equal(r.previous,'2025-10-29');assert.deepEqual([...r.next],['2027-10-27','2028-10-25']);
 assert.equal(runs('2025-04-02','2025-04-02',364).previous,null);assert.equal(runs('2026-10-31','2025-04-02',364).slot,'weekend (Friday to Sunday)');assert.ok(runs('2025-03-26','2025-04-02',364).before);}
console.log('PASS: levels grouped by campaign and challenge type; rotation explained.');
