# Contribute to the Outlanders 2 guide

This is a community-maintained reference with reviewed changes. Pages are generated from data files; they are not edited directly in the browser.

## Report a correction

Open a [content correction issue](https://github.com/kellan/outlanders2-wiki/issues/new?template=content-correction.md). Include the page, what it currently says, your proposed correction, the game version, and evidence. A screenshot of the field guide or a reproducible gameplay test is useful. Describe starting conditions and what you actually observed. You do not need to change code to contribute.

The repository is currently private, so issues and pull requests require collaborator access. These links become available to everyone if the repository is made public.

## Make an edit

1. Create a branch for one correction or closely related set of changes.
2. Find the entry with `npm run content:find -- pumpkin`, or browse the content folders.
3. Edit the JSON record, preserving its stable ID and source references. Add evidence for factual changes.
4. Run `npm run build`, then `npm test`.
5. Run `npm run dev` and review the changed page and its links at the local address printed by the server.
6. Open a pull request describing what changed, why, the evidence, and the checks you ran.

Node.js 18 or later is required. There are no third-party runtime packages to install.

## Where to edit

- `content/buildings/`: one building or plant per file; names, descriptions, worker limits, and linked processes.
- `content/resources/`: one resource per file; names, satisfaction fields, and provenance.
- `content/scenarios/`: one scenario per file; descriptions, objectives, day limits, build/plant lists, and need switches.
- `content/leaders/` and `content/biomes/`: one entry per file.
- `content/observations/`: one sourced claim or open question per file.
- `content/collections.json`: ordered lists of record files. Add a new record here without changing existing IDs or casually reordering entries.
- `content/reference/`: shared catalogs, recipes, source exports, and extraction metadata. Most corrections should not require editing these files.
- `src/`: page rendering, stylesheet, and document shell.
- `dist/`: generated site and assembled datasets. Do not edit these directly; include the regenerated changes with your pull request.

Files use stable IDs rather than titles, so renaming Pumpkin does not break its links to scenarios. Use readable names in the `name` field; preserve internal identifiers for matching records.

## Evidence and uncertainty

Use the in-game field guide for displayed names, recipes, construction requirements, and worker slots. Use scenario data for stored objectives, building lists, and need switches. Use controlled gameplay observations for actual timing, yields, consumption, and behavior. A stored value is not automatically a measured gameplay result.

Record a new claim in `content/observations/`. Each record needs an ID, target type and ID, claim, status, and evidence with a kind, game version, date, and reference. See `content/observations/clay-pit-late-start.json` for an open question. Supported statuses are `open`, `confirmed`, and `disputed`. Supported evidence kinds are `player-report`, `field-guide`, `gameplay-test`, `decoded-data`, and `official-source`.

Observation records appear in the article's research notes. They do not automatically replace gameplay facts. If a claim is confirmed, update the appropriate content field and explain how the evidence supports that change. Do not mark an observation confirmed just because it sounds plausible.

Preserve contradictions. For example, the Bakery field guide and decoded process balance differ on fuel consumption. Record both rather than silently choosing one. If a factual correction changes a decoded objective, update its validation status and retain the original evidence; do not leave a claim that the changed values match the original bytes.

For scenario needs, omitted means unspecified; it does not mean false. For crops, use the exact scenario planting list. A sandbox biome reference alone does not establish normal crop availability. Unknown values must not be replaced with zero.

## Spoilers and unreleased content

Use `content/spoilers.json` to place confirmed or explicitly reported unreleased content in the Spoilers section. Each entry records its target, classification, date and reason. Related content can be withheld as `related-release-unconfirmed` without asserting it is unreleased. Use the existing availability record and explain the evidence. Do not infer unreleased status merely from an unfamiliar name or presence in the game files. Keep uncertain release status distinct from spoilers.

Do not expose spoiler names in ordinary index pages, search results, or related-entry lists. Test both the Spoilers page and the regular catalog when changing an availability record. Use a neutral issue or pull-request title when the details contain spoilers.

## Images and private information

Use only necessary evidence images, with the game version and source noted. Crop out account details and personal information. Do not upload game executables, complete asset bundles, decompiled assemblies, save games, credentials, or machine-specific logs. Game artwork and text have separate rights from the site's code; see the publication notes before adding redistributable assets.

## Before requesting review

Keep the change focused. Check names, numbers, links, evidence, and spoiler classification. List unresolved questions honestly. The maintainer reviews and merges changes; merging source changes does not currently publish the website.

## Licensing and attribution

Submit original code and editorial contributions under the project’s MIT license. Only contribute material you have the right to license. Identify game-derived text, artwork and other third-party material and preserve its attribution: these are excluded from MIT. We retain game artwork and text as reference material without claiming ownership. See THIRD_PARTY_NOTICES.md for the boundary.
