# Hedge sweep: how-we-checked asides off reader pages

Follows the rule added in PR 125 ("keep how-we-checked out of reader pages") and step 4 of docs/EDITORIAL-CLEANUP-PLAN.md. Template sentences in `src/app.js` were cut or rewritten so they state the fact:

- Dropped: "Recipe ratios come from each resource's stored recipe…", "Per-cycle speed is not stored", "(stored on the workspot / its social spots…)", "(stored)", "stored durations, not timed in play", "Not yet checked in play", "nobody has timed … in play", "Read from the game code (version N)…", "The game files call it FastMode/Leaderboard", "From the stored spawners… (version 32 files)", code class names on the Sandbox page.
- Rewritten: "The game files hold more than one building…" → "There is more than one building…"; "The game files differ on one point" → "The recipe differs on one point" (chain-page heading "From the production steps"); "No construction cost was found in the game files" → "No construction cost is known"; "has not been checked in play" → "is not known"; "decoded stage timings…; ceilings, not measured output" → "The most it can make with every input already at the building".
- Evidence-kind labels: History rows and recipe lines no longer print "decoded data"; capacity rows no longer print their evidence kind (disputed ones still say so). Player reports, field-guide and gameplay-test labels stay.

Measured over 1,252 reader pages (research, spoilers, changelog, About and contribute pages excluded): "stored" 816 → ~150 (what's left is mostly game text such as "Have 40 Veggies stored in Markets" and "everything stored in it"), "game files" 368 → ~40, "decoded" 93 → ~35 (mostly the changelog fragments and "Seen in play" observation notes).

Not done here: the text inside observation records (`content/observations/*.json`, shown under "Seen in play") and changelog entries still describe how things were found. That is their job, but some observation notes are long; trimming them is a separate pass.

Checks updated where they asserted the removed wording: check-companion (bakery chain heading, needs social value, reuse delay), 83, 92. New check 126 bans the phrases on reader pages.
