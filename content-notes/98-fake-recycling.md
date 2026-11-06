## Fake recycling (2026-11-06)

The maintainer described two common player tricks:
1. Mark a building for recycling but leave it unstaffed, so no one goes there (to save travel).
2. Mark a full building for recycling to get it unloaded, then cancel before it is demolished.

**Checked against the code (version 31)**
- `RecycleAction` → `RecyclableBehaviour.MarkForRecycling` and `RestoreRecycleSiteAction` → `UnmarkForRecycling`. Both move the crew between the building and the recycle site (`WorkplaceBehaviour.GetTransferData` / `InitializeFromOtherWorkplace`).
- While marked:
  - `WorkspotBehaviour.IsReadyForWork` checks `MarkedForRecycling`, so no production.
  - `WorkerBehaviour.CheckWork` fires workers whose workplace is marked.
  - `ResourcePileBehaviour.UpdateMap` checks it, so the piles leave the pile map.
  - Villagers' sleep, idle, social-spot, store and bring-to-workspot or house activities and house search all check `IsMarkedForRecycling`.
- Unloading is done only by recycle-site workers (`ActivityStoreResourceFromRecyclable`). With no crew nothing moves, and demolition (workspots with `RequireWorker`) never starts.
- Demolition waits for the kept piles to empty (`RecycleSiteWorkspotCondition` → `IsReadyToRecycle`). After that it is quick: 10 rounds of 0.65 s per spot, or 5 on 4x4 sites, plus a 1 s finish. Non-kept piles are destroyed only in `OnWorkspotComplete`.

**Changes**
- A "Fake recycling" section on the Recycling page, before the building table. It explains both tricks and the timing catch: cancel while an item or two remains.
- Times are read from the shared timing model.
- Observation `fake-recycling-tricks` records the maintainer's report.
- Check 98.

**Not checked:** whether the recycle can be cancelled while the game is paused.

**Timing tip (maintainer):** to know when to cancel, count the items left, or look at the building. The kept stock is drawn on the building, for example the Ice Pops on the counter. This fits the data: kept piles are visible piles (`PileVisualBehaviour`) on the building.
