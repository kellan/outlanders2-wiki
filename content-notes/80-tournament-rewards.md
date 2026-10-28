## Tournament reward tables (2026-10-28)

The maintainer asked how to get previous tournaments' levels and rewards. **Levels:** they are downloaded per day and the game won't load a day outside the active tournament, so they have to come from the Mac's `Tournaments` cache (now part of #75). **Rewards:** they are packaged with the game, so this change decodes them.

- **Source:** 70 `RewardEntry` MonoBehaviours in `resources.assets` (14 per season), decoded by the research repo's `tools/decode_classes.py` and exported by `tools/export_tournament_rewards.py` to `data/tournament-rewards.json`. Copied here as `tournament_rewards` in `content/reference/world.json`.
- **Seasons:** asset names map to the text keys: Viking → Nordic, Precolumbian → PreColumbian (shown as Mesoamerican), Amish (shown as Rural), Chinese (shown as Imperial), Egyptian.
- **Thresholds:** `TrophyThreshold` is the season's Reward Points total that unlocks each reward. The game draws Reward Points with the trophy-cup icon and stores them as trophies. The totals are the same every season: 2, 5, 8, 12, 16, 20, 26, 32, 40, 48, 58, 68, 80, 92.
- **Reward types (`RewardType` enum):** Building, Palette, Villagers, Streak, Score.
  - **Streak:** shown as Streak Shield, using the game's Streak Shield pop-up text.
  - **Score:** shown as Leaderboard Bonus points. `Score` is the bonus: 20, 50 and 100.
- **Restyled buildings:** the reward's building reference is a prefab GUID. It is resolved through the scenario build lists, and all 25 resolve.
- **Rural, the live season, now has its table.** It has no reward text of its own, so names and descriptions fill the game's general templates (`FastMode.Building.Reward.N`, `FastMode.Palette.Reward`, `FastMode.VillagerStyle.Reward`) with the style name. The note on its live-season observation is corrected.
- **Egyptian and Imperial** also have full tables, and they stay on the spoilers page. Their spoiler reason now says the files hold a reward table but no season-specific text, the same as Rural, so the files alone don't show whether they have run.
- **Also fixed:** the season intro read "the season's -inspired"; it now reads "season-inspired".
