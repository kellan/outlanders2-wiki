## Halloween and Christmas pages (2026-11-08)

The maintainer asked for a page linking all the Halloween-themed content and another for the Christmas-themed content.

**How content is chosen** (all from data the wiki already has)
- **Buildings, plants and food:** internal names containing "Halloween", or "Christmas"/"Gingerbread". Seasonal variants that share a display name with an ordinary building link to the ordinary one too.
  - Halloween: Communal Plaza, Fountain, Open Kitchen, Playground, Two-Story House, Zen Garden and Pumpkin.
  - The Halloween Open Kitchen makes its own Stew resource (`Stew _Halloween`, 1 food unit, the same as Stew).
- **Biome:** Spookylands (internal name "Halloween").
- **Maps:** a map is listed when it places seasonal scenery, offers a strongly seasonal building, or is named for the season.
  - Halloween scenery: gravestones, candles, fences, Halloween trees, the Halloween event and Halloween pumpkins. Strong building: Halloween Tombstone. Names: spook, pumpkin or halloween.
  - Christmas scenery: presents, candy canes, sleds and tree lights. Strong buildings: the Gingerbread Man Shop and Gingerbread Man Man.
  - Each row says what made it seasonal. Unnamed archive entries are left out.
- **Left out on purpose:**
  - **Snowman-only maps:** "Christmas Snowman" scenery stands on about 30 ordinary winter maps.
  - **Festival Ornament maps:** the campaign festival, not Christmas.
  - **Maps that only offer a Halloween-look variant** in their build list (Town of the Year, River of Harmony and one Redux).
  - **The Gift Shop:** Felix's book memorabilia, not Christmas gifts.
  - **The "Holiday" tournament style:** stored but not yet run, so it is a spoiler.
- **Map counts:** 19 Halloween maps (9 online challenges in October 2025) and 13 Christmas maps (7 in December 2025). Mysterious Gingerbread Man Seminar (22 October 2025) is on both: Halloween scenery and the Gingerbread Man Shop.
- **Decorations** have no wiki pages, so they are named in the map rows rather than linked.

**Follow-up: seasonal variant prefabs** (the maintainer suggested they might point to specific levels)
- A sweep of every root prefab name for Halloween, Christmas and Xmas found 57. Beyond the items already used, the useful ones are:
  - **The game's own seasonal scenes:** each level stores `LevelScene`. The Skin records list `LevelHalloween` alongside Level, Snow, Tropical, Desert and Swamp, and the level data also uses `LevelChristmas`.
    - Halloween scene: 3 story maps and 8 online challenges, all 22–31 October 2025.
    - Christmas scene: 3 story maps and 6 online challenges, all 18–26 December 2025.
    - The page now splits maps into "Halloween maps" / "Christmas maps" (the whole map has the seasonal look) and "Other maps with … touches" (an ordinary scene with decorations added).
  - **Halloween lighting:** `HalloweenDayNightCycle` comes in Amish, Chinese, Egyptian, Precolumbian and Viking versions. These are the Halloween-scene overrides in the five Tournament Mode style Skins, shown under their English names: Rural, Imperial, Egyptian, Mesoamerican, Nordic. There is no Christmas lighting override.
  - **Christmas presents:** each present carries a `RecyclableBehaviour.OverrideRecycleValue` of 3 Coats, or 1 Coat + 2 Books (already in `salvage`). The Christmas page now has a Presents section linking to Recycling.
- Ambience only, not listed separately:
  - Halloween Event and Halloween Event Small have no effect and last 9,999 days;
  - CrowHalloween; crows also appear on non-Halloween maps.
- `AssetReplacements` maps old Paper Mill, Foresters' Hub and Orchard prefabs to new ones. It is not seasonal.
- **Level pages** show "· Halloween" or "· Christmas" beside the biome, linking to the collection page, with "(touches)" for decoration-only maps.

**Links:** the home page Reference box links both pages. Check 108 covers both pages.
