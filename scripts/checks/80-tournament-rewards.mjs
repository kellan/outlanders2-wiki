// PR 80: Tournament reward tables decoded from the packaged RewardEntry assets, for every season including the live Rural one.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const page=h.render('tournament/'),t=strip(page),all=strip(h.render('spoilers/tournament/'));
assert.ok(t.includes('The totals are the same every season: 2, 5, 8, 12, 16, 20, 26, 32, 40, 48, 58, 68, 80, 92'),'reward thresholds');
assert.ok(!t.includes('reward set is not in the extracted text')&&t.includes('16 Rural Sawmill')&&t.includes('80 Rural Villagers Style'),'live Rural season has its rewards');
assert.ok(t.includes('5 Nordic Basic House')&&t.includes('26 Mesoamerican Playground'),'completed seasons keep their own reward text');
assert.ok(t.includes('12 Streak Shield')&&t.includes('92 100 Leaderboard Bonus points'),'streak and leaderboard rewards');
assert.ok(/<td>Nordic <a class="resource-link" href="[^"]*buildings\/fishing-dock\/">/.test(page)&&/<td>Rural <a class="resource-link" href="[^"]*buildings\/sawmill\/">/.test(page)&&!/<a [^>]*>[^<]*<a /.test(page),'restyled buildings link to the building, without nested links');
assert.ok(!t.includes('Egyptian Palette')&&all.includes('Egyptian Palette')&&all.includes('Imperial Brewery'),'unconfirmed seasons only on the spoilers page');
assert.ok(t.includes('claim season-inspired cosmetic rewards'),'season intro wording');
console.log('PASS: Tournament reward tables for every season, thresholds, streak and leaderboard rewards, spoiler seasons withheld.');
