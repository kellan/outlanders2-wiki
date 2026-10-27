# Information needed

A running list of facts the wiki wants but does not have, with the most likely way to get each one. Items are removed once the information is in `content/`; the removal is logged in `CONTENT-NOTES.md`. Add items here when an article has to say "not established", and remove them in the same change that records the answer.

## If you are playing the game to gather answers

The rows marked **test** or **screen** are written up as step-by-step protocols in [PLAYTESTS.md](PLAYTESTS.md), ordered by value per minute of play, with what to record and where to report. Start there.

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
| How long one Trading Outpost trade takes | The trade chain is decoded (store of 12 Wheat, free fire, trade runs while the output store is empty, choose one of two goods), but its duration is an animation the wiki does not read; trade pages cannot say how much an outpost yields per day | test (PLAYTESTS A7 `trade`) | Open; prefab decoded 26 Oct 2026 |
| Field guide text, recipe, cost and worker slots for every building | Displayed recipe is the player-facing per-cycle recipe; derived ratios stand in until it is captured | screen | 49 captured and recorded: 38 on 26 Oct 2026, and on 27 Oct the four houses, Playground, Zen Garden and Fitness Park. Costs, beds and worker slots match the decoded data for all of them. Still missing: biome-specific producers and the remaining non-production buildings |
| Whether leftover fuel carries between cycles (Bakery formula 297381 is named "1 Stick -> 8 KitchenFire" but serializes 10) | Decides whether every fifth cycle is fuel-free or the extra fire is wasted | mine (formula tuning history), test | Unverified |
| Construction stage repetition and alternative materials | Construction totals may be under- or over-counted | mine, test | Unresolved for all buildings |
| Equipment requirements and wear | Some formula steps require equipment; effect on output unknown | mine, test | Unresolved |
| Which packaged building and resource variants are used in play | Catalog lists several same-name definitions | screen, test | Unverified |
| Alternate resource logic (`ResourceVariationDatabase`) | Affects which inputs a recipe accepts | mine | Decoded 26 Oct 2026: the database lists two resources with 7 and 5 variations as asset GUIDs; the GUID-to-resource mapping is still needed |
| Fishing Dock, Foragers' Hut and other extraction yields | Early-game food planning | mine, test | Tree felling and fruit spawn values decoded (26 Oct 2026); the Fishing Dock field guide shows 0–2 Meat per catch; Foragers’ Hut and Fishing Dock rates per day still unknown |
| Game frame sprites and glyph layers for the field-guide style (issue 56) | The house badge, resource tile outline and per-layer glyphs stream from `resources.assets.resS`, which the research snapshot does not include | mine: in the research repo run `python3 tools/export_frames.py "<game>/Contents/Resources/Data"` and commit `outputs/wiki-artwork/tile-*.png`, `glyph-*.png`, `concern-*.png` and `tiles.json` to `assets/wiki-artwork/` on the answers branch (full brief on issue 10) | Not run |
| Icons for the 4 buildings without artwork | Infobox and catalog completeness | mine | 150 of 154 covered |

## Crops and biomes

| Need | Why it matters | Source | Status |
|---|---|---|---|
| What unit stored distances and map sizes use | Footprints are confirmed in game squares (two stored grid units each: crop field 1 × 1, tree 2 × 2, maintainer report 26 Oct 2026). Tree seeding range (3 units, never closer than 1), wild-spawn density, sandbox map sizes (180 × 136 to 256 × 208) and the generator's 15 construction tiles per villager are shown as stored until their unit is known | test: watch where a wild tree seeds relative to its parent, in squares; or count a Small sandbox map's width in squares | Open |
| Real harvest timing for crops and fruit per day for orchard trees | Configured yields per full field are decoded (for example 3 Carrots per 9 growth days, 1 Wheat per 12); orchard spawners store an interval and cap but not fruit per day | test, mine (spawner quantity and collection) | Stored fruit spawners decoded 26 Oct 2026 (one fruit every 1.65–2.5 days with 4 waiting at most for apples; plant pages carry each tree); felling yields per tree decoded too; real timing in play still unmeasured |
| Real growth time versus stored stage days | Stored stage days may not equal calendar days | test | Unverified |
| Crop availability per biome in normal play, including greenhouse rules in Winterlands | Sandbox assignments are decoded and shown on plant pages (Biomes row and table), flagged as not proof of availability | test, screen | Sandbox menus recorded for Drylands and Winterlands (26 Oct 2026: observations drylands-sandbox-planting, winterlands-greenhouse-fields; Winterlands fields only inside a Greenhouse). Campaign maps and the other biomes still open |
| What demolishing a finished building, and a half-built site, gives back | Only ruins, crates, canoes, pallets and gifts store a salvage value; building refunds are code (issue 31) | test: demolish one finished building and one part-delivered build site of known cost and record what returns | Two buildings recorded: a finished Basic House returns 3 of 6 Logs and a half-built site everything delivered (26 Oct 2026, observation basic-house-demolition-refund); a finished Bakery returns 5 of 9 Clay and 2 of 4 Stone (27 Oct 2026, observation bakery-demolition-refund). Both fit half of each material, rounded up. Still untested: a half-built site of a building other than a house, and whether any building departs from the rule |
| Whether planted field trees self-seed like wild ones, and whether seedlings count for lumberjacks | Stored spread chance (2–4% a day, 3 tiles) sits on the tree prefab; fields may suppress it (issue 32) | test: fence a planted orchard tree away from other trees for 20 game days and count new sprouts | Unknown |
| Fish per cast at the Fishing Dock | Stored output is a random 0–1 (two spots) or 0–2 (one spot) roll (issue 35) | test: count catches over 20 casts per spot | Not measured: a Fishing Dock could not be placed in a Tropiclands sandbox (26 Oct 2026); try a campaign map with a dock already placed |
| Biome hazard mechanics: heat, cooling and hydration penalties, Boost effect | Needed for Needs and Biome pages | mine, test | Need meters decoded (Needs page); Tropical weather decoded (Rain and Heat wave every 2–6 days, Tropiclands page); desert and winter penalties beyond the meters still unknown |
| How a gear item’s stored base increase applies in play (Coat Heat 129; Ukulele, Book, Canteen, Pendant 79; Boots walk ×1.4, ×1.2 on roads, adults only) | The stored numbers are known; whether 129 is a meter boost, a drain reduction or something else is not | mine (gear application code), test | Values decoded 26 Oct 2026; application unknown |
| How the Bonfire and other social spots satisfy Heat or Cooling | Issue 1: the Bonfire runs the latest shift of any workplace but its effect is not in the export | mine (social-spot and workspot configs), test | Bonfire: one fuel per 0.7 day, warms 8 visitor spots with 4 heat units; Winter Cabin stove: one fuel per day, warms 4 sleeping spots with 6 heat units (decoded 26 Oct 2026); what a heat unit is worth on the meter is still open |
| Timed cold test in Winterlands: time from the cold warning to death, with and without a Coat and a Bonfire | Turns the decoded Heat constants into a statement a player can use | test | Not run |

| Biome for the 35 levels whose stored scene name is empty | Level pages show "Not stored" | screen (open each level) | Unknown |

## Villagers and needs

| Need | Why it matters | Source | Status |
|---|---|---|---|
| What a dish’s second effect is worth in play, and whether it applies away from the building (Porridge Cookhouse Community 1, Open Kitchen Community 4, Fondue Bar and Desert Cookhouse Fun 4, all with Duration 6, stored on the eating spots) | The stored units are decoded; the conversion to the need meter and the off-site case are not | test: eat the dish from a stockpile away from its building and compare; mine: the consumption code | Location and values decoded 26 Oct 2026 |
| How often a villager visits a gathering place, and whether the stored units are per visit or per day | The Gathering places page lists per-visit units for every spot (issue 34); without a visit rate they cannot be turned into a daily figure | test: watch a Communal Plaza and an Open Kitchen for 3 game days and count visits per villager | Unknown |
| What a social spot’s stored units are worth in play (Communal Plaza Community 1.2, Playground Fun 1.2, Zen Garden Wellness 1.3, Fitness Park Wellness 6, Swimming Pier Fun 6 and Cooling 6, Bonfire Heat 2 on finishing a tend) and the Winter Cabin stove | Stored values decoded; duration units and meter conversion are not | mine (application code), test | Values decoded 26 Oct 2026; Winter Cabin unresolved |
| How need configuration maps to play: `DailyRequired`, `UnitValue`, thresholds versus resource `need_units` | Decoded values exist but no one has confirmed what one unit buys | mine, test | Decoded and published on the Needs page (26 Oct 2026) with the eat-priority table from the villager prefabs; unverified in play |
| Whether play uses a resource's stored need values or the different values the field guide displays (Stew shows Community 2 but stores none; Beer and Cookie show Fun 2 but store 4; Playground, Zen Garden and Fitness Park show 1, 1 and 3 against 2, 2 and 6 stored per visit) | Decides which number the wiki should lead with on food and drink pages | test: give one villager Beer and watch the Fun meter rise; compare 2 and 4 units (50 or 100 points) | Both values decoded 26 Oct 2026; the card shows the displayed ones |
| Whether villagers prefer some foods over others beyond their units (variety, favourites) | Players report preferences; no serialized field expresses one | test: offer two foods of equal units side by side (for example Veggie and Fruit) and log which is taken; then unequal units | Open: the five-day meal log saw one villager pick Fruit, Veggie, Veggie, Fruit with both stocked, but pile distance and amounts were not equalised (26 Oct 2026) |
| Food consumption per villager per day, and when villagers choose to eat | The single most useful planning number | test: in any level, follow one adult villager for 5 game days and log each meal (game day and clock position, meter status shown in the villager panel, the item eaten, where it was eaten, whether a kitchen was available); also note the first day the hunger warning appears when food runs out | Recorded for a fresh town (26 Oct 2026, observation five-day-meal-log): 4 units per villager over the first five days, 0.8 a day, consistent with the decoded Food meter; a long-run rate with production running is still open |
| Need decay rates, death timing and the happiness formula | Needs and Happiness pages | mine, test | Decay, thresholds and death values decoded, happiness weights decoded (Happiness and Villagers pages, 26 Oct 2026); the formula itself is code |
| How often the baby check runs and what the stored happiness and housing multipliers apply to | Life stages (kid at 3, adult at 16, elder at 60, death at 75–95 days) and the reproduction values are decoded and on the Needs page; the check interval is in code | mine (code), test | Stored values decoded 26 Oct 2026; timing unknown |
| Whether Houses accept partial families | Every house has one baby spot and one pet spot beside its villager spots (decoded 26 Oct 2026, shown in infoboxes); how families are assigned is not stored | screen, test | Unknown |
| Leader effect magnitudes, duration and scope | Leader pages show only descriptions | mine, test | Not in resources.assets: LeaderBehaviour stores no fields (decoded 26 Oct 2026); the effect data must live in an addressable bundle or in code |
| Which clock hour the stored shift fraction 0.0 corresponds to (a game day is 300 simulation seconds, decoded 26 Oct 2026, so a tenth of a day is 30 seconds at normal speed) | Shift differences are decoded (Clay Pit starts and finishes a tenth of a day later than the 53 standard workplaces) but can only be given as fractions of a day until the clock origin is known | screen (watch the in-game clock when a Farm crew and a Clay Pit crew start work), test | Day counter goes up at dawn (26 Oct 2026, observation day-counter-turns-at-dawn); which stored fraction dawn is remains open |
| Whether late-shift crews also sleep longer (Energy need) or just start later | Community lore about clay workers sleeping in | test | Open observation `clay-pit-late-start` |

## Levels, campaigns and challenges

| Need | Why it matters | Source | Status |
|---|---|---|---|
| Campaign 3: menu placement of the three levels outside Fjordi's Birthday | They render as "Other levels" | screen | Answered as far as the menu goes (26 Oct 2026, observation campaign-3-menu-contents): only Fjordi’s Birthday is shown; the three other maps do not appear |
| Menu names and placement for the 19 unnamed archive maps and the standalone-or-challenge category | Pages titled "Unnamed scenario · archive N" | screen | Unknown |
| Unlock prerequisites and what each level unlocks | Level walkthroughs cannot state progression | mine (campaign config), screen | Partial (26 Oct 2026, observation campaign-unlock-rule): after the first three stories of Campaign 1 any campaign opens; per-level unlocks still unknown |
| Challenge type rules for Chill, Ranked and Remix, scoring, and schedule | Challenges page lists names only | screen, official | Partial (26 Oct 2026): in-game definitions of Redux, Bounty and Original recorded; Chill can carry a day limit (Town of the Year, 80 days); Ranked and Remix rules and scoring still open |
| Tournament season history: dates of the Nordic and Mesoamerican seasons, the Rural season’s reward list and end date, and whether Egyptian and Imperial have ever run | Mode confirmed live with Rural running (maintainer, 25 Oct 2026); the page cannot date seasons or show the live reward set | screen (Tournament menu, reward list), official | Rural reward track and a 10-days-left countdown on 26 Oct 2026 recorded (observation rural-season-rewards); earlier season dates and Egyptian/Imperial still open |
| Release and menu availability for levels, buildings and leaders | Most entries show "Unknown" | official, screen | 2 availability records; Oona and related content classified |
| Day length and what "day limit" counts | Objective planning | test | Unverified |

## Site data

| Need | Why it matters | Source | Status |
|---|---|---|---|
| Runtime colour composition for leader portraits | Portraits are static variants | mine | Not reproduced |
| Second game build for version history | History sections need a diff; `scripts/compare-content.mjs` is ready | mine (next release) | Waiting on a new build |
| Release update for each level, building and resource that predates the baseline | Backdated History for everything, not just the eight dated stories | official (App Store version history lists update contents by date), mine (`MinGameVersion` gate values on SerializedKeyBehaviour were declared but not decoded) | MinGameVersion gates decoded for 546 objects (26 Oct 2026): infoboxes show "Added in update N"; dates are known for updates 8, 12, 13, 14, 16, 18, 20 and 21 from the App Store history, the other updates still need dates |
