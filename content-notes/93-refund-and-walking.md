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
- At the maintainer's request, a "When to build a road" section now leads the page. The maintainer pointed out that Stone Roads are rare, so it covers only the plain Road (×1.4):
  - A Road cuts walking time by about 30%.
  - Seven villagers walking on Roads do the walking of ten.
  - Pave long, busy routes first, and keep the road unbroken (speed comes from the tile underfoot).
  - Boots overlap with Roads: for a booted adult the Road adds 20%, not 40%.
  - The example is time-based: 30 s of walking each way gives 2.9 trips a shift on bare ground, 4 on a Road, 4.8 on a Road in Boots.
- The square-based examples and the "squares a second" column are removed (the maintainer found them confusing; the unit is unmeasured).
- **How speed combines** (code, version 31; research docs/WALKING.md). `VillagerActivity.CalculateWalkSpeedMultiplier(from, to)` = slope × (if carrying: 0.8 × village carry effect) × village walk effect × surface of the destination tile × gear.
  - Gear uses its Road value (1.2) when that surface is above 1, else its Base value (1.4). So Boots on a Stone Road give ×2.58, and plazas and warehouse floors count as road for Boots.
  - Slope = 1 + clamp((height from − height to)/distance, ±`Level.MaxHeightMultiplier`). The cap value is not in the snapshot.
  - The village effects are `StatsSystem.GlobalEffects`, which `LevelEffect.Merge` multiplies together. Concern values: Fun met walk ×1.2, Food met carry ×1.25 (new on the site), Cooling low walk ×0.75 (new).
  - The page replaces "not decoded" with the formula. It still flags that the final Burst move job was not read.
- **What a road costs, and when it pays back** (maintainer question):
  - Road Build Site: one workspot, 1 round of a 4.98 s timeline, no inputs, so a plain Road tile is free apart from work.
  - Roadworks Office (Road Builder Build Site): 6 Logs delivered, then 4 workspots × 10 rounds of 0.65 s.
  - Pine Tree: 6 chops of 6.67 s for 4 Logs.
  - Setup works out to about 4.5–7.1 minutes of villager work (1.5–2.4 shifts), mostly carrying, assuming trees and site are a 6–12 s walk from the stores.
  - A tile pays back its ~6 s of work after about 20 s of villager walking on it. The office pays back in about 3–6 days if three haulers spend half their shift on the new roads.
  - Values are in `walking.road_cost`.
