## Maps with no births (2026-11-08)

The maintainer asked whether the wiki surfaces that some levels have no reproduction, so no children are born.

**What switches births off**
- `Level.BirthBabies` multiplies the birth chance by `StatsSystem.GlobalEffects.ReproductionMultiplier`. A level event's `Effect` merges into those global effects by multiplying (`LevelEffect.Merge`, docs/WALKING.md). So an event with `ReproductionMultiplier` 0 stops every birth while it runs.
- Three events do this, each for 999 days from day 0:
  - `No Reproduction Single00 L`: placed on 14 maps;
  - `Level 01A` (The End of the World): also sets `NoDeath` and `ConstantHappiness`;
  - `Level 01B` (Middle Ground).
- Housing is not the cause anywhere else. Every house except the Shelter House has a crib. The only maps without a crib house are The End of the World and one unnamed archive entry.

**Bug fixed in research (commit 620d12a)**
- `tools/export_mechanics.py` treated 0 as the neutral value for every effect field, and dropped `True` because `True == 1.0`. So these events showed an empty effect on the wiki.
- A multiplier's neutral value is 1. The export now keeps 0 multipliers and true flags.
- `level_events` and `level_event_schedule` were re-copied. Only these three events changed.

**Before**
- The 5 packaged maps had "No babies are born on this map" in the Events line of their starting conditions. That line was matched by the event's name.
- The 9 online challenge maps said nothing, because they have no event schedule.
- No page listed the maps.

**Now**
- `noBirthsRule(s)` finds the rule from the effect, via the placed prefabs or the schedule, so the challenge maps are covered too.
- Each of the 16 level pages shows a tip after the needs table. The Events row also works for challenge maps.
- The Villagers page lists the 15 named maps; one unnamed archive entry is left out, as elsewhere.

**Births text corrected** against the ported `Level.BirthBabies` (research `tools/villageport/births.py`, decompiled version 30):
- once a game day, with more than one adult, every house with residents and an empty crib rolls once;
- the old text said pairs of adults are checked (`AdultsPerCheck` is only used in a debug log), and that how often was unknown;
- "free housing" means beds (villagers below total housing), not cribs;
- a baby does not count as a villager until it turns into a kid.

**Seen in play:** the maintainer noticed no births while testing Full Tilt Queso (8 November 2026, version 31). Recorded as observation `full-tilt-queso-no-births` on that level page.

**Babies and births page** (follow-up: "is there a page that they can all link to? ... explains baby rates and that there are no babies on some levels"):
- New Mechanics page `births/`. It covers:
  - the rules;
  - a multiplier table (happiness, free beds, children, Community ×1.2 from its satisfied effect, tournament baby boost ×3, map rule ×0);
  - babies a day for 10 houses;
  - the map list, plus "Confirmed in play" from level observations.
- Babies a day per house = 1 ÷ (1 ÷ chance + kid age), because the crib stays busy for 3 days after a birth. This is an approximation for steady factors.
- The level tips and the Houses page now link to the new page. The Villagers Births section is cut to a summary and a link.

Check 107 covers the decoded zeros, all 16 tips and event rows, a control map, and the Villagers text and list.
- Check 83's "houses links to the birth rules" now looks for the Babies and births page, the rules' new single home.
