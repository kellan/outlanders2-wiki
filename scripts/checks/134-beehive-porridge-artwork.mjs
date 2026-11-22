// PR 134: corrected Beehive and Barley Porridge glyphs (version 32), shared by Honey and the Porridge Cookhouse.
import assert from 'node:assert/strict';import fs from 'node:fs';import {harness} from '../render-harness.mjs';
const h=await harness(),m=JSON.parse(fs.readFileSync(new URL('../../assets/wiki-artwork/filled/manifest.json',import.meta.url),'utf8'));
for(const id of [273681,273694])assert.ok(!m.icons.includes(id),`stand-in fill ${id} no longer overrides the corrected glyph`);
for(const [page,file] of [['buildings/beehive/','beehive-glyph-v32.png'],['resources/honey/','beehive-glyph-v32.png'],['buildings/porridge-cookhouse/','barley-porridge-glyph-v32.png'],['resources/barley-porridge/','barley-porridge-glyph-v32.png']])assert.ok(h.render(page).includes('wiki-artwork/'+file),page+' shows '+file);
console.log('PASS: corrected Beehive and Barley Porridge glyphs on all four pages.');
