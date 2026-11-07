## Level-specific "Only on" row fixed (2026-11-07)

The maintainer pointed out that the live Author's Stand page said "Only on: Picun's Secret, Too Hot to Write", leaving out "Where Am I?". The fix (3457f68) was pushed to the #103 branch after #103 had already been merged, so it never reached main. This PR carries it over.

- The row now lists every way the building appears: built on (build lists, including same-name variants), starts on the map (the building or its build site is placed at the start), and required by (objectives ask for it, but it is on neither the build list nor the map).
- The row is renamed from "Only on" to "Appears in", which makes no claim of exclusivity.
- The separate "Levels" count is hidden on level-specific pages. It counted build lists including an unnamed archive map, so it read "3 levels" next to a different list. Ordinary buildings keep it.
- Check 105. Check 103 is updated for the new row name.

**Same gap on level pages (maintainer asked whether it was fixed everywhere).** Three level-page analyses only looked at the starting build list:
- the "What can meet it here" column of the needs table, with its Fun and Heat warnings;
- the "What the objectives need" table: which building makes each input, and the "(not buildable on this map)" note;
- crop sources ("(none plantable on this map)").

A new helper, `levelOnMapIds`, takes the build list plus everything placed at the start, with build sites mapped to their buildings. All three now use it. A building that is only pre-placed is marked "(already on the map)" in the needs column. The notes now say "(not on this map)" and "Nothing on this map".

Example: on Tourist Trap the needs table used to show Heat from only the Coat and Winter Cabin, and Wellness as "Nothing buildable". It now also lists the pre-placed Bonfire and Zen Garden.

The infobox "Levels" row is renamed "Buildable on" ("Plantable on" for plants), because it counts build lists only. It still links to "Where it can be built", and #104 added the "Starts on the map" section below that.
