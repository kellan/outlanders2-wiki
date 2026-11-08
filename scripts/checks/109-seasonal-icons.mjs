// PR 109: seasonal pages list buildings, plants and food in tables, so icons get the table size instead of full size.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness(),strip=s=>s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').replace(/ ([,.)])/g,'$1');
for(const r of ['halloween','christmas']){const x=h.render(r+'/');
 assert.ok(!/<li>\s*<img/.test(x),r+': no icon inside a bare list item (unsized, renders full width)');
 for(const id of ['buildings','food'])assert.match(x.slice(x.indexOf(`id="${id}"`)),/^[^]*?<table>[^]*?<td><img class="gi/,r+': '+id+' in a table with icons');}
assert.match(strip(h.render('christmas/')),/Name What it is Gingerbread Man Man Only in Christmas form Gingerbread Man Shop Only in Christmas form/);
assert.match(strip(h.render('halloween/')),/Zen Garden Halloween look of the ordinary Zen Garden/);
console.log('PASS: seasonal pages show their icons at table size.');
