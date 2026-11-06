// PR 97: player report that a Book holds Fun at about 80 and that Newspapers alone take 18 days to meet Fun; both fit the stored values.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const fun=strip(h.render('needs/fun/')),gear=strip(h.render('gear/'));
assert.ok(fun.includes('one Newspaper a day (1 unit) adds only 5 a day, so it takes about 18 days to reach the 90 that counts as met'),'worked example from stored values');
assert.ok(fun.includes('Seen in play')&&fun.includes('about 18 days to reach the 90 needed'),'newspaper report on the Fun page');
assert.ok(!strip(h.render('eating/')).includes('about 18 days to reach the 90'),'kept off the eating page');
assert.ok(gear.includes('Players report that a Book holds Fun at about 80')&&gear.includes('A Book carried by a villager gives a base Fun level of about 80'),'book report on the Gear page');
assert.ok(!gear.includes('raises its cap or slows its fall'),'old open wording replaced');
// Level pages: what can meet each need on the map, and the Books-alone warning (today's "Legally Safe Ape Island" Redux).
const ape=strip(h.render('challenges/redux/legally-safe-ape-island-redux/'));
assert.ok(/Fun Yes Newspaper , Book \(carried\)/.test(ape),'fun sources on the map');
assert.ok(ape.includes('Fun here: Books alone will not do it.')&&ape.includes('only other Fun source is Newspaper')&&ape.includes('A Book plus one Newspaper takes a villager past 90'),'books-alone tip');
assert.ok(/Heat Yes [^]*?Bonfire/.test(ape.slice(ape.indexOf('What can meet it here'),ape.indexOf('Available buildings'))),'heat sources include the Bonfire');
const orig=strip(h.render('challenges/original/legally-safe-ape-island/'));
assert.ok(!orig.includes('Books alone will not do it'),'no tip where Books are not buildable');
const book=strip(h.render('resources/book/')),paper=strip(h.render('resources/newspaper/'));
assert.ok(book.includes('A Book alone cannot meet Fun.')&&paper.includes('Newspapers alone are slow for Fun'),'tips on the Book and Newspaper pages');
assert.ok(fun.includes('Books alone cannot meet it either'),'Fun page leads with the insight');
console.log('PASS: Book base Fun ~80, the 18-day Newspaper sum, and the Books-alone warning on level, item and Fun pages.');
