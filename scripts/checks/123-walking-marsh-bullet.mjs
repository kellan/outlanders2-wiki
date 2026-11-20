// PR 123: shallow marshes are one bullet under "Other things that change speed", not a section of their own.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),html=h.render('roads-and-walking/'),strip=s=>s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
assert.ok(!html.includes('id="shallow-marshes"')&&!/<h2>Shallow marshes/.test(html),'no marsh section');
const other=strip(html.match(/id="other"[\s\S]*?<\/ul>/)[0]);assert.match(other,/Shallow marshes \( ?Wetlands ?\) ?: villagers sink in and walk ×0\.7, slower still uphill, and route around them where they can\. A road over a marsh still helps, but only gets back to about bare-ground speed\./);
console.log('PASS: shallow marshes are a bullet under Other things that change speed.');
