// PR 123: shallow marshes are one bullet under "Other things that change speed"; the walking page drops its not-timed-in-play notes and the Wetlands note drops sand.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),html=h.render('roads-and-walking/'),strip=s=>s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
assert.ok(!html.includes('id="shallow-marshes"')&&!/<h2>Shallow marshes/.test(html),'no marsh section');
const other=strip(html.match(/id="other"[\s\S]*?<\/ul>/)[0]);assert.match(other,/Shallow marshes \( ?Wetlands ?\) ?: villagers sink in and walk ×0\.7, slower still uphill, and route around them where they can\. A road over a marsh still helps, but only gets back to about bare-ground speed\./);
const all=strip(html);assert.ok(!/timed (them )?in play/.test(all),'no timed-in-play notes on the walking page');
const wet=strip(h.render('biomes/wetlands/'));assert.ok(!/\b[Ss]and\b/.test(wet.slice(wet.indexOf('Terrain'),wet.indexOf('Terrain')+400)),'Wetlands terrain note does not mention sand');
console.log('PASS: shallow marshes are a bullet under Other things that change speed; no sand or timed-in-play notes.');
