## 26 October analytics

Plausible analytics snippet added to the page template at the maintainer’s request; it is the only script the published pages load.

## 26 October research handoff recorded

The research agent published decoded answers on issue 10 and the branch codex/research-answers; `research/production-findings.json` is imported whole as `content/reference/research-findings.json` with a provenance block. Recorded: one game day is 300 simulation seconds (shift lengths now shown in seconds); TerrainType 1 Water, 2 Sand, 3 Soil, 4 Mountain (placement rows reworded); gear stored effects (Coat Heat 129; Ukulele, Book, Canteen, Pendant 79; Boots walk ×1.4, ×1.2 on roads, adults only; Swimsuit none) on resource infoboxes and the Needs page; social-spot and eating-spot units (Porridge Cookhouse Community 1, Open Kitchen 4, Fondue Bar and Desert Cookhouse Fun 4; Communal Plaza 1.2, Playground 1.2, Zen Garden 1.3, Fitness Park 6, Swimming Pier 6 and 6, Bonfire Heat 2 on finishing a tend) on building infoboxes, resource pages and the Needs page, which confirms the maintainer’s cookhouse hypothesis; crop yields per full field on plant pages; a modelled production capacity per building on research pages, with plain-language highlights on chain pages; Chicken Coop 5 eggs per day as a player report. Bakery capacity is recorded as 60 Bread from the four decoded piles of 15; the maintainer withdrew the earlier 40 estimate on 26 October and asked that decoded values take precedence. Observations added or updated accordingly; information-needed rows rewritten to the remaining in-play questions.

## 25 October need effects beyond stored units

Maintainer report: Barley Porridge raises Community, which its resource record (FoodUnits 2, CommunityUnits 0) does not show. The Porridge Cookhouse description says the same. A scan of every building description against its outputs' stored units shows the pattern is systemic: dishes with a second effect (Barley Porridge and Stew for Community, Fondue and Manchamanteles for Fun), carried gear (Book, Ukulele, Pendant, Canteen, Coat) and places with no resource (Communal Plaza, Playground, Zen Garden, Fitness Park, Swimming Pier, Bonfire, Winter Cabin) all have effects the stored units do not carry. The maintainer reports the Barley Porridge rise is small and suggests the Cookhouse itself may be what raises Community; every second-effect dish is served on returning plates, which fits eating at the building, though Mead stores Community on the resource. Recorded as the open observations `cookhouse-community-source` and `fondue-fun-check` with the discriminating test. The Needs page and resource pages now show description-stated effects as a second source, labelled with the building that states them and no amount. Recorded as observation `barley-porridge-community`; two information-needed rows cover the decode.

## 25 October issue forms

Issue 8: the Markdown correction template is replaced by a structured form (page, kind, what it says now, what it should say, how you know, version, evidence, spoiler flag), and a gameplay-observation form mirrors the observation record fields. Article pages prefill the correction form with the page name; research pages link the observation form with the entry filled in. Spoiler pages keep neutral titles and no prefill. A template config points answers for the information-needed list at issue 10.

## 25 October spoilers demoted in navigation

Maintainer decision: the Spoilers entry no longer sits second in the navigation in bold with a border; it is the last entry, in muted colour, after Sources & artwork. The home page keeps its spoilers teaser at the bottom. On phones the navigation collapses behind a Menu toggle and the infobox becomes a compact two-column grid so article text starts on the first screen.

## 25 October custom domain restored

The first deploy-workflow publish dropped the `CNAME` file for outlanders2wiki.com from gh-pages, which made Pages forget the custom domain. `assets/CNAME` now rides every build and the deploy step sets `cname`, and the file was restored on gh-pages directly to bring the site back.

## 25 October Tournament Mode is live; Rural is the current season

Maintainer report: Tournament Mode is live and the Rural season (internal key Amish) is running. Recorded as the confirmed observation `tournament-rural-season-live` (observation targets may now be of type `tournament`). Rural leaves `spoilers.json`; Egyptian and Imperial stay withheld with an updated reason: completed seasons keep reward sets in the files, the live one is name-only, so a name-only style that is not live is most likely a future season. The Tournament page shows the live tag, the current season first, and the observation.

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

## Houses page and villagers fed per source (2026-10-26, issues 37 and 36)

A Houses page compares every house from stored data: villager spots, the one-spot baby house and one-spot pet house each carries, footprint, cost and cost per villager, heating, sandbox biomes and level count, with the reproduction values explaining why full housing multiplies the birth chance by 0.025. Pets are named in the files but unseen in play and are marked unconfirmed. Plant pages and the Plants overview gain a Feeds figure (villagers fed by one full field or tree: yield × food units ÷ growth days, or fruit rate × food units, divided by the 0.67 units a villager burns a day), and the Food page gets a ranked table of sources. Processed foods are left out because factory speed is not stored.

## Tree self-seeding and workspot effects (2026-10-26, issues 32 and 35)

Tree pages gain a Spreads row from the stored plant settings (fruit trees and palms 2% a day, Ash, Pine, Willow and the Spookylands dead tree 3%, Jungle Bush and Mesquite 4%, all within 3 tiles and never closer than 1 tile to another plant); the Plants overview and the wood and fruit harvesters' pages note that wild stands regrow. Only five workspots in the game carry a need or random-output behaviour: the Bonfire's tending task gives the worker 2 Heat units, and the Fishing Dock's spots roll 0–1 or 0–2 Meat per cycle (expected 0.5 and 1), now stated on those pages. Three test rows added for the local agent: demolition refunds, planted-tree spread, fish per cast.

## Salvage values for map objects (2026-10-26, issue 29)

Only 24 of the game's 304 recyclable objects store what dismantling returns: Ruins give 10 Stone, a Ruined House 3 Log, a Ruined Plaza 4 Plank, a Ruined Zen Garden 3 Stone, Expedition Crates 3 Plank (the Bread and Dried Meat variants add 5 or 10 of that food), a Pallet 1 Plank, a Canoe 3 Log, and the Christmas gifts Coats and Books. Everything else, including every building, refunds by code, so no "when demolished" row is possible for buildings. The stored values now appear in each level's Starting conditions as a Salvage row with a total, and in the Spookylands map-resources table. Placement rules were already an infobox row before issue 29 was filed; that item is closed as done.

## How eating works (2026-10-26)

The Needs page gains an explainer built from the stored Food meter and the villagers' eat activity (`ActivityConsumeResource`, exported as `eating` in decoded-mechanics.json): a villager slides from Full to Satisfied in 1.5 days, to Wanting by day 3.25 and starves after 6.25 days without food; the urge to eat is scaled by hunger status (Full 0, Satisfied 0.45, Wanting 0.7, Low and Critical 0.99), and eating at an eating place starts fractionally higher than eating alone. A table gives each food's units, what it restores, the meter value below which the whole item counts (the 150 cap wastes rich foods eaten early) and the no-waste consumption per villager per day. No stored field expresses a preference between foods; that question and the timed meal log are new rows in INFORMATION-NEEDED.

## Objective totals: whole items, gathered items stop at the map (2026-10-26)

The "What the objectives need" table now rounds every amount up to a whole item. Items the map provides are no longer worked back through a factory: sticks are shown as picked up near trees (the Firewood Yard is mentioned as an alternative, not a requirement), logs come from the Lumberjacks' Base rather than the Foresters' Hub (plain harvesters are preferred over planters), map-harvested items name their harvester (Quarry, Reed Harvester, Chicken Coop for eggs), and Wheat and Veggie are shown as grown in fields with the crops that yield them. A map drop is any resource a plant spawner places; a harvester is a building whose formula draws on a map source or passes the item through unchanged.

## Plant biomes and planters from data (2026-10-26)

Plant pages and the Plants overview now show which sandbox biomes list each plant (from `content/reference/biomes.json`, the decoded MapBiomeSettings), which building plants it there, and where it grows wild with the map generator's density per tile. The planter is no longer a fixed table: a planter is any building whose description says it plants a source type (`Sources.Field`, `Sources.FruitTree` or `Sources.Tree`) and that is in the biome's sandbox build list, so the Nopal Tree, Date Palm and Watermelon are planted by the Oasis in the Drylands, and Winterlands crops by the Greenhouse. When no sandbox biome lists a plant, the planters are taken from the campaign level build lists that include the field, then from all planters of that type. Open point: the Drylands sandbox lists Mesquite as a forestry plant but has no Foresters' Hub, so its sandbox planter is unconfirmed. Internal, unnamed spawner outputs (the Trappers' trap state on Winter Pines) are no longer shown as yields.

## How unreleased status is decided (2026-10-26)

Written down in CONTRIBUTING.md and on the Spoilers page: `confirmed-unreleased` needs the prefab's own `MinGameVersion` gate above the installed game version (32 against 30 here); reports give `reported-unreleased`; associated scenarios and biomes without a gate stay `related-release-unconfirmed`. Construction-material rollups for level objectives are tracked in issue 23.

## Plant yields by type and a fruit rate (2026-10-26, issue 25)

The Plants overview and plant infoboxes now lead with the yield that matches the plant type (field harvest, fruit drops, felling logs) and put the rest under "Also"; orchard trees are labelled fruit trees. A Rate row and column give fruit per day while the tree is picked regularly (1 ÷ mean spawn interval) and how long a full tree takes to fill (cap × mean interval): Palm about 0.61 a day and full in 8 days, Banana about 0.3 and 10 days. The rate is arithmetic on the stored spawner values, which stay on the page.

## Plants section, tree yields and the clock (2026-10-26)

Crops and trees now live under `/plants/` with their own directory (issue 20); the old `/buildings/<plant>/` addresses stay as aliases. Tree pages show felling yields and timed drops from the decoded plant prefabs (issue 21): Ash gives 4 Logs after 6 chops, an Apple Tree 1 Log after 3 and one Fruit every 1.65–2.5 days with 4 waiting at most. The research agent traced the clock code: the dial shows a day face for the first half of the cycle and a night face for the second, so shifts are now described against the dial rather than hours, which the game never names.

## Decoded mechanics from the game files (2026-10-26)

`content/reference/decoded-mechanics.json` comes from the research repository's pure-Python IL2CPP reader (metadata version 39 could not be loaded by the usual tools), with every record checked against its serialized length. From it: need meter settings, concern weights and bonuses, reproduction values and life stages on the Needs page; public-output pile capacities, heat sources, baby and pet spots and "Added in update N" on building infoboxes; pile tables on building research pages; Tropical weather on the Tropiclands page; tournament boosts; and version gates that confirm the mushroom chain, Oona, the Swamp Trappers' Hut, the Advanced Warehouse and the Brick Road as unreleased (MinGameVersion 32 against the installed 30). The second Stick definition is the Firewood Yard's internal FakeStick. Leader effect magnitudes are not in resources.assets.

## Stored recipes and objective totals (2026-10-26)

Recipes were only attached to buildings, and chain pages showed the smallest whole batch the decoded steps allow (5 Canteens, 40 Stroganoff, 2 Glass Pane), because fuel steps such as 1 Stick → 5 fire force the batch up. Resource records now carry a generated `made_from` field with per-unit amounts next to the batch, `scripts/derive-recipes.mjs` produces it from the building data, and validation fails if the two drift. Resource pages show "Each Canteen: 2 Glass Pane, 1 Reed Bunch, 1 Stick for every 2.5 Canteen"; building pages add the per-unit line under the batch. Level pages total what the objectives need, expanded through recipes from buildings the map offers (Mom's Gardens: 6 Canteens become 12 Glass Pane, 6 Reed Bunch and 20.4 Stick once the Glassworks fuel is counted). Two resource definitions are both called Stick (284894, 284895); the Firewood Yard converts one into the other, so the rollup merges same-named resources and the conversion is left out of `made_from`. Construction materials for objective buildings are not yet included.

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

## Scenario objective wording (2026-10-25)

Reader tables now distinguish Have (current stock or present targets), Create
(produce/make total), and HaveInBuilding (stock in a specified building), and
show percentage units for satisfaction, settlement, happiness and equipment.
The raw condition and comparison remain in the downloadable scenario records.

Do not equate the Housing condition with Concern + Housing. `Level01B` pairs
Housing = 100 with “Have everyone settled.” Its resource Have template says
“in stock.” `Single05_C_PeakResort` (Cliffside Resort) instead pairs Concern +
Housing = 100 with “Satisfy Housing”; its Create templates say “Produce” and
“Brew.” These are distinct stored objective types; their runtime relationship
has not been tested. The wording is in each record's `objectives` and
`source_entries`, with localization keys and text asset IDs.

