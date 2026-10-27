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

## Local agent playtest, 26 October 2026 — recorded
Source: research repository `kellan/outlanders2-research`, branch `codex/playtest-observations` (commits 572d8eb, 45125e9, 4b3a6c7), `docs/INFORMATION-ANSWERS.md` there. The cited screenshots are copied to `assets/gameplay-evidence/` as compressed JPEGs; usernames on the Challenges ranking are covered.

| Entry | Status | Recorded as |
|---|---|---|
| Rural season reward track and countdown (A4) | recorded | observation `rural-season-rewards` |
| Challenge categories and a Chill day limit (A4) | recorded | observation `town-of-the-year-chill-limit`; row updated (Ranked, Remix and scoring still open) |
| Campaign 1 and 2 complete story-to-level menu mapping (A3) | recorded | every story's `level_mapping_status` set to `menu_verified`; matches the mapping inferred from the files exactly; row removed |
| Campaign 3 visible contents (A3) | recorded | observation `campaign-3-menu-contents` |
| Campaign entry prerequisite (A3) | recorded | observation `campaign-unlock-rule` |
| Drylands has a Foresters’ Hub despite the decoded sandbox list (A5) | recorded | observation `drylands-sandbox-planting`; no contradiction: the Hub is a base building in every sandbox, and the wiki already lists it as Mesquite's planter; row removed |
| Drylands visible crop and tree choices (A5) | recorded | observation `drylands-sandbox-planting` |
| Winterlands crops and Greenhouse placement rule (A5) | recorded | observation `winterlands-greenhouse-fields` |
| Additional production field guides, first and second batches (A1) | recorded | `ui_observations.buildings` for 38 buildings and `gameplay.recipe_per_cycle` for 21; costs and worker slots match the decoded data for all 38; differences noted for Bottle Factory, Cheesery, Porridge Cookhouse and Trading Outpost |
| Partial and finished Basic House refunds (A6) | recorded | observation `basic-house-demolition-refund` |
| Visible day counter increments at dawn (A2) | recorded | observation `day-counter-turns-at-dawn` (Days and time page) |
| Meal test and five-day observation (B1) | recorded | observation `five-day-meal-log` (Needs page) |
| Food preference remains uncontrolled (B1) | recorded, no conclusion | row kept open with the limitation |
| Fishing test setup could not reach a working dock (B2) | recorded, no result | row kept open with the placement problem |

## Basic House — complete field-guide card, 27 October 2026
- Status: new
- Row: Field guide text, recipe, cost and worker slots for every building
- Fact: Field guide text: "A very basic, but still charming, log house." Provides: Housing, 4 beds. Cost: 6 Logs. No Workers row is displayed.
- Target: Basic House
- Obtained by: field guide
- Conditions: Existing Playtest Refund sandbox, Evergreen landscape; opened through build catalog. Full card visible, including cost. This is a displayed-value observation, not a measured need effect or family-assignment test.
- Game version: 30 (254), verified from installed app Info.plist; Settings did not display a version in the inspected list.
- Date: 2026-10-27
- Evidence: 2026-10-27/basic-house-field-guide.png
- Confidence: confirmed

## Plank House — complete field-guide card, 27 October 2026
- Status: new
- Row: Field guide text, recipe, cost and worker slots for every building
- Fact: Field guide text: "A fresh, spacious house for five people." Provides: Housing, 5 beds. Cost: 6 Planks. No Workers row is displayed.
- Target: Plank House
- Obtained by: field guide
- Conditions: Existing Playtest Refund sandbox, Evergreen landscape; opened through build catalog. Full card visible, including cost. This is a displayed-value observation, not a measured need effect or family-assignment test.
- Game version: 30 (254), verified from installed app Info.plist; Settings did not display a version in the inspected list.
- Date: 2026-10-27
- Evidence: 2026-10-27/plank-house-field-guide.png
- Confidence: confirmed

## Brick House — complete field-guide card, 27 October 2026
- Status: new
- Row: Field guide text, recipe, cost and worker slots for every building
- Fact: Field guide text: "A strong but expensive house for six people." Provides: Housing, 6 beds. Cost: 12 Bricks. No Workers row is displayed.
- Target: Brick House
- Obtained by: field guide
- Conditions: Existing Playtest Refund sandbox, Evergreen landscape; opened through build catalog. Full card visible, including cost. This is a displayed-value observation, not a measured need effect or family-assignment test.
- Game version: 30 (254), verified from installed app Info.plist; Settings did not display a version in the inspected list.
- Date: 2026-10-27
- Evidence: 2026-10-27/brick-house-field-guide.png
- Confidence: confirmed

## Two-Story House — complete field-guide card, 27 October 2026
- Status: new
- Row: Field guide text, recipe, cost and worker slots for every building
- Fact: Field guide text: "A beautiful and sturdy two-story house for eight people." Provides: Housing, 8 beds. Cost: 8 Bricks + 8 Stone. No Workers row is displayed.
- Target: Two-Story House
- Obtained by: field guide
- Conditions: Existing Playtest Refund sandbox, Evergreen landscape; opened through build catalog. Full card visible, including cost. This is a displayed-value observation, not a measured need effect or family-assignment test.
- Game version: 30 (254), verified from installed app Info.plist; Settings did not display a version in the inspected list.
- Date: 2026-10-27
- Evidence: 2026-10-27/two-story-house-field-guide.png
- Confidence: confirmed

## Playground — complete field-guide card, 27 October 2026
- Status: new
- Row: Field guide text, recipe, cost and worker slots for every building
- Fact: Field guide text: "A public space with activities that provide Fun." Provides: Fun 1. Cost: 9 Logs. No Workers row is displayed.
- Target: Playground
- Obtained by: field guide
- Conditions: Existing Playtest Refund sandbox, Evergreen landscape; opened through build catalog. Full card visible, including cost. This is a displayed-value observation, not a measured need effect or family-assignment test.
- Game version: 30 (254), verified from installed app Info.plist; Settings did not display a version in the inspected list.
- Date: 2026-10-27
- Evidence: 2026-10-27/playground-field-guide.png
- Confidence: confirmed

## Zen Garden — complete field-guide card, 27 October 2026
- Status: new
- Row: Field guide text, recipe, cost and worker slots for every building
- Fact: Field guide text: "A minimalistic public environment where outlanders can meditate and raise their Wellness." Provides: Wellness 1. Cost: 6 Stone. No Workers row is displayed.
- Target: Zen Garden
- Obtained by: field guide
- Conditions: Existing Playtest Refund sandbox, Evergreen landscape; opened through build catalog. Full card visible, including cost. This is a displayed-value observation, not a measured need effect or family-assignment test.
- Game version: 30 (254), verified from installed app Info.plist; Settings did not display a version in the inspected list.
- Date: 2026-10-27
- Evidence: 2026-10-27/zen-garden-field-guide.png
- Confidence: confirmed

## Fitness Park — complete field-guide card, 27 October 2026
- Status: new
- Row: Field guide text, recipe, cost and worker slots for every building
- Fact: Field guide text: "Fitness instructors utilize this space to lead various activities that raise the Wellness levels of participants." Provides: Wellness 3. Cost: 10 Planks + 6 Stone. Workers: 2.
- Target: Fitness Park
- Obtained by: field guide
- Conditions: Existing Playtest Refund sandbox, Evergreen landscape; opened through build catalog. Full card visible, including cost. This is a displayed-value observation, not a measured need effect or family-assignment test.
- Game version: 30 (254), verified from installed app Info.plist; Settings did not display a version in the inspected list.
- Date: 2026-10-27
- Evidence: 2026-10-27/fitness-park-field-guide.png
- Confidence: confirmed

## Finished Bakery refunds 5 Clay and 2 Stone
- Status: new
- Row: What demolishing a finished building, and a half-built site, gives back
- Fact: A completed Bakery costing 9 Clay + 4 Stone previews and actually returns 5 Clay + 2 Stone when recycled. Town Clay increased from 9 to 14; Stone increased from 0 to 2. The Bakery disappeared and salvage piles appeared on its footprint.
- Target: Bakery
- Obtained by: building panel and controlled before/after gameplay observation
- Conditions: Existing Playtest Refund sandbox, Evergreen landscape, 9 villagers. Bakery built during days 3–7 and recycled on day 8. All three Clay Pit workers were unassigned while paused before the baseline, and no other Clay/Stone construction or recycling ran during the measurement. Bakery had no Flour and had produced no Bread. Setup used fast speed; recycling ran at normal speed. Leader identity was not verified. This was an amount test, not a duration test.
- Game version: 30 (254), verified from installed app Info.plist.
- Date: 2026-10-27
- Evidence: 2026-10-27/refund-8-clay-production-stopped.png; 2026-10-27/refund-8-bakery-complete.png; 2026-10-27/refund-8-bakery-preview.png; 2026-10-27/refund-8-bakery-after.png
- Confidence: confirmed
- Notes: Consistent with half of each construction material rounded upward (9 / 2 -> 5, 4 / 2 -> 2). Do not generalize the rounding rule to all buildings from this one test. Half-built Bakery refunds were not tested.

## Evergreen Trading Outpost — complete guide and first Glass trade
- Status: new
- Row: Field guide text, recipe, cost and worker slots for every building
- Fact: The Evergreen Trading Outpost guide says "Outpost workers collect resources native to this biome and trade them for those from another biome." Needs: 12 Wheat. Provides: 6 Glass and 6 Hides icons. Cost: 6 Planks + 12 Stone. Workers: 3. In the live Resources panel, Glass was enabled and Hides paused; one loaded 12-Wheat batch produced 6 Glass and 0 Hides. The output count was observed at 3 Glass before reaching 6.
- Target: Trading Outpost (Evergreen)
- Obtained by: full field-guide card and Resources panel during gameplay
- Conditions: Fresh Playtest Trade sandbox, Edgar, Evergreen, Large Islands, Medium map, Average starting population (9), Abundant starting resources and fruit trees; Autobuild enabled for setup. Three farm workers, one outpost worker (Violet). Population grew to 10 before the trade. No Glass/Hides-consuming buildings were built. First full store observed day 16; final output day 17. Normal speed from the first full-store observation through final output.
- Game version: 30 (254), installed app Info.plist.
- Date: 2026-10-27
- Evidence: trade-2026-10-27/setup-autobuild.png; trade-2026-10-27/evergreen-outpost-guide.png; trade-2026-10-27/resources-initial-glass-selected.png; trade-2026-10-27/day16-full12-161334Z.png; trade-2026-10-27/day17-balloon-161643Z.png; trade-2026-10-27/day17-glass3-161801Z.png; trade-2026-10-27/day17-glass6-161844Z.png
- Confidence: confirmed for displayed values and observed output; timing partial
- Notes: Do not interpret the two Provides icons as simultaneous outputs. Exact full-store timing was missed during the transition from fast setup to normal speed. Full 12 Wheat was first captured at 16:13:34 UTC, 3 Glass at 16:18:01, and 6 Glass at 16:18:44. These are observation timestamps, not an exact production duration. The full store remained through the night; the balloon inflated the next morning. No universal trade-duration claim is established by this run.

## Evergreen Trading Outpost — switching product and measured second trade
- Status: new
- Row: Trading Outpost trade (PLAYTESTS A7 `trade`, requested in issue #10)
- Fact: Clicking the paused Hides import enabled Hides and automatically paused Glass. The next completed trade produced 6 Hides while the existing Glass stock stayed at 6. Thus the displayed two outputs are alternatives in this test, not 6 of both per trade. With one worker, elapsed normal-speed time from the store reaching 12 Wheat to the Resources panel reaching 6 Hides was approximately 216–232 seconds (about 3 minutes 44 seconds, including the overnight interruption).
- Target: Trading Outpost (Evergreen)
- Obtained by: controlled product switch and timestamped screenshot observations
- Conditions: Same Playtest Trade sandbox and setup as the preceding entry; Edgar, Autobuild used for setup, 10 villagers, one outpost worker (Violet), no Glass/Hides consumers. Switched on day 17 after the first Glass trade. Second crop supplied only 10 Wheat; subsequent harvest supplied the remaining 2. Setup advanced at mixed speeds, but all playback from 10 Wheat on day 27 through 6 Hides on day 28 was normal speed, without pauses or guide modals. No staffing changes during that interval. Food stayed available during the measured interval; an eastern Foragers' Hut had been added beforehand.
- Game version: 30 (254), installed app Info.plist.
- Date: 2026-10-27
- Evidence: trade-2026-10-27/day17-switched-hides.png; trade-2026-10-27/day27-wheat11-163541Z.png; trade-2026-10-27/day27-wheat12-163547Z.png; trade-2026-10-27/day28-hides5-163923Z.png; trade-2026-10-27/day28-hides6-163933Z.png; trade-2026-10-27/day28-paused-final.png
- Confidence: confirmed for product switching and output; measured duration is bounded, single trial
- Notes: Screenshot timestamps (UTC): 11 Wheat at 16:35:41.605, 12 Wheat at 16:35:47.558; 5 Hides at 16:39:23.346, 6 Hides at 16:39:33.514. These bracket an elapsed duration greater than 215.788 and less than 231.909 seconds, subject to screenshot capture latency. The worker slept after Wheat was consumed and before all output was unloaded. This is total observed elapsed time under these conditions, not a universal active-work or flight duration. The first trade also showed staged unloading (3 then 6 Glass). Game left paused on day 28; all 10 villagers alive and food available.

- Correction: Import icons were initially misidentified as Ice and Leather. The maintainer identified them as Glass and Hides on 27 October 2026; names and evidence filenames are corrected. Observed counts and timing are unchanged.
