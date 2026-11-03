## Recycling: unloading and where the stock lands (2026-11-03)

Follow-up to PR 91. The maintainer asked how unloading a recycled building works, because strong players plan where the stock will land. Read from the code (version 31). The full sequence is in the research repo, docs/RECYCLING.md; open points are in research issue 15.

**Findings**
- A recycle site replaces the building. It is a workplace for up to 4 workers (2 on the 1x1 decoration site), with 1–2 demolition spots. Each spot needs 10 work rounds, or 5 on the 4x4 site.
- Every demolition spot has `RecycleSiteWorkspotCondition`, which waits for `IsReadyToRecycle`. That stays false while a kept pile holds stock or an activity still depends on the building, so the kept stock comes out first.
- Site workers carry stock during their shift only. `ActivityStoreResourceFromSite.GetPileToDrop` uses the nearest pile in the zone that can take the resource if it is within `MaxDistanceForPileFind` = 18. Otherwise `Level.CreateNewPile` makes a new loose pile at the building's pile.
- `MarkForRecycling` calls `GetTransferData` / `InitializeFromOtherWorkplace`, which looks like the building's crew moving to the site. Not confirmed in play.

**Changes**
- `recycle_stock.unloading` holds the rule, the reach (18), the importance range and the timeline lengths.
- Each record gains `kept_capacity` (the most there can be to carry out) and `recycle_site`.
- The Recycling page gains an "Unloading: where the stock lands" section with planning tips, a "Carried out first" column, and updated open questions.

**Worked examples (added at the maintainer's request)**
- Stored values used: walking speed 1.7 (`WalkerBehaviour.Speed`, _Villager Base, variance 0.1); ×0.8 while carrying (`VillagerConfig.WalkCarryingMultiplier`); pick-up and drop animations about 1–1.3 s (`PickUpDrop_*` clips); a shift is 0.6 of a 300 s day.
- One trip = d/1.36 + d/1.7 + 2 s.
- Lumberjacks' Base, 30 Logs, 2 workers: 2.2 min with a Warehouse 5 units away; 6.1 min (about 2 shifts) at 17 units, just inside the reach; 50 s when nothing is in reach and the Logs are dropped beside the building.
- Full Warehouse, 216 items, crew of 3: about 26 min (8.7 shifts) to a Warehouse 15 units away; 4 min when nothing is in reach, leaving 216 items loose.
- The page states the assumptions: one item per trip, grid units as walking units, no road bonus, no breaks for needs. It flags the Wheelbarrow (carries 4) as unsettled.
- Values are in `recycle_stock.unloading` (`walk_speed`, `walk_carrying_multiplier`, `pickup_or_drop_seconds`, `wheelbarrow_capacity`, `timing_sources`).

**Open (research issue 15)**
- Which piles count as able to take a load.
- Straight-line or walking distance, and where the new pile appears.
- Unloading time in play.
- Whether the crew carries over.
- Where the refund lands.
