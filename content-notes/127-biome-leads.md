# Biome pages lead with what is different

`biomeLead()` in `src/app.js` builds the same section for every biome that has decoded sandbox data, so there is no per-biome branch (editorial rule "No special cases for one entity"):

- **Need:** each `special_needs_and_hazards` entry, named from its concern key (Hydration → Thirst, Refreshment → Cooling, Heat → Heat), with the bold consequence from the game's own text. Biomes with none say there is no extra need.
- **Terrain:** the biome's `terrain_note`, moved up from the sandbox section (only Wetlands has one).
- **Grows only here:** plants on this biome's crop, orchard and forestry lists and no other's, compared by resolved building (the version 30 and version 32 biome records spell plant refs differently, "Field Watermelon" against "Watermelon"). Forestry trees add their extra drops from the plant spawners: Willow drops Mushrooms, Cypress and Winter Pine get burrows.
- **Built only here:** the same comparison for buildings, including the shared base list; workplaces carry the first sentence of their in-game description.
- **Missing here:** buildings every other biome offers. Evergreen has none.

The "Needs & environment" section is now only shown when the biome has a need; the "See individual scenarios for their enabled needs." filler is gone.

Biome art: the game has island previews (`MiniBiome-*`) for Evergreen, Drylands, Tropiclands and Winterlands only. The Swamp and Halloween slots held `MapShape_Valley` level map previews, which do not show those biomes (the Swamp one is a dry meadow). `icon()` now uses biome art only when it is an island preview, as the home strip already did. A row in `docs/INFORMATION-NEEDED.md` asks for real art for both.

## Audit of the biome pages (20 November 2026, v32 · 257), not fixed here

- The Winterlands page opens with a bare Greenhouse field-guide card (an `o.id==='Winter'` special case).
- "Sandbox build list … as stored in the game files. Not yet checked in play." and "The scene name is stored map configuration; it does not by itself establish…" are inline hedges; "73 levels store a Evergreen scene" has a grammar slip.
- The 22-building shared base list repeats on every page.
- Map resources use internal names (CypressTree, PineTree, Ash, TropicalMountainVegetation, Halloween Candle 0) and raw densities with no unit; Spookylands lists ruins at density 0.
- Evergreen and Tropiclands list 53 and 74 challenge levels plus five "Unnamed scenario · archive" maps inline.
- The Biomes catalog says "Not established" for Wetlands' hazards (it has marshes) and "Unknown" availability for long-released biomes.
