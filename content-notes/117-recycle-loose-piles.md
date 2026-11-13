## Recycling: recovered stock lands on loose piles, never in storage (2026-11-13)

The maintainer asked for the Recycling page to be made correct, and for any in-game research it still needs to be flagged.

**What the page said:** keep "a warehouse or other storage that takes the goods" within 18 units. Its worked examples had Logs going "In the Warehouse", 5 and 17 units away, and a full Warehouse emptying into "Another Warehouse 15 units away" over about 9 days. It also listed "whether loose piles count" as an open question.

**What the code says** (version 30 decompile, research `decompiled/macos-30-254/recycling/`, re-read 13 November 2026):
- **The search.** `ActivityStoreResourceFromSite.GetPileToDrop` calls `AnimalActivity.GetClosest` over the worker's zone `Piles` map.
  - The search is keyed by the item's resource.
  - It measures `DistanceSq` from the kept pile's first pickup position, against `MaxDistanceForPileFind`² (18², straight line).
  - With no hit, it calls `Level.CreateNewPile`.
- **Only loose piles are searched.** Only `ResourcePileBehaviour.UpdateMap` adds to `Zone.Piles`. It does so only for a pile with `PileConfig.IsStandalonePile`, room to spare, not inside a building marked for recycling and with no placeable on its tile. `Zone` otherwise only allocates and disposes the map.
  - The only standalone pile prefab is "StandalonePile", capacity 9 (`DM.piles`).
  - So the candidates are loose piles of the same goods, never Warehouse slots or other buildings' piles.
- **Player reports agree.** Two earlier reports say recycled Ice Pops and Smoothies end up "in piles on the ground" (observations `ice-pop-stand-recycle-keeps-stock`, `smoothie-stand-recycle-keeps-stock`).

**Page changes**
- Step 3 now says loads go onto a loose pile, never into storage, with the reach in units and in squares (a square is 2 units).
- Planning tips:
  - Expect loose piles that need hauling afterwards.
  - A Warehouse next door does not speed up the recycle.
  - A matching loose pile in reach makes the recycle slower.
- Worked examples (Lumberjacks' Base, 30 Logs, 2 workers):
  - new piles beside the building: 2.5 min;
  - a loose Log pile with room for 9, 15 units away: 3.7 min, slower;
  - a Warehouse 5 units away: same as the first row.
- The full Warehouse now comes down in about 6.3 minutes of crew work (about 2 shifts). It leaves 216 items in at least 24 loose piles.
- New piles are modelled about 2 units from the building's pile. Where the game really puts them is one of the live checks.
- The "Fake recycling" section now says the kept stock goes "out onto loose piles beside it", not "to storage".
- The settled open questions are removed: which piles count, and straight-line or walking distance.
- `decoded-mechanics.json` `recycle_stock.unloading.rule` is reworded, and `loose_pile_prefab` (capacity 9) is added.

**Live checks flagged**
- `docs/PLAYTESTS.md` gets a new protocol, **B11** (`recycle-unload`), using an Ice Pop Stand:
  - no loose pile in reach;
  - a matching loose pile 5–8 squares away (inside the 18-unit reach);
  - a Warehouse next door.
- It records where the new piles appear and how many are in each, the times, whether the crew uses a wheelbarrow, and whether the Stand's own workers do the unloading.
- `docs/INFORMATION-NEEDED.md` gets a matching row. The page's "Not tested yet" list says the same.

**Checks**
- Check 117 is new.
- Checks 92, 94 and 100 now pin the new worked examples.
- Research `tests/test_timing_model.py` pins them too, with a new `timing_model.unload_split_seconds`.
- Research `docs/RECYCLING.md` and `tools/export_recycle_stock.py` notes are corrected.
