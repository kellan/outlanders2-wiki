## Level maps (2026-11-10)

Issue 96. The maintainer settled the open questions one at a time.

**Decisions**
- **Publication:** our own schematic drawings derived from the level files may be published; the files themselves may not. `docs/TOOLS-AND-PUBLICATION.md` now says so.
- **Spoilers:** maps appear only where a level page already appears, so spoiler levels stay behind the existing spoiler handling. None of the four levels here is a spoiler.
- **Orientation:** set from a screenshot of Storefront (day 1, zoomed out, camera not turned).
  - The game's default view matches the top-down map turned 45° anticlockwise and flattened top to bottom. It is not mirrored.
  - Landmarks: the island with the Watchtower site at the top, the rocky ridge and islet on the right, the palm lobe upper left, the camp in the middle.

**Research (main):** `tools/export_level_maps.py`
- It reads each level the simulator has (`data/levels/macos-30-254`: Level01A, Level01B, Level01C, Level06A) with the same reading as `tools/level_map.py`: the tile grid with terrain and height, plus the placement grid.
- It draws one patch of colour per tile (terrain shaded by height; trees, fruit trees, rocks, clay, piles, buildings and build sites), with villagers as dots, and leaves out decorations.
- It crops to the land, turns the image 45° anticlockwise, flattens it to 0.62 height and quantises it to 48 colours: 16–32 KB per level.
- Outputs:
  - PNGs go to `assets/level-maps/`;
  - the summary (image, size, tile counts, object counts, placed buildings, villagers, orientation and publication notes) goes to `data/level-maps/level-maps.json` and into `decoded-mechanics.json` as `level_maps`.

**Wiki**
- A **Map** section comes before Starting conditions, with a legend, alt text and a caption ("our own drawing … the way the game's camera first shows the map").
- The alt text names what is on the map, without counts. The tool's "trees" include more wild plants than the Starting conditions list, so numbers there could disagree.
- Villager counts include the leader and match the pages: Storefront 7, also seen on the in-game counter.
- Checked in a phone-width screenshot.

**Checks:** check 111 covers the four maps, image size, placement, alt text, legend, the absence of a map elsewhere, and the policy sentence.

**Next:** more levels need `tools/villageport/add_level.py <LevelId>` and a rerun. The interactive layer (tile under the pointer, footprint preview) is still to do.
