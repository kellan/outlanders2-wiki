## The challenge archive: 260 Original, Redux and Bounty levels (2026-10-28)

The local agent walked Challenges → Archive and decoded every level in the game's download cache. Its catalog is in the research repo at `data/challenge-archive/2026-10-28/catalog.json` (commit eec610f). `scripts/import-challenge-archive.mjs` turns it into one level record per batch in `content/challenges/`. The id is `<asset>-<batch date>`, because five Redux assets ran twice in the year.

**What the data shows:**
- **One full cycle:** one batch per day from Wed 2 Apr 2025 (`Challenges.InitDate`) to Tue 31 Mar 2026. That is 260 levels: 52 Original, 104 Redux and 104 Bounty. 260 is exactly `LevelsPerCycle`.
- **Weekdays decide the type**, with no exceptions: Monday and Wednesday Bounty, Tuesday and Thursday Redux, Friday Original.
- **Filled-in gaps:** the agent mapped 130 levels to the menu. For the rest, the type comes from the weekday and the archive number from batch order. The importer stops if either disagrees with a menu-mapped value, and none do.
- **Repeat runs:** each level runs again 364 days later, on the same weekday. The maintainer confirmed this: on the morning of 28 Oct 2026 the live Redux was still "Save the Forests" Redux, whose batch is dated 28 Oct 2025. Challenges roll over at 2pm Eastern, so the 27 Oct challenge ran until 2pm on the 28th. Recorded as observation `challenge-rollover-2pm-eastern`.

**The acceptance question:** "Save the Forests" Redux (#150) starts with **268 Dead Trees**, and one main objective is to have at least 222. The game files name the prefab "Halloween Tree", but its text key is `Tree.DeadTree`. It first ran on Tue 28 Oct 2025, came back on 27 Oct 2026, and runs next on 26 Oct 2027.

**Reference resolution:**
- Build-list, objective and starting-object references resolve through the packaged scenarios' GUIDs.
- A few buildings appear only in the downloaded levels: the Halloween Plaza, Fountain and Playground, the Rose Planter, Hanging Garden, Giant Wheel and Berry Bush. These resolve by their prefab name in the building asset paths.
- What stays unnamed is internal: villager spawners, build sites, and 113 nameless prefabs.
- **Also fixed:** objective targets now fall back to the building with the same text key, so "Halloween Tree" shows as Dead Tree. This also tidies a few packaged levels.

**On the site:**
- **Level pages** live at `challenges/<type>/<name>/`, with a batch-date suffix when a title repeats.
- **Each type page** has a sortable table with columns for archive number, first run, next run, goal, day limit and starting villagers.
- **Redux levels** link the level they're a version of.
- **Bounty levels** show their scoring goal; their objective lives in the leaderboard settings, not the win conditions.
- **Building and mechanic pages** list these levels in a collapsed "Original, Redux & Bounty challenges" group.
- **Site-wide counts now include them.** For example, Heat is on 136 of 390 levels.

**Still unverified, as the agent flagged:**
- Starting resources and buildings are stored entities, not checked against the level in play.
- The downloaded headers leave the leader empty.
- Archive numbers for unmapped levels come from batch order.
- Every live level page says so.

**Size:** `data/world.json` grows from about 260 KB to 625 KB gzipped. The browser caches it after the first page.
