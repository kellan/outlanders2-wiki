// PR 87: challenge times are shown in UTC. The rollover is taken to be fixed at 18:00 UTC, also after the US clocks change.
import assert from 'node:assert/strict';import fs from 'node:fs';import {harness} from '../render-harness.mjs';
const h=await harness(),c=h.ctx,strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
assert.equal(c.challengeToday(new Date('2026-11-03T17:59:00Z')),'2026-11-02','winter: still the previous day just before 18:00 UTC');
assert.equal(c.challengeToday(new Date('2026-11-03T18:00:00Z')),'2026-11-03','winter: rolls over at 18:00 UTC');
for(const p of ['','challenges/','challenges/redux/','challenges/original/','challenges/bounty/dark-stew-feast/','challenges/redux/save-the-forests-redux/']){const t=strip(h.render(p));assert.ok(!/2pm|Eastern/.test(t.replace('2pm Eastern in daylight time','')),p+': times in UTC');}
assert.ok(strip(h.render('challenges/original/')).includes('18:00 UTC'),'type page gives the UTC time');
const page=fs.readFileSync(new URL('../../src/page.js',import.meta.url),'utf8');assert.ok(!page.includes('New_York')&&!page.includes('Eastern'),'page.js works in UTC');
console.log('PASS: challenge rollover shown and computed at 18:00 UTC.');
