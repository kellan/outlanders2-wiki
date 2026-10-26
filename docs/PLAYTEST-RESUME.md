# Playtest resume — 26 October 2026

Paused at the user’s request for shutdown. Do not interpret this checkpoint as completion of all PLAYTESTS tests.

## Where the work lives

- Findings and original strategy: `docs/INFORMATION-ANSWERS.md`.
- Protocol: `docs/PLAYTESTS.md`; question inventory: `docs/INFORMATION-NEEDED.md`.
- Screenshots: `assets/gameplay-evidence/`, including full-screen Field guide PNGs under `fieldguide/`. Preserve these for the user’s later wiki design feedback, including typography and layout, not just extracted numbers.
- Wiki checkout: `/Users/kellan/proj/outlanders2-wiki`, local branch `wiki-companion-improvements`. Latest observation commit before this handoff: `d05fbfac`.
- Authorized publication destination: **outlanders2-research**, branch `codex/playtest-observations`. The user explicitly chose “Copy and push to research”; do not push the wiki branch instead.
- Publication worktree: `/private/tmp/outlanders2-playtest-publish`. If temporary directory is gone after restart, recreate a clean worktree from the remote research branch. The primary research checkout has unrelated uncommitted work; do not stage it.
- Research branch: https://github.com/kellan/outlanders2-research/tree/codex/playtest-observations . Earlier pushed checkpoints: `572d8eb`, `45125e9`. The final shutdown checkpoint adds this file and the fishing limitation.

## Completed observations and limits

- A1: substantial partial Field guide archive. Four prior buildings plus two new batches (9 captures/building variants, then 29 building guides). Some overlap, especially Greenhouse. Do not claim all 63 captured. The log lists filenames. Missing biome-specific producers and nonproduction entries remain.
- A2: sunset remains on the same day; day counter increments at dawn, bracketed by late-night/daybreak images. Exact stored fraction mapping and precise full-day wall-clock duration are not established.
- A3: Campaigns 1 and 2, all seven stories each and their three levels, recorded in order. Campaign 3 shows Fjordi’s Birthday and its three levels. The 19 archive-map mapping and three additional Campaign 3 levels remain unresolved.
- A4: current Rural tournament and all 14 visible rewards captured; countdown showed 10 days, not an exact calendar end date. Challenge introductory rules and some archive cards captured. Full season history/type rules remain incomplete.
- A5 Drylands: Oasis guide/menu, full crop/tree choices, Foresters’ Hub availability and Mesquite coverage captured. Oasis alone did not highlight Mesquite planting coverage; Hub did. Actual Mesquite planting never accepted, so this remains likely, not proven by a worker action.
- A5 Winterlands: Greenhouse guide and crop choices captured. Fresh Cabbage plot inside Greenhouse accepted; outside snow invalid. No growth-time measurement.
- A6 complete for Basic House: partial site with 3 of 6 Logs delivered returned all 3; finished 6-Log house returned 3 (50%). Before/after counts and panels saved.
- B1 five-day observation complete, with limitations: 9 villagers consumed 36 food units from day 1 early dawn to day 6 early dawn, with no production or kitchen. Finite starting-window mean 0.8 per villager per displayed day is **not** a steady-state rate. Hugo’s observed meals: day 1 early night Fruit; day 2 early night Veggie; day 4 dawn Veggie; day 5 morning Fruit. Panel exposes graphical food meter, not requested text statuses. No exhaustion/hunger warning; no controlled five-eater equal-reach preference comparison. Those parts remain open.
- B2 attempted setup only: Fishing Dock available for 18 Planks in Tropiclands. Repeated placements, rotation, different shoreline and reload left Build disabled. Small colored tiles showed, but no useful complete preview. **No dock built, no casts counted.** Do not infer biome incompatibility or yields from this failure.
- B3–B9 not performed. Keep the long tests open rather than treating decoded estimates as observations.

## Saved towns (never overwrite the user’s original town)

1. **Untitled Town** — USER SAVE, 13 population, day 42. Untouched.
2. **Playtest Drylands** — Miranda first appearance, Drylands / Great Mesa / medium, average population 9, abundant starting resources, Autobuild ON. Day 1 night. Oasis and Foresters’ Hub built, one worker each; Mesquite not planted. Paused when left.
3. **Playtest Winterlands** — Pablo, Winterlands, 9 population, abundant resources, Autobuild ON, day 1. Greenhouse planting validation town.
4. **Playtest Refund** — Jaqweshia third appearance, Evergreen / Large Islands, abundant resources, Autobuild OFF, day 3. Refund trials finished; house demolished. Paused.
5. **Playtest Meals** — Maira first appearance, Evergreen / Large Islands / medium, average population 9, abundant resources, Autobuild OFF. Day 6 dawn, 18 Veggies left, no Fruit, no buildings, all unemployed/unhoused. Hugo age 39 at endpoint. Paused.
6. **Playtest Fishing** — Miranda first appearance, Tropiclands / Large Islands / medium, population 9, average trees/rocks/reeds, abundant resources, Autobuild ON. Day 1 morning; no buildings. Paused, then returned to Main Menu for shutdown.
7. Empty slot became visible after creating slot 6; there are more than six slots. Use a fresh slot for subsequent timed tests.

All observed towns inherited the account’s Rural style. Record it as a condition. Game version 30, build 254 came from installed application metadata; inspected Settings did not expose a visible version label.

## Recommended next session

1. Read PLAYTESTS and the latest answers; verify installed version and inspect current UI. Resume B2 by checking a valid dock placement, ideally an existing coastal campaign dock if sandbox placement remains difficult. Do not spend another long session repeating identical disabled placements. Record any replacement map/leader before measuring.
2. B2 requires a full crew and 20 casts **per fishing spot**, with output counts per cast. No observations toward that quota exist yet.
3. Continue cheap A1/A3/A4 gaps where possible. Save full guide images for design feedback, and top/cost screenshots when a guide scrolls.
4. Continue B3 onward in protocol order, one timed test per separate session/map. Normal speed only. B3 needs Carrot, Wheat, and Apple first harvest plus five fruit intervals; B4 three days of named Plaza/Kitchen visits; B5 three days of Bakery counts; B6 cold comparisons; B7 family movements; B8 twenty-day planted-tree spread; B9 day-limit endpoint and crew sleep. A5/B4 may share a map as explicitly allowed.
5. Pause for notes. Append template entries with `Status: new`, exact question row, conditions, evidence and honest confidence. Commit useful batches locally, copy log and new evidence into research publication worktree, commit and push that branch. Do not edit wiki `content/` or mark open questions answered.

## Computer-use notes

- App bundle ID: `com.pomelogames.Outlanders2`. Use CUA for all game interaction. After restoring a compacted session, call `cua.rewriteDocumentation()` before continuing.
- Current game window screenshot is 2880×1800. Archived/inspection images were resized to 1440×900; multiply displayed coordinates by two for native clicks. Verify dimensions after restart.
- AX exposes only a standard window, not game controls. Use screenshots. Fetch AX state after actions. Menu transitions sometimes need a fresh observation before the next click; rapid chained clicks can miss confirmation dialogs.
- Pause button native approximately (82,216): brown selected means paused; white means running. Do not click fast-forward at (180,216). Game simulation can stop when the game is not foreground; avoid assuming elapsed wall time equals simulated time.
- Toolbar: plants (1322,1733), build (1440,1718), recycle (1555,1733), options (1647,1733). Options Main Menu (2440,1683), confirmation Yes (1600,1009). Re-observe before relying on these.
- Build category tabs: Construction (2085,1105), Food (2182,1113), Housing (2278,1113), Infrastructure (2370,1113), Lifestyle (2465,1113), Decoration (2560,1113). Magnifiers near x2785. Scroll list to find entries; bottom clamps change row positions.
- Field guide close (1794,137); scroll inside card around (1660,1410). Scroll offset can persist between cards. Capture top and bottom if required for recipe/cost/slots.
- For fleeting action evidence, save the exact screenshot already inspected, not a second screenshot several seconds later. The log explicitly distinguishes the first meal’s live observation from its later saved frame.
- Screenshot bytes from getScreenshot may be JPEG even if saved with .png suffix. Convert with sips to true PNG and resize to 1440 wide. Do not use filesystem or shell operations to control the UI.

## Shutdown state

All latest observations are recorded, including the failed fishing setup. No timed test is currently running. The fishing town was paused and the game returned to Main Menu. Resume deliberately; do not treat time spent shut down as part of any experiment.
