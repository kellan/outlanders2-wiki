## Maps for the packaged challenges and tournament tutorials (2026-11-12)

This follows PR 114 (story levels). The maintainer chose "the other maps" next.

**Which levels:** the game ships 285 level files. Of the ones not yet drawn:
- **Drawn now:** the 81 packaged legacy challenges and the 3 Tournament Tutorial levels. All 84 have pages on the wiki.
- **Not drawn:** the 152 internal test levels ("Test Papermill" and so on). They have no pages, so no maps are made for them.
- **Still to come:** the 260 online challenges. Their level files are not in the game package; they are in the challenge cache on the maintainer's Mac and would have to be copied over first.

**Research (main):**
- `add_level.py --list --category ...` lists the other categories.
- The 84 level files and prefab exports are added. All loaded with the layout-only load from PR 114, with no failures.
- 130 maps now, 6.5 MB in all. The largest is Single05.1_R_001A at 149 KB.

**Names:** one building is labelled "Gingerbread Man Man". That is the game's own name for building 67670 (Single_R_Gingerbreadm), and the wiki already uses it.

**Checks:** check 115 covers this. Every packaged challenge and tutorial page has a map; there are 130 records; there are none for test levels.
