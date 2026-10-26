# Editable content

Each entry has its own JSON file. `collections.json` records which files assemble into the existing renderer datasets and in what order. Filenames are stable IDs, not display titles.

See [CONTRIBUTING.md](../CONTRIBUTING.md) for the full edit-and-review process. Use `npm run content:find -- pumpkin` to locate an entry, and `npm run validate` for fast structural checks. The normal build validates and assembles the source files into `dist/data/`.

## Common fields

| Collection | Identity | Common editorial fields | Evidence-sensitive fields |
|---|---|---|---|
| buildings | `gameobject_id` | `name`, `description` | `max_workers`, `construction`, `workplace_config`, `formula_ids` |
| resources | `id` | `name` | `need_units`, consumption rules |
| scenarios | `id` | `name`, `description` | `scenario.objectives`, `scenario.day_limit`, `scenario.buildable_entries`, `scenario.level_config` |
| leaders | `id` | `name`, `biography`, `effect` | release/availability claims |
| biomes | `id` | `name` | crop availability and hazard interpretation |

Keep `source`, `source_entries`, GUIDs, hashes and asset identifiers traceable. If you change a factual field, supply evidence and revisit any validation claim that no longer applies. Shared extraction snapshots in `reference/` are evidence, not a second place to silently make the same editorial correction.

Observations have their own records and render in research pages. Spoiler placement is controlled explicitly by `spoilers.json`, not inferred from every unknown release status; `confirmed-unreleased` requires the prefab's own `MinGameVersion` gate (in `decoded-mechanics.json`) to exceed the installed game version, as CONTRIBUTING.md describes. Preserve existing URLs when renaming entries; the renderer retains compatibility routes in the world reference data.

## Research findings

`content/reference/research-findings.json` is a handed-over export from the research agent (see its `provenance` block): decoded gear effects, social-spot and eating-spot need units, the terrain enum, one game day in simulation seconds, crop yields per field, and per-building production profiles whose rates are a supplied-inputs capacity model. Reader pages show the decoded values labelled as stored; the modelled rates appear only on research pages. Re-import the whole file when the research agent publishes a new version; do not hand-edit it.

## Decoded mechanics

`content/reference/decoded-mechanics.json` is a generated export from the research repository (`tools/export_mechanics.py`; see its `provenance` block). Sections: `enums`, `needs`, `concerns`, `reproduction`, `life_stages`, `plant_spread`, `houses`, `heat_sources`, `level_events`, `tournament_boosts`, `min_game_version` (per prefab root: the game version that unlocks it; values above `current_game_version` mean unreleased), `piles` (every pile with capacity, kind and the workspots that fill it), `duplicate_resource_names`, `day_night_cycle`, `sandbox`, `map_generator`, `biomes` and `eating` (the eat activity's priority by hunger status, shared by every villager prefab) and `salvage` (map objects whose dismantling returns a fixed set of resources; the ordinary demolition refund is computed in code and is not stored) (each sandbox MapBiomeSettings with its placeables and map spawns resolved to prefab root names; `biomes.json` holds the same assignments with wiki references and is what the plant pages read). `field_plants` links each field prefab (the wiki's plant record, by `internal_name`) to the plant prefab it grows, and `plants` holds that prefab's harvest or felling formula and its spawners (fruit, sticks, bushes, burrows). Buildings and resources are matched by `internal_name`, which equals the prefab root name. Regenerate rather than edit.

## History

`content/history.json` holds dated changes per entity: `type` (buildings, resources, levels, heroes, biomes), `id`, `game_version`, `date`, `change` and `evidence` (`kind`, `reference`, optional `url`). Entries render as a History section on the entity page and on the Changelog page, grouped by update. Backdate an entry only when an official source or a decoded marker ties the content to that update. After a re-extraction on a new build, `node scripts/compare-content.mjs <old content> <new content> --version N --date YYYY-MM-DD` prints candidate entries for review.

## Strategies

`content/strategies/<level id>.json` holds one community strategy per level: `summary`, `build_order` (list of `gameobject_id` plus `note`), optional `pitfalls`, `status` (`draft` or `reviewed`), `game_version`, `date`, `contributor` and optional `source`. The compile step checks the level and every building exist. Strategies come in through the level-strategy issue form.

## Stored recipes (`made_from`)

Every resource that a building recipe produces carries a generated `made_from` list: one entry per producing building with `per_unit` (inputs for one item, fractions allowed, so a Canteen is 2 Glass Pane, 1 Reed Bunch and 0.4 Stick), the `smallest_whole_batch` the decoded steps reduce to (10 Glass Pane + 2 Stick + 5 Reed Bunch → 5 Canteen), `per_cycle` when the building has a confirmed gameplay recipe, the `formula_ids` and a `status`. Do not edit it by hand: run `npm run content:derive` after changing a building's `derived_recipes` or `gameplay` block, and `npm run validate` fails when the stored values drift from the building data. Same-named conversions (Stick → Stick at the Firewood Yard) are skipped. Level pages use these entries to total what the objectives need, preferring recipes from buildings the map offers and never trading posts.

## Gameplay block

A building record may carry an optional `gameplay` object for facts established outside the decoded formula graph. `recipe_per_cycle` holds the player-facing recipe (`inputs`, `outputs`, `status`, `evidence`) and is rendered as the primary Recipe on building, chain and catalog pages, with the formula-graph ratio kept as supporting detail. `output_capacity` holds how much finished output the building stores before workers stop (`resource_id`, `name`, `count`, `status`, `evidence`). Evidence uses the same `kind`, `game_version`, `date` and `reference` fields as observation records, and `status` is `open`, `confirmed` or `disputed`. Never copy a derived ratio into this block without independent evidence.

## Generated output

`dist/` is generated and not committed. Edit `content/`, `src/` or `assets/`, then run `npm run build` to preview locally. The deploy workflow rebuilds and publishes the site from `main`.
