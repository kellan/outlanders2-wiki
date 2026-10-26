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
