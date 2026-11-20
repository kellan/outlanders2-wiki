# Spoilers page: what's coming first

The maintainer found the Spoilers page dull: after PR 119 lifted Oona's holds it was a long method note plus four season names. Each tournament entry in `content/spoilers.json` now carries editorial `highlights`, drawn from the version 32 decode (research docs/release-32-257/content.md) and the reward tables already on the Tournament spoiler view:

- Holiday: reward buildings Playground, Winter Cabin (House With Chimney), Bonfire, Tailor (Coat Maker), Winter Pub, Fondue Bar (Fondue Shop); `SkinHoliday` with LevelTag "Christmas" and Evergreen SceneTags Snow/Winter/SnowyTrees (snow variants on Ash, Pine and Pine Sapling, SnowyTreesParticles leaf fall); Holiday villagers (gate 32) with their own hair sets and winter body sets; six "DayNightCycle Holiday" assets, one per biome; leaderboard T7, right after Greek (T6).
- Egyptian: Lumberjacks' Base, Smoothie Stand, Desert Home, Market, Well, Press; villagers gated at 28.
- Imperial (asset name Chinese): Plank House, Farm, Beehive, Paper Mill, Orchard, Brewery; villagers gated at 29.
- Arctic: name and leaderboard only.

The page renders these as cards (Holiday first), skips the generic tournament list when highlights exist, and moves a shortened method note to the end. Checks: check-contributions now looks for "Not seen in game yet" instead of "release unconfirmed"; new check 128.
