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

**Open (research issue 15)**
- Which piles count as able to take a load.
- Straight-line or walking distance, and where the new pile appears.
- Unloading time in play.
- Whether the crew carries over.
- Where the refund lands.
