## Mark a few fields at a time (2026-11-09)

The maintainer reported from play that Farm, Orchard and Foresters' Hub workers finish all their tilling before they begin planting, so it is better to mark a small amount of what you need (e.g. Wheat), get it growing, and then mark the rest. They were not sure which page it belonged on.

**Checked against the game data (version 30 decode)**
- `BuildSiteBuilderBehaviour` exists on exactly these workplaces: the Farm, Greenhouse, Orchard (both versions), Foresters' Hub (both versions), Oasis and the Roadworks Office. Its `Buildables` are their field and tree build sites. So a marked field is a build site, and the workplace's own workers build it (the tilling).
- Villager activity importance:
  - `ActivityExtractResource` (harvesting/extracting): 0.92;
  - `ActivityWorkOnBuilderWorkplace` (working a build site): 0.91;
  - `ActivityWorkOnWorkplace` (workplace work such as planting at a field's sowing spot): 0.90.
- So while any marked plot is unbuilt, a worker picks it over planting. That matches the report.

**Where it goes**
- The behaviour belongs to the workplace, so the tip is on the five planter workplace pages:
  - fields: Farm, Greenhouse, Oasis;
  - tree plots: Orchard, Foresters' Hub.
- A general version is at the top of the Plants directory.
- Observation `planters-prepare-all-plots-first` (on the Farm) records the play report with the decoded reasoning.
- The Roadworks Office follows the same rule for marked road tiles but is not mentioned; the report was about planting.

**Seedlings** (follow-up from the maintainer: at the Orchard and Foresters' Hub the workers have to raise seedlings, which takes time too)
- Each tree planter has a two-step seedling recipe:
  - a worker starts a seedling (` -> GrowingSapling`, 15.53 s timeline);
  - it grows with no worker (`GrowingSapling -> Sapling`, 128 s timeline; 0.43 of a 300 s game day) in one of 16 beds.
- The buildings: Orchard (formulas 296905/277797), Foresters' Hub (296907/277799) and Oasis (303468/297818). The old Orchard/Foresters' Hub prefabs have 4 starting spots.
- Copied into `decoded-mechanics.json` as `seedlings` from the version 30 decode (timelines via `export_work_timings.Game`).
- Starting a seedling is workplace work (0.90), so it also waits behind plot preparation (0.91). The tree-planter tips and the Plants tip say so.
- **Seedlings ahead of time** (maintainer, from play): with no plots to prepare, workers start seedlings ahead of time. An earlier draft advised building the planter and letting it fill its beds before marking plots. The maintainer corrected this as a bad tip: the fastest way to get trees in the ground is to prepare a few plots and then let the workers start seedlings, since they plant each one as soon as it is ready. The tips now say that.

Check 110 covers the tip, its placement and the observation.
