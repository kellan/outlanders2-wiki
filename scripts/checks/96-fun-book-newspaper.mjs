// PR 96: player report that a Book holds Fun at about 80 and that Newspapers alone take 18 days to meet Fun; both fit the stored values.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const fun=strip(h.render('needs/fun/')),gear=strip(h.render('gear/'));
assert.ok(fun.includes('one Newspaper a day (1 unit) adds only 5 a day, so it takes about 18 days to reach the 90 that counts as met'),'worked example from stored values');
assert.ok(fun.includes('Seen in play')&&fun.includes('about 18 days to reach the 90 needed'),'newspaper report on the Fun page');
assert.ok(!strip(h.render('eating/')).includes('about 18 days to reach the 90'),'kept off the eating page');
assert.ok(gear.includes('Players report that a Book holds Fun at about 80')&&gear.includes('A Book carried by a villager gives a base Fun level of about 80'),'book report on the Gear page');
assert.ok(!gear.includes('raises its cap or slows its fall'),'old open wording replaced');
console.log('PASS: Book base Fun ~80 and the 18-day Newspaper sum recorded from a player report.');
