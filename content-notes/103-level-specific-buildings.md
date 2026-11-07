## Level-specific buildings (2026-11-07)

The maintainer asked whether buildings such as the Author's Stand, Beer Stand and Ritual of Hidden Light form a class, and what to call it. They chose **"Level-specific"**.

**How the game marks them** (from its own data, not level counts):
- Build-menu categories (`BuildingCategory`):
  - **Mission**, shown in game as "Story": Banner, Watch Tower, Fake Watch Tower, Gingerbread Man Man, Wishing Well, Festival Stage, Beer Stand.
  - **Special**, with no display name: Author's Stand, Pablo's Ladder, Gift Shop, plus a non-recyclable Winterlands Trading Post copy. That copy is left out, because it is a map-placed variant of an ordinary building.
- Content folders: `_campaign buildings` (the eight "z"-prefixed story buildings) and `_level unique buildings` (Ritual of Hidden Light, Giant Wheel, Hanging Garden, Gingerbread Man Man).
- The union gives 12 wiki entries. Each is in 0–4 levels' build lists.
- Rare ordinary buildings (Mead Hall, Porridge Cookhouse, Beehive), holiday reskins and the `_monuments` folder are not included; they sit with the ordinary buildings in the game's data.

**Changes**
- `isLevelSpecific(b)` is computed from `ui_style.building_categories` and the content paths. `category()` returns `special` for these buildings.
- The buildings directory gains a "Level-specific" tab and chip, replacing the raw "Mission"/"Special" chips.
- Building pages get a "Level-specific" tag, a short note listing the levels that offer the building, and an "Only on" infobox row.
- Buildings in no starting build list (Beer Stand, Concert Stage, Pablo's Ladder, Banner) say "Not in any starting build list": they are placed on the map or unlocked during a level.
- Buildings in the game's Mission group that are in some level's build list get one more line: "In the game's build menu it is under Story." That applies to only two of them: the Wishing Well (Sweetroll Peak) and Gingerbread Man Man (Secret Gift Exchange). The rest only start on the map or appear nowhere, so no build menu shows them. The maintainer noted the Ritual of Hidden Light starts on the map. That is the group's in-game name. The wiki keeps "Level-specific" as its own label because it already uses "story" for campaign chapters, and some of these buildings appear in challenges.
- Confirmed in play (maintainer, 7 November 2026, Sweetroll Peak): a Story tab with a flag icon holds the Wishing Well, costing 35 Stone + 10 Planks, which matches the stored cost. Recorded as observation `wishing-well-story-build-menu`.
- **Correction (maintainer report: the Author's Stand page listed two levels, but "Where Am I?" also needs it).** "Only on" first read only the starting build lists. In "Where Am I?" the Author's Stand is not on the build list; its build site (`zAuthor's Stand Build Site`) is pre-placed on the map, and the objective is "Have 1 Author's Stand". The note and the "Only on" row now give three kinds of level:
  - **built on:** in the build list, including same-name variants;
  - **starts on the map:** the building or its build site is among the level's initial instances;
  - **required by:** the objectives ask for it but it is in neither the build list nor the map, so it is presumably unlocked during the level. Example: Giant Wheel on Wheel of Thirst.
  Gift Shop, Gingerbread Man Man, Banner, Concert Stage, Pablo's Ladder and Watchtower also start on the map in some levels.
