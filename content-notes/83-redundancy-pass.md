## Site-wide redundancy pass (2026-10-28)

The maintainer asked for every page to be reviewed for redundancy. Three reviewers read a rendered sample of every page type (46 pages) and reported about 75 findings. This pass fixes the template-level ones, so each fix covers many pages.

**Tables:** a column whose value is the same on every row is dropped.
- Placeholders such as "Unknown", "—" or "See scenario planting lists" are dropped silently. That removes the Availability column on Buildings, Plants, Resources, Biomes and the campaign tables.
- An informative value becomes one note under the table, for example "Day limit: No limit on every row" on Redux.
- A constant Category column is dropped silently, because the page already says what it is.

**Challenge pages, home and index**
- **Type pages:**
  - The Original, Redux and Bounty subtitles give the schedule; the game quote below says what the type is.
  - Chill, Ranked and Remix state their day-limit rule, checked against the data: every released Chill and Remix level has one, and no Ranked level does.
- **Labels:** the doubled "Redux Redux" label in the current-challenge boxes is gone. The 2pm rollover is stated once on the Challenges page.
- **Home:** the duplicate "A–Z index" and "Challenges" links are gone. The index count now matches the A–Z page (920, without the research pages).
- **A–Z index:** titles that start with a quote mark are filed under their first letter.
- **Campaign pages:** "Level order checked in game" is no longer repeated under every story.

**Building and chain pages**
- **Building pages:**
  - The recipe appears in the infobox and on the field-guide card, and nowhere else.
  - The Production section only adds what those can't: trade options, readable recipes with reused containers and either/or ingredients, gathering notes, and per-unit lines for ratios that aren't whole numbers.
  - The Construction section appears only when no cost is known.
  - The field-guide card's dangling "one difference noted below" becomes a link to the research notes. The duplicate "field guide checked" tag and version line are gone.
- **Chain pages:**
  - The repeated field-guide block is gone.
  - The game files' ratio appears only where it differs from the field guide, as on Bakery: 5 Flour + 4 Stick → 40 Bread.
  - "Listed in file order" moves into the steps summary.
- **Level lists:** repeated Redux titles carry their date. Build lists and starting-object tables list each item once; Save the Forests Redux shows 30 buildings, not 34.

**Resource, food and plant pages**
- **"Needs it satisfies"** only appears when there's more than the infobox shows (needs met at an eating place).
- **"How it is made"** shows the field-guide cycle alone. For other recipes it shows a per-unit line and a batch line only when they differ.
- **Trades** keep their per-unit wording, so Animal Hide doesn't show the whole Glass Pane trade.
- **Building lists** no longer append "View building ↗" to every entry.
- **Plant pages** drop the paragraph that repeated the infobox, and the spread-distance hedge.

**Mechanics:** one home per explanation, linked from elsewhere.
- Time to death lives on Villagers and life. The Heat, cooling and water page links to it instead of repeating the table.
- The Boost is defined on Happiness, and the paragraph there no longer repeats its table.
- The full birth rules live on Villagers and life; Houses keeps two sentences and a link.
- How units work lives on Needs; Gathering places links to it.
- Also removed:
  - the sandbox villager table on Villagers (it's on Sandbox);
  - the Needs page's "More about needs" list (the mechanics menu covers it);
  - the Gear paragraph that repeated its table;
  - repeated "stored, not timed in play" lines.
  The eating page now says the meal log is the only timed check.

**Meta pages**
- **Spoilers:** entries sharing a reason are listed together, with the reason once. Production chains for hidden buildings are covered by one line under Buildings.
- **Verification:** the stale "moved here" and "New findings" notes are gone. Research pages that share a name show their path.
- **Tournament:** reward rows no longer repeat the Streak Shield and Leaderboard Bonus descriptions; the intro explains them once.
- **Leaders:** the subtitle matches the page.
- **Level pages:** the strategy placeholder is one line.

**Not done in this pass:**
- the About, Contribute and Verification overlap;
- the duplicate Food directory table;
- Production chains' Outputs repeating Buildings' Produces;
- changelog entries that later PRs superseded;
- the biome hazard text copied from need pages;
- the Biomes and Grows wild infobox rows on plant pages, which older checks pin.

**Older checks updated:**
- `check-reader-pages.mjs`: campaign stories are verified.
- `check-companion.mjs`: the ratio is on the chain page; capacity and Boost wording; the mechanics menu covers the Needs links.
- `82-level-pages-review.mjs`: Day limit columns may be dropped.
