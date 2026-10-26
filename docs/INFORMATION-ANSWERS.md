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
- Notes: Recorded as the Bakery gameplay block, player-report, on 25 October 2026. Shown here as a filled-in example.

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
