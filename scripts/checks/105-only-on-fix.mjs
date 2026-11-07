// PR 105: the level-specific infobox row lists every level the building appears in, not just build lists, and no longer claims "Only on".
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const au=strip(h.render('buildings/author-s-stand/'));
assert.ok(!au.includes('Only on')&&/Appears in built on Picun.{1,6}s Secret , Too Hot to Write ; starts on the map in Where Am I\?/.test(au),'Author\'s Stand row: '+(au.match(/Appears in[^]*?Game data/)||[''])[0]);
assert.ok(!/Levels 3 levels/.test(au),'no conflicting Levels count on level-specific pages');
assert.ok(/Levels \d+ levels/.test(strip(h.render('buildings/bakery/'))),'ordinary buildings keep the Levels row');
console.log('PASS: level-specific Appears in row is complete.');
