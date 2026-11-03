## Recycling: which stock a building keeps (issue 90, 2026-11-03)

Players noticed that recycling a Winter Pub destroys its stock, while an Ice Pop Stand leaves its Ice Pops in piles on the ground. The game code explains the difference.

**Evidence (GameAssembly, versions 30 and 31)**
- `RecyclableBehaviour.InitPiles` builds the list of piles to recover (`RecyclableBehaviour.Piles`). It filters the building's piles with a lambda whose whole body reads `PileBehaviour.PileConfig.PublicOutput`.
- The recovery job, `ActivityStoreResourceFromRecyclable` (in game text: "Recovering [resource] from [building]"), only takes from that list (`ValidPile`, `HasPileNotEmpty`).
- So a pile is recovered only if its `PublicOutput` flag is set. Every other pile is destroyed with the building.
- Matches both observations: the Ice Pop Stand's Ice Pop pile is public (capacity 24); every Winter Pub pile is private.

**Data**
- New section `recycle_stock` in `decoded-mechanics.json`, one record per building that has piles.
- Made by research `tools/export_recycle_stock.py`, run on the version 30 decode. The version 31 decode gives the same result for all 90 recyclable objects with piles.
- Piles are matched to resources by ReferenceResource, then the workspot formula that outputs into them, then gathering-place output piles, then the workspot formula that takes input from them.
- Public piles that match no resource (warehouses, the Market, farms, foragers) hold whatever is stored there.

**Display**
- Building infobox: a new "When recycled" row.
- A new Mechanics page, Recycling (`/recycling/`), with the rule, a tip and a table of every building.
- Unnamed intermediates count as "part-made items". Workplace tools (`content/tools/`) and Heat are left out.
- Fires (Bonfire, Winter Cabin) make warmth, not stock. They are shown as losing only unburnt firewood and are not counted among the 8 places that keep none of what they make (maintainer note, 3 November 2026).
- Same-name variants that differ (the biome Trading Outposts) get their own rows.

**Player reports (maintainer, 3 November 2026, version 31)**
- Smoothie Stand and Ice Pop Stand keep their stock when recycled; the Winter Pub loses its stock. All three match the data. Each is an observation on its building page.
- Stock lost to recycling still counts towards Produce goals but no longer towards Have goals. This is an observation on the Recycling page. The Produce meaning on level pages now says items lost to recycling still count.

**Unloading (code, version 31; research docs/RECYCLING.md, open questions in research issue 15)**
- A recycle site replaces the building: a workplace for up to 4 workers (2 on the 1x1 decoration site), with 1–2 demolition spots of 10 work rounds, or 5 on the 4x4 site.
- Every demolition spot has `RecycleSiteWorkspotCondition`, which waits for `IsReadyToRecycle`. That stays false while a kept pile holds stock or an activity still depends on the building. So the kept stock comes out first.
- Site workers carry stock during their shift only. `GetPileToDrop` uses the nearest pile in the zone that can take the resource if it lies within `MaxDistanceForPileFind` = 18. Otherwise it creates a new loose pile at the building's pile.
- New data per record: `kept_capacity` (the most there can be to carry out) and `recycle_site`. New section data: `recycle_stock.unloading`.
- The page gains an "Unloading: where the stock lands" section with planning tips, and a "Carried out first" column.

**Not tested yet**
- Whether recovered stock always waits on the ground or goes straight to storage.
- Whether the building waits for recovery before it disappears.
