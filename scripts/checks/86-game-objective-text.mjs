// PR 86: objectives in the game's own words. Bounty goals use the leaderboard templates, other objectives the level's own
// text or the game's WinConditions templates with each object's verb (Bake, Brew, Sew…) and name forms ("bowls of Stew").
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').replace(/ \./g,'.');
const stew=strip(h.render('challenges/bounty/dark-stew-feast/'));
assert.ok(stew.includes('In 31 days: Produce as many bowls of Stew as you can.'),'Bounty goal as the game shows it');
assert.ok(stew.includes('Scored on Bowls of Stew produced'),'score label');
assert.ok(stew.includes('Reach the end of the given time to see how well you did compared to other players!'),'game’s Bounty explanation');
assert.ok(strip(h.render('challenges/bounty/spooky-veggie-ritual/')).includes('Have as many Veggies as you can.'),'Have-mode Bounty is distinct from Produce');
assert.ok(strip(h.render('levels/morrigwyn-stones/')).includes('Consume 85 bowls of Stew.'),'level’s own objective text');
const resort=strip(h.render('levels/cliffside-resort/'));assert.ok(resort.includes('Brew 80 mugs of Beer.')&&resort.includes('Satisfy Housing.'),'template verbs and need wording');
assert.ok(strip(h.render('levels/season-s-greetings/')).includes('Sew 100 Coats.'),'object verb key');
assert.ok(strip(h.render('challenges/redux/remains-redux-2025-04-15/')).includes('Have a Fountain.'),'singular with the game’s article');
const redux=strip(h.render('challenges/redux/'));assert.ok(redux.includes('Bake 55 Cookies. Reach a Population of 22. Have everyone settled.'),'type tables use the same wording');
assert.ok(!/Make as much|Scoring goal|Produce \/ make|Consume \/ recycle/.test(stew+resort+redux),'old wording gone');
for(const p of h.pages.filter(p=>p.type==='levels'))for(const m of h.render(p.path).matchAll(/<tr><td>(.*?)<\/td><td>[^<]*<\/td><\/tr>/g)){const t=m[1].replace(/<[^>]+>/g,'');assert.ok(!/[{}\[\]]|undefined|NaN/.test(t),p.path+': unresolved objective text '+t)}
assert.ok(!strip(h.render('')).includes('Redux (Redux)'),'home box does not repeat the type');
console.log('PASS: Bounty goals and level objectives in the game’s wording, with per-object verbs and name forms.');
