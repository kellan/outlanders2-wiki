## Oona's update is live (2026-11-19)

**Source:** the maintainer reported "Oonas content is live" on 19 November 2026. It is recorded as observation `oona-update-live` (player report). Research main 9e39d2c updates the release watch. The version 32 game files are not in the research repo yet, so this change rests on that report. Everything shown is still from the version 31 files, where the content was gated to version 32.

**Lifted (25 spoiler entries):**
- Oona and her three levels (Campaign3_Level2A–C: Clause, Copies, Chaos);
- the Wetlands biome (Swamp);
- the mushroom chain: Concoction Shop, Stroganoff Cookhouse and their chains, and nine resources;
- the Swamp Trappers' Hut (building and chain) and its two trap resources;
- the Advanced Warehouse (building and chain);
- the Brick Road used in her levels (116136).

`availability.json` marks Oona and the Wetlands `user_reported_released`. Her levels inherit that status, and pages show "Released · maintainer report".

**Still held** until the version 32 files confirm them:
- the non-recyclable Brick Road (78175);
- the Cypress and Willow trees, which no level or sandbox in version 31 lets you plant;
- the tournament seasons.

Their reasons now say Oona's update is out but these are not confirmed in it yet.

**Follow-on changes**
- **Mushroom spawners.** Twelve trees (fruit trees, Ash, Pine, Dead Tree) have a mushroom spawner that had been hidden with the chain. Unhidden, it became the Apple Tree's main yield and rate.
  - Mushroom spawners now show under "Also", with a note that it isn't checked whether they work outside the Wetlands.
  - Fruit stays the main yield and the rate.
- **Maps.** Her three levels get maps; the export now makes 133.
- **Achievements.** Let Them Cook! and Bottoms Up! are no longer held back; all 41 achievements now show.
- **Checks.** Many checks used Oona as the example of hidden content. They now use the Cypress and Willow trees, and assert that Oona's content is public:
  - `check.mjs`, `check-companion` (including the changelog test, which no longer forbids naming Oona), `check-contributions`;
  - per-change checks 83, 85, 88, 114, 115, 116 and 118.
  - Check 116 is rewritten for the release.
