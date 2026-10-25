## 25 October Tournament Mode page

A Tournament Mode page (navigation and home) is built from the FastMode, FastSeasons and FastModeTutorial text tables: what the mode is, how a level plays (three tiles a day, the bag, skipping for tokens), the tile effects, reward points, streaks, streak shields and leaderboards, and the season styles with their reward sets. Nordic and Mesoamerican carry 21 entries each including palettes, restyled buildings and villager styles. Egyptian, Imperial and Rural are stored as names only; they are withheld as related-release-unconfirmed in `spoilers.json` (new spoiler type `tournament`, validated against the season style keys) and appear on the Spoilers page and the spoilers/tournament/ view. Whether the mode or any season is live on this installation has not been checked; the page says so and the information-needed list has the row.

## 25 October naming: FastMode is Tournament Mode

`FastMode` is the game files' internal name for Tournament Mode (`FastMode.Name` = “Tournament”, `FastMode.Menu.Name` = “Tournament Mode”; the FAST_ tutorial levels are the Tournament Tutorial). Player-facing pages now say Tournament Mode and mention the internal prefix once; dataset keys such as `fastmode_supply_chain_validation` keep their names.

## 25 October stored-configuration additions

Six previously unused decoded fields now render, each labelled as stored configuration: the level scene name gives a biome for 98 of 133 levels (level fact grid, level catalog column, and a Levels section on biome pages; Christmas and precipice scenes map to Winterlands with a note); starting conditions on level pages summarise villagers, pre-built buildings, stockpile, tools and crates from the starting objects; a Needs page lists what satisfies each need from resource units, with level counts and biome hazard text; Wine, Mead, Beer and Wheatshine show their stored adults-only limit; gathering buildings show the map source category they harvest from (rock sources, wood trees, fruit trees and bushes, reed plants, planted fields, cows); placement rules show terrain, slope tolerance and zone connection on building infoboxes; biome pages show sandbox spawn densities. Terrain codes 1 and 2 and the 35 levels without a stored scene are new rows in the information-needed list.

## 25 October version history

Issue 6: `content/history.json` records dated, evidenced changes per entity; entity pages show a History section and a Changelog page groups entries by update. Backdated from the App Store version history already in `availability.json`: the leaders Jelena (update 8), Cory (12), Kaia (13), Chico (14), Izzy (16), Maira (18) and Fjordi (21) and the levels of their stories, plus Pablo's Lost (update 20). Levels and buildings have no other decoded release marker: `MinGameVersion` gate fields are declared but their values were not decoded, and the Single00 to Single08 identifier batches and the August/October localization tables suggest content batches but do not name updates. `scripts/compare-content.mjs` diffs two content trees for the next build.

## 25 October level strategies

Issue 3: level pages gained a Strategy section fed by `content/strategies/<level id>.json` and a level-strategy issue form that every level page links to with its name filled in. Records are validated against levels and buildings and rendered as community advice with status, contributor, version and date. One draft exists for The End of the World, written from the stored objectives and labelled as such.

## 25 October publishing from CI

`dist/` is no longer committed (issue 5). Game icons and evidence screenshots moved to `assets/`, which the build copies into `dist/`. The deploy workflow builds, tests and publishes to gh-pages on every push to main; the test workflow covers pull requests and other branches. Contributors submit only source changes.

## 25 October work schedules

The community observation that clay workers are late risers is in the data: `WorkplaceConfig.WorkTimeRange` stores a start and end fraction of the day per workplace. 53 workplaces use the standard 0.9 → 0.5 shift; the Clay Pit uses 0 → 0.6, a tenth of a day later at both ends with the same length. Foresters' Hub, Orchard and Quarry start equally late but finish on time (a shorter day); Cheesery, Chicken Coop, Fondue Bar and Roadworks Office run a twentieth of a day late; Beehive, Bonfire and Fitness Park have their own ranges. Recorded as the confirmed observation `clay-pit-work-schedule`; the sleep claim stays open. Building infoboxes now show Work hours relative to the standard shift, and the Buildings catalog has a Work schedules table. The clock origin of fraction 0 is still unknown.

## 25 October production model

Maintainer report: the Bakery takes 1 Flour and 1 Stick, makes 8 Bread, and stops at 40 Bread. The recipe is confirmed by the field guide and by the decoded graph (exactly 8 Bread per Flour; formula 297381 is named "1 Stick -> 8 KitchenFire" though its serialized output is 10). The capacity is not in the exported data because the pile and stockpile components were validated but never exported; it is recorded as a player report. Building records gained an optional `gameplay` block (`recipe_per_cycle`, `output_capacity`) that the renderer uses as the primary recipe and capacity; the formula-graph ratio remains as supporting detail. Tracked in issue 9.

## 25 October ratio correction and information-needed list

The maintainer reports that the Bakery holds 40 Bread; the decoded "5 Flour + 4 Stick → 40 Bread" was the smallest whole-number ratio of the formula graph, not a batch. Pages now show ratios per primary input (1 Flour + 0.8 Stick → 8 Bread) with a note that ratios are not batch sizes, capacities or rates. Recorded as `content/observations/bakery-bread-capacity.json`. `docs/INFORMATION-NEEDED.md` now tracks data the wiki lacks and how to obtain it; remove an item there in the same change that records the answer.

## 25 October companion layer

Article pages gained a Stardew-style companion layer on top of the existing evidence model: an infobox (type, footprint, cost, workers, housing, inputs, outputs, growth stage days, level count), a single verification badge linking to the research page, level-objective backlinks computed from scenario objectives, build/plant availability grouped by campaign and story with unnamed archive maps collapsed, story context and previous/next links on level pages, story and level lists on leader pages, footer navboxes, and per-page "Suggest an edit" and "Report a problem" links. Decoded formula steps on chain pages and starting-object tables on level pages are collapsed by default. The Properties aside and leader gameplay checks now move to the research page with the other provenance material. Navboxes and backlinks read the spoiler-scoped datasets, so spoiler entries stay out of public pages.

## 25 October update

All three unresolved batch-08 localization entries now match their packaged map files without the `08` prefix. All 133 catalog scenarios have decoded data. Verification and source details are in dedicated research pages. Crop names omit Field, and plant pages do not show construction inputs. Sandbox crop availability remains under review; use scenario planting lists.

## Scenario extraction update — 24 October 2026

Scenario binary decoding now supplies exact objectives, day limits, build/plant lists, need flags and starting prefab inventories for 133 catalog maps. All 438 objective records across the complete extracted dataset match their world copies. See `dist/data/scenarios.json`. Three localization-only entries remain unresolved: Single08_C_Desert, Single08_L_CaveCove, Single08_R_VillageWinter. Preserve gameplay observations; older pending notes about objective decoding are superseded by this update. Runtime unlocks, missing legacy need defaults, yields and production timing remain open.

# Content notes

All displayed gameplay claims still need live verification. Do not remove the gameplay status merely because a decoder roundtrip passes.

Normalized rules and world catalogs are checked into dist/data. The world catalog preserves duplicate localization entries; the UI groups objectives by identifier and displays alternate text versions rather than treating them all as simultaneous objectives.

Building and resource directories combine same-name definitions for easier browsing; detail pages expose their other variants and retain stable numeric source routes.

Production step listings follow source ID order. They are not a verified execution schedule. A derived balance is not a throughput estimate.

To add gameplay evidence, preserve game version, scenario, biome, leader, staffing, resource amounts and observed outcome. Update only the claim actually tested, and keep its original decoded source.

Availability now has independent evidence in dist/data/availability.json. Oona remains included, flagged as user-reported unreleased; related update-28 data has public-release-unconfirmed status. Missing status defaults to unknown, never to released. Biome sandbox assignments are in dist/data/biomes.json and are distinct from campaign or challenge overrides.

The `/index/` route is an alphabetical back-of-book index of every canonical page. Aliases are excluded from that index but are included in route validation.
