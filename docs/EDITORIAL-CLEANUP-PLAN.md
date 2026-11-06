# Editorial cleanup plan

The wiki should answer player questions plainly ("how many days until carrots?", "how does Fun work?", "how many trees are on this level?") while staying a dense reference. A review of the rendered site in November 2026 (v31 · build 255) found the mechanics pages close to that voice and the generated catalog pages far from it. This plan turns the review into rules, an inventory, and a sequence of pull requests.

## The standard

A reader page passes when it does all three:

1. **Leads with the answer.** The first line or infobox row answers the question the page exists for: what a building does and makes, how long a crop takes, what a need is and how to keep it met.
2. **Speaks in player units.** Days and real minutes, items per villager, cost per bed, game squares. No fractions to three decimals ("1 Stick for every 14.993 Stew"), no raw stored values without a conversion.
3. **Keeps evidence at the end.** Facts are stated plainly. How sure we are goes in one closing line or a small "unconfirmed" marker, and the detail lives on the research page. Contradictions are kept (CONTRIBUTING requires it), but as one short note, not woven through the text.

A page fails when it does any of these:

- **Dumps the data:** lists whatever the record holds, in file order, under internal names (`AlmostStew`, `KitchenFire`, `1-3 BrokenWatchtower`, `Unnamed scenario · archive 19 · 1`).
- **Pads:** long level lists, a sibling-catalog menu at the bottom of every page, empty sections ("No material inputs recorded for this step").
- **Hedges inline:** "stored", "decoded", "not yet checked in play", "the scene name is stored map configuration; it does not by itself establish…" in the reading text. 364 reader pages use "stored"; 132 say "file order".

## Inventory and verdict

Counts are canonical reader pages in the current build.

| Page type | Pages | Verdict | What changes |
|---|---|---|---|
| Production-step "resources" (`AlmostStew`, `ResourceBase`, `Back`, `Tweezers`…) | 184 | **Remove from the reader site** | No own page, no A–Z, search or sitemap entry. Redirect each to the building that uses it. Internal names appear only on research pages. |
| Production chains, plants (`carrot`, `field-carrot`…) | ~64 | **Remove** | Redirect to the plant page. Half are `field-` duplicates. |
| Production chains, buildings | ~62 | **Fold into building pages** | Recipe, output storage and any field-guide disagreement move to the building's Production section; the step graph moves to the research page with plain labels; redirect. |
| Duplicate-ID variants (`communal-plaza-115541`, `tweezers-300099`…) | 18 buildings, 37 resources | **Merge** | One page per name; variants become an "Other versions" row. Redirect the numbered URLs. |
| Unnamed archive maps (`unnamed-scenario-archive-19-1`…) | 19 | **Collapse** | One table on the Chill challenges page. Drop them from every "Where it can be built" list. |
| Building pages | 137 | **Rewrite the top** | Lead with what it does and makes, linked to inputs and outputs. Fix the workplaces labelled "Structure or decoration" (Farm, Greenhouse, Roadworks Office, Fitness Park). Collapse level lists. |
| Plant pages | 33 | **Reorder** | Infobox leads with grows in, yields, planted by. "Feeds about…" stays but below. |
| Real resource and food pages | ~70 | **Trim** | Drop the 30-item footer menu; keep Made from, Used in, Objectives. |
| Level and challenge pages | ~415 | **Trim** | Keep Starting conditions (the best block on the site). Move the raw "Starting objects & resources" table to research. Hide the Biome row when it is not recorded (57 pages) instead of printing "Not recorded". Fix "is a Original challenge". |
| Biome pages | 7 | **Rewrite lead and hedges** | Say what the biome is like to play (needs it switches on, crops, hazards) first. |
| Mechanics and need pages | 21 | **Hand edit** | Mostly good. Fun first: short lead, code class names out of "Seen in play", remove the contradictory "unverified" paragraph. |
| Leader pages | 15 | **Keep** | Thin but clean. |
| Research pages (`/verification/…`) | 935 | **Keep, hide from search engines** | They are evidence and stay public, linked from each article, but carry `noindex` and are left out of the sitemap (they were 905 of its 1,857 URLs). They were already out of site search. |

Phase 1 alone takes roughly 380 pages off the reader surface (production-step pages, all chain pages, duplicates, unnamed maps) without losing a fact: everything stays reachable from research pages, and every old URL redirects.

## How removal works

- **Redirect, never 404.** The build already writes 349 alias pages (`canonicalPath` in `scripts/build.mjs`). Removed pages become aliases pointing at their new home.
- **Nothing is deleted from `content/`.** The records still drive recipes, rollups and research pages. Only the reader pages and their index entries go.
- **One switch per page type.** `src/app.js` already has `showInternal` and `suppressedPages`; extend these so a page type can be "research only" rather than adding special cases.
- **Out of every list.** A–Z index, search, sitemap, `llms.txt`, related-page lists and the home page.

## Sequence

Each step is one pull request with the repository's usual numbered `changelog/unreleased/` entry, `content-notes/` note and `scripts/checks/` test, so the rule stays enforced after the cleanup.

### 1. Take the non-pages off the reader site (mechanical, low risk)

- Production-step resources, plant chains, duplicate IDs and unnamed archive maps become redirects.
- Remove them from the A–Z index, search, sitemap, `llms.txt` and related lists.
- Research pages: `noindex` and out of the sitemap.
- **Check:** no reader page title or link text matches an internal-name pattern (CamelCase with no space, `Step0`, `-123456` suffixes, "Unnamed scenario"); every removed URL resolves to a redirect.

### 2. Fold building chains into building pages

- Building Production section: recipe per cycle, output storage, one line on any field-guide disagreement, link to the research page for the step graph.
- Step graph on the research page with plain labels and steps in working order where it can be derived; otherwise drop "in file order".
- Repurpose `/production-chains/` as one page organised by end product (Wheat field → Windmill → Bakery → Bread), built from `made_from`.
- **Check:** no reader page contains "file order", "No material inputs recorded" or a ratio with more than one decimal place.

### 3. Fix the templates that pad every page

- Replace sibling-catalog footer menus with one "All resources →" style link.
- "Where it can be built" and "Where it can be planted": a one-line summary ("Buildable on 380 of 390 levels, including every campaign level") with the full list collapsed in a `<details>`; lists under 15 entries stay open.
- Level pages: raw object table to research; hide unrecorded rows; grammar fixes.
- Building type labels corrected; infobox order on buildings and plants leads with the answer.
- **Check:** a reader page's visible word count outside collapsed sections stays under a per-type budget; Farm's type is a production building.

### 4. Move hedges to the end

- Write the rule into CONTRIBUTING under "Evidence and uncertainty": state facts plainly; one closing evidence line; an "unconfirmed" marker for open values; detail on the research page.
- Sweep the 364 "stored" pages by template first (most come from a handful of shared sentences), then by hand.
- Extend `scripts/checks/85-stray-language.mjs` with a banned-phrase list for reader pages ("stored on", "decoded", "in code", "raw stored value", "not yet checked in play", code class names).

### 5. Hand edits to the pages players reach first

In priority order: Fun and the other need pages, Farm and the ten most-built buildings, the seven biome pages, the home page section intros. Each building gets a one-sentence "what it does" line where the field guide quote is the only description.

## Measuring done

- Reader pages in the sitemap go from about 950 to about 570, research pages from 905 to none.
- The checks from each step pass in CI.
- Spot-read test: for each of the three example questions, the answer is in the first screen of the page a search lands on.

## Decisions

- **Research pages** stay public but are hidden from search engines: `noindex, follow` and no sitemap entry.
- **Production-step names** never appear on reader pages: players do not see them in game, so there is no glossary. They live only on research pages.

## Progress

- Step 1 (PR 101): done. Production-step pages, plant chain pages, same-name copies and unnamed maps redirect; research pages noindex and out of the sitemap. Biome Trading Outposts deliberately keep separate pages.
