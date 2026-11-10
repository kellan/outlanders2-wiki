## Building markers on level maps (2026-11-10)

The maintainer pointed out that the new maps had lost the building labels the research tool's drawing had.

**Research (main):** `tools/export_level_maps.py` now records a label position for each placed building and build site.
- The position is the centre of the tiles it occupies, put through the same 45° turn and crop as the image, given as a percentage of the image.
- Storefront: 9 positions. The Watchtower site is above and to the right of the Lumberjacks' Base, as in the maintainer's screenshot.

**Wiki**
- **Tried first:** text labels drawn over the image as HTML, so they stay sharp when the image shrinks. At phone width the camp names overlapped each other and the Lumberjacks' Base.
- **Now:** numbered pins, with a key under the map.
  - Buildings within about 6% of the image of each other share a pin.
  - The same contents at several spots share a number, e.g. "Foragers' Hut (2 places)".
  - Readable at 390 px (checked in a phone emulation screenshot).
- The caption says "Numbers mark the buildings already placed" instead of listing them.

**Checks:** check 113 covers this. Check 111's caption and legend patterns and check 112's inline-style pattern are updated for the new markup.
