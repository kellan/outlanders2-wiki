// PR 122: biome pages and the biome list show only the island previews (MiniBiome-*); the MapShape_Valley level map previews filed under Wetlands and Spookylands are not pictures of those biomes.
import assert from 'node:assert/strict';import {harness} from '../render-harness.mjs';
const h=await harness();
for(const p of ['biomes/','biomes/wetlands/','biomes/spookylands/'])assert.ok(!h.render(p).includes('mapshape-valley'),'no map preview on '+p);
for(const p of ['biomes/evergreen/','biomes/drylands/'])assert.ok(h.render(p).includes('minibiome-'),'island preview kept on '+p);
