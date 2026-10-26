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

Observations have their own records and render in research pages. Spoiler placement is controlled explicitly by `spoilers.json`, not inferred from every unknown release status. Preserve existing URLs when renaming entries; the renderer retains compatibility routes in the world reference data.

## Research findings

`content/reference/research-findings.json` is a handed-over export from the research agent (see its `provenance` block): decoded gear effects, social-spot and eating-spot need units, the terrain enum, one game day in simulation seconds, crop yields per field, and per-building production profiles whose rates are a supplied-inputs capacity model. Reader pages show the decoded values labelled as stored; the modelled rates appear only on research pages. Re-import the whole file when the research agent publishes a new version; do not hand-edit it.

## History

`content/history.json` holds dated changes per entity: `type` (buildings, resources, levels, heroes, biomes), `id`, `game_version`, `date`, `change` and `evidence` (`kind`, `reference`, optional `url`). Entries render as a History section on the entity page and on the Changelog page, grouped by update. Backdate an entry only when an official source or a decoded marker ties the content to that update. After a re-extraction on a new build, `node scripts/compare-content.mjs <old content> <new content> --version N --date YYYY-MM-DD` prints candidate entries for review.

## Strategies

`content/strategies/<level id>.json` holds one community strategy per level: `summary`, `build_order` (list of `gameobject_id` plus `note`), optional `pitfalls`, `status` (`draft` or `reviewed`), `game_version`, `date`, `contributor` and optional `source`. The compile step checks the level and every building exist. Strategies come in through the level-strategy issue form.

## Gameplay block

A building record may carry an optional `gameplay` object for facts established outside the decoded formula graph. `recipe_per_cycle` holds the player-facing recipe (`inputs`, `outputs`, `status`, `evidence`) and is rendered as the primary Recipe on building, chain and catalog pages, with the formula-graph ratio kept as supporting detail. `output_capacity` holds how much finished output the building stores before workers stop (`resource_id`, `name`, `count`, `status`, `evidence`). Evidence uses the same `kind`, `game_version`, `date` and `reference` fields as observation records, and `status` is `open`, `confirmed` or `disputed`. Never copy a derived ratio into this block without independent evidence.

## Generated output

`dist/` is generated and not committed. Edit `content/`, `src/` or `assets/`, then run `npm run build` to preview locally. The deploy workflow rebuilds and publishes the site from `main`.
