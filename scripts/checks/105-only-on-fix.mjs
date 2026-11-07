// PR 105: the level-specific infobox row lists every level the building appears in, not just build lists, and no longer claims "Only on".
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
const au=strip(h.render('buildings/author-s-stand/'));
assert.ok(!au.includes('Only on')&&/Appears in built on Picun.{1,6}s Secret , Too Hot to Write ; starts on the map in Where Am I\?/.test(au),'Author\'s Stand row: '+(au.match(/Appears in[^]*?Game data/)||[''])[0]);
assert.ok(!/Levels 3 levels/.test(au),'no conflicting Levels count on level-specific pages');
assert.ok(/Buildable on \d+ levels/.test(strip(h.render('buildings/bakery/'))),'ordinary buildings: the count says what it counts');
// Level pages: buildings already on the map count, not only the build list.
const tt=strip(h.render('levels/tourist-trap/'));const need=tt.slice(tt.indexOf('What can meet it here'),tt.indexOf('Available buildings'));
assert.ok(/Heat Yes [^]*?Bonfire \(already on the map\)/.test(need)&&/Wellness Yes Zen Garden \(already on the map\)/.test(need),'Tourist Trap: pre-placed Bonfire and Zen Garden count: '+need.slice(0,300));
assert.ok(!/Nothing buildable|not buildable on this map|none plantable on this map/.test(strip(h.render('challenges/'))+need),'build-list-only wording gone');
console.log('PASS: level-specific Appears in row is complete; level pages count buildings already on the map.');
