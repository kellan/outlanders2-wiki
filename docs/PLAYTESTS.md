# Playtests for a computer-use agent

What the wiki needs from someone (or an agent) **playing the game**, as distinct from the decode questions in [DECODE-TARGETS](https://github.com/kellan/outlanders2-research/blob/main/docs/DECODE-TARGETS.md), which are answered from the game files. Everything here is a fact the files cannot give: how a stored number behaves in play, what a menu shows, or how long something really takes.

Tests are ordered by value per minute of play. Part A is screenshots and menu reading: cheap, do these first. Part B is timed tests: one per session, slow, do them in the order given.

## Ground rules

- Game version 30, build 254 unless the game has updated; record the version shown in Settings at the start of every session.
- Play at **normal speed** for anything timed. Pause while taking notes. Note the leader in use; leaders change rates.
- One timed test per session. Do not mix tests on one map unless a test says it is safe.
- Record a game day as the number shown on the day counter plus the clock dial position (day face or night face, and roughly how far round). Hours are not shown in the game.
- Screenshots go in `assets/gameplay-evidence/<test-id>/` with the name pattern `<test-id>-<game day>-<what>.png`. Keep them small (phone-size is fine).
- Report each fact as one entry in [INFORMATION-ANSWERS.md](INFORMATION-ANSWERS.md) using its template, with `Row` set to the row named under the test and `Status: new`; commit and push on the `wiki-companion-improvements` branch. If you cannot push, post the same entry as a comment on [issue 10](https://github.com/kellan/outlanders2-wiki/issues/10). Never edit `content/`; the wiki session records answers from the inbox.
- If a test cannot be run as written (the building is not available, the level is locked), say so in the entry with `Confidence: uncertain` and what you did instead. A clean "could not" is more useful than a guess.

## Part A: screen captures (5 to 15 minutes each)

### A1 Field guide for every production building `fieldguide`
Row: *Field guide text, recipe, cost and worker slots for every building*. 4 of 63 are captured. Open the in-game Field guide, go through every building entry, and screenshot each one so the recipe, construction cost and worker slots are legible. One file per building, named with the building's in-game name. No commentary needed; one summary entry listing the files is enough.

### A2 The clock at sunrise `clock`
Row: *Which clock hour the stored shift fraction 0.0 corresponds to*. On any level at normal speed, watch the clock dial through one full day. Screenshot it at the moment the face changes from night to day, again when it changes from day to night, and once at the moment the day counter increments. Note whether the counter increments at the day face, the night face, or somewhere else. Three screenshots settle how the stored fractions map to what the player sees.

### A3 Level menus and names `menus`
Rows: *Menu names and placement for the 19 unnamed archive maps*, *Campaign 3: menu placement of the three levels outside Fjordi's Birthday*, *Story-to-level mapping for Campaign 1 and 2 stories*. Open the campaign and other-maps menus and screenshot each screen so every level name is visible, in order, with the story headings. Also screenshot any level card that shows unlock conditions. Write the menu order as a plain list in the entry.

### A4 Challenge and tournament screens `challenges`
Rows: *Challenge type rules for Chill, Ranked and Remix*, *Tournament season history*. Screenshot the challenge selection screen, each challenge type's rules or description text, and the tournament screen with the current season name, end date and reward list.

### A5 What the Oasis and Greenhouse plant `planters`
Rows: *Which building plants Mesquite in sandbox Drylands*, *Crop availability per biome in normal play, including greenhouse rules in Winterlands*. Start a sandbox in Drylands, build an Oasis, open its planting menu and screenshot the full list. Repeat in Winterlands with a Greenhouse and a Foresters' Hub. Note anything plantable that the menu greys out. Safe to combine with B4 on the same map.

### A6 Demolition refund `refund`
Row: *What demolishing a finished building, and a half-built site, gives back*. In any level, build a Basic House (6 Log) and let it finish; screenshot the stockpile count of Log before and after demolishing it. Then start a second one, let two or three logs be delivered, and demolish the site; screenshot before and after. Two numbers answer the row.

## Part B: timed tests (one per session)

### B1 Meal log `meals`
Rows: *Food consumption per villager per day, and when villagers choose to eat*; *Whether villagers prefer some foods over others*. Pick a level with a stocked food pile and at least two kinds of food (Veggie and Fruit are ideal: both are 1 food unit). Choose one adult, open their panel, and follow them for 5 game days at normal speed. Each time they eat, record: game day and dial position, the food status shown in their panel just before (Full, Satisfied, Wanting, Low), what they ate, where (loose pile, Open Kitchen, other) and whether a kitchen was available. Also note the first day a hunger warning appears if food runs out. Then, with both foods in equal reach, record which one the next five eaters take. Screenshot the panel at each meal.

### B2 Fish per cast `fishing`
Row: *Fish per cast at the Fishing Dock*. Tropiclands or any coastal level. Build a Fishing Dock with a full crew. For 20 casts per fishing spot, record how many Meat each cast produced (watch the output pile count). The stored roll is 0 to 1 at two spots and 0 to 2 at the third; the test says whether that holds and whether the spots differ.

### B3 Crop and fruit timing `growth`
Rows: *Real growth time versus stored stage days*, *Real harvest timing for crops and fruit per day for orchard trees*. Plant one Carrot field (stored 9 stage days) and one Wheat field (12) with a Farm nearby, and one Apple Tree with an Orchard. Record the day and dial position each was planted, each visible growth stage change, and the first harvest. For the Apple Tree, after the first fruit, record the day of each of the next five fruits appearing. Pause the game to read the counter; do not speed up.

### B4 Gathering place visits `visits`
Rows: *How often a villager visits a gathering place*, *What a dish's second effect is worth in play*. On a map with a Communal Plaza and an Open Kitchen and about ten villagers, watch for 3 game days and count visits to each place per villager (names are shown when you click them). For the Open Kitchen, pick one villager, screenshot their Community value before they eat there and again straight after, and once more a day later. Safe to combine with A5.

### B5 Production per day `bakery`
Row: *Measured production per day for key buildings*. Bakery with two workers, full input piles of Flour and Sticks, and an output pile that will not fill (demolish or move Bread out if it nears 40). Record the Bread count at the start of three consecutive days at the same dial position. The decoded ceiling is about 44 a day; the test says how close play gets. Repeat for the Windmill if time allows.

### B6 Cold test `cold`
Row: *Timed cold test in Winterlands*. Winterlands sandbox. For one villager without a Coat and no Bonfire within reach, record the day the cold warning appears and the day they die, with the Heat value from their panel each day. Repeat with a Coat, then with a Bonfire kept fuelled. Three timelines turn the decoded Heat constants into advice.

### B7 Houses and families `housing`
Row: *Whether Houses accept partial families*. On a level with one empty Basic House (4 spots) and a couple with two kids elsewhere, watch who moves in when a second house completes. Record whether families stay together, whether a baby occupies the baby spot, and whether anything ever appears in the pet spot. Screenshot the house panel.

### B8 Planted tree spread `spread`
Row: *Whether planted field trees self-seed like wild ones*. Longest test; run it last or in the background of a session that is otherwise idle. Plant one Apple Tree in a cleared area at least 5 tiles from any other tree. Every 5 game days for 20 days, screenshot the area and count new saplings. The stored chance is 2% a day within 3 tiles; four checks tell us whether planted trees do it at all.

### B9 Day length and the day limit `daylimit`
Rows: *Day length and what "day limit" counts*, *Whether late-shift crews also sleep longer*. On a level with a day limit, note the counter at start and whether the limit ends the level when the counter reaches it or passes it. In the same session, watch a Clay Pit crew and a Farm crew through one night and record when each goes to sleep and wakes, by dial position.

## Part C: Campaign 1 strategy runs

Every Campaign 1 level has a draft strategy in `content/strategies/<level id>.json`, worked out from the decoded objectives, starting inventory, costs and recipes but never played. A run tests one of them. Unlike Parts A and B, play at any speed you like; the result is whether the strategy finishes and on what day.

For each run: start the level fresh, follow the build order in the strategy file, and record the leader, the day each objective completed (main and optional), the finishing day against the day limit, and the first point where the plan stalled (missing material, idle workers, starvation, cold, a building the level would not allow). Screenshot the objectives panel at the finish. Report one entry per level in [INFORMATION-ANSWERS.md](INFORMATION-ANSWERS.md) with `Row` set to *Campaign 1 strategy: <level name>*, and say what you changed from the build order and why. Corrections to the strategy go in the entry; the wiki session edits the file.

Recommended order: 01A–01C (short, they test the Stick bottleneck the later levels assume), then 02A, 04A, 03A, 05B, 06C, the rest after. Specific things each run should settle:

| Level | Check |
|---|---|
| 01A The End of the World | Recycling the Canoe adds 3 Logs to stock; where the extra Sticks come from (fallen sticks, lumberjacks) and how long they take. |
| 01B Middle Ground | Whether 40 Cabbage tiles reach 25 Veggies in stock while six villagers eat; whether "everyone settled" needs a second house. |
| 01C A New Start | Whether the population count includes the leader and the three kids; days per birth with free beds and an Open Kitchen. |
| 02A The Itch | Whether the 45 Wheat tiles start planted or ripe; whether construction drains the Warehouse's 20 Logs. |
| 02B The Binge | Whether "Have 100 Veggies" must still hold at the end; how many Sticks the trees supply per day without a Firewood Yard. |
| 02C The Chill | Whether a Bonfire alone keeps 8 villagers warm; days until the 115 Veggies run out; Trappers' Hut catch rate. |
| 03A Edgar Shapes Up! | Fruit per Apple and Fig Tree per day once mature; whether Fruit in Markets also counts toward the 100 in stock. |
| 03B Edgar Relapses! | Whether anything needed sits across water (Bridge). |
| 03C Edgar Bounces Back! | Whether saplings count toward 22 Banana Trees; whether Foragers pick coconuts from Palm Trees; Smoothies per villager per day. |
| 04A Road Song | Egg laying per coop per day; whether the Cookie Shop's 8 Cookies per batch holds. |
| 04B Sugar Highway | Births per day with Maddy; whether "everyone settled" can be lost after it ticks. |
| 04C Too Many Cookies | Whether unstaffed Cookie Shops count; Eggs needed per day for two or three staffed shops. |
| 05A On Edge | How many Sticks one Firewood Yard holds (the objective needs 90); whether the Bonfire draws from the yard's store. |
| 05B Under Pressure | Hides per Trappers' Hut per day; whether "Clear all rocks" needs all three sources quarried out. |
| 05C Blown Away | Which trades the Winterlands Outpost offers in play and their real rates and Stick use. |
| 06A Storefront | Tropiclands Outpost: 8 Glass for 9 Wheat in play; Glassworks panes per day. |
| 06B Management | Whether Bread from 45 Flour stalls when Bakery piles fill; Ice Pops per Fruit (2 or 4). |
| 06C Cache | Whether the Fake Watch Towers are indeed decoys; whether anything other than the Canteen Factory uses Glass; finish day against the optional day 35. |
| 07A Who's There? | Evergreen Outpost Wheat-for-Glass rate; Grape Vine fruit per day; whether Happiness reaches 80 with Felix. |
| 07B What Happened? | Whether Newspapers raise Community enough for the objective; whether Lumberjacks cut the counted Winter Pines. |
| 07C Where Am I? | Tropiclands Outpost Glass-for-Hide rate; Book Workshop output per day. |

## When a test is done

Set the row's `Status` in [INFORMATION-NEEDED.md](INFORMATION-NEEDED.md) only if you can push; otherwise the wiki session does it. New tests get added here by the wiki session as decode work raises new questions; check this file at the start of each session.
