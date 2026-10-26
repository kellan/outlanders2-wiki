# Changelog

What changed on the wiki, newest first, with the page to look at. One line per merged pull request; the game's own version history is on the [Changelog page](https://outlanders2wiki.com/changelog/) under "Game updates", kept in `content/history.json`. Content provenance and reasoning live in `CONTENT-NOTES.md`; this file is the short reader-facing list.

Every pull request adds its line under **Unreleased**; the maintainer moves the block under a date when it merges to `main`.

## Unreleased

- Observations: villagers wear Coats when cold; the Coat is Heat gear with a stored warmth value of 129 (see the Coat resource page).
- Wiki changelog: this file, rendered at the top of the [Changelog page](https://outlanders2wiki.com/changelog/) as "Wiki changes".

## 2026-10-26

- Guides elsewhere: a [links page](https://outlanders2wiki.com/guides-elsewhere/) for guides, videos and communities on other sites, a suggestion form, per-level links in Strategy sections and a weekly dead-link check (#43).
- Level pages: Starting conditions now resolve workplaces, homes, roads, the starting leader, wild trees, growing crops, rock and reed sources, loose piles, tools, salvage and scripted arrivals; the [Levels directory](https://outlanders2wiki.com/levels/) gains a "You start with" column. See [Morrigwyn Stones](https://outlanders2wiki.com/levels/morrigwyn-stones/) (#42).
- `docs/PLAYTESTS.md`: step-by-step in-game test protocols for a computer-use agent, separate from the file-decode questions (#44).
- [Gathering places](https://outlanders2wiki.com/gathering-places/): what one visit to each park, plaza, kitchen or pub gives, read from the decoded social spots; building infoboxes and the [Needs page](https://outlanders2wiki.com/needs/) use the same data (#41).
- [Houses](https://outlanders2wiki.com/houses/): every house compared, with baby and pet spots, cost per villager, heating, biomes and the reproduction values that make spare housing matter (#40).
- Villagers fed: a Feeds row on plant pages, a Feeds column on the [Plants overview](https://outlanders2wiki.com/plants/) and a ranked "How much each source feeds" table on the [Food page](https://outlanders2wiki.com/food/) (#40).
- Trees: a Spreads row with the stored self-seeding chance; the [Fishing Dock](https://outlanders2wiki.com/buildings/fishing-dock/) states its random catch and the [Bonfire](https://outlanders2wiki.com/buildings/bonfire/) the warmth its tender gains (#39).
- Salvage: level Starting conditions list what ruins, crates, canoes, pallets and gifts return when dismantled, with a total (#30).
- [Needs page](https://outlanders2wiki.com/needs/): "How eating works", from the stored hunger meter and the villagers' eat priority: the timeline from full to starving, the urge-to-eat table and what each food is worth (#28).
- Level objective totals round up to whole items, and gathered items (sticks, logs, stone, fish, field crops) stop at the map instead of being worked back through a factory. See [Mom's Gardens](https://outlanders2wiki.com/levels/mom-s-gardens/) (#27).
- Plants: pages show the sandbox biomes that plant each crop or tree, the building that plants it there and where it grows wild; "Planted by" is read from data, so the [Nopal Tree](https://outlanders2wiki.com/plants/nopal-tree/) is planted by the Oasis (#26).
- Plants: yields lead by plant type, "orchard trees" are called fruit trees, and fruit trees get a Rate row comparing fruit per day and how fast a full tree fills (#26).
- Spoilers page: a note on how unreleased status is decided from the files' version gates; construction-cost rollups tracked in issue 23 (#24).
- [Plants](https://outlanders2wiki.com/plants/) become their own section with felling yields and fruit intervals for every tree; work schedules are described against the clock dial (#24).
- Decoded mechanics on the site: output capacities, heating, baby and pet spots, version gates, need meters, concern effects, Tropical weather and tournament boosts (#22).
- Resources store their own recipe (`made_from`), shown per unit on resource pages, and level pages gain "What the objectives need" (#19).

## 2026-10-25

- Companion layer: infoboxes, verification badges, uses and required-by links, grouped level availability, leader and story links, navboxes, catalog columns, contribution links and the CI test workflow (#13).
- Level strategies: a contribution form and a Strategy section on every level page (#14).
- Version history: per-entity History sections, the [Changelog page](https://outlanders2wiki.com/changelog/) of game updates, and seeded backdating (#15).
- Production model, work schedules and ratio corrections on building pages; the information-needed list for the local agent (#16, #17).
- Publishing from CI to the custom domain; Tournament Mode page and naming; spoilers demoted in navigation; issue forms; need effects stated by building descriptions (#18).
- Stored-configuration additions: biome per level, starting conditions, the Needs page, age limits, harvest sources and placement rules (#22 groundwork).

## 2026-10-24

- Scenario extraction: 133 decoded level pages with exact objectives, day limits, build and plant lists and need flags; objective wording distinguishes Have, Create and HaveInBuilding.
