// PR 73: game-composited icons backed out at the maintainer's request; the Buildings subtitle link fix stays.
import assert from 'node:assert/strict';import fs from 'node:fs';import {harness} from '../render-harness.mjs';
const h=await harness();
assert.ok(!fs.existsSync(new URL('../../assets/wiki-artwork/tiles.json',import.meta.url)),'composited icon set removed');
const bk=h.render('buildings/bakery/');assert.ok(!bk.includes('wiki-artwork/tile-')&&bk.includes('wiki-artwork/filled/icon-'),'pages use the earlier glyph icons');
const dir=h.render('buildings/');assert.ok(!dir.includes('&lt;a href')&&dir.includes('>Plants</a> section'),'buildings directory subtitle links render as links');
console.log('PASS: composited icons backed out; Buildings subtitle links render.');
