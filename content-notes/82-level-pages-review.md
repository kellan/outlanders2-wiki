## Challenge and level pages, reviewed (2026-10-28)

The maintainer noticed the "Example from the archive" section on the Redux page looked out of place now that every level is listed, and asked for a review of the level and challenge pages.

**Challenge type pages (`challenges/<type>/`)**
- **Example section removed.** It was a single briefing checked in game, written before the full level list existed. Those checks are still on the verification page.
- **"What it is" only appears with the game's own text.** It is now headed "In the game's words" and shows the briefing quote, which only Original, Redux and Bounty have. For the older types it only repeated the subtitle, so it's gone.
- **"When it runs" says the schedule once.** For example: "Tuesdays and Thursdays. Each runs for 24 hours, from 2pm Eastern to 2pm the next day." The rotation's 364-day repeat follows it.
- **One table for every type,** with columns for number, level, first run (or release date), next run (live types only), objectives, day limit and starting villagers.
  - The older types lose the repeated Category column and the "Availability: Unknown" column.
  - Their never-released maps are labelled "never released" rather than "never scheduled".
- **Objectives are a short summary,** not counts: "Make 55 Cookie; Population 22; Everyone settled", "No Basic House", "+1 optional".
  - Comparisons apply only to Have targets. The game stores "reach a population of N" with an equals comparison, so population objectives show no comparison.
  - The All levels and campaign tables use the same summary.

**Challenges page**
- **Rotation section rewritten in three short paragraphs:** the weekly pattern and 2pm rollover; the 364-day cycle of 260 levels; and the older types. A small note maps the code's type names to the menu's.
- **The types table** gives days for the live types, and released counts with "+7 never released" for the older ones.
- **Raw text dump removed.** The roughly 99 recovered Tournament text entries, shown with unfilled placeholders, are gone; the Tournament Mode page already renders that text properly. So is the supply-chain panel, which only gave a count. The handful of non-Tournament challenge strings remain in a collapsed list.

**Level pages**
- **Older challenge levels** (Chill, Ranked and Remix) now have the breadcrumb Challenges › <type>, and the sidebar highlights Challenges, as the rotation levels do.
- **Bounty levels** show a "Scoring goal: Most Veggie" card instead of "Main objectives 0". The objectives section is headed "Scoring goal".

**All levels:** sorting by name ignores leading quote marks, so the Redux titles no longer fill the top of the table.

**Older checks updated for the new wording:** `check-scenarios.mjs` accepts the Scoring goal heading on Bounty pages. `check-companion.mjs` keeps its no-internal-names test without the removed panel. `74-level-groups.mjs`, `79-level-pages.mjs` and `81-challenge-archive.mjs` follow the new text.
