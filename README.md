# Outlanders 2 community guide

A reviewed, data-backed reference: static pages generated from individual JSON records. Contributions arrive through issues and pull requests rather than browser edits.

- [How to contribute](CONTRIBUTING.md)
- [Content format and editing locations](content/README.md)
- [Publishing plan](docs/PUBLISHING.md)
- [Tools, public/private boundaries and rights review](docs/TOOLS-AND-PUBLICATION.md)

## Work locally

Requires Node.js 18 or later. No package installation is needed.

```
npm run content:find -- pumpkin
npm run build
npm test
npm run dev
```

Edit `content/` for data and `src/` for presentation. The build validates and assembles the datasets and generates `dist/`. Submit source and generated changes together. `npm run validate` performs a fast data-only check.

The Contribute page is built from `CONTRIBUTING.md`, so repository and website instructions stay in sync. GitHub issue and pull-request templates request the correction, evidence, version and validation results.

## Spoilers

`content/spoilers.json` identifies entries kept out of ordinary catalogs, search and related lists. Dedicated spoiler pages distinguish reported-unreleased content from associated release-unconfirmed material. This is a reader preference, not data access control; complete datasets include spoiler records.

## Current status

The repository is private and there is no public deployment. GitHub Pages is a suitable publishing target once artwork/text redistribution, licensing and visibility have been decided. No deployment workflow is installed.

Original tooling, extracted game material and contributed writing have different provenance. Original contributions are MIT-licensed; game artwork, text and other third-party material are explicitly excluded. See LICENSE and THIRD_PARTY_NOTICES.md. See the publication notes before redistributing repository contents.

## Evidence

The installed game source is version 30, build 254. The guide links 133 packaged scenarios to decoded data. 438 objective records in the full extraction were independently compared between level headers and world records. The in-game field guide supplies complementary displayed recipes and requirements. Research notes retain contradictions, source identifiers and unresolved runtime behavior.

## Local file preview

Run `node scripts/offline-preview.mjs` after building to regenerate the disk-friendly preview. `node scripts/check-offline.mjs` validates its local links. Public deployment uses `dist/`, not the preview directory.
