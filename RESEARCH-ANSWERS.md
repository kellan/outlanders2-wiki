# Research answers for the companion branch

Inspected request list: `origin/wiki-companion-improvements:docs/INFORMATION-NEEDED.md` at `92b3e05b`, 2026-10-25. Game version **30 (build 254)**, installed macOS build, Unity 6000.3.17f1.

Publication of this handoff and `research/production-findings.json` to `kellan/outlanders2-wiki` on `codex/research-answers` was explicitly approved by the maintainer on 2026-10-25. Historical checkpoint notes below describe the earlier approval wait.

This handoff distinguishes decoded facts, modeled capacities and player reports. It does not close a request merely because a partial answer exists. Updates will accumulate on `codex/research-answers`; monitor that branch alongside the request list. The local wiki has production profiles attached to building records and a reader-facing renderer; avoid replacing the companion branch’s separate `gameplay` fields when integrating.

## Harvest yield per crop — answered for all edible field definitions

Follow FieldBehaviour → PlantTemplate → plant workspot → actual harvest formula. Multiply output per plant by `PlantedParents` count. Use the linked sapling stages for configured growth days. The field-level placeholder harvest formula is not enough.

| Crop (building ID) | Yield per full field | Growth days | Growth-only yield/day | Field / sapling / harvest formula IDs |
|---|---:|---:|---:|---|
| Beet (71099) | 2 | 7 | 0.286 | 301463 / 278045 / 297896 |
| Cabbage (71093) | 1 | 4 | 0.250 | 301457 / 278047 / 297894 |
| Carrot (71098) | 3 | 9 | 0.333 | 301462 / 278046 / 297902 |
| Cauliflower (71097) | 1 | 4 | 0.250 | 301461 / 278044 / 297897 |
| Corn (71100) | 2 | 7 | 0.286 | 301464 / 278042 / 297903 |
| Eggplant (71095) | 2 | 7 | 0.286 | 301459 / 278050 / 297904 |
| Onion (71092) | 3 | 9 | 0.333 | 301456 / 278053 / 297898 |
| Potato (71094) | 3 | 9 | 0.333 | 301458 / 278048 / 297899 |
| Pumpkin (71091) | 1 | 4 | 0.250 | 301455 / 278040 / 297901 |
| Pumpkin (99686) | 1 | 4 | 0.250 | 288141 / 282311 / 292321 |
| Tomato (71096) | 3 | 10 | 0.300 | 301460 / 278043 / 297893 |
| Watermelon (71090) | 1 | 4 | 0.250 | 301454 / 278052 / 297895 |
| Wheat (58425) | 1 | 12 | 0.083 | 310460 / 285623 / 320438 |

These are configured growth-only yields. Planting, harvesting, walking and replanting add time; do not promise that a field delivers on exactly that calendar interval. Three empty/template fields have no PlantTemplate and are not edible crop definitions.

**Carrot trace:** FieldBehaviour 301462 has three planting positions and PlantTemplate 310267. SaplingBehaviour 278046 has four stages of 2.25 days. Plant workspot 281350 uses formula 297902, output one carrot (Veggie 300127, Carrot variation 280203). Therefore **3 carrots / 9 configured growth days**, not 1 carrot per field.

## Production time and day length — substantial partial answer

**One game day is 300 simulation seconds.** `Clock.SecondsInDay = 300` is recovered both from the constant declaration and metadata field 2790 (`82 58`, Unity compressed signed Int32). Native `WorkspotBehaviour.<DoTimeline>d__55.MoveNext` (ARM64 RVA 0xA901D4, length 0x65C) waits for director duration against `ClockSystem.Seconds`. These are not wall-clock seconds at every speed setting.

The new `extract_production_evidence.py` tool in the research workspace resolves **1,458 workspot/formula links and 170 Timeline assets**. Thirty-seven directors have null playable assets and remain unresolved. Unity’s serialized fixed-duration field is ignored for clip-based timelines: using it unconditionally gives wrong answers (the Cheesery's wet-to-dry step is 1 second by clip duration, although its inactive fixed field is 6.5).

Selected useful results:

| Building | Verified finishing output | Fixed stage | Implication |
|---|---|---|---|
| Glassworks (105728) | 1 pane per finished crucible, formula 304524 | Cooling: 80 seconds (0.267 day), two positions, formula 302107 | Cooling capacity ceiling 7.5 panes/day if continuously occupied; not achieved throughput |
| Cheesery (105730) | 6 cheese per wheel, formula 289355 | Aging: 400 seconds (1⅓ days), six positions, formula 286745 | Aging capacity ceiling 27 cheese/day; not six cheese every 1⅓ days for the whole building |
| Canteen Factory (105745) | 1 canteen, formula 321963 | Drying 90 seconds, three positions; oven 60 seconds, three positions | Drying ceiling 10/day before other constraints |
| Bottle Factory (105709) | 1 bottle, formula 311935 | Blowing 15.16667 seconds; oven 30 seconds, six positions | Requires upstream glass; oven duration is not whole-line throughput |
| Dried Meat Shop (105747) | 1 dried meat, formula 314771 | Drying 60 seconds, sixteen positions | Hanging timer unresolved; no complete daily rate yet |

Glass needs **2 sand per pane**, dug locally, and **3 sticks supply 2 fires**. The simple 3-sticks→2-panes balance hides the sand extraction. A warehouse next door does not eliminate digging. Cheesery source placeholder 295311 must be linked to actual cow milking formula 288621; the model includes that work. Six cheese is one finishing wheel; 12 cheese per stick combines two fuel-supported batches.

## Worker scaling and normalized rates

Do **not** multiply one-worker output by staffing without checking stations and passive timers. The current model uses 300 seconds/day, each building's configured work-window fraction, worker animation times, unique local intermediate recipes, and independent timed-station bounds. All outside supplies are already delivered and finished output is cleared; walking, handoffs, equipment changes, shared-space contention, after/first-use animations and runtime scheduling are excluded. Owned-animal extraction and sand digging remain intrinsic work. Capacity is the minimum labor/station bound; it is a comparison ceiling under these assumptions, not measured output or a food-planning guarantee.

Examples: Glassworks model ~5.89 panes/day with one worker, 7.5 with two; Cheesery ~19.17 portions/day with one, 27 with two. These are steady-state models, not the time until the first batch. Worker actions crossing shift boundaries and shared oven exclusions still need controlled tests. Several fields store zero work iterations despite having a work animation; zero must not automatically mean zero elapsed time.

The compact `research/production-findings.json` accompanies this handoff with all building summaries. Unresolved alternative recipes, off-site source collection, missing timers and partial-output cycles have **no numeric daily estimate**. Do not reinterpret a finishing-step output as the field guide's entire recipe batch: Bakery's final bake step produces 2 Bread, while one Flour flows through multiple sub-batches to 8 Bread.

## Chicken Coop — gameplay report, not independently confirmed total

Maintainer reports **up to 5 eggs per coop/day, fixed regardless of assigned workers**. Preserve this as player-report evidence. Formula 282694 is spawned egg → collected egg, with a ~5.3-second collection action; it must not be used to infer 34 eggs per worker/day. Cleaning takes worker time as well. The coop owns its chickens. Adult chicken config 303909 stores extraction interval 60, but population and extraction fields alone do not prove total laying output. The two `MaxSpawned=5` spawners under the coop spawn manure, not eggs.

## Orchard plants — establishment and regeneration separated

Initial growth is now linked for every planted tree. Felling outputs are **not** fruit harvest yields. Native SpawnerSystem (RVA 0xAC8E54) schedules against `Clock.Days`, confirming interval units. E.g. the apple spawner stores an interval of 1.65–2.5 days and standing cap 4. **Do not divide cap by interval** to infer fruit/day. Spawn quantity, blocked accumulation and collection still need tracing. Plant profiles preserve these intervals and caps for follow-up.

## Output storage — useful evidence, still unresolved effective limit

The decoded cache actually contains ResourcePileBehaviour `PileConfig`, `ReferenceResource`, public-output flag and related references. This is sufficient to export candidates, but a sum is not yet a verified building limit.

- Bakery 57395: Bread 319667 appears in four public output piles **277583, 287164, 311412, 313966**, each storing Capacity **15**. A naive sum is 60, which disagrees with the maintainer's reported stop at 40. **Do not replace the report with 60.** Check active pile variants, reservation/occupancy, physical layout and stop conditions.
- Glassworks 105728: public pane piles **289408, 290642**, each configured Capacity **24**. 48 is only a nominal sum pending the same runtime checks.
- Cheesery 105730: public pile **313277** stores Capacity **36**, but ReferenceResource is null; trace its category/storage use before labeling it a cheese-only capacity.

All seven listed pile records have now passed fresh exact byte-for-byte round trips against the installed game. Next investigation: inspect `ResourcePileBehaviour.CanAdd` and active object hierarchy, then compare a filled building in gameplay. This request remains open.

## Hauling and work schedules — partial answers

A general VillagerConfig `WalkCarryingMultiplier` of about 0.8 is present. Carry animation/mount, containers, equipment and level effects can vary. No material-specific mass field has been established, so do not assert that all materials haul identically, or that all can go in warehouses. The supplied-capacity model intentionally excludes every outside hauling route.

Normalized work-window lengths can be computed: Glassworks 0.9→0.5 and Cheesery 0.95→0.55 are each 0.6 day (180 simulation seconds). The wall-clock/time-of-day origin and sleep claims still need confirmation; a different start does not prove longer sleep.

## Requests still open

Construction repetition/alternatives; equipment wear and speed effects; normal-play variant availability; resource variation matching; trade semantics; full fishing/trapping partial-output cycles; remaining icons; environmental growth effects; normal-play crop availability; need consumption/decay/happiness; aging/population; leader magnitudes; campaign/menu/unlock rules; live challenge schedule and release availability; portraits; second-build history. Continue prioritizing requests marked `mine`, without promoting inferred numbers to verified gameplay facts.

## Reproduction and evidence preservation

Research tools: `tools/inspect_asset_records.py`, `tools/extract_production_evidence.py`, `tools/timeline_reader.py`, `tools/build_production_profiles.py`, `tools/apply_production_profiles.py`; methodology in research `docs/PRODUCTION.md`. Fresh field/animal/spawner/hauling records require exact byte-for-byte round trips. Timeline parsing checks serialized layout and duration mode. Cpp2IL provides RVAs/offsets; native disassembly establishes clock behavior. Do not distribute the game binaries, dummy assemblies or full disassembly.


## Follow-up: gear effects requested on 6d285475 — 2026-10-25

Monitored request revision `origin/wiki-companion-improvements` at `6d285475`. New requests include gear effects, social-spot heat/cooling effects, a controlled cold test, clock origin, and historical version gates. The branch now requests answers through GitHub issue 10; that is an external publication destination, so these findings remain local pending human authorization. No issue comment has been posted.

All seven ResourceGearBehaviour records were freshly decoded from the installed build and passed exact byte-for-byte round trips. Names come from their linked GameObjects; NeedType values come from the game's enum.

| Gear | Component ID | Need affected | Stored BaseValueIncrease | Stored Base / Road speed multipliers | Adults only |
|---|---:|---|---:|---|---|
| Swimsuit | 276759 | None | 0 | 0.00 / 0.00 | No |
| Ukulele | 297368 | Community | 79 | 0.00 / 0.00 | No |
| Coat | 297369 | Heat | 129 | 0.00 / 0.00 | No |
| Boots | 297370 | None | 0 | 1.40 / 1.20 | Yes |
| Book | 297371 | Entertainment | 79 | 0.00 / 0.00 | No |
| Canteen | 297372 | Refreshment | 79 | 0.00 / 0.00 | No |
| Pendant | 297373 | Wellness | 79 | 0.00 / 0.00 | No |

This establishes that the **Coat targets Heat**, whereas **Boots target movement and are adults-only**. Boots store Base=1.4 and Road=1.2; the fields do not by themselves establish how road, carrying and other bonuses compose. Coat stores BaseValueIncrease=129, but this must not be described as 129 warmth points restored on equip, a drain-rate reduction, or a survival duration without tracing how the value is applied. Zero speed fields on other gear should not be interpreted as stopping movement. Canteen targets **Refreshment (7), not Hydration (8)** in this configuration.

Swimsuit's inspected config has Need=None, zero increase and zero speed fields; this is not evidence that every possible runtime swimsuit effect is absent. Social-spot effects, cold-test timing and application of these base values remain open.

Reproduce with `tools/inspect_asset_records.py` and IDs 276759, 297368–297373. Full round-trip records and hashes are stored locally at research `work/production-evidence/gear.json`; structured summaries are included under `gear_findings` in the companion handoff JSON.


## Monitor checkpoint — 2026-10-25 20:28 UTC

Checked `wiki-companion-improvements` at `9c6aa633`. No new factual research rows since `6d285475`. The branch now prefers appended, templated entries in `docs/INFORMATION-ANSWERS.md` on that branch, with issue 10 as fallback. This destination preference is recorded for integration; it does not authorize a remote write. Existing findings remain local while the publication approval is pending.


## Terrain placement codes — requested on bbb5fc90, answered 2026-10-25

- Status: new (local; not published)
- Row: Names of terrain codes 1 and 2 in placement rules (Bridge allows 3, 1, 2; Fishing Dock and Swimming Pier store no ground terrain)
- Fact: The global `TerrainType : byte` enum maps **0=Invalid, 1=Water, 2=Sand, 3=Soil, 4=Mountain**. Bridge's `[3,1,2]` therefore means Soil, Water and Sand; code 2 is specifically Sand, not a generic shore category.
- Target: Placement rules / Bridge
- Obtained by: decoded data
- Conditions: serialized enum mapping, not a placement gameplay test
- Game version: 30 (254)
- Date: 2026-10-25
- Evidence: Installed `global-metadata.dat`, global TerrainType type index 1262, metadata fields 5060–5064. Their default data bytes independently read `00 01 02 03 04`; Cpp2IL declaration agrees. `LocationConstraints.ValidTerrains` is `List<TerrainType>` in the global namespace.
- Confidence: confirmed for enum names and values
- Notes: There is also a different `Pomelo.O1.TerrainType : int` enum, where Sand=1 and Water=2. Do not use that older/namespaced mapping for these placement fields. An empty ValidTerrains list does not by itself mean “water only”; other tile/footprint constraints and runtime rules still apply. The newly listed 35 levels with empty scene names remain unresolved and need a separate source or gameplay observation.


## Monitor checkpoint — 2026-10-25 20:48 UTC

Checked `wiki-companion-improvements` at `b13e58f1`. The branch records its maintainer's observation that Tournament Mode is live with Rural running, and adds a season-history/reward/end-date request. This is branch-provided gameplay evidence, not an independent finding from this mining session. Packaged season/style definitions alone cannot establish historical run dates, the currently selected reward set or the live end date. Keep Egyptian/Imperial availability unconfirmed absent menu or official evidence. No existing local crop, gear or terrain finding needs revision from these changes.


## Monitor checkpoint — 2026-10-25 21:28 UTC

`origin/main` and `origin/wiki-companion-improvements` now both point to `c52f884a` (merge of PR 13). The request and answer documents are unchanged from `b13e58f1`; no new factual requests or answers require action. Continue checking both main and companion branches for subsequent request changes. Publication authorization for this local handoff is still pending.


## Social-spot effects and secondary meal benefits — requested on c119dbec

2026-10-25, game 30 (254). Freshly decoded and exactly byte-round-tripped 118 SocialSpotBehaviour, 10 SocialPlaceBehaviour, 9 SocialEatingPlaceBehaviour, and 1 WorkspotCompleteModifyNeed records. Full local evidence: research `work/production-evidence/social-spots.json`, including hashes and hierarchy roots.

The missing secondary meal values **are present on the buildings' eating spots**, even where the food resource stores Food only:

| Building | Representative spot ID | Stored need units | Stored Duration |
|---|---:|---|---:|
| Open Kitchen / Stew | 276989 | Community 4 | 6 |
| Porridge Cookhouse | 277041 | Community 1 | 6 |
| Desert Cookhouse / Manchamanteles | 276991 | Entertainment 4 | 6 |
| Fondue Bar | 292958 | Entertainment 4 | 6 |

These are linked building instances, not similarly named standalone template prefabs. The corresponding SocialEatingPlaceBehaviour records are 314241, 314244, 314243 and 301747. `DisableChooseForCommunity` is set on the first two and `DisableChooseForEntertainment` on the latter two. Do not interpret those selection flags as proof that the benefit is disabled.

This supports the maintainer's hypothesis that the bonus comes from eating at the cookhouse, but the consumption/application code and an off-site meal test are still needed to prove exactly when the benefit is awarded and whether the dish carries it elsewhere. These values are **serialized need units, not demonstrated percentage-point gains**. Duration is recorded as a raw configuration value here; no per-second rate is inferred.

Other requested social buildings:

| Building | Representative component ID | Stored effect | Stored Duration |
|---|---:|---|---:|
| Communal Plaza | 287234 | CommunityUnits 1.2 | 5 |
| Playground | 282765 | EntertainmentUnits 1.2 | 10 |
| Zen Garden | 298517 | WellnessUnits 1.3 | 13.33334 |
| Fitness Park (internal Park, building 35463) | 279820 | WellnessUnits 6 | 12 |
| Swimming Pier | 277411 | EntertainmentUnits 6 and RefreshmentUnits 6 | 10 |
| Bonfire | 320423, WorkspotCompleteModifyNeed | HeatUnits 2 | Not a SocialSpot Duration field |

Bonfire social-spot configs themselves store zero need units; the HeatUnits=2 field is on **WorkspotCompleteModifyNeed** instead. That identifies a different application path worth tracing, and means zero social-spot values cannot establish no heating effect. Winter Cabin stove behavior remains unresolved.

Confidence: confirmed serialized values and building links; partial interpretation of runtime benefits. Requests answered in part: “Where the second effect of dishes lives” and “How much a social-spot building raises its need”. Do not close the conversion-to-gameplay-amount request yet.


## Issue #10 publication and monitoring

The maintainer authorized publishing to both the research branch and issue #10. The following answers are now posted; historical approval-wait notes above are superseded.

- [Harvest yield per crop — answered for all edible field definitions](https://github.com/kellan/outlanders2-wiki/issues/10#issuecomment-6405315176)
- [Production time and day length — substantial partial answer](https://github.com/kellan/outlanders2-wiki/issues/10#issuecomment-6405315806)
- [Worker scaling and normalized rates](https://github.com/kellan/outlanders2-wiki/issues/10#issuecomment-6405316303)
- [Chicken Coop — gameplay report, not independently confirmed total](https://github.com/kellan/outlanders2-wiki/issues/10#issuecomment-6405316937)
- [Orchard plants — establishment and regeneration separated](https://github.com/kellan/outlanders2-wiki/issues/10#issuecomment-6405317435)
- [Output storage — useful evidence, still unresolved effective limit](https://github.com/kellan/outlanders2-wiki/issues/10#issuecomment-6405318044)
- [Hauling and work schedules — partial answers](https://github.com/kellan/outlanders2-wiki/issues/10#issuecomment-6405318622)
- [Follow-up: gear effects requested on 6d285475 — 2026-10-25](https://github.com/kellan/outlanders2-wiki/issues/10#issuecomment-6405319246)
- [Terrain placement codes — requested on bbb5fc90, answered 2026-10-25](https://github.com/kellan/outlanders2-wiki/issues/10#issuecomment-6405319744)
- [Social-spot effects and secondary meal benefits — requested on c119dbec](https://github.com/kellan/outlanders2-wiki/issues/10#issuecomment-6405320280)

The monitor now checks issue #10 and its comments, the wiki request documents, and the research repository's `decode-targets:docs/DECODE-TARGETS.md` priority list. Remaining questions are kept open until evidence supports an answer.
