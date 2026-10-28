// PR 81: the 260 Original, Redux and Bounty levels from the game's challenge download cache, one cycle of the rotation.
import assert from 'node:assert/strict';import fs from 'node:fs';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const live=h.pages.filter(p=>p.type==='levels'&&p.path.startsWith('challenges/'));
assert.equal(live.length,260,'260 challenge level pages');
for(const [t,n] of [['original',52],['redux',104],['bounty',104]])assert.equal(live.filter(p=>p.path.startsWith(`challenges/${t}/`)).length,n,t+' count');
// The acceptance question: Dead Trees at the start of "Save the Forests" Redux, and when it last ran.
const stf=strip(h.render('challenges/redux/save-the-forests-redux/'));
assert.ok(stf.includes('Wiki home › Challenges › Redux ›'),'breadcrumb under Challenges');
assert.ok(stf.includes('Dead Tree ×268'),'starts with 268 Dead Trees');
assert.ok(stf.includes('Have Dead Tree ≥ 222'),'objective names the Dead Tree');
assert.ok(stf.includes('#150 of 260 · first ran Tuesday 28 Oct 2025 · next run'),'archive number and first run');
assert.ok(h.render('challenges/redux/save-the-forests-redux/').includes('data-next-run="2025-10-28" data-run-days="1"'),'next run recomputed in the browser');
// Which challenge is live: 2pm Eastern rollover, Originals Friday to Sunday, 364-day cycle from 2 Apr 2025.
const c=h.ctx;
assert.equal(c.challengeToday(new Date('2026-10-28T17:59:00Z')),'2026-10-27','before 2pm Eastern it is still the previous day');
assert.equal(c.challengeToday(new Date('2026-10-28T18:00:00Z')),'2026-10-28','2pm Eastern rollover (daylight time)');
assert.equal(c.challengeOn('2026-10-27').name,'"Save the Forests" Redux','27 Oct 2026 is "Save the Forests" Redux, as seen in game');
assert.equal(c.challengeOn('2026-10-31').name,c.challengeOn('2026-10-30').name,'weekend shows the Friday Original');
assert.equal(c.challengeOn('2026-10-30').name,'The Pit of Thorns');
assert.deepEqual({...c.nextRun('2025-10-28',1,'2026-10-27')},{date:'2026-10-27',now:true});
assert.deepEqual({...c.nextRun('2025-10-28',1,'2026-10-28')},{date:'2027-10-26',now:false});
assert.deepEqual({...c.nextRun('2025-10-31',3,'2026-11-01')},{date:'2026-10-30',now:true},'an Original is live through Sunday');
assert.ok(h.render('challenges/').includes('id="challenge-schedule"')&&h.render('').includes('id="home-today"'),'today on the Challenges page and home');
const page=fs.readFileSync(new URL('../../src/page.js',import.meta.url),'utf8');assert.ok(page.includes("START='2025-04-02'")&&page.includes('14*36e5')&&page.includes("timeZone:'America/New_York'"),'page.js uses the same cycle and rollover');
assert.ok(stf.includes('a simpler or different version of Save the Forests'),'Redux links its base level');
assert.ok(stf.includes('Daily challenges roll over at 2pm Eastern'),'rollover observation shown');
const bounty=strip(h.render('challenges/bounty/'));
assert.ok(bounty.includes('Spooky Veggie Ritual')&&bounty.includes('Make as much Veggie as you can')||bounty.includes('Have as much Veggie as you can'),'Bounty scoring goal');
const ch=strip(h.render('challenges/'));
assert.ok(ch.includes('The wiki has all 260 from the first cycle')&&ch.includes('52 Original, 104 Redux, 104 Bounty'),'rotation section counts');
assert.ok(/Levels in the wiki.*Original Yes .*? 52 /.test(ch),'types table counts live levels');
assert.ok(fs.readFileSync(new URL('../../content/collections.json',import.meta.url),'utf8').includes('challenges/Single_W_Nuevobosque_Redux-2025-10-28.json'),'records listed in collections');
const bakery=h.render('buildings/bakery/');assert.ok(/<details><summary>\d+ challenge levels from the current rotation<\/summary>/.test(bakery),'building pages fold challenge levels away');
console.log('PASS: 260 challenge levels (52 Original, 104 Redux, 104 Bounty), run dates, Dead Trees on "Save the Forests" Redux, rollover, grouped backlinks.');
