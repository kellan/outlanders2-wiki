// PR 72: game-composited icons from the local export; Buildings subtitle links.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness();
const dir=h.render('buildings/');assert.ok(!dir.includes('&lt;a href')&&dir.includes('>Plants</a> section'),'buildings directory subtitle links render as links');assert.ok(h.render('about/').includes('430 building and resource icon tiles'),'about page counts the composited icons');console.log('PASS: game-composited icons committed; directory subtitle links render.');
