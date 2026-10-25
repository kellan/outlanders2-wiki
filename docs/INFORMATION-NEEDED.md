# Information needed

A running list of facts the wiki wants but does not have, with the most likely way to get each one. Items are removed once the information is in `content/`; the removal is logged in `CONTENT-NOTES.md`. Add items here when an article has to say "not established", and remove them in the same change that records the answer.

How to read the "Source" column:

- **mine**: decode it from the installed game files with the research tools (`kellan/outlanders2-research`).
- **screen**: capture it from the running game (field guide, menus, building panels), for example with computer use on the maintainer's Mac.
- **test**: a controlled gameplay observation recorded as a `content/observations/` entry.
- **official**: release notes, store pages or developer statements.

## Buildings and production

| Need | Why it matters | Source | Status |
|---|---|---|---|
| Output storage capacity per production building | Workers stop when the output store is full, so capacity bounds every production plan | mine: the `StockpileBehaviour`, `ResourcePileBehaviour` and `PileableBehaviour` objects were round-trip validated (ids 279804, 276812, 278269) but their fields were never exported. Run `python3 research.py run stream_decode.py ResourcePileBehaviour StockpileBehaviour PileableBehaviour` in the research workspace, then link each pile to its building's output; test otherwise | Bakery: 40 Bread recorded from the maintainer's report (player-report, open). Every other building unknown |
| Production time per cycle for each building | Needed before any throughput or "how many bakeries for N villagers" guidance | mine (formula step durations, `work_iterations` is 0 on most steps), test | Unknown for all buildings |
| Field guide text, recipe, cost and worker slots for every building | Displayed recipe is the player-facing per-cycle recipe; derived ratios stand in until it is captured | screen | 4 of 63 production buildings captured (Bakery, Windmill, Sawmill, Greenhouse); only the Bakery has a confirmed `gameplay.recipe_per_cycle` |
| Whether leftover fuel carries between cycles (Bakery formula 297381 is named "1 Stick -> 8 KitchenFire" but serializes 10) | Decides whether every fifth cycle is fuel-free or the extra fire is wasted | mine (formula tuning history), test | Unverified |
| Construction stage repetition and alternative materials | Construction totals may be under- or over-counted | mine, test | Unresolved for all buildings |
| Equipment requirements and wear | Some formula steps require equipment; effect on output unknown | mine, test | Unresolved |
| Which packaged building and resource variants are used in play | Catalog lists several same-name definitions | screen, test | Unverified |
| Alternate resource logic (`ResourceVariationDatabase`) | Affects which inputs a recipe accepts | mine | Not decoded |
| Trading Outpost rules: whether the Wheat, Glass Pane and Animal Hide formulas are trade rates, and any other goods or prices | A Trading page cannot be written without them | mine, screen | Formulas decoded, meaning unverified |
| Fishing Dock, Foragers' Hut and other extraction yields | Early-game food planning | mine, test | Unknown |
| Icons for the 4 buildings without artwork | Infobox and catalog completeness | mine | 150 of 154 covered |

## Crops and biomes

| Need | Why it matters | Source | Status |
|---|---|---|---|
| Harvest yield per crop and orchard plant | Food planning; growth stage days are decoded but yields are not | mine, test | Unknown |
| Real growth time versus stored stage days | Stored stage days may not equal calendar days | test | Unverified |
| Crop availability per biome in normal play, including greenhouse rules in Winterlands | Sandbox assignments are decoded but flagged as not proof of availability | test, screen | Under review |
| Biome hazard mechanics: heat, cooling and hydration penalties, Boost effect | Needed for Needs and Biome pages | mine, test | Help text only |

## Villagers and needs

| Need | Why it matters | Source | Status |
|---|---|---|---|
| How need configuration maps to play: `DailyRequired`, `UnitValue`, thresholds versus resource `need_units` | Decoded values exist but no one has confirmed what one unit buys | mine, test | Decoded, unverified |
| Food consumption per villager per day | The single most useful planning number | test | Unknown |
| Need decay rates, death timing and the happiness formula | Needs and Happiness pages | mine, test | Unknown |
| Villager ageing: baby, kid, adult durations and population growth rules | Housing and population objectives | mine, test | Unknown |
| Housing details: baby and pet spaces, whether Houses accept partial families | Housing page and objective planning | screen, test | Unknown |
| Leader effect magnitudes, duration and scope | Leader pages show only descriptions | mine, test | Not decoded |
| Work schedule to clock mapping (Clay Pit interval 0 to 0.6 versus Farm 0.9 to 0.5) | Open observation about clay workers sleeping in | test | Open |

## Levels, campaigns and challenges

| Need | Why it matters | Source | Status |
|---|---|---|---|
| Story-to-level mapping for Campaign 1 and 2 stories | Currently inferred from identifiers; only story order was menu-checked | screen | Inferred |
| Campaign 3: menu placement of the three levels outside Fjordi's Birthday | They render as "Other levels" | screen | Unknown |
| Menu names and placement for the 19 unnamed archive maps and the standalone-or-challenge category | Pages titled "Unnamed scenario · archive N" | screen | Unknown |
| Unlock prerequisites and what each level unlocks | Level walkthroughs cannot state progression | mine (campaign config), screen | Unknown |
| Challenge type rules for Chill, Ranked and Remix, scoring, and schedule | Challenges page lists names only | screen, official | Partial (Original, Redux, Bounty described) |
| Release and menu availability for levels, buildings and leaders | Most entries show "Unknown" | official, screen | 2 availability records; Oona and related content classified |
| Day length and what "day limit" counts | Objective planning | test | Unverified |

## Site data

| Need | Why it matters | Source | Status |
|---|---|---|---|
| Runtime colour composition for leader portraits | Portraits are static variants | mine | Not reproduced |
| Second game build for version history | History sections need a diff | mine (next release) | Waiting on a new build |
