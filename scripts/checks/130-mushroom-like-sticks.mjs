// PR 130: a developer confirmed mushrooms work like sticks (no Foragers' Hut-style radius).
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),t=h.render('resources/mushroom/').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
assert.match(t,/They work like Sticks: each Mushroom lies on the ground ready to use/);assert.match(t,/There is no gathering radius like a Foragers’ Hut’s/);assert.ok(!t.includes('How far the workers walk to pick them is not checked yet'),'open question answered');
console.log('PASS: mushrooms work like sticks.');
