## Level pages split up (2026-10-28)

The maintainer found the levels page overwhelming and asked for:
- home-page links to a page for each campaign and each challenge type;
- an all-levels page with everything in one table, for sorting;
- descriptions such as what a Redux is moved onto that type's page.

What changed:
- **Home:** the Campaigns and Levels boxes are replaced by two boxes.
  - **Campaigns & levels:** each campaign with its level count, plus "All levels in one table".
  - **Challenges:** the six types; the three older ones are marked "(older)".
- **All levels (`levels/`):** one sortable table of every level, with campaign and challenge-type links above it. The tabs and per-group sections are gone. The Category column ("Chill challenge · batch 00 · 3 Jul 2024", "Campaign 2", "Tournament tutorial") sorts by type, then batch.
- **Challenge type pages (`challenges/original/` … `challenges/remix/`):** each has:
  - **What it is:** the game's own briefing text for Original, Redux and Bounty; the short description for the older types.
  - **When it runs.**
  - **Example from the archive:** the briefing checked in play.
  - **Its levels.** Chill, Ranked and Remix list their packaged maps oldest first, with the never-scheduled ones folded away. Original, Redux and Bounty say their maps aren't in the installed files yet.
- **Challenges overview:** keeps the rotation section and adds a table of the six types linking to their pages. The per-type example table moved to the type pages; it is still on the verification page.
- **Level pages:** an older challenge level's context line now links its type page.

Cycle and date predictions for the live types stay out until the archive data from #75 arrives.
