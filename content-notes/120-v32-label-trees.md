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

### Follow-up: Brick Road and where mushrooms come from (same day)

The maintainer confirmed that the Cypress and Willow trees, Brick Road, the Advanced Warehouse and Stroganoff are all live. They asked to unhide the Brick Road and to add a section to the Mushroom page on where to get mushrooms.

- **Brick Road (78175):** the non-recyclable variant is no longer held. Only the four unseen tournament seasons remain in `spoilers.json`.
- **Mushroom page, "Where to get it":** a new section, `groundSourcesSection`.
  - It lists every plant whose stored spawners grow mushrooms: 13 trees and bushes, each a new one every 1.7–3.9 days, at most 3 waiting, about 0.36 a day.
  - It says the Concoction Shop and Stroganoff Cookhouse pick them from the ground themselves, as their in-game descriptions say, so no Foragers' Hut is needed.
  - Caveat on the page: whether mushrooms grow outside the Wetlands, and how far the workers walk to pick, are not checked yet.
  - The section only appears for non-food goods that grow under plants; Fruit keeps its own page layout.
- **Checks:** the spoiler checks now use the tournament seasons (`spoilers/tournament/`, searches for "Egyptian" and "Chinese"). Check 120 covers the Brick Road and the Mushroom section.

### Follow-up: two Stroganoff cooking spots (disputed)

The maintainer reports two cooking spots at the Stroganoff Cookhouse in the live game. The decoded version 30 files give it five work spots, only one of which cooks (KitchenFire + StrogMix -> Stroganoff, 17.4 s). The others are the fire, Meat slicing, Mushroom slicing and the mixing spot.

Following the rule for conflicts, both sources are kept:
- observation `stroganoff-two-cooking-spots` is recorded as **disputed**;
- the food table keeps the decoded figure;
- a note under the table gives the two-spot figure.

With two cooking spots, a full crew of 2 is limited by worker time (2 × 180 s ÷ 20.1 s), not the stove: about 18 Stroganoff, or 36 food units, a day, instead of about 10 (21). The version 32 files should settle it.
