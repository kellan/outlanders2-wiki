# Outlands Fieldnotes

An unofficial Outlanders 2 wiki. Static HTML and CSS, with a dependency-free JavaScript page generator. Published pages do not load JavaScript. No third-party runtime dependencies or package installation are required.

## Run locally

With Node.js 18 or later:

```sh
npm run dev
```

Open **http://127.0.0.1:5173**. To choose another port, set `PORT` before starting the server. Stop with Ctrl+C.

## Check the site

```sh
npm test
```

The check renders every recovered route, validates deep article links and static page targets, exercises search, checks biome and availability labels, verifies artwork references and tests a GitHub repository path prefix. It is not a browser screenshot or layout test. Browser visual QA still needs to be completed.

## Content

- Buildings: construction material formulas, staffing, housing and linked production.
- Resources: satisfaction values, intermediate states and producing/consuming buildings.
- Production chains: individual steps and derived material balances.
- Campaigns and levels: 117 map entries, including objective templates and conflicting text versions.
- Challenges: recovered mode help and map candidates; no live schedule claims.
- Biomes: six names, original previews and environmental help where available.
- Heroes/leaders: 14 biographies and effect descriptions, with original portrait art.
- Verification ledger: what is decoded, derived or still unknown.

Rules distinguish decoded data, field-guide observations and runtime behavior that still needs verification. Decoder validation does not prove runtime behavior. Exact objectives, build lists and need switches are linked for all 133 catalog scenarios. Internal filenames and open questions are retained on dedicated research pages. Campaign story order and representative challenge categories have been observed in the game; inferred level mappings remain labeled.

## Files

`dist/` is the complete deployable site. `dist/data/rules.json` and `dist/data/world.json` contain the normalized content; the extraction manifest and decoder validation are alongside them. `dist/data/artwork.json` maps entries to original game sprites and records their provenance. Source object IDs and localization keys are retained in the data and dedicated research pages.

Artwork is extracted from the installed game: 80 unchanged original line sprites, 45 leader portrait variants and six biome previews. No icon recoloring is applied. A contrasting background supports black or white source sprites; runtime UI composition is not reproduced. Portraits and biome previews retain original colors. Outlanders 2 and its artwork belong to Pomelo Games; extracted art is not licensed as open-source code. This is an unofficial fan reference.

## GitHub Pages, later

The site generates a real static HTML file for every clean URL: `/buildings/`, `/buildings/bakery/`, `/food/bread/`, `/biomes/evergreen/`, and `/index/` (the back-of-book alphabetical index). Relative asset paths support both a GitHub project URL and a custom domain. `/building/bakery/` is a compatible alias.

1. Use this private repository as the source.
2. In GitHub repository settings, choose **Pages → Source → GitHub Actions**.
3. Add a deployment workflow only when public hosting is explicitly requested.

Run `npm run build` after changing application code or data to regenerate the static pages. This private repository intentionally omits deployment workflows. For a custom domain, configure it in GitHub Pages and add its hostname to `dist/CNAME` once the domain is known.

Private repository: https://github.com/kellan/outlanders2-wiki. No public deployment is enabled.

## Evidence version

The dataset comes from the Mac installation of game version **30**, build **254**, extracted October 23, 2026. A representative/core set of 1,800 definitions, including every recovered formula, passed exact decode/re-encode checks and matched the exported fields. Packaged content may include unused entries and variants.

## Content availability

Availability is independent from gameplay verification. Oona is labeled user-reported unreleased, with packaged update-28 text retained as supporting context; no release date is invented. Official story release dates are linked where recovered, with year inference and first-appearance limits explicit. Other entries remain unknown rather than presumed released.

Crop pages use scenario-specific planting lists. Sandbox biome assignments are retained in research notes because assignment alone does not establish playable crop availability. Pumpkin’s Tropical reference remains under review.

The local preview uses generated HTML pages with explicit index.html links so it works directly from disk without JavaScript. The served site uses clean paths and a generated HTML file for each entry. `node scripts/offline-preview.mjs` refreshes that preview next to the repository; `node scripts/check-offline.mjs` checks it.

## Layout conventions

Use the game’s field guide as a visual reference: compact icon-and-title headers, warm neutral panels, and clearly separated inputs, outputs, costs and workers. Keep original game artwork unchanged. Category pages show complete tables; detail pages link related resources, buildings, production chains, leaders and scenarios. Keep the alphabetical all-pages index separate from the home page. Use plain factual headings and visible links, without animated cards or client-side rendering.

Scenario content should come from recovered scenario data; game browsing is now for visual and layout reference rather than a prerequisite for documenting scenarios.

## Reader pages and research

Reader pages use localized names and concise gameplay facts. Plant pages omit construction costs, worker limits and housing. Technical schedules, pending checks, source dumps and data discrepancies live under `/verification/`, with a link from each article. Existing crop URLs remain compatible aliases.

The in-game field guide is a complementary source for displayed recipes and construction requirements. The Bakery fuel discrepancy remains documented. Clay Pit’s work schedule differs from Farm’s; exact clock hours and longer sleeping are not established.
