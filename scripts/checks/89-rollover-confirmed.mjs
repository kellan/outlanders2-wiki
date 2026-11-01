// PR 89: the challenge rollover stayed at 18:00 UTC after the US clocks changed, so it is fixed in UTC.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),c=h.ctx,strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
assert.equal(c.challengeToday(new Date('2026-11-01T17:59:00Z')),'2026-10-31','still the previous challenge day at 17:59 UTC after the clock change');
assert.equal(c.challengeToday(new Date('2026-11-01T18:00:00Z')),'2026-11-01','rolls over at 18:00 UTC (1pm Eastern standard time)');
const stf=strip(h.render('challenges/redux/save-the-forests-redux/'));
assert.ok(stf.includes('still rolled over at 18:00 UTC')&&!stf.includes('Not yet checked'),'confirmation shown, open question gone');
console.log('PASS: rollover confirmed fixed at 18:00 UTC.');
