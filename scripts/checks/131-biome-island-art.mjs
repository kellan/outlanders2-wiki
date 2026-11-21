// PR 131: the Wetlands and Spookylands pages and the home strip use the game's own island previews.
import assert from 'node:assert/strict';import fs from 'node:fs';import {harness} from '../render-harness.mjs';
const h=await harness();
for(const [p,f] of [['biomes/wetlands/','minibiome-swamp.png'],['biomes/spookylands/','minibiome-halloween.png']]){assert.ok(h.render(p).includes(f),p+' shows '+f);assert.ok(fs.existsSync(new URL('../../assets/wiki-artwork/'+f,import.meta.url)),f+' committed')}
const home=h.render('');assert.ok(home.includes('minibiome-swamp.png')&&home.includes('minibiome-halloween.png'),'home biome strip has all six islands');
console.log('PASS: Wetlands and Spookylands island previews.');
