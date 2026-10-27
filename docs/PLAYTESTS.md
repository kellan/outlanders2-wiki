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
Row: *What demolishing a finished building, and a half-built site, gives back*. Done for the Basic House (3 of 6 Logs back; a half-built site returned everything delivered) and the Bakery (5 of 9 Clay, 2 of 4 Stone back, 27 Oct 2026): half of each material, rounded up. Optional next step: recycle a half-built Bakery after some but not all materials arrive, to check that part-built sites return everything delivered for buildings other than houses.

### A7 Trading Outpost trade `trade`
Row: *How long one Trading Outpost trade takes*. Done once for Evergreen (27 Oct 2026): one worker, 216–232 s at normal speed from a full 12-Wheat store to the sixth good, and switching the import works as the files say. Still useful: repeat with 3 workers to see whether it gets faster, and capture the Tropiclands and Winterlands outposts' field guides (expected: 8 Glass Pane for 6 Animal Hide or 9 Wheat; 8 Animal Hide for 9 Wheat or 6 Glass Pane).

## Part B: timed tests (one per session)

### B1 Meal log `meals`
Rows: *Food consumption per villager per day, and when villagers choose to eat*; *Whether villagers prefer some foods over others*. Pick a level with a stocked food pile and at least two kinds of food (Veggie and Fruit are ideal: both are 1 food unit). Choose one adult, open their panel, and follow them for 5 game days at normal speed. Each time they eat, record: game day and dial position, the food status shown in their panel just before (Full, Satisfied, Wanting, Low), what they ate, where (loose pile, Open Kitchen, other) and whether a kitchen was available. Also note the first day a hunger warning appears if food runs out. Then, with both foods in equal reach, record which one the next five eaters take. Screenshot the panel at each meal.

### B2 Fish per cast `fishing`
Row: *Fish per cast at the Fishing Dock*. Tropiclands or any coastal level. Build a Fishing Dock with a full crew. For 20 casts per fishing spot, record how many Meat each cast produced (watch the output pile count). The stored roll is 0 to 1 at two spots and 0 to 2 at the third; the test says whether that holds and whether the spots differ. Done for the 0–2 spot (27 Oct 2026, Evergreen sandbox, one worker): 20 casts gave four 0s, five 1s and eleven 2s. Still needed: 20 casts at each of the two 0–1 spots (put one worker there at a time), and more casts at the 0–2 spot to see whether 2 really comes up more often than 0 and 1.

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

## When a test is done

Set the row's `Status` in [INFORMATION-NEEDED.md](INFORMATION-NEEDED.md) only if you can push; otherwise the wiki session does it. New tests get added here by the wiki session as decode work raises new questions; check this file at the start of each session.
