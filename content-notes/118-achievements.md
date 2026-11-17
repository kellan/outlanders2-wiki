## Achievements page (2026-11-17)

The maintainer asked whether the achievement information is in our data, and then said yes to a page.

**Source**
- The game's localization table (the TextAsset whose CSV starts "Key,Notes,en-US") has an `Achievement.<Id>.Name` and `.Description` row for each achievement:
  - version 30, asset 6521: 39 achievements;
  - version 31, asset 6634: 41 achievements.
- The two new in version 31 are Off the Menu and Speedrunner, both Tournament.
- Research `tools/export_achievements.py` (main 80e7427) writes `data/achievements.json` and `decoded-mechanics.json` → `achievements`. Each record has its id, name, description, the version it was added in, and a target.
  - The target is the one number in the description; it is left empty when the description has none or several, e.g. "3 minutes and 30 seconds".
- **No rule data.** The achievement rules are built in code. `work/class-index.json` has no achievement objects in resources.assets, and the only matches in the assets are the text rows.
  - So "what counts" is the game's own wording, plus one thing from the code's class list. There are separate running-total and one-level kinds for producing, consuming and extracting goods: `CreateResourceAchievement` / `ProduceResourcesLevelAchievement`, `ConsumeResourceAchievement` / `ConsumeResourceLevelAchievement`, `ExtractResourceSourceAchievement` / `ExtractResourcesLevelAchievement`.
  - That matches the goals that say "in a single town".

**Spoilers**
- The export flags an achievement as `held_back` when its goal names a resource or building that `content/spoilers.json` holds back. Two are flagged, both from the next story's update.
- The page leaves them out and gives no total, so the count doesn't reveal them either. Their text stays only in the decoded data, where that update's other content already is.

**Page**
- The groups and links are ours: for example, Got Wood? links to the Lumberjacks' Base, and the Concern* achievements link to the need pages.
- The page is linked from the home page's Reference box.

**Not checked in play:**
- whether running totals include sandbox games and online challenges;
- whether replaying a level counts twice toward the "finish N levels" achievements.

**Checks:** check 118 is new.
