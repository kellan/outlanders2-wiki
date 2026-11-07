## Food production compared (2026-11-07)

The maintainer asked for a page comparing the food production rates of every object that makes food (buildings, trees, fields) as a sortable table.

**Research repo (main, commit 54d9ee6)**
- `tools/export_food_rates.py` writes `data/food-rates.json`. It gives a work-time ceiling for each building whose recipe ends in a food. It uses the `docs/PRODUCTION.md` capacity model with timelines read fresh, and extraction cycles from the work-timings export.
- New answers:
  - plates are building stock, filled by `InitializePileWith`;
  - alternative intermediates (the Open Kitchen's Veggie, Meat or Egg) are computed per choice;
  - an animation with no readable length counts as 0 s and is flagged.
- `tests/test_food_rates.py` pins the Bakery (21.8 and 43.6 Bread) and Cheesery (19.2 and 27 Cheese) figures from the older, separate production profiles, plus the single-spot bottlenecks.

**Wiki**
- The export is copied into `decoded-mechanics.json` as `food_rates`, with steps trimmed.
- New Mechanics page `food-production/`:
  - fields and trees come from `foodPerDay` (growth and fruit intervals);
  - gatherers and kitchens come from `food_rates`.
- Columns:
  - makes a day;
  - food units a day with 1 worker and fully staffed;
  - uses up a day;
  - net food (minus the food cooked with);
  - villagers fed;
  - limited by.
- Gatherers show no net food, because they pick what trees grow.
- Follow-up from the maintainer ("some sort of consumables cost rate, cookies more expensive than bread"):
  - a "Uses per 10 food units" column;
  - a "What the food costs" section: per 10 food units, the kitchen's worker-seconds, and what a fully staffed kitchen needs a day, turned into fields, coops, trees or Logs.
  - Flour counts as Wheat, because the Windmill is 1 Wheat to 1 Flour (check 106 asserts this).
  - Coop counts use the player-reported 5 Eggs a day, which is labelled as such.
  - Findings: Cookies take 2 times the Wheat of Bread per food unit, plus 2.5 Eggs, and buy 4 Fun per Cookie. Baked, a Wheat field gives about 1.3 food units a day, against 0.33 for a Carrot field eaten raw, but a full Bakery would need about 66 Wheat fields.
- "What stands out" bullets are generated from the data:
  - kitchens against fields;
  - food cooked into food;
  - workers who add little;
  - gatherers capped by trees;
  - porridge from no food.
- The Food directory sentence "factory speed is not stored" is replaced by a link to the new page.
- Check 106 covers:
  - one row per source;
  - pinned numbers;
  - the unreadable-step flag;
  - links.

**Open:** these are ceilings without walking. A timed kitchen in play would calibrate them. The Dried Meat Shop has an unreadable worker step, so its figure is loose.
