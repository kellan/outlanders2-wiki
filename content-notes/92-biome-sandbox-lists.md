## Sandbox build lists on biome pages (3 November 2026)

A player reported that a Spookylands sandbox game offers no Trading Outpost even though Wheat grows there. The decoded sandbox configuration (`content/reference/biomes.json`, each biome's `MapBiomeSettings` placeables) agrees: Evergreen, Tropiclands and Winterlands each list their own outpost prefab, Spookylands and Drylands list none, and only four outpost prefabs exist in the game files (Base, Evergreen, Tropics, Winterland). The wiki held this data but no reader page showed it; the biome page said buildings depend on the scenario and the Sandbox page pointed back to the biome page.

The biome page's "Plants & buildings" placeholder is replaced by a "Sandbox build list" section rendered from the stored placeables:

- Plants by kind, with the planter that handles them drawn from the biome's own list (the same rule as the plant pages), so Spookylands' Dead Tree and Drylands' Mesquite Tree are marked as having no planter in the list.
- Buildings grouped as houses (sleep spots), workplaces (worker slots) and the rest.
- "Compared with other biomes": buildings that two or more other decoded biomes list but this one does not, grouped by which biomes have them. Two is the threshold because Drylands lists very little, so "every other biome" would hide almost everything. Buildings only this biome lists are named, except shared buildings the biome swaps for its own skinned version (Spookylands excludes the base Playground, Plaza and Zen Garden and lists Halloween ones).
- "Still offered on hand-made maps in this biome": for each missing building, the named levels on this biome's scene whose build list includes it, capped at four with a link to the building page's level list. For Spookylands this is the practical answer to the report: A Moon Part, "Drifting Docks" Redux and "Friends in the Frost" Redux offer the Evergreen outpost.

Comparison is by display name, so Halloween-skinned variants of the Open Kitchen, Two-Story House and Fountain count as present. Buildings that appear in no biome list (Market, Warehouse, Sawmill, Lumberjacks' Base, Clay Pit, Brickyard, roads) are presumed shared and are explained rather than listed; the base placeable list itself has not been decoded, and the exclusions show the game can drop base items, so this is an inference. Nothing here has been checked in a live sandbox game; the player's report is the only gameplay observation and it matches the data. Wetlands has no decoded configuration and says so.

The Sandbox page now links to the new section and notes that its "Extra need" column is editorial: the three needs come from the game's hint text for those biomes, not from a decoded biome field (`build_biome_rules.py` hardcodes the mapping).

Open: a playtest of a Spookylands sandbox build menu to confirm the eight missing buildings and the presence of the shared ones; decoding the shared base placeable list.
