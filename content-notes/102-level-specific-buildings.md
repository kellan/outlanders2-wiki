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
