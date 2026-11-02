# Play logs

Day-by-day records of complete plays, one CSV per run, used to fit the strategy model's parameters (construction labour, extraction and trade rates, hauling cost) that the game files do not store. Protocol: wiki `docs/PLAYTESTS.md` B10 `storefront-log`.

- `TEMPLATE-storefront.csv`: the columns, with day 0 filled from the level file and day 1 as an example row. One row per game day, recorded when the day counter increments. Stocks as the stock panel shows them. `placed` and `completed` list building names with `;` between them. `objectives_ticked` lists objective names that completed that day. `restarted` is `yes` on the day a run was abandoned for a restart; keep the abandoned attempt's rows in their own file.
- Save a run as `storefront-<YYYY-MM-DD>.csv` (or `<level id>-<date>.csv` for other levels). Record the game version and leader in `notes` on day 0.

Everything here is a measurement, not a bound: it feeds `data/measured-rates.json` and the plan B simulator, never the chain planner's bound.
