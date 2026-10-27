## Beer refill and Fishing Dock casts (2026-10-27, issue 10)

The local agent watched a brewer's Fun ring on day 30 with the Brewery as the town's only Fun source. It went from about a fifth full to full in one step, with no half-full stage, which fits Beer's stored Fun 4 (100 points) rather than the field guide's Fun 2. Recorded as observation `beer-fun-refill` with four screenshots in `assets/gameplay-evidence/beer/`. The pages keep showing both values. The observation is marked open, as the agent rates it likely. The information-needed row stays open: nobody saw the Beer stock fall by one at that moment, and Cookie and Stew are untested.

The agent also logged 20 Fishing Dock casts by one fisher at one position: four 0s, five 1s and eleven 2s, 1.35 Meat a cast. A catch of 2 marks it as the stored 0–2 spot. Recorded as observation `fishing-dock-casts` with the cast log and contact sheets in `assets/gameplay-evidence/fishing/`. The 1.35 is above the 1 the page assumes for that roll, but 20 casts cannot settle it, so the page wording is unchanged and the row asks for the two 0–1 spots and more casts.

The same branch then brought three more results (commits 95534692 and f272b4b5):
- **Trading Outpost with three workers:** one trade took 234–269 s against 216–232 s with one worker, so no visible speed-up. Conditions differed (night, staffing), so it is not proof workers never help. Observation `outpost-three-workers`; the trade section says so.
- **Fishing Dock storage:** the dock stopped at 72 Meat with "No more storage space", matching its single stored pile of 72. Observation `fishing-dock-storage`. The agent also found a lone fisher moves to the first position, so removing workers does not isolate the other spots; the row now says so.
- **Tropiclands and Winterlands outpost guides:** both match the stored trades, cost and worker slots and are recorded as field-guide recipes (choice of one), with the screenshots added to the Trading Outpost card.
- **Fix found on the way:** resource infoboxes listed only one Trading Outpost per resource, and it was the hidden base outpost ("1 Wheat each" for Animal Hide and Glass Pane, where a trade costs 2). Hidden buildings are now left out of Made from, and each outpost is listed with its biome.

## Local agent playtest, 27 October 2026 (issues 10 and 31)

The local agent published its answers on the wiki branch `codex/playtest-2026-10-27` (commit 484d8521) and posted them to issue 10. Only that commit's evidence and entries were taken. The branch's older commits repeat the 26 October batch, and its move of CONTENT-NOTES.md into `docs/` was left out.

- **Field guides:** complete cards for the Basic, Plank, Brick and Two-Story House, the Playground, the Zen Garden and the Fitness Park. Each goes into `ui_observations.buildings`.
- **They match the decoded data:** every cost, bed count, description and worker slot (Fitness Park 2).
- **One systematic difference:** the cards show half the stored per-visit need value: Playground Fun 1 against 2, Zen Garden Wellness 1 against 2, Fitness Park Wellness 3 against 6. That is the same pattern as Beer (Fun 2 shown, 4 stored). Both values are kept on each page, and the open Beer test row now lists these as further examples.
- **Bakery refund (A6):** a finished Bakery (9 Clay + 4 Stone) returned 5 Clay and 2 Stone, and the Recycle tab previewed the same. With the Basic House (3 of 6 Logs) this fits half of each material, rounded up. It is recorded as observation `bakery-demolition-refund`, and the row now asks only about half-built sites of other buildings.
- **Screenshots:** eleven, copied as compressed JPEGs (about 0.8 MB).
- **Trading Outpost (A7, commit e45ca62b):** an Evergreen outpost with one worker gave 6 of the import switched on and none of the other. Switching imports paused the first, and the next trade gave the second. This confirms #64's "or". One trade took 216 to 232 seconds at normal speed from a full store to the sixth good, about three quarters of a 300-second game day. It is recorded as observation `evergreen-outpost-trade`, and the Trading Outpost and Mechanics pages now quote it in place of "needs a timed test". The agent first named the goods Ice and Leather from their icons and corrected them to Glass and Hides (commit 3c6f22e7), matching the Glass Pane and Animal Hide the decoded formulas name. Eight more screenshots are copied, about 0.8 MB.

## Footprints in game squares (2026-10-26)

The maintainer reported that in game a crop field takes one square and a tree 2 × 2, while the wiki showed 2 × 2 and 4 × 4. The stored `GridDimensionsBehaviour` values use two units per in-game square: every stored dimension is even, and a road is 2 × 2. Footprints in infoboxes, the buildings directory, the Houses table and the food-sources table are now halved; the Basic House is 2 × 2 and the Trading Outpost 3 × 3. The research aside still shows the raw stored dimensions, labelled as such. Plant infoboxes gain a Footprint row. The Sandbox page shows map sizes as stored, because it is not established that they use the same units.

The maintainer also asked whether Potato really matches Carrot and Onion. Per field it does: 3 Veggie over 9 days (four 2.25-day stages). The structure differs, though. A Potato field holds one plant whose harvest gives 3 Veggie; Carrot and Onion fields hold 3 plants giving 1 each. The yield row now says "one plant" or "3 plants, 1 each" in place of the planting-spot count.

The maintainer asked for a site-wide rule. CONTRIBUTING.md gains a "Sizes and distances" section. Everything a player measures is written in game squares, through `footprint()`, and a test fails if stored dimensions are printed anywhere except the raw research aside. Stored distances whose unit is not established are labelled "grid units" instead of "tiles": tree seeding range and wild-spawn density. The sandbox map sizes and construction tiles stay as stored, and a new INFORMATION-NEEDED row asks play to confirm the units.

The Food page got four more fixes:
- The sources table gains a food-per-square column. A tree feeds more than a field, but on four times the ground, so per square a Carrot field (0.33) beats a Grape Vine (0.15).
- The food list says Fun, not Entertainment.
- The food list drops the Type and Availability columns, which read Food and Unknown on every row.
- Duplicate resource definitions no longer show a "22 versions" note (Fondue).

## Sandbox page (2026-10-26, issue 29)

A new Mechanics page, Sandbox, renders the decoded settings:
- **Starting population** (`MapGenerationOptions.population_choices`): Scarce is 4 adults; Average is 7 adults and 2 kids; Abundant is 12 adults, 6 kids and 2 elders.
- **Map sizes:** 180 × 136, 228 × 140 and 256 × 208 tiles.
- **Map generator targets** (`MapGenerator`): 15 buildable tiles and 3 food sources per villager.
- **Per biome:** planting lists and extra needs, from `MapBiomeSettings`.

The option labels are the settings' own key suffixes, since the files hold no English text for them. How the generator counts villagers, and what counts as a buildable tile or a food source, is in code that hasn't been read; the page says so. A count of buildings per biome was left out because the biome placeable lists mix biome-only extras (Drylands) with fuller lists (Evergreen).

## Audit for definitions not in the game (2026-10-26)

Every building and plant page was checked for whether any named level or sandbox build list uses it. Ten were unused by either.

Seven are real and stay. Their level only references them by objective:
- **Concert Stage:** Sold Out.
- **Pablo's Ladder:** On Edge.
- **Wishing Well:** Forgotten.
- **Gingerbread Man Man:** The Gingerbread Man Man.
- **zBeer Stand:** the Beer is drunk there in Sold Out, and the stand appears in Anthology. It has a localization key but no English name.
- **Giant Wheel and Hanging Garden:** stored under the game's level-unique buildings, with gates 21 and 20.

Two more stay but move. Cypress Tree and Willow Tree have a field prefab gated at version 32, above the installed 30, so they go to Spoilers as confirmed unreleased, by the same rule as Oona.

Only the field-plant template "Base" (92320) is hidden: it has no name, no cost and no level.

The maintainer approved showing zBeer Stand as **Beer Stand**, after its localization key `Building.BeerStand`; the files hold no English name for it. Research pages keep the internal name, and the old `/buildings/zbeer-stand/` URL still resolves.

## Trading Outpost: a choice of one good, per biome (2026-10-26)

#59 recorded the Evergreen field guide as 12 Wheat → 6 Glass Pane + 6 Animal Hide. That doubled the output. The prefab marks the workplace's outputs exclusive (`WorkplaceConfig.ExclusiveOutputs`, set on no other building), stores two separate 12 Wheat trades, and the Tournament hint `FastMode.Hint.FirstTradingPost.3` reads "Open the Resources tab to choose the resource you want to receive." One trade therefore gives 6 of whichever good is selected. The guide lists both because the prefab's `FormulaVisualConfig` shows both options under one input count.

The recipe moved from the base definition (65543) to Trading Post Evergreen (75226) with `choice: "one"`, which renders as "or" everywhere a recipe appears. From the research decode, the chain runs like this. Workers fill a 12-slot store. A worker-lit fire takes no input and fires only when that store is full (`WorkspotPileFullCondition`). The trade itself needs no worker and runs only while the 6-slot output store is empty (`WorkspotPileEmptyCondition`). The tokens are then unpacked one by one into a public pile of 24 per good. `TraderBehaviour` only swaps the building's sign.

The biome versions trade as follows:
- Tropiclands: 8 Glass Pane for 6 Animal Hide or 9 Wheat.
- Winterlands: 8 Animal Hide for 9 Wheat or 6 Glass Pane.

There is no Drylands outpost.

The base definition (5 Wheat, in no level) and the non-recyclable Winterlands copy (test levels only) are now hidden. The Evergreen outpost takes the plain URL, and its old `-75226` URL still resolves. Resource pages list the outposts by biome. Trade duration is set by an animation and is still open; it is PLAYTESTS A7 and a row in INFORMATION-NEEDED.

## Building, DairyFarm and Stock hidden (2026-10-26, issue 62)

The maintainer confirmed that Building is not a real building and that DairyFarm never appears in play, and doubted Stock. The data agrees. Building (35718) has no construction formula, workers or localization key; it is the base prefab other buildings derive from. DairyFarm (105746) has a localization key but no player-facing text, no material inputs, and appears only in the test level "Tests/Buildings/Test Dairy Farm". Stock (75802) has no localization key, no material inputs and no workers. All three now sit in `suppressedPages`, so they get no page, directory row, search result or navbox entry. Their records stay in `content/buildings/` as decoded data.

## Stand-in glyph fills and home page boxes (2026-10-26, issue 56)

The maintainer approved a stand-in for the glyphs' white fill: `tools/fill_icons.py` flood-fills each icon's line layer from the image border and puts white under everything the outline encloses, keeping the lines unchanged. The 80 results live in `assets/wiki-artwork/filled/` with a manifest; the site uses them for building and resource icons and switches to the game's composited tiles automatically once `tiles.json` is committed. Three icons (a pot, a honeycomb and a mug) were already white in the source images, so the fill does not change them; the real export will. On the home page the Mechanics pages and the reference pages (Challenges, Tournament, Changelog, Guides elsewhere, sources, contribute, index) now have their own boxes beside Buildings and Plants, replacing the links row at the bottom.

## Needs split into a hub and one page per need (2026-10-26)

The Needs page had grown to about 2,000 words and 90 table rows: an overview, a meter table that repeated it, a long eating explainer and eight need sections. At the maintainer's request it is now a short hub (the overview table, each row linking to its need, and links to the related mechanics pages). Each need has its own page under `/needs/<need>/` with its meter settings, the items, places and gear that restore it, and how many levels switch it on; eating moved to `/eating/`. No content was dropped. Old anchors on the Needs page (`#need-food`, `#eating` and so on) are forwarded to the new pages by `src/page.js`.

## Local agent playtest recorded (2026-10-26)

The local agent played the installed game and published 14 answers and 140 screenshots on the research repository's `codex/playtest-observations` branch. Recorded here with the screenshots they cite, compressed to JPEG; the three player names on the Challenges ranking are covered. Field guides for 38 more buildings were transcribed from the screenshots and checked against the decoded data: every construction cost and worker count matches, and recipes match the decoded steps up to batch size, except fuel counts (Bottle Factory shows 2 Sticks per Bottle against 1 derived; Cheesery and Porridge Cookhouse count whole Sticks and leave out the milk and barley they produce on site) and the Trading Outpost, whose guide settles the three decoded formulas as 12 Wheat for 6 Glass Panes and 6 Animal Hides. Those 21 buildings with a plain recipe get a `recipe_per_cycle` block from the guide; the rest get the observation only. The Campaigns menus match the story-to-level mapping inferred from the files exactly, so all fifteen stories are now marked menu-verified. The Drylands Foresters' Hub finding is not a contradiction: the Hub is a base building in every sandbox and the biome list only holds the extras. New observations cover the Basic House refund (half on demolition, everything delivered on a half-built site), the day counter turning at dawn, a five-day meal log (0.8 food units per villager per day from a fresh start, consistent with the decoded meter), the Drylands and Winterlands planting menus and the Greenhouse rule, Campaign 3's single story, the campaign unlock rule, the Rural season reward track, and Town of the Year's 80-day Chill limit. Observations can now target mechanics pages, and building, plant, biome, level, campaign and mechanics pages show a "Seen in play" section. Food preference and fish per cast stay open.

## Icons as the game draws them (2026-10-26, issue 56)

The maintainer pointed out that the tile colour is only the background: in the game a glyph is a white fill with dark lines on top. The wiki's icon PNGs hold only the glyph's line layer, so the white fill was missing and the tile colour showed through the glyph. `UIInfo` states the rule: glyph background White, glyph lines Black (`#473547`), the reverse when an icon is inverted, and the frame takes the item's own colour. Need icons are ordinary content icons on the concern prefabs (`Concern.Nutrition`, `Concern.Community` …: a round ConcernFrame in the need's colour), which is why buildings take the colour of the need they meet. `tools/export_frames.py` in the research repo now composites each item's tile, each need icon and an unframed glyph for running text from the game sprites and these colours; it needs the texture stream file the snapshot lacks, so the local agent runs it. The wiki uses `assets/wiki-artwork/tiles.json` when present and keeps the plain tiles until then. Need colours from the palette now mark each need on the Needs and Happiness pages, and need names in field-guide text are bold, as the game sets its Input and Output terms.

## Field-guide card follows the game's own treatment (2026-10-26, issue 56)

A maintainer screenshot of the Open Kitchen field guide (`assets/gameplay-evidence/open-kitchen-field-guide.png`) showed three things the first card got wrong. Icon tiles take each item's own icon colour, not its category: `ContentBehaviour.CompositeIcon.BackgroundColor` gives the Open Kitchen and Stew Community periwinkle, while Veggie stays Food red and Meat and Egg Ingredient pink. Any-of inputs sit side by side over one bracket with a single count. Provides shows need circles with the count underneath, using the values the guide displays: `ResourceBehaviour.Visual` holds a display value per need (−1 means show the stored one), so Stew shows Food 1 and Community 2 although its stored values restore Food 1 only, and Beer and Cookie show Fun 2 against a stored 4. The card now shows the display values, as the guide does, and says what the item itself restores when they differ. The guide counts a whole Stick of fuel where the steps give 1/5 per batch (and 1 against 0.8 at the Bakery), so fractional amounts on the card round up; reused containers such as Plates are left off, as in the game. The export adds `icon_by_gameobject`, `icon_by_resource` and `field_guide_display_units` to `ui_style`.

## Field guide style (2026-10-26, issue 56)

The maintainer asked for the in-game field guide's look across the whole site, with the game's own art rather than redrawn shapes, the game font, and dark mode. The palette is the game's `UIColorPalette` (already in `assets/wiki-artwork/game-ui-palette.json`): text `#473547`, card `#f2eeed`, dividers `#e4dbd4`, accent `#5c5aff`. Sampling the Bakery field-guide screenshot gives text pixels of `#443647`, so the stored value is what the game draws; it reads as near-black with a faint purple cast, not as plum. The category colours come from the research export's new `ui_style` section in `decoded-mechanics.json`: each `ResourceCategory` and `BuildingCategory` names the palette entry its icon background uses, and the export lists which category every resource and building belongs to. The font is Bricolage Grotesque: the game ships Regular, Bold and ExtraBold SDF atlases of it, and it is an open-source Google Font (OFL), so the site loads it from Google Fonts. Dark mode keeps the category colours and swaps surfaces for dark tones derived from the text colour. The game's frame sprites (the house badge, the resource tile outline) and the separate glyph layers stream from `resources.assets.resS`, which the research snapshot lacks; until the local agent runs `tools/export_frames.py` against the installed game, icons sit on plain tiles in their category colour, with no hand-drawn outline. While testing, the static pages turned out never to load `app.js`, so click-to-sort tables had not worked on the published site; sorting and the theme toggle now live in `src/page.js`, which every page loads.

## Mechanics section (2026-10-26, issue 1)

The maintainer asked on issue 1 whether the decoded data now supports a mechanics section. It does for most of it. New pages, all rendered from data already in the repository: Happiness (`decoded-mechanics.json` concerns: weights and satisfied effects; level objectives with Happiness and Concern conditions), Villagers and life (life stages, reproduction values, need meters worked into days to death), Heat, cooling and water (heat sources with heated spots, Wheatshine heat units, the Coat's stored value, level events with need multipliers, biome hazard text), Days and time (`research-findings.json` seconds_per_day 300 and the clock schedule finding; level day limits) and Gear (gear findings joined with producing buildings). The life and happiness sections moved off the Needs page, which now links to them. The biome help text names the 20% slower fall from a met Heat, Cooling or Water need as "the Boost", so the pages use that word. The happiness share column is labelled as a reading: it assumes a weighted average of met needs, and the formula is code. Archive levels without a menu name stay off these pages. Trading, roads and walking, Desert and Winter penalties beyond the meters, and leader abilities are listed on the hub as not written yet, with what is missing.

## Changelog as fragments (2026-10-26)

CHANGELOG.md was the one file every pull request edited at the same line, so parallel work conflicted. Entries now live as one file per change in `changelog/unreleased/`, assembled at build time for the Changelog page; `npm run changelog:release` moves a merged batch into `changelog/<date>.md` and regenerates CHANGELOG.md from the dated files only. The same treatment is the obvious next step for this notes file.

## Stored recipes from step graphs (2026-10-26, issue 47)

`scripts/derive-recipes.mjs` now reads the step graph for buildings without a clean recipe, so 21 more resources carry `made_from`: Stew, Beer, Wine, Mead, Wheatshine, Fondue, Manchamanteles, Barley Porridge, Cheese, Paper, Clay, Honey, Water, Meat, Animal Hide, Log, Fruit, Nopalito and others. Resource pages show the natural batch ("2 × (Veggie, Meat or Egg) + 1/5 Stick → 3 Stew, plates reused") and level rollups work the alternatives in: Frostbound Valley's 100 Stew now needs 67 Veggie (or Meat or Egg) and 7 Sticks instead of "gathered or traded"; Full Tilt Queso's 100 Cheese needs 17 Milk and 9 Sticks. Pages merge recipes across same-named resource records.

## Readable recipes from the stored step graphs (2026-10-26, issue 47)

Buildings whose stored steps include alternatives, fuel multipliers, returned containers or self-made starts no longer show "no single ratio applies". A reader expands each final product back to public inputs: Open Kitchen 3 Stew ← 2 × (Veggie, Meat or Egg) + 1/5 Stick with 3 Plates reused; Winery 4 Wine ← 2 Fruit + 1 Bottle with 4 glasses reused; Cheesery 6 Cheese ← 1 Milk gathered from cows + 1/2 Stick; Trappers' Hut 2 Meat + 1 Animal Hide ← 1 full trap brought back; Clay Pit, Beehive and Well make their product from nothing but time; the Porridge Cookhouse grows its own barley. Planters say the harvest comes from the plants, storage buildings that they store, the beer stand that it serves. These are ratios read from the files; per-cycle speed is still not stored.

## Why villagers pick stew (2026-10-26)

Dish pages for food served at an eating place (Stew, Fondue, Manchamanteles, Barley Porridge) gain a "Why villagers pick it" section, and the serving buildings a matching note: the meal gives the place's second effect (Stew: Community 4 at the Open Kitchen) and eating in company ranks a little above eating alone in the villagers' activity priorities, so villagers prefer it over food of the same unit value such as Fruit or Veggie. The food value itself is identical. Links go to Gathering places and the eating explainer.

## Needs page redesign, cribs and doghouses, bonfire summary (2026-10-26)

The Needs page now opens with an at-a-glance table of the eight needs (what each is, falls per day, one unit restores, whether it kills, what restores it), then the meter and eating explainers, then one section per need with compact tables: items with units, meter points, what else they give (Stew: Community 4 at the Open Kitchen) and who may consume them; places with per-visit units and spots. The old icon lists that read like a list of foods are gone. Houses: "baby spot" and "pet spot" are now crib and doghouse, with the data behind each (a one-sleeper accepting only babies; a one-sleeper accepting no villagers, with Dog prefabs in the files) and a reading of why more houses mean more babies: one crib per house, occupied until age 3. Gathering places explains what a unit is worth in meter points. The Bonfire page says a keeper feeds Sticks, each burns 0.7 days, the fire holds 2 so it stays lit about 1.4 days untended, and up to 8 villagers warm themselves at it.

## Visitors and scheduled events on level pages (2026-10-26)

The level files store, for every placed event prefab, the game day it fires (`LevelEvent.DaysStart`); the prefab says what arrives. Level pages now show a Visitors row ("30 adults on day 50, announced from the start" on Sold Out; three waves on Anthology; six leaders on day 25 on Outgrown) and an Events row (Rain on day 22 for 2 days on An Apple a Day; "No babies are born on this map" where the no-reproduction notice is placed). Visitors arrive regardless of the settlement's state. Announcement lead times come from the prefab: 1000 days means from the start, 0 means no notice. Also in this change: extraction buildings say plainly what they gather and that nothing goes in, the Fishing Dock's random catch is worded per spot, the production note uses decoded pile sizes when no gameplay capacity is recorded, water-edge placement reads plainly, and the Fitness Park's two staff spots are labelled as such.
## Wiki changelog (2026-10-26)

`CHANGELOG.md` is the reader-facing list of wiki changes, one line per merged pull request with the page to look at, backfilled from the merge history; it renders at the top of the Changelog page as "Wiki changes" above the game-update history. CONTRIBUTING asks every pull request to add its line under Unreleased. This file remains the provenance record.

## Playtest protocols for a computer-use agent (2026-10-26)

`docs/PLAYTESTS.md` separates what must be learned by playing from what the research repository decodes: six screen-capture tasks (field guide, clock at sunrise, menus, challenge and tournament screens, planter menus, demolition refund) and nine timed tests (meal log, fish per cast, growth timing, gathering visits, Bakery output, cold, housing, planted-tree spread, day limit), each with setup, what to record, screenshot naming and the answers-inbox entry to write. INFORMATION-NEEDED points to it.

## 26 October analytics

Plausible analytics snippet added to the page template at the maintainer’s request; it is the only script the published pages load.

## 26 October research handoff recorded

The research agent published decoded answers on issue 10 and the branch codex/research-answers; `research/production-findings.json` is imported whole as `content/reference/research-findings.json` with a provenance block. Recorded: one game day is 300 simulation seconds (shift lengths now shown in seconds); TerrainType 1 Water, 2 Sand, 3 Soil, 4 Mountain (placement rows reworded); gear stored effects (Coat Heat 129; Ukulele, Book, Canteen, Pendant 79; Boots walk ×1.4, ×1.2 on roads, adults only; Swimsuit none) on resource infoboxes and the Needs page; social-spot and eating-spot units (Porridge Cookhouse Community 1, Open Kitchen 4, Fondue Bar and Desert Cookhouse Fun 4; Communal Plaza 1.2, Playground 1.2, Zen Garden 1.3, Fitness Park 6, Swimming Pier 6 and 6, Bonfire Heat 2 on finishing a tend) on building infoboxes, resource pages and the Needs page, which confirms the maintainer’s cookhouse hypothesis; crop yields per full field on plant pages; a modelled production capacity per building on research pages, with plain-language highlights on chain pages; Chicken Coop 5 eggs per day as a player report. Bakery capacity is recorded as 60 Bread from the four decoded piles of 15; the maintainer withdrew the earlier 40 estimate on 26 October and asked that decoded values take precedence. Observations added or updated accordingly; information-needed rows rewritten to the remaining in-play questions.

## 25 October need effects beyond stored units

Maintainer report: Barley Porridge raises Community, which its resource record (FoodUnits 2, CommunityUnits 0) does not show. The Porridge Cookhouse description says the same. A scan of every building description against its outputs' stored units shows the pattern is systemic: dishes with a second effect (Barley Porridge and Stew for Community, Fondue and Manchamanteles for Fun), carried gear (Book, Ukulele, Pendant, Canteen, Coat) and places with no resource (Communal Plaza, Playground, Zen Garden, Fitness Park, Swimming Pier, Bonfire, Winter Cabin) all have effects the stored units do not carry. The maintainer reports the Barley Porridge rise is small and suggests the Cookhouse itself may be what raises Community; every second-effect dish is served on returning plates, which fits eating at the building, though Mead stores Community on the resource. Recorded as the open observations `cookhouse-community-source` and `fondue-fun-check` with the discriminating test. The Needs page and resource pages now show description-stated effects as a second source, labelled with the building that states them and no amount. Recorded as observation `barley-porridge-community`; two information-needed rows cover the decode.

## 25 October issue forms

Issue 8: the Markdown correction template is replaced by a structured form (page, kind, what it says now, what it should say, how you know, version, evidence, spoiler flag), and a gameplay-observation form mirrors the observation record fields. Article pages prefill the correction form with the page name; research pages link the observation form with the entry filled in. Spoiler pages keep neutral titles and no prefill. A template config points answers for the information-needed list at issue 10.

## 25 October spoilers demoted in navigation

Maintainer decision: the Spoilers entry no longer sits second in the navigation in bold with a border; it is the last entry, in muted colour, after Sources & artwork. The home page keeps its spoilers teaser at the bottom. On phones the navigation collapses behind a Menu toggle and the infobox becomes a compact two-column grid so article text starts on the first screen.

## 25 October custom domain restored

The first deploy-workflow publish dropped the `CNAME` file for outlanders2wiki.com from gh-pages, which made Pages forget the custom domain. `assets/CNAME` now rides every build and the deploy step sets `cname`, and the file was restored on gh-pages directly to bring the site back.

## 25 October Tournament Mode is live; Rural is the current season

Maintainer report: Tournament Mode is live and the Rural season (internal key Amish) is running. Recorded as the confirmed observation `tournament-rural-season-live` (observation targets may now be of type `tournament`). Rural leaves `spoilers.json`; Egyptian and Imperial stay withheld with an updated reason: completed seasons keep reward sets in the files, the live one is name-only, so a name-only style that is not live is most likely a future season. The Tournament page shows the live tag, the current season first, and the observation.

## 25 October Tournament Mode page

A Tournament Mode page (navigation and home) is built from the FastMode, FastSeasons and FastModeTutorial text tables: what the mode is, how a level plays (three tiles a day, the bag, skipping for tokens), the tile effects, reward points, streaks, streak shields and leaderboards, and the season styles with their reward sets. Nordic and Mesoamerican carry 21 entries each including palettes, restyled buildings and villager styles. Egyptian, Imperial and Rural are stored as names only; they are withheld as related-release-unconfirmed in `spoilers.json` (new spoiler type `tournament`, validated against the season style keys) and appear on the Spoilers page and the spoilers/tournament/ view. Whether the mode or any season is live on this installation has not been checked; the page says so and the information-needed list has the row.

## 25 October naming: FastMode is Tournament Mode

`FastMode` is the game files' internal name for Tournament Mode (`FastMode.Name` = “Tournament”, `FastMode.Menu.Name` = “Tournament Mode”; the FAST_ tutorial levels are the Tournament Tutorial). Player-facing pages now say Tournament Mode and mention the internal prefix once; dataset keys such as `fastmode_supply_chain_validation` keep their names.

## 25 October stored-configuration additions

Six previously unused decoded fields now render, each labelled as stored configuration: the level scene name gives a biome for 98 of 133 levels (level fact grid, level catalog column, and a Levels section on biome pages; Christmas and precipice scenes map to Winterlands with a note); starting conditions on level pages summarise villagers, pre-built buildings, stockpile, tools and crates from the starting objects; a Needs page lists what satisfies each need from resource units, with level counts and biome hazard text; Wine, Mead, Beer and Wheatshine show their stored adults-only limit; gathering buildings show the map source category they harvest from (rock sources, wood trees, fruit trees and bushes, reed plants, planted fields, cows); placement rules show terrain, slope tolerance and zone connection on building infoboxes; biome pages show sandbox spawn densities. Terrain codes 1 and 2 and the 35 levels without a stored scene are new rows in the information-needed list.

## 25 October version history

Issue 6: `content/history.json` records dated, evidenced changes per entity; entity pages show a History section and a Changelog page groups entries by update. Backdated from the App Store version history already in `availability.json`: the leaders Jelena (update 8), Cory (12), Kaia (13), Chico (14), Izzy (16), Maira (18) and Fjordi (21) and the levels of their stories, plus Pablo's Lost (update 20). Levels and buildings have no other decoded release marker: `MinGameVersion` gate fields are declared but their values were not decoded, and the Single00 to Single08 identifier batches and the August/October localization tables suggest content batches but do not name updates. `scripts/compare-content.mjs` diffs two content trees for the next build.

## 25 October level strategies

Issue 3: level pages gained a Strategy section fed by `content/strategies/<level id>.json` and a level-strategy issue form that every level page links to with its name filled in. Records are validated against levels and buildings and rendered as community advice with status, contributor, version and date. One draft exists for The End of the World, written from the stored objectives and labelled as such.

## 25 October publishing from CI

`dist/` is no longer committed (issue 5). Game icons and evidence screenshots moved to `assets/`, which the build copies into `dist/`. The deploy workflow builds, tests and publishes to gh-pages on every push to main; the test workflow covers pull requests and other branches. Contributors submit only source changes.

## 25 October work schedules

The community observation that clay workers are late risers is in the data: `WorkplaceConfig.WorkTimeRange` stores a start and end fraction of the day per workplace. 53 workplaces use the standard 0.9 → 0.5 shift; the Clay Pit uses 0 → 0.6, a tenth of a day later at both ends with the same length. Foresters' Hub, Orchard and Quarry start equally late but finish on time (a shorter day); Cheesery, Chicken Coop, Fondue Bar and Roadworks Office run a twentieth of a day late; Beehive, Bonfire and Fitness Park have their own ranges. Recorded as the confirmed observation `clay-pit-work-schedule`; the sleep claim stays open. Building infoboxes now show Work hours relative to the standard shift, and the Buildings catalog has a Work schedules table. The clock origin of fraction 0 is still unknown.

## 25 October production model

Maintainer report: the Bakery takes 1 Flour and 1 Stick, makes 8 Bread, and stops at 40 Bread. The recipe is confirmed by the field guide and by the decoded graph (exactly 8 Bread per Flour; formula 297381 is named "1 Stick -> 8 KitchenFire" though its serialized output is 10). The capacity is not in the exported data because the pile and stockpile components were validated but never exported; it is recorded as a player report. Building records gained an optional `gameplay` block (`recipe_per_cycle`, `output_capacity`) that the renderer uses as the primary recipe and capacity; the formula-graph ratio remains as supporting detail. Tracked in issue 9.

## 25 October ratio correction and information-needed list

The maintainer reports that the Bakery holds 40 Bread; the decoded "5 Flour + 4 Stick → 40 Bread" was the smallest whole-number ratio of the formula graph, not a batch. Pages now show ratios per primary input (1 Flour + 0.8 Stick → 8 Bread) with a note that ratios are not batch sizes, capacities or rates. Recorded as `content/observations/bakery-bread-capacity.json`. `docs/INFORMATION-NEEDED.md` now tracks data the wiki lacks and how to obtain it; remove an item there in the same change that records the answer.

## 25 October companion layer

Article pages gained a Stardew-style companion layer on top of the existing evidence model: an infobox (type, footprint, cost, workers, housing, inputs, outputs, growth stage days, level count), a single verification badge linking to the research page, level-objective backlinks computed from scenario objectives, build/plant availability grouped by campaign and story with unnamed archive maps collapsed, story context and previous/next links on level pages, story and level lists on leader pages, footer navboxes, and per-page "Suggest an edit" and "Report a problem" links. Decoded formula steps on chain pages and starting-object tables on level pages are collapsed by default. The Properties aside and leader gameplay checks now move to the research page with the other provenance material. Navboxes and backlinks read the spoiler-scoped datasets, so spoiler entries stay out of public pages.

## Guides elsewhere (2026-10-26, issue 38)

A links file, page, issue form and weekly link check for pointers to guides and communities on other sites. Seeded with two entries found by search and marked "not yet reviewed" (the Apple Arcade subreddit and the studio site); the maintainer's own list is awaited on the issue. Links are shown apart from decoded content and never cited as evidence.

## Level starting conditions made readable (2026-10-26, issue 33)

The Starting conditions block now resolves what the old version dropped: buildings placed as map variants (matched by localization key) split into workplaces, homes, and roads and decoration; the starting leader, linked; wild trees and already-growing crops matched to their plant pages through the plant prefab roots; rock sources and reed plants as map resources; loose piles counted with a note that their contents are set at load; tool resources moved out of the stockpile; scripted arrivals and notices; and a count of scenery left out. The Levels directory gains a "You start with" column (villagers and building count). Scenery props, story statues and birds stay only in the raw list.

## Gathering places (2026-10-26, issue 34)

New page listing every building with social spots from the decoded prefabs: spot count, what one visit gives (Fitness Park Wellness 6 on 12 spots, Swimming Pier Fun 6 and Cooling 6, Open Kitchen Community 4 on 8 eating spots, Communal Plaza Community 1.2, Playground Fun 1.2, Zen Garden Wellness 1.3, Ritual of Hidden Light 1 each of Community, Fun and Wellness), the stored "can be picked when seeking" switches, raw visit length, and which places serve food or drink; reuse delay 0.5–0.7 of a day. Building infoboxes' Visiting gives row now reads from the same data (spot count plus per-visit units) and falls back to the research agent's findings; each need on the Needs page lists the places that give it. The game never shows these numbers. Visit frequency is a new test row.

## Houses page and villagers fed per source (2026-10-26, issues 37 and 36)

A Houses page compares every house from stored data: villager spots, the one-spot baby house and one-spot pet house each carries, footprint, cost and cost per villager, heating, sandbox biomes and level count, with the reproduction values explaining why full housing multiplies the birth chance by 0.025. Pets are named in the files but unseen in play and are marked unconfirmed. Plant pages and the Plants overview gain a Feeds figure (villagers fed by one full field or tree: yield × food units ÷ growth days, or fruit rate × food units, divided by the 0.67 units a villager burns a day), and the Food page gets a ranked table of sources. Processed foods are left out because factory speed is not stored.

## Tree self-seeding and workspot effects (2026-10-26, issues 32 and 35)

Tree pages gain a Spreads row from the stored plant settings (fruit trees and palms 2% a day, Ash, Pine, Willow and the Spookylands dead tree 3%, Jungle Bush and Mesquite 4%, all within 3 tiles and never closer than 1 tile to another plant); the Plants overview and the wood and fruit harvesters' pages note that wild stands regrow. Only five workspots in the game carry a need or random-output behaviour: the Bonfire's tending task gives the worker 2 Heat units, and the Fishing Dock's spots roll 0–1 or 0–2 Meat per cycle (expected 0.5 and 1), now stated on those pages. Three test rows added for the local agent: demolition refunds, planted-tree spread, fish per cast.

## Salvage values for map objects (2026-10-26, issue 29)

Only 24 of the game's 304 recyclable objects store what dismantling returns: Ruins give 10 Stone, a Ruined House 3 Log, a Ruined Plaza 4 Plank, a Ruined Zen Garden 3 Stone, Expedition Crates 3 Plank (the Bread and Dried Meat variants add 5 or 10 of that food), a Pallet 1 Plank, a Canoe 3 Log, and the Christmas gifts Coats and Books. Everything else, including every building, refunds by code, so no "when demolished" row is possible for buildings. The stored values now appear in each level's Starting conditions as a Salvage row with a total, and in the Spookylands map-resources table. Placement rules were already an infobox row before issue 29 was filed; that item is closed as done.

## How eating works (2026-10-26)

The Needs page gains an explainer built from the stored Food meter and the villagers' eat activity (`ActivityConsumeResource`, exported as `eating` in decoded-mechanics.json): a villager slides from Full to Satisfied in 1.5 days, to Wanting by day 3.25 and starves after 6.25 days without food; the urge to eat is scaled by hunger status (Full 0, Satisfied 0.45, Wanting 0.7, Low and Critical 0.99), and eating at an eating place starts fractionally higher than eating alone. A table gives each food's units, what it restores, the meter value below which the whole item counts (the 150 cap wastes rich foods eaten early) and the no-waste consumption per villager per day. No stored field expresses a preference between foods; that question and the timed meal log are new rows in INFORMATION-NEEDED.

## Objective totals: whole items, gathered items stop at the map (2026-10-26)

The "What the objectives need" table now rounds every amount up to a whole item. Items the map provides are no longer worked back through a factory: sticks are shown as picked up near trees (the Firewood Yard is mentioned as an alternative, not a requirement), logs come from the Lumberjacks' Base rather than the Foresters' Hub (plain harvesters are preferred over planters), map-harvested items name their harvester (Quarry, Reed Harvester, Chicken Coop for eggs), and Wheat and Veggie are shown as grown in fields with the crops that yield them. A map drop is any resource a plant spawner places; a harvester is a building whose formula draws on a map source or passes the item through unchanged.

## Plant biomes and planters from data (2026-10-26)

Plant pages and the Plants overview now show which sandbox biomes list each plant (from `content/reference/biomes.json`, the decoded MapBiomeSettings), which building plants it there, and where it grows wild with the map generator's density per tile. The planter is no longer a fixed table: a planter is any building whose description says it plants a source type (`Sources.Field`, `Sources.FruitTree` or `Sources.Tree`) and that is in the biome's sandbox build list, so the Nopal Tree, Date Palm and Watermelon are planted by the Oasis in the Drylands, and Winterlands crops by the Greenhouse. When no sandbox biome lists a plant, the planters are taken from the campaign level build lists that include the field, then from all planters of that type. Open point: the Drylands sandbox lists Mesquite as a forestry plant but has no Foresters' Hub, so its sandbox planter is unconfirmed. Internal, unnamed spawner outputs (the Trappers' trap state on Winter Pines) are no longer shown as yields.

## How unreleased status is decided (2026-10-26)

Written down in CONTRIBUTING.md and on the Spoilers page: `confirmed-unreleased` needs the prefab's own `MinGameVersion` gate above the installed game version (32 against 30 here); reports give `reported-unreleased`; associated scenarios and biomes without a gate stay `related-release-unconfirmed`. Construction-material rollups for level objectives are tracked in issue 23.

## Plant yields by type and a fruit rate (2026-10-26, issue 25)

The Plants overview and plant infoboxes now lead with the yield that matches the plant type (field harvest, fruit drops, felling logs) and put the rest under "Also"; orchard trees are labelled fruit trees. A Rate row and column give fruit per day while the tree is picked regularly (1 ÷ mean spawn interval) and how long a full tree takes to fill (cap × mean interval): Palm about 0.61 a day and full in 8 days, Banana about 0.3 and 10 days. The rate is arithmetic on the stored spawner values, which stay on the page.

## Plants section, tree yields and the clock (2026-10-26)

Crops and trees now live under `/plants/` with their own directory (issue 20); the old `/buildings/<plant>/` addresses stay as aliases. Tree pages show felling yields and timed drops from the decoded plant prefabs (issue 21): Ash gives 4 Logs after 6 chops, an Apple Tree 1 Log after 3 and one Fruit every 1.65–2.5 days with 4 waiting at most. The research agent traced the clock code: the dial shows a day face for the first half of the cycle and a night face for the second, so shifts are now described against the dial rather than hours, which the game never names.

## Decoded mechanics from the game files (2026-10-26)

`content/reference/decoded-mechanics.json` comes from the research repository's pure-Python IL2CPP reader (metadata version 39 could not be loaded by the usual tools), with every record checked against its serialized length. From it: need meter settings, concern weights and bonuses, reproduction values and life stages on the Needs page; public-output pile capacities, heat sources, baby and pet spots and "Added in update N" on building infoboxes; pile tables on building research pages; Tropical weather on the Tropiclands page; tournament boosts; and version gates that confirm the mushroom chain, Oona, the Swamp Trappers' Hut, the Advanced Warehouse and the Brick Road as unreleased (MinGameVersion 32 against the installed 30). The second Stick definition is the Firewood Yard's internal FakeStick. Leader effect magnitudes are not in resources.assets.

## Stored recipes and objective totals (2026-10-26)

Recipes were only attached to buildings, and chain pages showed the smallest whole batch the decoded steps allow (5 Canteens, 40 Stroganoff, 2 Glass Pane), because fuel steps such as 1 Stick → 5 fire force the batch up. Resource records now carry a generated `made_from` field with per-unit amounts next to the batch, `scripts/derive-recipes.mjs` produces it from the building data, and validation fails if the two drift. Resource pages show "Each Canteen: 2 Glass Pane, 1 Reed Bunch, 1 Stick for every 2.5 Canteen"; building pages add the per-unit line under the batch. Level pages total what the objectives need, expanded through recipes from buildings the map offers (Mom's Gardens: 6 Canteens become 12 Glass Pane, 6 Reed Bunch and 20.4 Stick once the Glassworks fuel is counted). Two resource definitions are both called Stick (284894, 284895); the Firewood Yard converts one into the other, so the rollup merges same-named resources and the conversion is left out of `made_from`. Construction materials for objective buildings are not yet included.

## 25 October update

All three unresolved batch-08 localization entries now match their packaged map files without the `08` prefix. All 133 catalog scenarios have decoded data. Verification and source details are in dedicated research pages. Crop names omit Field, and plant pages do not show construction inputs. Sandbox crop availability remains under review; use scenario planting lists.

## Scenario extraction update — 24 October 2026

Scenario binary decoding now supplies exact objectives, day limits, build/plant lists, need flags and starting prefab inventories for 133 catalog maps. All 438 objective records across the complete extracted dataset match their world copies. See `dist/data/scenarios.json`. Three localization-only entries remain unresolved: Single08_C_Desert, Single08_L_CaveCove, Single08_R_VillageWinter. Preserve gameplay observations; older pending notes about objective decoding are superseded by this update. Runtime unlocks, missing legacy need defaults, yields and production timing remain open.

# Content notes

All displayed gameplay claims still need live verification. Do not remove the gameplay status merely because a decoder roundtrip passes.

Normalized rules and world catalogs are checked into dist/data. The world catalog preserves duplicate localization entries; the UI groups objectives by identifier and displays alternate text versions rather than treating them all as simultaneous objectives.

Building and resource directories combine same-name definitions for easier browsing; detail pages expose their other variants and retain stable numeric source routes.

Production step listings follow source ID order. They are not a verified execution schedule. A derived balance is not a throughput estimate.

To add gameplay evidence, preserve game version, scenario, biome, leader, staffing, resource amounts and observed outcome. Update only the claim actually tested, and keep its original decoded source.

Availability now has independent evidence in dist/data/availability.json. Oona remains included, flagged as user-reported unreleased; related update-28 data has public-release-unconfirmed status. Missing status defaults to unknown, never to released. Biome sandbox assignments are in dist/data/biomes.json and are distinct from campaign or challenge overrides.

The `/index/` route is an alphabetical back-of-book index of every canonical page. Aliases are excluded from that index but are included in route validation.

## Scenario objective wording (2026-10-25)

Reader tables now distinguish Have (current stock or present targets), Create
(produce/make total), and HaveInBuilding (stock in a specified building), and
show percentage units for satisfaction, settlement, happiness and equipment.
The raw condition and comparison remain in the downloadable scenario records.

Do not equate the Housing condition with Concern + Housing. `Level01B` pairs
Housing = 100 with “Have everyone settled.” Its resource Have template says
“in stock.” `Single05_C_PeakResort` (Cliffside Resort) instead pairs Concern +
Housing = 100 with “Satisfy Housing”; its Create templates say “Produce” and
“Brew.” These are distinct stored objective types; their runtime relationship
has not been tested. The wording is in each record's `objectives` and
`source_entries`, with localization keys and text asset IDs.

