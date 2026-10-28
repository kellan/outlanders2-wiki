## Objectives in the game's own words (2026-10-28)

The maintainer pointed out that Dark Stew Feast's in-game goal reads "Produce as many bowls of Stew as you can", which is different from "Have as many" or "Consume". The wiki said "Make as much Stew as you can" and "Most Stew". The ask was to word level goals as close to the game as possible.

**Source.** The research tool `tools/export_objective_text.py` (research repo, data/objective-text.json) exports three things. They are stored as `objective_text` in content/reference/world.json.
- The `WinConditions.*` templates, such as "Bake {Count} [{Name}].", "Have no [{Name}].", "Reach a Population of {Count}." and "Have everyone settled."
- The Bounty templates `UI.Leaderboard.Resource.*`: "In {count} days:", "Produce as many [{Resource}] as you can.", "Have as many …" and "{count} [{Resource}] produced."
- For each object, its verb keys from ContentBehaviour (CreateKey, ConsumeKey, HaveKey and their plural forms) and its name forms (Name, NamePlural, WithIconPlural such as "bowls of Stew", and NameWithArticle).

**How a line is chosen**
- **Bounty:** "In 31 days: Produce as many bowls of Stew as you can." The fact card reads "Scored on: Bowls of Stew produced", and the page shows the game's Bounty explanation.
- **A level with its own objective text** (Level.<id>.Objective.Main.n) shows that text, matched to the objectives in order. All 165 lines that name an object named the matching target. Levels whose text tables disagree with each other, or don't have one line per objective, use the templates.
- **Other objectives** use the template:
  - Have, Create and Consume take the object's own verb when it has one: Bake, Brew, Sew, Harvest, Obtain, Write, Drink, Read.
  - Without one, they default to Have, Produce or Consume. Produce matches the Bounty wording for the Create condition.
- **Names:**
  - "1" uses the article form ("Have a Fountain.").
  - Zero targets use the Zero template ("Have no Basic Houses.").
  - Plurals prefer the measure form ("mugs of Beer") over the plain plural.
- **Comparisons:** "exactly", "at most" and "fewer than" are inserted for Have objectives whose comparison isn't "at least". The templates carry no comparison word.
- **Percentages:** a percentage that the template doesn't state (Happiness 75%) is shown in brackets after the line.

**Not checked in play.** Which verb the game picks when an object sets none (Produce, Consume, or a code-chosen Plant, Chop down, Recycle, Eat, Use) is decided in code. The defaults above are the plain templates. The only in-game check so far is the Dark Stew Feast screenshot, which matches.

**Other changes**
- The level-page objectives table now has two columns: Objective (the game's wording) and What counts (stock on hand vs a running total, and so on).
- The challenge type tables use the same wording.
- The home box no longer prints "(Redux)" after a name that already ends in Redux.
