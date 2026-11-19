## Update 32 label and the Wetlands trees (2026-11-19)

The maintainer asked how the Swamp Trappers' Hut differs from the Trappers' Hut. Looking at its page showed two leftovers from PR 119.

**Stale label.** Every page for content gated to version 32 still said "Added in Update 32 (newer than the current game, not yet released)".
- `addedIn` compares the gate with the decoded game version, which is still 31, because the version 32 files aren't decoded yet.
- `availability.json` now has `reported_releases: [{version: 32, date: 2026-11-19, ...}]`.
- `addedIn` shows "(released; Oona's update, reported live by the maintainer on 19 November 2026)" for any version listed there.

**Cypress and Willow trees.** PR 119 kept them held, because no level or sandbox in version 31 lets you plant them. But the scenario data places a CypressTree on all three of Oona's levels and a WillowTree on Copies and Chaos. The Swamp Trappers' Hut's own field-guide text says it traps next to Cypress Trees. So both are part of the live update, and their holds are lifted.
- The non-recyclable Brick Road (78175) is placed on no level, so it stays held, as do the tournament seasons.

**Checks.** The spoiler checks that PR 119 had pointed at the two trees now use the non-recyclable Brick Road, or check that no page links a held-back page:
- `check-companion`, `check-contributions`, checks 85 and 88.
- Check 120 is new.
