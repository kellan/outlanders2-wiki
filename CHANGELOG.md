# Changelog

What changed on the wiki, newest first, with the page to look at. Entries live as one file per change under `changelog/` so pull requests never collide: add `changelog/unreleased/<pr-number>-<slug>.md` with one paragraph; `npm run changelog:release` dates a batch on merge. The game's own version history is on the [Changelog page](https://outlanders2wiki.com/changelog/) under "Game updates" (`content/history.json`). Reasoning and provenance stay in `CONTENT-NOTES.md`.

## 2026-10-26

- Changelog entries now live one file per change under `changelog/`, assembled at build time and released in dated batches with `npm run changelog:release`, so parallel pull requests no longer conflict on CHANGELOG.md (#53).
- Those recipes are now stored with each resource and used on resource pages and in level objective totals: Frostbound Valley's 100 Stew needs 67 Veggie (or Meat or Egg) and 7 Sticks instead of "gathered or traded" (#52).
- Readable recipes for the 32 buildings that said "no single ratio applies": Open Kitchen "3 Stew ← 2 × (Veggie, Meat or Egg) + 1/5 Stick (plates reused)", Winery, Brewery, Cheesery, Trappers' Hut and the rest; planters, storage and the beer stand get plain sentences (#51).
- Dish pages (Stew, Fondue, Manchamanteles, Barley Porridge) and their eating places say why villagers prefer them over food of the same value: the second effect and eating in company (#50).
- [Needs](https://outlanders2wiki.com/needs/) redesigned: an at-a-glance table of the eight needs, then compact item and place tables per need with meter points and second effects; Houses say crib and doghouse and explain why more houses mean more babies; Gathering places explains the unit; the Bonfire page says how long a stick burns (#49).
- Level pages list visitors by arrival day ("30 adults on day 50, announced from the start" on Sold Out; three waves on Anthology) and other timed events such as rain and no-births notices; extraction buildings say what they gather and that nothing goes in; the Fishing Dock page states its random catch and real pile size (#48).
- Every table sorts by clicking a column heading; numbers sort as numbers and blanks stay last (#46).
- Wiki changelog: this file, rendered at the top of the [Changelog page](https://outlanders2wiki.com/changelog/) as "Wiki changes".
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
