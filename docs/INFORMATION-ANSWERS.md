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
