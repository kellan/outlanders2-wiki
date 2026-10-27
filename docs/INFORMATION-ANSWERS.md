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
