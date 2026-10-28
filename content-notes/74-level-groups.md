## Levels split into campaign and challenge levels (2026-10-28)

The maintainer asked for levels to be split into campaign and challenge levels, with challenges grouped by their six types. They also described the rotation: an Original every weekend, Bounty and Redux alternating on weekdays, and Chill, Ranked and Remix as older types that are still playable but no longer rotate.

The game files back this up and give the split:
- **Types:** the code's `ChallengeType` enum is Bounty, Redux, Original, and `LegacyChallengeType` is Chill, Leaderboard, Remix. The archive view's toggles name all six, with Leaderboard shown in the menu as Ranked (Magnus Opus was observed under Ranked).
- **Leaderboards:** the Game Center IDs are `MondayChallenge` to `ThursdayChallenge` plus `WeekendChallenge`. Briefings say an Original's leaderboard runs Friday to Sunday and a Redux's or Bounty's for 24 hours.
- **The packaged maps are all legacy:** the 81 challenge maps sit in `Assets/Resources/Content/Levels/LegacyChallenges/Batch00` to `Batch24` (plus 05.1 and 06.1), 27 batches each holding one `_C_` (Chill), one `_L_` (Leaderboard/Ranked) and one `_R_` (Remix) map. The observed examples fit: Town of the Year is `Single_C_Villagers100`, Magnus Opus `Single_L_OneBook`, Sweet Maze `Single_R_C2_L1B`. Batch number is the order used within each type.
- **Online levels:** Original, Redux and Bounty levels are not in the installed files. The archive (`SinglesBatchArchiveView`) is downloaded, with a date on each button (`ChallengeArchiveButton.Date`). So the wiki lists only what has been seen so far, and asks the local agent to record the archive and the downloaded levels.

Level pages for legacy challenges show their type, batch and neighbours in place of "Standalone / challenge unverified". The one remaining non-campaign map, `Level06Map`, is listed under Tutorials and other maps.

**Dates.** A packaged text asset, `Content/Levels/LegacyChallenges/batches` (TextAsset 6535), dates the legacy batches:
- **Released:** 20 batches, every 14 days, from Batch00 on 2024-07-03 to Batch17 on 2025-03-26. Sweet Maze is in Batch17, which matches the 3/26/2025 date the archive showed. The list is copied into `world.json` as `legacy_challenge_batches`, and the levels show their release date.
- **Never scheduled:** Batch18 (Couples Retreat, Port Plateau, Sugar Frost) and Batch19–24 (unnamed maps) are packaged but not in the list, so they are shown separately.
- **The daily rotation:** the client code shows a 364-day cycle starting 2025-04-02. The maintainer asked to leave that, and a calculator built on it, off the wiki until the actual Original, Redux and Bounty levels and their dates are recorded (#75).

The full analysis is in the private research repository (`docs/ONLINE-SERVICES.md`).
