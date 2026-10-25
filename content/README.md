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

## Generated output

Do not edit `dist/data/`, `dist/app.js`, `dist/style.css`, or generated HTML directly. Edit `content/` or `src/`, then run `npm run build`. Submit the source and regenerated output together while the repository uses checked-in static pages.
