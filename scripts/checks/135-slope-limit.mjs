// PR 135: the slope limit on Roads and walking (Level.MaxHeightMultiplier from the version 32 scenes).
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),st=s=>s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
assert.match(st(h.render('roads-and-walking/')),/On the steepest ground a villager walks up to ×1\.82 going down and as slow as ×0\.18 going up/);
console.log('PASS: slope limit on Roads and walking.');
