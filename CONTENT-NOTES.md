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
