# Information answers

Inbox for facts that answer rows in [INFORMATION-NEEDED.md](INFORMATION-NEEDED.md). Agents and people append entries here; the wiki session records each one in `content/` with evidence, removes the row from the needed list, and changes the entry's status from `new` to `recorded` (or `rejected` with a reason). Never delete entries; the file is the audit trail.

Copy this template for each fact:

```
## <short title>
- Status: new
- Row: <first cell of the row in INFORMATION-NEEDED.md>
- Fact: <what the game shows, with numbers and units>
- Target: <building, resource, level, leader or biome name, if the fact is about one>
- Obtained by: <field guide | building panel | in-game clock | timed test | decoded data | official source>
- Conditions: <level, biome, leader, staffing, elapsed game time, anything that could change the result; "not applicable" if none>
- Game version: 30 (254)
- Date: <YYYY-MM-DD>
- Evidence: <screenshot filename under assets/gameplay-evidence/, or a URL, or "none">
- Confidence: <confirmed | likely | uncertain>
- Notes: <optional>
```

---

## Playtest strategy — 26 October 2026

Requested unattended gameplay pass. This section is a plan, not evidence; findings below will use the inbox template. Preserve existing campaign progress, use fresh sandbox slots, and never overwrite an occupied slot. Save screenshots and commit answers after each useful batch. Do not change `content/` or remove unanswered rows.

1. **Settings and menus (A3/A4):** record the displayed build, inspect all three campaign menus and story cards (especially Campaign 3/Fjordi’s Birthday and its other stories), then Challenges/archive and Tournament rules, current season, timer and rewards. Menu evidence has no simulation wait and establishes which scenarios are actually available.
2. **Field guide (A1):** open it from a fresh sandbox; capture missing production entries, prioritising Oasis, Trading Outpost, Fishing Dock and food producers. Record visible recipes, costs and worker slots without substituting decoded ratios.
3. **Drylands sandbox (A5):** choose a fresh map and record leader/settings; place/build an Oasis and inspect all planting choices, particularly Mesquite. Use sandbox setup resources if available. No claim about ordinary campaign availability follows solely from sandbox menus.
4. **Winterlands sandbox (A5):** fresh map, Greenhouse and Foresters’ Hub planting lists, including disabled choices. Reserve a separate Winterlands session for B6: record one uncoated villager without heat, then controlled coat and fuelled-bonfire comparisons. Do not imply death timing from warning timing alone.
5. **Temperate/Pampas sandbox (A6, then separate B1 session):** use a fresh resource-rich map for finished Basic House and partly delivered site demolition; track local and global logs and prevent unrelated log production. For meals, start a separate session with two equal-unit foods and a recorded leader; follow one adult for five days and log meals and five subsequent food choices. Use an unlocked stocked campaign scenario instead if sandbox setup cannot supply the foods cheaply; record the exact replacement before measuring.
6. **Remaining timed sessions, in protocol order:** Tropiclands/coastal sandbox for B2 (20 casts per spot); Pampas sandbox for B3 (Carrot, Wheat, Apple growth and five fruit intervals); suitable sandbox with about ten villagers for B4 (Plaza/Kitchen, three days); supplied Pampas Bakery for B5 (two workers, three days); Winterlands B6; Pampas B7 housing; cleared Pampas orchard B8 (20 days). Each is its own timed session. A5 may share B4 as explicitly allowed.
7. **Clock/day limit (A2/B9):** capture sunrise, sunset and day increment when available; use an unlocked campaign level whose card explicitly displays a day limit for B9, and only compare Clay Pit/Farm sleep if both are available. Choose the shortest available limit, recording the level before starting. A full 20-day spread test alone costs about 100 real minutes at the decoded normal-speed day length; prioritise direct answers first and report incomplete tests honestly.

All timing uses normal speed, displayed day plus dial position, recorded leader and starting conditions. Pause to write notes. Screenshots live under `assets/gameplay-evidence/<test-id>/`. A blocked test gets an uncertain entry with the actual obstacle, never a guessed answer. Exact sandbox seeds, leaders and replacement levels will be recorded after inspecting the available setup UI.


## Example: Bakery output capacity
- Status: recorded
- Row: Output storage capacity per production building
- Fact: The Bakery keeps baking until it holds 40 Bread.
- Target: Bakery
- Obtained by: building panel
- Conditions: not applicable
- Game version: 30 (254)
- Date: 2026-10-25
- Evidence: none
- Confidence: likely
- Notes: Recorded as the Bakery gameplay block, player-report, on 25 October 2026. Superseded on 26 October by the decoded pile capacities (4 × 15 = 60) at the maintainer’s request. Kept as a filled-in example.

## Tournament Mode live, Rural season running
- Status: recorded
- Row: Tournament Mode: is it live on this installation, which season is running
- Fact: Tournament Mode is live; the Rural season is the one running.
- Target: Tournament Mode
- Obtained by: in-game observation (maintainer, in chat)
- Conditions: not applicable
- Game version: 30 (254)
- Date: 2026-10-25
- Evidence: none
- Confidence: confirmed
- Notes: Recorded as observation tournament-rural-season-live; Rural removed from spoilers; row replaced by a season-history row.

## Research handoff, 26 October 2026 (issue 10 comments 6405315176 to 6405320280)
- Status: recorded
- Row: Harvest yield per crop; Production time per cycle; Day length; Fishing Dock and other extraction yields (Chicken Coop); Output storage capacity; Work schedule to clock mapping; Gear effects; Terrain codes; Where the second effect of dishes lives; Social-spot amounts
- Fact: See `content/reference/research-findings.json` (imported whole, with provenance) and the observations added on 26 October. Crop yields per full field and growth days; one game day is 300 simulation seconds; gear stored base increases and Boots speed multipliers; TerrainType 1 Water, 2 Sand, 3 Soil, 4 Mountain; social-spot and eating-spot need units; nominal pile capacities; Chicken Coop 5 eggs per day (player report); apple spawner interval and cap; WalkCarryingMultiplier about 0.8.
- Target: many
- Obtained by: decoded data (byte-round-tripped records) plus a maintainer player report for the Chicken Coop
- Conditions: installed macOS build; no gameplay timing
- Game version: 30 (254)
- Date: 2026-10-25
- Evidence: research branch codex/research-answers, RESEARCH-ANSWERS.md and research/production-findings.json at 06ed8d63
- Confidence: confirmed for stored values; modelled for rates; disputed for Bakery capacity
- Notes: Rows updated rather than removed where the in-play meaning is still open: gear application, meter conversion for social spots and dishes, measured production, clock origin, effective capacity, orchard fruit per day.

## Rural season reward track and countdown (A4)
- Status: new
- Row: Tournament season history: dates of the Nordic and Mesoamerican seasons, the Rural season’s reward list and end date, and whether Egyptian and Imperial have ever run
- Fact: Tournament displays “10 days left”. Reward track, top to bottom: Rural Palette; Rural Basic House; Rural Farm; Streak Shield; Rural Sawmill; 20 Leaderboard Bonus Points; Rural Cheesery; Streak Shield; Rural Windmill; 50 Leaderboard Bonus Points; Rural Winery; Streak Shield; Rural Villagers Style; 100 Leaderboard Bonus Points. The final reward requires 92 Reward Points. The explanatory panel says Reward Points unlock buildings and town styles, each season brings new prizes, and daily Tournament level completion maintains a streak bonus.
- Target: Tournament / Rural season
- Obtained by: in-game menus
- Conditions: existing account reward track, 89 Reward Points, streak 11; no rewards claimed or levels started
- Game version: 30 (254), verified from installed application Info.plist; Settings was inspected but no version label was visible
- Date: 2026-10-26
- Evidence: assets/gameplay-evidence/challenges/challenges-menu-tournament.png; assets/gameplay-evidence/challenges/challenges-menu-rewards-1.png through challenges-menu-rewards-4.png
- Confidence: confirmed
- Notes: Partial answer: countdown is not an exact end timestamp; earlier season dates and Egyptian/Imperial availability remain unanswered. Settings screenshot: assets/gameplay-evidence/session/settings-bottom.png.

## Challenge categories and a Chill day limit (A4)
- Status: new
- Row: Challenge type rules for Chill, Ranked and Remix, scoring, and schedule
- Fact: Current Challenges introduction describes Redux as familiar levels with a twist, Bounty as producing or stocking as much of a resource as possible within a time limit, and Original as new handcrafted campaign-like levels. Archive additionally offers Chill, Ranked and Remix filters. Chill “Town of the Year” explicitly has an 80-day limit, main objectives of population 100 and satisfying Happiness, and optional objective of everyone settled. Therefore the Chill label does not mean unlimited days. Current Original “Spooktown” rankings show completion in Days (11.20, 11.26, 11.37 for the top three).
- Target: Challenges
- Obtained by: in-game menus and level card
- Conditions: read-only archive inspection; no level restarted
- Game version: 30 (254), installed application metadata
- Date: 2026-10-26
- Evidence: assets/gameplay-evidence/challenges/challenges-menu-rules.png; assets/gameplay-evidence/challenges/challenges-menu-chill.png; assets/gameplay-evidence/challenges/challenges-menu-chill-card.png; assets/gameplay-evidence/challenges/challenges-menu-ranked.png
- Confidence: confirmed
- Notes: Partial: no general description for the three older categories was exposed on the examined screens. Do not infer their full rules or ranking formula from the category names.

## Campaign 1 and 2 complete story-to-level menu mapping (A3)
- Status: new
- Row: Story-to-level mapping for Campaign 1 and 2 stories
- Fact: The following is the observed menu order; each story lists levels 1/3, 2/3, 3/3 respectively.
- Target: Campaigns 1 and 2
- Obtained by: in-game campaign and story menus
- Conditions: English UI, all story cards accessible on this account
- Game version: 30 (254), installed application metadata
- Date: 2026-10-26
- Evidence: assets/gameplay-evidence/menus/menus-campaign-1.png; menus-campaign-2.png; menus-campaign-3.png; menus-c1-s1.png through menus-c1-s7.png; menus-c2-s1.png through menus-c2-s7.png (all under assets/gameplay-evidence/menus/)
- Confidence: confirmed

Campaign 1:
1. Pablo’s Quest: The End of the World; Middle Ground; A New Start.
2. Miranda’s Chance: The Itch; The Binge; The Chill.
3. Edgar’s Growth: Edgar Shapes Up!; Edgar Relapses!; Edgar Bounces Back!
4. Maddy’s Road: Road Song; Sugar Highway; Too Many Cookies.
5. Pablo’s Exit: On Edge; Under Pressure; Blown Away.
6. Jaqweshia’s Empire: Storefront; Management; Cache.
7. Felix’s Blackout: Who’s There?; What Happened?; Where Am I?

Campaign 2:
1. Jelena’s Climb: Valley Draft; Slope Maze; Summit Heat.
2. Cory’s Homework: Dad’s Woodlot; Mom’s Gardens; Cory’s Reign.
3. Kaia’s Dream: Out of the Blue; Into the Jungle; By the Sea.
4. Chico’s Wish: No memory; Remains; Forgotten.
5. Izzy’s Break: Anthology; Greatest Hits; Sold Out.
6. Maira’s Fortune: The Hermit; The Star; The Mirror.
7. Pablo’s Lost: Unidentified; Familiar; Outgrown.

## Campaign 3 visible contents (A3)
- Status: new
- Row: Campaign 3: menu placement of the three levels outside Fjordi's Birthday
- Fact: At the bottom of the full Campaigns menu, Campaign 3 contains only Story 1, Fjordi’s Birthday. Its three level cards are Seventeen, Twenty-four, Thirty, labelled 1/3, 2/3, 3/3. No additional Campaign 3 story or “Other levels” grouping appears in this menu.
- Target: Campaign 3
- Obtained by: in-game campaign and story menus
- Conditions: scrolled to bottom; all visible stories completed on this account
- Game version: 30 (254), installed application metadata
- Date: 2026-10-26
- Evidence: assets/gameplay-evidence/menus/menus-campaign-3.png; assets/gameplay-evidence/menus/menus-c3-s1.png
- Confidence: confirmed
- Notes: This establishes visible absence, not the identity, release status or alternate placement of three decoded maps. Do not invent a second story from stored scene identifiers.

## Campaign entry prerequisite (A3)
- Status: new
- Row: Unlock prerequisites and what each level unlocks
- Fact: Campaigns introduction says each story has three levels focused on the same leader or town, and after finishing the first three Stories in Campaign 1 the player can jump into any Campaign.
- Target: Campaign selection
- Obtained by: in-game menu text
- Conditions: English UI; rule read from introduction, not tested on a new account
- Game version: 30 (254), installed application metadata
- Date: 2026-10-26
- Evidence: assets/gameplay-evidence/menus/menus-campaign-1.png
- Confidence: confirmed
- Notes: Individual level unlock prerequisites remain untested.

## Drylands has a Foresters’ Hub despite the decoded sandbox list (A5)
- Status: new
- Row: Which building plants Mesquite in sandbox Drylands
- Fact: The live Drylands Construction menu includes Foresters’ Hub (10 Planks, four worker slots). Its field guide names Mesquite among the trees it uses. The Mesquite guide names Foresters’ Hub and Lumberjacks’ Base under “Used by”. Mesquite placement shows no eligible highlighted area with only an Oasis present; after adding a Hub, an eligible highlighted area appears around the Hub. The live UI therefore identifies Foresters’ Hub as the Mesquite planting building; Oasis is not a substitute.
- Target: Mesquite / Foresters’ Hub / Oasis
- Obtained by: live build menu, field guide, planting placement overlay
- Conditions: fresh sandbox slot 2; Drylands, Great Mesa, medium map, average population (9 villagers, 7 adults at start), abundant starting resources, Miranda first appearance; Autobuild enabled to skip construction. Day 1; Oasis then Hub placed. No seed shown. Existing slot 1 untouched.
- Game version: 30 (254), installed application metadata
- Date: 2026-10-26
- Evidence: assets/gameplay-evidence/planters/planters-1-drylands-foresters-available.png; planters-1-mesquite-guide.png; planters-1-mesquite-oasis-invalid.png; planters-1-mesquite-hub-area.png (same directory); assets/gameplay-evidence/fieldguide/Foresters-Hub-Drylands.png
- Confidence: likely
- Notes: Building availability and guide text are confirmed. Actual worker planting was not observed: tree placement remained unconfirmed despite selecting a highlighted tile. Do not label this a completed growth or planting-animation test. This contradicts the assumption that Drylands has no Hub in the build menu.

## Drylands visible crop and tree choices (A5)
- Status: new
- Row: Crop availability per biome in normal play, including greenhouse rules in Winterlands
- Fact: Drylands sandbox Field menu lists Watermelon Field (yield 1, 4 days) and Carrot Field (yield 3, 9 days); Wood Tree menu lists Mesquite Tree (yield 2, 8 days); Fruit Tree menu lists Nopal Tree (yield Scarce, 10 days) and Date Palm Tree (yield Average, 10 days). No other entries or greyed-out choices were visible in these three lists. Oasis guide names Nopal, Date Palm, Carrot and Watermelon; its cost is 10 Planks and it has four worker slots.
- Target: Drylands
- Obtained by: planting menu and field guide
- Conditions: same fresh Drylands sandbox as the Mesquite entry, Autobuild enabled; no campaign availability inference
- Game version: 30 (254), installed application metadata
- Date: 2026-10-26
- Evidence: assets/gameplay-evidence/planters/planters-1-drylands-fields.png; planters-1-drylands-mesquite.png; planters-1-drylands-fruit.png (same directory); assets/gameplay-evidence/fieldguide/Oasis-top.png; Oasis-cost.png (same directory)
- Confidence: confirmed
- Notes: These are displayed menu growth times, not measured elapsed growth times. Winterlands remains a separate test.

## Winterlands crops and Greenhouse placement rule (A5)
- Status: new
- Row: Crop availability per biome in normal play, including greenhouse rules in Winterlands
- Fact: Winterlands sandbox Field menu contains Cabbage (yield 1, 4 days), Beet (yield 2, 7 days), Potato (yield 3, 9 days). Wood Tree contains only Winter Pine (yield 4, 10 days), and there is no Fruit Tree tab. Greenhouse guide names those three crops, costs 6 Glass Panes and 6 Stone, and has three worker slots. A fresh Cabbage placement inside its glass-covered planting area enables Build; a fresh placement on nearby open snow is red and disables Build. Confirming the inside placement creates a field plot under the glass.
- Target: Winterlands / Greenhouse
- Obtained by: live menus, field guide and controlled planting placement
- Conditions: fresh sandbox slot 3, Playtest Winterlands, Pablo, Large Islands, medium size, average trees/rocks/population (9 villagers), abundant resources, Autobuild enabled, day 1. One Greenhouse placed on clear ground. Separate fresh placement attempts were used for inside/outside comparison.
- Game version: 30 (254), installed application metadata
- Date: 2026-10-26
- Evidence: assets/gameplay-evidence/planters/planters-1-winterlands-fields.png; planters-1-winterlands-trees.png; planters-1-cabbage-inside-valid.png; planters-1-cabbage-outside-invalid.png (same directory); assets/gameplay-evidence/fieldguide/Greenhouse-Winterlands.png
- Confidence: confirmed
- Notes: Growth times are displayed menu values, not timed harvest measurements. The result establishes sandbox placement rules; no campaign-wide availability claim.

## Additional production field guides, first capture batch (A1)
- Status: new
- Row: Field guide text, recipe, cost and worker slots for every building
- Fact: Captured Oasis (two images to include cost), Drylands Foresters’ Hub, Trappers’ Hut, Open Kitchen, Chicken Coop, Fondue Bar, Dried Meat Shop, Fishing Dock, and Winterlands Greenhouse. Fishing Dock explicitly displays output 0–2 Meat; this is guide evidence, not a per-spot catch-frequency test. Open Kitchen displays any combination of 2 Veggies/Meat/Eggs plus 1 Stick producing 3 Stew; Fondue Bar displays 1 Cheese + 2 Veggies + 1 Stick producing 5 Fondue; Dried Meat Shop displays 1 Meat producing 2 Dried Meat without fuel.
- Target: production buildings
- Obtained by: in-game field guide
- Conditions: paused day-1 Drylands and Winterlands sandboxes; English UI
- Game version: 30 (254), installed application metadata
- Date: 2026-10-26
- Evidence: assets/gameplay-evidence/fieldguide/Oasis-top.png; Oasis-cost.png; Foresters-Hub-Drylands.png; Trappers-Hut.png; Open-Kitchen.png; Chicken-Coop.png; Fondue-Bar.png; Dried-Meat-Shop.png; Fishing-Dock.png; Greenhouse-Winterlands.png (all in same directory)
- Confidence: confirmed
- Notes: Partial coverage; do not mark the all-buildings row complete. UI effect icons are not a measured need-meter conversion.

## Partial Basic House returns delivered Logs (A6, first half)
- Status: new
- Row: What demolishing a finished building, and a half-built site, gives back
- Fact: A Basic House site at 25% construction with 3/6 Logs delivered advertised 3 Logs on its Recycle tab. Global available Log stock was 9 before recycling and 12 after the worker completed recycling. The 3 delivered Logs were fully returned as a pile at the former site.
- Target: Basic House, partially built
- Obtained by: controlled gameplay, construction progress and Recycle panels, before/after global inventory
- Conditions: fresh slot 4 “Playtest Refund”, Evergreen / Large Islands / medium, average population (9), abundant starting resources, Jaqweshia third appearance, Autobuild OFF. Day 1, normal speed. Started with 12 Logs; no lumber building or other Log-consuming site. Paused delivery at 3/6 before recycling. Idle villagers gathered Sticks, which were not part of this measurement.
- Game version: 30 (254), installed application metadata
- Date: 2026-10-26
- Evidence: assets/gameplay-evidence/refund/refund-setup-autobuild-off.png; refund-1-start-12-logs.png; refund-1-partial-3-delivered-9-stock.png; refund-1-partial-recycle-promises-3.png; refund-1-partial-after-12-logs.png (same directory)
- Confidence: confirmed
- Notes: Earlier filename refund-1-partial-2-delivered-9-stock.png is an intermediate capture; the final paused panel was 3/6. Finished-house comparison follows separately.

## Finished Basic House returns half its construction Logs (A6, completed)
- Status: new
- Row: What demolishing a finished building, and a half-built site, gives back
- Fact: A normally constructed Basic House consumed 6 Logs. Once finished, its Recycle tab advertised 3 Logs. Available Log inventory was 6 before demolition and 9 after the house disappeared, with a returned Log pile on its former footprint. Thus this completed house returned 50% of its 6-Log cost; the separate partial-site test returned all 3 delivered Logs.
- Target: Basic House, finished
- Obtained by: controlled gameplay, Recycle panel and before/after inventory
- Conditions: same slot 4 Playtest Refund, Evergreen / Large Islands, Jaqweshia third appearance, Autobuild OFF, normal speed. Construction started day 1 and finished day 3 early day face; Rian built, Liza added late day 2. Demolished day 3 middle day face. No other Log producer or consumer.
- Game version: 30 (254), installed application metadata
- Date: 2026-10-26
- Evidence: assets/gameplay-evidence/refund/refund-3-finished-before-6-logs.png; refund-3-finished-recycle-promises-3.png; refund-3-finished-after-9-logs.png (same directory)
- Confidence: confirmed
- Notes: Only Basic House tested; do not generalize rounding or refunds for other materials from this single building.

## Visible day counter increments at dawn (A2, boundary observation)
- Status: new
- Row: Which clock hour the stored shift fraction 0.0 corresponds to
- Fact: The counter remained Day 2 when the dial changed to its blue night face. It was still Day 2 with the moon near the far-right end of the night arc, then showed Day 3 with the sun just appearing at the far-left edge of the yellow day face. The visible day boundary is dawn, rather than sunset or mid-night.
- Target: day counter / clock dial
- Obtained by: in-game clock observation at normal speed
- Conditions: Playtest Refund sandbox, Jaqweshia third appearance; observed during A6. Screenshots bracket the dawn transition by approximately 10–15 real seconds rather than capturing its exact frame.
- Game version: 30 (254), installed application metadata
- Date: 2026-10-26
- Evidence: assets/gameplay-evidence/clock/clock-2-early-night.png; clock-2-late-night.png; clock-3-sunrise-counter-increment.png (same directory)
- Confidence: confirmed
- Notes: Confirms the visible counter boundary only. No numbered clock hours are shown, and this observation alone does not establish which stored shift fraction corresponds to dawn. A full precisely sampled day-length measurement remains open.

## Additional Evergreen production field guides (A1, second batch)
- Status: new
- Row: Field guide text, recipe, cost and worker slots for every building
- Fact: Captured the live field guides for Lumberjacks’ Base, Clay Pit, Quarry, Brickyard, Firewood Yard, Stone Mine, Foragers’ Hut, Farm, Orchard, Cookie Shop, Cheesery, Porridge Cookhouse, Roadworks Office, Warehouse, Market, Trading Outpost, Bootmakers’ Shop, Communal Plaza, Brewery, Smoothie Stand, Paper Mill, Press, Book Workshop, Bottle Factory, Winery, Pendant Craftshop, Luthierie, Beehive and Mead Hall. Long cards have top/cost screenshots. Trading Outpost here lists 12 Wheat as input and 6 Glass Panes plus 6 Animal Hides as output. Porridge Cookhouse says barley is grown on site and lists 1 Stick producing 2 Barley Porridge.
- Target: Evergreen building field guides
- Obtained by: in-game field guide
- Conditions: Playtest Refund sandbox paused on day 3, Jaqweshia third appearance, English UI; Options displays active style Rural. Recipe values are guide text, not measured throughput.
- Game version: 30 (254), installed application metadata
- Date: 2026-10-26
- Evidence: assets/gameplay-evidence/fieldguide/: Lumberjacks-Base-top.png, Lumberjacks-Base-cost.png, Clay-Pit.png, Quarry.png, Brickyard.png, Firewood-Yard.png, Stone-Mine.png, Foragers-Hut-top.png, Foragers-Hut-cost.png, Farm-top.png, Farm-cost.png, Orchard-top.png, Orchard-cost.png, Cookie-Shop.png, Cheesery.png, Porridge-Cookhouse.png, Roadworks-Office.png, Warehouse.png, Market.png, Trading-Outpost-Evergreen.png, Bootmakers-Shop.png, Communal-Plaza.png, Brewery.png, Smoothie-Stand.png, Paper-Mill.png, Press.png, Book-Workshop.png, Bottle-Factory.png, Winery.png, Pendant-Craftshop.png, Luthierie.png, Beehive.png, Mead-Hall.png.
- Confidence: confirmed
- Notes: Still partial coverage of the requested 63 entries; nonproduction buildings and biome-specific producers remain. This batch adds 29 building guides. The refund test also used the active Rural style; its observed six-Log cost was verified directly.
