## Maps for every story level (2026-11-12)

The maintainer asked to add maps to all the levels, starting with the story levels.

**Research (main, 7138f25 and e479201)**
- `tools/villageport/add_level.py` added the 42 story levels the simulator did not have yet: level files and prefab exports.
- **Layout-only loading.** The simulator could not fully load 19 of the levels. Their buildings (eating places, social spots, animal pens) and some starting animals are not ported yet.
  - A map only needs what is placed where, so `LevelLoader.load(layout_only=True)` stops once every entity is on the placement grid, before any behaviour runs.
  - On the 27 levels the full load can run, the layout-only reading is identical once build sites get the "(build site)" name the game gives them as they start.
- **Fields and roads** were drawn and labelled as buildings, e.g. Management's corn field and road. They now have their own colours (Fields, Roads in the legend) and no pins.
  - This covers crop fields and orchard plots (prefab names starting "Field "), plus Road, Stone Road and Brick Road.
- **Story props** keep their internal names, made readable ("UFO part 1" on Unidentified).
- **Spoilers.** The three levels in Oona's story stay held back (content/spoilers.json), so the export makes no map record or image file for them.

**Wiki**
- 46 maps, about 2.6 MB in all. The largest is Valley Draft at 142 KB (1356 px across).
- Alt text no longer says the land is "surrounded by water": many later maps are land to the edge, with a river or no water at all.
- Checked at 390 px for Management (fields, roads, 6 pins) and Valley Draft (largest map): no sideways scroll.

**Checks**
- Check 114 is new. It covers:
  - every one of the 46 story level pages has a map;
  - spoiler levels have no record and no image;
  - no field or road labels;
  - the Fields and Roads legend;
  - Summit Heat's Stone Road;
  - the UFO part names;
  - Valley Draft's alt text.
- Check 111 is generalised from exactly four maps to "the first four are still there". Its image cap went from 60 KB to 160 KB.
