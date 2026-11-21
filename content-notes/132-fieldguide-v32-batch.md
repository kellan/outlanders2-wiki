# Field-guide cards, version 32

Source: the local agent's live session on the maintainer's Mac, 21 November 2026, version 32 (257), English UI (research `data/gameplay-2026-11-21/`, commit db81256: README, notes, manifest with hashes, full-window screenshots). The screenshots were checked for personal information (none: game window only), resized to 1440 px wide JPEG and added to `assets/gameplay-evidence/fieldguide/`. Each card is an entry in `world.json` `ui_observations.buildings` with the transcribed rows.

**Checked against the wiki's data.** Construction cost, worker slots and beds match on all 20 cards. Recipes:

- **Stroganoff Cookhouse:** the card (1 Stick + 1 Meat + 1 Mushroom → 4 Stroganoff, Food 2 each) matches the version 32 rework: 1 Meat + 1 Mushroom → 4 bowls. The building's derived recipe was still the version 30 one (8 bowls), so a field-guide `gameplay.recipe_per_cycle` now drives the card and the Stroganoff "Made from" line. The card's 1 Stick is whole-unit display: the recipe lights two fires per 4 bowls, and one Stick makes five fires. The agent's "discrepancy to investigate" is resolved this way.
- **Winter Pub, Tailor, Desert Cookhouse, Ice Pop Stand:** the cards match the production steps. Each gets a field-guide `recipe_per_cycle` (no change in ratios; `content:derive` only annotated Ice Pop, Coat and Stroganoff).
- **Glassworks (3 Sticks → 1 Glass Pane) and Canteen Factory (1 Reed Bunch + 2 Glass Panes + 2 Sticks → 1 Canteen):** these differ from the production steps (3 Sticks → 2 Glass Panes; 10 Glass + 5 Reed + 2 Sticks → 5 Canteens). Following CONTRIBUTING ("preserve contradictions"), the decoded recipes stay in charge of the card and rollups, and each guide entry has a `discrepancy` giving both. Fuel shown as whole Sticks on a card is a known pattern (Stroganoff, Bakery's "8 KitchenFire" question).
- **Well:** no inputs, so no `recipe_per_cycle` (the content check requires inputs); the card matches (2 Water, Hydration 1).
- Houses, Bonfire, Swimming Pier, roads and Bridge: claims only. The Bridge card says a Bridge can't be recycled once it connects two landmasses; recycling wasn't tested.

**Workers icon** (issue 62, item 5): the card's WORKERS row shows the hand holding a hammer, which matches `WorkIcon` (313243) exported in research `data/local-build-2026-11-21/artwork/` (not `AdultIcon`). Added as `assets/wiki-artwork/icon-workers.png` and shown before the worker count on every field-guide card.

**Tournament:** the Tournament screen showed the Greek reward track with "12 days left" on 21 November. New observation `tournament-greek-season-live` (gameplay-test); the Rural observation gets a note that Greek replaced it. The Tournament page now takes the most recent confirmed "current season" observation (it took the first one listed).

**Swamp Trappers' Hut label:** the build menu, field guide and placement preview show the right name, so the suspected blank label (research RELEASE-WATCH) wasn't reproduced; the agent already recorded that in the research repo. Nothing changes on the wiki.

**No discrepancy notes on reader pages** (maintainer, 21 November: "we should not be leaking uncertainty"). Field-guide cards no longer link "The recipe differs on one point", and the Winterlands Greenhouse box drops its "Recipe discrepancy" notice. Each card shows one set of numbers, the recipe the rest of the page uses. The guide-versus-steps differences (Glassworks, Canteen Factory, Bakery fuel, the half-value need numbers) stay in each `ui_observations` entry's `discrepancy` and on the research pages. Check 83's Bakery assertion and check 132 now assert the note is absent from reader pages.
