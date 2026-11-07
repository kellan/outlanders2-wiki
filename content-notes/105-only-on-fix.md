## Level-specific "Only on" row fixed (2026-11-07)

The maintainer pointed out that the live Author's Stand page said "Only on: Picun's Secret, Too Hot to Write", leaving out "Where Am I?". The fix (3457f68) was pushed to the #103 branch after #103 had already been merged, so it never reached main. This PR carries it over.

- The row now lists every way the building appears: built on (build lists, including same-name variants), starts on the map (the building or its build site is placed at the start), and required by (objectives ask for it, but it is on neither the build list nor the map).
- The row is renamed from "Only on" to "Appears in", which makes no claim of exclusivity.
- The separate "Levels" count is hidden on level-specific pages. It counted build lists including an unnamed archive map, so it read "3 levels" next to a different list. Ordinary buildings keep it.
- Check 105. Check 103 is updated for the new row name.
