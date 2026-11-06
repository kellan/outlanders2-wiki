// PR 98: fake recycling (mark and leave unstaffed; mark to unload, then cancel), from a maintainer report checked against code.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const t=strip(h.render('recycling/'));
assert.ok(t.includes('Fake recycling')&&t.includes('Mark it and leave it unstaffed: villagers stop going there')&&t.includes('Mark it to empty it, then cancel'),'both tricks');
assert.ok(t.includes('Demolition starts the moment the last kept item leaves. It needs only 10 rounds per spot (5 on smaller sites) of about 0.65 seconds each'),'timing from the timing model');
assert.ok(t.includes('ingredients and part-made items untouched'),'cancel keeps the rest');
assert.ok(t.includes('Players fake-recycle buildings')&&t.indexOf('Fake recycling')<t.indexOf('Every building'),'player report shown, section before the table');
console.log('PASS: fake recycling tricks on the Recycling page.');
