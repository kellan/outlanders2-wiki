## Recycle refund rule and Roads and walking (2026-11-03)

The maintainer asked for two findings from the code work to go on the wiki.

**Refund: 60%, rounded down**
- `RecyclableBehaviour.GetRecycleValue` (version 31) multiplies `BuildSiteBehaviour.GetTotalNeededResources` by 0.6, the float constant 0x3f19999a. `ResourceAmount.MultiplyBy` truncates (`fcvtzs`).
- An unfinished site instead returns the counts in its piles: what has been delivered.
- Both earlier playtests fit: Bakery 9 Clay → 5 and 4 Stone → 2; Basic House 6 Logs → 3. They had been read as "half, rounded up", which gives the same amounts there but not for costs like 10 (6 vs 5) or 15 (9 vs 8).
- Changes:
  - The two observations keep their amounts but lose the "half" wording, with a note on the code rule.
  - New data: `recycle_stock.refund`.
  - Every building with a construction cost gets a "Recycle refund" infobox row. Objects with a stored salvage override keep their override.
  - The Recycling page gets a "What you get back" line.
  - The INFORMATION-NEEDED row now asks for a cost-10 test.

**Roads and walking**
- New research export `tools/export_walking.py` → `data/walking.json`. The version 30 and version 31 decodes give the same result.
- Values:
  - `WalkerBehaviour.Speed`: adults 1.7, kids 1.35, elders 1.2, babies 0.4, each with variance 0.1.
  - `VillagerConfig.WalkCarryingMultiplier` 0.8.
  - `WalkableTiles.WalkSpeedMultiplier`: Road 1.4; Stone and Brick Road 2.15; Bridge 1.35; Plaza, Park, Playground, Zen Garden, Warehouse and Advanced Warehouse 1.2.
  - Tournament `SpeedBoostAction` ×1.5 walk and carry.
- Boots (×1.4, ×1.2 on roads) and the Fun bonus (×1.2) come from data already on the site.
- New Mechanics page `/roads-and-walking/` with tables for age speeds, surfaces (with cost per tile) and other modifiers, plus a "What a road is worth" example. The example is a 20-square haul: 55 s round trip on bare ground, 27 s on a Stone Road.
- Squares assume 2 stored units per square, the footprint rule. How multipliers combine is not decoded; the page says so, and a new INFORMATION-NEEDED row asks for a timing test.
- "Roads and walking" is removed from the hub's "Not written yet" list.
