# Information needed

A running list of facts the wiki wants but does not have, with the most likely way to get each one. Items are removed once the information is in `content/`; the removal is logged in `CONTENT-NOTES.md`. Add items here when an article has to say "not established", and remove them in the same change that records the answer.

## If you are an agent gathering answers

Read this whole file, pick rows you can answer, and return answers in one of these ways, preferred first:

1. **Append to [`docs/INFORMATION-ANSWERS.md`](INFORMATION-ANSWERS.md) on this branch** (`wiki-companion-improvements`) using the template at the top of that file, one entry per fact, then commit and push. Put screenshots in `assets/gameplay-evidence/` with a descriptive filename and reference them from the entry. Do not edit `content/` or this file yourself; the wiki session records each answer with evidence, removes the row here, and marks the entry recorded.
2. **Comment on [issue 10](https://github.com/kellan/outlanders2-wiki/issues/10)** with the same fields if you cannot push.

Every answer needs: the row it answers (quote the first cell), the fact with numbers and units as the game shows them, how it was obtained (field guide, building panel, in-game clock, timed test with starting conditions, decoded data, official source), the game version, the date, and any screenshot filename. Say when a result is partial or uncertain; a wrong "confirmed" costs more than a gap.

Answers go in [issue 10, the answers thread](https://github.com/kellan/outlanders2-wiki/issues/10), one comment per fact with how it was obtained, the game version and any screenshot path. They are checked against the decoded data, recorded with evidence, and the row is removed in the same commit.

Rows marked **mine** are collected, prioritised and mapped to the exact classes to decode in the research repository's [`docs/DECODE-TARGETS.md`](https://github.com/kellan/outlanders2-research/blob/decode-targets/docs/DECODE-TARGETS.md). Start there if you have the extraction workspace.

How to read the "Source" column:

- **mine**: decode it from the installed game files with the research tools (`kellan/outlanders2-research`).
- **screen**: capture it from the running game (field guide, menus, building panels), for example with computer use on the maintainer's Mac.
- **test**: a controlled gameplay observation recorded as a `content/observations/` entry.
- **official**: release notes, store pages or developer statements.

## Buildings and production

| Need | Why it matters | Source | Status |
|---|---|---|---|
| Effective output storage capacity per production building | Workers stop when the output store is full; decoded pile records give nominal sums (Bakery 4 × 15 = 60, Glassworks 2 × 24, Cheesery 36) but which piles are active and how the stop condition works is untraced | mine: the `StockpileBehaviour`, `ResourcePileBehaviour` and `PileableBehaviour` objects were round-trip validated (ids 279804, 276812, 278269) but their fields were never exported. Run `python3 research.py run stream_decode.py ResourcePileBehaviour StockpileBehaviour PileableBehaviour` in the research workspace, then link each pile to its building's output; test otherwise | Public-output pile capacity decoded for every building (infobox Capacity row, pile tables on research pages, 26 Oct 2026); the stop condition (status NoSpace) is code and which piles count is still a test |
| Measured production per day for key buildings | A supplied-inputs model now gives ceilings (Glassworks 7.5 panes, Cheesery 27 cheese, Bakery about 44 Bread per day with two workers) from decoded stage timings; nobody has measured a real building | test (count output of a staffed building over several days) | Model on research pages since 26 Oct 2026; 37 timeline directors still unresolved |
| Whether the per-cycle recipe each building's field guide shows matches the per-unit ratio derived from the steps, for every producer, not just the Bakery | Resource and level pages state per-unit ratios (Canteen: 2 Glass Pane, 1 Reed Bunch, 0.4 Stick); the Bakery already showed the field guide batches differently from the graph | screen (field guide per building) | Only the Bakery captured |
| Field guide text, recipe, cost and worker slots for every building | Displayed recipe is the player-facing per-cycle recipe; derived ratios stand in until it is captured | screen | 4 of 63 production buildings captured (Bakery, Windmill, Sawmill, Greenhouse); only the Bakery has a confirmed `gameplay.recipe_per_cycle` |
| Whether leftover fuel carries between cycles (Bakery formula 297381 is named "1 Stick -> 8 KitchenFire" but serializes 10) | Decides whether every fifth cycle is fuel-free or the extra fire is wasted | mine (formula tuning history), test | Unverified |
| Construction stage repetition and alternative materials | Construction totals may be under- or over-counted | mine, test | Unresolved for all buildings |
| Equipment requirements and wear | Some formula steps require equipment; effect on output unknown | mine, test | Unresolved |
| Which packaged building and resource variants are used in play | Catalog lists several same-name definitions | screen, test | Unverified |
| Alternate resource logic (`ResourceVariationDatabase`) | Affects which inputs a recipe accepts | mine | Decoded 26 Oct 2026: the database lists two resources with 7 and 5 variations as asset GUIDs; the GUID-to-resource mapping is still needed |
| Trading Outpost rules: whether the Wheat, Glass Pane and Animal Hide formulas are trade rates, and any other goods or prices | A Trading page cannot be written without them | mine, screen | Formulas decoded, meaning unverified |
| Fishing Dock, Foragers' Hut and other extraction yields | Early-game food planning | mine, test | Unknown |
| Icons for the 4 buildings without artwork | Infobox and catalog completeness | mine | 150 of 154 covered |

## Crops and biomes

| Need | Why it matters | Source | Status |
|---|---|---|---|
| Real harvest timing for crops and fruit per day for orchard trees | Configured yields per full field are decoded (for example 3 Carrots per 9 growth days, 1 Wheat per 12); orchard spawners store an interval and cap but not fruit per day | test, mine (spawner quantity and collection) | Crop yields decoded 26 Oct 2026; orchard output open |
| Real growth time versus stored stage days | Stored stage days may not equal calendar days | test | Unverified |
| Crop availability per biome in normal play, including greenhouse rules in Winterlands | Sandbox assignments are decoded but flagged as not proof of availability | test, screen | Under review |
| Biome hazard mechanics: heat, cooling and hydration penalties, Boost effect | Needed for Needs and Biome pages | mine, test | Need meters decoded (Needs page); Tropical weather decoded (Rain and Heat wave every 2–6 days, Tropiclands page); desert and winter penalties beyond the meters still unknown |
| How a gear item’s stored base increase applies in play (Coat Heat 129; Ukulele, Book, Canteen, Pendant 79; Boots walk ×1.4, ×1.2 on roads, adults only) | The stored numbers are known; whether 129 is a meter boost, a drain reduction or something else is not | mine (gear application code), test | Values decoded 26 Oct 2026; application unknown |
| How the Bonfire and other social spots satisfy Heat or Cooling | Issue 1: the Bonfire runs the latest shift of any workplace but its effect is not in the export | mine (social-spot and workspot configs), test | Bonfire: one fuel per 0.7 day, warms 8 visitor spots with 4 heat units; Winter Cabin stove: one fuel per day, warms 4 sleeping spots with 6 heat units (decoded 26 Oct 2026); what a heat unit is worth on the meter is still open |
| Timed cold test in Winterlands: time from the cold warning to death, with and without a Coat and a Bonfire | Turns the decoded Heat constants into a statement a player can use | test | Not run |

| Biome for the 35 levels whose stored scene name is empty | Level pages show "Not stored" | screen (open each level) | Unknown |

## Villagers and needs

| Need | Why it matters | Source | Status |
|---|---|---|---|
| What a dish’s second effect is worth in play, and whether it applies away from the building (Porridge Cookhouse Community 1, Open Kitchen Community 4, Fondue Bar and Desert Cookhouse Fun 4, all with Duration 6, stored on the eating spots) | The stored units are decoded; the conversion to the need meter and the off-site case are not | test: eat the dish from a stockpile away from its building and compare; mine: the consumption code | Location and values decoded 26 Oct 2026 |
| What a social spot’s stored units are worth in play (Communal Plaza Community 1.2, Playground Fun 1.2, Zen Garden Wellness 1.3, Fitness Park Wellness 6, Swimming Pier Fun 6 and Cooling 6, Bonfire Heat 2 on finishing a tend) and the Winter Cabin stove | Stored values decoded; duration units and meter conversion are not | mine (application code), test | Values decoded 26 Oct 2026; Winter Cabin unresolved |
| How need configuration maps to play: `DailyRequired`, `UnitValue`, thresholds versus resource `need_units` | Decoded values exist but no one has confirmed what one unit buys | mine, test | Decoded and published on the Needs page (26 Oct 2026); unverified in play |
| Food consumption per villager per day | The single most useful planning number | test | Derived from stored values: about 0.67 food units a day if DailyRequired is the drain and UnitValue the restore (26 Oct 2026); unmeasured |
| Need decay rates, death timing and the happiness formula | Needs and Happiness pages | mine, test | Decay, thresholds and death values decoded, happiness weights decoded (Needs page, 26 Oct 2026); the formula itself is code |
| How often the baby check runs and what the stored happiness and housing multipliers apply to | Life stages (kid at 3, adult at 16, elder at 60, death at 75–95 days) and the reproduction values are decoded and on the Needs page; the check interval is in code | mine (code), test | Stored values decoded 26 Oct 2026; timing unknown |
| Whether Houses accept partial families | Every house has one baby spot and one pet spot beside its villager spots (decoded 26 Oct 2026, shown in infoboxes); how families are assigned is not stored | screen, test | Unknown |
| Leader effect magnitudes, duration and scope | Leader pages show only descriptions | mine, test | Not in resources.assets: LeaderBehaviour stores no fields (decoded 26 Oct 2026); the effect data must live in an addressable bundle or in code |
| Which clock hour the stored shift fraction 0.0 corresponds to (a game day is 300 simulation seconds, decoded 26 Oct 2026, so a tenth of a day is 30 seconds at normal speed) | Shift differences are decoded (Clay Pit starts and finishes a tenth of a day later than the 53 standard workplaces) but can only be given as fractions of a day until the clock origin is known | screen (watch the in-game clock when a Farm crew and a Clay Pit crew start work), test | DayNightCycle decoded (26 Oct 2026): the cycle blends Night → Sunrise → Day → Sunset evenly in normal play and non-linearly in Tournament Mode; how that aligns with the shift fractions is still unknown |
| Whether late-shift crews also sleep longer (Energy need) or just start later | Community lore about clay workers sleeping in | test | Open observation `clay-pit-late-start` |

## Levels, campaigns and challenges

| Need | Why it matters | Source | Status |
|---|---|---|---|
| Story-to-level mapping for Campaign 1 and 2 stories | Currently inferred from identifiers; only story order was menu-checked | screen | Inferred |
| Campaign 3: menu placement of the three levels outside Fjordi's Birthday | They render as "Other levels" | screen | Unknown |
| Menu names and placement for the 19 unnamed archive maps and the standalone-or-challenge category | Pages titled "Unnamed scenario · archive N" | screen | Unknown |
| Unlock prerequisites and what each level unlocks | Level walkthroughs cannot state progression | mine (campaign config), screen | Unknown |
| Challenge type rules for Chill, Ranked and Remix, scoring, and schedule | Challenges page lists names only | screen, official | Partial (Original, Redux, Bounty described) |
| Tournament season history: dates of the Nordic and Mesoamerican seasons, the Rural season’s reward list and end date, and whether Egyptian and Imperial have ever run | Mode confirmed live with Rural running (maintainer, 25 Oct 2026); the page cannot date seasons or show the live reward set | screen (Tournament menu, reward list), official | Two styles withheld in Spoilers pending evidence |
| Release and menu availability for levels, buildings and leaders | Most entries show "Unknown" | official, screen | 2 availability records; Oona and related content classified |
| Day length and what "day limit" counts | Objective planning | test | Unverified |

## Site data

| Need | Why it matters | Source | Status |
|---|---|---|---|
| Runtime colour composition for leader portraits | Portraits are static variants | mine | Not reproduced |
| Second game build for version history | History sections need a diff; `scripts/compare-content.mjs` is ready | mine (next release) | Waiting on a new build |
| Release update for each level, building and resource that predates the baseline | Backdated History for everything, not just the eight dated stories | official (App Store version history lists update contents by date), mine (`MinGameVersion` gate values on SerializedKeyBehaviour were declared but not decoded) | MinGameVersion gates decoded for 546 objects (26 Oct 2026): infoboxes show "Added in update N"; dates are known for updates 8, 12, 13, 14, 16, 18, 20 and 21 from the App Store history, the other updates still need dates |
